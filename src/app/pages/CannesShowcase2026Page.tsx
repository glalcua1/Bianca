import { useRef } from "react";
import { usePageMeta } from "../hooks/usePageMeta";
import { useContentProtection } from "../hooks/useContentProtection";
import SiteNav from "../components/SiteNav";
import CannesEditorialStory from "../components/cannes/CannesEditorialStory";
import CannesJewelleryGallery from "../components/cannes/CannesJewelleryGallery";
import CannesManyaSpotlight from "../components/cannes/CannesManyaSpotlight";
import CannesCraftsmanship from "../components/cannes/CannesCraftsmanship";
import CannesQuoteBlock from "../components/cannes/CannesQuoteBlock";
import CannesCtaSection from "../components/cannes/CannesCtaSection";
import CannesPageFooter from "../components/cannes/CannesPageFooter";
import { CANNES_SEO } from "../data/cannesShowcase2026";

export default function CannesShowcase2026Page() {
  usePageMeta(CANNES_SEO.title, CANNES_SEO.description);
  const pageRef = useRef<HTMLElement>(null);
  useContentProtection(pageRef);

  return (
    <main ref={pageRef} className="bg-[#faf8f5]">
      <div className="bg-[#1d3c34]">
        <SiteNav activeItem="cannes-collection" />
      </div>
      <CannesEditorialStory />
      <CannesJewelleryGallery />
      <CannesManyaSpotlight />
      <CannesCraftsmanship />
      <CannesQuoteBlock />
      <CannesCtaSection />
      <CannesPageFooter />
    </main>
  );
}
