"use client";

import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { ChevronDown } from "lucide-react";

export default function FaqAccordion({ items, inverse = false }) {
  return (
    <div className="divide-y divide-border">
      {items.map((item, index) => (
        <Disclosure key={item.id} as="div" id={item.id} className="group scroll-mt-36">
          {({ open }) => (
            <>
              <DisclosureButton className="flex w-full items-start justify-between gap-5 py-6 text-left sm:py-7">
                <span className="flex min-w-0 gap-4 sm:gap-6">
                  <span
                    className={`mt-1 shrink-0 font-display text-[0.68rem] font-bold ${
                      inverse ? "text-white/35" : "text-foreground/28"
                    }`}
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span
                    className={`font-display text-lg font-semibold leading-snug tracking-[-0.03em] sm:text-xl ${
                      inverse ? "text-white" : "text-foreground"
                    }`}
                  >
                    {item.question}
                  </span>
                </span>

                <span
                  className={`mt-0.5 inline-flex size-9 shrink-0 items-center justify-center rounded-full border transition ${
                    inverse
                      ? "border-white/15 text-white/65 group-hover:border-accent group-hover:text-accent"
                      : "border-border text-muted group-hover:border-accent-strong group-hover:text-accent-strong"
                  }`}
                >
                  <ChevronDown
                    aria-hidden="true"
                    size={17}
                    className={`transition-transform duration-300 ${open ? "rotate-180" : ""}`}
                  />
                </span>
              </DisclosureButton>

              <DisclosurePanel
                transition
                className="origin-top overflow-hidden pb-7 pl-10 pr-12 transition duration-300 ease-out data-closed:-translate-y-2 data-closed:opacity-0 sm:pl-14 sm:pr-20"
              >
                <p
                  className={`max-w-3xl text-sm leading-7 sm:text-base sm:leading-8 ${
                    inverse ? "text-white/64" : "text-muted"
                  }`}
                >
                  {item.answer}
                </p>
              </DisclosurePanel>
            </>
          )}
        </Disclosure>
      ))}
    </div>
  );
}
