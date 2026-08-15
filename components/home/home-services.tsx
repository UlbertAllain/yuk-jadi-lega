import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Check, Clock3 } from "lucide-react";
import { servicePriceLabel } from "@/lib/format";
import type { Service, ServiceCategory, SiteSettings } from "@/types";

const whyItems = [
  ["Tim profesional", "Pendampingan oleh tim yang terbiasa menangani kebutuhan legal bisnis."],
  ["Proses efisien", "Alur kerja dibuat jelas supaya pengurusan tidak terasa berputar-putar."],
  ["Harga transparan", "Scope dan biaya dijelaskan dari awal tanpa informasi yang disembunyikan."],
  ["Dokumen terarah", "Checklist dokumen dibuat lebih mudah dipahami dan dipersiapkan."],
  ["Responsif", "Konsultasi dan update proses tetap tersedia saat Anda membutuhkannya."],
] as const;

export function HomeServices({
  categories,
  featuredServices,
  settings,
}: {
  categories: ServiceCategory[];
  featuredServices: Service[];
  settings: SiteSettings;
}) {
  const categoryMap = new Map(categories.map((item) => [item.slug, item.name]));
  const services = featuredServices.slice(0, 5);
  const [spotlight, ...supporting] = services;

  return (
    <>
      <section className="section-v73-services relative overflow-hidden border-b border-brand-navy/8 py-20 lg:py-24">
        <div className="page-shell relative">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <h2 className="section-title max-w-[720px]">{settings.servicesTitle}</h2>
            <div className="max-w-[340px]">
              <p className="text-sm leading-7 text-brand-muted">{settings.servicesDescription}</p>
              <Link href="/layanan" className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-brand-navy hover:text-brand-gold-dark">
                Lihat semua layanan <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          <div className="mt-9 grid gap-4 lg:grid-cols-[1.05fr_1.55fr]">
            {spotlight ? <SpotlightService service={spotlight} categoryName={categoryMap.get(spotlight.categorySlug) || "Layanan legal"} /> : null}

            <div className="grid gap-4 sm:grid-cols-2">
              {supporting.slice(0, 4).map((service, index) => (
                <ServiceCard
                  key={service.id}
                  service={service}
                  categoryName={categoryMap.get(service.categorySlug) || "Layanan legal"}
                  tone={index}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden border-b border-white/10 bg-[linear-gradient(110deg,#061d36_0%,#082e53_54%,#0c426b_100%)] py-14 text-white lg:py-16">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(212,176,49,.10),transparent_24%)]" />
        <div className="page-shell relative">
          <div className="grid gap-8 lg:grid-cols-[.72fr_1.28fr] lg:items-center lg:gap-12">
            <div>
              <h2 className="max-w-[380px] text-[2rem] font-semibold leading-[1.08] tracking-[-0.04em] text-white sm:text-[2.35rem]">
                {settings.whyUsTitle}
              </h2>
              <p className="mt-4 max-w-[400px] text-sm leading-7 text-slate-300">
                {settings.whyUsDescription}
              </p>
              <Link href="/kontak" className="mt-6 inline-flex items-center gap-2 rounded-[12px] bg-brand-gold px-4 py-3 text-sm font-semibold text-brand-navy-dark transition hover:bg-brand-gold-soft">
                Konsultasi gratis <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="grid gap-x-7 gap-y-6 sm:grid-cols-2 xl:grid-cols-3">
              {whyItems.map(([title, description], index) => (
                <article key={title} className="relative border-b border-white/13 pb-5 pl-5 xl:min-h-[120px]">
                  <span className="absolute bottom-5 left-0 top-0 w-px bg-gradient-to-b from-brand-gold/80 to-brand-gold/10" />
                  <p className="text-[10px] font-semibold tabular-nums text-brand-gold-soft">0{index + 1}</p>
                  <h3 className="mt-2 text-sm font-semibold text-white">{title}</h3>
                  <p className="mt-2 text-[12px] leading-5 text-slate-300">{description}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function SpotlightService({ service }: { service: Service; categoryName: string }) {
  const bullets = (service.inclusions.length ? service.inclusions : service.benefits).slice(0, 4);

  return (
    <Link href={`/layanan/${service.slug}`} className="service-feature-v74 group relative min-h-[520px] overflow-hidden rounded-[28px] border border-brand-navy/16 text-white shadow-[0_24px_58px_rgba(4,29,54,.18)]">
      <div className="service-feature-v74-bg absolute inset-0" />
      <div className="service-feature-v74-photo absolute inset-y-0 right-0 hidden w-[58%] lg:block">
        <Image src="/visuals/service-building.svg" alt="" fill className="object-cover object-center opacity-[0.72]" />
      </div>
      <div className="service-feature-v74-overlay absolute inset-0" />
      <div className="service-feature-v74-ring absolute right-[-80px] top-[-90px] h-72 w-72 rounded-full" />

      <div className="relative flex h-full flex-col justify-between p-7 sm:p-8">
        <div className="max-w-[540px]">
          <h3 className="max-w-[480px] text-3xl font-semibold leading-[1.08] tracking-[-0.04em] sm:text-[2.45rem]">{service.title}</h3>
          <p className="mt-4 max-w-[470px] text-sm leading-7 text-slate-200">{service.shortDescription}</p>

          {bullets.length ? (
            <div className="mt-7 grid gap-3 sm:grid-cols-2">
              {bullets.map((item) => (
                <span key={item} className="flex items-start gap-2.5 rounded-[14px] border border-white/10 bg-white/7 px-3 py-3 text-xs leading-5 text-white/95 backdrop-blur-sm">
                  <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-brand-gold/18 text-brand-gold-soft">
                    <Check className="h-3.5 w-3.5" />
                  </span>
                  {item}
                </span>
              ))}
            </div>
          ) : null}
        </div>

        <div className="mt-10 grid gap-5 border-t border-white/14 pt-6 sm:grid-cols-[1fr_auto] sm:items-end">
          <div>
            <p className="text-[10px] uppercase tracking-[.12em] text-slate-400">Mulai dari</p>
            <p className="mt-1.5 text-2xl font-semibold text-white">{servicePriceLabel(service.startingPrice, service.priceType)}</p>
            {service.duration ? (
              <p className="mt-2 inline-flex items-center gap-1.5 text-[11px] text-slate-300">
                <Clock3 className="h-3.5 w-3.5 text-brand-gold-soft" /> {service.duration}
              </p>
            ) : null}
          </div>
          <span className="inline-flex items-center gap-3 rounded-[18px] bg-white/10 px-4 py-3 text-sm font-semibold text-white backdrop-blur-sm transition group-hover:bg-brand-gold group-hover:text-brand-navy-dark">
            Lihat detail <ArrowUpRight className="h-4 w-4" />
          </span>
        </div>
      </div>
    </Link>
  );
}

function ServiceCard({ service, categoryName, tone }: { service: Service; categoryName: string; tone: number }) {
  const toneClass = tone === 1 ? "bg-brand-bluewash/78" : tone === 2 ? "bg-brand-cloud" : tone === 3 ? "bg-brand-gold-pale" : "bg-white";
  return (
    <Link href={`/layanan/${service.slug}`} className={`group relative min-h-[248px] overflow-hidden rounded-[22px] border border-brand-navy/12 p-5 shadow-[0_14px_32px_rgba(4,29,54,.05)] transition hover:-translate-y-1 hover:border-brand-gold/55 hover:shadow-[0_18px_40px_rgba(4,29,54,.1)] ${toneClass}`}>
      <div className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-brand-navy via-brand-gold/75 to-transparent opacity-85" />
      <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-white/45 blur-2xl" />
      <div className="flex items-center justify-between gap-4">
        <span className="text-[11px] font-medium text-brand-muted">{categoryName}</span>
        <span className="grid h-9 w-9 place-items-center rounded-full border border-brand-navy/10 bg-white text-brand-navy transition group-hover:border-brand-gold group-hover:bg-brand-gold group-hover:text-brand-navy-dark">
          <ArrowUpRight className="h-4 w-4" />
        </span>
      </div>
      <h3 className="mt-2 line-clamp-3 text-[1.42rem] font-semibold leading-[1.16] tracking-[-0.03em] text-brand-navy-dark">{service.title}</h3>
      <p className="mt-3 line-clamp-2 text-sm leading-6 text-brand-muted">{service.shortDescription}</p>
      <div className="absolute inset-x-5 bottom-5 flex items-end justify-between border-t border-brand-navy/8 pt-4">
        <div>
          <p className="text-[10px] text-brand-muted">Mulai dari</p>
          <p className="mt-0.5 text-sm font-semibold text-brand-navy-dark">{servicePriceLabel(service.startingPrice, service.priceType)}</p>
        </div>
        {service.duration ? <span className="max-w-[120px] truncate text-[10px] text-brand-muted">{service.duration}</span> : null}
      </div>
    </Link>
  );
}
