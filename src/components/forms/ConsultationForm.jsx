"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  LoaderCircle,
  LockKeyhole,
  MailCheck,
  ShieldCheck,
} from "lucide-react";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

import {
  consultationSchema,
  consultationServices,
} from "@/schemas/consultation";

function FieldError({ id, message }) {
  if (!message) return null;
  return (
    <p id={id} className="text-[0.68rem] font-semibold leading-5 text-danger" role="alert">
      {message}
    </p>
  );
}

export default function ConsultationForm({ compact = false }) {
  const startedAtRef = useRef(Date.now());
  const [step, setStep] = useState(1);
  const [submittedReference, setSubmittedReference] = useState("");
  const {
    register,
    handleSubmit,
    trigger,
    reset,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(consultationSchema),
    mode: "onTouched",
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      company: "",
      service: "",
      message: "",
      consent: false,
      website: "",
      startedAt: Date.now(),
      sourcePath: "",
    },
  });

  async function goToDetails() {
    const fields = compact
      ? ["name", "email", "service"]
      : ["name", "email", "phone", "company", "service"];
    const valid = await trigger(fields, { shouldFocus: true });
    if (valid) setStep(2);
  }

  async function onSubmit(values) {
    const toastId = toast.loading("Sending your consultation request…");

    try {
      const response = await fetch("/api/consultations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...values,
          startedAt: startedAtRef.current,
          sourcePath: window.location.pathname,
        }),
      });
      const result = await response.json().catch(() => null);

      if (!response.ok) {
        if (result?.fields) {
          Object.entries(result.fields).forEach(([name, message]) => {
            setError(name, { type: "server", message });
          });
        }
        throw new Error(result?.error || "The enquiry could not be sent.");
      }

      setSubmittedReference(result.reference || "");
      toast.update(toastId, {
        render: result.message || "Your consultation request has been sent.",
        type: "success",
        isLoading: false,
        autoClose: 5000,
      });
      reset();
      startedAtRef.current = Date.now();
    } catch (error) {
      toast.update(toastId, {
        render: error.message || "Something went wrong. Please try again.",
        type: "error",
        isLoading: false,
        autoClose: 6000,
      });
    }
  }

  if (submittedReference) {
    return (
      <div className="rounded-[1.35rem] border border-accent/25 bg-accent/8 p-6 sm:p-7" role="status">
        <span className="inline-flex size-12 items-center justify-center rounded-full bg-accent text-[#042f2e]">
          <MailCheck aria-hidden="true" size={21} />
        </span>
        <h3 className="mt-5 font-display text-2xl font-bold tracking-[-0.045em] text-foreground">
          Enquiry sent successfully.
        </h3>
        <p className="mt-3 text-sm leading-7 text-muted">
          The Capwise team received your briefing. Keep this reference for follow-up:
        </p>
        <p className="mt-4 inline-flex rounded-full border border-accent/30 bg-surface px-4 py-2 text-xs font-extrabold tracking-[0.08em] text-accent-strong">
          {submittedReference}
        </p>
        <button
          type="button"
          onClick={() => {
            setSubmittedReference("");
            setStep(1);
          }}
          className="mt-6 block text-xs font-bold text-foreground underline decoration-accent/50 underline-offset-4"
        >
          Send another enquiry
        </button>
      </div>
    );
  }

  const fieldClass =
    "h-12 w-full rounded-xl border border-border bg-surface px-4 text-sm text-foreground outline-none transition placeholder:text-muted/65 focus:border-accent-strong focus:ring-4 focus:ring-accent/10 aria-[invalid=true]:border-danger aria-[invalid=true]:focus:ring-danger/10";

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid gap-5" noValidate>
      <div className="flex items-center justify-between gap-4 border-b border-border pb-5">
        <div>
          <p className="text-[0.6rem] font-bold uppercase tracking-[0.18em] text-accent-strong">
            Step {step} of 2
          </p>
          <p className="mt-1 text-sm font-bold text-foreground">
            {step === 1 ? "Contact and service fit" : "Business briefing and consent"}
          </p>
        </div>
        <div className="flex items-center gap-2" aria-hidden="true">
          {[1, 2].map((item) => (
            <span
              key={item}
              className={`h-1.5 rounded-full transition-all ${
                item <= step ? "w-10 bg-accent" : "w-5 bg-border"
              }`}
            />
          ))}
        </div>
      </div>

      <input
        {...register("website")}
        tabIndex="-1"
        autoComplete="off"
        className="absolute -left-[9999px] h-px w-px overflow-hidden"
        aria-hidden="true"
      />

      {step === 1 && (
        <div className="grid gap-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="grid gap-2 text-xs font-bold text-foreground">
              Full name
              <input
                {...register("name")}
                className={fieldClass}
                autoComplete="name"
                placeholder="Your name"
                aria-invalid={Boolean(errors.name)}
                aria-describedby={errors.name ? "consultation-name-error" : undefined}
              />
              <FieldError id="consultation-name-error" message={errors.name?.message} />
            </label>
            <label className="grid gap-2 text-xs font-bold text-foreground">
              Work email
              <input
                {...register("email")}
                className={fieldClass}
                type="email"
                autoComplete="email"
                placeholder="name@company.com"
                aria-invalid={Boolean(errors.email)}
                aria-describedby={errors.email ? "consultation-email-error" : undefined}
              />
              <FieldError id="consultation-email-error" message={errors.email?.message} />
            </label>
          </div>

          {!compact && (
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="grid gap-2 text-xs font-bold text-foreground">
                Phone number <span className="font-medium text-muted">(optional)</span>
                <input
                  {...register("phone")}
                  className={fieldClass}
                  type="tel"
                  autoComplete="tel"
                  placeholder="+880 1XXX XXXXXX"
                  aria-invalid={Boolean(errors.phone)}
                />
                <FieldError id="consultation-phone-error" message={errors.phone?.message} />
              </label>
              <label className="grid gap-2 text-xs font-bold text-foreground">
                Company <span className="font-medium text-muted">(optional)</span>
                <input
                  {...register("company")}
                  className={fieldClass}
                  autoComplete="organization"
                  placeholder="Company name"
                  aria-invalid={Boolean(errors.company)}
                />
                <FieldError id="consultation-company-error" message={errors.company?.message} />
              </label>
            </div>
          )}

          <label className="grid gap-2 text-xs font-bold text-foreground">
            Service interest
            <select
              {...register("service")}
              className={fieldClass}
              defaultValue=""
              aria-invalid={Boolean(errors.service)}
              aria-describedby={errors.service ? "consultation-service-error" : undefined}
            >
              <option value="" disabled>
                Select a service
              </option>
              {consultationServices.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            <FieldError id="consultation-service-error" message={errors.service?.message} />
          </label>

          <button
            type="button"
            onClick={goToDetails}
            className="mt-1 inline-flex h-12 items-center justify-center gap-3 rounded-full bg-action px-6 text-sm font-bold text-action-foreground transition hover:-translate-y-0.5 hover:bg-action-hover"
          >
            Continue to briefing
            <ArrowRight aria-hidden="true" size={17} />
          </button>
        </div>
      )}

      {step === 2 && (
        <div className="grid gap-4">
          <div className="rounded-xl border border-border bg-surface-muted/55 p-4 text-xs leading-6 text-muted">
            <p className="flex items-start gap-2 font-semibold text-foreground">
              <ShieldCheck aria-hidden="true" size={16} className="mt-1 shrink-0 text-accent-strong" />
              A focused briefing helps Capwise route the enquiry to the right adviser.
            </p>
            <p className="mt-1 pl-6">Mention the entity, immediate issue, deadline and practical outcome needed.</p>
          </div>

          <label className="grid gap-2 text-xs font-bold text-foreground">
            What would you like to solve?
            <textarea
              {...register("message")}
              className="min-h-40 w-full resize-y rounded-xl border border-border bg-surface px-4 py-3 text-sm leading-6 text-foreground outline-none transition placeholder:text-muted/65 focus:border-accent-strong focus:ring-4 focus:ring-accent/10 aria-[invalid=true]:border-danger"
              placeholder="Example: We are setting up a foreign-owned company and need help choosing the structure, preparing the registration sequence and understanding the ongoing compliance workstream."
              aria-invalid={Boolean(errors.message)}
              aria-describedby={errors.message ? "consultation-message-error" : undefined}
            />
            <FieldError id="consultation-message-error" message={errors.message?.message} />
          </label>

          <label className="flex items-start gap-3 rounded-xl border border-border bg-surface p-4 text-xs leading-5 text-muted">
            <input
              {...register("consent")}
              type="checkbox"
              className="mt-0.5 size-4 shrink-0 rounded border-border accent-[var(--accent-strong)]"
              aria-invalid={Boolean(errors.consent)}
            />
            <span>
              I consent to Capwise using these details to respond to this enquiry. I will not send sensitive tax, banking, identity or company documents at this stage.
              <FieldError id="consultation-consent-error" message={errors.consent?.message} />
            </span>
          </label>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <button
              type="button"
              onClick={() => setStep(1)}
              disabled={isSubmitting}
              className="inline-flex h-11 items-center justify-center gap-2 rounded-full border border-border bg-surface px-5 text-xs font-bold text-foreground transition hover:border-accent"
            >
              <ArrowLeft aria-hidden="true" size={16} />
              Back
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex h-12 items-center justify-center gap-3 rounded-full bg-action px-6 text-sm font-bold text-action-foreground transition hover:-translate-y-0.5 hover:bg-action-hover disabled:cursor-wait disabled:opacity-65"
            >
              {isSubmitting ? (
                <>
                  <LoaderCircle aria-hidden="true" size={17} className="animate-spin motion-reduce:animate-none" />
                  Sending securely…
                </>
              ) : (
                <>
                  Send consultation request
                  <Check aria-hidden="true" size={17} />
                </>
              )}
            </button>
          </div>
        </div>
      )}

      <p className="flex items-start gap-2 text-[0.66rem] font-semibold leading-5 text-muted">
        <LockKeyhole aria-hidden="true" size={14} className="mt-0.5 shrink-0 text-accent-strong" />
        The form sends through a protected server route and creates a unique enquiry reference. Email delivery requires the Resend environment variables.
      </p>
    </form>
  );
}
