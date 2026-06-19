import type { Metadata } from "next";
import { EB_Garamond, Inter, Noto_Sans_Armenian } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-ui",
  subsets: ["latin", "cyrillic"],
});

const editorial = EB_Garamond({
  variable: "--font-editorial",
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500"],
});

const notoArmenian = Noto_Sans_Armenian({
  variable: "--font-noto-armenian",
  subsets: ["armenian", "latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "Selected Work — Full-stack & AI Engineer",
  description:
    "Curated portfolio of product engineering, AI systems, and interface design.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body
        className={`${inter.variable} ${editorial.variable} ${notoArmenian.variable} antialiased`}
      >
        {children}
        <div className="noise-overlay" aria-hidden="true" />
      </body>
    </html>
  );
}
