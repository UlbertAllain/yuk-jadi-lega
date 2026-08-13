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
      className="fixed bottom-5 right-5 z-40 flex items-center gap-3 rounded-full border border-white/20 bg-brand-green px-4 py-3 text-sm font-bold text-white shadow-2xl shadow-slate-900/20 transition hover:-translate-y-1"
    >
      <MessageCircle className="h-5 w-5" />
      <span className="hidden sm:inline">Konsultasi</span>
    </a>
  );
}
