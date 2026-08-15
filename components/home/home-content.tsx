import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { getWhatsAppHref } from "@/lib/contact";
import type { Article, Faq, SiteSettings } from "@/types";
import { CmsImage } from "@/components/shared/cms-image";
import { BrandMark } from "@/components/shared/brand-mark";

export function HomeContent({ articles, faqs, settings }: { articles: Article[]; faqs: Faq[]; settings: SiteSettings }) {
  const whatsappHref = getWhatsAppHref(settings.whatsapp, "Halo Yuk Jadi Legal, saya ingin konsultasi mengenai legalitas bisnis.");
  const consultationHref = whatsappHref || "/kontak";
  const consultationExternal = Boolean(whatsappHref);
  const visibleArticles = articles.slice(0, 3);

  return (
    <>
      {visibleArticles.length ? (
        <section className="insight-v71 border-b border-brand-navy/8 py-20 lg:py-24">
          <div className="page-shell">
            <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <h2 className="section-title">Insight</h2>
              <Link href="/artikel" className="inline-flex items-center gap-2 text-sm font-semibold text-brand-navy hover:text-brand-gold-dark">
                Lihat semua artikel <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="mt-9 grid gap-4 md:grid-cols-3">
              {visibleArticles.map((article, index) => (
                <Link key={article.id} href={`/artikel/${article.slug}`} className={`article-card-v71 group overflow-hidden rounded-[20px] border ${index === 1 ? "border-brand-navy/14 bg-brand-bluewash/45" : "border-brand-navy/12 bg-white"}`}>
                  <div className="relative aspect-[16/9] overflow-hidden bg-brand-bluewash">
                    {article.coverImageUrl ? (
                      <CmsImage src={article.coverImageUrl} alt={article.title} className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.035]" />
                    ) : (
                      <div className={`absolute inset-0 ${index === 0 ? "article-placeholder-navy" : index === 1 ? "article-placeholder-blue" : "article-placeholder-gold-v71"}`} />
                    )}
                  </div>
                  <div className="p-5">
                    <div className="flex items-center justify-between gap-3 text-[10px] text-brand-muted">
                      <span>{article.category}</span>
                      <span>{article.publishedAt || "Insight"}</span>
                    </div>
                    <h3 className="mt-3 line-clamp-2 text-lg font-semibold leading-[1.2] tracking-[-0.02em] text-brand-navy-dark">{article.title}</h3>
                    <p className="mt-3 line-clamp-2 text-xs leading-5 text-brand-muted">{article.excerpt}</p>
                    <div className="mt-5 flex items-center justify-end border-t border-brand-navy/8 pt-4">
                      <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-brand-navy">Baca artikel <ArrowUpRight className="h-3.5 w-3.5" /></span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {faqs.length ? (
        <section className="faq-v71 border-b border-brand-navy/8 py-20 lg:py-24">
          <div className="page-shell grid gap-10 lg:grid-cols-[330px_minmax(0,1fr)] lg:gap-16">
            <div>
              <h2 className="text-3xl font-semibold leading-[1.08] tracking-[-0.04em] text-brand-navy-dark sm:text-4xl">Pertanyaan umum</h2>
              <p className="mt-4 text-sm leading-7 text-brand-muted">Jawaban untuk hal yang paling sering ditanyakan sebelum memilih layanan.</p>
              <Link href="/faq" className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-brand-navy hover:text-brand-gold-dark">
                Lihat semua FAQ <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="overflow-hidden rounded-[20px] border border-brand-navy/12 bg-white shadow-[0_18px_44px_rgba(5,31,58,.06)]">
              {faqs.slice(0, 5).map((faq, index) => (
                <details key={faq.id} className="group border-b border-brand-navy/8 last:border-b-0 open:bg-brand-bluewash/45">
                  <summary className="grid cursor-pointer list-none grid-cols-[28px_minmax(0,1fr)_30px] items-center gap-3 px-5 py-5 sm:px-6">
                    <span className="text-[10px] font-semibold text-brand-gold-dark">0{index + 1}</span>
                    <span className="text-sm font-semibold leading-6 text-brand-navy-dark">{faq.question}</span>
                    <span className="grid h-7 w-7 place-items-center rounded-full border border-brand-navy/12 text-brand-navy transition group-open:rotate-45 group-open:border-brand-gold group-open:bg-brand-gold">+</span>
                  </summary>
                  <p className="px-[66px] pb-5 text-sm leading-7 text-brand-muted">{faq.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <section className="bg-brand-surface py-14 lg:py-16">
        <div className="page-shell">
          <div className="cta-v71 relative overflow-hidden rounded-[22px] px-6 py-9 text-white sm:px-9 lg:grid lg:grid-cols-[1fr_auto] lg:items-center lg:gap-10 lg:px-11">
            <div className="absolute right-8 top-1/2 hidden -translate-y-1/2 opacity-[0.08] lg:block"><BrandMark frameClassName="h-32 w-32 rounded-[24px]" /></div>
            <div className="relative">
              <h2 className="text-2xl font-semibold tracking-[-0.035em] sm:text-3xl">{settings.ctaTitle}</h2>
              <p className="mt-2 text-sm text-slate-300">{settings.ctaDescription}</p>
            </div>
            <div className="relative mt-6 flex flex-wrap gap-3 lg:mr-36 lg:mt-0">
              <a href={consultationHref} target={consultationExternal ? "_blank" : undefined} rel={consultationExternal ? "noreferrer" : undefined} className="button-gold inline-flex items-center gap-2 px-5 py-3 text-sm font-semibold">
                Konsultasi sekarang <ArrowRight className="h-4 w-4" />
              </a>
              <Link href="/layanan" className="inline-flex items-center gap-2 rounded-[12px] border border-white/25 px-5 py-3 text-sm font-semibold text-white transition hover:border-brand-gold/60 hover:bg-white/5">Lihat layanan</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
