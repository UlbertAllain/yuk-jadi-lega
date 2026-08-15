import { FloatingConsultation } from "@/components/site/floating-consultation";
import { SiteFooter } from "@/components/site/site-footer";
import { SiteHeader } from "@/components/site/site-header";
import { getServiceCategories, getServices, getSiteSettings } from "@/lib/data";

export async function SiteShell({ children }: { children: React.ReactNode }) {
  const [settings, services, categories] = await Promise.all([
    getSiteSettings(),
    getServices(),
    getServiceCategories(),
  ]);

  return (
    <>
      <SiteHeader settings={settings} services={services} categories={categories} />
      {children}
      <SiteFooter settings={settings} services={services} />
      <FloatingConsultation whatsapp={settings.whatsapp} />
    </>
  );
}
