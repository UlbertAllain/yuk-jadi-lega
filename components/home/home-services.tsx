import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Check, Clock3 } from "lucide-react";
import { servicePriceLabel } from "@/lib/format";
import type { Service, ServiceCategory, SiteSettings } from "@/types";

const whyItems = [
  ["Tim profesional", "Pendampingan oleh tim yang terbiasa menangani kebutuhan legal bisnis."],
  ["Proses efisien", "Alur kerja dibuat jelas supaya pengurusan tidak terasa berputar-putar."],
  ["Harga transparan", "Kebutuhan dan biaya dijelaskan dari awal agar tidak ada kejutan di tengah proses."],
  ["Dokumen terarah", "Dokumen yang perlu disiapkan dijelaskan dengan bahasa yang lebih mudah dipahami."],
  ["Responsif", "Anda tetap mendapat kabar saat ada perkembangan atau hal penting yang perlu ditindaklanjuti."],
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
      <section className="services-v863 relative overflow-hidden border-b border-brand-navy/8 py-20 lg:py-24">
        <div className="services-v863-glow absolute -right-24 top-0 h-80 w-80 rounded-full" />
        <div className="page-shell relative">
          <div className="grid gap-5 lg:grid-cols-[1fr_360px] lg:items-end lg:gap-12">
            <h2 className="section-title max-w-[760px]">{settings.servicesTitle}</h2>
            <div>
              <p className="text-sm leading-7 text-brand-muted">{settings.servicesDescription}</p>
              <Link href="/layanan" className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-brand-navy transition hover:text-brand-gold-dark">
                Lihat semua layanan <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          <div className="mt-10 grid gap-5 lg:grid-cols-[1.13fr_.87fr] lg:items-stretch">
            {spotlight ? <SpotlightService service={spotlight} /> : null}

            {supporting.length ? (
              <div className="service-list-v863 overflow-hidden rounded-[26px] border border-brand-navy/10">
                {supporting.slice(0, 4).map((service) => (
                  <ServiceRow
                    key={service.id}
                    service={service}
                    categoryName={categoryMap.get(service.categorySlug) || "Layanan legal"}
                  />
                ))}
              </div>
            ) : null}
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

function SpotlightService({ service }: { service: Service }) {
  const bullets = (service.inclusions.length ? service.inclusions : service.benefits).slice(0, 3);

  return (
    <Link href={`/layanan/${service.slug}`} className="service-feature-v863 group relative min-h-[470px] overflow-hidden rounded-[28px] border border-brand-navy/14 text-white">
      <div className="service-feature-v863-bg absolute inset-0" />
      <div className="service-feature-v863-photo absolute inset-y-0 right-0 hidden w-[52%] md:block">
        <Image src="/visuals/service-building.svg" alt="" fill className="object-cover object-center" />
      </div>
      <div className="service-feature-v863-overlay absolute inset-0" />

      <div className="relative flex h-full min-h-[470px] flex-col justify-between p-7 sm:p-8 lg:p-9">
        <div className="max-w-[560px]">
          <h3 className="max-w-[500px] text-[2rem] font-semibold leading-[1.08] tracking-[-0.04em] sm:text-[2.45rem]">{service.title}</h3>
          <p className="mt-4 max-w-[490px] text-sm leading-7 text-slate-200">{service.shortDescription}</p>

          {bullets.length ? (
            <ul className="mt-7 grid max-w-[560px] gap-x-6 gap-y-3 sm:grid-cols-2">
              {bullets.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-xs leading-5 text-slate-100">
                  <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-brand-gold text-brand-navy-dark">
                    <Check className="h-3 w-3" />
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          ) : null}
        </div>

        <div className="mt-10 flex flex-col gap-5 border-t border-white/15 pt-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-[11px] text-slate-300">Mulai dari</p>
            <p className="mt-1 text-2xl font-semibold text-white">{servicePriceLabel(service.startingPrice, service.priceType)}</p>
            {service.duration ? (
              <p className="mt-2 inline-flex items-center gap-1.5 text-[11px] text-slate-300">
                <Clock3 className="h-3.5 w-3.5 text-brand-gold-soft" /> {service.duration}
              </p>
            ) : null}
          </div>
          <span className="inline-flex w-fit items-center gap-2 rounded-[14px] bg-brand-gold px-4 py-3 text-sm font-semibold text-brand-navy-dark transition group-hover:bg-brand-gold-soft">
            Lihat detail <ArrowUpRight className="h-4 w-4" />
          </span>
        </div>
      </div>
    </Link>
  );
}

function ServiceRow({ service, categoryName }: { service: Service; categoryName: string }) {
  return (
    <Link href={`/layanan/${service.slug}`} className="service-row-v863 group grid min-h-[128px] grid-cols-[1fr_auto] items-center gap-5 border-b border-brand-navy/8 px-5 py-5 last:border-b-0 sm:px-6">
      <div className="min-w-0">
        <p className="text-[11px] text-brand-muted">{categoryName}</p>
        <h3 className="mt-1.5 text-lg font-semibold leading-[1.2] tracking-[-0.025em] text-brand-navy-dark sm:text-xl">{service.title}</h3>
        <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-1 text-[11px] text-brand-muted">
          <span>
            Mulai <strong className="font-semibold text-brand-navy-dark">{servicePriceLabel(service.startingPrice, service.priceType)}</strong>
          </span>
          {service.duration ? <span>{service.duration}</span> : null}
        </div>
      </div>
      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-brand-navy/12 bg-white/70 text-brand-navy transition group-hover:border-brand-gold group-hover:bg-brand-gold group-hover:text-brand-navy-dark">
        <ArrowUpRight className="h-4 w-4" />
      </span>
    </Link>
  );
}
