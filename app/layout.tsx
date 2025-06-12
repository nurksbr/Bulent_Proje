import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "TikoBilişim - Bilişim Çözümleri",
  description: "Teknoloji ve bilişim alanında en iyi çözüm ortağınız",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr" className={inter.variable}>
      <body className="font-sans antialiased min-h-screen bg-white">
        {children}
      </body>
    </html>
  );
}
