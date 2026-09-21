"use client";

import { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight, ExternalLink, Search, X } from "lucide-react";
import type { KbliApiItem, KbliApiResponse } from "@/lib/kbli";

const PAGE_SIZE = 20;
const BPS_KBLI_URL = "https://klasifikasi.web.bps.go.id/app/kbli";

type ApiError = {
  error?: string;
};

type SearchState = {
  query: string;
  page: number;
  items: KbliApiItem[];
  loading: boolean;
  error: string;
  hasNext: boolean;
};

export function KbliBrowser() {
  const [state, setState] = useState<SearchState>({
    query: "",
    page: 1,
    items: [],
    loading: true,
    error: "",
    hasNext: false,
  });

  useEffect(() => {
    const controller = new AbortController();
    const timer = window.setTimeout(() => {
      setState((current) => ({ ...current, loading: true, error: "" }));

      const params = new URLSearchParams({
        q: state.query.trim(),
        page: String(state.page),
        limit: String(PAGE_SIZE),
      });

      fetch(`/api/kbli?${params.toString()}`, {
        signal: controller.signal,
        headers: { Accept: "application/json" },
      })
        .then(async (response) => {
          const payload = (await response.json()) as KbliApiResponse | ApiError;

          if (!response.ok || !("items" in payload)) {
            throw new Error(
              "error" in payload && payload.error
                ? payload.error
                : "Data KBLI belum bisa dimuat.",
            );
          }

          setState((current) => ({
            ...current,
            items: payload.items,
            hasNext: payload.hasNext,
          }));
        })
        .catch((fetchError: unknown) => {
          if (controller.signal.aborted) return;

          setState((current) => ({
            ...current,
            items: [],
            hasNext: false,
            error:
              fetchError instanceof Error
                ? fetchError.message
                : "Data KBLI belum bisa dimuat.",
          }));
        })
        .finally(() => {
          if (!controller.signal.aborted) {
            setState((current) => ({ ...current, loading: false }));
          }
        });
    }, 320);

    return () => {
      window.clearTimeout(timer);
      controller.abort();
    };
  }, [state.page, state.query]);

  function updateQuery(query: string) {
    setState((current) => ({ ...current, query, page: 1 }));
  }

  function updatePage(page: number) {
    setState((current) => ({ ...current, page }));
  }

  return (
    <div className="grid gap-10 lg:grid-cols-[250px_minmax(0,1fr)] xl:grid-cols-[270px_minmax(0,1fr)] xl:gap-12">
      <KbliGuidance />

      <div className="min-w-0">
        <KbliSearchBar
          query={state.query}
          page={state.page}
          resultCount={state.items.length}
          loading={state.loading}
          onQueryChange={updateQuery}
        />

        <KbliResults
          items={state.items}
          page={state.page}
          loading={state.loading}
          error={state.error}
          hasNext={state.hasNext}
          onPrevious={() => updatePage(Math.max(1, state.page - 1))}
          onNext={() => updatePage(state.page + 1)}
        />
      </div>
    </div>
  );
}

function KbliGuidance() {
  return (
    <aside className="hidden lg:block">
      <div className="sticky top-28 border-y border-brand-navy/12 py-5">
        <p className="text-sm font-semibold text-brand-ink">Sebelum memilih KBLI</p>
        <p className="mt-3 text-sm leading-7 text-brand-muted">
          Cari berdasarkan aktivitas utama usaha Anda. Gunakan istilah yang biasa dipakai sehari-hari seperti
          “software”, “restoran”, “laundry”, atau “konstruksi”.
        </p>
        <p className="mt-5 border-t border-brand-navy/10 pt-4 text-xs leading-6 text-brand-muted">
          Hasil pencarian membantu menemukan kode yang relevan. Pastikan pilihan akhir benar-benar sesuai dengan
          aktivitas usaha yang dijalankan.
        </p>
        <a
          href={BPS_KBLI_URL}
          target="_blank"
          rel="noreferrer"
          className="mt-5 inline-flex items-center gap-2 text-xs font-semibold text-brand-navy hover:text-brand-gold-dark"
        >
          Lihat daftar resmi KBLI <ExternalLink className="h-3.5 w-3.5" />
        </a>
      </div>
    </aside>
  );
}

