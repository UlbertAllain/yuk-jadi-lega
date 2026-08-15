import type { MetadataRoute } from "next";
import { getArticles, getServices } from "@/lib/data";
import { absoluteUrl } from "@/lib/seo";

const staticRoutes = [
  { path: "", changeFrequency: "weekly" as const, priority: 1 },
  { path: "/layanan", changeFrequency: "weekly" as const, priority: 0.9 },
  { path: "/tentang-kami", changeFrequency: "monthly" as const, priority: 0.7 },
  { path: "/cara-kerja", changeFrequency: "monthly" as const, priority: 0.7 },
  { path: "/artikel", changeFrequency: "weekly" as const, priority: 0.8 },
  { path: "/kbli", changeFrequency: "monthly" as const, priority: 0.7 },
  { path: "/faq", changeFrequency: "monthly" as const, priority: 0.6 },
  { path: "/kontak", changeFrequency: "monthly" as const, priority: 0.7 },
  { path: "/kebijakan-privasi", changeFrequency: "yearly" as const, priority: 0.2 },
  { path: "/syarat-ketentuan", changeFrequency: "yearly" as const, priority: 0.2 },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [services, articles] = await Promise.all([getServices(), getArticles()]);

  return [
    ...staticRoutes.map((route) => ({
      url: absoluteUrl(route.path || "/"),
      changeFrequency: route.changeFrequency,
      priority: route.priority,
    })),
    ...services.map((service) => ({
      url: absoluteUrl(`/layanan/${service.slug}`),
      changeFrequency: "monthly" as const,
      priority: service.featured ? 0.85 : 0.75,
    })),
    ...articles.map((article) => {
      const publishedAt = new Date(article.publishedAt);

      return {
        url: absoluteUrl(`/artikel/${article.slug}`),
        lastModified: Number.isNaN(publishedAt.getTime()) ? undefined : publishedAt,
        changeFrequency: "monthly" as const,
        priority: article.featured ? 0.75 : 0.65,
        images: article.coverImageUrl ? [absoluteUrl(article.coverImageUrl)] : undefined,
      };
    }),
  ];
}
