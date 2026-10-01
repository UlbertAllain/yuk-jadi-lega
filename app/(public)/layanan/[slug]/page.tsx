import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, ArrowUpRight, Check, Clock3 } from "lucide-react";
import { LeadForm } from "@/components/site/lead-form";
import { JsonLd } from "@/components/shared/json-ld";
import { getWhatsAppHref } from "@/lib/contact";
import { getServiceBySlug, getServiceCategories, getServices, getSiteSettings } from "@/lib/data";
import { servicePriceLabel } from "@/lib/format";
import { absoluteUrl, createPageMetadata, getSiteUrl } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = await getServiceBySlug(slug);
  if (!service) return { title: "Layanan Tidak Ditemukan" };

  return createPageMetadata({
    title: service.seoTitle || service.title,
    description: service.seoDescription || service.shortDescription,
    path: `/layanan/${service.slug}`,
    keywords: service.keywords,
  });
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [service, allServices, categories, settings] = await Promise.all([
    getServiceBySlug(slug),
    getServices(),
    getServiceCategories(),
    getSiteSettings(),
  ]);

  if (!service) notFound();

  const benefits = service.benefits ?? [];
  const inclusions = service.inclusions ?? [];
  const requirements = service.requirements ?? [];
  const processSteps = service.processSteps ?? [];
  const faqs = service.faqs ?? [];

  const related = allServices
    .filter((item) => item.id !== service.id && item.categorySlug === service.categorySlug)
    .slice(0, 4);
  const price = servicePriceLabel(service.startingPrice, service.priceType);
  const categoryName =
    categories.find((item) => item.slug === service.categorySlug)?.name ||
    service.categorySlug.replaceAll("-", " ");
  const whatsappHref = getWhatsAppHref(
    settings.whatsapp,
    `Halo Yuk Jadi Legal, saya sedang melihat layanan ${service.title} dan ingin konsultasi.`,
  );
  const consultationHref = whatsappHref || "/kontak";
  const serviceOptions = allServices.map(({ id, title, slug: serviceSlug }) => ({
    id,
    title,
    slug: serviceSlug,
  }));
  const canonicalUrl = absoluteUrl(`/layanan/${service.slug}`);
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Beranda",
        item: getSiteUrl(),
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Layanan",
        item: absoluteUrl("/layanan"),
      },
      {
        "@type": "ListItem",
        position: 3,
        name: service.title,
        item: canonicalUrl,
      },
    ],
  };

  return (
    <main className="bg-brand-surface">
      <JsonLd data={breadcrumbJsonLd} />

      <section className="editorial-surface border-b border-brand-navy/10">
        <div className="page-shell relative py-7 sm:py-9 lg:py-12">
          <Link
            href="/layanan"
            className="inline-flex items-center gap-2 text-xs font-semibold text-brand-muted transition hover:text-brand-navy"
          >
            <ArrowLeft className="h-4 w-4" /> Kembali ke layanan
          </Link>

          <div className="mt-6 grid gap-8 lg:grid-cols-[minmax(0,1fr)_310px] lg:items-start lg:gap-12">
            <div>
              <p className="text-sm font-medium text-brand-gold-dark">{categoryName}</p>
              <h1 className="mt-3 max-w-4xl text-[clamp(2.2rem,4.6vw,4rem)] font-semibold leading-[1.03] tracking-[-0.047em] text-brand-ink">
                {service.title}
              </h1>
              <p className="mt-4 max-w-3xl text-[15px] leading-7 text-brand-muted sm:text-base sm:leading-8">
                {service.shortDescription}
              </p>

              <div className="mt-6 flex flex-wrap gap-x-7 gap-y-2.5 border-t border-brand-navy/10 pt-4 text-xs text-brand-muted">
                <span className="inline-flex items-center gap-2">
                  <Clock3 className="h-4 w-4 text-brand-gold-dark" />
                  {service.duration || "Estimasi menyesuaikan proses"}
                </span>
                <span>Dokumen dibantu dicek tim</span>
                <span>Pendampingan dijelaskan sejak awal</span>
              </div>
            </div>

            <aside className="editorial-panel rounded-[16px] border border-brand-navy/12 bg-white/85 p-5 backdrop-blur-[1px] sm:p-6">
              <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-brand-muted">
                Biaya layanan
              </p>
              <p className="mt-2 text-2xl font-semibold tracking-[-0.035em] text-brand-ink">{price}</p>
              {service.priceNote ? (
                <p className="mt-3 text-xs leading-6 text-brand-muted">{service.priceNote}</p>
              ) : null}
              <a
                href={consultationHref}
                target={whatsappHref ? "_blank" : undefined}
                rel={whatsappHref ? "noreferrer" : undefined}
                className="mt-5 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-[10px] bg-brand-navy px-4 py-3 text-sm font-semibold text-white transition hover:bg-brand-navy-dark"
              >
                Konsultasikan layanan <ArrowRight className="h-4 w-4" />
              </a>
            </aside>
          </div>
        </div>
      </section>

      <section className="page-shell py-10 sm:py-12 lg:py-14">
        <div className="grid gap-8 lg:grid-cols-[1.12fr_.88fr] lg:gap-10">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.11em] text-brand-gold-dark">
              Tentang layanan
            </p>
            <h2 className="mt-3 text-2xl font-semibold tracking-[-0.035em] text-brand-ink sm:text-3xl">
              Yang perlu Anda ketahui sebelum mulai.
            </h2>
            <p className="mt-5 text-[15px] leading-8 text-brand-muted sm:text-base">
              {service.description}
            </p>
          </div>

          {benefits.length ? (
            <div className="rounded-[16px] border border-brand-navy/10 bg-white p-5 sm:p-6">
              <p className="text-xs font-semibold text-brand-ink">Manfaat utama</p>
              <div className="mt-4 grid gap-3">
                {benefits.slice(0, 4).map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-brand-gold-pale">
                      <Check className="h-3.5 w-3.5 text-brand-gold-dark" />
                    </span>
                    <p className="text-sm leading-6 text-brand-muted">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          ) : null}
        </div>

        {inclusions.length || requirements.length ? (
          <div className="mt-8 grid gap-5 md:grid-cols-2">
            <InfoPanel
              eyebrow="Yang Anda dapatkan"
              title="Termasuk dalam layanan"
              items={inclusions}
            />
            <InfoPanel
              eyebrow="Yang perlu disiapkan"
              title="Dokumen dan informasi awal"
              items={requirements}
            />
          </div>
        ) : null}
      </section>

      {processSteps.length ? (
        <section className="border-y border-brand-navy/9 bg-brand-paper py-10 sm:py-12 lg:py-14">
          <div className="page-shell">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.11em] text-brand-gold-dark">
                  Alur layanan
                </p>
                <h2 className="mt-2 text-2xl font-semibold tracking-[-0.035em] text-brand-ink sm:text-3xl">
                  Prosesnya dibuat ringkas dan mudah diikuti.
                </h2>
              </div>
              <p className="max-w-md text-sm leading-6 text-brand-muted">
                Tahapan dapat menyesuaikan kondisi dokumen dan kebutuhan layanan.
              </p>
            </div>

            <ol className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
              {processSteps.map((step, index) => (
                <li
                  key={step}
                  className="min-h-[132px] rounded-[14px] border border-brand-navy/10 bg-white p-4"
                >
                  <span className="text-xs font-semibold tabular-nums text-brand-gold-dark">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <p className="mt-7 text-sm font-semibold leading-6 text-brand-ink">{step}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>
      ) : null}

      {faqs.length ? (
        <section className="page-shell py-10 sm:py-12 lg:py-14">
          <div className="mx-auto max-w-4xl">
            <div className="text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.11em] text-brand-gold-dark">
                Pertanyaan umum
              </p>
              <h2 className="mt-2 text-2xl font-semibold tracking-[-0.035em] text-brand-ink sm:text-3xl">
                Hal yang sering ditanyakan sebelum mulai.
              </h2>
            </div>

            <div className="mt-7 divide-y divide-brand-navy/10 border-y border-brand-navy/12">
              {faqs.map((faq) => (
                <details key={faq.question} className="group">
                  <summary className="grid cursor-pointer list-none grid-cols-[minmax(0,1fr)_24px] items-center gap-4 py-4">
                    <span className="text-sm font-semibold leading-6 text-brand-ink">{faq.question}</span>
                    <span className="text-xl leading-none text-brand-navy transition group-open:rotate-45">+</span>
                  </summary>
                  <p className="max-w-3xl pb-4 pr-8 text-sm leading-7 text-brand-muted">{faq.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <section className="bg-brand-navy-dark py-10 text-white sm:py-12 lg:py-14">
        <div className="page-shell grid gap-8 lg:grid-cols-[.72fr_1.28fr] lg:items-start lg:gap-10">
          <div className="max-w-md">
            <p className="text-xs font-semibold uppercase tracking-[0.11em] text-brand-gold-soft">
              Konsultasi
            </p>
            <h2 className="mt-3 text-2xl font-semibold leading-[1.1] tracking-[-0.035em] text-white sm:text-3xl">
              Ceritakan kondisi usaha Anda sebelum mulai.
            </h2>
            <p className="mt-4 text-sm leading-7 text-slate-300">
              Tim akan mengecek kebutuhan awal dan menghubungi Anda melalui kontak yang diberikan.
            </p>
          </div>
          <div className="rounded-[16px] bg-white p-1 sm:p-2">
            <LeadForm services={serviceOptions} defaultService={service.slug} />
          </div>
        </div>
      </section>

      {related.length ? (
        <section className="bg-white py-10 sm:py-12 lg:py-14">
          <div className="page-shell">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.11em] text-brand-gold-dark">
                  Layanan terkait
                </p>
                <h2 className="mt-2 text-2xl font-semibold tracking-[-0.035em] text-brand-ink sm:text-3xl">
                  Mungkin juga relevan untuk kebutuhan Anda.
                </h2>
              </div>
              <Link
                href={`/layanan?category=${service.categorySlug}`}
                className="inline-flex items-center gap-2 text-sm font-semibold text-brand-navy hover:text-brand-gold-dark"
              >
                Lihat kategori <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {related.map((item) => (
                <Link
                  key={item.id}
                  href={`/layanan/${item.slug}`}
                  className="group flex min-h-[170px] flex-col justify-between rounded-[14px] border border-brand-navy/10 bg-brand-surface p-5 transition hover:border-brand-gold/45"
                >
                  <div>
                    <p className="text-[11px] font-semibold text-brand-muted">{categoryName}</p>
                    <h3 className="mt-2 text-base font-semibold leading-6 text-brand-ink">
                      {item.title}
                    </h3>
                  </div>
                  <div className="mt-6 flex items-end justify-between gap-3">
                    <p className="text-xs font-semibold text-brand-muted">
                      {servicePriceLabel(item.startingPrice, item.priceType)}
                    </p>
                    <ArrowUpRight className="h-4 w-4 text-brand-navy transition group-hover:text-brand-gold-dark" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      ) : null}
    </main>
  );
}

function InfoPanel({
  eyebrow,
  title,
  items,
}: {
  eyebrow: string;
  title: string;
  items: string[];
}) {
  if (!items.length) return null;

  return (
    <section className="rounded-[16px] border border-brand-navy/10 bg-white p-5 sm:p-6">
      <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-brand-gold-dark">{eyebrow}</p>
      <h2 className="mt-2 text-xl font-semibold tracking-[-0.025em] text-brand-ink">{title}</h2>
      <ul className="mt-5 grid gap-x-6 gap-y-3 sm:grid-cols-2">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-2.5 text-sm leading-6 text-brand-muted">
            <Check className="mt-1 h-3.5 w-3.5 shrink-0 text-brand-gold-dark" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
