import { ArrowUpRight, MessageCircle } from "lucide-react";
import { getWhatsAppHref } from "@/lib/contact";

export function FloatingConsultation({ whatsapp }: { whatsapp: string }) {
  const href = getWhatsAppHref(
    whatsapp,
    "Halo Yuk Jadi Legal, saya ingin konsultasi dan belum yakin layanan apa yang saya butuhkan.",
  );
  if (!href) return null;

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label="Konsultasi melalui WhatsApp"
      className="fixed bottom-3 left-4 right-4 z-40 flex min-h-12 items-center justify-between gap-3 border border-white/15 bg-brand-navy px-4 py-3 text-sm font-semibold text-white shadow-[0_10px_30px_rgba(7,26,52,.18)] transition hover:bg-brand-navy-dark sm:bottom-5 sm:left-auto sm:right-5 sm:min-h-0 sm:w-auto sm:text-xs"
    >
      <span className="flex items-center gap-2.5">
        <MessageCircle className="h-4 w-4 text-brand-gold-soft" />
        Konsultasi via WhatsApp
      </span>
      <ArrowUpRight className="h-4 w-4 text-brand-gold-soft sm:hidden" />
    </a>
  );
}
