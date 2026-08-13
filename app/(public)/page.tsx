import { HomeContent } from "@/components/home/home-content";
import { HomeHero } from "@/components/home/home-hero";
import { HomeServices } from "@/components/home/home-services";
import { HomeTrust } from "@/components/home/home-trust";
import {
  getArticles,
  getCaseStudies,
  getFaqs,
  getFeaturedServices,
  getPartners,
  getServiceCategories,
  getServices,
  getSiteSettings,
  getTeamMembers,
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
    team,
    caseStudies,
  ] = await Promise.all([
    getSiteSettings(),
    getServiceCategories(),
    getFeaturedServices(),
    getServices(),
    getPartners(),
    getTestimonials(),
    getArticles(),
    getFaqs(),
    getTeamMembers(),
    getCaseStudies(),
  ]);

  return (
    <main>
      <HomeHero settings={settings} partners={partners} />
      <HomeServices
        categories={categories}
        featuredServices={featuredServices}
        settings={settings}
      />
      <HomeTrust
        caseStudies={caseStudies}
        testimonials={testimonials}
        team={team}
      />
      <HomeContent articles={articles} faqs={faqs} services={services} />
    </main>
  );
}
