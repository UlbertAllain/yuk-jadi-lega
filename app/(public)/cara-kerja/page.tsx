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
          <div className="grid gap-7 lg:grid-cols-12 lg:items-end lg:gap-x-12">
            <div className="motion-reveal lg:col-span-8">
              <p className="text-[11px] font-bold uppercase tracking-[0.17em] text-brand-gold-dark">
                Cara kerja
              </p>
              <h1 className="mt-4 max-w-[820px] text-[clamp(2.65rem,7vw,5rem)] font-extrabold leading-[.97] tracking-[-0.05em] text-brand-ink lg:text-[4.55rem]">
                Dari kebutuhan yang belum jelas, menjadi langkah yang terarah.
              </h1>
            </div>

            <div className="motion-reveal lg:col-span-4 lg:pb-1" style={{ animationDelay: "80ms" }}>
              <p className="text-[15px] leading-7 text-brand-muted sm:text-base sm:leading-8">
                Ceritakan kondisi bisnis Anda. Kami bantu memetakan kebutuhan, menjalankan proses, dan memberi update pada tahap penting.
              </p>
              <a
                href={consultationHref}
                target={whatsappHref ? "_blank" : undefined}
                rel={whatsappHref ? "noreferrer" : undefined}
                className="group mt-5 inline-flex min-h-12 items-center justify-center gap-2 rounded-[10px] bg-brand-navy px-5 py-3 text-sm font-semibold text-white transition hover:bg-brand-navy-dark"
              >
                Mulai konsultasi
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
            </div>
          </div>

          <div className="motion-reveal mt-9 grid overflow-hidden rounded-[14px] border border-brand-navy/9 bg-brand-paper/45 sm:grid-cols-2 lg:mt-11 lg:grid-cols-4" style={{ animationDelay: "130ms" }}>
            {steps.map(({ icon: Icon, title }, index) => (
              <div
                key={title}
                className="grid grid-cols-[38px_minmax(0,1fr)] items-center gap-3 border-b border-brand-navy/8 px-4 py-4 last:border-b-0 sm:[&:nth-child(odd)]:border-r lg:border-b-0 lg:border-r lg:last:border-r-0"
              >
                <span className="grid h-9 w-9 place-items-center rounded-full bg-brand-navy text-brand-gold-soft">
                  <Icon className="h-4 w-4" />
                </span>
                <div>
                  <p className="text-[9px] font-bold uppercase tracking-[0.12em] text-brand-gold-dark">
                    Tahap {index + 1}
                  </p>
                  <p className="mt-0.5 text-sm font-semibold text-brand-ink">{title}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="page-shell py-8 sm:py-10 lg:py-14">
        <div className="motion-reveal mx-auto grid max-w-5xl gap-6 rounded-[18px] border border-brand-navy/7 bg-brand-paper/70 p-5 sm:p-7 lg:grid-cols-12 lg:items-center lg:gap-x-10 lg:p-8 xl:gap-x-12">
          <div className="lg:col-span-7">
            <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-brand-gold-dark">Sebelum mulai</p>
            <h2 className="mt-2 text-[2rem] font-bold leading-[1.05] tracking-[-0.03em] text-brand-ink sm:text-[2.5rem]">
              Cukup ceritakan kondisi bisnis Anda saat ini.
            </h2>
            <p className="mt-3 max-w-xl text-sm leading-7 text-brand-muted">
              Sampaikan jenis usaha, rencana Anda, dan kebutuhan legalitas yang sedang dibutuhkan. Tim kami akan membantu memetakan langkah terbaik.
            </p>
          </div>
          <div className="premium-card p-4 lg:col-span-5">
            <MessageSquareMore className="h-6 w-6 text-brand-gold-dark" />
            <p className="mt-3 text-sm leading-6 text-brand-ink">
              “Anda tidak perlu menyiapkan dokumen rumit. Cukup ceritakan kebutuhan Anda, sisanya kami bantu.”
            </p>
          </div>
        </div>
      </section>

      <section className="page-shell pb-8 sm:pb-10 lg:pb-14">
        <div className="rounded-[18px] border border-brand-navy/7 bg-white p-5 sm:p-7 lg:p-8">
          <div className="max-w-3xl">
            <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-brand-gold-dark">Langkah kerja kami</p>
            <h2 className="mt-2 text-[2rem] font-bold leading-[1.04] tracking-[-0.035em] text-brand-ink sm:text-[2.6rem]">
              Proses yang terarah, dari awal hingga selesai.
            </h2>
          </div>

          <div className="flow-list mx-auto mt-8 max-w-5xl lg:mt-10">
            {steps.map(({ icon: Icon, title, description, result }, index) => (
              <article
                key={title}
                className={"flow-card motion-reveal " + (index % 2 === 1 ? "flow-card-offset" : "")}
                style={{ animationDelay: String(index * 80) + "ms" }}
              >
                <span className="flow-node" aria-hidden="true" />
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-brand-gold-pale text-brand-navy sm:h-12 sm:w-12">
                  <Icon className="h-5 w-5" />
                </span>
                <div className="min-w-0">
                  <h3 className="text-lg font-bold leading-tight text-brand-ink">{title}</h3>
                  <p className="mt-1 text-sm leading-6 text-brand-muted">{description}</p>
                  <div className="mt-3 rounded-[11px] bg-brand-paper px-4 py-3">
                    <p className="text-[10px] font-bold uppercase tracking-[0.09em] text-brand-gold-dark">Hasil tahap ini</p>
                    <p className="mt-1 text-sm leading-6 text-brand-ink">{result}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-brand-paper py-9 sm:py-11 lg:py-14">
        <div className="page-shell">
          <div className="max-w-3xl">
            <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-brand-gold-dark">Selama proses</p>
            <h2 className="mt-2 text-[2rem] font-bold leading-[1.04] tracking-[-0.035em] text-brand-ink sm:text-[2.5rem]">
              Anda tetap tahu setiap perkembangannya.
            </h2>
          </div>
          <div className="mt-7 grid gap-3 lg:mt-9 lg:grid-cols-3">
            {clarity.map(({ icon: Icon, title, description }, index) => (
              <article
                key={title}
                className="premium-card motion-reveal grid grid-cols-[44px_minmax(0,1fr)] gap-4 p-4"
                style={{ animationDelay: String(index * 70) + "ms" }}
              >
                <span className="grid h-10 w-10 place-items-center rounded-full bg-brand-gold-pale text-brand-gold-dark">
                  <Icon className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="text-base font-bold text-brand-ink">{title}</h3>
                  <p className="mt-1 text-sm leading-6 text-brand-muted">{description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden border-t border-brand-navy/8 bg-brand-paper py-10 sm:py-12">
        <div className="visual-cta-leaves pointer-events-none absolute inset-y-0 right-0 w-[150px] bg-contain bg-right-bottom bg-no-repeat sm:w-[220px]" />
        <div className="page-shell relative grid gap-5 sm:grid-cols-[1fr_auto] sm:items-center lg:grid-cols-12 lg:gap-x-10 xl:gap-x-12">
          <div className="lg:col-span-8">
            <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-brand-gold-dark">Siap mulai?</p>
            <h2 className="mt-2 max-w-xl text-[2rem] font-bold leading-[1.04] text-brand-ink sm:text-[2.4rem]">
              Konsultasikan kebutuhan Anda sekarang juga.
            </h2>
          </div>
          <a
            href={consultationHref}
            target={whatsappHref ? "_blank" : undefined}
            rel={whatsappHref ? "noreferrer" : undefined}
            className="group inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-[10px] bg-brand-navy px-5 py-3 text-sm font-semibold text-white transition hover:bg-brand-navy-dark sm:w-auto lg:col-span-4 lg:justify-self-end"
          >
            Mulai konsultasi
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </a>
        </div>
      </section>
    </main>
  );
}
