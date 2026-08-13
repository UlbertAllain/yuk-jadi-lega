import type { Metadata } from "next";
import { ArrowRight, Check } from "lucide-react";
import { getWhatsAppHref } from "@/lib/contact";
import { getSiteSettings } from "@/lib/data";

export const metadata: Metadata = {
  title: "Cara Kerja",
  description:
    "Alur konsultasi dan pengurusan layanan Yuk Jadi Legal dari awal sampai selesai.",
};

const steps = [
  {
    number: "01",
    title: "Ceritakan kebutuhanmu",
    description:
      "Mulai dengan kondisi bisnis dan masalah yang ingin diselesaikan. Kamu tidak harus sudah tahu nama layanan atau istilah hukumnya.",
  },
  {
    number: "02",
    title: "Pemetaan layanan",
    description:
      "Tim membantu mengarahkan kebutuhan, ruang lingkup, data yang perlu disiapkan, serta hal yang perlu dikonfirmasi.",
  },
  {
    number: "03",
    title: "Lengkapi data",
    description:
      "Kamu menerima checklist agar pengumpulan data dan dokumen lebih terstruktur.",
  },
  {
    number: "04",
    title: "Proses berjalan",
    description:
      "Pengurusan dilakukan sesuai ruang lingkup. Perubahan atau kebutuhan tambahan dikomunikasikan terlebih dahulu.",
  },
  {
    number: "05",
    title: "Hasil diserahkan",
    description:
      "Setelah proses selesai, dokumen atau hasil diserahkan dan kebutuhan lanjutan dijelaskan bila relevan.",
  },
];

const notes = [
  "Estimasi waktu tergantung kelengkapan data dan proses pihak atau instansi terkait.",
  "Harga final mengikuti ruang lingkup layanan yang disepakati.",
  "Beberapa layanan dapat membutuhkan dokumen atau tahapan tambahan.",
  "Untuk kondisi spesifik, konsultasi diperlukan agar arahan yang diberikan lebih tepat.",
];

export default async function HowItWorksPage() {
  const settings = await getSiteSettings();
  const message = "Halo Yuk Jadi Legal, saya ingin mulai konsultasi mengenai legalitas bisnis.";
  const whatsappHref = getWhatsAppHref(settings.whatsapp, message);
  const consultationHref = whatsappHref || "/kontak";

  return (
    <main>
      <section className="bg-brand-ink text-white">
        <div className="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-28">
          <p className="text-xs font-black uppercase tracking-[0.22em] text-brand-gold-soft">
            Cara kerja
          </p>
          <h1 className="mt-5 max-w-5xl text-5xl font-black tracking-[-0.06em] sm:text-6xl lg:text-7xl">
            Dari “harus mulai dari mana?” sampai prosesnya selesai.
          </h1>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-20 lg:px-8 lg:py-28">
        <div className="space-y-4">
          {steps.map((step) => (
            <div
              key={step.number}
              className="grid gap-6 rounded-[2rem] border border-slate-200 p-7 sm:grid-cols-[90px_1fr] sm:p-8"
            >
              <p className="text-5xl font-black tracking-[-0.07em] text-slate-200">
                {step.number}
              </p>
              <div>
                <h2 className="text-2xl font-black tracking-[-0.045em] text-slate-950">
                  {step.title}
                </h2>
                <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-600">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-brand-paper py-20 lg:py-28">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 lg:grid-cols-2 lg:px-8">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.2em] text-brand-gold">
              Yang perlu diketahui
            </p>
            <h2 className="mt-4 text-4xl font-black tracking-[-0.055em] text-slate-950">
              Setiap layanan bisa punya alur berbeda.
            </h2>
          </div>
          <div className="space-y-4">
            {notes.map((item) => (
              <p
                key={item}
                className="flex gap-3 rounded-2xl bg-white p-5 text-sm leading-7 text-slate-700"
              >
                <Check className="mt-1 h-4 w-4 shrink-0 text-brand-green" />
                {item}
              </p>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-28">
        <div className="rounded-[2.5rem] bg-brand-green p-8 text-white sm:p-12 lg:p-16">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-brand-gold-soft">
            Siap mulai?
          </p>
          <h2 className="mt-4 max-w-3xl text-4xl font-black tracking-[-0.055em] sm:text-5xl">
            Mulai dari konsultasi. Bukan dari menebak sendiri.
          </h2>
          <a
            href={consultationHref}
            target={whatsappHref ? "_blank" : undefined}
            rel={whatsappHref ? "noreferrer" : undefined}
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-black text-brand-green"
          >
            Mulai Konsultasi
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </section>
    </main>
  );
}
