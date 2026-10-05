import { GoogleAnalytics } from "@/components/analytics/google-analytics";
import { SiteShell } from "@/components/site/site-shell";
import { MotionObserver } from "@/components/site/motion-observer";

// Public content uses one centralized five-minute revalidation window in production.
export const revalidate = 300;

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <MotionObserver />
      <div className="public-site">
        <SiteShell>{children}</SiteShell>
      </div>
      <GoogleAnalytics />
    </>
  );
}
