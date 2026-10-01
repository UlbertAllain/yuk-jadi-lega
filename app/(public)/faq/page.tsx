import { createPageMetadata } from "@/lib/seo";
import { ArrowUpRight, MessageCircleQuestion } from "lucide-react";
import { PublicPageHero } from "@/components/site/public-page-hero";
import { getWhatsAppHref } from "@/lib/contact";
import { getFaqs, getSiteSettings } from "@/lib/data";

export const metadata = createPageMetadata({
  title: "FAQ",
  description: "Temukan jawaban atas pertanyaan umum seputar layanan dan proses legalitas bisnis di Yuk Jadi Legal.",
  path: "/faq",
});

export default async function FaqPage() {
  const [faqs, settings] = await Promise.all([getFaqs(), getSiteSettings()]);
  const message = "Halo Yuk Jadi Legal, saya punya pertanyaan mengenai legalitas bisnis.";
  const whatsappHref = getWhatsAppHref(settings.whatsapp, message);
  const consultationHref = whatsappHref || "/kontak";

  return (
    <main className="bg-brand-surface">
      <PublicPageHero
        title="Jawaban untuk pertanyaan yang paling sering muncul."
        description="Temukan jawaban singkat tentang konsultasi, dokumen, waktu pengerjaan, dan layanan yang paling sering ditanyakan."
        meta={
          <p className="text-xs font-semibold text-brand-muted">
            <strong className="text-brand-ink">{faqs.length}</strong> pertanyaan tersedia
          </p>
        }
      />

      <section className="page-shell py-8 sm:py-10 lg:py-14">
        <div className="grid gap-6 lg:grid-cols-[280px_minmax(0,1fr)] lg:gap-10">
          <aside>
            <div className="rounded-[14px] border border-brand-navy/10 bg-white p-4 lg:sticky lg:top-28 lg:p-5">
              <MessageCircleQuestion className="h-5 w-5 text-brand-gold-dark" />
              <h2 className="mt-4 text-lg font-semibold tracking-[-0.025em] text-brand-ink lg:text-xl">
                Tidak menemukan jawaban yang pas?
              </h2>
              <p className="mt-2 text-sm leading-6 text-brand-muted">
                Kondisi setiap bisnis bisa berbeda. Ceritakan detailnya agar tim bisa memberi arahan yang lebih sesuai.
              </p>
              <a
                href={consultationHref}
                target={whatsappHref ? "_blank" : undefined}
                rel={whatsappHref ? "noreferrer" : undefined}
                className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-brand-navy hover:text-brand-gold-dark"
              >
                Kirim pertanyaan <ArrowUpRight className="h-4 w-4" />
              </a>
            </div>
          </aside>

          <div className="divide-y divide-brand-navy/10 border-y border-brand-navy/12">
            {faqs.map((faq) => (
              <details key={faq.id} className="group">
                <summary className="grid cursor-pointer list-none grid-cols-[minmax(0,1fr)_24px] items-center gap-4 py-4 sm:py-5">
                  <span className="text-[15px] font-semibold leading-6 text-brand-ink sm:text-base">{faq.question}</span>
                  <span className="text-xl leading-none text-brand-navy transition group-open:rotate-45">+</span>
                </summary>
                <p className="max-w-3xl pb-4 pr-6 text-sm leading-7 text-brand-muted sm:pb-5">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
