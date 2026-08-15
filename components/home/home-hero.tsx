import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { getWhatsAppHref } from "@/lib/contact";
import { LegalQuickFinder } from "@/components/home/legal-quick-finder";
import type { Service, ServiceCategory, SiteSettings } from "@/types";

const fallbackProof = [
  { value: "Online", label: "Proses terarah" },
  { value: "Jelas", label: "Biaya & scope" },
  { value: "Aman", label: "Dokumen bisnis" },
];


function splitHeroTitle(title: string) {
  const words = title.trim().split(/\s+/);

  if (words.length <= 3) {
    return { lead: title, accent: "" };
  }

  return {
    lead: words.slice(0, -2).join(" "),
    accent: words.slice(-2).join(" "),
  };
}

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
  const proof = settings.stats.filter((item) => item.value.trim() && item.value.trim() !== "—").slice(0, 3);
  const visibleProof = proof.length ? proof : fallbackProof;
  const title = splitHeroTitle(settings.heroTitle);

  return (
    <section className="hero-v74 relative overflow-hidden border-b border-brand-navy/10 bg-[linear-gradient(180deg,#fffef9_0%,#fbf8ef_100%)]">
      <div className="hero-v74-grid absolute inset-0" />
      <div className="hero-v74-glow absolute left-[4%] top-[12%] h-44 w-44 rounded-full" />
      <div className="hero-v74-architecture absolute bottom-0 left-0 top-0 hidden w-[34%] lg:block">
        <Image src="/visuals/hero-columns.svg" alt="" fill priority className="object-contain object-left-bottom opacity-[0.78]" />
      </div>
      <div className="hero-v74-orbit absolute left-[14%] top-[18%] hidden h-[420px] w-[420px] rounded-full lg:block" />

      <div className="page-shell relative grid gap-10 py-14 lg:grid-cols-[.95fr_1.05fr] lg:items-center lg:gap-14 lg:py-20 xl:min-h-[650px]">
        <div className="relative max-w-[650px] pl-0 lg:pl-6 xl:pl-12">
          <div className="absolute bottom-2 left-0 top-4 hidden w-px bg-gradient-to-b from-brand-gold/0 via-brand-gold/55 to-brand-gold/0 lg:block" />

          <h1 className="max-w-[620px] text-[clamp(2.85rem,4.8vw,5rem)] font-semibold leading-[0.98] tracking-[-0.058em] text-brand-navy-dark">
            {title.lead}
            {title.accent ? (
              <>
                <br />
                <span className="bg-[linear-gradient(180deg,#d9b53a_0%,#b98b12_100%)] bg-clip-text text-transparent">
                  {title.accent}
                </span>
              </>
            ) : null}
          </h1>

          <p className="mt-6 max-w-[560px] text-[15px] leading-7 text-brand-muted sm:text-base sm:leading-8">
            {settings.heroDescription}
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/layanan" className="button-gold inline-flex items-center gap-2 px-5 py-3.5 text-sm font-semibold">
              Lihat layanan <ArrowRight className="h-4 w-4" />
            </Link>
            <a
              href={consultationHref}
              target={consultationExternal ? "_blank" : undefined}
              rel={consultationExternal ? "noreferrer" : undefined}
              className="button-outline inline-flex items-center gap-2 px-5 py-3.5 text-sm font-semibold"
            >
              Konsultasi gratis <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>

          <div className="mt-10 grid max-w-[620px] gap-3 sm:grid-cols-3">
            {visibleProof.map((item) => (
              <div
                key={item.label}
                className="relative rounded-[18px] border border-brand-navy/10 bg-white/86 px-4 py-4 pl-5 shadow-[0_14px_32px_rgba(4,29,54,.05)] backdrop-blur-sm"
              >
                <span className="absolute bottom-4 left-0 top-4 w-[3px] rounded-r-full bg-brand-gold" />
                <p className="text-sm font-semibold text-brand-navy-dark sm:text-base">{item.value}</p>
                <p className="mt-1 text-[10px] font-medium text-brand-muted">{item.label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="relative lg:pl-2">
          <div className="absolute -right-14 -top-14 h-52 w-52 rounded-full bg-brand-gold/10 blur-3xl" />
          <div className="absolute -bottom-12 -left-10 h-44 w-44 rounded-full bg-brand-bluewash/90 blur-3xl" />
          <LegalQuickFinder services={services} categories={categories} />
        </div>
      </div>
    </section>
  );
}
