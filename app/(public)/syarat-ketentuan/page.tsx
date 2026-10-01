import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Syarat & Ketentuan",
  description: "Syarat dan ketentuan penggunaan website dan layanan Yuk Jadi Legal.",
  path: "/syarat-ketentuan",
});

const sections = [
  [
    "Informasi di website",
    "Konten pada website ditujukan sebagai informasi umum mengenai layanan. Ruang lingkup, biaya, estimasi, dan persyaratan akhir dapat berubah setelah kebutuhan klien ditinjau.",
  ],
  [
    "Konsultasi dan pemesanan",
    "Pengiriman formulir atau pesan konsultasi belum otomatis membentuk hubungan jasa. Pekerjaan dimulai setelah ruang lingkup dan ketentuan layanan disepakati oleh para pihak.",
  ],
  [
    "Dokumen dan data",
    "Pengguna bertanggung jawab memberikan informasi yang benar dan dokumen yang sah. Keterlambatan atau ketidaksesuaian data dapat memengaruhi proses layanan.",
  ],
  [
    "Perubahan ketentuan",
    "Ketentuan ini dapat diperbarui agar selaras dengan layanan dan ketentuan hukum yang berlaku. Versi yang tampil di website menjadi versi yang berlaku saat diakses.",
  ],
] as const;

export default function TermsPage() {
  return (
    <main className="bg-brand-surface">
      <header className="border-b border-brand-navy/10 bg-brand-paper">
        <div className="page-shell max-w-4xl py-9 sm:py-11 lg:py-14">
          <p className="text-xs font-semibold uppercase tracking-[0.11em] text-brand-gold-dark">Dokumen legal</p>
          <h1 className="mt-2 text-[clamp(2.2rem,4vw,3.5rem)] font-semibold leading-[1.05] tracking-[-0.045em] text-brand-ink">
            Syarat & Ketentuan
          </h1>
          <p className="mt-4 max-w-2xl text-[15px] leading-7 text-brand-muted">
            Ketentuan dasar penggunaan website dan proses layanan Yuk Jadi Legal.
          </p>
        </div>
      </header>

      <section className="page-shell max-w-4xl py-8 sm:py-10 lg:py-14">
        <div className="grid gap-3">
          {sections.map(([title, body], index) => (
            <section key={title} className="rounded-[12px] border border-brand-navy/10 bg-white p-4 sm:p-5">
              <p className="text-xs font-semibold text-brand-gold-dark">{String(index + 1).padStart(2, "0")}</p>
              <h2 className="mt-2 text-base font-semibold text-brand-ink sm:text-lg">{title}</h2>
              <p className="mt-2 text-sm leading-7 text-brand-muted">{body}</p>
            </section>
          ))}
        </div>
      </section>
    </main>
  );
}
