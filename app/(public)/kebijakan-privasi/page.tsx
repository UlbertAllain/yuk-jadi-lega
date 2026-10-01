import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Kebijakan Privasi",
  description: "Informasi mengenai pengelolaan data yang dikirim melalui website Yuk Jadi Legal.",
  path: "/kebijakan-privasi",
});

const sections = [
  [
    "1. Informasi yang kami terima",
    "Saat Anda mengirim formulir konsultasi, kami dapat menerima nama, nomor WhatsApp, email, layanan yang diminati, dan pesan yang Anda sampaikan.",
  ],
  [
    "2. Penggunaan informasi",
    "Informasi digunakan untuk menanggapi pertanyaan, memahami kebutuhan Anda, melakukan tindak lanjut konsultasi, serta meningkatkan kualitas layanan dan komunikasi kami.",
  ],
  [
    "3. Penyimpanan dan perlindungan data",
    "Kami menerapkan pengelolaan akses yang wajar untuk membantu menjaga data yang dikirim melalui website. Informasi disimpan selama masih diperlukan untuk tujuan layanan, administrasi, atau kewajiban yang berlaku.",
  ],
  [
    "4. Layanan pihak ketiga",
    "Website dapat menggunakan penyedia layanan pihak ketiga untuk mendukung komunikasi, penyimpanan media, atau operasional website. Saat Anda membuka layanan eksternal seperti WhatsApp, penggunaan data juga mengikuti kebijakan platform tersebut.",
  ],
  [
    "5. Pertanyaan tentang privasi",
    "Untuk pertanyaan mengenai informasi yang Anda kirim melalui website, hubungi tim Yuk Jadi Legal melalui kanal kontak resmi yang tersedia di website.",
  ],
] as const;

export default function PrivacyPage() {
  return (
    <main className="bg-brand-surface">
      <header className="border-b border-brand-navy/10 bg-brand-paper">
        <div className="page-shell max-w-4xl py-9 sm:py-11 lg:py-14">
          <p className="text-xs font-semibold uppercase tracking-[0.11em] text-brand-gold-dark">Dokumen legal</p>
          <h1 className="mt-2 text-[clamp(2.2rem,4vw,3.5rem)] font-semibold leading-[1.05] tracking-[-0.045em] text-brand-ink">
            Kebijakan Privasi
          </h1>
          <p className="mt-4 max-w-2xl text-[15px] leading-7 text-brand-muted">
            Kami menghargai privasi setiap pengunjung dan menggunakan informasi yang diberikan hanya untuk kebutuhan layanan yang relevan.
          </p>
        </div>
      </header>

      <section className="page-shell max-w-4xl py-8 sm:py-10 lg:py-14">
        <div className="grid gap-3">
          {sections.map(([title, body]) => (
            <section key={title} className="rounded-[12px] border border-brand-navy/10 bg-white p-4 sm:p-5">
              <h2 className="text-base font-semibold text-brand-ink sm:text-lg">{title}</h2>
              <p className="mt-2 text-sm leading-7 text-brand-muted">{body}</p>
            </section>
          ))}
        </div>
      </section>
    </main>
  );
}
