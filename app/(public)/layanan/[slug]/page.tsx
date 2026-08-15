import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, ArrowUpRight, Check, Clock3, FileText, ShieldCheck } from "lucide-react";
import { LeadForm } from "@/components/site/lead-form";
import { JsonLd } from "@/components/shared/json-ld";
import { getWhatsAppHref } from "@/lib/contact";
import { getServiceBySlug, getServiceCategories, getServices, getSiteSettings } from "@/lib/data";
import { servicePriceLabel } from "@/lib/format";
import { absoluteUrl, createPageMetadata, getSiteUrl } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
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

export default async function ServiceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const [service, allServices, categories, settings] = await Promise.all([
    getServiceBySlug(slug),
    getServices(),
    getServiceCategories(),
    getSiteSettings(),
  ]);

  if (!service) notFound();

  const related = allServices.filter((item) => item.id !== service.id && item.categorySlug === service.categorySlug).slice(0, 4);
  const price = servicePriceLabel(service.startingPrice, service.priceType);
  const categoryName = categories.find((item) => item.slug === service.categorySlug)?.name || service.categorySlug.replaceAll("-", " ");
  const whatsappHref = getWhatsAppHref(settings.whatsapp, `Halo Yuk Jadi Legal, saya sedang melihat layanan ${service.title} dan ingin konsultasi.`);
  const consultationHref = whatsappHref || "/kontak";
  const serviceOptions = allServices.map(({ id, title, slug: serviceSlug }) => ({ id, title, slug: serviceSlug }));
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
      <section className="relative overflow-hidden border-b border-brand-navy/10 bg-white">
        <div className="page-hero-grid absolute inset-0 opacity-65" />
        <div className="page-shell relative py-10 lg:py-14">
          <Link href="/layanan" className="inline-flex items-center gap-2 text-xs font-semibold text-brand-muted transition hover:text-brand-navy">
            <ArrowLeft className="h-4 w-4" /> Kembali ke layanan
          </Link>

          <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-end lg:gap-14">
            <div>
              <p className="text-sm font-medium text-brand-gold-dark">{categoryName}</p>
              <h1 className="mt-3 max-w-4xl text-[clamp(2.45rem,4.8vw,4.8rem)] font-semibold leading-[1.02] tracking-[-0.055em] text-brand-ink">{service.title}</h1>
              <p className="mt-5 max-w-3xl text-[16px] font-normal leading-8 text-brand-muted">{service.shortDescription}</p>
            </div>

            <div className="rounded-[24px] border border-brand-navy/10 bg-brand-navy p-6 text-white shadow-[0_20px_52px_rgba(6,23,46,.14)]">
              <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-brand-gold-soft">Biaya layanan</p>
              <p className="mt-2 text-2xl font-semibold tracking-[-0.04em]">{price}</p>
              {service.priceNote ? <p className="mt-2 text-xs font-normal leading-6 text-slate-300">{service.priceNote}</p> : null}
              <a href={consultationHref} target={whatsappHref ? "_blank" : undefined} rel={whatsappHref ? "noreferrer" : undefined} className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-brand-gold px-4 py-3 text-sm font-semibold text-brand-navy transition hover:bg-brand-gold-soft">
                Konsultasikan layanan <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>

          <div className="mt-8 grid gap-3 sm:grid-cols-3 lg:max-w-4xl">
            <MetaCard icon={<Clock3 className="h-4 w-4" />} label="Estimasi" value={service.duration || "Menyesuaikan proses"} />
            <MetaCard icon={<FileText className="h-4 w-4" />} label="Dokumen" value="Checklist dibantu tim" />
            <MetaCard icon={<ShieldCheck className="h-4 w-4" />} label="Pendampingan" value="Sesuai ruang lingkup" />
          </div>
        </div>
      </section>

      <section className="page-shell py-14 lg:py-20">
        <div className="grid gap-10 lg:grid-cols-[320px_minmax(0,1fr)] lg:gap-14">
          <div>
            <h2 className="text-3xl font-semibold tracking-[-0.04em] text-brand-ink">Apa yang perlu kamu tahu.</h2>
          </div>
          <div>
            <p className="max-w-4xl text-lg font-medium leading-8 text-brand-ink sm:text-xl">{service.description}</p>
            {service.benefits.length ? (
              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                {service.benefits.map((item) => <CheckCard key={item}>{item}</CheckCard>)}
              </div>
            ) : null}
          </div>
        </div>
      </section>

      {(service.inclusions.length || service.requirements.length) ? (
        <section className="border-y border-brand-navy/9 bg-white py-14 lg:py-20">
          <div className="page-shell grid gap-5 lg:grid-cols-2">
            <InfoList title="Yang Anda dapatkan" subtitle="Ruang lingkup layanan" items={service.inclusions} tone="navy" />
            <InfoList title="Yang perlu disiapkan" subtitle="Checklist awal" items={service.requirements} tone="paper" />
          </div>
        </section>
      ) : null}

      {service.processSteps.length ? (
        <section className="page-shell py-14 lg:py-20">
          <div className="grid gap-8 lg:grid-cols-[320px_minmax(0,1fr)] lg:gap-14">
            <div>
              <h2 className="text-3xl font-semibold tracking-[-0.04em] text-brand-ink">Langkahnya terlihat dari awal.</h2>
            </div>
            <ol className="grid gap-3 sm:grid-cols-2">
              {service.processSteps.map((step, index) => (
                <li key={step} className="card-premium card-accent-top rounded-[22px] p-5">
                  <span className="text-3xl font-semibold tracking-[-0.06em] text-brand-navy/12">{String(index + 1).padStart(2, "0")}</span>
                  <p className="mt-5 text-base font-semibold leading-6 text-brand-ink">{step}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>
      ) : null}

      {service.faqs.length ? (
        <section className="border-y border-brand-navy/9 bg-brand-paper py-14 lg:py-20">
          <div className="page-shell grid gap-8 lg:grid-cols-[320px_minmax(0,1fr)] lg:gap-14">
            <div>
              <h2 className="text-3xl font-semibold tracking-[-0.04em] text-brand-ink">Pertanyaan sebelum mulai.</h2>
            </div>
            <div className="overflow-hidden rounded-[24px] border border-brand-navy/10 bg-white">
              {service.faqs.map((faq, index) => (
                <details key={faq.question} className="group border-b border-brand-navy/9 last:border-b-0 open:bg-brand-surface">
                  <summary className="grid cursor-pointer list-none grid-cols-[34px_minmax(0,1fr)_34px] items-center gap-3 px-5 py-5">
                    <span className="text-[10px] font-semibold text-brand-gold-dark">{String(index + 1).padStart(2, "0")}</span>
                    <span className="text-sm font-semibold leading-6 text-brand-ink">{faq.question}</span>
                    <span className="grid h-8 w-8 place-items-center rounded-full border border-brand-navy/12 text-brand-navy transition group-open:rotate-45 group-open:bg-brand-gold">+</span>
                  </summary>
                  <p className="px-[72px] pb-5 pr-8 text-sm font-normal leading-7 text-brand-muted">{faq.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <section className="page-shell py-14 lg:py-20">
        <div className="grid overflow-hidden rounded-[28px] border border-brand-navy/10 bg-white shadow-[0_22px_60px_rgba(6,23,46,.07)] lg:grid-cols-[.72fr_1.28fr]">
          <div className="bg-brand-navy p-7 text-white sm:p-8">
            <h2 className="text-3xl font-semibold leading-[1.08] tracking-[-0.04em]">Pastikan konteksnya jelas sebelum mulai.</h2>
            <p className="mt-4 text-sm font-normal leading-7 text-slate-200">Tim akan menindaklanjuti informasi awal melalui kontak yang kamu berikan.</p>
          </div>
          <LeadForm services={serviceOptions} defaultService={service.slug} />
        </div>
      </section>

      {related.length ? (
        <section className="border-t border-brand-navy/9 bg-white py-14 lg:py-20">
          <div className="page-shell">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h2 className="mt-4 text-3xl font-semibold tracking-[-0.04em] text-brand-ink">Kebutuhan lain di kategori yang sama.</h2>
              </div>
              <Link href={`/layanan?category=${service.categorySlug}`} className="inline-flex items-center gap-2 text-sm font-semibold text-brand-navy hover:text-brand-gold-dark">Lihat kategori <ArrowRight className="h-4 w-4" /></Link>
            </div>
            <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {related.map((item, index) => (
                <Link key={item.id} href={`/layanan/${item.slug}`} className="card-premium card-accent-top group rounded-[22px] p-5">
                  <div className="flex items-start justify-between gap-4">
                    <span className="text-[10px] font-semibold text-brand-gold-dark">0{index + 1}</span>
                    <ArrowUpRight className="h-4 w-4 text-brand-navy/35 transition group-hover:text-brand-gold-dark" />
                  </div>
                  <h3 className="mt-6 text-lg font-semibold leading-[1.18] tracking-[-0.025em] text-brand-ink">{item.title}</h3>
                  <p className="mt-3 text-xs font-semibold text-brand-muted">{servicePriceLabel(item.startingPrice, item.priceType)}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      ) : null}
    </main>
  );
}

function MetaCard({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-brand-navy/9 bg-brand-surface p-4">
      <span className="text-brand-gold-dark">{icon}</span>
      <p className="mt-3 text-[9px] font-semibold uppercase tracking-[0.1em] text-brand-muted">{label}</p>
      <p className="mt-1 text-xs font-semibold text-brand-ink">{value}</p>
    </div>
  );
}

function CheckCard({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex gap-3 rounded-2xl border border-brand-navy/9 bg-white p-4">
      <span className="grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-brand-gold/15 text-brand-gold-dark"><Check className="h-3.5 w-3.5" /></span>
      <p className="text-sm font-medium leading-6 text-brand-muted">{children}</p>
    </div>
  );
}

function InfoList({ title, subtitle, items, tone }: { title: string; subtitle: string; items: string[]; tone: "navy" | "paper" }) {
  if (!items.length) return null;
  const dark = tone === "navy";
  return (
    <div className={`rounded-[26px] p-6 sm:p-7 ${dark ? "bg-brand-navy text-white" : "border border-brand-navy/10 bg-brand-paper text-brand-ink"}`}>
      <p className={`text-[10px] font-semibold uppercase tracking-[0.12em] ${dark ? "text-brand-gold-soft" : "text-brand-gold-dark"}`}>{title}</p>
      <h2 className="mt-2 text-2xl font-semibold tracking-[-0.035em]">{subtitle}</h2>
      <div className={`mt-6 divide-y ${dark ? "divide-white/12" : "divide-brand-navy/9"}`}>
        {items.map((item, index) => (
          <div key={item} className="grid grid-cols-[30px_1fr] gap-3 py-3.5">
            <span className={`text-[10px] font-semibold ${dark ? "text-brand-gold-soft" : "text-brand-gold-dark"}`}>{String(index + 1).padStart(2, "0")}</span>
            <p className={`text-sm font-medium leading-6 ${dark ? "text-slate-200" : "text-brand-muted"}`}>{item}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
