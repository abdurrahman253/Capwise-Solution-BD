"use client";

import { AlertTriangle, RotateCcw } from "lucide-react";
import { useEffect } from "react";

export default function GlobalError({ error, reset }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="capwise-not-found grid min-h-screen place-items-center px-4 py-16">
      <div className="w-full max-w-2xl rounded-[1.8rem] border border-border bg-surface p-7 text-center shadow-[0_30px_90px_rgba(11,31,51,0.14)] sm:p-12">
        <span className="mx-auto inline-flex size-14 items-center justify-center rounded-full border border-danger/25 bg-danger/10 text-danger"><AlertTriangle aria-hidden="true" size={22} /></span>
        <p className="mt-7 text-[0.62rem] font-bold uppercase tracking-[0.2em] text-danger">Unexpected interruption</p>
        <h1 className="mt-4 font-display text-4xl font-semibold tracking-[-0.055em] text-foreground sm:text-5xl">This view could not be completed.</h1>
        <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-muted">No data has been submitted. Retry the view, or return to the homepage if the issue continues.</p>
        <button onClick={reset} className="mx-auto mt-8 inline-flex h-12 items-center gap-3 rounded-full bg-action px-6 text-sm font-bold text-action-foreground transition hover:bg-action-hover"><RotateCcw aria-hidden="true" size={17} /> Try again</button>
      </div>
    </main>
  );
}
