import { createPageMetadata } from "@/lib/seo";
import { ArrowRight, Check, FileCheck2, MessageSquareText, RefreshCw, Route } from "lucide-react";
import { PublicPageHero } from "@/components/site/public-page-hero";
import { getWhatsAppHref } from "@/lib/contact";
import { getSiteSettings } from "@/lib/data";

export const metadata = createPageMetadata({
  title: "Cara Kerja",
  description: "Alur konsultasi dan pengurusan layanan Yuk Jadi Legal dari awal sampai selesai.",
  path: "/cara-kerja",
});

const steps = [
  [MessageSquareText, "Ceritakan kebutuhan", "Mulai dari kondisi bisnis dan masalah yang ingin diselesaikan."],
  [Route, "Pemetaan & checklist", "Tim memetakan scope, kebutuhan dokumen, biaya, dan estimasi."],
  [RefreshCw, "Proses & update", "Pekerjaan berjalan sesuai scope dan update diberikan di tahap yang relevan."],
  [FileCheck2, "Serah terima", "Hasil diserahkan dan kebutuhan lanjutan dijelaskan jika memang ada."],
] as const;

const notes = [
  "Estimasi dapat berbeda karena jenis layanan dan respons instansi terkait.",
  "Persyaratan final menyesuaikan kondisi badan usaha dan aktivitas bisnis.",
  "Biaya di luar scope awal perlu dikomunikasikan sebelum dilanjutkan.",
] as const;

export default async function HowItWorksPage() {
  const settings = await getSiteSettings();
  const whatsappHref = getWhatsAppHref(settings.whatsapp, "Halo Yuk Jadi Legal, saya ingin mulai konsultasi legalitas bisnis.");
  const consultationHref = whatsappHref || "/kontak";

  return (
    <main className="bg-brand-surface">
      <PublicPageHero
        eyebrow="Cara kerja"
        title="Alur yang jelas dari konsultasi sampai selesai."
        description="Kamu tahu apa yang perlu disiapkan, apa yang sedang diproses, dan kapan perlu mengambil tindakan berikutnya."
      />

      <section className="page-shell py-14 lg:py-20">
        <div className="grid gap-4 md:grid-cols-2">
          {steps.map(([Icon, title, description], index) => (
            <article key={title} className="card-premium card-accent-top rounded-[24px] p-6 sm:p-7">
              <div className="flex items-start justify-between gap-5">
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-brand-navy text-white"><Icon className="h-5 w-5" /></span>
                <span className="text-4xl font-semibold tracking-[-0.07em] text-brand-navy/10">0{index + 1}</span>
              </div>
              <h2 className="mt-8 text-2xl font-semibold tracking-[-0.035em] text-brand-ink">{title}</h2>
              <p className="mt-3 max-w-xl text-sm font-normal leading-7 text-brand-muted">{description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="border-y border-brand-navy/9 bg-white py-14 lg:py-20">
        <div className="page-shell grid gap-8 lg:grid-cols-[360px_minmax(0,1fr)] lg:gap-14">
          <div>
            <p className="section-kicker">Perlu diketahui</p>
            <h2 className="mt-4 text-3xl font-semibold tracking-[-0.04em] text-brand-ink">Detail alur dapat berbeda per layanan.</h2>
          </div>
          <div className="grid gap-3">
            {notes.map((item) => (
              <div key={item} className="flex gap-4 rounded-2xl border border-brand-navy/9 bg-brand-surface p-4 sm:p-5">
                <span className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-brand-gold/15 text-brand-gold-dark"><Check className="h-3.5 w-3.5" /></span>
                <p className="text-sm font-medium leading-7 text-brand-muted">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-brand-navy py-14 text-white lg:py-20">
        <div className="page-shell flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-brand-gold-soft">Siap mulai?</p>
            <h2 className="mt-2 max-w-2xl text-3xl font-semibold tracking-[-0.04em]">Mulai dari konsultasi, bukan menebak sendiri.</h2>
          </div>
          <a href={consultationHref} target={whatsappHref ? "_blank" : undefined} rel={whatsappHref ? "noreferrer" : undefined} className="inline-flex items-center gap-2 rounded-xl bg-brand-gold px-5 py-3 text-sm font-semibold text-brand-navy">
            Mulai konsultasi <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </section>
    </main>
  );
}
