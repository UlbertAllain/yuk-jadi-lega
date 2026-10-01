import Link from "next/link";
import { SearchCheck } from "lucide-react";
import { createPageMetadata } from "@/lib/seo";
import { KbliBrowser } from "@/components/site/kbli-browser";
import { PublicPageHero } from "@/components/site/public-page-hero";

export const metadata = createPageMetadata({
  title: "KBLI 2025",
  description: "Temukan kode KBLI 2025 yang sesuai dengan kegiatan usaha Anda.",
  path: "/kbli",
});

const educationSteps = [
  {
    number: "01",
    title: "Kenali kegiatan utama",
    description: "Mulai dari apa yang benar-benar dilakukan, dijual, atau diberikan usaha Anda.",
  },
  {
    number: "02",
    title: "Cari dengan kata sederhana",
    description: "Gunakan istilah seperti software, restoran, konstruksi, laundry, atau perdagangan.",
  },
  {
    number: "03",
    title: "Cocokkan aktivitasnya",
    description: "Baca nama kegiatan dan pastikan sesuai dengan aktivitas bisnis yang memang dijalankan.",
  },
] as const;

export default function KbliPage() {
  return (
    <main className="bg-brand-surface">
      <PublicPageHero
        title="Temukan kode KBLI yang sesuai dengan usaha Anda."
        description="Cari berdasarkan jenis usaha, produk, atau aktivitas utama. Anda tidak perlu membaca seluruh daftar KBLI satu per satu."
        meta={
          <p className="text-xs font-semibold text-brand-muted">
            Menggunakan klasifikasi KBLI 2025.
          </p>
        }
      />

      <section className="page-shell py-7 sm:py-9 lg:py-12">
        <KbliBrowser />
      </section>

      <section className="border-t border-brand-navy/9 bg-white py-9 sm:py-11 lg:py-14">
        <div className="page-shell">
          <div className="grid gap-6 lg:grid-cols-[320px_minmax(0,1fr)] lg:gap-10">
            <div>
              <span className="grid h-9 w-9 place-items-center rounded-full bg-brand-gold-pale">
                <SearchCheck className="h-4 w-4 text-brand-navy" />
              </span>
              <h2 className="mt-4 text-2xl font-semibold tracking-[-0.035em] text-brand-ink">
                Cara memilih KBLI dengan lebih tepat.
              </h2>
              <p className="mt-3 text-sm leading-7 text-brand-muted">
                KBLI menjelaskan kegiatan usaha saat mengurus legalitas dan perizinan. Fokuskan pencarian pada aktivitas yang benar-benar dijalankan.
              </p>
              <Link
                href="/kontak"
                className="mt-5 inline-flex text-sm font-semibold text-brand-navy underline decoration-brand-gold/60 underline-offset-4 hover:text-brand-gold-dark"
              >
                Masih bingung? Konsultasikan dengan kami.
              </Link>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              {educationSteps.map((step) => (
                <article key={step.number} className="rounded-[14px] border border-brand-navy/10 bg-brand-surface p-4">
                  <span className="text-xs font-semibold text-brand-gold-dark">{step.number}</span>
                  <h3 className="mt-3 text-base font-semibold text-brand-ink">{step.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-brand-muted">{step.description}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
