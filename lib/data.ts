import { cache } from "react";
import { adminDb } from "@/lib/firebase-admin";
import { DEFAULT_SITE_SETTINGS } from "@/lib/site-defaults";
import type {
  Article,
  CaseStudy,
  Faq,
  Partner,
  Service,
  ServiceCategory,
  SiteSettings,
  TeamMember,
  Testimonial,
} from "@/types";

function toPublicDocument<T>(data: Record<string, unknown>, id: string): T {
  const plain: Record<string, unknown> = {
    ...data,
    id,
  };

  // Internal Firestore metadata is deliberately kept out of the public DTOs.
  // This also prevents Timestamp instances from crossing the RSC -> client boundary.
  delete plain.createdAt;
  delete plain.updatedAt;

  return plain as T;
}

async function publishedCollection<T>(name: string): Promise<T[]> {
  if (!adminDb) {
    console.error(`[data] Firebase Admin belum dikonfigurasi; ${name} tidak dapat dibaca di server.`);
    return [];
  }

  try {
    const snapshot = await adminDb.collection(name).where("published", "==", true).get();

    return snapshot.docs.map((item) =>
      toPublicDocument<T>(item.data(), item.id),
    );
  } catch (error) {
    console.error(`[data] failed to read ${name}:`, error);
    return [];
  }
}

export const getServiceCategories = cache(async (): Promise<ServiceCategory[]> => {
  const items = await publishedCollection<ServiceCategory>("serviceCategories");
  return [...items].sort((a, b) => a.order - b.order);
});

export const getServices = cache(async (): Promise<Service[]> => {
  const items = await publishedCollection<Service>("services");

  return [...items].sort((a, b) => {
    const orderA = a.order ?? Number.MAX_SAFE_INTEGER;
    const orderB = b.order ?? Number.MAX_SAFE_INTEGER;
    return orderA - orderB || a.title.localeCompare(b.title, "id");
  });
});

export const getFeaturedServices = cache(async (): Promise<Service[]> => {
  const services = await getServices();
  return services.filter((service) => service.featured).slice(0, 6);
});

export const getServiceBySlug = cache(
  async (slug: string): Promise<Service | null> => {
    if (!adminDb) return null;

    try {
      const snapshot = await adminDb
        .collection("services")
        .where("slug", "==", slug)
        .where("published", "==", true)
        .limit(1)
        .get();

      if (snapshot.empty) return null;

      const item = snapshot.docs[0];
      return toPublicDocument<Service>(item.data(), item.id);
    } catch (error) {
      console.error("[data] failed to read service by slug:", error);
      return null;
    }
  },
);

export const getArticles = cache(async (): Promise<Article[]> => {
  const articles = await publishedCollection<Article>("articles");

  return [...articles].sort((a, b) => {
    if (a.featured !== b.featured) return Number(b.featured) - Number(a.featured);
    return b.publishedAt.localeCompare(a.publishedAt);
  });
});

export const getArticleBySlug = cache(
  async (slug: string): Promise<Article | null> => {
    if (!adminDb) return null;

    try {
      const snapshot = await adminDb
        .collection("articles")
        .where("slug", "==", slug)
        .where("published", "==", true)
        .limit(1)
        .get();

      if (snapshot.empty) return null;

      const item = snapshot.docs[0];
      return toPublicDocument<Article>(item.data(), item.id);
    } catch (error) {
      console.error("[data] failed to read article by slug:", error);
      return null;
    }
  },
);

export const getTestimonials = cache(async (): Promise<Testimonial[]> => {
  const testimonials = await publishedCollection<Testimonial>("testimonials");

  return [...testimonials].sort((a, b) => {
    if (a.featured !== b.featured) return Number(b.featured) - Number(a.featured);
    return a.name.localeCompare(b.name, "id");
  });
});

export const getPartners = cache(async (): Promise<Partner[]> => {
  const partners = await publishedCollection<Partner>("partners");
  return [...partners].sort((a, b) => a.order - b.order);
});

export const getFaqs = cache(async (): Promise<Faq[]> => {
  const faqs = await publishedCollection<Faq>("faqs");
  return [...faqs].sort((a, b) => a.order - b.order);
});

export const getTeamMembers = cache(async (): Promise<TeamMember[]> => {
  const team = await publishedCollection<TeamMember>("teamMembers");
  return [...team].sort((a, b) => a.order - b.order);
});

export const getCaseStudies = cache(async (): Promise<CaseStudy[]> => {
  const cases = await publishedCollection<CaseStudy>("caseStudies");

  return [...cases].sort((a, b) => {
    if (a.featured !== b.featured) return Number(b.featured) - Number(a.featured);
    return a.title.localeCompare(b.title, "id");
  });
});

export const getSiteSettings = cache(async (): Promise<SiteSettings> => {
  if (!adminDb) return DEFAULT_SITE_SETTINGS;

  try {
    const snapshot = await adminDb.collection("siteSettings").doc("main").get();
    if (!snapshot.exists) return DEFAULT_SITE_SETTINGS;

    const settings = toPublicDocument<SiteSettings>(snapshot.data() ?? {}, snapshot.id);

    return {
      ...DEFAULT_SITE_SETTINGS,
      ...settings,
      id: snapshot.id,
    };
  } catch (error) {
    console.error("[data] failed to read site settings:", error);
    return DEFAULT_SITE_SETTINGS;
  }
});
