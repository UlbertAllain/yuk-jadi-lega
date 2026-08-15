import type { Metadata } from "next";

const FALLBACK_SITE_URL = "https://yuk-jadi-legal.vercel.app";
const DEFAULT_SOCIAL_IMAGE = "/brand/yuk-jadi-legal-social-preview.png";

function normalizeBaseUrl(value: string) {
  const trimmed = value.trim().replace(/\/$/, "");

  if (!/^https?:\/\//i.test(trimmed)) {
    return FALLBACK_SITE_URL;
  }

  return trimmed;
}

export function getSiteUrl() {
  return normalizeBaseUrl(
    process.env.NEXT_PUBLIC_SITE_URL || FALLBACK_SITE_URL,
  );
}

export function absoluteUrl(path = "/") {
  if (/^https?:\/\//i.test(path)) {
    return path;
  }

  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${getSiteUrl()}${normalizedPath}`;
}

type PageMetadataOptions = {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
  image?: string;
  type?: "website" | "article";
  publishedTime?: string;
};

export function createPageMetadata({
  title,
  description,
  path,
  keywords,
  image = DEFAULT_SOCIAL_IMAGE,
  type = "website",
  publishedTime,
}: PageMetadataOptions): Metadata {
  const canonicalUrl = absoluteUrl(path);
  const imageUrl = absoluteUrl(image);
  const socialImage =
    image === DEFAULT_SOCIAL_IMAGE
      ? {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: title,
        }
      : {
          url: imageUrl,
          alt: title,
        };

  const baseMetadata: Metadata = {
    title,
    description,
    keywords,
    alternates: {
      canonical: canonicalUrl,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
    },
  };

  if (type === "article") {
    return {
      ...baseMetadata,
      openGraph: {
        type: "article",
        locale: "id_ID",
        siteName: "Yuk Jadi Legal",
        url: canonicalUrl,
        title,
        description,
        images: [socialImage],
        publishedTime,
      },
    };
  }

  return {
    ...baseMetadata,
    openGraph: {
      type: "website",
      locale: "id_ID",
      siteName: "Yuk Jadi Legal",
      url: canonicalUrl,
      title,
      description,
      images: [socialImage],
    },
  };
}
