export function formatRupiah(value: number) {
  if (!value) return "Konsultasikan";
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(value);
}

export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export function formatDate(value: string | Date) {
  const date = value instanceof Date ? value : new Date(value);
  if (Number.isNaN(date.getTime())) return String(value);

  return new Intl.DateTimeFormat("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
}

export function servicePriceLabel(
  startingPrice: number,
  priceType?: "fixed" | "starting-from" | "consultation",
) {
  if (priceType === "consultation" || !startingPrice) return "Konsultasikan";
  const formatted = formatRupiah(startingPrice);
  return priceType === "fixed" ? formatted : `Mulai ${formatted}`;
}
