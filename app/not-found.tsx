import Link from "next/link";

export default function NotFound() {
  return (
    <main className="grid min-h-screen place-items-center bg-brand-paper p-6">
      <div className="max-w-xl text-center">
        <p className="text-xs font-black uppercase tracking-[0.2em] text-brand-gold">
          404
        </p>
        <h1 className="mt-4 text-5xl font-black tracking-[-0.06em] text-slate-950">
          Halaman ini nggak ketemu.
        </h1>
        <p className="mt-5 text-sm leading-7 text-slate-600">
          Halaman yang kamu cari mungkin sudah dipindahkan, diperbarui, atau belum tersedia.
        </p>
        <Link
          href="/"
          className="mt-7 inline-flex rounded-full bg-brand-navy px-6 py-3 text-sm font-black text-white"
        >
          Kembali ke beranda
        </Link>
      </div>
    </main>
  );
}
