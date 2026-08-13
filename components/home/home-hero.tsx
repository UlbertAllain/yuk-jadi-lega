import Link from "next/link";
import { ArrowRight, Check, Sparkles } from "lucide-react";
import type { Partner, SiteSettings } from "@/types";
import { CmsImage } from "@/components/shared/cms-image";
import { getWhatsAppHref } from "@/lib/contact";

export function HomeHero({
  settings,
  partners,
}: {
  settings: SiteSettings;
  partners: Partner[];
}) {
  const clientCount = partners.filter((item) => item.type === "client").length;
  const partnerCount = partners.filter((item) => item.type === "partner").length;
  const whatsappHref = getWhatsAppHref(
    settings.whatsapp,
    "Halo Yuk Jadi Legal, saya ingin konsultasi mengenai legalitas bisnis.",
  );
  const consultationHref = whatsappHref || "/kontak";
  const consultationExternal = Boolean(whatsappHref);

  return (
    <>
      <section className="relative overflow-hidden bg-brand-paper">
        <div className="absolute right-[-12rem] top-[-12rem] h-[34rem] w-[34rem] rounded-full border-[90px] border-brand-sand" />
        <div className="absolute bottom-[-12rem] left-[-10rem] h-[30rem] w-[30rem] rounded-full bg-brand-green/5" />

        <div className="relative mx-auto grid min-h-[720px] max-w-7xl items-center gap-14 px-5 py-20 lg:grid-cols-[1.08fr_.92fr] lg:px-8 lg:py-28">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-brand-gold/30 bg-white/70 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-brand-gold-dark">
              <Sparkles className="h-3.5 w-3.5" />
              {settings.heroEyebrow}
            </div>

            <h1 className="mt-7 max-w-4xl text-5xl font-black leading-[.98] tracking-[-0.065em] text-slate-950 sm:text-6xl lg:text-[5.4rem]">
              {settings.heroTitle}
            </h1>
            <p className="mt-7 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg">
              {settings.heroDescription}
            </p>

            <div className="mt-9 flex flex-wrap gap-3">
              <a
                href={consultationHref}
                target={consultationExternal ? "_blank" : undefined}
                rel={consultationExternal ? "noreferrer" : undefined}
                className="inline-flex items-center gap-2 rounded-full bg-brand-green px-6 py-3.5 text-sm font-black text-white transition hover:-translate-y-0.5 hover:bg-brand-green-dark"
              >
                Konsultasi Sekarang <ArrowRight className="h-4 w-4" />
              </a>
              <Link
                href="/layanan"
                className="rounded-full border border-slate-300 bg-white/80 px-6 py-3.5 text-sm font-black text-slate-900 transition hover:border-slate-400"
              >
                Lihat Layanan
              </Link>
            </div>

            <div className="mt-9 flex flex-wrap gap-x-6 gap-y-3 text-sm font-semibold text-slate-600">
              {["Bahasa mudah dipahami", "Proses lebih jelas", "Konsultasi sesuai kebutuhan"].map(
                (item) => (
                  <span key={item} className="inline-flex items-center gap-2">
                    <Check className="h-4 w-4 text-brand-gold" />
                    {item}
                  </span>
                ),
              )}
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-lg lg:ml-auto">
            <div className="absolute -right-7 -top-8 h-28 w-28 rounded-full bg-brand-gold/15 blur-2xl" />
            <div className="animate-float-soft relative overflow-hidden rounded-[2.5rem] border border-white/80 bg-white p-6 shadow-[0_35px_90px_rgba(14,27,43,.14)] sm:p-8">
              <div className="flex items-center justify-between border-b border-slate-100 pb-5">
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.16em] text-brand-gold">
                    Gambaran alur layanan
                  </p>
                  <p className="mt-1 text-xl font-black tracking-[-0.04em] text-slate-950">
                    Pendirian PT
                  </p>
                </div>
                <span className="rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-bold text-emerald-700">
                  Sedang diproses
                </span>
              </div>

              <div className="mt-6 space-y-5">
                {[
                  ["Konsultasi kebutuhan", true],
                  ["Data & dokumen diterima", true],
                  ["Verifikasi dan proses", true],
                  ["Dokumen selesai", false],
                ].map(([label, done], index) => (
                  <div key={String(label)} className="flex items-center gap-4">
                    <div
                      className={`grid h-10 w-10 shrink-0 place-items-center rounded-full ${
                        done ? "bg-brand-green text-white" : "bg-slate-100 text-slate-400"
                      }`}
                    >
                      {done ? (
                        <Check className="h-4 w-4" />
                      ) : (
                        <span className="text-xs font-black">0{index + 1}</span>
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-bold text-slate-900">{String(label)}</p>
                      <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-slate-100">
                        <div
                          className={`h-full rounded-full ${
                            done ? "w-full bg-brand-gold" : "w-1/4 bg-slate-200"
                          }`}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <p className="mt-7 rounded-2xl bg-brand-paper p-4 text-sm leading-6 text-slate-600">
                Setiap layanan memiliki tahapan yang berbeda. Tim akan menjelaskan kebutuhan dan alurnya sebelum proses dimulai.
              </p>
            </div>
          </div>
        </div>
      </section>

      {partners.length ? (
        <section className="overflow-hidden border-y border-slate-200 bg-white py-7">
          <div className="mx-auto mb-5 flex max-w-7xl items-center justify-between px-5 lg:px-8">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-500">
              Partner & klien
            </p>
            <div className="hidden gap-2 text-xs text-slate-400 sm:flex">
              <span>{partnerCount} partner</span>
              <span>•</span>
              <span>{clientCount} klien</span>
            </div>
          </div>

          <div className="flex w-max animate-marquee px-4">
            {[false, true].map((isClone) => (
              <div
                key={isClone ? "clone" : "original"}
                aria-hidden={isClone || undefined}
                className="flex shrink-0 gap-4 pr-4"
              >
                {partners.map((item) => (
                  <PartnerBadge key={`${item.id}-${isClone}`} item={item} />
                ))}
              </div>
            ))}
          </div>
        </section>
      ) : null}
    </>
  );
}

function PartnerBadge({ item }: { item: Partner }) {
  const content = item.logoUrl ? (
    <CmsImage
      src={item.logoUrl}
      alt={item.name}
      className="max-h-8 max-w-32 object-contain"
    />
  ) : (
    item.name
  );
  const className =
    "flex h-16 min-w-52 items-center justify-center rounded-2xl border border-slate-200 bg-white px-6 text-sm font-black text-slate-700";

  if (!item.website) {
    return <div className={className}>{content}</div>;
  }

  return (
    <a
      href={item.website}
      target="_blank"
      rel="noreferrer"
      className={className}
    >
      {content}
    </a>
  );
}
