"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, LoaderCircle, Radar, ShieldCheck } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

import { newsletterSchema } from "@/schemas/newsletter";

const topics = ["Tax & VAT", "RJSC & Corporate", "Investment", "Labour & HR"];

function getCurrentTimestamp() {
  return Date.now();
}

export default function NewsletterForm() {
  const [reference, setReference] = useState("");
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(newsletterSchema),
    defaultValues: {
      name: "",
      email: "",
      company: "",
      topics: [],
      consent: false,
      website: "",
      startedAt: 1,
    },
  });


  useEffect(() => {
    setValue("startedAt", getCurrentTimestamp(), {
      shouldDirty: false,
      shouldTouch: false,
      shouldValidate: false,
    });
  }, [setValue]);

  async function onSubmit(values) {
    const toastId = toast.loading("Recording your update preferences…");
    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const result = await response.json().catch(() => null);
      if (!response.ok) throw new Error(result?.error || "The subscription could not be recorded.");
      setReference(result.reference || "Recorded");
      toast.update(toastId, {
        render: result.message || "Your preferences have been recorded.",
        type: "success",
        isLoading: false,
        autoClose: 5000,
      });
      reset({
        name: "",
        email: "",
        company: "",
        topics: [],
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
    "h-12 w-full rounded-xl border border-white/12 bg-white/[0.055] px-4 text-sm text-white outline-none transition placeholder:text-white/30 focus:border-accent/55 focus:bg-white/[0.075]";

  if (reference) {
    return (
      <div className="rounded-[1.35rem] border border-accent/25 bg-accent/10 p-6 text-white" role="status">
        <CheckCircle2 aria-hidden="true" size={24} className="text-accent" />
        <h3 className="mt-4 font-display text-2xl font-bold tracking-[-0.04em]">Preferences recorded.</h3>
        <p className="mt-3 text-sm leading-7 text-white/65">
          Capwise will only send reviewed updates with a visible source and review date. Reference: {reference}
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4" noValidate>
      <input {...register("startedAt")} type="hidden" />
      <input {...register("website")} className="absolute -left-[9999px]" tabIndex="-1" autoComplete="off" />
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="grid gap-2 text-xs font-bold text-white">
          Name
          <input {...register("name")} className={inputClass} placeholder="Your name" />
          {errors.name && <span className="text-[0.68rem] text-[#fca5a5]">{errors.name.message}</span>}
        </label>
        <label className="grid gap-2 text-xs font-bold text-white">
          Work email
          <input {...register("email")} className={inputClass} type="email" placeholder="name@company.com" />
          {errors.email && <span className="text-[0.68rem] text-[#fca5a5]">{errors.email.message}</span>}
        </label>
      </div>
      <label className="grid gap-2 text-xs font-bold text-white">
        Company <span className="font-medium text-white/45">(optional)</span>
        <input {...register("company")} className={inputClass} placeholder="Company name" />
      </label>

      <fieldset>
        <legend className="text-xs font-bold text-white">Topics to follow</legend>
        <div className="mt-3 grid gap-2 sm:grid-cols-2">
          {topics.map((topic) => (
            <label key={topic} className="flex min-h-11 items-center gap-3 rounded-xl border border-white/10 bg-white/[0.04] px-3 text-xs font-semibold text-white/72">
              <input {...register("topics")} type="checkbox" value={topic} className="size-4 accent-[#2dd4bf]" />
              {topic}
            </label>
          ))}
        </div>
        {errors.topics && <p className="mt-2 text-[0.68rem] text-[#fca5a5]">{errors.topics.message}</p>}
      </fieldset>

      <label className="flex items-start gap-3 rounded-xl border border-white/10 bg-white/[0.04] p-4 text-xs leading-5 text-white/55">
        <input {...register("consent")} type="checkbox" className="mt-0.5 size-4 accent-[#2dd4bf]" />
        <span>
          I consent to Capwise recording these preferences and sending relevant reviewed updates. I understand this is general information, not personal advice.
          {errors.consent && <span className="mt-1 block text-[#fca5a5]">{errors.consent.message}</span>}
        </span>
      </label>

      <button
        type="submit"
        disabled={isSubmitting}
        className="inline-flex h-12 items-center justify-center gap-3 rounded-full bg-accent px-6 text-sm font-bold text-[#042f2e] transition hover:bg-[#5eead4] disabled:cursor-wait disabled:opacity-60"
      >
        {isSubmitting ? (
          <><LoaderCircle aria-hidden="true" size={17} className="animate-spin" /> Recording…</>
        ) : (
          <><Radar aria-hidden="true" size={17} /> Follow reviewed updates</>
        )}
      </button>
      <p className="flex items-start gap-2 text-[0.6rem] leading-4 text-white/38">
        <ShieldCheck aria-hidden="true" size={13} className="mt-0.5 shrink-0 text-accent" />
        No fabricated bulletins, hardcoded changing rates or regulator claims. Editorial approval is required before publication.
      </p>
    </form>
  );
}
