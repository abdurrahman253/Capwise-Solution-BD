"use client";

import {
  ArrowUpRight,
  MessageCircle,
  PhoneCall,
  Send,
  ShieldCheck,
  Sparkles,
  X,
} from "lucide-react";
import { AnimatePresence, m, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";

const initialMessages = [
  {
    id: "capwise-welcome",
    role: "assistant",
    content:
      "Welcome to Capwise. Tell me what you are trying to set up, fix or understand, and I’ll help identify a practical next step.",
  },
];

const quickPrompts = [
  "I want to register a company",
  "I need tax or VAT support",
  "I need accounting support",
];

const createId = (prefix) =>
  `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

export default function SupportAssistant() {
  const shouldReduceMotion = useReducedMotion();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState("");
  const [isSending, setIsSending] = useState(false);
  const scrollAreaRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    const focusTimer = window.setTimeout(() => inputRef.current?.focus(), 180);
    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", handleEscape);

    return () => {
      window.clearTimeout(focusTimer);
      window.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen]);

  useEffect(() => {
    const area = scrollAreaRef.current;

    if (!area) {
      return;
    }

    area.scrollTo({
      top: area.scrollHeight,
      behavior: shouldReduceMotion ? "auto" : "smooth",
    });
  }, [messages, isSending, shouldReduceMotion]);

  const updateAssistantMessage = (messageId, content) => {
    setMessages((current) =>
      current.map((message) =>
        message.id === messageId ? { ...message, content } : message,
      ),
    );
  };

  const sendMessage = async (rawMessage) => {
    const messageText = rawMessage.trim();

    if (!messageText || isSending) {
      return;
    }

    const userMessage = {
      id: createId("visitor"),
      role: "user",
      content: messageText,
    };
    const assistantMessageId = createId("capwise");
    const conversationForApi = [...messages, userMessage]
      .filter((message) => message.content.trim())
      .slice(-8)
      .map(({ role, content }) => ({ role, content }));

    setInput("");
    setIsSending(true);
    setMessages((current) => [
      ...current,
      userMessage,
      { id: assistantMessageId, role: "assistant", content: "" },
    ]);

    try {
      const response = await fetch("/api/assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: conversationForApi }),
      });

      if (!response.ok) {
        const errorBody = await response.json().catch(() => null);
        throw new Error(
          errorBody?.error || "The assistant is temporarily unavailable.",
        );
      }

      if (!response.body) {
        const responseText = await response.text();
        updateAssistantMessage(assistantMessageId, responseText);
        return;
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let completeText = "";

      while (true) {
        const { done, value } = await reader.read();

        if (done) {
          break;
        }

        completeText += decoder.decode(value, { stream: true });
        updateAssistantMessage(assistantMessageId, completeText);
      }

      completeText += decoder.decode();

      if (!completeText.trim()) {
        updateAssistantMessage(
          assistantMessageId,
          "I couldn’t prepare a reliable answer. Please book a consultation so the Capwise team can review your situation.",
        );
      }
    } catch (error) {
      updateAssistantMessage(
        assistantMessageId,
        "I’m unable to respond right now. You can still call, WhatsApp, or book a consultation with the Capwise team.",
      );
      toast.error(error.message || "Assistant connection failed.");
    } finally {
      setIsSending(false);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    sendMessage(input);
  };

  const handleInputKeyDown = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      sendMessage(input);
    }
  };

  return (
    <div className="pointer-events-none fixed inset-0 z-[90]">
      <AnimatePresence>
        {isOpen ? (
          <m.section
            key="capwise-assistant-panel"
            role="dialog"
            aria-modal="false"
            aria-labelledby="capwise-assistant-title"
            initial={shouldReduceMotion ? false : { opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 18, scale: 0.98 }}
            transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
            className="pointer-events-auto absolute inset-x-2 bottom-2 flex h-[min(46rem,calc(100svh-1rem))] flex-col overflow-hidden rounded-[1.75rem] border border-white/10 bg-[#081d30] text-white shadow-[0_36px_110px_rgba(2,12,23,0.46)] sm:inset-x-auto sm:bottom-5 sm:right-5 sm:h-[min(43rem,calc(100svh-2.5rem))] sm:w-[25.5rem]"
          >
            <div className="relative overflow-hidden border-b border-white/10 px-5 py-5">
              <div
                aria-hidden="true"
                className="absolute -right-12 -top-16 size-40 rounded-full bg-accent/20 blur-3xl"
              />

              <div className="relative flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <span className="relative inline-flex size-11 items-center justify-center rounded-2xl border border-accent/25 bg-accent/10 text-accent">
                    <Sparkles aria-hidden="true" size={19} />
                    <span className="absolute -right-0.5 -top-0.5 size-2.5 rounded-full border-2 border-[#081d30] bg-accent" />
                  </span>

                  <div>
                    <p
                      id="capwise-assistant-title"
                      className="font-display text-base font-bold tracking-[-0.025em]"
                    >
                      Capwise Assistant
                    </p>
                    <p className="mt-0.5 text-[0.68rem] font-semibold text-white/48">
                      Business guidance · Bangladesh
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="inline-flex size-10 items-center justify-center rounded-full border border-white/10 text-white/58 transition hover:border-white/20 hover:bg-white/8 hover:text-white"
                  aria-label="Close Capwise Assistant"
                >
                  <X aria-hidden="true" size={18} />
                </button>
              </div>
            </div>

            <div
              ref={scrollAreaRef}
              data-lenis-prevent
              aria-live="polite"
              className="flex-1 space-y-4 overflow-y-auto px-4 py-5 sm:px-5"
            >
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${
                    message.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[88%] whitespace-pre-wrap rounded-2xl px-4 py-3 text-[0.79rem] leading-6 ${
                      message.role === "user"
                        ? "rounded-br-md bg-accent font-medium text-[#042f2e]"
                        : "rounded-bl-md border border-white/9 bg-white/[0.055] text-white/72"
                    }`}
                  >
                    {message.content || (
                      <span className="inline-flex items-center gap-1.5 py-1" aria-label="Preparing response">
                        {[0, 1, 2].map((dot) => (
                          <m.span
                            key={dot}
                            aria-hidden="true"
                            animate={
                              shouldReduceMotion
                                ? undefined
                                : { opacity: [0.3, 1, 0.3], y: [0, -2, 0] }
                            }
                            transition={{
                              duration: 1.1,
                              delay: dot * 0.16,
                              repeat: Infinity,
                            }}
                            className="size-1.5 rounded-full bg-accent"
                          />
                        ))}
                      </span>
                    )}
                  </div>
                </div>
              ))}

              {messages.length === 1 && (
                <div className="grid gap-2 pt-1">
                  {quickPrompts.map((prompt) => (
                    <button
                      key={prompt}
                      type="button"
                      onClick={() => sendMessage(prompt)}
                      className="group flex min-h-11 items-center justify-between gap-3 rounded-xl border border-white/9 bg-white/[0.035] px-3.5 py-2.5 text-left text-[0.72rem] font-semibold text-white/62 transition hover:border-accent/35 hover:bg-accent/8 hover:text-white"
                    >
                      {prompt}
                      <ArrowUpRight
                        aria-hidden="true"
                        size={14}
                        className="shrink-0 text-accent transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="border-t border-white/10 bg-[#071a2c] p-4 sm:p-5">
              <form onSubmit={handleSubmit} className="relative">
                <label htmlFor="capwise-assistant-input" className="sr-only">
                  Ask Capwise a question
                </label>
                <textarea
                  ref={inputRef}
                  id="capwise-assistant-input"
                  value={input}
                  onChange={(event) => setInput(event.target.value.slice(0, 700))}
                  onKeyDown={handleInputKeyDown}
                  rows={1}
                  maxLength={700}
                  placeholder="Ask about formation, tax, VAT…"
                  className="min-h-13 w-full resize-none rounded-2xl border border-white/11 bg-white/[0.055] py-3.5 pl-4 pr-14 text-sm text-white outline-none transition placeholder:text-white/30 focus:border-accent/55 focus:bg-white/[0.075]"
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isSending}
                  className="absolute bottom-1.5 right-1.5 inline-flex size-10 items-center justify-center rounded-xl bg-accent text-[#042f2e] transition hover:bg-[#5eead4] disabled:cursor-not-allowed disabled:opacity-35"
                  aria-label="Send message"
                >
                  <Send aria-hidden="true" size={16} />
                </button>
              </form>

              <p className="mt-3 flex items-start gap-2 text-[0.61rem] leading-4 text-white/34">
                <ShieldCheck aria-hidden="true" size={13} className="mt-0.5 shrink-0" />
                General information only. Do not share confidential, tax or identity documents here.
              </p>
            </div>
          </m.section>
        ) : (
          <m.div
            key="capwise-support-dock"
            initial={shouldReduceMotion ? false : { y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="pointer-events-auto absolute bottom-4 right-4 flex items-end gap-2.5 sm:bottom-5 sm:right-5"
          >
            <div className="hidden flex-col gap-2 sm:flex">
              <a
                href="https://wa.me/8801624000381?text=Hello%20Capwise%2C%20I%20would%20like%20to%20discuss%20business%20support."
                target="_blank"
                rel="noreferrer"
                className="inline-flex size-11 items-center justify-center rounded-full border border-border bg-surface text-accent-strong shadow-[0_14px_40px_rgba(11,31,51,0.14)] transition hover:-translate-y-1 hover:border-accent"
                aria-label="Chat with Capwise on WhatsApp"
              >
                <MessageCircle aria-hidden="true" size={18} />
              </a>
              <a
                href="tel:+8801624000381"
                className="inline-flex size-11 items-center justify-center rounded-full border border-border bg-surface text-foreground shadow-[0_14px_40px_rgba(11,31,51,0.14)] transition hover:-translate-y-1 hover:border-accent hover:text-accent-strong"
                aria-label="Call Capwise"
              >
                <PhoneCall aria-hidden="true" size={17} />
              </a>
            </div>

            <button
              type="button"
              onClick={() => setIsOpen(true)}
              className="group relative inline-flex min-h-14 items-center gap-3 overflow-hidden rounded-full border border-white/10 bg-[#081d30] py-2.5 pl-3 pr-5 text-white shadow-[0_22px_65px_rgba(2,12,23,0.32)] transition duration-300 hover:-translate-y-1 hover:border-accent/30"
              aria-label="Open Capwise Assistant"
            >
              <span className="relative inline-flex size-9 items-center justify-center rounded-full bg-accent text-[#042f2e]">
                <Sparkles aria-hidden="true" size={17} />
                <span className="absolute -right-0.5 -top-0.5 size-2.5 rounded-full border-2 border-[#081d30] bg-[#f4c86b]" />
              </span>
              <span className="text-left">
                <span className="block text-[0.57rem] font-bold uppercase tracking-[0.17em] text-accent/72">
                  Need clarity?
                </span>
                <span className="mt-0.5 block text-xs font-bold">Ask Capwise</span>
              </span>
            </button>
          </m.div>
        )}
      </AnimatePresence>
    </div>
  );
}
