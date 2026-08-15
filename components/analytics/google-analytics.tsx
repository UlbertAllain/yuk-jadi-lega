"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { trackAnalyticsEvent } from "@/lib/analytics";

const measurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID?.trim();

function isWhatsAppHref(href: string) {
  return href.includes("wa.me/") || href.includes("api.whatsapp.com/");
}

export function GoogleAnalytics() {
  const pathname = usePathname();

  useEffect(() => {
    if (!measurementId) return;

    window.dataLayer = window.dataLayer || [];
    window.gtag = function gtag(...args: unknown[]) {
      window.dataLayer?.push(args);
    };

    window.gtag("js", new Date());
    window.gtag("config", measurementId, {
      send_page_view: false,
    });

    const existingScript = document.querySelector<HTMLScriptElement>(
      `script[data-yjl-ga="${measurementId}"]`,
    );

    if (!existingScript) {
      const script = document.createElement("script");
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(measurementId)}`;
      script.dataset.yjlGa = measurementId;
      document.head.appendChild(script);
    }
  }, []);

  useEffect(() => {
    if (!measurementId || typeof window.gtag !== "function") return;

    window.gtag("event", "page_view", {
      page_title: document.title,
      page_location: window.location.href,
      page_path: `${pathname}${window.location.search}`,
    });
  }, [pathname]);

  useEffect(() => {
    if (!measurementId) return;

    function handleClick(event: MouseEvent) {
      const target = event.target;
      if (!(target instanceof Element)) return;

      const anchor = target.closest<HTMLAnchorElement>("a[href]");
      if (!anchor || !isWhatsAppHref(anchor.href)) return;

      trackAnalyticsEvent("contact_whatsapp", {
        source_path: window.location.pathname,
        link_text: anchor.textContent?.trim().slice(0, 80) || "whatsapp",
      });
    }

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  return null;
}
