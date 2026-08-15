"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Clock3, Search, X } from "lucide-react";
import { servicePriceLabel } from "@/lib/format";
import type { Service, ServiceCategory } from "@/types";

export function ServicesBrowser({
  categories,
  services,
  initialCategory = "all",
}: {
  categories: ServiceCategory[];
  services: Service[];
  initialCategory?: string;
}) {
  const safeInitialCategory = categories.some((item) => item.slug === initialCategory) ? initialCategory : "all";
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState(safeInitialCategory);

  const categoryMap = useMemo(() => new Map(categories.map((item) => [item.slug, item.name])), [categories]);
  const categoryCounts = useMemo(() => {
    const counts = new Map<string, number>();
    services.forEach((service) => counts.set(service.categorySlug, (counts.get(service.categorySlug) || 0) + 1));
    return counts;
  }, [services]);

  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return services.filter((service) => {
      if (category !== "all" && service.categorySlug !== category) return false;
      if (!normalized) return true;
      const haystack = [
        service.title,
        service.shortDescription,
        service.description,
        categoryMap.get(service.categorySlug) || "",
        ...(service.keywords || []),
      ].join(" ").toLowerCase();
      return haystack.includes(normalized);
    });
  }, [category, categoryMap, query, services]);

  const activeCategory = categories.find((item) => item.slug === category);

  function reset() {
    setQuery("");
    setCategory("all");
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[280px_minmax(0,1fr)] xl:grid-cols-[300px_minmax(0,1fr)] xl:gap-10">
      <aside className="hidden lg:block">
        <div className="sticky top-28 overflow-hidden rounded-[24px] border border-brand-navy/16 bg-white shadow-[0_16px_40px_rgba(6,23,46,.065)]">
          <div className="border-b border-brand-navy/12 bg-brand-mist px-5 py-4">
            <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-brand-gold-dark">Filter kategori</p>
            <p className="mt-1 text-sm font-semibold text-brand-ink">Pilih kebutuhan yang paling dekat.</p>
          </div>
          <div className="p-2">
            <CategoryButton active={category === "all"} count={services.length} onClick={() => setCategory("all")}>Semua layanan</CategoryButton>
            {categories.map((item) => (
              <CategoryButton key={item.id} active={category === item.slug} count={categoryCounts.get(item.slug) || 0} onClick={() => setCategory(item.slug)}>
                {item.name}
              </CategoryButton>
            ))}
          </div>
        </div>
      </aside>

      <div className="min-w-0">
        <div className="rounded-[24px] border border-brand-navy/10 bg-white p-3 shadow-[0_14px_36px_rgba(6,23,46,.05)] sm:p-4">
          <div className="grid gap-3 md:grid-cols-[minmax(0,1fr)_230px]">
            <div className="relative">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-brand-navy" />
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Cari PT, CV, merek, NIB, kontrak, paspor..."
                className="h-14 w-full rounded-xl border border-brand-navy/14 bg-brand-cloud pl-12 pr-11 text-sm font-medium text-brand-ink outline-none transition placeholder:font-normal placeholder:text-brand-muted/75 focus:border-brand-gold/55 focus:bg-white"
              />
              {query ? (
                <button type="button" onClick={() => setQuery("")} className="absolute right-2 top-1/2 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-lg text-brand-muted transition hover:bg-brand-mist hover:text-brand-navy" aria-label="Hapus pencarian">
                  <X className="h-4 w-4" />
                </button>
              ) : null}
            </div>

            <label className="lg:hidden">
              <span className="sr-only">Pilih kategori</span>
              <select value={category} onChange={(event) => setCategory(event.target.value)} className="h-14 w-full rounded-xl border border-brand-navy/14 bg-brand-cloud px-4 text-sm font-semibold text-brand-ink outline-none focus:border-brand-gold/55">
                <option value="all">Semua kategori</option>
                {categories.map((item) => <option key={item.id} value={item.slug}>{item.name}</option>)}
              </select>
            </label>
          </div>

          <div className="mt-3 flex flex-wrap items-center justify-between gap-3 px-1">
            <p className="text-sm font-medium text-brand-muted">
              <strong className="font-semibold text-brand-ink">{filtered.length}</strong> layanan
              {activeCategory ? <> · {activeCategory.name}</> : null}
              {query ? <> · “{query}”</> : null}
            </p>
            {(query || category !== "all") ? <button type="button" onClick={reset} className="text-xs font-semibold text-brand-navy hover:text-brand-gold-dark">Reset filter</button> : null}
          </div>
        </div>

        {filtered.length ? (
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            {filtered.map((service, index) => (
              <Link key={service.id} href={`/layanan/${service.slug}`} className="card-premium card-accent-top group relative flex min-h-[250px] flex-col overflow-hidden rounded-[24px] p-5 sm:p-6">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-2">
                    <span className="rounded-lg bg-brand-paper px-2.5 py-1.5 text-[10px] font-semibold tabular-nums text-brand-gold-dark">{String(index + 1).padStart(2, "0")}</span>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.1em] text-brand-muted">{categoryMap.get(service.categorySlug) || "Layanan legal"}</p>
                  </div>
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-brand-navy/14 bg-brand-cloud text-brand-navy transition group-hover:border-brand-gold/45 group-hover:bg-brand-gold">
                    <ArrowUpRight className="h-4 w-4" />
                  </span>
                </div>

                <h2 className="mt-6 text-xl font-semibold leading-[1.15] tracking-[-0.035em] text-brand-ink sm:text-2xl">{service.title}</h2>
                <p className="mt-3 line-clamp-3 text-sm font-normal leading-6 text-brand-muted">{service.shortDescription}</p>

                <div className="mt-auto grid grid-cols-2 gap-4 border-t border-brand-navy/8 pt-5">
                  <div>
                    <p className="text-[9px] font-semibold uppercase tracking-[0.1em] text-brand-muted">Biaya layanan</p>
                    <p className="mt-1 text-sm font-semibold text-brand-ink">{servicePriceLabel(service.startingPrice, service.priceType)}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[9px] font-semibold uppercase tracking-[0.1em] text-brand-muted">Estimasi</p>
                    <p className="mt-1 inline-flex items-center gap-1.5 text-xs font-semibold text-brand-ink"><Clock3 className="h-3.5 w-3.5 text-brand-gold-dark" /> {service.duration || "Menyesuaikan"}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="mt-5 rounded-[24px] border border-brand-navy/10 bg-white px-6 py-16 text-center">
            <p className="text-xl font-semibold tracking-[-0.03em] text-brand-ink">Layanan tidak ditemukan.</p>
            <p className="mt-2 text-sm font-normal text-brand-muted">Coba kata kunci lain atau kembali ke semua kategori.</p>
            <button type="button" onClick={reset} className="mt-5 rounded-xl bg-brand-navy px-4 py-2.5 text-sm font-semibold text-white">Tampilkan semua</button>
          </div>
        )}
      </div>
    </div>
  );
}

function CategoryButton({ active, count, onClick, children }: { active: boolean; count: number; onClick: () => void; children: React.ReactNode }) {
  return (
    <button type="button" onClick={onClick} className={`group flex w-full items-center justify-between gap-4 rounded-xl px-3.5 py-3 text-left text-sm transition ${active ? "border border-brand-navy/18 bg-brand-bluewash font-semibold text-brand-navy" : "border border-transparent font-semibold text-brand-muted hover:bg-brand-mist hover:text-brand-ink"}`}>
      <span>{children}</span>
      <span className={`rounded-md px-2 py-1 text-[10px] font-semibold tabular-nums ${active ? "bg-white text-brand-navy shadow-sm" : "bg-brand-cloud text-brand-muted group-hover:bg-white"}`}>{count}</span>
    </button>
  );
}
