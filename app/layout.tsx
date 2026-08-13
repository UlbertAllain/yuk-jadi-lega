import type { Metadata } from "next";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;

export const metadata: Metadata = {
  metadataBase: siteUrl ? new URL(siteUrl) : undefined,
  title: {
    default: "Yuk Jadi Legal — Legalitas Bisnis Lebih Mudah",
    template: "%s | Yuk Jadi Legal",
  },
  description:
    "Layanan legalitas bisnis untuk pendirian usaha, perizinan, perlindungan merek, perubahan perusahaan, dan dokumen bisnis.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="id">
      <body>{children}</body>
    </html>
  );
}
