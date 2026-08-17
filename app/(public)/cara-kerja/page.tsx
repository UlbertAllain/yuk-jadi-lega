import { createPageMetadata } from "@/lib/seo";
import { ArrowRight } from "lucide-react";
import { PublicPageHero } from "@/components/site/public-page-hero";
import { getWhatsAppHref } from "@/lib/contact";
import { getSiteSettings } from "@/lib/data";

export const metadata = createPageMetadata({
  title: "Cara Kerja",
  description: "Pahami alur konsultasi dan pengurusan layanan Yuk Jadi Legal dari kebutuhan awal sampai hasil diserahkan.",
  path: "/cara-kerja",
});

const preparation = [
  ["01", "Ceritakan kondisi usaha", "Sampaikan jenis usaha, kondisi saat ini, dan hal yang ingin Anda urus atau selesaikan."],
  ["02", "Sampaikan tujuan Anda", "Misalnya ingin mendirikan badan usaha, mengurus izin, mendaftarkan merek, atau menyiapkan dokumen tertentu."],
  ["03", "Kirim dokumen yang sudah ada", "Tidak perlu menyiapkan semuanya sendiri. Cukup kirim dokumen yang sudah tersedia, lalu tim akan membantu mengecek kekurangannya."],
] as const;

const steps = [
  {
    number: "01",
    title: "Konsultasi awal",
    description: "Kami mendengarkan kebutuhan dan kondisi usaha Anda terlebih dahulu agar tidak salah menentukan layanan.",
    result: "Anda mendapat gambaran awal tentang kebutuhan yang perlu ditangani.",
  },
  {
    number: "02",
    title: "Pemetaan kebutuhan",
    description: "Tim mengecek dokumen yang sudah ada, menentukan kebutuhan tambahan, serta menjelaskan perkiraan biaya dan waktu pengerjaan.",
    result: "Anda tahu apa yang perlu disiapkan sebelum proses dimulai.",
  },
  {
    number: "03",
    title: "Pengerjaan & informasi perkembangan",
    description: "Setelah kebutuhan disepakati, tim menjalankan proses dan memberi informasi pada tahap-tahap yang memang perlu Anda ketahui.",
    result: "Anda tidak perlu menebak-nebak posisi proses atau langkah berikutnya.",
  },
  {
    number: "04",
    title: "Pemeriksaan akhir & serah terima",
    description: "Hasil akhir diperiksa dan diserahkan. Jika masih ada langkah lanjutan, tim akan menjelaskannya sebelum proses ditutup.",
    result: "Anda menerima hasil beserta penjelasan tentang penggunaannya atau langkah berikutnya.",
  },
] as const;

const duringProcess = [
  ["Dokumen yang perlu disiapkan", "Tim membantu menjelaskan dokumen apa yang sudah cukup dan apa yang masih perlu dilengkapi."],
  ["Perkiraan biaya dan waktu", "Informasi awal dibicarakan sebelum proses berjalan. Jika ada perubahan, Anda akan diberi tahu terlebih dahulu."],
  ["Status dan tindakan berikutnya", "Anda akan mengetahui kapan cukup menunggu dan kapan ada informasi atau dokumen yang perlu diberikan."],
] as const;

const notes = [
  "Waktu pengerjaan dapat berbeda tergantung jenis layanan dan kecepatan proses dari instansi terkait.",
  "Kebutuhan dokumen dapat menyesuaikan bentuk badan usaha, kegiatan bisnis, dan kondisi masing-masing klien.",
  "Jika muncul kebutuhan atau biaya tambahan di luar kesepakatan awal, tim akan membicarakannya dengan Anda sebelum dilanjutkan.",
] as const;

