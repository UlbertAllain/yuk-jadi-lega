import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Kebijakan Privasi",
  description: "Informasi mengenai pengelolaan data yang dikirim melalui website Yuk Jadi Legal.",
  path: "/kebijakan-privasi",
});

export default function PrivacyPage() {
  return (
    <main>
      <section className="bg-brand-paper">
        <div className="mx-auto max-w-4xl px-5 py-20 lg:px-8 lg:py-28">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-gold">
            Privasi
          </p>
          <h1 className="mt-5 text-5xl font-semibold tracking-[-0.06em] text-slate-950 sm:text-6xl">
            Kebijakan Privasi
          </h1>
          <p className="mt-6 max-w-2xl text-sm leading-7 text-slate-600">
            Kami menghargai privasi setiap pengunjung dan menggunakan informasi yang diberikan hanya untuk kebutuhan layanan yang relevan.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-5 py-16 lg:px-8 lg:py-20">
        <div className="space-y-10 text-sm leading-8 text-slate-700">
          <section>
            <h2 className="text-xl font-semibold text-slate-950">1. Informasi yang kami terima</h2>
            <p className="mt-3">
              Saat kamu mengirim formulir konsultasi, kami dapat menerima nama, nomor WhatsApp, email, layanan yang diminati, dan pesan yang kamu sampaikan.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-950">2. Penggunaan informasi</h2>
            <p className="mt-3">
              Informasi digunakan untuk menanggapi pertanyaan, memahami kebutuhanmu, melakukan tindak lanjut konsultasi, serta meningkatkan kualitas layanan dan komunikasi kami.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-950">3. Penyimpanan dan perlindungan data</h2>
            <p className="mt-3">
              Kami menerapkan pengelolaan akses yang wajar untuk membantu menjaga data yang dikirim melalui website. Informasi disimpan selama masih diperlukan untuk tujuan layanan, administrasi, atau kewajiban yang berlaku.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-950">4. Layanan pihak ketiga</h2>
            <p className="mt-3">
              Website dapat menggunakan penyedia layanan pihak ketiga untuk mendukung komunikasi, penyimpanan media, atau operasional website. Saat kamu membuka layanan eksternal seperti WhatsApp, penggunaan data juga mengikuti kebijakan platform tersebut.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-950">5. Pertanyaan tentang privasi</h2>
            <p className="mt-3">
              Untuk pertanyaan mengenai informasi yang kamu kirim melalui website, hubungi tim Yuk Jadi Legal melalui kanal kontak resmi yang tersedia di website.
            </p>
          </section>
        </div>
      </section>
    </main>
  );
}
