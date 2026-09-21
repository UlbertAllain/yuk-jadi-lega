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

      <section className="border-b border-brand-navy/10 bg-white">
        <div className="page-shell py-8 sm:py-10 lg:py-16">
          <Link
            href="/layanan"
            className="inline-flex items-center gap-2 text-xs font-semibold text-brand-muted transition hover:text-brand-navy"
          >
            <ArrowLeft className="h-4 w-4" /> Kembali ke layanan
          </Link>

          <div className="mt-6 grid gap-7 sm:mt-8 sm:gap-10 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-end lg:gap-16">
            <div>
              <p className="text-sm font-medium text-brand-gold-dark">{categoryName}</p>
              <h1 className="mt-3 max-w-4xl text-[clamp(2.2rem,9.5vw,4.8rem)] font-semibold leading-[1.02] tracking-[-0.055em] text-brand-ink">
                {service.title}
              </h1>
              <p className="mt-4 max-w-3xl text-[15px] leading-7 text-brand-muted sm:mt-5 sm:text-[16px] sm:leading-8">
                {service.shortDescription}
              </p>
            </div>

            <div className="border-y border-brand-navy/14 py-4 sm:py-5">
              <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-brand-muted">
                Biaya layanan
              </p>
              <p className="mt-2 text-2xl font-semibold tracking-[-0.04em] text-brand-ink">{price}</p>
              {service.priceNote ? (
                <p className="mt-2 text-xs leading-6 text-brand-muted">{service.priceNote}</p>
              ) : null}
              <a
                href={consultationHref}
                target={whatsappHref ? "_blank" : undefined}
                rel={whatsappHref ? "noreferrer" : undefined}
                className="mt-5 inline-flex min-h-12 w-full items-center justify-center gap-2 bg-brand-navy px-5 py-3 text-sm font-semibold text-white transition hover:bg-brand-navy-dark sm:min-h-0 sm:w-auto sm:bg-transparent sm:px-0 sm:py-0 sm:text-brand-navy sm:hover:bg-transparent sm:hover:text-brand-gold-dark"
              >
                Konsultasikan layanan <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>

          <div className="mt-7 grid gap-3 border-t sm:mt-10 sm:flex sm:flex-wrap sm:gap-x-8 sm:gap-y-3 border-brand-navy/10 pt-5 text-xs text-brand-muted">
            <span className="inline-flex items-center gap-2">
              <Clock3 className="h-4 w-4 text-brand-gold-dark" />
              Estimasi: <strong className="font-semibold text-brand-ink">{service.duration || "Menyesuaikan proses"}</strong>
            </span>
            <span>Dokumen: <strong className="font-semibold text-brand-ink">Tim bantu cek kebutuhan</strong></span>
            <span>Pendampingan: <strong className="font-semibold text-brand-ink">Dijelaskan sejak awal</strong></span>
          </div>
        </div>
      </section>

      <section className="page-shell py-12 sm:py-14 lg:py-20">
        <div className="grid gap-10 lg:grid-cols-[320px_minmax(0,1fr)] lg:gap-14">
          <h2 className="text-[1.75rem] font-semibold tracking-[-0.04em] text-brand-ink sm:text-3xl">
            Yang perlu Anda ketahui.
          </h2>

          <div>
            <p className="max-w-4xl text-lg font-medium leading-8 text-brand-ink sm:text-xl">
              {service.description}
            </p>

            {service.benefits.length ? (
              <div className="mt-8 divide-y divide-brand-navy/10 border-y border-brand-navy/12">
                {service.benefits.map((item) => (
                  <div key={item} className="flex gap-3 py-4">
                    <Check className="mt-1 h-4 w-4 shrink-0 text-brand-gold-dark" />
                    <p className="text-sm leading-6 text-brand-muted">{item}</p>
                  </div>
                ))}
              </div>
            ) : null}
          </div>
        </div>
      </section>

      {service.inclusions.length || service.requirements.length ? (
        <section className="border-y border-brand-navy/9 bg-white py-12 sm:py-14 lg:py-20">
          <div className="page-shell grid gap-10 lg:grid-cols-2 lg:gap-16">
            <InfoList
              title="Yang Anda dapatkan"
              subtitle="Termasuk dalam layanan"
              items={service.inclusions}
            />
            <InfoList
              title="Yang perlu disiapkan"
              subtitle="Dokumen dan informasi awal"
              items={service.requirements}
            />
          </div>
        </section>
      ) : null}

      {service.processSteps.length ? (
        <section className="page-shell py-12 sm:py-14 lg:py-20">
          <div className="grid gap-8 lg:grid-cols-[320px_minmax(0,1fr)] lg:gap-14">
            <h2 className="text-[1.75rem] font-semibold tracking-[-0.04em] text-brand-ink sm:text-3xl">
              Bagaimana proses layanan ini berjalan.
            </h2>

            <ol className="divide-y divide-brand-navy/10 border-y border-brand-navy/12">
              {service.processSteps.map((step, index) => (
                <li key={step} className="grid gap-4 py-5 sm:grid-cols-[52px_minmax(0,1fr)] sm:py-6">
                  <span className="text-xs font-semibold text-brand-gold-dark">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <p className="text-base font-semibold leading-6 text-brand-ink">{step}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>
      ) : null}

      {service.faqs.length ? (
        <section className="border-y border-brand-navy/9 bg-brand-paper py-12 sm:py-14 lg:py-20">
          <div className="page-shell grid gap-8 lg:grid-cols-[320px_minmax(0,1fr)] lg:gap-14">
            <h2 className="text-[1.75rem] font-semibold tracking-[-0.04em] text-brand-ink sm:text-3xl">
              Pertanyaan yang sering muncul sebelum mulai.
            </h2>

            <div className="border-y border-brand-navy/14">
              {service.faqs.map((faq, index) => (
                <details key={faq.question} className="group border-b border-brand-navy/9 last:border-b-0">
                  <summary className="grid cursor-pointer list-none grid-cols-[34px_minmax(0,1fr)_24px] items-center gap-3 py-5">
                    <span className="text-[10px] font-semibold text-brand-gold-dark">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="text-sm font-semibold leading-6 text-brand-ink">{faq.question}</span>
                    <span className="text-xl leading-none text-brand-navy transition group-open:rotate-45">+</span>
                  </summary>
                  <p className="pb-5 pl-[47px] pr-8 text-sm leading-7 text-brand-muted">{faq.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <section className="page-shell py-14 lg:py-20">
        <div className="grid gap-10 border-y border-brand-navy/14 py-8 lg:grid-cols-[.7fr_1.3fr] lg:gap-14 lg:py-10">
          <div>
            <h2 className="text-3xl font-semibold leading-[1.08] tracking-[-0.04em] text-brand-ink">
              Ceritakan kondisi usaha Anda sebelum mulai.
            </h2>
            <p className="mt-4 text-sm leading-7 text-brand-muted">
              Tim akan menghubungi Anda melalui kontak yang diberikan untuk memastikan kebutuhan dan langkah berikutnya.
            </p>
          </div>
          <div className="lg:border-l lg:border-brand-navy/10 lg:pl-10">
            <LeadForm services={serviceOptions} defaultService={service.slug} />
          </div>
        </div>
      </section>

      {related.length ? (
        <section className="border-t border-brand-navy/9 bg-white py-14 lg:py-20">
          <div className="page-shell">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <h2 className="text-[1.75rem] font-semibold tracking-[-0.04em] text-brand-ink sm:text-3xl">
                Layanan lain yang mungkin relevan.
              </h2>
              <Link
                href={`/layanan?category=${service.categorySlug}`}
                className="inline-flex items-center gap-2 text-sm font-semibold text-brand-navy hover:text-brand-gold-dark"
              >
                Lihat kategori <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="mt-8 divide-y divide-brand-navy/10 border-y border-brand-navy/12">
              {related.map((item, index) => (
                <Link
                  key={item.id}
                  href={`/layanan/${item.slug}`}
                  className="group grid gap-3 py-5 sm:grid-cols-[46px_minmax(0,1fr)_180px_24px] sm:items-center"
                >
                  <span className="text-[10px] font-semibold text-brand-gold-dark">0{index + 1}</span>
                  <h3 className="text-lg font-semibold leading-[1.18] tracking-[-0.025em] text-brand-ink">
                    {item.title}
                  </h3>
                  <p className="text-xs font-semibold text-brand-muted sm:text-right">
                    {servicePriceLabel(item.startingPrice, item.priceType)}
                  </p>
                  <ArrowUpRight className="hidden h-4 w-4 text-brand-navy/45 transition group-hover:text-brand-gold-dark sm:block" />
                </Link>
              ))}
            </div>
          </div>
        </section>
      ) : null}
    </main>
  );
}

function InfoList({
  title,
  subtitle,
  items,
}: {
  title: string;
  subtitle: string;
  items: string[];
}) {
  if (!items.length) return null;

  return (
    <div>
      <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-brand-gold-dark">{title}</p>
      <h2 className="mt-2 text-2xl font-semibold tracking-[-0.035em] text-brand-ink">{subtitle}</h2>
      <div className="mt-5 divide-y divide-brand-navy/9 border-y border-brand-navy/12">
        {items.map((item, index) => (
          <div key={item} className="grid grid-cols-[30px_1fr] gap-3 py-3.5">
            <span className="text-[10px] font-semibold text-brand-gold-dark">
              {String(index + 1).padStart(2, "0")}
            </span>
            <p className="text-sm font-medium leading-6 text-brand-muted">{item}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
