import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono, Noto_Sans_Armenian, Outfit } from "next/font/google";
import "./globals.css";

const SITE_URL = "https://neostudio.space";

const inter = Inter({
  variable: "--font-ui",
  subsets: ["latin", "cyrillic"],
});

const outfit = Outfit({
  variable: "--font-playful",
  subsets: ["latin", "latin-ext"],
  weight: ["500", "600", "700", "800"],
});

const notoArmenian = Noto_Sans_Armenian({
  variable: "--font-noto-armenian",
  subsets: ["armenian", "latin"],
  weight: ["400", "500"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-code",
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Neo Studio Space — Product Engineering & AI",
    template: "%s · Neo Studio Space",
  },
  description:
    "Product studio for full-stack development, AI systems, and interface design. Live portfolio, transparent pricing, remote-first.",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: "Neo Studio Space",
    title: "Neo Studio Space — Product Engineering & AI",
    description:
      "Build products that feel inevitable. Full-stack, AI engineering, and product design.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Neo Studio Space — Product Engineering & AI",
    description:
      "Build products that feel inevitable. Full-stack, AI engineering, and product design.",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${outfit.variable} ${jetbrainsMono.variable} ${notoArmenian.variable} antialiased`}
      >
        {children}
        <div className="noise-overlay" aria-hidden="true" />
      </body>
    </html>
  );
}
