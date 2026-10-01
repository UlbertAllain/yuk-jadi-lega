import Image from "next/image";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { createPageMetadata } from "@/lib/seo";
import { PublicPageHero } from "@/components/site/public-page-hero";
import { getWhatsAppHref } from "@/lib/contact";
import { getSiteSettings } from "@/lib/data";

export const metadata = createPageMetadata({
  title: "Cara Kerja",
  description: "Pahami alur konsultasi dan pengurusan layanan Yuk Jadi Legal dari kebutuhan awal sampai hasil diserahkan.",
  path: "/cara-kerja",
});

const steps = [
  {
    number: "01",
    title: "Ceritakan kebutuhan",
    description: "Sampaikan kondisi usaha, tujuan, dan kendala yang sedang Anda hadapi.",
    result: "Kami memahami konteks bisnis sebelum menentukan layanan.",
  },
  {
    number: "02",
    title: "Kami petakan kebutuhan",
    description: "Tim mengecek dokumen yang sudah ada, kebutuhan tambahan, biaya, dan estimasi pengerjaan.",
    result: "Anda tahu apa yang perlu disiapkan dan apa yang akan dikerjakan.",
  },
  {
    number: "03",
    title: "Proses berjalan",
    description: "Pekerjaan dimulai setelah ruang lingkup disepakati. Update diberikan pada tahap yang memang penting.",
    result: "Anda tidak perlu menebak posisi proses.",
  },
  {
    number: "04",
    title: "Hasil diserahkan",
    description: "Dokumen atau hasil akhir diperiksa sebelum diserahkan beserta arahan lanjutan bila diperlukan.",
    result: "Anda menerima hasil dengan konteks penggunaannya.",
  },
] as const;

const clarity = [
  "Dokumen apa yang masih perlu dilengkapi",
  "Perkiraan biaya dan waktu pengerjaan",
  "Status proses dan tindakan berikutnya",
] as const;

export default async function HowItWorksPage() {
  const settings = await getSiteSettings();
  const whatsappHref = getWhatsAppHref(
    settings.whatsapp,
    "Halo Yuk Jadi Legal, saya ingin mulai konsultasi legalitas bisnis.",
  );
  const consultationHref = whatsappHref || "/kontak";

  return (
    <main className="bg-brand-surface">
      <PublicPageHero
        title="Dari konsultasi sampai selesai, alurnya dibuat tetap jelas."
        description="Anda tidak perlu datang dengan semua jawaban. Kami mulai dari kondisi usaha Anda, lalu memetakan kebutuhan dan langkah berikutnya."
      />

      <section className="page-shell py-8 sm:py-10 lg:py-14">
        <div className="grid gap-7 lg:grid-cols-[.95fr_1.05fr] lg:items-center lg:gap-12">
          <div className="relative overflow-hidden rounded-[18px] border border-brand-navy/10 bg-white">
            <div className="relative aspect-[16/10] sm:aspect-[16/8] lg:aspect-[4/3]">
              <Image src="/visuals/process-consult.svg" alt="" fill className="object-cover" />
            </div>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.1em] text-brand-gold-dark">
              Sebelum proses dimulai
            </p>
            <h2 className="mt-2 text-2xl font-semibold leading-[1.1] tracking-[-0.035em] text-brand-ink sm:text-3xl">
              Mulai dari cerita, bukan dari formulir yang rumit.
            </h2>
            <p className="mt-4 text-sm leading-7 text-brand-muted sm:text-[15px]">
              Cukup ceritakan apa yang sedang terjadi pada bisnis Anda. Dokumen yang sudah ada bisa dikirim terlebih dahulu, lalu tim membantu mengecek apa yang masih kurang.
            </p>

            <div className="mt-5 grid gap-2.5">
              {clarity.map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand-gold-dark" />
                  <p className="text-sm leading-6 text-brand-ink">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-brand-navy/9 bg-white py-8 sm:py-10 lg:py-14">
        <div className="page-shell grid gap-8 lg:grid-cols-[300px_minmax(0,1fr)] lg:gap-12">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.1em] text-brand-gold-dark">
              Alur utama
            </p>
            <h2 className="mt-2 text-2xl font-semibold tracking-[-0.035em] text-brand-ink sm:text-3xl">
              Empat tahap yang mudah diikuti.
            </h2>
            <p className="mt-3 text-sm leading-7 text-brand-muted">
              Detail setiap layanan bisa berbeda, tetapi cara kerjanya tetap mengikuti alur yang sama.
            </p>
          </div>

          <ol className="relative border-l border-brand-navy/15 pl-6 sm:pl-8">
            {steps.map((step) => (
              <li key={step.number} className="relative pb-8 last:pb-0">
                <span className="absolute -left-[2.35rem] top-0 grid h-8 w-8 place-items-center rounded-full border-4 border-white bg-brand-navy text-[10px] font-semibold text-white sm:-left-[2.55rem]">
                  {step.number}
                </span>
                <div className="grid gap-3 sm:grid-cols-[1fr_.9fr] sm:gap-8">
                  <div>
                    <h3 className="text-lg font-semibold tracking-[-0.025em] text-brand-ink">
                      {step.title}
                    </h3>
                    <p className="mt-2 text-sm leading-7 text-brand-muted">{step.description}</p>
                  </div>
                  <div className="rounded-[12px] bg-brand-paper px-4 py-3">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-brand-gold-dark">
                      Hasil tahap ini
                    </p>
                    <p className="mt-1.5 text-sm leading-6 text-brand-ink">{step.result}</p>
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="page-shell py-8 sm:py-10 lg:py-14">
        <div className="grid gap-6 rounded-[18px] bg-brand-navy-dark p-5 text-white sm:p-7 lg:grid-cols-[.8fr_1.2fr] lg:items-center lg:p-9">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.1em] text-brand-gold-soft">
              Setelah proses berjalan
            </p>
            <h2 className="mt-2 text-2xl font-semibold tracking-[-0.035em] sm:text-3xl">
              Anda tetap tahu apa yang sedang terjadi.
            </h2>
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            {clarity.map((item, index) => (
              <div key={item} className="border-t border-white/15 pt-3">
                <span className="text-[10px] font-semibold text-brand-gold-soft">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <p className="mt-2 text-sm leading-6 text-slate-200">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-brand-navy/9 bg-brand-paper py-8 sm:py-10 lg:py-12">
        <div className="page-shell grid gap-5 sm:grid-cols-[1fr_auto] sm:items-center">
          <div>
            <h2 className="text-2xl font-semibold tracking-[-0.035em] text-brand-ink">
              Belum tahu harus mulai dari mana?
            </h2>
            <p className="mt-2 max-w-2xl text-sm leading-7 text-brand-muted">
              Ceritakan kondisi usaha Anda terlebih dahulu. Tim akan membantu menentukan langkah awal yang relevan.
            </p>
          </div>
          <a
            href={consultationHref}
            target={whatsappHref ? "_blank" : undefined}
            rel={whatsappHref ? "noreferrer" : undefined}
            className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-[10px] bg-brand-navy px-5 py-3 text-sm font-semibold text-white transition hover:bg-brand-navy-dark sm:w-auto"
          >
            Mulai konsultasi <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </section>
    </main>
  );
}
