export function normalizeWhatsAppNumber(number: string) {
  const digits = number.replace(/\D/g, "");
  if (!digits) return "";
  if (digits.startsWith("0")) return `62${digits.slice(1)}`;
  if (digits.startsWith("8")) return `62${digits}`;
  return digits;
}

export function getWhatsAppHref(number: string, message?: string) {
  const normalized = normalizeWhatsAppNumber(number);
  if (!normalized) return null;

  const query = message ? `?text=${encodeURIComponent(message)}` : "";
  return `https://wa.me/${normalized}${query}`;
}
