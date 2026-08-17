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
        meta={<p className="text-xs font-semibold text-brand-muted"><strong className="text-brand-ink">{articles.length}</strong> artikel tersedia</p>}
      />

      <section className="page-shell py-12 lg:py-20">
        {leadArticle ? (
          <Link href={`/artikel/${leadArticle.slug}`} className="group grid overflow-hidden rounded-[28px] border border-brand-navy/10 bg-white shadow-[0_20px_54px_rgba(6,23,46,.07)] lg:grid-cols-[1.05fr_.95fr]">
            <div className="relative min-h-[320px] overflow-hidden bg-brand-paper lg:min-h-[470px]">
              {leadArticle.coverImageUrl ? (
                <CmsImage src={leadArticle.coverImageUrl} alt={leadArticle.title} className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]" />
              ) : (
                <div className="insight-placeholder absolute inset-0" />
              )}
              <span className="absolute left-5 top-5 rounded-full bg-brand-navy px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.11em] text-white">Pilihan</span>
            </div>
            <div className="flex flex-col justify-between p-7 sm:p-9 lg:p-10">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-brand-gold-dark">{leadArticle.category}</p>
                <h2 className="mt-5 text-3xl font-semibold leading-[1.08] tracking-[-0.045em] text-brand-ink sm:text-4xl">{leadArticle.title}</h2>
                <p className="mt-5 text-[15px] font-normal leading-7 text-brand-muted">{leadArticle.excerpt}</p>
              </div>
              <div className="mt-8 flex items-center justify-between border-t border-brand-navy/9 pt-5">
                <span className="text-sm font-semibold text-brand-navy">Baca artikel</span>
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-brand-navy text-white transition group-hover:bg-brand-gold group-hover:text-brand-navy"><ArrowUpRight className="h-4 w-4" /></span>
              </div>
            </div>
          </Link>
        ) : null}

        {restArticles.length ? (
          <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {restArticles.map((article, index) => (
              <Link key={article.id} href={`/artikel/${article.slug}`} className="card-premium card-accent-top group overflow-hidden rounded-[24px]">
                <div className="relative aspect-[16/9] overflow-hidden bg-brand-paper">
                  {article.coverImageUrl ? (
                    <CmsImage src={article.coverImageUrl} alt={article.title} className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.04]" />
                  ) : (
                    <div className="insight-placeholder absolute inset-0" />
                  )}
                  <span className="absolute left-4 top-4 rounded-lg bg-white/95 px-2.5 py-1.5 text-[10px] font-semibold text-brand-navy shadow-sm">{String(index + 2).padStart(2, "0")}</span>
                </div>
                <div className="p-5 sm:p-6">
                  <p className="text-[9px] font-semibold uppercase tracking-[0.11em] text-brand-gold-dark">{article.category}</p>
                  <h2 className="mt-3 line-clamp-3 text-xl font-semibold leading-[1.18] tracking-[-0.03em] text-brand-ink">{article.title}</h2>
                  <p className="mt-3 line-clamp-3 text-sm font-normal leading-6 text-brand-muted">{article.excerpt}</p>
                  <div className="mt-5 flex items-center justify-between border-t border-brand-navy/8 pt-4">
                    <span className="text-xs font-semibold text-brand-muted">Baca artikel</span>
                    <ArrowUpRight className="h-4 w-4 text-brand-navy/35 transition group-hover:text-brand-gold-dark" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : null}
      </section>
    </main>
  );
}
