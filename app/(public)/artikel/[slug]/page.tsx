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
        <header className="legal-grid-bg border-b border-brand-navy/10">
          <div className="page-shell py-14 lg:py-20">
            <Link href="/artikel" className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500 transition hover:text-brand-navy">
              <ArrowLeft className="h-4 w-4" /> Semua artikel
            </Link>

            <div className="mt-10 grid gap-10 lg:grid-cols-[1.1fr_.5fr] lg:items-end lg:gap-16">
              <div>
                <p className="eyebrow">{article.category}</p>
                <h1 className="mt-6 max-w-5xl text-[clamp(2.8rem,5vw,5rem)] font-semibold leading-[.96] tracking-[-0.06em] text-brand-ink">{article.title}</h1>
                <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-600">{article.excerpt}</p>
              </div>
              <div className="border-l-2 border-brand-gold pl-5">
                <p className="text-[9px] font-semibold uppercase tracking-[0.13em] text-slate-400">Diterbitkan</p>
                <p className="mt-2 text-sm font-semibold text-brand-ink">{formatDate(article.publishedAt)}</p>
                <p className="mt-4 text-xs leading-6 text-slate-500">Artikel ini membantu Anda memahami topik dasarnya sebelum menentukan langkah yang paling sesuai untuk bisnis.</p>
              </div>
            </div>
          </div>
        </header>

        {article.coverImageUrl ? (
          <div className="page-shell pt-12 lg:pt-16">
            <CmsImage src={article.coverImageUrl} alt={article.title} className="aspect-[16/7] w-full object-cover" />
          </div>
        ) : null}

        <div className="page-shell grid gap-10 py-16 lg:grid-cols-[220px_minmax(0,760px)] lg:justify-center lg:gap-14 lg:py-20">
          <aside className="hidden lg:block">
            <div className="sticky top-28 border-t border-brand-navy/14 py-5">
              <p className="text-xs leading-6 text-slate-500">Artikel ini bersifat sebagai panduan umum. Jika kondisi usaha Anda berbeda atau lebih kompleks, konsultasikan detailnya sebelum mengambil keputusan.</p>
            </div>
          </aside>
          <div className="whitespace-pre-line text-[1.05rem] leading-9 text-slate-700">{article.content}</div>
        </div>
      </article>

      <section className="bg-brand-navy py-16 text-white lg:py-20">
        <div className="page-shell flex flex-col gap-7 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h2 className="max-w-2xl text-3xl font-semibold leading-[1.05] tracking-[-0.05em] sm:text-4xl">Ada kondisi bisnis yang ingin Anda pastikan?</h2>
          </div>
          <a href={consultationHref} target={whatsappHref ? "_blank" : undefined} rel={whatsappHref ? "noreferrer" : undefined} className="inline-flex items-center gap-3 bg-white px-6 py-3 text-sm font-semibold text-brand-navy">
            Konsultasi <ArrowRight className="h-4 w-4 text-brand-gold-dark" />
          </a>
        </div>
      </section>
    </main>
  );
}
