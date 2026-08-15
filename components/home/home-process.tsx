import Link from "next/link";
import { ArrowRight, FileCheck2, MessageSquareText, NotebookTabs, ShieldCheck } from "lucide-react";

const steps = [
  {
    number: "1",
    title: "Konsultasi",
    description: "Sampaikan kebutuhan legal bisnis Anda kepada tim kami.",
    icon: MessageSquareText,
  },
  {
    number: "2",
    title: "Penawaran",
    description: "Dapatkan penawaran terbaik yang sesuai kebutuhan Anda.",
    icon: NotebookTabs,
  },
  {
    number: "3",
    title: "Proses",
    description: "Tim kami memproses dokumen hingga selesai.",
    icon: FileCheck2,
  },
  {
    number: "4",
    title: "Selesai",
    description: "Dokumen legalitas siap digunakan dengan lebih aman.",
    icon: ShieldCheck,
  },
] as const;

export function HomeProcess() {
  return (
    <section className="relative overflow-hidden border-b border-brand-navy/8 bg-white py-16 lg:py-18">
      <div className="page-shell">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="section-title">Bagaimana prosesnya?</h2>
            <p className="mt-3 max-w-xl text-sm leading-7 text-brand-muted">Empat langkah sederhana dari konsultasi sampai dokumen siap digunakan.</p>
          </div>
          <Link href="/cara-kerja" className="inline-flex items-center gap-2 text-sm font-semibold text-brand-navy hover:text-brand-gold-dark">
            Lihat alur lengkap <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="relative mt-10">
          <div className="absolute left-[7%] right-[7%] top-[54px] hidden border-t border-dashed border-brand-gold/45 lg:block" />

          <div className="relative grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <article key={step.number} className="relative rounded-[18px] border border-brand-navy/10 bg-white px-5 py-5 shadow-[0_10px_24px_rgba(4,29,54,.05)]">
                  <div className="relative z-10 flex items-start gap-4">
                    <div className="relative shrink-0">
                      <span className="absolute -right-2 -top-2 z-10 grid h-6 w-6 place-items-center rounded-full bg-brand-gold text-[10px] font-semibold text-brand-navy-dark shadow-sm">
                        {step.number}
                      </span>
                      <span className="grid h-14 w-14 place-items-center rounded-full bg-brand-navy text-white shadow-[0_8px_20px_rgba(4,29,54,.18)]">
                        <Icon className="h-6 w-6" strokeWidth={1.7} />
                      </span>
                    </div>
                    <div className="pt-1">
                      <h3 className="text-[15px] font-semibold text-brand-navy-dark">{step.title}</h3>
                      <p className="mt-2 text-[12px] leading-5 text-brand-muted">{step.description}</p>
                    </div>
                  </div>

                  {index < steps.length - 1 ? (
                    <span className="absolute -right-[14px] top-[42px] z-20 hidden h-7 w-7 place-items-center rounded-full border border-brand-navy/10 bg-white text-brand-navy/55 lg:grid">
                      →
                    </span>
                  ) : null}
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
