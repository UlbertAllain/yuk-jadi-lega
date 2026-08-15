import type { Metadata } from "next";
import { Instrument_Sans } from "next/font/google";
import "./globals.css";

const instrumentSans = Instrument_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-instrument-sans",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;

export const metadata: Metadata = {
  metadataBase: siteUrl ? new URL(siteUrl) : undefined,
  title: {
    default: "Yuk Jadi Legal — Legalitas Bisnis Lebih Mudah",
    template: "%s | Yuk Jadi Legal",
  },
  description:
    "Layanan legalitas bisnis untuk pendirian usaha, perizinan, perlindungan merek, perubahan perusahaan, dan dokumen bisnis.",
  icons: {
    icon: "/brand/yuk-jadi-legal-logo.png",
    apple: "/brand/yuk-jadi-legal-logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="id"
      data-scroll-behavior="smooth"
      className={instrumentSans.variable}
    >
      <body>{children}</body>
    </html>
  );
}
