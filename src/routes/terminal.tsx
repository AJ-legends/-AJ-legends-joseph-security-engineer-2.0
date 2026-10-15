import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";

import { Page } from "@/components/Page";
import { pageHead } from "@/lib/site";

export const Route = createFileRoute("/terminal")({
  head: () =>
    pageHead(
      "/terminal",
      "Playground — Ask Joseph's AI Terminal",
      "SENTRY is an AI terminal trained on Alamu Joseph's background. Ask it about his security tooling, certifications, skills, and availability.",
    ),
  component: Playground,
});

type Msg = { id: string; role: "user" | "assistant"; text: string };

const MAX_INPUT_LENGTH = 1_000;
const MAX_HISTORY_MESSAGES = 10;
const CLIENT_TIMEOUT_MS = 30_000;

const SUGGESTIONS = [
  "what tools has joseph built?",
  "is he available for internships?",
  "how strong is his python?",
  "what certifications does he hold?",
];

function Playground() {
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    endRef.current?.scrollIntoView({ block: "end" });
  }, [messages, busy]);

  const send = async (raw: string) => {
    const text = raw.trim();
    if (!text || busy) return;
    if (text.length > MAX_INPUT_LENGTH) {
      setError(`message is limited to ${MAX_INPUT_LENGTH.toLocaleString()} characters.`);
      return;
    }

    setError(null);
    setInput("");
    setBusy(true);

    const userMessage = { id: crypto.randomUUID(), role: "user" as const, text };
    const conversation = [...messages, userMessage];
    const requestMessages = [
      ...messages.slice(-MAX_HISTORY_MESSAGES),
      userMessage,
    ];
    setMessages(conversation);
    const replyId = crypto.randomUUID();
    setMessages([...conversation, { id: replyId, role: "assistant", text: "" }]);

    let timeout: number | undefined;
    try {
      const controller = new AbortController();
      timeout = window.setTimeout(() => controller.abort(), CLIENT_TIMEOUT_MS);
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        signal: controller.signal,
        body: JSON.stringify({
          messages: requestMessages.map((m) => ({
            id: m.id,
            role: m.role,
            parts: [{ type: "text", text: m.text }],
          })),
        }),
      });

      if (!res.ok || !res.body) {
        const payload = (await res.json().catch(() => null)) as {
          error?: { message?: string };
        } | null;
        throw new Error(payload?.error?.message ?? "terminal request failed.");
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let acc = "";

      for (;;) {
        const { done, value } = await reader.read();
        if (done) break;
        acc += decoder.decode(value, { stream: true });
        setMessages((prev) =>
          prev.map((m) => (m.id === replyId ? { ...m, text: acc } : m)),
        );
      }

      if (!acc.trim()) throw new Error("The AI did not return a response. Please try again.");
    } catch (e) {
      const message =
        e instanceof DOMException && e.name === "AbortError"
          ? "request timed out. Please try again."
          : e instanceof Error
            ? e.message
            : "unknown fault";
      setError(message);
      setMessages((prev) => prev.filter((m) => m.id !== replyId));
    } finally {
      if (timeout !== undefined) window.clearTimeout(timeout);
      setBusy(false);
      inputRef.current?.focus();
    }
  };

  return (
    <Page index="05" title="Terminal" kicker="./sentry --interactive">
      <p className="max-w-xl text-sm leading-relaxed text-muted-foreground">
        SENTRY is an AI shell wired to Joseph&apos;s dossier. Ask it anything about his work,
        skills or availability. It won&apos;t answer anything outside that scope.
      </p>

      <div className="mt-8 overflow-hidden rounded-[16px] border border-border bg-terminal text-terminal-foreground">
        <header className="flex items-center gap-2 border-b border-terminal-muted/30 px-4 py-2.5">
          <span className="inline-block size-2 rounded-full bg-terminal-accent" />
          <span className="font-mono text-[11px] text-terminal-muted">
            sentry@alamu-joseph:~
          </span>
        </header>

        <div data-scroll-lock className="max-h-[420px] min-h-[260px] overflow-y-auto p-4 font-mono text-[13px] leading-relaxed">
          {messages.length === 0 && (
            <div className="text-terminal-muted">
              <div>[+] sentry online — dossier loaded</div>
              <div className="mt-1">[*] type a question, or pick one below.</div>
            </div>
          )}

          {messages.map((m) => (
            <div key={m.id} className="mb-3">
              {m.role === "user" ? (
                <div className="text-terminal-accent">$ {m.text}</div>
              ) : (
                <div className="whitespace-pre-wrap text-terminal-foreground">
                  {m.text || <span className="text-terminal-muted">thinking</span>}
                </div>
              )}
            </div>
          ))}

          {error && <div className="text-destructive">[!] {error}</div>}
          <div ref={endRef} />
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            void send(input);
          }}
          className="flex items-center gap-2 border-t border-terminal-muted/30 px-4 py-3"
        >
          <span className="text-terminal-accent">$</span>
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={busy}
            maxLength={MAX_INPUT_LENGTH}
            placeholder="ask about joseph..."
            aria-label="Ask the terminal a question"
            className="flex-1 bg-transparent font-mono text-[13px] text-terminal-foreground outline-none placeholder:text-terminal-muted disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={busy || !input.trim()}
            className="rounded-[8px] border border-terminal-muted/50 px-3 py-1 text-[10px] uppercase tracking-[0.16em] text-terminal-muted transition-colors hover:border-terminal-accent hover:text-terminal-accent disabled:opacity-40"
          >
            {busy ? "..." : "run"}
          </button>
        </form>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {SUGGESTIONS.map((s) => (
          <button
            key={s}
            onClick={() => void send(s)}
            disabled={busy}
            className="rounded-full border border-border px-3 py-1.5 text-[11px] text-muted-foreground transition-colors hover:border-primary hover:text-primary disabled:opacity-40"
          >
            &gt; {s}
          </button>
        ))}
      </div>
    </Page>
  );
}
