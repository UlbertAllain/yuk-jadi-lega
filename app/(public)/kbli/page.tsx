import Link from "next/link";
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
    title: "Kenali kegiatan utama usaha",
    description: "Mulai dari apa yang benar-benar dilakukan, dijual, atau diberikan oleh usaha Anda kepada pelanggan.",
  },
  {
    number: "02",
    title: "Cari dengan kata yang sederhana",
    description: "Gunakan jenis usaha atau aktivitas utama, misalnya software, restoran, konstruksi, laundry, atau perdagangan.",
  },
  {
    number: "03",
    title: "Pilih kode yang paling sesuai",
    description: "Baca nama kegiatan usahanya dan pastikan pilihannya sesuai dengan aktivitas bisnis yang memang dijalankan.",
  },
] as const;

export default function KbliPage() {
  return (
    <main className="bg-brand-surface">
      <PublicPageHero
        title="Temukan kode KBLI yang sesuai dengan usaha Anda."
        description="KBLI adalah kode yang digunakan untuk mengelompokkan kegiatan usaha di Indonesia. Cari berdasarkan jenis usaha, produk, atau aktivitas utama yang Anda jalankan."
        meta={
          <p className="text-xs font-semibold text-brand-muted">
            Menggunakan klasifikasi KBLI 2025.
          </p>
        }
      />

      <section className="border-b border-brand-navy/8 bg-white">
        <div className="page-shell grid gap-8 py-12 lg:grid-cols-[.8fr_1.2fr] lg:items-start lg:gap-14 lg:py-14">
          <div>
            <h2 className="text-2xl font-semibold tracking-[-0.035em] text-brand-ink sm:text-3xl">Apa itu KBLI dan kenapa perlu dipilih dengan tepat?</h2>
            <p className="mt-4 max-w-xl text-sm leading-7 text-brand-muted">
              KBLI membantu menjelaskan bidang kegiatan usaha Anda saat mengurus legalitas dan perizinan. Pemilihan kode yang tepat membuat kegiatan usaha yang didaftarkan lebih sesuai dengan bisnis yang benar-benar dijalankan.
            </p>
            <p className="mt-3 max-w-xl text-sm leading-7 text-brand-muted">
              Jika usaha Anda menjalankan beberapa aktivitas, Anda dapat mencari masing-masing kegiatan yang relevan dan menentukan mana yang paling sesuai dengan kebutuhan usaha.
            </p>
            <Link href="/kontak" className="mt-6 inline-flex items-center text-sm font-semibold text-brand-navy underline decoration-brand-gold/60 underline-offset-4 transition hover:text-brand-gold-dark">
              Masih bingung memilih KBLI? Konsultasikan dengan kami.
            </Link>
          </div>

          <div className="grid gap-3">
            {educationSteps.map((step) => (
              <article key={step.number} className="grid gap-4 rounded-[20px] border border-brand-navy/10 bg-brand-cloud/70 p-5 sm:grid-cols-[52px_minmax(0,1fr)] sm:items-start">
                <span className="text-sm font-semibold tabular-nums text-brand-gold-dark">{step.number}</span>
                <div>
                  <h3 className="text-base font-semibold text-brand-ink">{step.title}</h3>
                  <p className="mt-1.5 text-sm leading-6 text-brand-muted">{step.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="page-shell py-10 lg:py-14">
        <KbliBrowser />
      </section>
    </main>
  );
}
