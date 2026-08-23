"use client";

import { useGSAP } from "@gsap/react";
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from "@headlessui/react";
import gsap from "gsap";
import {
  ArrowRight,
  Building2,
  CheckCircle2,
  ExternalLink,
  Headset,
  Landmark,
  MessageCircle,
  PhoneCall,
  Scale,
  Send,
  ShieldCheck,
  UserRoundCheck,
  X,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { toast } from "react-toastify";

import { primaryContact, whatsappHref } from "@/config/contacts";

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
];

function createId(prefix) {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

export default function SupportAssistant() {
  const panelRef = useRef(null);
  const messagesRef = useRef(null);
  const inputRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [nearFooter, setNearFooter] = useState(false);

  const hasConversation = messages.length > 0;
  const latestAssistantMessage = useMemo(
    () => [...messages].reverse().find((message) => message.role === "assistant"),
    [messages],
  );

  useEffect(() => {
    const footer = document.querySelector("footer");
    if (!footer) return;
    const observer = new IntersectionObserver(([entry]) => setNearFooter(entry.isIntersecting));
    observer.observe(footer);
    return () => observer.disconnect();
  }, []);

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
      <div
        className={`fixed bottom-4 right-4 z-[88] transition-[opacity,transform] duration-300 ease-out sm:bottom-6 sm:right-6 ${
          nearFooter ? "pointer-events-none translate-y-3 opacity-0" : "translate-y-0 opacity-100"
        }`}
      >
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="capwise-support-launcher group flex min-h-14 items-center gap-3 rounded-full border px-3 py-2 pr-4 text-left shadow-[0_10px_28px_rgba(11,27,61,0.16)] transition duration-200 hover:-translate-y-1"
          aria-haspopup="dialog"
          aria-expanded={isOpen}
        >
          <span className="relative inline-flex size-9 shrink-0 items-center justify-center rounded-full bg-accent/12 text-accent-strong">
            <Headset aria-hidden="true" size={17} strokeWidth={1.75} />
            <span className="absolute -right-px -top-px flex size-2.5 items-center justify-center rounded-full bg-[var(--assistant-launcher)]">
              <span className="size-1.5 rounded-full bg-[#34d399]" />
            </span>
          </span>
          <span className="mt-0.5 block text-[0.8rem] font-bold leading-none text-[var(--assistant-foreground)]">
            Talk to an Adviser
          </span>
          <ArrowRight
            aria-hidden="true"
            size={14}
            className="ml-0.5 shrink-0 text-[var(--assistant-faint)] transition group-hover:translate-x-1 group-hover:text-accent-strong"
          />
        </button>
      </div>

      <Dialog open={isOpen} onClose={setIsOpen} className="relative z-[100]">
        <DialogBackdrop
          className="fixed inset-0 bg-[#020c17]/46 backdrop-blur-[3px] duration-300 data-[closed]:opacity-0"
          transition
        />
        <div className="fixed inset-0 flex items-end justify-center p-2 sm:items-end sm:justify-end sm:p-6">
          <DialogPanel
            ref={panelRef}
            className="capwise-support-panel flex h-[min(48rem,calc(100svh-1rem))] w-full max-w-[27rem] flex-col overflow-hidden rounded-[1.5rem] border duration-300 data-[closed]:translate-y-3 data-[closed]:opacity-0 sm:h-[min(44rem,calc(100svh-3rem))]"
            transition
          >
            <header className="capwise-support-header relative overflow-hidden border-b px-5 pb-0 pt-5 sm:px-6">
              <div className="pointer-events-none absolute -right-14 -top-16 size-48 rounded-full bg-accent/12 blur-[70px]" />

              <div className="relative flex items-start justify-between gap-4" data-support-reveal>
                <div className="flex items-center gap-3.5">
                  <span className="relative inline-flex size-12 items-center justify-center rounded-2xl border border-accent/25 bg-accent/10 text-accent-strong">
                    <Headset aria-hidden="true" size={20} strokeWidth={1.75} />
                    <span className="absolute -right-0.5 -top-0.5 size-3 rounded-full border-2 border-[var(--assistant-background)] bg-[#34d399]" />
                  </span>
                  <div>
                    <DialogTitle className="font-display text-h3 font-bold text-[var(--assistant-foreground)]">
                      Talk to an Adviser
                    </DialogTitle>
                    <p className="mt-1 flex items-center gap-1.5 text-[0.7rem] font-semibold text-[var(--assistant-muted)]">
                      <CheckCircle2 aria-hidden="true" size={13} className="text-accent-strong" />
                      Approved answers · Human handoff
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="inline-flex size-11 shrink-0 items-center justify-center rounded-full border border-[var(--assistant-border)] text-[var(--assistant-muted)] transition hover:border-accent/35 hover:bg-accent/8 hover:text-[var(--assistant-foreground)]"
                  aria-label="Close guided support"
                >
                  <X aria-hidden="true" size={18} />
                </button>
              </div>

              <p className="relative mt-4 text-[0.8rem] leading-6 text-[var(--assistant-muted)]" data-support-reveal>
                Select a topic below, or describe your situation. We&rsquo;ll direct you to the right adviser.
              </p>

              <div className="capwise-support-actions relative mt-5 -mx-5 grid grid-cols-1 gap-px border-t px-5 pt-px sm:-mx-6 sm:px-6" data-support-reveal>
                {quickActions.map(({ label, prompt, icon: Icon }) => (
                  <button
                    key={label}
                    type="button"
                    onClick={() => sendMessage(prompt)}
                    disabled={isSending}
                    className="capwise-support-action group flex min-h-[3.25rem] items-center gap-3 p-3.5 text-left transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-accent-strong disabled:cursor-wait disabled:opacity-55 sm:p-4"
                  >
                    <span className="inline-flex size-9 shrink-0 items-center justify-center rounded-xl bg-accent/10 text-accent-strong transition duration-200 group-hover:bg-accent/16 group-hover:-translate-y-0.5 group-focus-visible:bg-accent/16">
                      <Icon aria-hidden="true" size={16} strokeWidth={1.75} />
                    </span>
                    <span className="text-[0.75rem] font-bold leading-4 text-[var(--assistant-foreground)]">
                      {label}
                    </span>
                  </button>
                ))}
              </div>

              <div className="relative mt-4 -mx-5 border-t border-[var(--assistant-border)] px-5 pb-5 pt-4 sm:-mx-6 sm:px-6" data-support-reveal>
                <p className="flex items-center gap-1.5 text-micro font-bold uppercase text-[var(--assistant-muted)]">
                  <UserRoundCheck aria-hidden="true" size={13} className="text-accent-strong" />
                  Talk to a human directly
                </p>
                <div className="mt-2.5 grid grid-cols-2 gap-2.5">
                  <a
                    href={`tel:${primaryContact.tel}`}
                    className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-[var(--assistant-border)] text-[0.75rem] font-bold text-[var(--assistant-foreground)] transition hover:border-accent/40 hover:bg-accent/8"
                  >
                    <PhoneCall aria-hidden="true" size={15} />
                    Call now
                  </a>
                  <a
                    href={whatsappHref(primaryContact.whatsapp, "Hello Capwise, I would like to discuss business support.")}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-[var(--assistant-border)] text-[0.75rem] font-bold text-[var(--assistant-foreground)] transition hover:border-accent/40 hover:bg-accent/8"
                  >
                    <MessageCircle aria-hidden="true" size={15} />
                    WhatsApp
                  </a>
                </div>
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
                        ? "rounded-br-md bg-accent font-semibold text-[#1b1464]"
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
                    className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-action px-3 text-[0.68rem] font-extrabold text-action-foreground transition hover:bg-action-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-strong focus-visible:ring-offset-1"
                  >
                    Book a Free Consultation
                    <ArrowRight aria-hidden="true" size={14} />
                  </Link>
                  <a
                    href={whatsappHref(primaryContact.whatsapp, "Hello Capwise, I need help with a business compliance matter.")}
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
                  className="absolute bottom-1.5 right-1.5 inline-flex size-11 items-center justify-center rounded-xl bg-accent text-[#1b1464] transition hover:bg-[#e5c95f] disabled:cursor-not-allowed disabled:opacity-35"
                  aria-label="Send question"
                >
                  <Send aria-hidden="true" size={16} />
                </button>
              </form>
              <p className="mt-3 flex items-start gap-2 text-micro text-[var(--assistant-faint)]">
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
