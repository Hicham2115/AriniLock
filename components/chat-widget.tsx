"use client";

import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { AnimatePresence, motion } from "framer-motion";
import { MessageCircle, Send, X, Loader2, Trash2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const SUGGESTED = [
  "Aide-moi à choisir la bonne serrure",
  "C'est pour une location Airbnb",
  "Je veux sécuriser ma maison familiale",
];

function TypingDots() {
  return (
    <div className="flex items-center gap-1 px-4 py-3">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="h-1.5 w-1.5 rounded-full bg-primary"
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.2 }}
        />
      ))}
    </div>
  );
}

function Markdown({ text }: { text: string }) {
  const paragraphs = text.split(/\n{2,}/);
  return (
    <div className="space-y-2">
      {paragraphs.map((block, pi) => {
        const lines = block.split("\n");
        const isBulletList = lines.every((l) => /^[-*•]\s/.test(l.trim()) || l.trim() === "");
        if (isBulletList && lines.some((l) => /^[-*•]\s/.test(l.trim()))) {
          return (
            <ul key={pi} className="space-y-1 pl-1">
              {lines.filter((l) => /^[-*•]\s/.test(l.trim())).map((l, li) => (
                <li key={li} className="flex gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                  <span>{inlineParse(l.replace(/^[-*•]\s+/, ""))}</span>
                </li>
              ))}
            </ul>
          );
        }
        const isNumberedList = lines.every((l) => /^\d+\.\s/.test(l.trim()) || l.trim() === "");
        if (isNumberedList && lines.some((l) => /^\d+\.\s/.test(l.trim()))) {
          return (
            <ol key={pi} className="space-y-1 pl-1">
              {lines.filter((l) => /^\d+\.\s/.test(l.trim())).map((l, li) => (
                <li key={li} className="flex gap-2">
                  <span className="shrink-0 font-medium text-primary">{li + 1}.</span>
                  <span>{inlineParse(l.replace(/^\d+\.\s+/, ""))}</span>
                </li>
              ))}
            </ol>
          );
        }
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

function inlineParse(text: string): React.ReactNode[] {
  const parts = text.split(/(\[(?:[^\]]+)\]\((?:[^)]+)\)|\*\*[^*]+\*\*|\*[^*]+\*)/g);
  const result: React.ReactNode[] = [];
  let i = 0;
  while (i < parts.length) {
    const part = parts[i];
    if (!part) { i++; continue; }
    const linkMatch = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (linkMatch) {
      const [, label, href] = linkMatch;
      const isInternal = href.startsWith("/");
      result.push(
        <a
          key={i}
          href={href}
          {...(isInternal ? {} : { target: "_blank", rel: "noopener noreferrer" })}
          className="inline-flex items-center gap-1 rounded-md bg-primary px-2.5 py-0.5 text-xs font-semibold text-white no-underline transition-opacity hover:opacity-80"
        >
          {label}
        </a>
      );
    } else if (/^\*\*[^*]+\*\*$/.test(part)) {
      result.push(<strong key={i} className="font-semibold text-foreground">{part.slice(2, -2)}</strong>);
    } else if (/^\*[^*]+\*$/.test(part)) {
      result.push(<em key={i}>{part.slice(1, -1)}</em>);
    } else {
      result.push(part);
    }
    i++;
  }
  return result;
}

function BotMessage({ content }: { content: string }) {
  return (
    <div className="flex items-start gap-2">
      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
        A
      </div>
      <div className="max-w-[80%] rounded-2xl rounded-tl-sm bg-secondary px-4 py-2.5 text-sm leading-relaxed text-foreground">
        <Markdown text={content} />
      </div>
    </div>
  );
}

function UserMessage({ content }: { content: string }) {
  return (
    <div className="flex justify-end">
      <div className="max-w-[80%] rounded-2xl rounded-tr-sm bg-primary px-4 py-2.5 text-sm leading-relaxed text-white">
        {content}
      </div>
    </div>
  );
}

const MAX_INPUT = 500;

function sanitizeInput(raw: string): string {
  return raw.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, "").trim().slice(0, MAX_INPUT);
}

const STORAGE_KEY = "arinilock-chat-history";
const WELCOME: Message = {
  role: "assistant",
  content: "Bonjour ! Je suis l'assistant AriniLock. Posez-moi vos questions sur notre poignée connectée — je suis là pour vous aider. 🔒",
};

function loadMessages(): Message[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [WELCOME];
    const parsed = JSON.parse(raw) as Message[];
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : [WELCOME];
  } catch {
    return [WELCOME];
  }
}

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([WELCOME]);
  const [input, setInput] = useState("");
  const [hydrated, setHydrated] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const mutation = useMutation({
    mutationFn: (msgs: Message[]) =>
      axios.post<{ content: string }>("/api/chat", { messages: msgs }).then((r) => r.data),
    onSuccess: (data, msgs) => {
      setMessages([...msgs, { role: "assistant", content: data.content }]);
    },
    onError: (err, msgs) => {
      const msg = axios.isAxiosError(err)
        ? (err.response?.data as { error?: string })?.error ?? err.message
        : err instanceof Error ? err.message : "Erreur inconnue";
      setMessages([...msgs, { role: "assistant", content: `⚠️ ${msg}` }]);
    },
  });

  // Load from localStorage after mount (avoids SSR mismatch)
  useEffect(() => {
    setMessages(loadMessages());
    setHydrated(true);
  }, []);

  // Persist conversation whenever it changes
  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
    } catch {}
  }, [messages, hydrated]);

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

  function clearChat() {
    setMessages([WELCOME]);
    try { localStorage.removeItem(STORAGE_KEY); } catch {}
  }

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
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.96 }}
            transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
            className="flex h-130 w-85 flex-col overflow-hidden rounded-2xl border border-border bg-white shadow-[0_20px_60px_rgba(22,40,71,0.18)]"
          >
            {/* Header */}
            <div className="flex shrink-0 items-center gap-3 border-b border-white/10 bg-primary px-4 py-3.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/15">
                <span className="text-xs font-bold text-white">A</span>
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-white">Assistant Arini</p>
                <p className="text-[10px] uppercase tracking-[0.2em] text-white/40">En ligne</p>
              </div>
              <button
                onClick={clearChat}
                aria-label="Effacer la conversation"
                className="flex h-7 w-7 items-center justify-center rounded-full text-white/50 transition-colors hover:bg-white/10 hover:text-white"
              >
                <Trash2 className="h-3.5 w-3.5" />
              </button>
              <button
                onClick={() => setOpen(false)}
                aria-label="Fermer le chat"
                className="flex h-7 w-7 items-center justify-center rounded-full text-white/50 transition-colors hover:bg-white/10 hover:text-white"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Messages */}
            <div ref={scrollRef} className="min-h-0 flex-1 space-y-3 overflow-y-auto px-4 py-4">
              {messages.map((m, i) =>
                m.role === "assistant" ? (
                  <BotMessage key={i} content={m.content} />
                ) : (
                  <UserMessage key={i} content={m.content} />
                )
              )}

              {mutation.isPending && (
                <div className="flex items-start gap-2">
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                    A
                  </div>
                  <div className="rounded-2xl rounded-tl-sm bg-secondary">
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
                      className="block w-full rounded-xl border border-primary/20 bg-primary/5 px-3 py-2 text-left text-xs text-foreground transition-colors hover:border-primary/40 hover:bg-primary/10"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              )}

              <div ref={bottomRef} />
            </div>

            {/* Input */}
            <div className="shrink-0 border-t border-border bg-secondary/50 px-3 py-3">
              <div className="flex items-end gap-2 rounded-xl border border-border bg-white px-3 py-2 focus-within:border-primary/50 transition-colors">
                <textarea
                  ref={inputRef}
                  rows={1}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKey}
                  placeholder="Posez votre question…"
                  className="flex-1 resize-none bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
                  style={{ maxHeight: 80 }}
                />
                <button
                  onClick={() => send(input)}
                  disabled={!input.trim() || mutation.isPending}
                  aria-label="Envoyer"
                  className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-primary text-white transition-colors hover:bg-primary/80 disabled:opacity-40"
                >
                  {mutation.isPending ? (
                    <Loader2 className="h-3.5 w-3.5 animate-spin" />
                  ) : (
                    <Send className="h-3.5 w-3.5" />
                  )}
                </button>
              </div>
              <p className="mt-1.5 text-center text-[10px] text-muted-foreground/60">
                AriniLock · Assistant IA
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
        className="relative flex h-14 w-14 items-center justify-center rounded-full bg-primary shadow-[0_8px_32px_rgba(22,40,71,0.45)] transition-shadow hover:shadow-[0_8px_40px_rgba(22,40,71,0.6)]"
      >
        <AnimatePresence mode="wait">
          {open ? (
            <motion.span key="close" initial={{ opacity: 0, rotate: -90 }} animate={{ opacity: 1, rotate: 0 }} exit={{ opacity: 0, rotate: 90 }} transition={{ duration: 0.18 }}>
              <X className="h-5 w-5 text-white" />
            </motion.span>
          ) : (
            <motion.span key="open" initial={{ opacity: 0, rotate: 90 }} animate={{ opacity: 1, rotate: 0 }} exit={{ opacity: 0, rotate: -90 }} transition={{ duration: 0.18 }}>
              <MessageCircle className="h-5 w-5 text-white" />
            </motion.span>
          )}
        </AnimatePresence>

        {!open && (
          <motion.span
            className="absolute inset-0 rounded-full bg-primary"
            animate={{ scale: [1, 1.5], opacity: [0.4, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
          />
        )}
      </motion.button>
    </div>
  );
}
