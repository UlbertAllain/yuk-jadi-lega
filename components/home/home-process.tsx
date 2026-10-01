import Link from "next/link";
import { ArrowRight, FileCheck2, FileSearch2, MessageSquareMore, Settings2 } from "lucide-react";

const steps = [
  {
    icon: MessageSquareMore,
    title: "Ceritakan kebutuhan",
    description: "Sampaikan rencana atau kendala bisnis Anda melalui konsultasi.",
  },
  {
    icon: FileSearch2,
    title: "Kami petakan",
    description: "Tim menganalisis kebutuhan dan menentukan langkah yang paling relevan.",
  },
  {
    icon: Settings2,
    title: "Proses berjalan",
    description: "Pengurusan dijalankan sesuai ruang lingkup yang telah disepakati.",
  },
  {
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

        <div className="flow-list mt-7 max-w-3xl lg:col-span-8 lg:mt-0 lg:max-w-none">
          {steps.map(({ icon: Icon, title, description }, index) => (
            <article
              key={title}
              className={"flow-card motion-reveal " + (index % 2 === 1 ? "flow-card-offset" : "")}
              style={{ animationDelay: String(index * 70) + "ms" }}
            >
              <span className="flow-node" aria-hidden="true" />
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-brand-gold-pale text-brand-navy sm:h-12 sm:w-12">
                <Icon className="h-5 w-5" />
              </span>
              <div className="min-w-0">
                <h3 className="editorial-heading text-lg font-semibold leading-tight text-brand-ink">{title}</h3>
                <p className="mt-1 text-sm leading-6 text-brand-muted">{description}</p>
              </div>
            </article>
          ))}
        </div>

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