export default async function HowItWorksPage() {
  const settings = await getSiteSettings();
  const whatsappHref = getWhatsAppHref(settings.whatsapp, "Halo Yuk Jadi Legal, saya ingin mulai konsultasi legalitas bisnis.");
  const consultationHref = whatsappHref || "/kontak";

  return (
    <main className="bg-brand-surface">
      <PublicPageHero
        title="Dari konsultasi sampai selesai, Anda tahu apa yang sedang dikerjakan."
        description="Kami menjelaskan apa yang perlu disiapkan, apa yang sedang diproses, dan kapan Anda perlu mengambil tindakan berikutnya."
      />

      <section className="page-shell py-16 lg:py-24">
        <div className="grid gap-10 lg:grid-cols-[.78fr_1.22fr] lg:gap-16">
          <div>
            <h2 className="max-w-md text-3xl font-semibold leading-[1.08] tracking-[-0.045em] text-brand-ink sm:text-4xl">Sebelum mulai, Anda tidak perlu menyiapkan semuanya sendiri.</h2>
            <p className="mt-5 max-w-md text-sm leading-7 text-brand-muted">
              Konsultasi awal justru digunakan untuk membantu mengetahui apa yang sudah siap dan apa yang masih perlu dilengkapi.
            </p>
          </div>

          <div className="divide-y divide-brand-navy/10 border-y border-brand-navy/10">
            {preparation.map(([number, title, description]) => (
              <article key={number} className="grid gap-4 py-6 sm:grid-cols-[64px_minmax(0,1fr)] sm:py-7">
                <span className="text-sm font-semibold tabular-nums text-brand-gold-dark">{number}</span>
                <div>
                  <h3 className="text-xl font-semibold tracking-[-0.025em] text-brand-ink">{title}</h3>
                  <p className="mt-2 text-sm leading-7 text-brand-muted">{description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-brand-navy/9 bg-white py-16 lg:py-24">
        <div className="page-shell">
          <div className="max-w-2xl">
            <h2 className="section-title">Bagaimana prosesnya berjalan?</h2>
            <p className="mt-4 text-sm leading-7 text-brand-muted">Setiap layanan bisa memiliki detail yang berbeda, tetapi alur kerjanya tetap mengikuti empat tahap utama berikut.</p>
          </div>

          <ol className="mt-10 divide-y divide-brand-navy/10 border-y border-brand-navy/10">
            {steps.map((step) => (
              <li key={step.number} className="grid gap-5 py-7 md:grid-cols-[76px_.9fr_1.1fr] md:items-start md:gap-8 lg:py-8">
                <span className="text-lg font-semibold tabular-nums text-brand-gold-dark">{step.number}</span>
                <div>
                  <h3 className="text-2xl font-semibold tracking-[-0.03em] text-brand-ink">{step.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-brand-muted">{step.description}</p>
                </div>
                <div className="rounded-[18px] bg-brand-cloud px-5 py-4">
                  <p className="text-xs font-semibold text-brand-navy">Yang Anda dapatkan dari tahap ini</p>
                  <p className="mt-2 text-sm leading-6 text-brand-muted">{step.result}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="bg-brand-navy py-16 text-white lg:py-20">
        <div className="page-shell grid gap-10 lg:grid-cols-[.72fr_1.28fr] lg:gap-14">
          <div>
            <h2 className="max-w-md text-3xl font-semibold leading-[1.08] tracking-[-0.04em] sm:text-4xl">Selama proses, Anda tetap tahu tiga hal penting.</h2>
            <p className="mt-4 max-w-md text-sm leading-7 text-slate-300">Kami berusaha menjaga komunikasi tetap sederhana agar Anda tidak perlu memahami istilah teknis untuk mengetahui perkembangan layanan.</p>
          </div>
          <div className="grid gap-x-8 sm:grid-cols-3">
            {duringProcess.map(([title, description], index) => (
              <article key={title} className="border-t border-white/15 py-5 sm:py-6">
                <span className="text-[10px] font-semibold text-brand-gold-soft">0{index + 1}</span>
                <h3 className="mt-3 text-lg font-semibold text-white">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-300">{description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="page-shell py-16 lg:py-20">
        <div className="grid gap-8 lg:grid-cols-[360px_minmax(0,1fr)] lg:gap-14">
          <div>
            <h2 className="text-3xl font-semibold tracking-[-0.04em] text-brand-ink">Hal yang dapat memengaruhi waktu pengerjaan.</h2>
            <p className="mt-4 text-sm leading-7 text-brand-muted">Kami akan memberi perkiraan sejak awal, tetapi beberapa hal memang bergantung pada kondisi usaha dan proses di luar tim kami.</p>
          </div>
          <div className="divide-y divide-brand-navy/10 border-y border-brand-navy/10">
            {notes.map((item, index) => (
              <div key={item} className="grid gap-3 py-5 sm:grid-cols-[46px_minmax(0,1fr)] sm:py-6">
                <span className="text-xs font-semibold text-brand-gold-dark">0{index + 1}</span>
                <p className="text-sm leading-7 text-brand-muted">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-brand-navy/9 bg-brand-paper py-14 lg:py-20">
        <div className="page-shell flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className="max-w-2xl text-3xl font-semibold tracking-[-0.04em] text-brand-ink">Belum tahu harus mulai dari mana?</h2>
            <p className="mt-2 max-w-2xl text-sm leading-7 text-brand-muted">Ceritakan kondisi usaha Anda terlebih dahulu. Tim kami akan membantu menentukan langkah awal yang paling relevan.</p>
          </div>
          <a href={consultationHref} target={whatsappHref ? "_blank" : undefined} rel={whatsappHref ? "noreferrer" : undefined} className="button-gold inline-flex shrink-0 items-center gap-2 px-5 py-3 text-sm font-semibold">
            Mulai konsultasi <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </section>
    </main>
  );
}
