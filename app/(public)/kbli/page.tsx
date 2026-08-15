import type { Metadata } from "next";
import { KbliBrowser } from "@/components/site/kbli-browser";
import { PublicPageHero } from "@/components/site/public-page-hero";
import { getKbliEntries } from "@/lib/data";

export const metadata: Metadata = {
  title: "KBLI 2020",
  description: "Cari referensi KBLI 2020 berdasarkan kode, judul, dan uraian kegiatan usaha.",
};

export default async function KbliPage() {
  const entries = await getKbliEntries();

  return (
    <main className="bg-brand-surface">
      <PublicPageHero
        eyebrow="Resource bisnis"
        title="Cari referensi KBLI dengan lebih cepat."
        description="Gunakan kode, nama kegiatan, atau kata kunci usaha untuk mempersempit pencarian sebelum melakukan verifikasi akhir."
        meta={<p className="text-xs font-semibold text-brand-muted"><strong className="text-brand-ink">{entries.length}</strong> referensi pada dataset saat ini</p>}
      />

      <section className="page-shell py-10 lg:py-14">
        <KbliBrowser entries={entries} />
      </section>
    </main>
  );
}
