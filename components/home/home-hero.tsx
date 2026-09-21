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
      <div className="page-shell grid gap-9 py-10 sm:py-12 lg:grid-cols-[minmax(0,.9fr)_minmax(420px,1.1fr)] lg:items-center lg:gap-16 lg:py-20 xl:min-h-[620px]">
        <div className="max-w-[660px]">
          <h1 className="max-w-[640px] text-[clamp(2.35rem,10.5vw,4.8rem)] font-semibold leading-[0.98] tracking-[-0.052em] text-brand-navy-dark">
            {settings.heroTitle}
          </h1>

          <p className="mt-5 max-w-[580px] text-[15px] leading-7 text-brand-muted sm:mt-6 sm:text-base sm:leading-8">
            {settings.heroDescription}
          </p>

          <div className="mt-7 grid gap-3 sm:flex sm:flex-wrap sm:items-center sm:gap-x-5 sm:gap-y-3">
            <a
              href={consultationHref}
              target={consultationExternal ? "_blank" : undefined}
              rel={consultationExternal ? "noreferrer" : undefined}
              className="inline-flex min-h-12 w-full items-center justify-center gap-2 bg-brand-navy px-5 py-3 text-sm font-semibold text-white transition hover:bg-brand-navy-dark sm:order-2 sm:min-h-0 sm:w-auto sm:bg-transparent sm:px-0 sm:py-0 sm:text-brand-navy sm:hover:bg-transparent sm:hover:text-brand-gold-dark"
            >
              Konsultasi gratis <ArrowUpRight className="h-4 w-4" />
            </a>
            <Link
              href="/layanan"
              className="inline-flex min-h-12 w-full items-center justify-center gap-2 border border-brand-navy/14 bg-white px-5 py-3 text-sm font-semibold text-brand-navy sm:order-1 sm:min-h-0 sm:w-auto sm:border-0 sm:bg-brand-gold sm:px-5 sm:py-3.5 sm:text-brand-navy-dark"
            >
              Lihat layanan <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="mt-8 grid grid-cols-3 border-y border-brand-navy/10 sm:mt-10">
            {visibleProof.map((item) => (
              <div
                key={item.label}
                className="border-r border-brand-navy/10 px-2 py-3.5 first:pl-0 last:border-r-0 last:pr-0 sm:px-5 sm:py-4"
              >
                <p className="truncate text-sm font-semibold text-brand-navy-dark sm:text-base">{item.value}</p>
                <p className="mt-1 text-[10px] leading-4 text-brand-muted sm:text-xs">{item.label}</p>
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