function KbliSearchBar({
  query,
  page,
  resultCount,
  loading,
  onQueryChange,
}: {
  query: string;
  page: number;
  resultCount: number;
  loading: boolean;
  onQueryChange: (value: string) => void;
}) {
  return (
    <div className="border-y border-brand-navy/12 py-4">
      <div className="relative">
        <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-brand-navy" />
        <input
          value={query}
          onChange={(event) => onQueryChange(event.target.value)}
          placeholder="Cari jenis usaha, misalnya software, restoran, konstruksi, atau kode KBLI..."
          className="h-14 w-full rounded-[8px] border border-brand-navy/14 bg-white pl-12 pr-11 text-sm font-medium text-brand-ink outline-none transition placeholder:font-normal placeholder:text-brand-muted/75 focus:border-brand-gold/55"
        />
        {query ? (
          <button
            type="button"
            aria-label="Hapus pencarian"
            onClick={() => onQueryChange("")}
            className="absolute right-2 top-1/2 grid h-9 w-9 -translate-y-1/2 place-items-center text-brand-muted transition hover:text-brand-navy"
          >
            <X className="h-4 w-4" />
          </button>
        ) : null}
      </div>

      <div className="mt-3 flex flex-wrap items-center justify-between gap-2 text-xs text-brand-muted">
        <p>
          {loading
            ? "Sedang mencari..."
            : `${resultCount} hasil pada halaman ${page}${query ? ` untuk “${query}”` : ""}.`}
        </p>
        <p>Cari berdasarkan nama kegiatan usaha atau kode KBLI.</p>
      </div>
    </div>
  );
}

function KbliResults({
  items,
  page,
  loading,
  error,
  hasNext,
  onPrevious,
  onNext,
}: {
  items: KbliApiItem[];
  page: number;
  loading: boolean;
  error: string;
  hasNext: boolean;
  onPrevious: () => void;
  onNext: () => void;
}) {
  if (error) {
    return <KbliErrorState />;
  }

  if (loading) {
    return <KbliLoadingState />;
  }

  if (!items.length) {
    return <KbliEmptyState />;
  }

  return (
    <>
      <div className="mt-8 divide-y divide-brand-navy/10 border-y border-brand-navy/12">
        {items.map((entry) => (
          <article
            key={entry.code}
            className="grid gap-4 py-5 sm:grid-cols-[120px_minmax(0,1fr)] sm:items-start sm:py-6"
          >
            <div>
              <span className="font-mono text-sm font-semibold text-brand-navy">{entry.code}</span>
            </div>
            <h2 className="text-lg font-semibold tracking-[-0.025em] text-brand-ink sm:text-xl">
              {entry.title}
            </h2>
          </article>
        ))}
      </div>

      <div className="mt-6 flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={onPrevious}
          disabled={page <= 1}
          className="inline-flex h-11 items-center gap-2 text-sm font-semibold text-brand-navy transition hover:text-brand-gold-dark disabled:cursor-not-allowed disabled:opacity-40"
        >
          <ArrowLeft className="h-4 w-4" /> Sebelumnya
        </button>
        <span className="text-xs font-medium text-brand-muted">Halaman {page}</span>
        <button
          type="button"
          onClick={onNext}
          disabled={!hasNext}
          className="inline-flex h-11 items-center gap-2 text-sm font-semibold text-brand-navy transition hover:text-brand-gold-dark disabled:cursor-not-allowed disabled:opacity-40"
        >
          Berikutnya <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </>
  );
}

function KbliErrorState() {
  return (
    <div className="mt-8 border-y border-amber-300 py-10 text-center">
      <p className="text-lg font-semibold text-brand-ink">Pencarian KBLI sedang tidak tersedia.</p>
      <p className="mt-2 text-sm leading-7 text-brand-muted">
        Silakan coba beberapa saat lagi atau gunakan daftar resmi KBLI untuk melanjutkan pencarian.
      </p>
      <a
        href={BPS_KBLI_URL}
        target="_blank"
        rel="noreferrer"
        className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-brand-navy"
      >
        Lihat daftar resmi KBLI <ExternalLink className="h-4 w-4" />
      </a>
    </div>
  );
}

function KbliLoadingState() {
  return (
    <div
      className="mt-8 divide-y divide-brand-navy/8 border-y border-brand-navy/12"
      aria-label="Memuat KBLI"
    >
      {Array.from({ length: 5 }).map((_, index) => (
        <div key={index} className="h-24 animate-pulse bg-white/50" />
      ))}
    </div>
  );
}

function KbliEmptyState() {
  return (
    <div className="mt-8 border-y border-brand-navy/12 py-14 text-center">
      <p className="text-xl font-semibold tracking-[-0.03em] text-brand-ink">
        Belum menemukan KBLI yang sesuai?
      </p>
      <p className="mx-auto mt-2 max-w-md text-sm leading-7 text-brand-muted">
        Coba gunakan kata yang lebih umum atau cari berdasarkan aktivitas utama usaha Anda.
      </p>
    </div>
  );
}
