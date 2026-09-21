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

      <section className="page-shell py-10 sm:py-14 lg:py-20">
        {leadArticle ? (
          <Link
            href={`/artikel/${leadArticle.slug}`}
            className="group grid gap-6 border-y border-brand-navy/12 py-6 sm:gap-8 sm:py-8 lg:grid-cols-[1.05fr_.95fr] lg:items-center lg:gap-12"
          >
            <div className="relative aspect-[16/10] overflow-hidden rounded-[8px] bg-brand-paper lg:aspect-[4/3]">
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

            <div className="text-center lg:text-left">
              <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-brand-gold-dark">
                {leadArticle.category}
              </p>
              <h2 className="mt-4 text-3xl font-semibold leading-[1.08] tracking-[-0.045em] text-brand-ink sm:text-4xl">
                {leadArticle.title}
              </h2>
              <p className="mx-auto mt-5 max-w-xl text-[15px] leading-7 text-brand-muted lg:mx-0">{leadArticle.excerpt}</p>
              <span className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-brand-navy">
                Baca artikel <ArrowUpRight className="h-4 w-4" />
              </span>
            </div>
          </Link>
        ) : null}

        {restArticles.length ? (
          <div className="mt-8 grid gap-x-8 gap-y-8 sm:mt-10 sm:gap-y-10 md:grid-cols-2 xl:grid-cols-3">
            {restArticles.map((article, index) => (
              <Link key={article.id} href={`/artikel/${article.slug}`} className="group block">
                <div className="relative aspect-[16/9] overflow-hidden rounded-[8px] bg-brand-paper">
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

                <div className="pt-5">
                  <div className="flex items-center justify-between gap-3 text-[10px] text-brand-muted">
                    <span>{article.category}</span>
                    <span>{String(index + 2).padStart(2, "0")}</span>
                  </div>
                  <h2 className="mt-3 line-clamp-3 text-xl font-semibold leading-[1.18] tracking-[-0.03em] text-brand-ink">
                    {article.title}
                  </h2>
                  <p className="mt-3 line-clamp-3 text-sm leading-6 text-brand-muted">{article.excerpt}</p>
                  <span className="mt-5 inline-flex items-center gap-1 text-xs font-semibold text-brand-navy">
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
