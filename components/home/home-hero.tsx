import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { getWhatsAppHref } from "@/lib/contact";
import { LegalQuickFinder } from "@/components/home/legal-quick-finder";
import type { Service, ServiceCategory, SiteSettings } from "@/types";

const fallbackProof = [
  { value: "Online", label: "Proses terarah" },
  { value: "Jelas", label: "Biaya & kebutuhan" },
  { value: "Aman", label: "Dokumen bisnis" },
];

export function HomeHero({
  settings,
  services,
  categories,
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
  const proof = settings.stats
    .filter((item) => item.value.trim() && item.value.trim() !== "—")
    .slice(0, 3);
  const visibleProof = proof.length ? proof : fallbackProof;

  return (
    <section className="border-b border-brand-navy/10 bg-brand-surface">
      <div className="page-shell grid gap-12 py-14 lg:grid-cols-[minmax(0,.9fr)_minmax(420px,1.1fr)] lg:items-center lg:gap-16 lg:py-20 xl:min-h-[620px]">
        <div className="max-w-[660px]">
          <h1 className="max-w-[640px] text-[clamp(2.75rem,5vw,4.8rem)] font-semibold leading-[0.98] tracking-[-0.055em] text-brand-navy-dark">
            {settings.heroTitle}
          </h1>

          <p className="mt-6 max-w-[580px] text-base leading-8 text-brand-muted">
            {settings.heroDescription}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-3">
            <Link
              href="/layanan"
              className="button-gold inline-flex items-center gap-2 px-5 py-3.5 text-sm font-semibold"
            >
              Lihat layanan <ArrowRight className="h-4 w-4" />
            </Link>
            <a
              href={consultationHref}
              target={consultationExternal ? "_blank" : undefined}
              rel={consultationExternal ? "noreferrer" : undefined}
              className="inline-flex items-center gap-2 text-sm font-semibold text-brand-navy transition hover:text-brand-gold-dark"
            >
              Konsultasi gratis <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>

          <div className="mt-10 grid max-w-[620px] border-y border-brand-navy/10 sm:grid-cols-3">
            {visibleProof.map((item) => (
              <div
                key={item.label}
                className="border-b border-brand-navy/10 py-4 last:border-b-0 sm:border-b-0 sm:border-r sm:px-5 sm:first:pl-0 sm:last:border-r-0 sm:last:pr-0"
              >
                <p className="text-base font-semibold text-brand-navy-dark">{item.value}</p>
                <p className="mt-1 text-xs text-brand-muted">{item.label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:pl-2">
          <LegalQuickFinder services={services} categories={categories} />
        </div>
      </div>
    </section>
  );
}
