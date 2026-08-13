import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { CmsImage } from "@/components/shared/cms-image";
import { getArticles } from "@/lib/data";

export const metadata: Metadata = {
  title: "Artikel & Insight",
  description:
    "Artikel praktis tentang legalitas usaha, badan usaha, perizinan, merek, dan dokumen bisnis.",
};

export default async function ArticlesPage() {
  const articles = await getArticles();

  return (
    <main>
      <section className="bg-brand-paper">
        <div className="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-28">
          <p className="text-xs font-black uppercase tracking-[0.22em] text-brand-gold">
            Insight
          </p>
          <h1 className="mt-5 max-w-5xl text-5xl font-black tracking-[-0.06em] text-slate-950 sm:text-6xl lg:text-7xl">
            Baca dulu sebelum mengambil keputusan.
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-8 text-slate-600">
            Panduan sederhana untuk membantu kamu memahami istilah dan kebutuhan legal bisnis dengan lebih percaya diri.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-28">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {articles.map((article, index) => (
            <Link
              key={article.id}
              href={`/artikel/${article.slug}`}
              className="group overflow-hidden rounded-[2rem] border border-slate-200 bg-white"
            >
              <div className="flex aspect-[16/9] items-end overflow-hidden bg-gradient-to-br from-slate-100 to-brand-sand">
                {article.coverImageUrl ? (
                  <CmsImage
                    src={article.coverImageUrl}
                    alt={article.title}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
                  />
                ) : (
                  <span className="p-6 text-6xl font-black tracking-[-0.08em] text-slate-900/10">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                )}
              </div>

              <div className="p-7">
                <p className="text-xs font-black uppercase tracking-[0.16em] text-brand-gold">
                  {article.category}
                </p>
                <h2 className="mt-3 text-2xl font-black tracking-[-0.045em] text-slate-950 transition group-hover:text-brand-green">
                  {article.title}
                </h2>
                <p className="mt-4 text-sm leading-7 text-slate-600">
                  {article.excerpt}
                </p>
                <span className="mt-6 inline-flex items-center gap-2 text-sm font-black text-brand-green">
                  Baca artikel
                  <ArrowRight className="h-4 w-4" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
