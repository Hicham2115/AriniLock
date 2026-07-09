"use client";

import { useMutation } from "@tanstack/react-query";
import { AnimatePresence, motion } from "framer-motion";
import { MessageCircle, Send, X, Loader2, Trash2, Maximize2, Minimize2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  computeReply,
  getOptionsForStage,
  LANGUAGE_PROMPT,
  type ChatOption,
  type Locale,
  type Message,
  type Stage,
  type ReplyInput,
} from "@/lib/chatbot/static-flow";

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

const STORAGE_KEY = "arinilock-chat-state";

interface StoredState {
  messages: Message[];
  stage: Stage;
  lang: Locale | null;
  property: string | null;
  lastProduct: string | null;
}

const INITIAL_STATE: StoredState = {
  messages: [LANGUAGE_PROMPT],
  stage: "language",
  lang: null,
  property: null,
  lastProduct: null,
};

function loadState(): StoredState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return INITIAL_STATE;
    const parsed = JSON.parse(raw) as Partial<StoredState>;
    if (!Array.isArray(parsed.messages) || parsed.messages.length === 0) return INITIAL_STATE;
    return {
      messages: parsed.messages,
      stage: parsed.stage ?? "language",
      lang: parsed.lang ?? null,
      property: parsed.property ?? null,
      lastProduct: parsed.lastProduct ?? null,
    };
  } catch {
    return INITIAL_STATE;
  }
}

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function ChatWidget() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [messages, setMessages] = useState<Message[]>([LANGUAGE_PROMPT]);
  const [stage, setStage] = useState<Stage>("language");
  const [lang, setLang] = useState<Locale | null>(null);
  const [property, setProperty] = useState<string | null>(null);
  const [lastProduct, setLastProduct] = useState<string | null>(null);
  const [input, setInput] = useState("");
  const [hydrated, setHydrated] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const mutation = useMutation({
    mutationFn: async (input: ReplyInput) => {
      await sleep(450);
      return computeReply(input, { stage, lang, property, lastProduct });
    },
    onSuccess: (reply) => {
      setMessages((prev) => [...prev, reply.message]);
      setStage(reply.nextStage);
      setLang(reply.nextLang);
      setProperty(reply.nextProperty);
      if (reply.nextLastProduct) setLastProduct(reply.nextLastProduct);
    },
  });

  // Load from localStorage after mount (avoids SSR mismatch)
  useEffect(() => {
    const state = loadState();
    setMessages(state.messages);
    setStage(state.stage);
    setLang(state.lang);
    setProperty(state.property);
    setLastProduct(state.lastProduct);
    setHydrated(true);
  }, []);

  // Persist conversation whenever it changes
  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ messages, stage, lang, property, lastProduct }));
    } catch {}
  }, [messages, stage, lang, property, lastProduct, hydrated]);

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

  function closeChat() {
    setOpen(false);
    setExpanded(false);
  }

  function clearChat() {
    setMessages(INITIAL_STATE.messages);
    setStage(INITIAL_STATE.stage);
    setLang(INITIAL_STATE.lang);
    setProperty(INITIAL_STATE.property);
    setLastProduct(INITIAL_STATE.lastProduct);
    try { localStorage.removeItem(STORAGE_KEY); } catch {}
  }

  function send(text: string) {
    const clean = sanitizeInput(text);
    if (!clean || mutation.isPending) return;
    setMessages((prev) => [...prev, { role: "user", content: clean }]);
    setInput("");
    mutation.mutate({ type: "text", value: clean });
  }

  function chooseOption(opt: ChatOption) {
    if (mutation.isPending) return;
    setMessages((prev) => [...prev, { role: "user", content: opt.label }]);
    mutation.mutate({ type: "option", value: opt.value });
  }

  function handleKey(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send(input);
    }
  }

  const currentOptions: ChatOption[] | null = getOptionsForStage(stage, lang);
  const isRtl = lang === "ar";

  if (/^\/produits\/.+/.test(pathname)) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.96 }}
            transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
            className={cn(
              "flex flex-col overflow-hidden border border-border bg-white shadow-[0_20px_60px_rgba(22,40,71,0.18)]",
              expanded
                ? "fixed inset-0 z-50 h-dvh w-screen rounded-none"
                : "h-130 w-85 rounded-2xl max-sm:fixed max-sm:inset-0 max-sm:z-50 max-sm:h-dvh max-sm:w-screen max-sm:rounded-none",
            )}
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
                onClick={() => setExpanded((v) => !v)}
                aria-label={expanded ? "Réduire le chat" : "Agrandir le chat"}
                className="hidden h-7 w-7 items-center justify-center rounded-full text-white/50 transition-colors hover:bg-white/10 hover:text-white sm:flex"
              >
                {expanded ? <Minimize2 className="h-3.5 w-3.5" /> : <Maximize2 className="h-3.5 w-3.5" />}
              </button>
              <button
                onClick={clearChat}
                aria-label="Effacer la conversation"
                className="flex h-7 w-7 items-center justify-center rounded-full text-white/50 transition-colors hover:bg-white/10 hover:text-white"
              >
                <Trash2 className="h-3.5 w-3.5" />
              </button>
              <button
                onClick={closeChat}
                aria-label="Fermer le chat"
                className="flex h-7 w-7 items-center justify-center rounded-full text-white/50 transition-colors hover:bg-white/10 hover:text-white"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Messages */}
            <div ref={scrollRef} dir={isRtl ? "rtl" : "ltr"} className={cn("mx-auto min-h-0 w-full flex-1 space-y-3 overflow-y-auto px-4 py-4", expanded && "max-w-3xl")}>
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

              {currentOptions && !mutation.isPending && (
                <div className="space-y-2 pt-1">
                  {currentOptions.map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => chooseOption(opt)}
                      className="block w-full rounded-xl border border-primary/20 bg-primary/5 px-3 py-2 text-left text-xs text-foreground transition-colors hover:border-primary/40 hover:bg-primary/10"
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              )}

              <div ref={bottomRef} />
            </div>

            {/* Input */}
            <div className="shrink-0 border-t border-border bg-secondary/50 px-3 py-3">
              <div className={cn("flex items-end gap-2 rounded-xl border border-border bg-white px-3 py-2 focus-within:border-primary/50 transition-colors", expanded && "mx-auto max-w-3xl")}>
                <textarea
                  ref={inputRef}
                  dir={isRtl ? "rtl" : "ltr"}
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
        onClick={() => (open ? closeChat() : setOpen(true))}
        aria-label={open ? "Fermer le chat" : "Ouvrir le chat"}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.94 }}
        className={cn(
          "relative flex h-14 w-14 items-center justify-center rounded-full bg-primary shadow-[0_8px_32px_rgba(22,40,71,0.45)] transition-shadow hover:shadow-[0_8px_40px_rgba(22,40,71,0.6)]",
          open && (expanded ? "hidden" : "max-sm:hidden"),
        )}
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
