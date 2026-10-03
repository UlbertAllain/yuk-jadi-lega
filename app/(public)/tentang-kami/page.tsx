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

const serviceAreaCardLayout = [
  "asym-shape-a bg-brand-navy-dark text-white lg:min-h-[246px]",
  "asym-shape-b bg-[#ead477] text-brand-navy-dark lg:mt-10 lg:min-h-[205px]",
  "asym-shape-c bg-white text-brand-ink lg:mt-2 lg:min-h-[232px]",
  "asym-shape-d bg-brand-bluewash text-brand-ink lg:mt-8 lg:min-h-[214px]",
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
      <section className="relative overflow-hidden border-b border-brand-navy/8 bg-brand-paper">
        <div className="pointer-events-none absolute -right-24 -top-28 h-72 w-72 rounded-full border border-brand-navy/[0.06] sm:h-96 sm:w-96" />
        <div className="page-shell relative py-10 sm:py-14 lg:py-20">
          <div className="grid gap-8 lg:grid-cols-12 lg:gap-x-12">
            <div className="motion-reveal lg:col-span-4 lg:pt-2">
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-brand-gold-dark">
                Tentang Yuk Jadi Legal
              </p>
              <p className="mt-5 max-w-sm text-[15px] leading-7 text-brand-muted">
                Kami membantu pemilik usaha memahami dan mengurus legalitas tanpa membuat prosesnya terasa lebih rumit dari yang seharusnya.
              </p>
              <Link
                href="/layanan"
                className="group mt-5 inline-flex items-center gap-2 text-sm font-semibold text-brand-navy hover:text-brand-gold-dark"
              >
                Lihat yang kami bantu
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>

            <div className="motion-reveal lg:col-span-8">
              <div className="h-[2px] w-12 bg-brand-gold" />
              <h1 className="editorial-heading mt-5 max-w-[820px] text-[clamp(2.65rem,7vw,5.2rem)] font-semibold leading-[.98] tracking-[-0.05em] text-brand-ink lg:text-[4.7rem]">
                Legalitas bisnis seharusnya membantu usaha berjalan, bukan membuat pemiliknya bingung.
              </h1>

              <div className="mt-7 flex flex-wrap gap-x-7 gap-y-3 border-t border-brand-navy/10 pt-5 text-xs font-semibold text-brand-ink">
                <span>Lebih jelas</span>
                <span>Lebih terarah</span>
                <span>Lebih manusiawi</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="page-shell py-9 sm:py-11 lg:grid lg:grid-cols-12 lg:gap-x-10 lg:py-16 xl:gap-x-12">
        <div className="motion-reveal lg:col-span-4">
          <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-brand-gold-dark">Kenapa kami ada</p>
          <h2 className="editorial-heading mt-2 text-[2.15rem] font-semibold leading-[1.02] tracking-[-0.035em] text-brand-ink sm:text-[3rem]">
            Berawal dari satu masalah yang sering kami lihat.
          </h2>
        </div>

        <div className="mt-5 lg:col-span-8 lg:mt-0">
          <p className="motion-reveal text-[15px] leading-7 text-brand-muted sm:text-base sm:leading-8">
            Banyak pemilik usaha punya ide besar dan semangat tinggi, tetapi terhambat oleh proses legalitas yang terasa rumit, membingungkan, dan memakan waktu. Tujuan kami sederhana: membuat urusan legal terasa lebih mudah dipahami, supaya legalitas menjadi fondasi bisnis, bukan beban.
          </p>

        <blockquote className="motion-reveal premium-card mt-7 bg-brand-paper/70 p-5 sm:p-7">
          <span className="editorial-heading text-4xl leading-none text-brand-gold">“</span>
          <p className="editorial-heading mt-1 text-xl font-semibold leading-[1.25] tracking-[-0.02em] text-brand-ink sm:text-[1.6rem]">
            Kami ingin pemilik usaha bisa merasa lebih tenang karena tahu apa yang perlu dilakukan dan ke mana prosesnya berjalan.
          </p>
          <div className="mt-4 h-[2px] w-10 bg-brand-gold" />
        </blockquote>
        </div>
      </section>

      <section className="border-y border-brand-navy/8 bg-white py-9 sm:py-11 lg:py-16">
        <div className="page-shell">
          <div className="max-w-3xl">
            <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-brand-gold-dark">Yang kami bantu</p>
            <h2 className="editorial-heading mt-2 max-w-2xl text-[2.1rem] font-semibold leading-[1.03] tracking-[-0.035em] text-brand-ink sm:text-[2.8rem]">
              Solusi legal untuk setiap tahap perjalanan bisnis Anda.
            </h2>
          </div>

          <div className="mt-7 grid gap-3 sm:grid-cols-2 lg:mt-9 lg:grid-cols-[1.15fr_.82fr_1.05fr_.9fr] lg:items-start lg:gap-4">
            {serviceAreas.map((item, index) => (
              <article
                key={item.title}
                className={"asym-card motion-reveal flex flex-col p-5 sm:p-6 " + serviceAreaCardLayout[index]}
                style={{ animationDelay: String(index * 70) + "ms" }}
              >
                <span className={"block h-[2px] w-8 " + (index === 0 ? "bg-brand-gold" : "bg-brand-navy")} />
                <h3 className={"mt-5 text-lg font-bold leading-tight sm:text-xl " + (index === 0 ? "text-white" : "text-brand-navy-dark")}>
                  {item.title}
                </h3>
                <p className={"mt-2 text-sm leading-6 " + (index === 0 ? "text-white/70" : "text-brand-muted")}>{item.description}</p>
                <Link
                  href="/layanan"
                  className={"group mt-auto inline-flex items-center gap-2 pt-6 text-xs font-semibold " + (index === 0 ? "text-brand-gold-soft" : "text-brand-navy")}
                >
                  Lihat detail
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-brand-surface py-9 sm:py-11 lg:py-16">
        <div className="page-shell">
          <div className="max-w-3xl">
            <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-brand-gold-dark">Prinsip kami</p>
            <h2 className="editorial-heading mt-2 max-w-xl text-[2.1rem] font-semibold leading-[1.03] tracking-[-0.035em] text-brand-ink sm:text-[2.8rem]">
              Cara kami mendampingi Anda.
            </h2>
            <p className="mt-3 max-w-xl text-sm leading-7 text-brand-muted">
              Kami tidak hanya membantu mengurus dokumen, tetapi juga membantu Anda memahami langkah yang sedang dijalankan.
            </p>
          </div>

          <div className="flow-list mx-auto mt-8 max-w-5xl lg:mt-10">
            {principles.map(({ icon: Icon, title, description }, index) => (
              <article
                key={title}
                className={"flow-card motion-reveal " + (index % 2 === 1 ? "flow-card-offset" : "")}
                style={{ animationDelay: String(index * 70) + "ms" }}
              >
                <span className="flow-node" aria-hidden="true" />
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-brand-gold-pale text-brand-navy sm:h-12 sm:w-12">
                  <Icon className="h-5 w-5" />
                </span>
                <div className="min-w-0">
                  <h3 className="editorial-heading text-lg font-semibold leading-tight text-brand-ink">{title}</h3>
                  <p className="mt-1 text-sm leading-6 text-brand-muted">{description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden border-t border-brand-navy/8 bg-brand-paper py-10 sm:py-12 lg:py-14">
        <div className="visual-cta-leaves pointer-events-none absolute inset-y-0 right-0 w-[150px] bg-contain bg-right-bottom bg-no-repeat sm:w-[220px]" />
        <div className="page-shell relative grid gap-5 sm:grid-cols-[1fr_auto] sm:items-center lg:grid-cols-12 lg:gap-x-10 xl:gap-x-12">
          <div className="lg:col-span-8">
            <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-brand-gold-dark">Siap melangkah lebih tenang?</p>
            <h2 className="editorial-heading mt-2 max-w-xl text-[2rem] font-semibold leading-[1.04] text-brand-ink sm:text-[2.5rem]">
              Konsultasikan kebutuhan legalitas bisnis Anda sekarang.
            </h2>
            <p className="mt-2 max-w-xl text-sm leading-7 text-brand-muted">
              Kami bantu memetakan kebutuhan dan memberi arah yang sesuai dengan kondisi bisnis Anda.
            </p>
          </div>
          <Link
            href="/kontak"
            className="group inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-[10px] bg-brand-navy px-5 py-3 text-sm font-semibold text-white transition hover:bg-brand-navy-dark sm:w-auto lg:col-span-4 lg:justify-self-end"
          >
            Konsultasi sekarang
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </section>
    </main>
  );
}
