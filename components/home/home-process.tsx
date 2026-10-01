import Link from "next/link";
import { ArrowRight, FileCheck2, FileSearch2, MessageSquareMore, Settings2 } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: MessageSquareMore,
    title: "Ceritakan kebutuhan",
    description: "Sampaikan rencana atau kendala bisnis Anda melalui konsultasi.",
  },
  {
    number: "02",
    icon: FileSearch2,
    title: "Kami petakan",
    description: "Tim menganalisis kebutuhan dan menentukan langkah yang paling relevan.",
  },
  {
    number: "03",
    icon: Settings2,
    title: "Proses berjalan",
    description: "Pengurusan dijalankan sesuai ruang lingkup yang telah disepakati.",
  },
  {
    number: "04",
    icon: FileCheck2,
    title: "Hasil diserahkan",
    description: "Hasil diperiksa lalu diserahkan beserta arahan bila ada langkah lanjutan.",
  },
] as const;

export function HomeProcess() {
  return (
    <section className="border-b border-brand-navy/8 bg-white py-10 sm:py-12 lg:py-16">
      <div className="page-shell lg:grid lg:grid-cols-12 lg:gap-x-10 xl:gap-x-12">
        <div className="max-w-2xl lg:col-span-4">
          <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-brand-gold-dark">
            Cara kerja kami
          </p>
          <h2 className="editorial-heading mt-2 text-[2rem] font-semibold leading-[1.04] tracking-[-0.035em] text-brand-ink sm:text-[2.6rem]">
            Dari konsultasi sampai legalitas selesai.
          </h2>
        </div>

        <ol className="editorial-timeline mt-7 max-w-3xl lg:col-span-8 lg:mt-0 lg:max-w-none">
          {steps.map(({ number, icon: Icon, title, description }, index) => (
            <li
              key={number}
              className="motion-reveal relative grid grid-cols-[42px_52px_minmax(0,1fr)] gap-3 pb-7 last:pb-0 sm:grid-cols-[50px_58px_minmax(0,1fr)] sm:gap-4"
              style={{ animationDelay: String(index * 70) + "ms" }}
            >
              <span className="relative z-10 grid h-9 w-9 place-items-center rounded-full bg-brand-gold-pale text-[11px] font-semibold text-brand-ink sm:h-10 sm:w-10">
                {number}
              </span>
              <span className="grid h-11 w-11 place-items-center rounded-full bg-brand-paper text-brand-navy sm:h-12 sm:w-12">
                <Icon className="h-5 w-5" />
              </span>
              <div className="pt-0.5">
                <h3 className="editorial-heading text-lg font-semibold leading-tight text-brand-ink">{title}</h3>
                <p className="mt-1 text-sm leading-6 text-brand-muted">{description}</p>
              </div>
            </li>
          ))}
        </ol>

        <Link
          href="/cara-kerja"
          className="group mt-7 inline-flex items-center gap-2 text-sm font-semibold text-brand-navy hover:text-brand-gold-dark lg:col-span-8 lg:col-start-5"
        >
          Lihat cara kerja lengkap
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </section>
  );
}
