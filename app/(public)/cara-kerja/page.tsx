import { createPageMetadata } from "@/lib/seo";
import {
  ArrowRight,
  CheckCircle2,
  FileCheck2,
  MessageCircleMore,
  SearchCheck,
} from "lucide-react";
import { PublicPageHero } from "@/components/site/public-page-hero";
import { getWhatsAppHref } from "@/lib/contact";
import { getSiteSettings } from "@/lib/data";

export const metadata = createPageMetadata({
  title: "Cara Kerja",
  description: "Pahami alur konsultasi dan pengurusan layanan Yuk Jadi Legal dari kebutuhan awal sampai hasil diserahkan.",
  path: "/cara-kerja",
});

const preparation = [
  {
    icon: MessageCircleMore,
    title: "Ceritakan kondisi usaha",
    description: "Sampaikan kondisi saat ini dan hal yang ingin Anda urus atau selesaikan.",
  },
  {
    icon: SearchCheck,
    title: "Tentukan tujuan",
    description: "Kami bantu memetakan layanan yang relevan dari tujuan bisnis Anda.",
  },
  {
    icon: FileCheck2,
    title: "Kirim yang sudah ada",
    description: "Dokumen tidak harus lengkap. Tim akan membantu mengecek kekurangannya.",
  },
] as const;

const steps = [
  {
    number: "01",
    title: "Konsultasi awal",
    description: "Kami mendengarkan kebutuhan dan kondisi usaha Anda terlebih dahulu agar tidak salah menentukan layanan.",
    result: "Gambaran awal kebutuhan yang perlu ditangani.",
  },
  {
    number: "02",
    title: "Pemetaan kebutuhan",
    description: "Tim mengecek dokumen, kebutuhan tambahan, perkiraan biaya, dan waktu pengerjaan.",
    result: "Daftar hal yang perlu disiapkan sebelum proses dimulai.",
  },
  {
    number: "03",
    title: "Pengerjaan & update",
    description: "Setelah kebutuhan disepakati, tim menjalankan proses dan memberi kabar pada tahap yang penting.",
    result: "Status proses dan tindakan berikutnya tetap jelas.",
  },
  {
    number: "04",
    title: "Serah terima",
    description: "Hasil akhir diperiksa dan diserahkan beserta penjelasan jika masih ada langkah lanjutan.",
    result: "Dokumen dan arahan penggunaan atau langkah berikutnya.",
  },
] as const;

const duringProcess = [
  ["Dokumen", "Apa yang sudah cukup dan apa yang masih perlu dilengkapi."],
  ["Biaya & waktu", "Perubahan penting dibicarakan sebelum proses dilanjutkan."],
  ["Status", "Anda tahu kapan cukup menunggu dan kapan perlu bertindak."],
] as const;

