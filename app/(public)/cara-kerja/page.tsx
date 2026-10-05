import { ArrowRight, CircleDollarSign, FileCheck2, FileSearch2, MessageSquareMore, Settings2 } from "lucide-react";
import { createPageMetadata } from "@/lib/seo";
import { getWhatsAppHref } from "@/lib/contact";
import { getSiteSettings } from "@/lib/data";

export const metadata = createPageMetadata({
  title: "Cara Kerja",
  description: "Pahami alur konsultasi dan pengurusan layanan Yuk Jadi Legal dari kebutuhan awal sampai hasil diserahkan.",
  path: "/cara-kerja",
});

const steps = [
  {
    icon: MessageSquareMore,
    title: "Ceritakan kebutuhan",
    description: "Sampaikan rencana atau kondisi bisnis Anda melalui konsultasi.",
    result: "Kami memahami kebutuhan Anda dan memberikan arahan awal.",
  },
  {
    icon: FileSearch2,
    title: "Kami petakan",
    description: "Tim menganalisis kebutuhan Anda dan menentukan langkah yang tepat.",
    result: "Anda mendapat gambaran proses, dokumen, estimasi waktu, dan biaya.",
  },
  {
    icon: Settings2,
    title: "Proses berjalan",
    description: "Kami menjalankan proses sesuai ruang lingkup dan regulasi yang berlaku.",
    result: "Pengurusan dijalankan tim dan Anda tetap mendapat kabar pada tahap penting.",
  },
  {
    icon: FileCheck2,
    title: "Hasil diserahkan",
    description: "Hasil akhir diperiksa lalu diserahkan beserta arahan berikutnya.",
    result: "Anda menerima dokumen atau hasil layanan yang sudah siap digunakan.",
  },
] as const;

