"use client";

import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { AnimatePresence, motion } from "framer-motion";
import { MessageCircle, Send, X, Loader2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const SUGGESTED = [
  "Quel est le prix ?",
  "Comment l'installer ?",
  "Livraison partout au Maroc ?",
];

function TypingDots() {
  return (
    <div className="flex items-center gap-1 px-4 py-3">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="h-1.5 w-1.5 rounded-full bg-gold"
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.2 }}
        />
      ))}
    </div>
  );
}

// Lightweight markdown renderer — handles bold, bullets, numbered lists, line breaks
function Markdown({ text }: { text: string }) {
  const paragraphs = text.split(/\n{2,}/);

  return (
    <div className="space-y-2">
      {paragraphs.map((block, pi) => {
        const lines = block.split("\n");

        // Bullet list block
        const isBulletList = lines.every((l) => /^[-*•]\s/.test(l.trim()) || l.trim() === "");
        if (isBulletList && lines.some((l) => /^[-*•]\s/.test(l.trim()))) {
          return (
            <ul key={pi} className="space-y-1 pl-1">
              {lines
                .filter((l) => /^[-*•]\s/.test(l.trim()))
                .map((l, li) => (
                  <li key={li} className="flex gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
                    <span>{inlineParse(l.replace(/^[-*•]\s+/, ""))}</span>
                  </li>
                ))}
            </ul>
          );
        }

        // Numbered list block
        const isNumberedList = lines.every((l) => /^\d+\.\s/.test(l.trim()) || l.trim() === "");
        if (isNumberedList && lines.some((l) => /^\d+\.\s/.test(l.trim()))) {
          return (
            <ol key={pi} className="space-y-1 pl-1">
              {lines
                .filter((l) => /^\d+\.\s/.test(l.trim()))
                .map((l, li) => (
                  <li key={li} className="flex gap-2">
                    <span className="shrink-0 font-medium text-gold">{li + 1}.</span>
                    <span>{inlineParse(l.replace(/^\d+\.\s+/, ""))}</span>
                  </li>
                ))}
            </ol>
          );
        }

        // Plain paragraph — render each line
        return (
          <p key={pi}>
            {lines.map((line, li) => (
              <span key={li}>
                {inlineParse(line)}
                {li < lines.length - 1 && <br />}
              </span>
            ))}
          </p>
        );
      })}
    </div>
  );
}

// Handles **bold** and *italic* inline
function inlineParse(text: string): React.ReactNode[] {
  const parts = text.split(/(\*\*[^*]+\*\*|\*[^*]+\*)/g);
  return parts.map((part, i) => {
    if (/^\*\*[^*]+\*\*$/.test(part)) {
      return <strong key={i} className="font-semibold text-ink">{part.slice(2, -2)}</strong>;
    }
    if (/^\*[^*]+\*$/.test(part)) {
      return <em key={i}>{part.slice(1, -1)}</em>;
    }
    return part;
  });
}

function BotMessage({ content }: { content: string }) {
  return (
    <div className="flex items-start gap-2">
      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gold/15 text-xs font-bold text-gold">
        A
      </div>
      <div className="max-w-[80%] rounded-2xl rounded-tl-sm bg-ink/5 px-4 py-2.5 text-sm leading-relaxed text-ink">
        <Markdown text={content} />
      </div>
    </div>
  );
}

function UserMessage({ content }: { content: string }) {
  return (
    <div className="flex justify-end">
      <div className="max-w-[80%] rounded-2xl rounded-tr-sm bg-gold px-4 py-2.5 text-sm leading-relaxed text-dark">
        {content}
      </div>
    </div>
  );
}

const MAX_INPUT = 500;

