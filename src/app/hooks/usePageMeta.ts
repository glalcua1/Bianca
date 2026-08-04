import { useEffect } from "react";

type PageMetaOptions = {
  description?: string;
  canonical?: string;
  ogImage?: string;
};

function upsertMeta(
  selector: string,
  attributes: Record<string, string>,
  createTag: "meta" | "link" = "meta",
) {
  let el = document.querySelector(selector) as HTMLElement | null;
  if (!el) {
    el = document.createElement(createTag);
    document.head.appendChild(el);
  }
  for (const [key, value] of Object.entries(attributes)) {
    el.setAttribute(key, value);
  }
  return el;
}

export function usePageMeta(
  title: string,
  description: string,
  options: PageMetaOptions = {},
) {
  useEffect(() => {
    const previousTitle = document.title;
    document.title = title;

    const meta = document.querySelector('meta[name="description"]');
    const previousDescription = meta?.getAttribute("content") ?? "";
    meta?.setAttribute("content", description);

    const previousOgTitle = document
      .querySelector('meta[property="og:title"]')
      ?.getAttribute("content");
    const previousOgDescription = document
      .querySelector('meta[property="og:description"]')
      ?.getAttribute("content");
    const previousOgUrl = document
      .querySelector('meta[property="og:url"]')
      ?.getAttribute("content");
    const previousOgImage = document
      .querySelector('meta[property="og:image"]')
      ?.getAttribute("content");
    const previousCanonical = document
      .querySelector('link[rel="canonical"]')
      ?.getAttribute("href");
    const previousTwitterTitle = document
      .querySelector('meta[name="twitter:title"]')
      ?.getAttribute("content");
    const previousTwitterDescription = document
      .querySelector('meta[name="twitter:description"]')
      ?.getAttribute("content");

    upsertMeta('meta[property="og:title"]', {
      property: "og:title",
      content: title,
    });
    upsertMeta('meta[property="og:description"]', {
      property: "og:description",
      content: description,
    });
    upsertMeta('meta[name="twitter:title"]', {
      name: "twitter:title",
      content: title,
    });
    upsertMeta('meta[name="twitter:description"]', {
      name: "twitter:description",
      content: description,
    });

    if (options.canonical) {
      upsertMeta(
        'link[rel="canonical"]',
        { rel: "canonical", href: options.canonical },
        "link",
      );
      upsertMeta('meta[property="og:url"]', {
        property: "og:url",
        content: options.canonical,
      });
    }

    if (options.ogImage) {
      upsertMeta('meta[property="og:image"]', {
        property: "og:image",
        content: options.ogImage,
      });
      upsertMeta('meta[property="og:image:secure_url"]', {
        property: "og:image:secure_url",
        content: options.ogImage,
      });
      upsertMeta('meta[name="twitter:image"]', {
        name: "twitter:image",
        content: options.ogImage,
      });
    }

    return () => {
      document.title = previousTitle;
      meta?.setAttribute("content", previousDescription);
      if (previousOgTitle) {
        document
          .querySelector('meta[property="og:title"]')
          ?.setAttribute("content", previousOgTitle);
      }
      if (previousOgDescription) {
        document
          .querySelector('meta[property="og:description"]')
          ?.setAttribute("content", previousOgDescription);
      }
      if (previousOgUrl) {
        document
          .querySelector('meta[property="og:url"]')
          ?.setAttribute("content", previousOgUrl);
      }
      if (previousOgImage) {
        document
          .querySelector('meta[property="og:image"]')
          ?.setAttribute("content", previousOgImage);
      }
      if (previousCanonical) {
        document
          .querySelector('link[rel="canonical"]')
          ?.setAttribute("href", previousCanonical);
      }
      if (previousTwitterTitle) {
        document
          .querySelector('meta[name="twitter:title"]')
          ?.setAttribute("content", previousTwitterTitle);
      }
      if (previousTwitterDescription) {
        document
          .querySelector('meta[name="twitter:description"]')
          ?.setAttribute("content", previousTwitterDescription);
      }
    };
  }, [title, description, options.canonical, options.ogImage]);
}
