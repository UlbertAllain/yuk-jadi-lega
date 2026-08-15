import { createPageMetadata } from "@/lib/seo";
import { ArrowUpRight } from "lucide-react";
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
        description="Baca hal dasar tentang konsultasi, proses, persyaratan, dan layanan sebelum menghubungi tim."
        meta={<p className="text-xs font-semibold text-brand-muted"><strong className="text-brand-ink">{faqs.length}</strong> pertanyaan tersedia</p>}
      />

      <section className="page-shell grid gap-8 py-12 lg:grid-cols-[320px_minmax(0,1fr)] lg:gap-10 lg:py-16">
        <aside>
          <div className="sticky top-28 rounded-[24px] bg-brand-navy p-6 text-white shadow-[0_22px_54px_rgba(6,23,46,.14)]">
            <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-brand-gold-soft">Butuh jawaban spesifik?</p>
            <h2 className="mt-3 text-2xl font-semibold leading-[1.1] tracking-[-0.035em]">Kondisi setiap bisnis bisa berbeda.</h2>
            <p className="mt-3 text-sm font-normal leading-7 text-slate-200">Kalau pertanyaannya sangat spesifik, konsultasikan konteksnya agar jawabannya lebih relevan.</p>
            <a href={consultationHref} target={whatsappHref ? "_blank" : undefined} rel={whatsappHref ? "noreferrer" : undefined} className="mt-6 inline-flex items-center gap-2 rounded-xl bg-brand-gold px-4 py-2.5 text-sm font-semibold text-brand-navy">
              Kirim pertanyaan <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
        </aside>

        <div className="overflow-hidden rounded-[24px] border border-brand-navy/10 bg-white shadow-[0_14px_36px_rgba(6,23,46,.05)]">
          {faqs.map((faq, index) => (
            <details key={faq.id} className="group border-b border-brand-navy/9 last:border-b-0 open:bg-brand-paper/55">
              <summary className="grid cursor-pointer list-none grid-cols-[34px_minmax(0,1fr)_36px] items-center gap-3 px-5 py-5 sm:px-6">
                <span className="text-[10px] font-semibold text-brand-gold-dark">{String(index + 1).padStart(2, "0")}</span>
                <span className="text-base font-semibold leading-6 text-brand-ink">{faq.question}</span>
                <span className="grid h-8 w-8 place-items-center rounded-full border border-brand-navy/12 bg-white text-brand-navy transition group-open:rotate-45 group-open:border-brand-gold group-open:bg-brand-gold">+</span>
              </summary>
              <p className="px-[72px] pb-5 pr-8 text-sm font-normal leading-7 text-brand-muted">{faq.answer}</p>
            </details>
          ))}
        </div>
      </section>
    </main>
  );
}
