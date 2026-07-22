"use client";

import { useGSAP } from "@gsap/react";
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from "@headlessui/react";
import gsap from "gsap";
import {
  ArrowRight,
  Building2,
  CheckCircle2,
  ExternalLink,
  Landmark,
  MessageCircle,
  PhoneCall,
  Scale,
  Send,
  ShieldCheck,
  Sparkles,
  UserRoundCheck,
  X,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { toast } from "react-toastify";

gsap.registerPlugin(useGSAP);

const quickActions = [
  {
    label: "Company Registration",
    prompt: "I want to register a company in Bangladesh",
    icon: Building2,
  },
  {
    label: "Tax & VAT",
    prompt: "I need tax or VAT support",
    icon: Landmark,
  },
  {
    label: "Foreign Investment",
    prompt: "I need foreign investment and market-entry guidance",
    icon: Scale,
  },
  {
    label: "Talk to an Expert",
    prompt: "I want to talk to a Capwise expert",
    icon: UserRoundCheck,
  },
];

const initialMessages = [
  {
    id: "welcome",
    role: "assistant",
    content:
      "Hi, I’m Capwise Guided Support. Choose a topic or describe the business issue. I’ll use approved service information and hand personalized matters to a human adviser.",
  },
];

function createId(prefix) {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

export default function SupportAssistant() {
  const panelRef = useRef(null);
  const messagesRef = useRef(null);
  const inputRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState("");
  const [isSending, setIsSending] = useState(false);

  const hasConversation = messages.length > 1;
  const latestAssistantMessage = useMemo(
    () => [...messages].reverse().find((message) => message.role === "assistant"),
    [messages],
  );

  useGSAP(
    () => {
      if (!isOpen || !panelRef.current) return;
      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduceMotion) return;

      gsap.fromTo(
        panelRef.current,
        { autoAlpha: 0, y: 26, scale: 0.975 },
        { autoAlpha: 1, y: 0, scale: 1, duration: 0.5, ease: "power3.out" },
      );
      gsap.fromTo(
        panelRef.current.querySelectorAll("[data-support-reveal]"),
        { autoAlpha: 0, y: 10 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.38,
          stagger: 0.045,
          delay: 0.08,
          ease: "power2.out",
        },
      );
    },
    { dependencies: [isOpen], revertOnUpdate: true },
  );

  useEffect(() => {
    if (!isOpen) return;
    const timer = window.setTimeout(() => inputRef.current?.focus(), 380);
    return () => window.clearTimeout(timer);
  }, [isOpen]);

  useEffect(() => {
    const area = messagesRef.current;
    if (!area) return;
    area.scrollTo({
      top: area.scrollHeight,
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "auto"
        : "smooth",
    });
  }, [messages, isSending]);

  async function sendMessage(rawMessage) {
    const messageText = rawMessage.trim();
    if (!messageText || isSending) return;

    const userMessage = { id: createId("visitor"), role: "user", content: messageText };
    const pendingId = createId("assistant");
    const conversation = [...messages, userMessage]
      .slice(-8)
      .map(({ role, content }) => ({ role, content }));

    setInput("");
    setIsSending(true);
    setMessages((current) => [
      ...current,
      userMessage,
      { id: pendingId, role: "assistant", content: "" },
    ]);

    try {
      const response = await fetch("/api/assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: conversation }),
      });
      const result = await response.json().catch(() => null);

      if (!response.ok) {
        throw new Error(result?.error || "Guided support is temporarily unavailable.");
      }

      setMessages((current) =>
        current.map((message) =>
          message.id === pendingId
            ? { ...message, content: result.reply || "Please contact the Capwise team for review." }
            : message,
        ),
      );
    } catch (error) {
      setMessages((current) =>
        current.map((message) =>
          message.id === pendingId
            ? {
                ...message,
                content:
                  "I couldn’t load the approved answer just now. You can still contact the Capwise team directly by phone, WhatsApp or the consultation form.",
              }
            : message,
        ),
      );
      toast.error(error.message || "Guided support connection failed.");
    } finally {
      setIsSending(false);
    }
  }

  function handleSubmit(event) {
    event.preventDefault();
    sendMessage(input);
  }

  return (
    <>
      <div className="fixed bottom-4 right-4 z-[88] flex items-end gap-2.5 sm:bottom-6 sm:right-6">
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
          className="capwise-support-launcher group relative isolate flex min-h-15 items-center gap-3 overflow-hidden rounded-full border px-3 py-2.5 pr-5 text-left transition duration-300 hover:-translate-y-1"
          aria-haspopup="dialog"
          aria-expanded={isOpen}
        >
          <span className="absolute inset-y-0 left-0 -z-10 w-24 bg-gradient-to-r from-accent/14 to-transparent" />
          <span className="relative inline-flex size-10 shrink-0 items-center justify-center rounded-full bg-accent text-[#042f2e] shadow-[0_9px_24px_rgba(20,184,166,.28)]">
            <Sparkles aria-hidden="true" size={17} />
            <span className="absolute -right-0.5 -top-0.5 size-3 rounded-full border-2 border-[var(--assistant-launcher)] bg-[#34d399]" />
          </span>
          <span>
            <span className="block text-[0.58rem] font-bold uppercase tracking-[0.17em] text-accent-strong">
              Guided support
            </span>
            <span className="mt-0.5 block text-xs font-extrabold text-[var(--assistant-foreground)]">
              Ask Capwise
            </span>
          </span>
          <ArrowRight
            aria-hidden="true"
            size={15}
            className="ml-1 text-[var(--assistant-faint)] transition group-hover:translate-x-1 group-hover:text-accent-strong"
          />
        </button>
      </div>

      <Dialog open={isOpen} onClose={setIsOpen} className="relative z-[100]">
        <DialogBackdrop className="fixed inset-0 bg-[#020c17]/46 backdrop-blur-[3px] data-closed:opacity-0" />
        <div className="fixed inset-0 flex items-end justify-center p-2 sm:items-end sm:justify-end sm:p-6">
          <DialogPanel
            ref={panelRef}
            className="capwise-support-panel flex h-[min(48rem,calc(100svh-1rem))] w-full max-w-[27rem] flex-col overflow-hidden rounded-[1.75rem] border sm:h-[min(44rem,calc(100svh-3rem))]"
          >
            <header className="capwise-support-header relative overflow-hidden border-b px-5 pb-5 pt-5 sm:px-6">
              <div className="capwise-support-grid pointer-events-none absolute inset-0 opacity-60" />
              <div className="pointer-events-none absolute -right-12 -top-16 size-44 rounded-full bg-accent/16 blur-3xl" />

              <div className="relative flex items-start justify-between gap-4" data-support-reveal>
                <div className="flex items-center gap-3.5">
                  <span className="relative inline-flex size-12 items-center justify-center rounded-2xl border border-accent/25 bg-accent/10 text-accent-strong">
                    <Sparkles aria-hidden="true" size={20} />
                    <span className="absolute -right-0.5 -top-0.5 size-3 rounded-full border-2 border-[var(--assistant-background)] bg-[#34d399]" />
                  </span>
                  <div>
                    <DialogTitle className="font-display text-base font-extrabold tracking-[-0.03em] text-[var(--assistant-foreground)]">
                      Capwise Guided Support
                    </DialogTitle>
                    <p className="mt-1 flex items-center gap-1.5 text-[0.65rem] font-semibold text-[var(--assistant-muted)]">
                      <CheckCircle2 aria-hidden="true" size={13} className="text-accent-strong" />
                      Approved answers · Human handoff
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="inline-flex size-10 items-center justify-center rounded-full border border-[var(--assistant-border)] text-[var(--assistant-muted)] transition hover:border-accent/35 hover:bg-accent/8 hover:text-[var(--assistant-foreground)]"
                  aria-label="Close guided support"
                >
                  <X aria-hidden="true" size={18} />
                </button>
              </div>

              <div className="relative mt-5 grid grid-cols-2 gap-2" data-support-reveal>
                {quickActions.map(({ label, prompt, icon: Icon }) => (
                  <button
                    key={label}
                    type="button"
                    onClick={() => sendMessage(prompt)}
                    disabled={isSending}
                    className="capwise-support-action group flex min-h-16 items-center gap-3 rounded-xl border p-3 text-left transition disabled:cursor-wait disabled:opacity-55"
                  >
                    <span className="inline-flex size-9 shrink-0 items-center justify-center rounded-lg bg-accent/10 text-accent-strong">
                      <Icon aria-hidden="true" size={16} />
                    </span>
                    <span className="text-[0.67rem] font-bold leading-4 text-[var(--assistant-foreground)]">
                      {label}
                    </span>
                  </button>
                ))}
              </div>
            </header>

            <div
              ref={messagesRef}
              data-lenis-prevent
              aria-live="polite"
              className="capwise-support-messages flex-1 space-y-4 overflow-y-auto px-4 py-5 sm:px-6"
            >
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[88%] whitespace-pre-wrap rounded-2xl px-4 py-3 text-[0.78rem] leading-6 ${
                      message.role === "user"
                        ? "rounded-br-md bg-accent font-semibold text-[#042f2e]"
                        : "capwise-support-bubble rounded-bl-md border"
                    }`}
                  >
                    {message.content || (
                      <span className="inline-flex items-center gap-1.5 py-1" aria-label="Preparing approved answer">
                        {[0, 1, 2].map((dot) => (
                          <span
                            key={dot}
                            aria-hidden="true"
                            className="capwise-support-typing size-1.5 rounded-full bg-accent"
                            style={{ animationDelay: `${dot * 150}ms` }}
                          />
                        ))}
                      </span>
                    )}
                  </div>
                </div>
              ))}

              {hasConversation && latestAssistantMessage?.content && (
                <div className="grid grid-cols-2 gap-2 pt-1">
                  <Link
                    href="/contact"
                    onClick={() => setIsOpen(false)}
                    className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-accent px-3 text-[0.68rem] font-extrabold text-[#042f2e] transition hover:bg-[#5eead4]"
                  >
                    Book consultation
                    <ArrowRight aria-hidden="true" size={14} />
                  </Link>
                  <a
                    href="https://wa.me/8801624000381?text=Hello%20Capwise%2C%20I%20need%20help%20with%20a%20business%20compliance%20matter."
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-[var(--assistant-border)] px-3 text-[0.68rem] font-extrabold text-[var(--assistant-foreground)] transition hover:border-accent/40 hover:bg-accent/8"
                  >
                    WhatsApp
                    <ExternalLink aria-hidden="true" size={13} />
                  </a>
                </div>
              )}
            </div>

            <footer className="capwise-support-footer border-t p-4 sm:p-5" data-support-reveal>
              <form onSubmit={handleSubmit} className="relative">
                <label htmlFor="capwise-guided-support-input" className="sr-only">
                  Ask Capwise a question
                </label>
                <textarea
                  ref={inputRef}
                  id="capwise-guided-support-input"
                  value={input}
                  onChange={(event) => setInput(event.target.value.slice(0, 700))}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" && !event.shiftKey) {
                      event.preventDefault();
                      sendMessage(input);
                    }
                  }}
                  rows={1}
                  maxLength={700}
                  placeholder="Describe the business issue…"
                  className="capwise-support-input min-h-13 w-full resize-none rounded-2xl border py-3.5 pl-4 pr-14 text-sm outline-none transition"
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isSending}
                  className="absolute bottom-1.5 right-1.5 inline-flex size-10 items-center justify-center rounded-xl bg-accent text-[#042f2e] transition hover:bg-[#5eead4] disabled:cursor-not-allowed disabled:opacity-35"
                  aria-label="Send question"
                >
                  <Send aria-hidden="true" size={16} />
                </button>
              </form>
              <p className="mt-3 flex items-start gap-2 text-[0.6rem] leading-4 text-[var(--assistant-faint)]">
                <ShieldCheck aria-hidden="true" size={13} className="mt-0.5 shrink-0 text-accent-strong" />
                General information only. No guaranteed outcomes, current rates or personalized legal/tax advice. Do not share confidential documents.
              </p>
            </footer>
          </DialogPanel>
        </div>
      </Dialog>
    </>
  );
}
