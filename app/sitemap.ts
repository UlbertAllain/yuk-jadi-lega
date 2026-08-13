import type { MetadataRoute } from "next";
import { getArticles, getServices } from "@/lib/data";

const staticRoutes = [
  "",
  "/layanan",
  "/tentang-kami",
  "/cara-kerja",
  "/artikel",
  "/faq",
  "/kontak",
  "/kebijakan-privasi",
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = (process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000").replace(
    /\/$/,
    "",
  );
  const [services, articles] = await Promise.all([getServices(), getArticles()]);

  return [
    ...staticRoutes.map((route) => ({
      url: `${baseUrl}${route}`,
    })),
    ...services.map((service) => ({
      url: `${baseUrl}/layanan/${service.slug}`,
    })),
    ...articles.map((article) => ({
      url: `${baseUrl}/artikel/${article.slug}`,
      lastModified: new Date(article.publishedAt),
    })),
  ];
}
