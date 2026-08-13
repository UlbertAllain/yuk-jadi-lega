import type { Metadata } from "next";
import { ServiceCard } from "@/components/site/service-card";
import { getServiceCategories, getServices } from "@/lib/data";

export const metadata: Metadata = {
  title: "Layanan",
  description:
    "Temukan layanan legalitas bisnis Yuk Jadi Legal berdasarkan kebutuhan usahamu.",
};

export default async function ServicesPage() {
  const [categories, services] = await Promise.all([
    getServiceCategories(),
    getServices(),
  ]);

  return (
    <main>
      <section className="bg-brand-ink text-white">
        <div className="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-28">
          <p className="text-xs font-black uppercase tracking-[0.22em] text-brand-gold-soft">
            Layanan
          </p>
          <h1 className="mt-5 max-w-5xl text-5xl font-black tracking-[-0.06em] sm:text-6xl lg:text-7xl">
            Cari berdasarkan kebutuhan bisnis, bukan istilah yang bikin bingung.
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-8 text-slate-300">
            Mulai usaha, urus perizinan, lindungi brand, atau rapikan dokumen perusahaan. Pilih kategori yang paling dekat dengan kebutuhanmu.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-28">
        <div className="space-y-20">
          {categories.map((category) => {
            const categoryServices = services.filter(
              (service) => service.categorySlug === category.slug,
            );

            if (!categoryServices.length) return null;

            return (
              <section key={category.id} id={category.slug} className="scroll-mt-28">
                <div className="grid gap-5 lg:grid-cols-[.5fr_1fr] lg:items-end">
                  <p className="text-xs font-black uppercase tracking-[0.2em] text-brand-gold">
                    {category.name}
                  </p>
                  <p className="max-w-2xl text-sm leading-7 text-slate-600">
                    {category.description}
                  </p>
                </div>

                <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                  {categoryServices.map((service) => (
                    <ServiceCard key={service.id} service={service} />
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      </section>
    </main>
  );
}
