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
    <section className="border-b border-brand-navy/8 bg-brand-paper py-10 sm:py-12 lg:py-14">
      <div className="page-shell">
        <div className="max-w-3xl">
          <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-brand-gold-dark">
            Cara kerja kami
          </p>
          <h2 className="mt-2 text-[2rem] font-bold leading-[1.05] tracking-[-0.03em] text-brand-ink sm:text-[2.45rem]">
            Dari konsultasi sampai legalitas selesai.
          </h2>
        </div>

        <div className="process-grid mt-8 lg:mt-10">
          {steps.map(({ icon: Icon, title, description }, index) => (
            <article
              key={title}
              className="motion-reveal process-step"
              style={{ animationDelay: String(index * 60) + "ms" }}
            >
              <span className="process-step-icon">
                <Icon className="h-5 w-5" />
              </span>
              <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-brand-gold-dark">
                Tahap {index + 1}
              </p>
              <h3 className="mt-2 text-base font-bold leading-tight text-brand-ink">{title}</h3>
              <p className="mt-1.5 text-sm leading-6 text-brand-muted">{description}</p>
            </article>
          ))}
        </div>

        <Link
          href="/cara-kerja"
          className="group mt-8 inline-flex items-center gap-2 text-sm font-semibold text-brand-navy hover:text-brand-gold-dark"
        >
          Lihat cara kerja lengkap
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </section>
  );
}
