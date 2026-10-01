import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Konsultasi",
    description: "Sampaikan kebutuhan dan kondisi usaha Anda.",
  },
  {
    number: "02",
    title: "Pemetaan",
    description: "Tim menyusun kebutuhan, dokumen, biaya, dan estimasi proses.",
  },
  {
    number: "03",
    title: "Pengerjaan",
    description: "Proses dijalankan dengan update pada tahap yang penting.",
  },
  {
    number: "04",
    title: "Selesai",
    description: "Hasil diserahkan beserta arahan bila masih ada langkah lanjutan.",
  },
] as const;

const visuals = [
  {
    src: "/visuals/process-consult.svg",
    label: "Mulai dari kondisi usaha Anda",
  },
  {
    src: "/visuals/process-work.svg",
    label: "Proses dibuat terarah dan transparan",
  },
  {
    src: "/visuals/process-finish.svg",
    label: "Hasil diperiksa sebelum diserahkan",
  },
] as const;

export function HomeProcess() {
  return (
    <section className="overflow-hidden border-b border-brand-navy/8 bg-brand-paper py-10 sm:py-12 lg:py-16">
      <div className="page-shell">
        <div className="grid gap-5 lg:grid-cols-[1fr_360px] lg:items-end lg:gap-12">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.11em] text-brand-gold-dark">
              Cara kerja
            </p>
            <h2 className="editorial-rule mt-2 max-w-2xl pt-4 section-title">
              Proses legal tidak harus terasa rumit.
            </h2>
          </div>
          <div>
            <p className="text-sm leading-7 text-brand-muted">
              Empat langkah utama dari konsultasi sampai hasil siap digunakan.
            </p>
            <Link
              href="/cara-kerja"
              className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-brand-navy hover:text-brand-gold-dark"
            >
              Lihat alur lengkap <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>

        <div className="mt-7 grid gap-3 md:grid-cols-3">
          {visuals.map((visual, index) => (
            <div
              key={visual.src}
              className={
                index === 1
                  ? "relative overflow-hidden rounded-[16px] border border-brand-navy/10 bg-white md:-translate-y-3"
                  : "relative overflow-hidden rounded-[16px] border border-brand-navy/10 bg-white"
              }
            >
              <div className="relative aspect-[16/7]">
                <Image src={visual.src} alt="" fill className="object-cover" />
              </div>
              <p className="border-t border-brand-navy/8 px-4 py-3 text-xs font-semibold text-brand-ink">
                {visual.label}
              </p>
            </div>
          ))}
        </div>

        <ol className="mt-7 grid gap-0 border-y border-brand-navy/12 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step) => (
            <li
              key={step.number}
              className="grid grid-cols-[34px_minmax(0,1fr)] gap-3 border-b border-brand-navy/8 py-4 last:border-b-0 sm:border-b sm:px-4 sm:first:pl-0 sm:last:pr-0 lg:border-b-0 lg:border-r lg:last:border-r-0"
            >
              <span className="text-xs font-semibold tabular-nums text-brand-gold-dark">{step.number}</span>
              <div>
                <h3 className="text-sm font-semibold text-brand-navy-dark">{step.title}</h3>
                <p className="mt-1.5 text-xs leading-5 text-brand-muted">{step.description}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
