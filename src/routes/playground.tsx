import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";

import { Page } from "@/components/Page";

export const Route = createFileRoute("/playground")({
  head: () => ({
    meta: [
      { title: "Playground — Ask Joseph's AI Terminal" },
      {
        name: "description",
        content:
          "SENTRY is an AI terminal trained on Alamu Joseph's background. Ask it about his security tooling, certifications, skills, and availability.",
      },
      { property: "og:title", content: "Playground — Ask Joseph's AI Terminal" },
      {
        property: "og:description",
        content: "Query an AI shell about Alamu Joseph's cybersecurity work.",
      },
    ],
  }),
  component: Playground,
});

type Msg = { id: string; role: "user" | "assistant"; text: string };

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

    setError(null);
    setInput("");
    setBusy(true);

    const history = [...messages, { id: crypto.randomUUID(), role: "user" as const, text }];
    setMessages(history);
    const replyId = crypto.randomUUID();
    setMessages([...history, { id: replyId, role: "assistant", text: "" }]);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: history.map((m) => ({
            id: m.id,
            role: m.role,
            parts: [{ type: "text", text: m.text }],
          })),
        }),
      });

      if (res.status === 429) throw new Error("rate limited — wait a moment and retry.");
      if (res.status === 402) throw new Error("ai credits exhausted on this host.");
      if (!res.ok || !res.body) throw new Error("upstream unreachable.");

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
    } catch (e) {
      const message = e instanceof Error ? e.message : "unknown fault";
      setError(message);
      setMessages((prev) => prev.filter((m) => m.id !== replyId));
    } finally {
      setBusy(false);
      inputRef.current?.focus();
    }
  };

  return (
    <Page index="05" title="Playground" kicker="./sentry --interactive">
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

        <div className="max-h-[420px] min-h-[260px] overflow-y-auto p-4 font-mono text-[13px] leading-relaxed">
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
