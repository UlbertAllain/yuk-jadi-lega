export type ServiceFaq = {
  question: string;
  answer: string;
};

export type ServicePriceType = "fixed" | "starting-from" | "consultation";

export type ServiceCategory = {
  id: string;
  name: string;
  slug: string;
  description: string;
  order: number;
  published: boolean;
};

export type Service = {
  id: string;
  title: string;
  slug: string;
  categorySlug: string;
  shortDescription: string;
  description: string;
  startingPrice: number;
  priceType?: ServicePriceType;
  priceNote?: string;
  duration?: string;
  order?: number;
  featured: boolean;
  published: boolean;
  benefits: string[];
  inclusions: string[];
  requirements: string[];
  processSteps: string[];
  faqs: ServiceFaq[];
  seoTitle?: string;
  seoDescription?: string;
  keywords?: string[];
};

export type ServiceOption = Pick<Service, "id" | "title" | "slug">;

export type Article = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  content: string;
  publishedAt: string;
  featured: boolean;
  published: boolean;
  coverImageUrl?: string;
};

export type Testimonial = {
  id: string;
  name: string;
  company: string;
  role: string;
  quote: string;
  rating: number;
  featured: boolean;
  published: boolean;
  avatarUrl?: string;
};

export type Partner = {
  id: string;
  name: string;
  type: "partner" | "client";
  website?: string;
  logoUrl?: string;
  published: boolean;
  order: number;
};

export type Faq = {
  id: string;
  question: string;
  answer: string;
  category: string;
  order: number;
  published: boolean;
};

export type TeamMember = {
  id: string;
  name: string;
  role: string;
  bio: string;
  photoUrl?: string;
  order: number;
  published: boolean;
};


export type SiteStat = {
  label: string;
  value: string;
};

export type SiteSettings = {
  id: string;
  brandName: string;
  brandTagline: string;
  heroTitle: string;
  heroDescription: string;
  servicesTitle?: string;
  servicesDescription?: string;
  whyUsTitle?: string;
  whyUsDescription?: string;
  ctaTitle?: string;
  ctaDescription?: string;
  whatsapp: string;
  email: string;
  address: string;
  instagram?: string;
  linkedin?: string;
  tiktok?: string;
  officeHours?: string;
  stats: SiteStat[];
  menuServiceSlugs?: string[];
  menuCategorySlugs?: string[];
};

export type Lead = {
  id?: string;
  name: string;
  whatsapp: string;
  email?: string;
  serviceSlug?: string;
  message: string;
  source: string;
  status: "baru" | "dihubungi" | "follow-up" | "jadi-klien" | "tidak-lanjut";
  createdAt?: unknown;
  updatedAt?: unknown;
};
