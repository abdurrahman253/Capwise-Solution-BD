"use client";

import { ArrowUpRight, LockKeyhole } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";

const serviceOptions = [
  "Company Formation",
  "Tax & VAT",
  "Accounting & Bookkeeping",
  "Payroll & HR",
  "Corporate Secretarial",
  "Legal & Regulatory Advisory",
  "Business Advisory",
  "Other",
];

export default function ConsultationForm({ compact = false }) {
  const [submitting, setSubmitting] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();
    const form = event.currentTarget;

    if (!form.reportValidity()) return;

    const data = new FormData(form);
    if (data.get("website")) return;

    setSubmitting(true);

    const subject = `Consultation request — ${data.get("service") || "General enquiry"}`;
    const body = [
      `Name: ${data.get("name")}`,
      `Email: ${data.get("email")}`,
      `Phone: ${data.get("phone") || "Not provided"}`,
      `Company: ${data.get("company") || "Not provided"}`,
      `Service interest: ${data.get("service")}`,
      "",
      "Message:",
      data.get("message"),
    ].join("\n");

    window.location.href = `mailto:info@capwisebd.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    toast.success("Your email application is opening with the enquiry prepared.");
    window.setTimeout(() => setSubmitting(false), 500);
  }

  const fieldClass =
    "h-12 w-full rounded-xl border border-border bg-surface px-4 text-sm text-foreground outline-none transition placeholder:text-muted/70 focus:border-accent-strong focus:ring-4 focus:ring-accent/10";

  return (
    <form onSubmit={handleSubmit} className="grid gap-4">
      <input name="website" tabIndex="-1" autoComplete="off" className="hidden" aria-hidden="true" />

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="grid gap-2 text-xs font-bold text-foreground">
          Full name <span className="sr-only">required</span>
          <input className={fieldClass} name="name" required autoComplete="name" placeholder="Your name" />
        </label>
        <label className="grid gap-2 text-xs font-bold text-foreground">
          Work email <span className="sr-only">required</span>
          <input className={fieldClass} name="email" type="email" required autoComplete="email" placeholder="name@company.com" />
        </label>
      </div>

      {!compact && (
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="grid gap-2 text-xs font-bold text-foreground">
            Phone number
            <input className={fieldClass} name="phone" type="tel" autoComplete="tel" placeholder="+880 1XXX XXXXXX" />
          </label>
          <label className="grid gap-2 text-xs font-bold text-foreground">
            Company
            <input className={fieldClass} name="company" autoComplete="organization" placeholder="Company name" />
          </label>
        </div>
      )}

      <label className="grid gap-2 text-xs font-bold text-foreground">
        Service interest <span className="sr-only">required</span>
        <select className={fieldClass} name="service" required defaultValue="">
          <option value="" disabled>Select a service</option>
          {serviceOptions.map((option) => <option key={option}>{option}</option>)}
        </select>
      </label>

      <label className="grid gap-2 text-xs font-bold text-foreground">
        What would you like to solve? <span className="sr-only">required</span>
        <textarea
          className="min-h-32 w-full resize-y rounded-xl border border-border bg-surface px-4 py-3 text-sm leading-6 text-foreground outline-none transition placeholder:text-muted/70 focus:border-accent-strong focus:ring-4 focus:ring-accent/10"
          name="message"
          required
          minLength={20}
          placeholder="Share the situation, timing and the practical outcome you need."
        />
      </label>

      <label className="flex items-start gap-3 text-xs leading-5 text-muted">
        <input type="checkbox" name="consent" required className="mt-1 size-4 rounded border-border accent-[var(--accent-strong)]" />
        <span>I consent to Capwise using these details to respond to this enquiry. Please do not attach sensitive tax or company documents at this stage.</span>
      </label>

      <div className="flex flex-col gap-4 pt-2 sm:flex-row sm:items-center sm:justify-between">
        <p className="inline-flex items-center gap-2 text-[0.68rem] font-semibold text-muted">
          <LockKeyhole aria-hidden="true" size={14} className="text-accent-strong" />
          This stage prepares a direct email to info@capwisebd.com.
        </p>
        <button
          type="submit"
          disabled={submitting}
          className="inline-flex h-12 items-center justify-center gap-3 rounded-full bg-action px-6 text-sm font-bold text-action-foreground transition hover:-translate-y-0.5 hover:bg-action-hover disabled:cursor-wait disabled:opacity-65"
        >
          {submitting ? "Preparing…" : "Prepare consultation email"}
          <ArrowUpRight aria-hidden="true" size={17} />
        </button>
      </div>
    </form>
  );
}
