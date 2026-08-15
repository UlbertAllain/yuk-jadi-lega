import { createPageMetadata } from "@/lib/seo";
import { ServicesBrowser } from "@/components/site/services-browser";
import { PublicPageHero } from "@/components/site/public-page-hero";
import { getServiceCategories, getServices } from "@/lib/data";

export const metadata = createPageMetadata({
  title: "Layanan Legalitas Bisnis",
  description: "Cari layanan pendirian perusahaan, perizinan, HKI, kontrak, pertanahan, keimigrasian, pajak, dan konsultasi di Yuk Jadi Legal.",
  path: "/layanan",
});

export default async function ServicesPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const [{ category }, categories, services] = await Promise.all([
    searchParams,
    getServiceCategories(),
    getServices(),
  ]);

  return (
    <main className="bg-brand-surface">
      <PublicPageHero
        eyebrow="Direktori layanan"
        title="Temukan layanan legal sesuai kebutuhan bisnis."
        description="Cari berdasarkan nama, kata kunci, atau kategori. Informasi biaya dan estimasi ditampilkan sejak awal agar pilihan lebih mudah dibandingkan."
        meta={
          <div className="flex items-center gap-5 text-xs font-semibold text-brand-muted">
            <span><strong className="text-brand-ink">{services.length}</strong> layanan</span>
            <span><strong className="text-brand-ink">{categories.length}</strong> kategori</span>
          </div>
        }
      />

      <section className="page-shell py-10 lg:py-14">
        <ServicesBrowser categories={categories} services={services} initialCategory={category} />
      </section>
    </main>
  );
}
