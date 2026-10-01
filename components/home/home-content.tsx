import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { getWhatsAppHref } from "@/lib/contact";
import type { Article, Faq, SiteSettings } from "@/types";
import { CmsImage } from "@/components/shared/cms-image";

export function HomeContent({
  articles,
  faqs,
  settings,
}: {
  articles: Article[];
  faqs: Faq[];
  settings: SiteSettings;
}) {
  const whatsappHref = getWhatsAppHref(
    settings.whatsapp,
    "Halo Yuk Jadi Legal, saya ingin konsultasi mengenai legalitas bisnis.",
  );
  const consultationHref = whatsappHref || "/kontak";
  const consultationExternal = Boolean(whatsappHref);
  const visibleArticles = articles.slice(0, 3);
  const [featuredArticle, ...otherArticles] = visibleArticles;

  return (
    <>
      {featuredArticle ? (
        <section className="border-b border-brand-navy/8 bg-brand-surface py-10 sm:py-12 lg:py-16">
          <div className="page-shell lg:grid lg:grid-cols-12 lg:gap-x-10 xl:gap-x-12">
            <div className="lg:col-span-4">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-brand-gold-dark">
                  Insight
                </p>
                <h2 className="editorial-heading mt-2 max-w-xl text-[2rem] font-semibold leading-[1.04] tracking-[-0.035em] text-brand-ink sm:text-[2.6rem]">
                  Wawasan untuk langkah bisnis yang lebih pasti.
                </h2>
              </div>
              <Link href="/artikel" className="mt-4 hidden text-xs font-semibold text-brand-navy sm:inline-flex">
                Lihat semua →
              </Link>
            </div>

            <div className="mt-7 grid gap-4 lg:col-span-8 lg:mt-0">
              <Link
                href={"/artikel/" + featuredArticle.slug}
                className="motion-reveal group overflow-hidden rounded-[16px] border border-brand-navy/10 bg-white lg:grid lg:grid-cols-[1.05fr_.95fr]"
              >
                <div className="relative aspect-[16/9] overflow-hidden bg-brand-paper lg:aspect-auto lg:min-h-[250px]">
                  {featuredArticle.coverImageUrl ? (
                    <CmsImage
                      src={featuredArticle.coverImageUrl}
                      alt={featuredArticle.title}
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.025]"
                    />
                  ) : (
                    <div className="visual-service-consult absolute inset-0 bg-cover bg-center" />
                  )}
                </div>
                <div className="p-5">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.1em] text-brand-gold-dark">
                    {featuredArticle.category}
                  </p>
                  <h3 className="editorial-heading mt-2 text-xl font-semibold leading-tight text-brand-ink sm:text-2xl">
                    {featuredArticle.title}
                  </h3>
                  <p className="mt-2 line-clamp-2 text-sm leading-6 text-brand-muted">{featuredArticle.excerpt}</p>
                  <span className="mt-4 inline-flex items-center gap-2 text-xs font-semibold text-brand-navy">
                    Baca selengkapnya <ArrowUpRight className="h-3.5 w-3.5" />
                  </span>
                </div>
              </Link>

              <div className="grid gap-3 sm:grid-cols-2">
                {otherArticles.map((article, index) => (
                  <Link
                    key={article.id}
                    href={"/artikel/" + article.slug}
                    className="motion-reveal group grid grid-cols-[104px_minmax(0,1fr)] gap-3 rounded-[13px] border border-brand-navy/9 bg-white p-3 sm:grid-cols-[88px_minmax(0,1fr)]"
                    style={{ animationDelay: String((index + 1) * 70) + "ms" }}
                  >
                    <div className="relative h-[82px] overflow-hidden rounded-[9px] bg-brand-paper">
                      {article.coverImageUrl ? (
                        <CmsImage src={article.coverImageUrl} alt={article.title} className="h-full w-full object-cover" />
                      ) : (
                        <div className="visual-service-company absolute inset-0 bg-cover bg-center" />
                      )}
                    </div>
                    <div className="min-w-0 self-center">
                      <p className="text-[9px] font-semibold uppercase tracking-[0.08em] text-brand-gold-dark">
                        {article.category}
                      </p>
                      <h3 className="editorial-heading mt-1 line-clamp-2 text-[15px] font-semibold leading-[1.15] text-brand-ink">
                        {article.title}
                      </h3>
                      <span className="mt-2 inline-flex items-center gap-1 text-[10px] font-semibold text-brand-navy">
                        Baca <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>
      ) : null}

      {faqs.length ? (
        <section className="border-b border-brand-navy/8 bg-white py-10 sm:py-12 lg:py-16">
          <div className="page-shell lg:grid lg:grid-cols-12 lg:gap-x-10 xl:gap-x-12">
            <div className="lg:col-span-4">
              <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-brand-gold-dark">FAQ</p>
              <h2 className="editorial-heading mt-2 text-[2rem] font-semibold leading-[1.04] tracking-[-0.035em] text-brand-ink sm:text-[2.6rem]">
                Pertanyaan yang sering diajukan.
              </h2>
            </div>

            <div className="mt-6 grid gap-2 lg:col-span-8 lg:mt-0">
              {faqs.slice(0, 5).map((faq) => (
                <details key={faq.id} className="group rounded-[10px] border border-brand-navy/10 bg-brand-surface px-4">
                  <summary className="grid cursor-pointer list-none grid-cols-[minmax(0,1fr)_22px] items-center gap-4 py-4">
                    <span className="text-sm font-medium leading-6 text-brand-ink">{faq.question}</span>
                    <span className="text-lg text-brand-navy transition group-open:rotate-45">+</span>
                  </summary>
                  <p className="pb-4 pr-6 text-sm leading-7 text-brand-muted">{faq.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <section className="relative overflow-hidden border-t border-brand-navy/8 bg-brand-paper py-10 sm:py-12 lg:py-14">
        <div className="visual-cta-leaves pointer-events-none absolute inset-y-0 right-0 w-[150px] bg-contain bg-right-bottom bg-no-repeat opacity-90 sm:w-[220px]" />
        <div className="page-shell relative grid gap-5 sm:grid-cols-[1fr_auto] sm:items-center lg:grid-cols-12 lg:gap-x-10 xl:gap-x-12">
          <div className="max-w-2xl lg:col-span-8">
            <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-brand-gold-dark">
              Masih ada pertanyaan?
            </p>
            <h2 className="editorial-heading mt-2 text-[2rem] font-semibold leading-[1.04] tracking-[-0.035em] text-brand-ink sm:text-[2.5rem]">
              Konsultasikan sekarang, kami siap membantu.
            </h2>
            <p className="mt-2 max-w-xl text-sm leading-7 text-brand-muted">{settings.ctaDescription}</p>
          </div>
          <a
            href={consultationHref}
            target={consultationExternal ? "_blank" : undefined}
            rel={consultationExternal ? "noreferrer" : undefined}
            className="group inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-[10px] bg-brand-navy px-5 py-3 text-sm font-semibold text-white transition hover:bg-brand-navy-dark sm:w-auto lg:col-span-4 lg:justify-self-end"
          >
            Konsultasi sekarang
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </a>
        </div>
      </section>
    </>
  );
}
