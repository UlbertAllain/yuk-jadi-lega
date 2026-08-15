import { cache } from "react";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  query,
  where,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import { DEFAULT_SITE_SETTINGS } from "@/lib/site-defaults";
import type {
  Article,
  CaseStudy,
  Faq,
  Partner,
  KbliEntry,
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

  // Firestore Timestamp instances are not serializable across the
  // Server Component -> Client Component boundary. These fields are
  // internal CMS metadata and are not part of the public DTOs.
  delete plain.createdAt;
  delete plain.updatedAt;

  return plain as T;
}

async function publishedCollection<T>(name: string): Promise<T[]> {
  if (!db) return [];

  try {
    const snapshot = await getDocs(
      query(collection(db, name), where("published", "==", true)),
    );

    return snapshot.docs.map((item) =>
      toPublicDocument<T>(item.data(), item.id),
    );
  } catch (error) {
    console.error(`[data] failed to read ${name}:`, error);
    return [];
  }
}

export const getServiceCategories = cache(
  async (): Promise<ServiceCategory[]> => {
    const items =
      await publishedCollection<ServiceCategory>("serviceCategories");
    return [...items].sort((a, b) => a.order - b.order);
  },
);

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
    if (!db) return null;

    try {
      const snapshot = await getDocs(
        query(
          collection(db, "services"),
          where("slug", "==", slug),
          where("published", "==", true),
          limit(1),
        ),
      );

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
    if (a.featured !== b.featured)
      return Number(b.featured) - Number(a.featured);
    return b.publishedAt.localeCompare(a.publishedAt);
  });
});

export const getArticleBySlug = cache(
  async (slug: string): Promise<Article | null> => {
    if (!db) return null;

    try {
      const snapshot = await getDocs(
        query(
          collection(db, "articles"),
          where("slug", "==", slug),
          where("published", "==", true),
          limit(1),
        ),
      );

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
    if (a.featured !== b.featured)
      return Number(b.featured) - Number(a.featured);
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
    if (a.featured !== b.featured)
      return Number(b.featured) - Number(a.featured);
    return a.title.localeCompare(b.title, "id");
  });
});

export const getKbliEntries = cache(async (): Promise<KbliEntry[]> => {
  const items = await publishedCollection<KbliEntry>("kbli");
  return [...items].sort((a, b) => {
    const orderA = a.order ?? Number.MAX_SAFE_INTEGER;
    const orderB = b.order ?? Number.MAX_SAFE_INTEGER;
    return orderA - orderB || a.code.localeCompare(b.code, "id");
  });
});

export const getSiteSettings = cache(async (): Promise<SiteSettings> => {
  if (!db) return DEFAULT_SITE_SETTINGS;

  try {
    const snapshot = await getDoc(doc(db, "siteSettings", "main"));
    if (!snapshot.exists()) return DEFAULT_SITE_SETTINGS;

    const settings = toPublicDocument<SiteSettings>(
      snapshot.data(),
      snapshot.id,
    );

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
