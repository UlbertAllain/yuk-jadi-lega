import { HomeContent } from "@/components/home/home-content";
import { HomeHero } from "@/components/home/home-hero";
import { HomeServices } from "@/components/home/home-services";
import { HomeTrust } from "@/components/home/home-trust";
import { HomeProcess } from "@/components/home/home-process";
import {
  getArticles,
  getFaqs,
  getFeaturedServices,
  getPartners,
  getServiceCategories,
  getServices,
  getSiteSettings,
  getTestimonials,
} from "@/lib/data";

export default async function HomePage() {
  const [
    settings,
    categories,
    featuredServices,
    services,
    partners,
    testimonials,
    articles,
    faqs,
  ] = await Promise.all([
    getSiteSettings(),
    getServiceCategories(),
    getFeaturedServices(),
    getServices(),
    getPartners(),
    getTestimonials(),
    getArticles(),
    getFaqs(),
  ]);

  return (
    <main>
      <HomeHero settings={settings} services={services} categories={categories} />
      <HomeServices
        categories={categories}
        featuredServices={featuredServices}
        settings={settings}
      />
      <HomeTrust partners={partners} testimonials={testimonials} />
      <HomeProcess />
      <HomeContent articles={articles} faqs={faqs} settings={settings} />
    </main>
  );
}