function sanitizeInput(raw: string): string {
  return raw
    .replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, "")
    .trim()
    .slice(0, MAX_INPUT);
}

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Bonjour ! Je suis l'assistant Arini Lock. Posez-moi vos questions sur notre poignée connectée — je suis là pour vous aider. 🔒",
    },
  ]);
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const mutation = useMutation({
    mutationFn: (msgs: Message[]) =>
      axios
        .post<{ content: string }>("/api/chat", { messages: msgs })
        .then((r) => r.data),
    onSuccess: (data, msgs) => {
      setMessages([...msgs, { role: "assistant", content: data.content }]);
    },
    onError: (err, msgs) => {
      const msg = axios.isAxiosError(err)
        ? (err.response?.data as { error?: string })?.error ?? err.message
        : err instanceof Error
          ? err.message
          : "Erreur inconnue";
      setMessages([...msgs, { role: "assistant", content: `⚠️ ${msg}` }]);
    },
  });

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, mutation.isPending]);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
      setTimeout(() => inputRef.current?.focus(), 300);
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  function send(text: string) {
    const clean = sanitizeInput(text);
    if (!clean || mutation.isPending) return;
    const next: Message[] = [...messages, { role: "user", content: clean }];
    setMessages(next);
    setInput("");
    mutation.mutate(next);
  }

  function handleKey(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send(input);
    }
  }

  const showSuggested = messages.length === 1;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {/* Chat panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.96 }}
            transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
            className="flex h-[520px] w-[340px] flex-col overflow-hidden rounded-2xl border border-line bg-cream shadow-[0_20px_60px_rgba(26,23,20,0.18)]"
          >
            {/* Header */}
            <div className="flex shrink-0 items-center gap-3 border-b border-line bg-ink px-4 py-3.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gold/20">
                <span className="text-xs font-bold text-gold">A</span>
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-cream">Assistant Arini</p>
                <p className="text-[10px] uppercase tracking-[0.2em] text-cream/40">
                  En ligne 
                </p>
              </div>
              <button
                onClick={() => setOpen(false)}
                aria-label="Fermer le chat"
                className="flex h-7 w-7 items-center justify-center rounded-full text-cream/50 transition-colors hover:bg-cream/10 hover:text-cream"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Messages — min-h-0 fixes flex overflow scroll */}
            <div
              ref={scrollRef}
              className="min-h-0 flex-1 space-y-3 overflow-y-auto px-4 py-4"
            >
              {messages.map((m, i) =>
                m.role === "assistant" ? (
                  <BotMessage key={i} content={m.content} />
                ) : (
                  <UserMessage key={i} content={m.content} />
                )
              )}

              {mutation.isPending && (
                <div className="flex items-start gap-2">
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gold/15 text-xs font-bold text-gold">
                    A
                  </div>
                  <div className="rounded-2xl rounded-tl-sm bg-ink/5">
                    <TypingDots />
                  </div>
                </div>
              )}

              {showSuggested && !mutation.isPending && (
                <div className="space-y-2 pt-1">
                  {SUGGESTED.map((q) => (
                    <button
                      key={q}
                      onClick={() => send(q)}
                      className="block w-full rounded-xl border border-gold/30 bg-gold/5 px-3 py-2 text-left text-xs text-ink transition-colors hover:border-gold/60 hover:bg-gold/10"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              )}

              <div ref={bottomRef} />
            </div>

            {/* Input */}
            <div className="shrink-0 border-t border-line bg-cream px-3 py-3">
              <div className="flex items-end gap-2 rounded-xl border border-line bg-white px-3 py-2 focus-within:border-gold/50">
                <textarea
                  ref={inputRef}
                  rows={1}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKey}
                  placeholder="Posez votre question…"
                  className="flex-1 resize-none bg-transparent text-sm text-ink placeholder:text-muted-foreground focus:outline-none"
                  style={{ maxHeight: 80 }}
                />
                <button
                  onClick={() => send(input)}
                  disabled={!input.trim() || mutation.isPending}
                  aria-label="Envoyer"
                  className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-gold text-dark transition-colors hover:bg-gold/80 disabled:opacity-40"
                >
                  {mutation.isPending ? (
                    <Loader2 className="h-3.5 w-3.5 animate-spin" />
                  ) : (
                    <Send className="h-3.5 w-3.5" />
                  )}
                </button>
              </div>
              <p className="mt-1.5 text-center text-[10px] text-muted-foreground/60">
                Arini Lock · Assistant IA
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle button */}
      <motion.button
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Fermer le chat" : "Ouvrir le chat"}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.94 }}
        className="relative flex h-14 w-14 items-center justify-center rounded-full bg-gold shadow-[0_8px_32px_rgba(196,154,101,0.45)] transition-shadow hover:shadow-[0_8px_40px_rgba(196,154,101,0.6)]"
      >
        <AnimatePresence mode="wait">
          {open ? (
            <motion.span
              key="close"
              initial={{ opacity: 0, rotate: -90 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: 90 }}
              transition={{ duration: 0.18 }}
            >
              <X className="h-5 w-5 text-dark" />
            </motion.span>
          ) : (
            <motion.span
              key="open"
              initial={{ opacity: 0, rotate: 90 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: -90 }}
              transition={{ duration: 0.18 }}
            >
              <MessageCircle className="h-5 w-5 text-dark" />
            </motion.span>
          )}
        </AnimatePresence>

        {!open && (
          <motion.span
            className="absolute inset-0 rounded-full bg-gold"
            animate={{ scale: [1, 1.5], opacity: [0.4, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
          />
        )}
      </motion.button>
    </div>
  );
}
