import Link from "next/link";
import { ArrowRight } from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Konsultasi",
    description: "Sampaikan kebutuhan legal bisnis Anda kepada tim kami.",
  },
  {
    number: "02",
    title: "Penawaran",
    description: "Dapatkan penawaran terbaik yang sesuai kebutuhan Anda.",
  },
  {
    number: "03",
    title: "Proses",
    description: "Tim kami memproses dokumen hingga selesai.",
  },
  {
    number: "04",
    title: "Selesai",
    description: "Dokumen legalitas siap digunakan dengan lebih aman.",
  },
] as const;

export function HomeProcess() {
  return (
    <section className="border-b border-brand-navy/8 bg-white py-16 lg:py-20">
      <div className="page-shell">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="section-title">Bagaimana prosesnya?</h2>
            <p className="mt-3 max-w-xl text-sm leading-7 text-brand-muted">
              Empat langkah sederhana dari konsultasi sampai dokumen siap digunakan.
            </p>
          </div>
          <Link
            href="/cara-kerja"
            className="inline-flex items-center gap-2 text-sm font-semibold text-brand-navy hover:text-brand-gold-dark"
          >
            Lihat alur lengkap <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-10 grid gap-x-8 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step) => (
            <article key={step.number} className="border-t border-brand-navy/16 pt-5">
              <p className="text-xs font-semibold tabular-nums text-brand-gold-dark">{step.number}</p>
              <h3 className="mt-5 text-lg font-semibold text-brand-navy-dark">{step.title}</h3>
              <p className="mt-2 text-sm leading-6 text-brand-muted">{step.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
