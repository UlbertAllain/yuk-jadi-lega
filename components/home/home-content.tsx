import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { LeadForm } from "@/components/site/lead-form";
import { SectionHeading } from "@/components/site/section-heading";
import type { Article, Faq, Service } from "@/types";
import { CmsImage } from "@/components/shared/cms-image";

export function HomeContent({
  articles,
  faqs,
  services,
}: {
  articles: Article[];
  faqs: Faq[];
  services: Service[];
}) {
  const serviceOptions = services.map(({ id, title, slug }) => ({
    id,
    title,
    slug,
  }));

  return (
    <>
      {articles.length ? (
        <section className="mx-auto max-w-7xl px-5 py-24 lg:px-8 lg:py-32">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <SectionHeading
              eyebrow="Legal insight"
              title="Paham dulu. Baru ambil keputusan."
              description="Konten edukasi membantu calon klien memahami hal-hal dasar sebelum masuk ke konsultasi."
            />
            <Link
              href="/artikel"
              className="inline-flex items-center gap-2 text-sm font-black text-brand-green"
            >
              Semua artikel <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="mt-12 grid gap-5 lg:grid-cols-3">
            {articles.slice(0, 3).map((article, index) => (
              <Link
                key={article.id}
                href={`/artikel/${article.slug}`}
                className="group overflow-hidden rounded-[2rem] border border-slate-200 bg-white"
              >
                <div className="flex aspect-[16/9] items-end overflow-hidden bg-gradient-to-br from-slate-100 to-brand-sand p-6">
                  {article.coverImageUrl ? (
                    <CmsImage
                      src={article.coverImageUrl}
                      alt={article.title}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <span className="text-5xl font-black tracking-[-0.08em] text-slate-900/10">
                      0{index + 1}
                    </span>
                  )}
                </div>
                <div className="p-7">
                  <p className="text-xs font-black uppercase tracking-[0.16em] text-brand-gold">
                    {article.category}
                  </p>
                  <h3 className="mt-3 text-2xl font-black tracking-[-0.045em] text-slate-950 transition group-hover:text-brand-green">
                    {article.title}
                  </h3>
                  <p className="mt-4 text-sm leading-7 text-slate-600">{article.excerpt}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      ) : null}

      {faqs.length ? (
        <section className="bg-brand-ink py-24 text-white lg:py-32">
          <div className="mx-auto grid max-w-7xl gap-14 px-5 lg:grid-cols-[.8fr_1.2fr] lg:px-8">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.22em] text-brand-gold-soft">
                FAQ
              </p>
              <h2 className="mt-4 text-4xl font-black tracking-[-0.055em] sm:text-5xl">
                Pertanyaan yang biasanya muncul sebelum mulai.
              </h2>
              <Link
                href="/faq"
                className="mt-7 inline-flex items-center gap-2 text-sm font-black text-brand-gold-soft"
              >
                Lihat semua FAQ <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="divide-y divide-white/10 border-y border-white/10">
              {faqs.slice(0, 5).map((faq, index) => (
                <details key={faq.id} className="group py-5">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-5 font-bold">
                    <span>
                      <span className="mr-4 text-sm text-brand-gold-soft">0{index + 1}</span>
                      {faq.question}
                    </span>
                    <span className="text-xl text-slate-400 transition group-open:rotate-45">+</span>
                  </summary>
                  <p className="max-w-2xl pb-2 pl-10 pt-4 text-sm leading-7 text-slate-300">
                    {faq.answer}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <section className="bg-brand-paper py-24 lg:py-32">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 lg:grid-cols-[.8fr_1.2fr] lg:px-8">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.22em] text-brand-gold">
              Mulai konsultasi
            </p>
            <h2 className="mt-4 text-4xl font-black tracking-[-0.055em] text-slate-950 sm:text-5xl">
              Masih bingung harus mulai dari mana?
            </h2>
            <p className="mt-5 max-w-lg text-base leading-8 text-slate-600">
              Ceritakan kondisi bisnismu. Tim Yuk Jadi Legal akan membantu memahami kebutuhan awal sebelum proses dimulai.
            </p>
          </div>
          <LeadForm services={serviceOptions} />
        </div>
      </section>
    </>
  );
}
