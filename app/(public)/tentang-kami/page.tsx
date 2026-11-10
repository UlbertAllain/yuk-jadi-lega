import Link from "next/link";
import { ArrowRight, Building2, FileText, ShieldCheck, UsersRound } from "lucide-react";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Tentang Kami",
  description: "Kenali tujuan Yuk Jadi Legal dan cara kami membantu pemilik usaha memahami serta mengurus kebutuhan legalitas bisnis.",
  path: "/tentang-kami",
});

const serviceAreas = [
  {
    title: "Badan usaha",
    description: "Pendirian PT, CV, Yayasan, dan badan usaha lainnya sesuai kebutuhan bisnis Anda.",
  },
  {
    title: "Perizinan",
    description: "Membantu pengurusan OSS, NIB, dan perizinan usaha sesuai kegiatan bisnis.",
  },
  {
    title: "Merek & dokumen",
    description: "Pendaftaran merek, dokumen legal, kontrak, dan kebutuhan perlindungan bisnis.",
  },
  {
    title: "Konsultasi legal",
    description: "Membantu memetakan kebutuhan dan arah awal ketika Anda belum tahu harus mulai dari mana.",
  },
] as const;

const principles = [
  {
    icon: UsersRound,
    title: "Berpihak pada kebutuhan klien",
    description: "Kami mulai dari kondisi bisnis Anda agar solusi yang diberikan tetap relevan dan realistis.",
  },
  {
    icon: FileText,
    title: "Proses yang jelas",
    description: "Setiap langkah dijelaskan dengan bahasa yang sederhana, tanpa membuat proses terasa lebih rumit.",
  },
  {
    icon: ShieldCheck,
    title: "Mengutamakan kepatuhan",
    description: "Pengurusan diarahkan agar sesuai dengan regulasi dan kebutuhan bisnis yang berlaku.",
  },
  {
    icon: Building2,
    title: "Fokus pada pertumbuhan Anda",
    description: "Legalitas yang rapi menjadi fondasi agar bisnis lebih siap berjalan dan berkembang.",
  },
] as const;

