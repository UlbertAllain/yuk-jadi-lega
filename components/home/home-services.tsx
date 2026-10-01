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

function serviceVisualClass(categorySlug: string) {
  if (categorySlug.includes("pendirian")) return "visual-service-company";
  if (categorySlug.includes("izin") || categorySlug.includes("perizinan")) return "visual-service-permit";
  if (categorySlug.includes("hki") || categorySlug.includes("merek") || categorySlug.includes("kontrak")) {
    return "visual-service-brand";
  }
  return "visual-service-consult";
}

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
      <section className="border-b border-brand-navy/8 bg-white py-10 sm:py-12 lg:py-16">
        <div className="page-shell">
          <div className="max-w-3xl">
            <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-brand-gold-dark">
              Layanan kami
            </p>
            <h2 className="editorial-heading mt-2 text-[2rem] font-semibold leading-[1.02] tracking-[-0.035em] text-brand-ink sm:text-[2.7rem]">
              {settings.servicesTitle || "Solusi legal untuk setiap tahap bisnismu."}
            </h2>
          </div>

          <div className="mt-7 grid gap-4 lg:mt-9 lg:grid-cols-3">
            {services.map((service, index) => (
              <Link
                key={service.id}
                href={"/layanan/" + service.slug}
                className="premium-card motion-reveal group grid grid-cols-[108px_minmax(0,1fr)] gap-4 overflow-hidden p-3 sm:grid-cols-[145px_minmax(0,1fr)] sm:gap-6 lg:block lg:p-0"
                style={{ animationDelay: String(index * 70) + "ms" }}
              >
                <div
                  className={"h-[88px] rounded-[10px] bg-cover bg-center sm:h-[106px] lg:h-[176px] lg:rounded-none " + serviceVisualClass(service.categorySlug)}
                  aria-hidden="true"
                />
                <div className="min-w-0 self-center lg:p-5">
                  <h3 className="editorial-heading text-lg font-semibold leading-[1.1] tracking-[-0.02em] text-brand-ink sm:text-[1.35rem]">
                    {service.title}
                  </h3>
                  <p className="mt-1.5 line-clamp-2 text-sm leading-6 text-brand-muted">
                    {service.shortDescription}
                  </p>
                  <span className="mt-2 inline-flex items-center gap-2 text-xs font-semibold text-brand-navy">
                    Lihat layanan
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="soft-wave-top border-b border-brand-navy/8 bg-brand-paper py-10 sm:py-12 lg:py-16">
        <div className="page-shell">
          <div className="max-w-3xl">
            <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-brand-gold-dark">
              Kenapa Yuk Jadi Legal
            </p>
            <h2 className="editorial-heading mt-2 max-w-xl text-[2rem] font-semibold leading-[1.04] tracking-[-0.035em] text-brand-ink sm:text-[2.6rem]">
              Legalitas bisnis, tanpa bikin pusing.
            </h2>
          </div>

          <div className="mt-7 grid gap-4 lg:mt-9 lg:grid-cols-3">
            {trustItems.map(({ icon: Icon, title, description }, index) => (
              <article
                key={title}
                className="premium-card motion-reveal grid grid-cols-[46px_minmax(0,1fr)] gap-4 p-5 lg:block lg:min-h-[220px] lg:p-6"
                style={{ animationDelay: String(index * 70) + "ms" }}
              >
                <span className="grid h-11 w-11 place-items-center rounded-full border border-brand-navy/7 bg-white text-brand-gold-dark shadow-[0_6px_18px_rgba(4,29,54,.035)]">
                  <Icon className="h-5 w-5" />
                </span>
                <div className="lg:mt-5">
                  <h3 className="editorial-heading text-lg font-semibold text-brand-ink">{title}</h3>
                  <p className="mt-1 text-sm leading-6 text-brand-muted">{description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
