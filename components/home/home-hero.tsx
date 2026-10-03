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
    <section className="relative overflow-hidden border-b border-brand-navy/8 bg-white">
      <div className="pointer-events-none absolute -right-24 -top-28 h-80 w-80 rounded-full border border-brand-navy/[0.055] lg:h-[34rem] lg:w-[34rem]" />
      <div className="page-shell relative py-10 sm:py-14 lg:py-16 xl:py-20">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end lg:gap-x-12">
          <div className="motion-reveal lg:col-span-8">
            <p className="text-[11px] font-bold uppercase tracking-[0.17em] text-brand-gold-dark">
              Legalitas bisnis, langkah lebih tenang
            </p>
            <h1 className="mt-4 max-w-[850px] text-[clamp(2.8rem,8vw,5.35rem)] font-extrabold leading-[.96] tracking-[-0.055em] text-brand-navy-dark lg:text-[4.85rem]">
              {settings.heroTitle}
            </h1>
          </div>

          <div className="motion-reveal lg:col-span-4 lg:pb-1" style={{ animationDelay: "80ms" }}>
            <p className="max-w-[430px] text-[15px] leading-7 text-brand-muted sm:text-base sm:leading-8">
              {settings.heroDescription}
            </p>

            <div className="mt-6 flex flex-wrap gap-2.5">
              <a
                href={consultationHref}
                target={consultationExternal ? "_blank" : undefined}
                rel={consultationExternal ? "noreferrer" : undefined}
                className="group inline-flex min-h-12 items-center justify-center gap-2 rounded-[10px] bg-brand-navy px-5 py-3 text-sm font-semibold text-white transition hover:bg-brand-navy-dark"
              >
                Konsultasi
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
              <Link
                href="/layanan"
                className="group inline-flex min-h-12 items-center justify-center gap-2 rounded-[10px] border border-brand-navy/22 bg-white px-5 py-3 text-sm font-semibold text-brand-navy transition hover:border-brand-navy/45"
              >
                Lihat layanan
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>

            <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2">
              {proofItems.map(({ label, icon: Icon }) => (
                <span key={label} className="inline-flex items-center gap-2 text-xs font-semibold text-brand-ink">
                  <span className="grid h-6 w-6 place-items-center rounded-full bg-brand-gold-pale text-brand-gold-dark">
                    <Icon className="h-3.5 w-3.5" />
                  </span>
                  {label}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="motion-reveal mt-10 lg:mt-12" style={{ animationDelay: "130ms" }}>
          <LegalQuickFinder
            consultationHref={consultationHref}
            consultationExternal={consultationExternal}
          />
        </div>
      </div>
    </section>
  );
}