export default function AboutPage() {
  return (
    <main className="bg-brand-surface">
      <section className="border-b border-brand-navy/8 bg-white">
        <div className="page-shell py-10 sm:py-14 lg:py-16">
          <div className="grid gap-8 lg:grid-cols-12 lg:items-end lg:gap-x-14">
            <div className="motion-reveal lg:col-span-7">
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-brand-gold-dark">
                Tentang Yuk Jadi Legal
              </p>
              <h1 className="mt-4 max-w-[760px] text-[clamp(2.5rem,7vw,4.25rem)] font-bold leading-[1.01] tracking-[-0.04em] text-brand-ink lg:text-[3.95rem]">
                Legalitas bisnis seharusnya membantu usaha berjalan, bukan membuat pemiliknya bingung.
              </h1>
            </div>

            <div className="motion-reveal lg:col-span-5 lg:pb-1" style={{ animationDelay: "70ms" }}>
              <p className="text-[15px] leading-7 text-brand-muted sm:text-base sm:leading-8">
                Kami membantu pemilik usaha memahami dan mengurus legalitas dengan proses yang lebih jelas, terarah, dan mudah diikuti.
              </p>
              <Link
                href="/layanan"
                className="group mt-5 inline-flex items-center gap-2 text-sm font-semibold text-brand-navy hover:text-brand-gold-dark"
              >
                Lihat yang kami bantu
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="page-shell py-10 sm:py-12 lg:py-16">
        <div className="grid gap-7 lg:grid-cols-12 lg:gap-x-12">
          <div className="motion-reveal lg:col-span-4">
            <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-brand-gold-dark">Kenapa kami ada</p>
            <h2 className="mt-2 text-[2rem] font-bold leading-[1.05] tracking-[-0.03em] text-brand-ink sm:text-[2.45rem]">
              Berawal dari satu masalah yang sering kami lihat.
            </h2>
          </div>

          <div className="lg:col-span-8">
            <p className="motion-reveal max-w-2xl text-[15px] leading-7 text-brand-muted sm:text-base sm:leading-8">
              Banyak pemilik usaha punya ide besar dan semangat tinggi, tetapi terhambat oleh proses legalitas yang terasa rumit, membingungkan, dan memakan waktu. Tujuan kami sederhana: membuat urusan legal terasa lebih mudah dipahami, supaya legalitas menjadi fondasi bisnis, bukan beban.
            </p>

            <blockquote className="motion-reveal mt-7 border-l-2 border-brand-gold pl-5 sm:pl-6">
              <p className="max-w-2xl text-xl font-semibold leading-[1.35] tracking-[-0.02em] text-brand-ink sm:text-[1.45rem]">
                “Kami ingin pemilik usaha merasa lebih tenang karena tahu apa yang perlu dilakukan dan ke mana prosesnya berjalan.”
              </p>
            </blockquote>
          </div>
        </div>
      </section>

      <section className="border-y border-brand-navy/8 bg-white py-10 sm:py-12 lg:py-16">
        <div className="page-shell">
          <div className="max-w-3xl">
            <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-brand-gold-dark">Yang kami bantu</p>
            <h2 className="mt-2 max-w-2xl text-[2rem] font-bold leading-[1.05] tracking-[-0.03em] text-brand-ink sm:text-[2.45rem]">
              Solusi legal untuk setiap tahap perjalanan bisnis Anda.
            </h2>
          </div>

          <div className="mt-7 grid gap-3 sm:grid-cols-2 lg:mt-9">
            {serviceAreas.map((item, index) => (
              <article
                key={item.title}
                className="corporate-card motion-reveal flex min-h-[190px] flex-col p-5 sm:p-6"
                style={{ animationDelay: String(index * 60) + "ms" }}
              >
                <span className="block h-[2px] w-8 bg-brand-gold" />
                <h3 className="mt-5 text-lg font-bold leading-tight text-brand-navy-dark sm:text-xl">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-brand-muted">{item.description}</p>
                <Link
                  href="/layanan"
                  className="group mt-auto inline-flex items-center gap-2 pt-6 text-xs font-semibold text-brand-navy"
                >
                  Lihat detail
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-brand-paper py-10 sm:py-12 lg:py-16">
        <div className="page-shell">
          <div className="max-w-3xl">
            <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-brand-gold-dark">Prinsip kami</p>
            <h2 className="mt-2 max-w-xl text-[2rem] font-bold leading-[1.05] tracking-[-0.03em] text-brand-ink sm:text-[2.4rem]">
              Cara kami mendampingi Anda.
            </h2>
          </div>

          <div className="mt-7 grid gap-5 border-t border-brand-navy/10 pt-6 sm:grid-cols-2 lg:mt-9 lg:gap-x-10 lg:gap-y-8">
            {principles.map(({ icon: Icon, title, description }, index) => (
              <article
                key={title}
                className="motion-reveal grid grid-cols-[40px_minmax(0,1fr)] gap-4"
                style={{ animationDelay: String(index * 60) + "ms" }}
              >
                <span className="grid h-9 w-9 place-items-center rounded-full bg-brand-gold-pale text-brand-navy">
                  <Icon className="h-4.5 w-4.5" />
                </span>
                <div>
                  <h3 className="text-base font-bold leading-tight text-brand-ink">{title}</h3>
                  <p className="mt-1.5 text-sm leading-6 text-brand-muted">{description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-brand-navy/8 bg-brand-paper py-10 sm:py-12 lg:py-14">
        <div className="page-shell grid gap-5 sm:grid-cols-[1fr_auto] sm:items-center lg:grid-cols-12 lg:gap-x-10 xl:gap-x-12">
          <div className="lg:col-span-8">
            <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-brand-gold-dark">Siap melangkah lebih tenang?</p>
            <h2 className="mt-2 max-w-xl text-[2rem] font-bold leading-[1.05] text-brand-ink sm:text-[2.35rem]">
              Konsultasikan kebutuhan legalitas bisnis Anda.
            </h2>
            <p className="mt-2 max-w-xl text-sm leading-7 text-brand-muted">
              Kami bantu memetakan kebutuhan dan memberi arah yang sesuai dengan kondisi bisnis Anda.
            </p>
          </div>
          <Link
            href="/kontak"
            className="group inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-[9px] bg-brand-navy px-5 py-3 text-sm font-semibold text-white transition hover:bg-brand-navy-dark sm:w-auto lg:col-span-4 lg:justify-self-end"
          >
            Konsultasi sekarang
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </section>
    </main>
  );
}
