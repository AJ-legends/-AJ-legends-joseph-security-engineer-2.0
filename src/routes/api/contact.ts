import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

const MAX_REQUEST_BYTES = 16_000;
const MIN_SUBMISSION_TIME_MS = 1_500;
const MAX_SUBMISSION_TIME_MS = 60 * 60 * 1_000;
const RATE_LIMIT_MAX_REQUESTS = 3;
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1_000;

const contactSchema = z
  .object({
    name: z.string().trim().min(2).max(100),
    email: z.string().trim().email().max(254),
    message: z.string().trim().min(10).max(5_000),
    website: z.string().max(200).optional().default(""),
    startedAt: z.number().int().positive(),
  })
  .strict();

type RateLimitEntry = { count: number; resetAt: number };

const rateLimitEntries = new Map<string, RateLimitEntry>();

function errorResponse(status: number, message: string, headers?: HeadersInit) {
  return Response.json({ error: { message } }, { status, headers });
}

function getClientId(request: Request) {
  return (
    request.headers.get("x-vercel-forwarded-for") ??
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    request.headers.get("cf-connecting-ip") ??
    "unknown"
  );
}

function enforceRateLimit(request: Request) {
  const now = Date.now();
  const clientId = getClientId(request);

  for (const [id, entry] of rateLimitEntries) {
    if (entry.resetAt <= now) rateLimitEntries.delete(id);
  }

  const entry = rateLimitEntries.get(clientId);
  if (entry && entry.resetAt > now) {
    if (entry.count >= RATE_LIMIT_MAX_REQUESTS) {
      const retryAfter = Math.ceil((entry.resetAt - now) / 1_000);
      return errorResponse(429, "Too many messages. Please try again later.", {
        "Retry-After": String(retryAfter),
      });
    }

    entry.count += 1;
    return null;
  }

  rateLimitEntries.set(clientId, {
    count: 1,
    resetAt: now + RATE_LIMIT_WINDOW_MS,
  });
  return null;
}

function escapeHtml(value: string) {
  return value.replace(/[&<>'"]/g, (character) => {
    const entities: Record<string, string> = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      "'": "&#39;",
      '"': "&quot;",
    };
    return entities[character];
  });
}

function formatEmail(name: string, email: string, message: string) {
  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safeMessage = escapeHtml(message).replace(/\r?\n/g, "<br />");

  return {
    html: `<h2>New portfolio enquiry</h2><p><strong>From:</strong> ${safeName} (${safeEmail})</p><p><strong>Message:</strong></p><p>${safeMessage}</p>`,
    text: `New portfolio enquiry\n\nFrom: ${name} (${email})\n\nMessage:\n${message}`,
  };
}

export const Route = createFileRoute("/api/contact")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const contentLength = Number(request.headers.get("content-length"));
        if (Number.isFinite(contentLength) && contentLength > MAX_REQUEST_BYTES) {
          return errorResponse(413, "Request is too large.");
        }

        let body: unknown;
        try {
          const rawBody = await request.text();
          if (new TextEncoder().encode(rawBody).byteLength > MAX_REQUEST_BYTES) {
            return errorResponse(413, "Request is too large.");
          }
          body = JSON.parse(rawBody);
        } catch {
          return errorResponse(400, "Request body must be valid JSON.");
        }

        const parsedBody = contactSchema.safeParse(body);
        if (!parsedBody.success) {
          return errorResponse(
            400,
            "Enter your name, a valid email address, and a message of 10 to 5,000 characters.",
          );
        }

        const { name, email, message, website, startedAt } = parsedBody.data;
        const elapsed = Date.now() - startedAt;
        if (elapsed < MIN_SUBMISSION_TIME_MS || elapsed > MAX_SUBMISSION_TIME_MS) {
          return errorResponse(400, "Please refresh the form and try again.");
        }

        if (website) {
          return Response.json({ ok: true }, { status: 202 });
        }

        const rateLimitError = enforceRateLimit(request);
        if (rateLimitError) return rateLimitError;

        const apiKey = process.env.EMAIL_API_KEY;
        const to = process.env.CONTACT_TO_EMAIL;
        const from = process.env.CONTACT_FROM_EMAIL;
        if (!apiKey || !to || !from) {
          console.error("Contact email is not configured.");
          return errorResponse(
            503,
            "The contact form is temporarily unavailable. Please email Joseph directly.",
          );
        }

        const { html, text } = formatEmail(name, email, message);

        try {
          const response = await fetch("https://api.resend.com/emails", {
            method: "POST",
            headers: {
              Authorization: `Bearer ${apiKey}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              from,
              to: [to],
              reply_to: email,
              subject: `Portfolio enquiry from ${name}`,
              html,
              text,
            }),
            signal: AbortSignal.timeout(15_000),
          });

          if (!response.ok) {
            console.error("Contact email delivery failed:", response.status, await response.text());
            return errorResponse(
              502,
              "Your message could not be delivered. Please try again shortly.",
            );
          }

          return Response.json({ ok: true }, { status: 202 });
        } catch (error) {
          console.error("Contact email delivery error:", error);
          return errorResponse(
            502,
            "Your message could not be delivered. Please try again shortly.",
          );
        }
      },
    },
  },
});