const clarity = [
  { icon: FileCheck2, title: "Dokumen", description: "Kami informasikan dokumen yang diperlukan di setiap tahap." },
  { icon: CircleDollarSign, title: "Biaya & waktu", description: "Estimasi dibahas sejak awal dengan perkiraan waktu yang realistis." },
  { icon: MessageSquareMore, title: "Update proses", description: "Perkembangan penting disampaikan sesuai tahapannya." },
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
      <section className="border-b border-brand-navy/8 bg-white">
        <div className="page-shell py-10 sm:py-14 lg:py-16">
          <div className="grid gap-8 lg:grid-cols-12 lg:items-end lg:gap-x-14">
            <div className="motion-reveal lg:col-span-7">
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-brand-gold-dark">
                Cara kerja
              </p>
              <h1 className="mt-4 max-w-[740px] text-[clamp(2.5rem,7vw,4.2rem)] font-bold leading-[1.01] tracking-[-0.04em] text-brand-ink lg:text-[3.9rem]">
                Proses legalitas yang jelas dari awal sampai selesai.
              </h1>
            </div>

            <div className="motion-reveal lg:col-span-5 lg:pb-1" style={{ animationDelay: "70ms" }}>
              <p className="text-[15px] leading-7 text-brand-muted sm:text-base sm:leading-8">
                Kami jelaskan apa yang dibutuhkan, apa yang sedang dikerjakan, dan apa hasil akhirnya. Anda tetap tahu arah prosesnya.
              </p>
              <a
                href={consultationHref}
                target={whatsappHref ? "_blank" : undefined}
                rel={whatsappHref ? "noreferrer" : undefined}
                className="group mt-5 inline-flex min-h-12 items-center justify-center gap-2 rounded-[9px] bg-brand-navy px-5 py-3 text-sm font-semibold text-white transition hover:bg-brand-navy-dark"
              >
                Mulai konsultasi
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
            </div>
          </div>

          <div className="process-grid mt-9 border-t border-brand-navy/10 pt-6 lg:mt-11">
            {steps.map(({ icon: Icon, title }, index) => (
              <div
                key={title}
                className="motion-reveal process-step"
                style={{ animationDelay: String(index * 55) + "ms" }}
              >
                <span className="process-step-icon">
                  <Icon className="h-4.5 w-4.5" />
                </span>
                <p className="mt-3 text-sm font-semibold text-brand-ink">{title}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="page-shell py-9 sm:py-11 lg:py-14">
        <div className="grid gap-6 border-b border-brand-navy/10 pb-9 lg:grid-cols-12 lg:gap-x-12 lg:pb-12">
          <div className="lg:col-span-4">
            <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-brand-gold-dark">Sebelum mulai</p>
            <h2 className="mt-2 text-[2rem] font-bold leading-[1.05] tracking-[-0.03em] text-brand-ink sm:text-[2.35rem]">
              Cukup ceritakan kondisi bisnis Anda saat ini.
            </h2>
          </div>
          <div className="lg:col-span-8">
            <p className="max-w-2xl text-sm leading-7 text-brand-muted">
              Sampaikan jenis usaha, rencana Anda, dan kebutuhan legalitas yang sedang dibutuhkan. Tim kami akan membantu memetakan langkah terbaik sebelum proses dimulai.
            </p>
          </div>
        </div>
      </section>

      <section className="page-shell pb-10 sm:pb-12 lg:pb-16">
        <div className="max-w-3xl">
          <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-brand-gold-dark">Langkah kerja kami</p>
          <h2 className="mt-2 text-[2rem] font-bold leading-[1.05] tracking-[-0.03em] text-brand-ink sm:text-[2.45rem]">
            Empat tahap, satu alur yang mudah dipahami.
          </h2>
        </div>

        <div className="mt-8 divide-y divide-brand-navy/10 border-y border-brand-navy/10">
          {steps.map(({ icon: Icon, title, description, result }, index) => (
            <article
              key={title}
              className="motion-reveal grid gap-4 py-6 lg:grid-cols-[52px_220px_minmax(0,1fr)] lg:items-start lg:gap-6"
              style={{ animationDelay: String(index * 55) + "ms" }}
            >
              <span className="grid h-10 w-10 place-items-center rounded-full bg-brand-gold-pale text-brand-navy">
                <Icon className="h-4.5 w-4.5" />
              </span>
              <div>
                <h3 className="text-base font-bold leading-tight text-brand-ink">{title}</h3>
                <p className="mt-1 text-sm leading-6 text-brand-muted">{description}</p>
              </div>
              <div className="lg:border-l lg:border-brand-navy/10 lg:pl-6">
                <p className="text-[10px] font-semibold uppercase tracking-[0.1em] text-brand-gold-dark">Hasil tahap ini</p>
                <p className="mt-1.5 text-sm leading-6 text-brand-ink">{result}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="border-y border-brand-navy/8 bg-white py-10 sm:py-12 lg:py-14">
        <div className="page-shell">
          <div className="max-w-3xl">
            <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-brand-gold-dark">Selama proses</p>
            <h2 className="mt-2 text-[2rem] font-bold leading-[1.05] tracking-[-0.03em] text-brand-ink sm:text-[2.35rem]">
              Informasi penting tetap transparan.
            </h2>
          </div>
          <div className="mt-7 grid gap-5 border-t border-brand-navy/10 pt-6 lg:grid-cols-3 lg:gap-8">
            {clarity.map(({ icon: Icon, title, description }, index) => (
              <article
                key={title}
                className="motion-reveal"
                style={{ animationDelay: String(index * 60) + "ms" }}
              >
                <span className="grid h-9 w-9 place-items-center rounded-full bg-brand-gold-pale text-brand-gold-dark">
                  <Icon className="h-4.5 w-4.5" />
                </span>
                <h3 className="mt-4 text-base font-bold text-brand-ink">{title}</h3>
                <p className="mt-1.5 text-sm leading-6 text-brand-muted">{description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-brand-navy/8 bg-brand-paper py-10 sm:py-12">
        <div className="page-shell grid gap-5 sm:grid-cols-[1fr_auto] sm:items-center lg:grid-cols-12 lg:gap-x-10 xl:gap-x-12">
          <div className="lg:col-span-8">
            <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-brand-gold-dark">Siap mulai?</p>
            <h2 className="mt-2 max-w-xl text-[2rem] font-bold leading-[1.05] text-brand-ink sm:text-[2.3rem]">
              Konsultasikan kebutuhan Anda sekarang.
            </h2>
          </div>
          <a
            href={consultationHref}
            target={whatsappHref ? "_blank" : undefined}
            rel={whatsappHref ? "noreferrer" : undefined}
            className="group inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-[9px] bg-brand-navy px-5 py-3 text-sm font-semibold text-white transition hover:bg-brand-navy-dark sm:w-auto lg:col-span-4 lg:justify-self-end"
          >
            Mulai konsultasi
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </a>
        </div>
      </section>
    </main>
  );
}
