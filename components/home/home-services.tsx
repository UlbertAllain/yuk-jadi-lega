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
      <section className="border-b border-brand-navy/8 bg-white py-14 sm:py-16 lg:py-24">
        <div className="page-shell">
          <div className="grid gap-6 lg:grid-cols-[1fr_360px] lg:items-end lg:gap-12">
            <h2 className="section-title max-w-[760px]">{settings.servicesTitle}</h2>
            <div>
              <p className="text-sm leading-7 text-brand-muted">{settings.servicesDescription}</p>
              <Link
                href="/layanan"
                className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-brand-navy transition hover:text-brand-gold-dark"
              >
                Lihat semua layanan <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          <div className="mt-8 grid gap-7 sm:mt-10 lg:grid-cols-[1.08fr_.92fr] lg:items-stretch">
            {spotlight ? <SpotlightService service={spotlight} /> : null}

            {supporting.length ? (
              <div className="border-y border-brand-navy/12">
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

      <section className="border-b border-white/10 bg-brand-navy-dark py-14 text-white sm:py-16 lg:py-20">
        <div className="page-shell grid gap-10 lg:grid-cols-[.72fr_1.28fr] lg:gap-14">
          <div>
            <h2 className="max-w-[380px] text-[2rem] font-semibold leading-[1.08] tracking-[-0.04em] text-white ">
              {settings.whyUsTitle}
            </h2>
            <p className="mt-4 max-w-[420px] text-sm leading-7 text-slate-300">
              {settings.whyUsDescription}
            </p>
            <Link
              href="/kontak"
              className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-brand-gold-soft transition hover:text-white"
            >
              Konsultasi gratis <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid gap-x-8 gap-y-7 sm:grid-cols-2 xl:grid-cols-3">
            {whyItems.map(([title, description], index) => (
              <article key={title} className="border-t border-white/18 pt-4 xl:min-h-[128px]">
                <p className="text-[10px] font-semibold tabular-nums text-brand-gold-soft">0{index + 1}</p>
                <h3 className="mt-3 text-sm font-semibold text-white">{title}</h3>
                <p className="mt-2 text-[12px] leading-5 text-slate-300">{description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

function SpotlightService({ service }: { service: Service }) {
  const bullets = (service.inclusions.length ? service.inclusions : service.benefits).slice(0, 3);

  return (
    <Link
      href={`/layanan/${service.slug}`}
      className="service-feature-v863 group relative min-h-[390px] sm:min-h-[430px] lg:min-h-[450px] overflow-hidden rounded-[14px] border border-brand-navy/14 text-white"
    >
      <div className="service-feature-v863-bg absolute inset-0" />
      <div className="service-feature-v863-photo absolute inset-y-0 right-0 hidden w-[52%] md:block">
        <Image src="/visuals/service-building.svg" alt="" fill className="object-cover object-center" />
      </div>
      <div className="service-feature-v863-overlay absolute inset-0" />

      <div className="relative flex h-full min-h-[390px] flex-col justify-between p-5 sm:min-h-[430px] sm:p-8 lg:min-h-[450px] lg:p-9">
        <div className="max-w-[560px]">
          <h3 className="max-w-[500px] text-[1.75rem] sm:text-[2.35rem] font-semibold leading-[1.08] tracking-[-0.04em] sm:text-[2.35rem]">
            {service.title}
          </h3>
          <p className="mt-4 max-w-[490px] text-sm leading-7 text-slate-200">
            {service.shortDescription}
          </p>

          {bullets.length ? (
            <ul className="mt-7 grid max-w-[560px] gap-x-6 gap-y-3 sm:grid-cols-2">
              {bullets.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-xs leading-5 text-slate-100">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-gold-soft" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          ) : null}
        </div>

        <div className="mt-10 flex flex-col gap-5 border-t border-white/18 pt-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-[11px] text-slate-300">Mulai dari</p>
            <p className="mt-1 text-2xl font-semibold text-white">
              {servicePriceLabel(service.startingPrice, service.priceType)}
            </p>
            {service.duration ? (
              <p className="mt-2 inline-flex items-center gap-1.5 text-[11px] text-slate-300">
                <Clock3 className="h-3.5 w-3.5 text-brand-gold-soft" /> {service.duration}
              </p>
            ) : null}
          </div>
          <span className="inline-flex w-fit items-center gap-2 border-b border-brand-gold pb-1 text-sm font-semibold text-white">
            Lihat detail <ArrowUpRight className="h-4 w-4" />
          </span>
        </div>
      </div>
    </Link>
  );
}

function ServiceRow({ service, categoryName }: { service: Service; categoryName: string }) {
  return (
    <Link
      href={`/layanan/${service.slug}`}
      className="group grid min-h-[118px] grid-cols-[1fr_auto] items-center gap-5 border-b border-brand-navy/8 py-5 last:border-b-0"
    >
      <div className="min-w-0">
        <p className="text-[11px] text-brand-muted">{categoryName}</p>
        <h3 className="mt-1.5 text-lg font-semibold leading-[1.2] tracking-[-0.025em] text-brand-navy-dark sm:text-xl">
          {service.title}
        </h3>
        <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-1 text-[11px] text-brand-muted">
          <span>
            Mulai{" "}
            <strong className="font-semibold text-brand-navy-dark">
              {servicePriceLabel(service.startingPrice, service.priceType)}
            </strong>
          </span>
          {service.duration ? <span>{service.duration}</span> : null}
        </div>
      </div>
      <ArrowUpRight className="h-5 w-5 shrink-0 text-brand-navy transition group-hover:text-brand-gold-dark" />
    </Link>
  );
}
