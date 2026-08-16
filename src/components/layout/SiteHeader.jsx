"use client";

import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import clsx from "clsx";
import { AnimatePresence, m, useReducedMotion } from "motion/react";
import {
  ArrowRight,
  ArrowUpRight,
  ChevronDown,
  Menu,
  X,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { useEffect, useRef, useState } from "react";

import BrandLogo from "@/components/ui/BrandLogo";
import ThemeToggle from "@/components/ui/ThemeToggle";
import useMounted from "@/hooks/useMounted";
import {
  aboutNavigation,
  industryNavigation,
  primaryNavigation,
  services,
} from "@/config/navigation";

const navLinkClasses =
  "relative inline-flex h-11 items-center whitespace-nowrap px-2.5 text-[0.78rem] font-bold tracking-[-0.01em] text-foreground/78 transition-colors hover:text-brand-blue focus-visible:outline-none focus-visible:text-brand-blue 2xl:px-3 2xl:text-[0.82rem]";

function Underline({ active }) {
  return (
    <span
      aria-hidden="true"
      className={clsx(
        "absolute inset-x-2.5 bottom-1.5 h-[2px] origin-left rounded-full bg-brand-gold transition duration-200",
        active ? "scale-x-100 opacity-100" : "scale-x-0 opacity-0",
      )}
    />
  );
}

function DesktopDropdown({
  id,
  label,
  open,
  onOpen,
  onScheduleClose,
  onCancelClose,
  active,
  children,
  widthClass = "w-[22rem]",
  align = "left",
}) {
  const reduceMotion = useReducedMotion();
  const triggerRef = useRef(null);

  const closeAndRestoreFocus = () => {
    onScheduleClose(0);
    requestAnimationFrame(() => triggerRef.current?.focus());
  };

  return (
    <div
      className="relative"
      onMouseEnter={onOpen}
      onMouseLeave={onScheduleClose}
      onFocus={onOpen}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) onScheduleClose();
      }}
    >
      <button
        ref={triggerRef}
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={`${id}-menu`}
        onClick={() => (open ? onScheduleClose(0) : onOpen())}
        onKeyDown={(event) => {
          if (event.key === "Escape") {
            event.preventDefault();
            closeAndRestoreFocus();
          }
          if (event.key === "ArrowDown") {
            event.preventDefault();
            onOpen();
            requestAnimationFrame(() => {
              document.querySelector(`#${id}-menu [role="menuitem"]`)?.focus();
            });
          }
        }}
        className={clsx(navLinkClasses, (active || open) && "text-brand-blue")}
      >
        {label}
        <ChevronDown
          aria-hidden="true"
          size={14}
          className={clsx("ml-1 transition-transform duration-200", open && "rotate-180")}
        />
        <Underline active={active || open} />
      </button>

      <AnimatePresence>
        {open && (
          <m.div
            id={`${id}-menu`}
            role="menu"
            initial={reduceMotion ? false : { opacity: 0, y: 7, scale: 0.992 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 5, scale: 0.995 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            onMouseEnter={onCancelClose}
            onMouseLeave={onScheduleClose}
            onKeyDown={(event) => {
              if (event.key === "Escape") {
                event.preventDefault();
                event.stopPropagation();
                closeAndRestoreFocus();
              }
            }}
            className={clsx(
              "absolute top-[calc(100%-0.15rem)] z-[70] pt-3",
              widthClass,
              align === "right" ? "right-0" : "left-0",
            )}
          >
            <div className="overflow-hidden rounded-2xl border border-border bg-surface/98 shadow-[0_28px_80px_rgba(10,27,61,0.18)] backdrop-blur-xl">
              {children}
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function SiteHeader() {
  const pathname = usePathname();
  const mounted = useMounted();
  const { resolvedTheme } = useTheme();
  const logoIsLight = mounted && resolvedTheme === "dark";
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState(null);
  const [routePathname, setRoutePathname] = useState(pathname);
  const closeTimer = useRef(null);

  const isCurrent = (href) =>
    href === "/" ? pathname === href : pathname.startsWith(href);

  const cancelClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
  };

  const openDropdown = (name) => {
    cancelClose();
    setOpenMenu(name);
  };

  const scheduleClose = (delay = 190) => {
    cancelClose();
    closeTimer.current = setTimeout(() => setOpenMenu(null), delay);
  };

  if (pathname !== routePathname) {
    setRoutePathname(pathname);
    setOpenMenu(null);
    setMobileMenuOpen(false);
  }

  useEffect(() => () => cancelClose(), []);

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === "Escape") setOpenMenu(null);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-border/80 bg-surface/94 shadow-[0_10px_34px_rgba(11,27,61,0.055)] backdrop-blur-xl">
        <div className="mx-auto flex h-[4.75rem] max-w-[94rem] items-center gap-3 px-4 sm:px-6 lg:px-8 2xl:px-10">
          <BrandLogo compact light={logoIsLight} className="mr-auto" />

          <nav aria-label="Primary navigation" className="hidden items-center gap-0 xl:flex">
            <DesktopDropdown
              id="about"
              label="About"
              open={openMenu === "about"}
              onOpen={() => openDropdown("about")}
              onScheduleClose={scheduleClose}
              onCancelClose={cancelClose}
              active={isCurrent("/about") || isCurrent("/team")}
              widthClass="w-[21rem]"
            >
              <div className="p-3">
                <p className="px-3 pb-2 pt-1 text-[0.6rem] font-extrabold uppercase tracking-[0.18em] text-brand-blue">About Capwise</p>
                {aboutNavigation.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    role="menuitem"
                    className="group block rounded-xl px-3 py-3.5 transition hover:bg-brand-navy/[0.045] focus-visible:bg-brand-navy/[0.045] focus-visible:outline-none"
                  >
                    <span className="flex items-center justify-between gap-4 text-sm font-bold text-foreground group-hover:text-brand-blue">
                      {item.label}<ArrowUpRight size={14} className="text-brand-gold transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </span>
                    <span className="mt-1 block text-xs leading-5 text-muted">{item.description}</span>
                  </Link>
                ))}
              </div>
            </DesktopDropdown>

            <DesktopDropdown
              id="services"
              label="Services"
              open={openMenu === "services"}
              onOpen={() => openDropdown("services")}
              onScheduleClose={scheduleClose}
              onCancelClose={cancelClose}
              active={isCurrent("/services")}
              widthClass="w-[44rem] 2xl:w-[49rem]"
            >
              <div className="grid grid-cols-[1fr_13rem]">
                <div className="p-4 2xl:p-5">
                  <div className="mb-2 flex items-center justify-between gap-5 px-2">
                    <p className="text-[0.6rem] font-extrabold uppercase tracking-[0.18em] text-brand-blue">Services</p>
                    <Link href="/services" className="inline-flex items-center gap-1 text-[0.68rem] font-bold text-muted transition hover:text-brand-blue">
                      View all <ArrowRight size={13} />
                    </Link>
                  </div>
                  <div className="grid grid-cols-2 gap-1">
                    {services.map((service, index) => (
                      <Link
                        key={service.href}
                        href={service.href}
                        role="menuitem"
                        className="group flex gap-3 rounded-xl px-2.5 py-3 transition hover:bg-brand-navy/[0.045] focus-visible:bg-brand-navy/[0.045] focus-visible:outline-none"
                      >
                        <span className="mt-0.5 text-[0.62rem] font-extrabold text-brand-gold">{String(index + 1).padStart(2, "0")}</span>
                        <span>
                          <span className="block text-[0.77rem] font-bold leading-5 text-foreground transition group-hover:text-brand-blue">{service.label}</span>
                          <span className="mt-0.5 block text-[0.67rem] leading-4 text-muted">{service.description}</span>
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
                <div className="flex flex-col justify-between bg-brand-navy p-5 text-white">
                  <div>
                    <p className="text-[0.58rem] font-bold uppercase tracking-[0.18em] text-brand-gold">Need direction?</p>
                    <p className="mt-4 font-display text-xl font-semibold leading-tight">Tell us what you need to solve.</p>
                    <p className="mt-3 text-xs leading-5 text-white/62">We will help identify the practical starting point.</p>
                  </div>
                  <Link href="/contact" className="mt-7 inline-flex items-center justify-between rounded-xl bg-brand-gold px-4 py-3 text-xs font-extrabold text-brand-navy transition hover:-translate-y-0.5 hover:bg-brand-gold-soft">
                    Free consultation <ArrowUpRight size={15} />
                  </Link>
                </div>
              </div>
            </DesktopDropdown>

            <Link href="/insights/sme-sector-bangladesh" className={clsx(navLinkClasses, isCurrent("/insights/sme-sector-bangladesh") && "text-brand-blue")}>SME<Underline active={isCurrent("/insights/sme-sector-bangladesh")} /></Link>
            <Link href="/insights/startups-in-bangladesh" className={clsx(navLinkClasses, isCurrent("/insights/startups-in-bangladesh") && "text-brand-blue")}>Startup<Underline active={isCurrent("/insights/startups-in-bangladesh")} /></Link>

            <DesktopDropdown
              id="industries"
              label="Industries"
              open={openMenu === "industries"}
              onOpen={() => openDropdown("industries")}
              onScheduleClose={scheduleClose}
              onCancelClose={cancelClose}
              active={industryNavigation.some((item) => pathname === item.href)}
              widthClass="w-[25rem]"
            >
              <div className="p-3">
                <p className="px-3 pb-2 pt-1 text-[0.6rem] font-extrabold uppercase tracking-[0.18em] text-brand-blue">Industry insights</p>
                {industryNavigation.map((item, index) => (
                  <Link key={item.href} href={item.href} role="menuitem" className="group flex items-center gap-3 rounded-xl px-3 py-3 transition hover:bg-brand-navy/[0.045] focus-visible:bg-brand-navy/[0.045] focus-visible:outline-none">
                    <span className="text-[0.62rem] font-extrabold text-brand-gold">0{index + 1}</span>
                    <span className="flex flex-1 items-center justify-between gap-3 text-[0.78rem] font-bold text-foreground group-hover:text-brand-blue">
                      {item.label}<ArrowUpRight size={14} className="text-muted transition group-hover:text-brand-gold" />
                    </span>
                  </Link>
                ))}
              </div>
            </DesktopDropdown>

            {primaryNavigation.slice(2).map((item) => (
              <Link key={item.href} href={item.href} className={clsx(navLinkClasses, isCurrent(item.href) && "text-brand-blue")}>
                {item.label}<Underline active={isCurrent(item.href)} />
              </Link>
            ))}
          </nav>

          <div className="flex shrink-0 items-center gap-2">
            <ThemeToggle />

            <Link
              href="/contact"
              className="hidden h-11 items-center gap-2 whitespace-nowrap rounded-full bg-brand-navy px-4 text-xs font-extrabold text-white shadow-[0_10px_28px_rgba(27,20,100,.18)] transition duration-200 hover:-translate-y-0.5 hover:bg-brand-blue 2xl:px-5 2xl:text-sm sm:inline-flex"
            >
              Book a Free Consultation
              <ArrowUpRight aria-hidden="true" size={15} className="text-brand-gold" />
            </Link>

            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="inline-flex size-11 items-center justify-center rounded-full border border-border bg-surface text-foreground transition hover:border-brand-blue hover:text-brand-blue xl:hidden"
              aria-label="Open navigation menu"
              aria-expanded={mobileMenuOpen}
            >
              <Menu aria-hidden="true" size={20} />
            </button>
          </div>
        </div>
      </header>

      <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="relative z-[90] xl:hidden">
        <DialogBackdrop className="fixed inset-0 bg-brand-navy/55 backdrop-blur-sm data-[closed]:opacity-0" transition />
        <DialogPanel className="fixed inset-y-0 right-0 w-full max-w-md overflow-y-auto bg-surface p-5 shadow-2xl duration-300 data-[closed]:translate-x-full" transition>
          <div className="flex items-center justify-between gap-4 border-b border-border pb-4">
            <DialogTitle className="sr-only">Navigation</DialogTitle>
            <BrandLogo compact light={logoIsLight} />
            <div className="flex items-center gap-2">
              <ThemeToggle />
              <button type="button" onClick={() => setMobileMenuOpen(false)} className="inline-flex size-11 items-center justify-center rounded-full border border-border" aria-label="Close navigation menu"><X size={20} /></button>
            </div>
          </div>

          <nav className="mt-5 grid gap-1" aria-label="Mobile navigation">
            <Disclosure>
              {({ open }) => <>
                <DisclosureButton className="flex min-h-12 items-center justify-between rounded-xl px-3 text-left text-sm font-extrabold text-foreground hover:bg-brand-navy/[0.045]">About <ChevronDown size={16} className={clsx("transition", open && "rotate-180")} /></DisclosureButton>
                <DisclosurePanel className="grid gap-1 pb-2 pl-3">
                  {aboutNavigation.map((item) => <Link key={item.href} href={item.href} className="rounded-lg px-3 py-2.5 text-sm font-semibold text-muted hover:bg-brand-navy/[0.045] hover:text-brand-blue">{item.label}</Link>)}
                </DisclosurePanel>
              </>}
            </Disclosure>

            <Disclosure>
              {({ open }) => <>
                <DisclosureButton className="flex min-h-12 items-center justify-between rounded-xl px-3 text-left text-sm font-extrabold text-foreground hover:bg-brand-navy/[0.045]">Services <ChevronDown size={16} className={clsx("transition", open && "rotate-180")} /></DisclosureButton>
                <DisclosurePanel className="grid gap-1 pb-2 pl-3">
                  {services.map((item, index) => <Link key={item.href} href={item.href} className="flex gap-3 rounded-lg px-3 py-2.5 text-sm font-semibold text-muted hover:bg-brand-navy/[0.045] hover:text-brand-blue"><span className="text-brand-gold">{String(index + 1).padStart(2,"0")}</span>{item.label}</Link>)}
                </DisclosurePanel>
              </>}
            </Disclosure>

            <Link href="/insights/sme-sector-bangladesh" className="flex min-h-12 items-center rounded-xl px-3 text-sm font-extrabold hover:bg-brand-navy/[0.045] hover:text-brand-blue">SME</Link>
            <Link href="/insights/startups-in-bangladesh" className="flex min-h-12 items-center rounded-xl px-3 text-sm font-extrabold hover:bg-brand-navy/[0.045] hover:text-brand-blue">Startup</Link>

            <Disclosure>
              {({ open }) => <>
                <DisclosureButton className="flex min-h-12 items-center justify-between rounded-xl px-3 text-left text-sm font-extrabold text-foreground hover:bg-brand-navy/[0.045]">Industries <ChevronDown size={16} className={clsx("transition", open && "rotate-180")} /></DisclosureButton>
                <DisclosurePanel className="grid gap-1 pb-2 pl-3">
                  {industryNavigation.map((item) => <Link key={item.href} href={item.href} className="rounded-lg px-3 py-2.5 text-sm font-semibold text-muted hover:bg-brand-navy/[0.045] hover:text-brand-blue">{item.label}</Link>)}
                </DisclosurePanel>
              </>}
            </Disclosure>

            {primaryNavigation.slice(2).map((item) => <Link key={item.href} href={item.href} className="flex min-h-12 items-center rounded-xl px-3 text-sm font-extrabold hover:bg-brand-navy/[0.045] hover:text-brand-blue">{item.label}</Link>)}
          </nav>

          <Link href="/contact" className="mt-6 flex h-12 items-center justify-between rounded-xl bg-brand-navy px-5 text-sm font-extrabold text-white">Book a Free Consultation <ArrowUpRight size={17} className="text-brand-gold" /></Link>
        </DialogPanel>
      </Dialog>
    </>
  );
}
