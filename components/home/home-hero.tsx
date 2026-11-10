import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { getWhatsAppHref } from "@/lib/contact";
import { LegalQuickFinder } from "@/components/home/legal-quick-finder";
import type { Service, ServiceCategory, SiteSettings } from "@/types";

const focusItems = [
  "Pendirian badan usaha",
  "Perizinan & OSS",
  "Merek & dokumen legal",
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
    <section className="border-b border-brand-navy/8 bg-white">
      <div className="page-shell py-10 sm:py-14 lg:py-16">
        <div className="grid gap-9 lg:grid-cols-12 lg:items-center lg:gap-x-14">
          <div className="motion-reveal lg:col-span-7">
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-brand-gold-dark">
              Legalitas bisnis yang lebih jelas
            </p>
            <h1 className="mt-4 max-w-[760px] text-[clamp(2.55rem,7vw,4.35rem)] font-bold leading-[1.01] tracking-[-0.045em] text-brand-navy-dark lg:text-[4rem]">
              {settings.heroTitle}
            </h1>
            <p className="mt-5 max-w-[620px] text-[15px] leading-7 text-brand-muted sm:text-base sm:leading-8">
              {settings.heroDescription}
            </p>

            <div className="mt-6 flex flex-wrap gap-2.5">
              <a
                href={consultationHref}
                target={consultationExternal ? "_blank" : undefined}
                rel={consultationExternal ? "noreferrer" : undefined}
                className="group inline-flex min-h-12 items-center justify-center gap-2 rounded-[9px] bg-brand-navy px-5 py-3 text-sm font-semibold text-white transition hover:bg-brand-navy-dark"
              >
                Konsultasi
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
              <Link
                href="/layanan"
                className="group inline-flex min-h-12 items-center justify-center gap-2 rounded-[9px] border border-brand-navy/18 bg-white px-5 py-3 text-sm font-semibold text-brand-navy transition hover:border-brand-navy/35"
              >
                Lihat layanan
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>

          <aside className="motion-reveal border-l-2 border-brand-gold pl-5 lg:col-span-5 lg:pl-7" style={{ animationDelay: "70ms" }}>
            <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-brand-muted">
              Pendampingan utama
            </p>
            <div className="mt-4 grid gap-3">
              {focusItems.map((item) => (
                <div key={item} className="flex items-start gap-3 border-b border-brand-navy/8 pb-3 last:border-b-0 last:pb-0">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand-gold-dark" />
                  <p className="text-sm font-medium leading-6 text-brand-ink">{item}</p>
                </div>
              ))}
            </div>
            <p className="mt-5 text-xs leading-6 text-brand-muted">
              Kebutuhan berbeda-beda. Kami bantu menentukan langkah yang relevan sebelum proses dimulai.
            </p>
          </aside>
        </div>

        <div className="motion-reveal mt-9 lg:mt-11" style={{ animationDelay: "110ms" }}>
          <LegalQuickFinder
            consultationHref={consultationHref}
            consultationExternal={consultationExternal}
          />
        </div>
      </div>
    </section>
  );
}
