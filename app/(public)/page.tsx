import { HomeContent } from "@/components/home/home-content";
import { HomeHero } from "@/components/home/home-hero";
import { HomeServices } from "@/components/home/home-services";
import { HomeTrust } from "@/components/home/home-trust";
import { HomeProcess } from "@/components/home/home-process";
import { JsonLd } from "@/components/shared/json-ld";
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
import { absoluteUrl, createPageMetadata, getSiteUrl } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Legalitas Bisnis Lebih Mudah",
  description:
    "Layanan legalitas bisnis untuk pendirian usaha, perizinan, perlindungan merek, perubahan perusahaan, dan dokumen bisnis.",
  path: "/",
});

function socialUrls(values: Array<string | undefined>) {
  return values.filter(
    (value): value is string => Boolean(value && /^https?:\/\//i.test(value)),
  );
}

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

  const organization = {
    "@type": "Organization",
    "@id": `${getSiteUrl()}/#organization`,
    name: settings.brandName || "Yuk Jadi Legal",
    url: getSiteUrl(),
    logo: absoluteUrl("/brand/yuk-jadi-legal-logo.png"),
    description: settings.brandTagline,
    ...(settings.email ? { email: settings.email } : {}),
    ...(settings.whatsapp ? { telephone: settings.whatsapp } : {}),
    ...(settings.address ? { address: settings.address } : {}),
    ...(socialUrls([settings.instagram, settings.linkedin, settings.tiktok]).length
      ? { sameAs: socialUrls([settings.instagram, settings.linkedin, settings.tiktok]) }
      : {}),
  };

  const website = {
    "@type": "WebSite",
    "@id": `${getSiteUrl()}/#website`,
    url: getSiteUrl(),
    name: settings.brandName || "Yuk Jadi Legal",
    description: settings.brandTagline,
    publisher: {
      "@id": `${getSiteUrl()}/#organization`,
    },
    inLanguage: "id-ID",
  };

  return (
    <main>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@graph": [organization, website],
        }}
      />
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
