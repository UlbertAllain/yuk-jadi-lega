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
        description="Temukan jawaban singkat tentang konsultasi, dokumen, waktu pengerjaan, dan layanan yang paling sering ditanyakan."
        meta={
          <p className="text-xs font-semibold text-brand-muted">
            <strong className="text-brand-ink">{faqs.length}</strong> pertanyaan tersedia
          </p>
        }
      />

      <section className="page-shell grid gap-10 py-14 lg:grid-cols-[280px_minmax(0,1fr)] lg:gap-14 lg:py-20">
        <aside>
          <div className="sticky top-28 border-y border-brand-navy/12 py-5">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-brand-gold-dark">
              Butuh jawaban spesifik?
            </p>
            <h2 className="mt-4 text-2xl font-semibold leading-[1.1] tracking-[-0.035em] text-brand-ink">
              Kondisi setiap bisnis bisa berbeda.
            </h2>
            <p className="mt-3 text-sm leading-7 text-brand-muted">
              Kalau kondisi bisnis Anda tidak sama dengan contoh di sini, ceritakan detailnya agar tim bisa memberi
              arahan yang lebih sesuai.
            </p>
            <a
              href={consultationHref}
              target={whatsappHref ? "_blank" : undefined}
              rel={whatsappHref ? "noreferrer" : undefined}
              className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-brand-navy hover:text-brand-gold-dark"
            >
              Kirim pertanyaan <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
        </aside>

        <div className="border-y border-brand-navy/14">
          {faqs.map((faq, index) => (
            <details key={faq.id} className="group border-b border-brand-navy/9 last:border-b-0">
              <summary className="grid cursor-pointer list-none grid-cols-[34px_minmax(0,1fr)_24px] items-center gap-3 py-5">
                <span className="text-[10px] font-semibold text-brand-gold-dark">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="text-base font-semibold leading-6 text-brand-ink">{faq.question}</span>
                <span className="text-xl leading-none text-brand-navy transition group-open:rotate-45">+</span>
              </summary>
              <p className="pb-5 pl-[47px] pr-8 text-sm leading-7 text-brand-muted">{faq.answer}</p>
            </details>
          ))}
        </div>
      </section>
    </main>
  );
}
