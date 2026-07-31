import { useState } from "react";
import SiteNav from "../components/SiteNav";
import SiteFooter from "../components/SiteFooter";
import ConsultationDrawer from "../components/consultation/ConsultationDrawer";
import WhyHero from "../components/whyBianca/WhyHero";
import WhyTrustStrip from "../components/whyBianca/WhyTrustStrip";
import WhyStory from "../components/whyBianca/WhyStory";
import WhyDiamonds from "../components/whyBianca/WhyDiamonds";
import WhyCustom from "../components/whyBianca/WhyCustom";
import WhyPractical from "../components/whyBianca/WhyPractical";
import WhyFinalCta from "../components/whyBianca/WhyFinalCta";
import { usePageMeta } from "../hooks/usePageMeta";
import { WHY_CHOOSE_BIANCA_SEO } from "../data/whyChooseBianca";

export default function WhyChooseBiancaPage() {
  const [consultationOpen, setConsultationOpen] = useState(false);

  usePageMeta(WHY_CHOOSE_BIANCA_SEO.title, WHY_CHOOSE_BIANCA_SEO.description);

  function openConsultation() {
    setConsultationOpen(true);
  }

  return (
    <main className="min-h-screen bg-[#faf8f5]" data-protected-page>
      <div className="bg-[#1d3c34]">
        <SiteNav />
      </div>

      <WhyHero onCustomDesign={openConsultation} />
      <WhyTrustStrip />
      <WhyStory />
      <WhyDiamonds />
      <WhyCustom onStartCustom={openConsultation} />
      <WhyPractical onSpeakToExpert={openConsultation} />
      <WhyFinalCta
        onCustomDesign={openConsultation}
        onSpeakToExpert={openConsultation}
      />

      <SiteFooter />

      <ConsultationDrawer
        open={consultationOpen}
        onOpenChange={setConsultationOpen}
        sourcePage="why-choose-bianca"
      />
    </main>
  );
}
