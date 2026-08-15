"use client";

import { useMemo, useState } from "react";
import { Search, X } from "lucide-react";
import type { KbliEntry } from "@/types";

export function KbliBrowser({ entries }: { entries: KbliEntry[] }) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return entries;

    return entries.filter((entry) =>
      [entry.code, entry.title, entry.description, entry.category || ""]
        .join(" ")
        .toLowerCase()
        .includes(normalized),
    );
  }, [entries, query]);

  return (
    <div className="grid gap-8 lg:grid-cols-[280px_minmax(0,1fr)] xl:grid-cols-[300px_minmax(0,1fr)] xl:gap-10">
      <aside className="hidden lg:block">
        <div className="sticky top-28 overflow-hidden rounded-[24px] border border-brand-navy/16 bg-white shadow-[0_16px_40px_rgba(6,23,46,.065)]">
          <div className="border-b border-brand-navy/12 bg-brand-mist px-5 py-4">
            <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-brand-gold-dark">Cara mencari</p>
            <p className="mt-1 text-sm font-semibold text-brand-ink">Gunakan istilah yang paling dekat dengan aktivitas usaha.</p>
          </div>
          <div className="p-5">
            <p className="text-sm font-normal leading-7 text-brand-muted">
              Cari menggunakan kode KBLI, nama aktivitas, jenis usaha, atau kata kunci yang menggambarkan kegiatan bisnis Anda.
            </p>
            <div className="mt-5 rounded-2xl border border-brand-gold/25 bg-brand-paper p-4">
              <p className="text-[10px] font-semibold uppercase tracking-[0.11em] text-brand-gold-dark">Catatan</p>
              <p className="mt-2 text-xs font-normal leading-6 text-brand-muted">Hasil bersifat referensi. Cocokkan kembali dengan kegiatan aktual dan sumber resmi pemerintah.</p>
            </div>
          </div>
        </div>
      </aside>

      <div className="min-w-0">
        <div className="rounded-[24px] border border-brand-navy/10 bg-white p-3 shadow-[0_14px_36px_rgba(6,23,46,.05)] sm:p-4">
          <div className="relative">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-brand-navy" />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Cari kode, judul, atau aktivitas usaha..."
              className="h-14 w-full rounded-xl border border-brand-navy/14 bg-brand-cloud pl-12 pr-11 text-sm font-medium text-brand-ink outline-none transition placeholder:font-normal placeholder:text-brand-muted/75 focus:border-brand-gold/55 focus:bg-white"
            />
            {query ? (
              <button type="button" aria-label="Hapus pencarian" onClick={() => setQuery("")} className="absolute right-2 top-1/2 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-lg text-brand-muted transition hover:bg-brand-mist hover:text-brand-navy">
                <X className="h-4 w-4" />
              </button>
            ) : null}
          </div>
          <p className="mt-3 px-1 text-sm font-medium text-brand-muted"><strong className="font-semibold text-brand-ink">{filtered.length}</strong> klasifikasi ditemukan{query ? <> untuk “{query}”</> : null}.</p>
        </div>

        {filtered.length ? (
          <div className="mt-5 grid gap-3">
            {filtered.map((entry, index) => (
              <article key={entry.id} className="card-premium card-accent-top rounded-[22px] p-5 sm:p-6">
                <div className="grid gap-5 sm:grid-cols-[72px_120px_minmax(0,1fr)] sm:items-start">
                  <span className="rounded-lg bg-brand-paper px-2.5 py-1.5 text-center text-[10px] font-semibold text-brand-gold-dark">{String(index + 1).padStart(2, "0")}</span>
                  <div>
                    <span className="inline-flex rounded-lg border border-brand-navy/18 bg-brand-bluewash px-3 py-2 font-mono text-sm font-semibold text-brand-navy">{entry.code}</span>
                    {entry.category ? <p className="mt-2 text-[9px] font-semibold uppercase tracking-[0.1em] text-brand-gold-dark">{entry.category}</p> : null}
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold tracking-[-0.025em] text-brand-ink sm:text-xl">{entry.title}</h2>
                    <p className="mt-3 text-sm font-normal leading-7 text-brand-muted">{entry.description}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="mt-5 rounded-[24px] border border-brand-navy/10 bg-white px-6 py-16 text-center">
            <p className="text-xl font-semibold tracking-[-0.03em] text-brand-ink">KBLI tidak ditemukan.</p>
            <p className="mt-2 text-sm font-normal text-brand-muted">Coba kata kunci yang lebih umum atau gunakan kode lain.</p>
          </div>
        )}
      </div>
    </div>
  );
}
