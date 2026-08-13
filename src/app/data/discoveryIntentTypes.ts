import type { ReactNode } from "react";
import type { FaqItem } from "./labGrownDiamondFaq";

export type DiscoveryPillar = {
  id: string;
  title: string;
  description: string;
};

export type DiscoveryPathLink = {
  to: string;
  label: string;
};

export type DiscoveryIntentConfig = {
  path: string;
  seo: { title: string; description: string };
  eyebrow: string;
  h1: string;
  heroLead: string;
  sectionEyebrow: string;
  sectionTitle: string;
  sectionBody: string;
  chips?: readonly string[];
  pillarsTitle: string;
  pillars: readonly DiscoveryPillar[];
  pathsTitle: string;
  pathsBody: string;
  pathLinks: readonly DiscoveryPathLink[];
  faqTitle: string;
  faqItems: FaqItem[];
  jsonLdPrefix: string;
  breadcrumbName: string;
  sourcePage: string;
  finalTitle: string;
  finalBody: string;
  afterFaq?: ReactNode;
};
