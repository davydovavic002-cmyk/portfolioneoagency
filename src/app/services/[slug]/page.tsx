import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ServiceLandingPage } from "@/components/seo/ServiceLandingPage";
import {
  getServicePage,
  SERVICE_PAGE_SLUGS,
  type ServicePageSlug,
} from "@/lib/seo/service-pages";
import { SITE_CONFIG } from "@/config/site";

const SITE_URL = "https://neostudio.space";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return SERVICE_PAGE_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = getServicePage(slug);
  if (!page) return {};

  const url = `${SITE_URL}/services/${page.slug}`;

  return {
    title: page.metaTitle,
    description: page.metaDescription,
    keywords: page.keywords,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      url,
      siteName: SITE_CONFIG.brandName,
      title: page.metaTitle,
      description: page.metaDescription,
    },
    twitter: {
      card: "summary_large_image",
      title: page.metaTitle,
      description: page.metaDescription,
    },
  };
}

function buildJsonLd(page: NonNullable<ReturnType<typeof getServicePage>>) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ProfessionalService",
        "@id": `${SITE_URL}/services/${page.slug}#service`,
        name: page.title,
        description: page.metaDescription,
        url: `${SITE_URL}/services/${page.slug}`,
        provider: {
          "@type": "Organization",
          name: SITE_CONFIG.brandName,
          url: SITE_URL,
        },
        areaServed: "Worldwide",
        priceRange: page.package.price,
      },
      {
        "@type": "FAQPage",
        mainEntity: page.faq.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: item.answer,
          },
        })),
      },
    ],
  };
}

export default async function ServicePage({ params }: PageProps) {
  const { slug } = await params;
  const page = getServicePage(slug);

  if (!page) notFound();

  const jsonLd = buildJsonLd(page);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ServiceLandingPage page={page} />
    </>
  );
}
