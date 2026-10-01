import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const steps = [
  ["01", "Konsultasi", "Ceritakan kebutuhan dan kondisi usaha Anda."],
  ["02", "Pemetaan", "Tim menyusun kebutuhan, dokumen, biaya, dan estimasi proses."],
  ["03", "Pengerjaan", "Proses dijalankan dengan update pada tahap yang penting."],
  ["04", "Selesai", "Hasil diserahkan beserta arahan bila masih ada langkah lanjutan."],
] as const;

export function HomeProcess() {
  return (
    <section className="border-b border-brand-navy/8 bg-brand-paper py-10 sm:py-12 lg:py-16">
      <div className="page-shell grid gap-8 lg:grid-cols-[.9fr_1.1fr] lg:items-center lg:gap-12">
        <div>
          <div className="relative overflow-hidden rounded-[18px] border border-brand-navy/10 bg-white">
            <div className="relative aspect-[16/10] sm:aspect-[16/8] lg:aspect-[4/3]">
              <Image
                src="/visuals/process-work.svg"
                alt=""
                fill
                className="object-cover"
              />
            </div>
          </div>
          <p className="mt-3 text-xs leading-5 text-brand-muted">
            Alur dibuat sederhana supaya Anda tetap tahu apa yang sedang diproses.
          </p>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.1em] text-brand-gold-dark">
            Cara kerja
          </p>
          <h2 className="mt-2 section-title">Proses legal tidak harus terasa rumit.</h2>
          <p className="mt-3 max-w-xl text-sm leading-7 text-brand-muted">
            Empat langkah utama dari konsultasi sampai hasil siap digunakan.
          </p>

          <ol className="mt-6 border-l border-brand-navy/15 pl-5">
            {steps.map(([number, title, description]) => (
              <li key={number} className="relative pb-5 last:pb-0">
                <span className="absolute -left-[1.7rem] top-0.5 grid h-6 w-6 place-items-center rounded-full bg-brand-navy text-[10px] font-semibold text-white">
                  {number}
                </span>
                <h3 className="text-sm font-semibold text-brand-ink">{title}</h3>
                <p className="mt-1 text-sm leading-6 text-brand-muted">{description}</p>
              </li>
            ))}
          </ol>

          <Link
            href="/cara-kerja"
            className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-brand-navy hover:text-brand-gold-dark"
          >
            Lihat alur lengkap <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
