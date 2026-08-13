import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { getWhatsAppHref } from "@/lib/contact";
import { getArticleBySlug, getSiteSettings } from "@/lib/data";
import { formatDate } from "@/lib/format";
import { CmsImage } from "@/components/shared/cms-image";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);

  return article
    ? { title: article.title, description: article.excerpt }
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

  return (
    <main>
      <article>
        <header className="bg-brand-paper">
          <div className="mx-auto max-w-4xl px-5 py-16 lg:px-8 lg:py-24">
            <Link
              href="/artikel"
              className="inline-flex items-center gap-2 text-sm font-bold text-slate-500"
            >
              <ArrowLeft className="h-4 w-4" />
              Semua insight
            </Link>
            <p className="mt-10 text-xs font-black uppercase tracking-[0.2em] text-brand-gold">
              {article.category} · {formatDate(article.publishedAt)}
            </p>
            <h1 className="mt-5 text-5xl font-black tracking-[-0.06em] text-slate-950 sm:text-6xl">
              {article.title}
            </h1>
            <p className="mt-6 text-lg leading-8 text-slate-600">{article.excerpt}</p>
          </div>
        </header>

        {article.coverImageUrl ? (
          <div className="mx-auto max-w-5xl px-5 pt-12 lg:px-8">
            <CmsImage
              src={article.coverImageUrl}
              alt={article.title}
              className="aspect-[16/8] w-full rounded-[2rem] object-cover"
            />
          </div>
        ) : null}

        <div className="mx-auto max-w-3xl px-5 py-16 lg:px-8 lg:py-20">
          <div className="whitespace-pre-line text-[1.05rem] leading-9 text-slate-700">
            {article.content}
          </div>
        </div>
      </article>

      <section className="bg-brand-ink py-16 text-white">
        <div className="mx-auto flex max-w-4xl flex-col gap-6 px-5 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.18em] text-brand-gold-soft">
              Masih ada pertanyaan?
            </p>
            <h2 className="mt-2 text-3xl font-black tracking-[-0.05em]">
              Diskusikan kondisi bisnismu.
            </h2>
          </div>
          <a
            href={consultationHref}
            target={whatsappHref ? "_blank" : undefined}
            rel={whatsappHref ? "noreferrer" : undefined}
            className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-black text-brand-ink"
          >
            Konsultasi <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </section>
    </main>
  );
}
