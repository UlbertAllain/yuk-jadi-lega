import { FloatingConsultation } from "@/components/site/floating-consultation";
import { SiteFooter } from "@/components/site/site-footer";
import { SiteHeader } from "@/components/site/site-header";
import { getServices, getSiteSettings } from "@/lib/data";

export async function SiteShell({ children }: { children: React.ReactNode }) {
  const [settings, services] = await Promise.all([getSiteSettings(), getServices()]);

  return (
    <>
      <SiteHeader settings={settings} />
      {children}
      <SiteFooter settings={settings} services={services} />
      <FloatingConsultation whatsapp={settings.whatsapp} />
    </>
  );
}
