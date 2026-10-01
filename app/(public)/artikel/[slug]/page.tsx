import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { getWhatsAppHref } from "@/lib/contact";
import { getArticleBySlug, getSiteSettings } from "@/lib/data";
import { formatDate } from "@/lib/format";
import { CmsImage } from "@/components/shared/cms-image";
import { JsonLd } from "@/components/shared/json-ld";
import { absoluteUrl, createPageMetadata, getSiteUrl } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);

  return article
    ? createPageMetadata({
        title: article.title,
        description: article.excerpt,
        path: `/artikel/${article.slug}`,
        image: article.coverImageUrl,
        type: "article",
        publishedTime: article.publishedAt,
      })
    : { title: "Artikel Tidak Ditemukan" };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [article, settings] = await Promise.all([
    getArticleBySlug(slug),
    getSiteSettings(),
  ]);

  if (!article) notFound();

  const whatsappHref = getWhatsAppHref(
    settings.whatsapp,
    `Halo Yuk Jadi Legal, saya membaca artikel "${article.title}" dan ingin konsultasi.`,
  );
  const consultationHref = whatsappHref || "/kontak";
  const canonicalUrl = absoluteUrl(`/artikel/${article.slug}`);
  const socialImage = absoluteUrl(article.coverImageUrl || "/brand/yuk-jadi-legal-social-preview.png");
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
        name: "Artikel",
        item: absoluteUrl("/artikel"),
      },
      {
        "@type": "ListItem",
        position: 3,
        name: article.title,
        item: canonicalUrl,
      },
    ],
  };
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: article.title,
    description: article.excerpt,
    image: [socialImage],
    datePublished: article.publishedAt,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": canonicalUrl,
    },
    publisher: {
      "@type": "Organization",
      "@id": `${getSiteUrl()}/#organization`,
      name: settings.brandName || "Yuk Jadi Legal",
      logo: {
        "@type": "ImageObject",
        url: absoluteUrl("/brand/yuk-jadi-legal-logo.png"),
      },
    },
    inLanguage: "id-ID",
  };

  return (
    <main className="bg-brand-surface">
      <JsonLd data={[breadcrumbJsonLd, articleJsonLd]} />

      <article>
        <header className="editorial-surface border-b border-brand-navy/10">
          <div className="page-shell relative py-8 sm:py-10 lg:py-14">
            <Link
              href="/artikel"
              className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500 transition hover:text-brand-navy"
            >
              <ArrowLeft className="h-4 w-4" /> Semua artikel
            </Link>

            <div className="mt-6 grid gap-6 lg:grid-cols-[1.1fr_.5fr] lg:items-end lg:gap-12">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-brand-gold-dark">
                  {article.category}
                </p>
                <h1 className="mt-3 max-w-5xl text-[clamp(2.15rem,4.4vw,4rem)] font-semibold leading-[1.03] tracking-[-0.047em] text-brand-ink">
                  {article.title}
                </h1>
                <p className="mt-4 max-w-3xl text-[15px] leading-7 text-slate-600 sm:text-base sm:leading-8">{article.excerpt}</p>
              </div>

              <div className="rounded-[12px] border border-brand-navy/10 bg-brand-surface p-4 lg:rounded-none lg:border-y-0 lg:border-r-0 lg:border-l lg:bg-transparent lg:p-0 lg:pl-5">
                <p className="text-[11px] font-semibold uppercase tracking-[0.11em] text-slate-400">
                  Diterbitkan
                </p>
                <p className="mt-2 text-sm font-semibold text-brand-ink">{formatDate(article.publishedAt)}</p>
                <p className="mt-4 text-xs leading-6 text-slate-500">
                  Artikel ini membantu Anda memahami topik dasarnya sebelum menentukan langkah yang paling sesuai untuk bisnis.
                </p>
              </div>
            </div>
          </div>
        </header>

        {article.coverImageUrl ? (
          <div className="page-shell pt-6 sm:pt-8 lg:pt-10">
            <CmsImage src={article.coverImageUrl} alt={article.title} className="aspect-[16/10] w-full rounded-[12px] object-cover sm:aspect-[16/8] lg:aspect-[16/7]" />
          </div>
        ) : null}

        <div className="page-shell grid gap-8 py-10 sm:py-12 lg:grid-cols-[220px_minmax(0,760px)] lg:justify-center lg:gap-12 lg:py-14">
          <aside className="hidden lg:block">
            <div className="sticky top-28 border-t border-brand-navy/14 py-5">
              <p className="text-xs leading-6 text-slate-500">
                Artikel ini bersifat sebagai panduan umum. Jika kondisi usaha Anda berbeda atau lebih kompleks, konsultasikan detailnya sebelum mengambil keputusan.
              </p>
            </div>
          </aside>
          <div className="whitespace-pre-line text-base leading-8 text-slate-700 sm:text-[1.05rem] sm:leading-9">{article.content}</div>
        </div>
      </article>

      <section className="border-t border-brand-navy/10 bg-brand-paper py-9 sm:py-11 lg:py-14">
        <div className="page-shell grid gap-5 sm:grid-cols-[1fr_auto] sm:items-center">
          <h2 className="max-w-2xl text-2xl font-semibold leading-[1.08] tracking-[-0.04em] text-brand-ink sm:text-3xl">
            Ada kondisi bisnis yang ingin Anda pastikan?
          </h2>
          <a
            href={consultationHref}
            target={whatsappHref ? "_blank" : undefined}
            rel={whatsappHref ? "noreferrer" : undefined}
            className="inline-flex min-h-12 w-full items-center justify-center gap-3 bg-brand-navy px-5 py-3 text-sm font-semibold text-white transition hover:bg-brand-navy-dark sm:w-auto"
          >
            Konsultasi <ArrowRight className="h-4 w-4 text-brand-gold-soft" />
          </a>
        </div>
      </section>
    </main>
  );
}
