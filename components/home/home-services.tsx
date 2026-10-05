import Link from "next/link";
import { ArrowRight, CircleDollarSign, FileCheck2, MessageSquareMore } from "lucide-react";
import type { Service, ServiceCategory, SiteSettings } from "@/types";

const trustItems = [
  {
    icon: FileCheck2,
    title: "Proses yang jelas",
    description: "Setiap langkah dijelaskan sejak awal, supaya Anda tahu apa yang sedang berjalan.",
  },
  {
    icon: CircleDollarSign,
    title: "Biaya transparan",
    description: "Kebutuhan dan biaya dibahas lebih dulu agar tidak ada kejutan di tengah proses.",
  },
  {
    icon: MessageSquareMore,
    title: "Update progres rutin",
    description: "Perkembangan penting disampaikan agar Anda tetap tahu status pengurusannya.",
  },
] as const;

export function HomeServices({
  featuredServices,
  settings,
}: {
  categories: ServiceCategory[];
  featuredServices: Service[];
  settings: SiteSettings;
}) {
  const services = featuredServices.slice(0, 3);

  return (
    <>
      <section className="border-b border-brand-navy/8 bg-brand-surface py-10 sm:py-12 lg:py-14">
        <div className="page-shell">
          <div className="max-w-3xl">
            <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-brand-gold-dark">
              Layanan kami
            </p>
            <h2 className="mt-2 text-[2rem] font-bold leading-[1.05] tracking-[-0.03em] text-brand-ink sm:text-[2.55rem]">
              {settings.servicesTitle || "Solusi legal untuk setiap tahap bisnismu."}
            </h2>
          </div>

          <div className="mt-7 grid gap-3 sm:grid-cols-2 lg:mt-9 lg:grid-cols-2">
            {services.map((service, index) => (
              <Link
                key={service.id}
                href={"/layanan/" + service.slug}
                className="corporate-card motion-reveal group flex min-h-[220px] flex-col p-5 sm:p-6 lg:p-7"
                style={{ animationDelay: String(index * 60) + "ms" }}
              >
                <span className="block h-[2px] w-9 bg-brand-gold" />
                <h3 className="mt-5 max-w-xl text-xl font-bold leading-[1.12] tracking-[-0.02em] text-brand-navy-dark sm:text-[1.4rem]">
                  {service.title}
                </h3>
                <p className="mt-3 max-w-xl text-sm leading-6 text-brand-muted">
                  {service.shortDescription}
                </p>
                <span className="mt-auto inline-flex items-center gap-2 pt-7 text-xs font-semibold text-brand-navy">
                  Lihat layanan
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            ))}

            <Link
              href="/layanan"
              className="corporate-card motion-reveal group flex min-h-[220px] flex-col justify-between bg-brand-navy p-5 text-white sm:p-6 lg:p-7"
              style={{ animationDelay: "180ms" }}
            >
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-brand-gold-soft">
                  Layanan lainnya
                </p>
                <h3 className="mt-4 max-w-xl text-xl font-bold leading-[1.12] sm:text-[1.4rem]">
                  Cari kebutuhan legal lain yang sesuai dengan kondisi bisnis Anda.
                </h3>
              </div>
              <span className="mt-6 inline-flex items-center gap-2 text-xs font-semibold text-brand-gold-soft">
                Lihat semua layanan
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
          </div>
        </div>
      </section>

      <section className="border-b border-brand-navy/8 bg-white py-10 sm:py-12 lg:py-16">
        <div className="page-shell">
          <div className="max-w-3xl">
            <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-brand-gold-dark">
              Kenapa Yuk Jadi Legal
            </p>
            <h2 className="mt-2 max-w-xl text-[2rem] font-bold leading-[1.05] tracking-[-0.03em] text-brand-ink sm:text-[2.45rem]">
              Proses legal yang lebih mudah dipahami.
            </h2>
          </div>

          <div className="mt-7 grid border-t border-brand-navy/10 pt-6 lg:mt-9 lg:grid-cols-3">
            {trustItems.map(({ icon: Icon, title, description }, index) => (
              <article
                key={title}
                className="motion-reveal relative py-4 lg:min-h-[190px] lg:border-l lg:border-brand-navy/10 lg:px-7 lg:first:border-l-0 lg:first:pl-0"
                style={{ animationDelay: String(index * 60) + "ms" }}
              >
                <div className="flex items-center justify-between gap-4">
                  <span className="grid h-11 w-11 place-items-center rounded-full bg-brand-gold-pale text-brand-gold-dark">
                    <Icon className="h-5 w-5" />
                  </span>
                  <span className="text-[10px] font-semibold tracking-[0.14em] text-brand-navy/35">
                    0{index + 1}
                  </span>
                </div>
                <h3 className="mt-5 text-lg font-bold text-brand-ink">{title}</h3>
                <p className="mt-2 max-w-sm text-sm leading-6 text-brand-muted">{description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
