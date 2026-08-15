import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Syarat & Ketentuan",
  description: "Syarat dan ketentuan penggunaan website dan layanan Yuk Jadi Legal.",
  path: "/syarat-ketentuan",
});

export default function TermsPage() {
  return (
    <main className="mx-auto max-w-4xl px-5 py-16 lg:px-8 lg:py-24">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-gold-dark">Legal</p>
      <h1 className="mt-4 text-4xl font-semibold tracking-[-0.05em] text-slate-950 sm:text-5xl">Syarat & Ketentuan</h1>
      <div className="mt-10 space-y-8 text-sm leading-8 text-slate-600">
        <section><h2 className="text-lg font-semibold text-slate-950">Informasi di website</h2><p className="mt-2">Konten pada website ditujukan sebagai informasi umum mengenai layanan. Ruang lingkup, biaya, estimasi, dan persyaratan akhir dapat berubah setelah kebutuhan klien ditinjau.</p></section>
        <section><h2 className="text-lg font-semibold text-slate-950">Konsultasi dan pemesanan</h2><p className="mt-2">Pengiriman formulir atau pesan konsultasi belum otomatis membentuk hubungan jasa. Pekerjaan dimulai setelah ruang lingkup dan ketentuan layanan disepakati oleh para pihak.</p></section>
        <section><h2 className="text-lg font-semibold text-slate-950">Dokumen dan data</h2><p className="mt-2">Pengguna bertanggung jawab memberikan informasi yang benar dan dokumen yang sah. Keterlambatan atau ketidaksesuaian data dapat memengaruhi proses layanan.</p></section>
        <section><h2 className="text-lg font-semibold text-slate-950">Perubahan ketentuan</h2><p className="mt-2">Ketentuan ini dapat diperbarui agar selaras dengan layanan dan ketentuan hukum yang berlaku. Versi yang tampil di website menjadi versi yang berlaku saat diakses.</p></section>
      </div>
    </main>
  );
}
