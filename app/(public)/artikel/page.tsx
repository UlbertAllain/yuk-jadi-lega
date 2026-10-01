import { createPageMetadata } from "@/lib/seo";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { CmsImage } from "@/components/shared/cms-image";
import { PublicPageHero } from "@/components/site/public-page-hero";
import { getArticles } from "@/lib/data";

export const metadata = createPageMetadata({
  title: "Artikel & Panduan",
  description: "Artikel praktis seputar legalitas bisnis, perizinan, badan usaha, merek, dan dokumen perusahaan.",
  path: "/artikel",
});

export default async function ArticlesPage() {
  const articles = await getArticles();
  const [leadArticle, ...restArticles] = articles;

  return (
    <main className="bg-brand-surface">
      <PublicPageHero
        title="Penjelasan legal yang lebih mudah dipahami."
        description="Bacaan praktis tentang badan usaha, perizinan, merek, dokumen bisnis, dan keputusan legal yang sering ditemui pemilik usaha."
        meta={
          <p className="text-xs font-semibold text-brand-muted">
            <strong className="text-brand-ink">{articles.length}</strong> artikel tersedia
          </p>
        }
      />

      <section className="page-shell py-8 sm:py-10 lg:py-14">
        {leadArticle ? (
          <Link
            href={`/artikel/${leadArticle.slug}`}
            className="group grid overflow-hidden rounded-[16px] border border-brand-navy/10 bg-white lg:grid-cols-[1.05fr_.95fr] lg:items-stretch"
          >
            <div className="relative aspect-[16/10] overflow-hidden bg-brand-paper lg:aspect-auto lg:min-h-[360px]">
              {leadArticle.coverImageUrl ? (
                <CmsImage
                  src={leadArticle.coverImageUrl}
                  alt={leadArticle.title}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.025]"
                />
              ) : (
                <div className="insight-placeholder absolute inset-0" />
              )}
            </div>

            <div className="flex flex-col justify-center p-5 sm:p-7 lg:p-9">
              <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-brand-gold-dark">
                {leadArticle.category}
              </p>
              <h2 className="mt-3 text-2xl font-semibold leading-[1.1] tracking-[-0.035em] text-brand-ink sm:text-3xl">
                {leadArticle.title}
              </h2>
              <p className="mt-4 max-w-xl text-sm leading-7 text-brand-muted sm:text-[15px]">
                {leadArticle.excerpt}
              </p>
              <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-brand-navy">
                Baca artikel <ArrowUpRight className="h-4 w-4" />
              </span>
            </div>
          </Link>
        ) : null}

        {restArticles.length ? (
          <div className="mt-6 grid gap-x-6 gap-y-5 md:grid-cols-2 xl:grid-cols-3">
            {restArticles.map((article, index) => (
              <Link
                key={article.id}
                href={`/artikel/${article.slug}`}
                className="group grid grid-cols-[112px_minmax(0,1fr)] gap-4 border-b border-brand-navy/10 pb-5 md:block md:border-0 md:pb-0"
              >
                <div className="relative aspect-square overflow-hidden rounded-[10px] bg-brand-paper md:aspect-[16/9]">
                  {article.coverImageUrl ? (
                    <CmsImage
                      src={article.coverImageUrl}
                      alt={article.title}
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.025]"
                    />
                  ) : (
                    <div className="insight-placeholder absolute inset-0" />
                  )}
                </div>

                <div className="min-w-0 md:pt-4">
                  <div className="flex items-center justify-between gap-3 text-[10px] text-brand-muted">
                    <span className="truncate">{article.category}</span>
                    <span>{String(index + 2).padStart(2, "0")}</span>
                  </div>
                  <h2 className="mt-2 line-clamp-3 text-base font-semibold leading-[1.25] tracking-[-0.02em] text-brand-ink md:text-xl">
                    {article.title}
                  </h2>
                  <p className="mt-2 line-clamp-2 text-xs leading-5 text-brand-muted md:text-sm md:leading-6">
                    {article.excerpt}
                  </p>
                  <span className="mt-3 hidden items-center gap-1 text-xs font-semibold text-brand-navy md:inline-flex">
                    Baca artikel <ArrowUpRight className="h-4 w-4" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        ) : null}
      </section>
    </main>
  );
}
