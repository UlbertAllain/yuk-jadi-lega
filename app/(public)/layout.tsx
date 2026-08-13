import { SiteShell } from "@/components/site/site-shell";

// Public content uses one centralized five-minute revalidation window in production.
export const revalidate = 300;

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return <SiteShell>{children}</SiteShell>;
}
