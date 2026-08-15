import type { Metadata } from "next";
import { Instrument_Sans } from "next/font/google";
import { getSiteUrl } from "@/lib/seo";
import "./globals.css";

const instrumentSans = Instrument_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-instrument-sans",
});

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  applicationName: "Yuk Jadi Legal",
  title: {
    default: "Yuk Jadi Legal — Legalitas Bisnis Lebih Mudah",
    template: "%s | Yuk Jadi Legal",
  },
  description:
    "Layanan legalitas bisnis untuk pendirian usaha, perizinan, perlindungan merek, perubahan perusahaan, dan dokumen bisnis.",
  creator: "Yuk Jadi Legal",
  publisher: "Yuk Jadi Legal",
  category: "business",
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