const notes = [
  "Waktu pengerjaan dapat berbeda tergantung jenis layanan dan proses instansi terkait.",
  "Kebutuhan dokumen dapat menyesuaikan bentuk badan usaha dan kondisi masing-masing klien.",
  "Kebutuhan atau biaya tambahan di luar kesepakatan awal akan dibicarakan sebelum dilanjutkan.",
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
        title="Dari konsultasi sampai selesai, Anda tahu apa yang sedang dikerjakan."
        description="Alurnya dibuat sederhana: pahami kebutuhan, siapkan yang diperlukan, ikuti progres, lalu terima hasil dengan penjelasan yang jelas."
      />

      <section className="page-shell py-9 sm:py-11 lg:py-14">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.11em] text-brand-gold-dark">Sebelum mulai</p>
          <h2 className="mt-2 text-2xl font-semibold tracking-[-0.035em] text-brand-ink sm:text-3xl">
            Tidak perlu menyiapkan semuanya sendiri.
          </h2>
          <p className="mt-3 text-sm leading-7 text-brand-muted">
            Konsultasi awal dipakai untuk mengetahui apa yang sudah siap dan apa yang masih perlu dilengkapi.
          </p>
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-3">
          {preparation.map(({ icon: Icon, title, description }) => (
            <article key={title} className="rounded-[14px] border border-brand-navy/10 bg-white p-4 sm:p-5">
              <span className="grid h-9 w-9 place-items-center rounded-full bg-brand-gold-pale text-brand-navy">
                <Icon className="h-4 w-4" />
              </span>
              <h3 className="mt-4 text-base font-semibold text-brand-ink">{title}</h3>
              <p className="mt-2 text-sm leading-6 text-brand-muted">{description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="border-y border-brand-navy/9 bg-white py-9 sm:py-11 lg:py-14">
        <div className="page-shell">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.11em] text-brand-gold-dark">Alur utama</p>
            <h2 className="mt-2 text-2xl font-semibold tracking-[-0.035em] text-brand-ink sm:text-3xl">
              Empat tahap dari awal sampai selesai.
            </h2>
          </div>

          <ol className="mt-7 grid gap-4 md:grid-cols-2">
            {steps.map((step) => (
              <li key={step.number} className="relative rounded-[16px] border border-brand-navy/10 bg-brand-surface p-5 sm:p-6">
                <div className="flex items-center gap-3">
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-brand-navy text-xs font-semibold text-white">
                    {step.number}
                  </span>
                  <h3 className="text-lg font-semibold tracking-[-0.025em] text-brand-ink">{step.title}</h3>
                </div>
                <p className="mt-4 text-sm leading-7 text-brand-muted">{step.description}</p>
                <div className="mt-4 rounded-[10px] bg-brand-gold-pale px-3.5 py-3">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-brand-gold-dark">Hasil tahap ini</p>
                  <p className="mt-1.5 text-sm leading-6 text-brand-ink">{step.result}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="bg-brand-navy-dark py-9 text-white sm:py-11 lg:py-14">
        <div className="page-shell">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.11em] text-brand-gold-soft">Selama proses</p>
            <h2 className="mt-2 text-2xl font-semibold tracking-[-0.035em] text-white sm:text-3xl">
              Tiga hal yang tetap harus jelas.
            </h2>
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            {duringProcess.map(([title, description]) => (
              <article key={title} className="rounded-[14px] border border-white/12 bg-white/[0.04] p-4 sm:p-5">
                <CheckCircle2 className="h-5 w-5 text-brand-gold-soft" />
                <h3 className="mt-4 text-base font-semibold text-white">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-300">{description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="page-shell py-9 sm:py-11 lg:py-14">
        <div className="rounded-[16px] border border-brand-navy/10 bg-white p-5 sm:p-6 lg:grid lg:grid-cols-[280px_minmax(0,1fr)] lg:gap-10">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.11em] text-brand-gold-dark">Perlu diketahui</p>
            <h2 className="mt-2 text-xl font-semibold tracking-[-0.03em] text-brand-ink sm:text-2xl">
              Waktu pengerjaan bisa berbeda.
            </h2>
          </div>
          <div className="mt-5 grid gap-3 lg:mt-0">
            {notes.map((item) => (
              <div key={item} className="flex gap-3">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-gold" />
                <p className="text-sm leading-6 text-brand-muted">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-brand-navy/9 bg-brand-paper py-9 sm:py-11 lg:py-14">
        <div className="page-shell grid gap-5 sm:grid-cols-[1fr_auto] sm:items-center">
          <div>
            <h2 className="text-2xl font-semibold tracking-[-0.035em] text-brand-ink">
              Belum tahu harus mulai dari mana?
            </h2>
            <p className="mt-2 max-w-2xl text-sm leading-7 text-brand-muted">
              Ceritakan kondisi usaha Anda. Tim akan membantu menentukan langkah awal yang paling relevan.
            </p>
          </div>
          <a
            href={consultationHref}
            target={whatsappHref ? "_blank" : undefined}
            rel={whatsappHref ? "noreferrer" : undefined}
            className="button-gold inline-flex min-h-12 w-full items-center justify-center gap-2 px-5 py-3 text-sm font-semibold sm:w-auto"
          >
            Mulai konsultasi <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </section>
    </main>
  );
}
