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
      ]
        .join(" ")
        .toLowerCase();

      return haystack.includes(normalized);
    });
  }, [category, categoryMap, query, services]);

  const activeCategory = categories.find((item) => item.slug === category);

  function reset() {
    setQuery("");
    setCategory("all");
  }

  return (
    <div className="grid gap-10 lg:grid-cols-[250px_minmax(0,1fr)] xl:grid-cols-[270px_minmax(0,1fr)] xl:gap-12">
      <aside className="hidden lg:block">
        <div className="sticky top-28 border-y border-brand-navy/12 py-4">
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-brand-muted">Kategori</p>
          <div className="mt-3">
            <CategoryButton active={category === "all"} count={services.length} onClick={() => setCategory("all")}>
              Semua layanan
            </CategoryButton>
            {categories.map((item) => (
              <CategoryButton
                key={item.id}
                active={category === item.slug}
                count={categoryCounts.get(item.slug) || 0}
                onClick={() => setCategory(item.slug)}
              >
                {item.name}
              </CategoryButton>
            ))}
          </div>
        </div>
      </aside>

      <div className="min-w-0">
        <div className="border-y border-brand-navy/12 py-3.5 sm:py-4">
          <div className="grid gap-3 md:grid-cols-[minmax(0,1fr)_230px]">
            <div className="relative">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-brand-navy" />
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Cari PT, CV, merek, NIB..."
                className="h-[52px] w-full rounded-[8px] border border-brand-navy/14 bg-white pl-12 pr-11 sm:h-14 text-sm font-medium text-brand-ink outline-none transition placeholder:font-normal placeholder:text-brand-muted/75 focus:border-brand-gold/55"
              />
              {query ? (
                <button
                  type="button"
                  onClick={() => setQuery("")}
                  className="absolute right-2 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center text-brand-muted transition hover:text-brand-navy"
                  aria-label="Hapus pencarian"
                >
                  <X className="h-4 w-4" />
                </button>
              ) : null}
            </div>

            <label className="lg:hidden">
              <span className="sr-only">Pilih kategori</span>
              <select
                value={category}
                onChange={(event) => setCategory(event.target.value)}
                className="h-[52px] w-full rounded-[8px] border border-brand-navy/14 bg-white px-4 sm:h-14 text-sm font-semibold text-brand-ink outline-none focus:border-brand-gold/55"
              >
                <option value="all">Semua kategori</option>
                {categories.map((item) => (
                  <option key={item.id} value={item.slug}>
                    {item.name}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <div className="mt-3 flex items-center justify-between gap-3">
            <p className="min-w-0 truncate text-xs font-medium text-brand-muted sm:text-sm">
              <strong className="font-semibold text-brand-ink">{filtered.length}</strong> layanan
              {activeCategory ? <> · {activeCategory.name}</> : null}
              {query ? <> · “{query}”</> : null}
            </p>
            {query || category !== "all" ? (
              <button type="button" onClick={reset} className="text-xs font-semibold text-brand-navy hover:text-brand-gold-dark">
                Reset
              </button>
            ) : null}
          </div>
        </div>

        {filtered.length ? (
          <div className="mt-6 divide-y divide-brand-navy/10 border-y border-brand-navy/12 sm:mt-8">
            {filtered.map((service, index) => (
              <Link
                key={service.id}
                href={`/layanan/${service.slug}`}
                className="group grid gap-3 py-5 sm:gap-4 sm:py-6 md:grid-cols-[56px_minmax(0,1fr)_190px_28px] md:items-center"
              >
                <span className="text-[10px] font-semibold tabular-nums text-brand-gold-dark sm:text-xs">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <div className="min-w-0">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.1em] text-brand-muted">
                    {categoryMap.get(service.categorySlug) || "Layanan legal"}
                  </p>
                  <h2 className="mt-1 text-lg font-semibold leading-[1.18] tracking-[-0.025em] text-brand-ink sm:mt-2 sm:text-2xl">
                    {service.title}
                  </h2>
                  <p className="mt-2 line-clamp-2 text-[13px] leading-5 text-brand-muted sm:text-sm sm:leading-6">{service.shortDescription}</p>
                </div>

                <div className="grid grid-cols-2 gap-4 border-t border-brand-navy/8 pt-3 text-xs md:block md:border-0 md:pt-0 md:text-right">
                  <div>
                    <p className="text-[9px] font-semibold uppercase tracking-[0.1em] text-brand-muted">Biaya</p>
                    <p className="mt-1 font-semibold text-brand-ink">
                      {servicePriceLabel(service.startingPrice, service.priceType)}
                    </p>
                  </div>
                  <div className="md:mt-4">
                    <p className="text-[9px] font-semibold uppercase tracking-[0.1em] text-brand-muted">Estimasi</p>
                    <p className="mt-1 inline-flex items-center gap-1.5 font-semibold text-brand-ink">
                      <Clock3 className="h-3.5 w-3.5 text-brand-gold-dark" />
                      {service.duration || "Menyesuaikan"}
                    </p>
                  </div>
                </div>

                <ArrowUpRight className="hidden h-5 w-5 text-brand-navy transition group-hover:text-brand-gold-dark md:block" />
              </Link>
            ))}
          </div>
        ) : (
          <div className="mt-6 border-y border-brand-navy/12 py-12 text-center sm:mt-8 sm:py-14">
            <p className="text-xl font-semibold tracking-[-0.03em] text-brand-ink">Layanan tidak ditemukan.</p>
            <p className="mt-2 text-sm text-brand-muted">Coba kata kunci lain atau kembali ke semua kategori.</p>
            <button type="button" onClick={reset} className="mt-5 text-sm font-semibold text-brand-navy hover:text-brand-gold-dark">
              Tampilkan semua
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function CategoryButton({
  active,
  count,
  onClick,
  children,
}: {
  active: boolean;
  count: number;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex w-full items-center justify-between gap-4 border-b border-brand-navy/8 py-3 text-left text-sm transition last:border-b-0 ${
        active ? "font-semibold text-brand-navy" : "font-medium text-brand-muted hover:text-brand-ink"
      }`}
    >
      <span>{children}</span>
      <span className="text-[10px] font-semibold tabular-nums text-brand-muted">{count}</span>
    </button>
  );
}
