import { MessageCircle } from "lucide-react";
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
      className="fixed bottom-5 right-5 z-40 flex items-center gap-3 border border-white/15 bg-brand-navy px-4 py-3 text-xs font-semibold text-white shadow-[0_16px_44px_rgba(7,26,52,.22)] transition hover:bg-brand-navy-dark"
    >
      <MessageCircle className="h-4 w-4 text-brand-gold-soft" />
      <span className="hidden sm:inline">Konsultasi</span>
    </a>
  );
}
