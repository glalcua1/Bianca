import { useEffect } from "react";
import {
  LAB_GROWN_FAQ_ITEMS,
  LAB_GROWN_FAQ_PATH,
  ORGANIZATION_SCHEMA,
} from "../../data/labGrownDiamondFaq";

function getOrigin() {
  if (typeof window !== "undefined") return window.location.origin;
  return ORGANIZATION_SCHEMA.url;
}

export default function FaqJsonLd() {
  useEffect(() => {
    const origin = getOrigin();
    const pageUrl = `${origin}${LAB_GROWN_FAQ_PATH}`;

    const faqPage = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: LAB_GROWN_FAQ_ITEMS.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.answer,
        },
      })),
    };

    const breadcrumb = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: origin,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Lab-Grown Diamond FAQs",
          item: pageUrl,
        },
      ],
    };

    const organization = {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: ORGANIZATION_SCHEMA.name,
      url: ORGANIZATION_SCHEMA.url,
      email: ORGANIZATION_SCHEMA.email,
      description: ORGANIZATION_SCHEMA.description,
    };

    const scripts = [faqPage, breadcrumb, organization].map((data, i) => {
      const el = document.createElement("script");
      el.type = "application/ld+json";
      el.id = `faq-jsonld-${i}`;
      el.textContent = JSON.stringify(data);
      document.head.appendChild(el);
      return el;
    });

    return () => {
      scripts.forEach((el) => el.remove());
    };
  }, []);

  return null;
}
