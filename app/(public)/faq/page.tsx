import type { Metadata } from "next";
import { getWhatsAppHref } from "@/lib/contact";
import { getFaqs, getSiteSettings } from "@/lib/data";

export const metadata: Metadata = {
  title: "FAQ",
  description: "Pertanyaan umum seputar layanan dan konsultasi Yuk Jadi Legal.",
};

export default async function FaqPage() {
  const [faqs, settings] = await Promise.all([getFaqs(), getSiteSettings()]);
  const message = "Halo Yuk Jadi Legal, saya punya pertanyaan mengenai legalitas bisnis.";
  const whatsappHref = getWhatsAppHref(settings.whatsapp, message);
  const consultationHref = whatsappHref || "/kontak";

  return (
    <main>
      <section className="bg-brand-ink text-white">
        <div className="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-28">
          <p className="text-xs font-black uppercase tracking-[0.22em] text-brand-gold-soft">
            FAQ
          </p>
          <h1 className="mt-5 max-w-4xl text-5xl font-black tracking-[-0.06em] sm:text-6xl lg:text-7xl">
            Pertanyaan sebelum kamu mulai.
          </h1>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-14 px-5 py-20 lg:grid-cols-[.55fr_1fr] lg:px-8 lg:py-28">
        <div>
          <h2 className="text-3xl font-black tracking-[-0.05em] text-slate-950">
            Belum menemukan jawaban?
          </h2>
          <p className="mt-4 text-sm leading-7 text-slate-600">
            Kondisi setiap bisnis bisa berbeda. Konsultasikan pertanyaan yang lebih spesifik agar kami bisa memahami konteksnya.
          </p>
          <a
            href={consultationHref}
            target={whatsappHref ? "_blank" : undefined}
            rel={whatsappHref ? "noreferrer" : undefined}
            className="mt-6 inline-flex rounded-full bg-brand-green px-5 py-3 text-sm font-black text-white"
          >
            Kirim Pertanyaan
          </a>
        </div>

        <div className="divide-y divide-slate-200 border-y border-slate-200">
          {faqs.map((faq, index) => (
            <details key={faq.id} className="group py-6">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-5 text-lg font-black tracking-[-0.025em] text-slate-950">
                <span>
                  <span className="mr-4 text-xs text-brand-gold">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  {faq.question}
                </span>
                <span className="text-xl text-slate-400 transition group-open:rotate-45">
                  +
                </span>
              </summary>
              <p className="max-w-3xl pb-2 pl-9 pt-4 text-sm leading-7 text-slate-600">
                {faq.answer}
              </p>
            </details>
          ))}
        </div>
      </section>
    </main>
  );
}
