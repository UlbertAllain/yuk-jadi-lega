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

const serviceCardLayout = [
  "asym-shape-a bg-brand-navy-dark text-white lg:col-span-7 lg:min-h-[255px]",
  "asym-shape-b bg-white text-brand-ink lg:col-span-5 lg:mt-8 lg:min-h-[220px]",
  "asym-shape-c bg-[#ead477] text-brand-navy-dark lg:col-span-5 lg:min-h-[230px]",
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
      <section className="border-b border-brand-navy/8 bg-brand-surface py-10 sm:py-12 lg:py-16">
        <div className="page-shell">
          <div className="max-w-3xl">
            <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-brand-gold-dark">
              Layanan kami
            </p>
            <h2 className="mt-2 text-[2rem] font-bold leading-[1.02] tracking-[-0.035em] text-brand-ink sm:text-[2.65rem]">
              {settings.servicesTitle || "Solusi legal untuk setiap tahap bisnismu."}
            </h2>
          </div>

          <div className="mt-7 grid gap-3 lg:mt-9 lg:grid-cols-12 lg:items-start lg:gap-4">
            {services.map((service, index) => {
              const dark = index === 0;
              return (
                <Link
                  key={service.id}
                  href={"/layanan/" + service.slug}
                  className={"asym-card motion-reveal group flex flex-col border-brand-navy/10 p-5 sm:p-6 lg:p-7 " + serviceCardLayout[index]}
                  style={{ animationDelay: String(index * 70) + "ms" }}
                >
                  <span className={dark ? "block h-[2px] w-10 bg-brand-gold" : "block h-[2px] w-10 bg-brand-navy"} />
                  <h3 className={"mt-5 text-xl font-bold leading-[1.05] tracking-[-0.025em] sm:text-[1.5rem] " + (dark ? "text-white" : "text-brand-navy-dark")}>
                    {service.title}
                  </h3>
                  <p className={"mt-3 max-w-xl text-sm leading-6 " + (dark ? "text-white/70" : "text-brand-muted")}>
                    {service.shortDescription}
                  </p>
                  <span className={"mt-auto inline-flex items-center gap-2 pt-7 text-xs font-semibold " + (dark ? "text-brand-gold-soft" : "text-brand-navy")}>
                    Lihat layanan
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
              );
            })}

            <Link
              href="/layanan"
              className="asym-card asym-shape-d motion-reveal group flex min-h-[180px] flex-col justify-between border-brand-navy/10 bg-white p-5 sm:p-6 lg:col-span-7 lg:mt-4 lg:p-7"
              style={{ animationDelay: "210ms" }}
            >
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-brand-gold-dark">
                  Masih ada kebutuhan lain?
                </p>
                <h3 className="mt-3 max-w-xl text-xl font-bold leading-[1.08] text-brand-navy-dark sm:text-[1.5rem]">
                  Lihat seluruh layanan dan pilih yang paling sesuai dengan kondisi bisnis Anda.
                </h3>
              </div>
              <span className="mt-5 inline-flex items-center gap-2 text-xs font-semibold text-brand-navy">
                Eksplor semua layanan
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
          </div>
        </div>
      </section>

      <section className="border-b border-brand-navy/8 bg-brand-paper py-10 sm:py-12 lg:py-16">
        <div className="page-shell">
          <div className="max-w-3xl">
            <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-brand-gold-dark">
              Kenapa Yuk Jadi Legal
            </p>
            <h2 className="mt-2 max-w-xl text-[2rem] font-bold leading-[1.04] tracking-[-0.035em] text-brand-ink sm:text-[2.55rem]">
              Legalitas bisnis, tanpa bikin pusing.
            </h2>
          </div>

          <div className="mt-7 grid gap-3 lg:mt-9 lg:grid-cols-3">
            {trustItems.map(({ icon: Icon, title, description }, index) => (
              <article
                key={title}
                className="motion-reveal border-t-2 border-brand-navy bg-white p-5 shadow-[0_12px_28px_rgba(4,29,54,.04)] lg:min-h-[205px] lg:p-6"
                style={{ animationDelay: String(index * 70) + "ms" }}
              >
                <span className="grid h-10 w-10 place-items-center rounded-full bg-brand-gold-pale text-brand-gold-dark">
                  <Icon className="h-5 w-5" />
                </span>
                <div className="mt-5">
                  <h3 className="text-lg font-bold text-brand-ink">{title}</h3>
                  <p className="mt-1.5 text-sm leading-6 text-brand-muted">{description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
