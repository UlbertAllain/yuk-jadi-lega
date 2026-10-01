import Link from "next/link";
import { ArrowRight, Check, Compass, ShieldCheck } from "lucide-react";
import { getWhatsAppHref } from "@/lib/contact";
import { LegalQuickFinder } from "@/components/home/legal-quick-finder";
import type { Service, ServiceCategory, SiteSettings } from "@/types";

const proofItems = [
  { label: "Jelas", icon: Check },
  { label: "Terarah", icon: Compass },
  { label: "Aman", icon: ShieldCheck },
] as const;

export function HomeHero({
  settings,
}: {
  settings: SiteSettings;
  services: Service[];
  categories: ServiceCategory[];
}) {
  const whatsappHref = getWhatsAppHref(
    settings.whatsapp,
    "Halo Yuk Jadi Legal, saya ingin konsultasi mengenai legalitas bisnis.",
  );
  const consultationHref = whatsappHref || "/kontak";
  const consultationExternal = Boolean(whatsappHref);

  return (
    <section className="relative overflow-hidden border-b border-brand-navy/8 bg-brand-paper">
      <div className="legal-hero-photo pointer-events-none absolute inset-y-0 right-0 hidden w-[44%] sm:block lg:w-[40%]" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,#f6f1e4_0%,#f6f1e4_48%,rgba(246,241,228,.92)_62%,rgba(246,241,228,.2)_100%)]" />

      <div className="page-shell relative py-9 sm:py-12 lg:py-16">
        <div className="lg:grid lg:grid-cols-12 lg:items-end lg:gap-x-10 xl:gap-x-12">
          <div className="max-w-[680px] lg:col-span-7">
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-brand-gold-dark">
            Legalitas bisnis, langkah lebih tenang
          </p>
          <h1 className="editorial-heading mt-3 max-w-[650px] text-[clamp(2.55rem,8vw,4.9rem)] font-semibold leading-[.98] tracking-[-0.045em] text-brand-navy-dark lg:text-[4.35rem]">
            {settings.heroTitle}
          </h1>
          <p className="mt-5 max-w-[560px] text-[15px] leading-7 text-brand-muted sm:text-base sm:leading-8">
            {settings.heroDescription}
          </p>

          <div className="mt-6 grid max-w-sm gap-2.5 sm:flex sm:max-w-none sm:flex-wrap">
            <a
              href={consultationHref}
              target={consultationExternal ? "_blank" : undefined}
              rel={consultationExternal ? "noreferrer" : undefined}
              className="group inline-flex min-h-12 items-center justify-center gap-2 rounded-[11px] bg-brand-navy px-5 py-3 text-sm font-semibold text-white transition hover:bg-brand-navy-dark"
            >
              Konsultasi
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
            <Link
              href="/layanan"
              className="group inline-flex min-h-12 items-center justify-center gap-2 rounded-[11px] border border-brand-navy/35 bg-white/70 px-5 py-3 text-sm font-semibold text-brand-navy backdrop-blur-sm transition hover:border-brand-navy"
            >
              Lihat layanan
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          <div className="mt-7 flex flex-wrap gap-3">
            {proofItems.map(({ label, icon: Icon }) => (
              <div
                key={label}
                className="inline-flex items-center gap-2 rounded-full bg-white/75 px-3 py-2 text-xs font-semibold text-brand-ink shadow-[0_8px_24px_rgba(4,29,54,.05)] backdrop-blur-sm"
              >
                <span className="grid h-6 w-6 place-items-center rounded-full bg-brand-gold-pale text-brand-gold-dark">
                  <Icon className="h-3.5 w-3.5" />
                </span>
                {label}
              </div>
            ))}
          </div>
          </div>

          <div className="motion-reveal mt-8 max-w-xl sm:mt-10 lg:col-span-5 lg:mt-0 lg:max-w-none lg:self-center">
            <LegalQuickFinder
              consultationHref={consultationHref}
              consultationExternal={consultationExternal}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
