import { usePageMeta } from "../hooks/usePageMeta";
import SiteNav from "../components/SiteNav";
import FineJewelleryHero from "../components/FineJewelleryHero";
import CannesEditorialStory from "../components/cannes/CannesEditorialStory";
import CannesJewelleryGallery from "../components/cannes/CannesJewelleryGallery";
import CannesManyaSpotlight from "../components/cannes/CannesManyaSpotlight";
import CannesCraftsmanship from "../components/cannes/CannesCraftsmanship";
import CannesQuoteBlock from "../components/cannes/CannesQuoteBlock";
import CannesCtaSection from "../components/cannes/CannesCtaSection";
import SiteFooter from "../components/SiteFooter";
import { CANNES_SEO } from "../data/cannesShowcase2026";

export default function CannesShowcase2026Page() {
  usePageMeta(CANNES_SEO.title, CANNES_SEO.description);

  return (
    <main className="bg-[#faf8f5]" data-protected-page>
      <div className="bg-[#1d3c34]">
        <SiteNav activeItem="cannes-collection" />
        <FineJewelleryHero />
      </div>
      <CannesEditorialStory />
      <CannesJewelleryGallery />
      <CannesManyaSpotlight />
      <CannesCraftsmanship />
      <CannesQuoteBlock />
      <CannesCtaSection />
      <SiteFooter />
    </main>
  );
}
