import type { Metadata } from "next";

export default function ServicesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className="service-pages-root h-dvh overflow-hidden">{children}</div>;
}

export const metadata: Metadata = {
  robots: { index: true, follow: true },
};
