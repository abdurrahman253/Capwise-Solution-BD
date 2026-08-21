"use client";

import { ArrowRight, ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { A11y, Autoplay, EffectFade, Keyboard } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-fade";

const heroSlides = [
  {
    number: "01",
    label: "Company Formation",
    title: "Start with the right business structure.",
    description: "Company registration, TIN, VAT and operational setup—coordinated from one place.",
    href: "/services/company-formation-registration",
    image: "https://images.pexels.com/photos/3760067/pexels-photo-3760067.jpeg?auto=compress&cs=tinysrgb&w=1920",
    alt: "Business professionals reviewing and signing company documents",
  },
  {
    number: "02",
    label: "Accounting & Bookkeeping",
    title: "Know your numbers before they become a problem.",
    description: "Clean books, regular reporting and financial visibility that support better decisions.",
    href: "/services/accounting-bookkeeping",
    image: "https://images.pexels.com/photos/8297220/pexels-photo-8297220.jpeg?auto=compress&cs=tinysrgb&w=1920",
    alt: "Accountant using a calculator while reviewing financial documents",
  },
  {
    number: "03",
    label: "Tax Advisory & Compliance",
    title: "Keep tax and VAT obligations under control.",
    description: "Practical filing, documentation and tax support designed around your actual business.",
    href: "/services/tax-advisory-compliance",
    image: "https://images.pexels.com/photos/6927565/pexels-photo-6927565.jpeg?auto=compress&cs=tinysrgb&w=1920",
    alt: "Professional reviewing tax and financial documents at an office desk",
  },
  {
    number: "04",
    label: "Payroll & HR Compliance",
    title: "Build a payroll and people process that scales.",
    description: "Accurate payroll, clear employment records and practical HR compliance for growing teams.",
    href: "/services/payroll-hr-compliance",
    image: "https://images.pexels.com/photos/5990046/pexels-photo-5990046.jpeg?auto=compress&cs=tinysrgb&w=1920",
    alt: "Professional team discussing HR and workplace matters in a meeting",
  },
  {
    number: "05",
    label: "Corporate Secretarial",
    title: "Keep governance current—not reconstructed later.",
    description: "AGMs, statutory records, annual filings and corporate changes managed on a clear calendar.",
    href: "/services/corporate-secretarial",
    image: "https://images.pexels.com/photos/1181355/pexels-photo-1181355.jpeg?auto=compress&cs=tinysrgb&w=1920",
    alt: "Corporate board meeting with professionals discussing documents",
  },
  {
    number: "06",
    label: "Regulatory & Legal Advisory",
    title: "See regulatory risk before it blocks the business.",
    description: "Connected legal and regulatory support for contracts, licences and operating obligations.",
    href: "/services/regulatory-legal-advisory",
    image: "https://images.pexels.com/photos/7841458/pexels-photo-7841458.jpeg?auto=compress&cs=tinysrgb&w=1920",
    alt: "Close-up of a professional reviewing important contract terms",
  },
  {
    number: "07",
    label: "Business Advisory",
    title: "Turn a complex decision into a practical next step.",
    description: "Structured advice for growth, financing, restructuring and decisions that cross several functions.",
    href: "/services/business-advisory",
    image: "https://images.pexels.com/photos/5686105/pexels-photo-5686105.jpeg?auto=compress&cs=tinysrgb&w=1920",
    alt: "Business leaders discussing strategy around a meeting table",
  },
];

const AUTOPLAY_DELAY = 6200;

export default function HomeHero() {
  const swiperRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  return (
    <section
      aria-label="Capwise advisory services"
      className="relative -mt-[5.125rem] overflow-hidden bg-brand-navy text-white sm:-mt-[5.5rem] lg:-mt-[5.625rem]"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <Swiper
        modules={[A11y, Autoplay, EffectFade, Keyboard]}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        speed={850}
        keyboard={{ enabled: true }}
        a11y={{ enabled: true, prevSlideMessage: "Previous service", nextSlideMessage: "Next service", slideLabelMessage: "{{index}} of {{slidesLength}}" }}
        autoplay={{ delay: AUTOPLAY_DELAY, disableOnInteraction: false, pauseOnMouseEnter: true, waitForTransition: false }}
        rewind
        onSwiper={(swiper) => { swiperRef.current = swiper; }}
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
        className="capwise-hero-swiper"
      >
        {heroSlides.map((slide, index) => (
          <SwiperSlide key={slide.number}>
            <div className="relative min-h-[36rem] sm:min-h-[44rem] lg:min-h-[46rem] xl:min-h-[48rem]">
              <Image
                src={slide.image}
                alt={slide.alt}
                fill
                priority={index === 0}
                quality={88}
                sizes="100vw"
                className="capwise-hero-slide-image object-cover"
              />
              <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(8,13,43,.9)_0%,rgba(15,21,61,.76)_42%,rgba(12,17,45,.3)_72%,rgba(8,13,35,.38)_100%)]" />
              <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(8,13,43,.38)_0%,transparent_30%)]" />
              <div className="pointer-events-none absolute inset-0 opacity-[0.14] [background-image:linear-gradient(rgba(255,255,255,.12)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.12)_1px,transparent_1px)] [background-size:72px_72px]" />

              <div className="relative mx-auto flex min-h-[36rem] max-w-[94rem] items-end px-gutter pb-12 pt-10 sm:min-h-[44rem] sm:pb-24 sm:pt-16 lg:min-h-[46rem] lg:items-center lg:pb-20 lg:pt-28 xl:min-h-[48rem]">
                <div className="capwise-hero-slide-copy max-w-[49rem]">
                  <div className="flex items-center gap-3 text-[0.64rem] font-extrabold uppercase tracking-[0.2em] text-white/68 sm:text-[0.7rem]">
                    <span className="text-brand-gold">{slide.number}</span>
                    <span className="h-px w-9 bg-brand-gold/70" />
                    <span>{slide.label}</span>
                  </div>

                  {index === 0 ? (
                    <h1 className="mt-6 max-w-[12ch] font-display text-hero font-semibold text-white">{slide.title}</h1>
                  ) : (
                    <h2 className="mt-6 max-w-[12ch] font-display text-hero font-semibold text-white">{slide.title}</h2>
                  )}

                  <p className="mt-6 max-w-[42rem] text-base leading-8 text-white/72 sm:text-lg sm:leading-9">{slide.description}</p>

                  <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                    <Link href={slide.href} className="group inline-flex min-h-12 items-center justify-between gap-6 rounded-full bg-brand-gold px-6 text-sm font-extrabold text-brand-navy transition hover:-translate-y-0.5 hover:bg-brand-gold-soft sm:justify-center">
                      Explore Service
                      <ArrowRight size={16} className="transition group-hover:translate-x-1" />
                    </Link>
                    <Link href="/contact" className="group inline-flex min-h-12 items-center justify-between gap-6 rounded-full border border-white/24 bg-white/[0.07] px-6 text-sm font-bold text-white backdrop-blur transition hover:-translate-y-0.5 hover:border-white/45 hover:bg-white/[0.12] sm:justify-center">
                      Book a Free Consultation
                      <ArrowUpRight size={16} className="text-brand-gold transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="pointer-events-none absolute inset-x-0 bottom-6 z-20 sm:bottom-8">
        <div className="mx-auto flex max-w-[94rem] items-center justify-end gap-4 px-gutter">
          <div className="mr-auto hidden items-center gap-3 text-[0.65rem] font-bold uppercase tracking-[0.18em] text-white/58 sm:flex">
            <span className="text-white">{String(activeIndex + 1).padStart(2, "0")}</span>
            <span className="h-px w-14 overflow-hidden bg-white/25">
              <span
                key={activeIndex}
                className="block h-px w-full origin-left bg-brand-gold motion-reduce:hidden"
                style={{
                  animation: `capwise-hero-progress ${AUTOPLAY_DELAY}ms linear forwards`,
                  animationPlayState: isPaused ? "paused" : "running",
                }}
              />
            </span>
            <span>{String(heroSlides.length).padStart(2, "0")}</span>
          </div>

          <button onClick={() => swiperRef.current?.slidePrev()} type="button" className="pointer-events-auto inline-flex size-11 items-center justify-center rounded-full border border-white/20 bg-black/15 text-white backdrop-blur transition hover:border-brand-gold hover:bg-brand-gold hover:text-brand-navy" aria-label="Previous service slide"><ChevronLeft size={18} /></button>
          <button onClick={() => swiperRef.current?.slideNext()} type="button" className="pointer-events-auto inline-flex size-11 items-center justify-center rounded-full border border-white/20 bg-black/15 text-white backdrop-blur transition hover:border-brand-gold hover:bg-brand-gold hover:text-brand-navy" aria-label="Next service slide"><ChevronRight size={18} /></button>
        </div>
      </div>
    </section>
  );
}
