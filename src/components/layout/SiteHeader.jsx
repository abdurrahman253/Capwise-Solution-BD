"use client";

import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Popover,
  PopoverButton,
  PopoverPanel,
} from "@headlessui/react";
import clsx from "clsx";
import {
  ArrowRight,
  ArrowUpRight,
  ChevronDown,
  Mail,
  MapPin,
  Menu,
  Phone,
  X,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

import { primaryNavigation, services } from "@/config/navigation";
import BrandLogo from "@/components/ui/BrandLogo";
import ThemeToggle from "@/components/ui/ThemeToggle";

const navLinkClasses =
  "relative inline-flex h-11 items-center whitespace-nowrap rounded-lg px-3 text-[0.83rem] font-semibold transition-colors hover:text-accent-strong focus-visible:outline-none";

export default function SiteHeader() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isCurrent = (href) =>
    href === "/" ? pathname === href : pathname.startsWith(href);

  const servicesAreCurrent = pathname.startsWith("/services");

  return (
    <>
      <a
        href="#main-content"
        className="fixed left-4 top-4 z-[100] -translate-y-24 rounded-lg bg-action px-4 py-3 text-sm font-semibold text-action-foreground shadow-lg transition focus:translate-y-0"
      >
        Skip to content
      </a>

      <header className="sticky top-0 z-50 border-b border-border/80 bg-surface/95 shadow-[0_10px_35px_rgba(11,31,51,0.06)] backdrop-blur-xl">
        <div className="hidden bg-brand text-brand-foreground lg:block">
          <div className="mx-auto flex h-9 max-w-7xl items-center justify-between px-6">
            <p className="text-[0.69rem] font-semibold uppercase tracking-[0.14em] text-white/70">
              Practical compliance guidance for Bangladesh
            </p>

            <div className="flex items-center gap-6 text-[0.72rem] font-medium text-white/80">
              <a
                href="mailto:info@capwisebd.com"
                className="inline-flex items-center gap-2 transition hover:text-white"
              >
                <Mail aria-hidden="true" size={13} />
                info@capwisebd.com
              </a>

              <a
                href="tel:+8801624000381"
                className="inline-flex items-center gap-2 transition hover:text-white"
              >
                <Phone aria-hidden="true" size={13} />
                01624 000 381
              </a>

              <span className="inline-flex items-center gap-2">
                <MapPin aria-hidden="true" size={13} />
                Banani, Dhaka
              </span>
            </div>
          </div>
        </div>

        <div className="mx-auto flex h-[4.75rem] max-w-7xl items-center gap-5 px-4 sm:px-6">
          <BrandLogo className="mr-auto lg:mr-2" />

          <nav
            aria-label="Primary navigation"
            className="hidden flex-1 items-center justify-center gap-0.5 lg:flex"
          >
            <Link
              href="/about"
              aria-current={isCurrent("/about") ? "page" : undefined}
              className={clsx(
                navLinkClasses,
                isCurrent("/about")
                  ? "text-accent-strong"
                  : "text-foreground/80",
              )}
            >
              About
            </Link>

            <Popover className="relative">
              {({ open, close }) => (
                <>
                  <PopoverButton
                    className={clsx(
                      navLinkClasses,
                      servicesAreCurrent || open
                        ? "text-accent-strong"
                        : "text-foreground/80",
                    )}
                  >
                    Services
                    <ChevronDown
                      aria-hidden="true"
                      size={15}
                      className={clsx(
                        "ml-1.5 transition-transform",
                        open && "rotate-180",
                      )}
                    />
                  </PopoverButton>

                  <PopoverPanel className="absolute left-1/2 top-[calc(100%+1rem)] w-[50rem] -translate-x-1/2 overflow-hidden rounded-2xl border border-border bg-surface shadow-[0_30px_80px_rgba(11,31,51,0.18)]">
                    <div className="grid grid-cols-[1.55fr_0.75fr]">
                      <div className="p-6">
                        <div className="mb-4 flex items-end justify-between gap-6 border-b border-border pb-4">
                          <div>
                            <p className="text-[0.65rem] font-bold uppercase tracking-[0.18em] text-accent-strong">
                              Advisory services
                            </p>
                            <p className="mt-1 font-display text-lg font-bold text-foreground">
                              Compliance, coordinated.
                            </p>
                          </div>

                          <Link
                            href="/services"
                            onClick={close}
                            className="inline-flex shrink-0 items-center gap-1.5 text-xs font-bold text-accent-strong hover:underline"
                          >
                            View all
                            <ArrowRight aria-hidden="true" size={14} />
                          </Link>
                        </div>

                        <div className="grid grid-cols-2 gap-1.5">
                          {services.map((service, index) => (
                            <Link
                              key={service.href}
                              href={service.href}
                              onClick={close}
                              className="group rounded-xl px-3 py-3 transition hover:bg-surface-muted"
                            >
                              <span className="flex items-start gap-3">
                                <span className="mt-0.5 font-display text-[0.66rem] font-bold text-accent-strong/80">
                                  {String(index + 1).padStart(2, "0")}
                                </span>
                                <span>
                                  <span className="block text-[0.79rem] font-bold leading-5 text-foreground transition group-hover:text-accent-strong">
                                    {service.label}
                                  </span>
                                  <span className="mt-1 block text-[0.68rem] leading-4 text-muted">
                                    {service.description}
                                  </span>
                                </span>
                              </span>
                            </Link>
                          ))}
                        </div>
                      </div>

                      <div className="flex flex-col justify-between bg-brand p-6 text-brand-foreground">
                        <div>
                          <span className="inline-flex rounded-full border border-white/15 px-3 py-1 text-[0.62rem] font-bold uppercase tracking-[0.15em] text-accent">
                            Start with clarity
                          </span>
                          <p className="mt-5 font-display text-2xl font-semibold leading-tight">
                            Not sure which service fits?
                          </p>
                          <p className="mt-3 text-sm leading-6 text-white/65">
                            Tell us what you are trying to solve. We will help
                            map the practical next step.
                          </p>
                        </div>

                        <Link
                          href="/contact"
                          onClick={close}
                          className="mt-8 inline-flex items-center justify-between rounded-xl bg-accent px-4 py-3 text-sm font-bold text-[#042f2e] transition hover:bg-[#5eead4]"
                        >
                          Free consultation
                          <ArrowUpRight aria-hidden="true" size={17} />
                        </Link>
                      </div>
                    </div>
                  </PopoverPanel>
                </>
              )}
            </Popover>

            {primaryNavigation.slice(1).map((item) => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isCurrent(item.href) ? "page" : undefined}
                className={clsx(
                  navLinkClasses,
                  item.label === "Industries" && "hidden xl:inline-flex",
                  isCurrent(item.href)
                    ? "text-accent-strong"
                    : "text-foreground/80",
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex shrink-0 items-center gap-2.5">
            <ThemeToggle />

            <Link
              href="/contact"
              className="hidden h-11 items-center gap-2 whitespace-nowrap rounded-full bg-action px-5 text-sm font-bold text-action-foreground shadow-sm transition hover:-translate-y-0.5 hover:bg-action-hover sm:inline-flex"
            >
              Book a Consultation
              <ArrowUpRight aria-hidden="true" size={16} />
            </Link>

            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="inline-flex size-11 items-center justify-center rounded-full border border-border bg-surface text-foreground transition hover:border-accent hover:text-accent-strong lg:hidden"
              aria-label="Open navigation menu"
              aria-expanded={mobileMenuOpen}
            >
              <Menu aria-hidden="true" size={20} />
            </button>
          </div>
        </div>
      </header>

      <Dialog
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
        className="relative z-[70] lg:hidden"
      >
        <DialogBackdrop className="fixed inset-0 bg-brand/55 backdrop-blur-sm" />

        <div className="fixed inset-0 overflow-hidden">
          <div className="flex min-h-full justify-end">
            <DialogPanel
              data-lenis-prevent
              className="flex min-h-full w-full max-w-md flex-col border-l border-border bg-surface shadow-2xl"
            >
              <div className="flex h-[4.75rem] items-center justify-between border-b border-border px-5 sm:px-6">
                <DialogTitle as="div">
                  <BrandLogo />
                </DialogTitle>

                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(false)}
                  className="inline-flex size-11 items-center justify-center rounded-full border border-border text-foreground transition hover:border-accent hover:text-accent-strong"
                  aria-label="Close navigation menu"
                >
                  <X aria-hidden="true" size={20} />
                </button>
              </div>

              <nav
                aria-label="Mobile navigation"
                className="flex-1 overflow-y-auto px-5 py-6 sm:px-6"
              >
                <Link
                  href="/about"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex min-h-12 items-center justify-between border-b border-border py-3 font-display text-lg font-semibold text-foreground"
                >
                  About
                  <ArrowUpRight aria-hidden="true" size={17} />
                </Link>

                <Disclosure>
                  <DisclosureButton className="group flex min-h-12 w-full items-center justify-between border-b border-border py-3 text-left font-display text-lg font-semibold text-foreground">
                    Services
                    <ChevronDown
                      aria-hidden="true"
                      size={18}
                      className="transition-transform group-data-open:rotate-180"
                    />
                  </DisclosureButton>

                  <DisclosurePanel className="border-b border-border bg-surface-muted/70 px-3 py-3">
                    <Link
                      href="/services"
                      onClick={() => setMobileMenuOpen(false)}
                      className="block rounded-lg px-3 py-2.5 text-sm font-bold text-accent-strong"
                    >
                      View all services
                    </Link>

                    {services.map((service) => (
                      <Link
                        key={service.href}
                        href={service.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className="block rounded-lg px-3 py-2.5 text-sm font-semibold leading-5 text-foreground/80 transition hover:bg-surface hover:text-accent-strong"
                      >
                        {service.label}
                      </Link>
                    ))}
                  </DisclosurePanel>
                </Disclosure>

                {primaryNavigation.slice(1).map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex min-h-12 items-center justify-between border-b border-border py-3 font-display text-lg font-semibold text-foreground"
                  >
                    {item.label}
                    <ArrowUpRight aria-hidden="true" size={17} />
                  </Link>
                ))}

                <Link
                  href="/contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex min-h-12 items-center justify-between border-b border-border py-3 font-display text-lg font-semibold text-foreground"
                >
                  Contact
                  <ArrowUpRight aria-hidden="true" size={17} />
                </Link>
              </nav>

              <div className="border-t border-border bg-surface-muted p-5 sm:p-6">
                <div className="mb-4 grid gap-2 text-xs font-medium text-muted sm:grid-cols-2">
                  <a
                    href="mailto:info@capwisebd.com"
                    className="inline-flex items-center gap-2"
                  >
                    <Mail aria-hidden="true" size={14} />
                    info@capwisebd.com
                  </a>
                  <a
                    href="tel:+8801624000381"
                    className="inline-flex items-center gap-2"
                  >
                    <Phone aria-hidden="true" size={14} />
                    01624 000 381
                  </a>
                </div>

                <Link
                  href="/contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-action px-5 text-sm font-bold text-action-foreground transition hover:bg-action-hover"
                >
                  Book a Free Consultation
                  <ArrowUpRight aria-hidden="true" size={17} />
                </Link>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  );
}