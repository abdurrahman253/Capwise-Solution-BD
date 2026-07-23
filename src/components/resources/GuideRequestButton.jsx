"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from "@headlessui/react";
import { ArrowRight, BookOpenCheck, CheckCircle2, LoaderCircle, ShieldCheck, X } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

import { resourceRequestSchema } from "@/schemas/resourceRequest";

function getCurrentTimestamp() {
  return Date.now();
}

export default function GuideRequestButton({ guide, featured = false }) {
  const [open, setOpen] = useState(false);
  const [complete, setComplete] = useState("");
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(resourceRequestSchema),
    defaultValues: {
      name: "",
      email: "",
      company: "",
      resourceSlug: guide.slug,
      resourceTitle: guide.title,
      consent: false,
      website: "",
      startedAt: 1,
    },
  });

  async function onSubmit(values) {
    const toastId = toast.loading("Recording your guide interest…");
    try {
      const response = await fetch("/api/resource-requests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const result = await response.json().catch(() => null);
      if (!response.ok) throw new Error(result?.error || "The request could not be recorded.");

      setComplete(result.reference || "Recorded");
      toast.update(toastId, {
        render: result.message || "Your guide interest has been recorded.",
        type: "success",
        isLoading: false,
        autoClose: 5000,
      });
      reset({
        name: "",
        email: "",
        company: "",
        resourceSlug: guide.slug,
        resourceTitle: guide.title,
        consent: false,
        website: "",
        startedAt: getCurrentTimestamp(),
      });
    } catch (error) {
      toast.update(toastId, {
        render: error.message || "Please try again.",
        type: "error",
        isLoading: false,
        autoClose: 5500,
      });
    }
  }

  const inputClass =
    "h-11 w-full rounded-xl border border-border bg-surface px-3.5 text-sm text-foreground outline-none transition placeholder:text-muted/60 focus:border-accent-strong focus:ring-4 focus:ring-accent/10";

  return (
    <>
      <button
        type="button"
        onClick={() => {
          setComplete("");
          setValue("startedAt", getCurrentTimestamp(), {
            shouldDirty: false,
            shouldTouch: false,
            shouldValidate: false,
          });
          setOpen(true);
        }}
        className={`mt-auto flex w-full items-center justify-between gap-4 border-t pt-6 text-left text-xs font-bold transition sm:text-sm ${
          featured
            ? "border-white/12 text-white/72 hover:text-accent"
            : "border-border text-foreground/72 hover:text-accent-strong"
        }`}
      >
        Request release notification
        <ArrowRight aria-hidden="true" size={16} />
      </button>

      <Dialog open={open} onClose={setOpen} className="relative z-[110]">
        <DialogBackdrop className="fixed inset-0 bg-[#020c17]/56 backdrop-blur-sm" />
        <div className="fixed inset-0 grid place-items-center overflow-y-auto p-3 sm:p-6">
          <DialogPanel className="w-full max-w-xl overflow-hidden rounded-[1.7rem] border border-border bg-background shadow-[0_40px_120px_rgba(2,12,23,.42)]">
            <div className="relative overflow-hidden border-b border-border bg-brand px-6 py-6 text-white sm:px-8">
              <div className="pointer-events-none absolute -right-16 -top-20 size-52 rounded-full bg-accent/18 blur-3xl" />
              <div className="relative flex items-start justify-between gap-5">
                <div>
                  <p className="text-[0.6rem] font-bold uppercase tracking-[0.18em] text-accent">
                    Editorial release notification
                  </p>
                  <DialogTitle className="mt-3 max-w-[20ch] font-display text-2xl font-bold leading-tight tracking-[-0.045em] text-white sm:text-3xl">
                    {guide.title}
                  </DialogTitle>
                </div>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="inline-flex size-10 shrink-0 items-center justify-center rounded-full border border-white/12 text-white/65 transition hover:bg-white/8 hover:text-white"
                  aria-label="Close guide request"
                >
                  <X aria-hidden="true" size={18} />
                </button>
              </div>
            </div>

            <div className="p-6 sm:p-8">
              {complete ? (
                <div role="status">
                  <span className="inline-flex size-12 items-center justify-center rounded-full bg-accent text-[#042f2e]">
                    <CheckCircle2 aria-hidden="true" size={21} />
                  </span>
                  <h3 className="mt-5 font-display text-2xl font-bold tracking-[-0.04em] text-foreground">
                    Interest recorded.
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-muted">
                    Capwise will only contact you about this guide when an approved version is ready. Reference: <strong className="text-foreground">{complete}</strong>
                  </p>
                  <button
                    type="button"
                    onClick={() => setOpen(false)}
                    className="mt-6 inline-flex h-11 items-center justify-center rounded-full bg-action px-6 text-xs font-bold text-action-foreground"
                  >
                    Close
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4" noValidate>
                  <div className="flex items-start gap-3 rounded-xl border border-gold/25 bg-gold/8 p-4 text-xs leading-6 text-muted">
                    <BookOpenCheck aria-hidden="true" size={18} className="mt-0.5 shrink-0 text-gold" />
                    This is not a download gate for an unfinished file. It records genuine interest so Capwise can notify you after content, citations and legal review are complete.
                  </div>
                  <input {...register("startedAt")} type="hidden" />
                  <input {...register("resourceSlug")} type="hidden" />
                  <input {...register("resourceTitle")} type="hidden" />
                  <input {...register("website")} className="absolute -left-[9999px]" tabIndex="-1" autoComplete="off" />

                  <div className="grid gap-4 sm:grid-cols-2">
                    <label className="grid gap-2 text-xs font-bold text-foreground">
                      Name
                      <input {...register("name")} className={inputClass} placeholder="Your name" />
                      {errors.name && <span className="text-[0.68rem] text-danger">{errors.name.message}</span>}
                    </label>
                    <label className="grid gap-2 text-xs font-bold text-foreground">
                      Work email
                      <input {...register("email")} className={inputClass} type="email" placeholder="name@company.com" />
                      {errors.email && <span className="text-[0.68rem] text-danger">{errors.email.message}</span>}
                    </label>
                  </div>

                  <label className="grid gap-2 text-xs font-bold text-foreground">
                    Company <span className="font-medium text-muted">(optional)</span>
                    <input {...register("company")} className={inputClass} placeholder="Company name" />
                  </label>

                  <label className="flex items-start gap-3 rounded-xl border border-border bg-surface p-4 text-xs leading-5 text-muted">
                    <input {...register("consent")} type="checkbox" className="mt-0.5 size-4 accent-[var(--accent-strong)]" />
                    <span>
                      I consent to Capwise recording my details and contacting me about this guide release.
                      {errors.consent && <span className="mt-1 block text-danger">{errors.consent.message}</span>}
                    </span>
                  </label>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex h-12 items-center justify-center gap-3 rounded-full bg-action px-6 text-sm font-bold text-action-foreground transition hover:bg-action-hover disabled:cursor-wait disabled:opacity-60"
                  >
                    {isSubmitting ? (
                      <><LoaderCircle aria-hidden="true" size={17} className="animate-spin" /> Recording…</>
                    ) : (
                      <><ShieldCheck aria-hidden="true" size={17} /> Record my interest</>
                    )}
                  </button>
                </form>
              )}
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </>
  );
}
