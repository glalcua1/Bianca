import { useState } from "react";
import SiteNav from "../components/SiteNav";
import SiteFooter from "../components/SiteFooter";
import ConsultationDrawer from "../components/consultation/ConsultationDrawer";
import WhyHero from "../components/whyBianca/WhyHero";
import WhyTrustStrip from "../components/whyBianca/WhyTrustStrip";
import WhyPhilosophy from "../components/whyBianca/WhyPhilosophy";
import WhyDifference from "../components/whyBianca/WhyDifference";
import WhyCertified from "../components/whyBianca/WhyCertified";
import WhySourcing from "../components/whyBianca/WhySourcing";
import WhyCustom from "../components/whyBianca/WhyCustom";
import WhyFourCsSection from "../components/whyBianca/WhyFourCsSection";
import WhyGallery from "../components/whyBianca/WhyGallery";
import WhyService from "../components/whyBianca/WhyService";
import WhyValue from "../components/whyBianca/WhyValue";
import WhyExchange from "../components/whyBianca/WhyExchange";
import WhyTimeline from "../components/whyBianca/WhyTimeline";
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
      <WhyPhilosophy />
      <WhyDifference />
      <WhyCertified />
      <WhySourcing />
      <WhyCustom onStartCustom={openConsultation} />
      <WhyFourCsSection />
      <WhyGallery />
      <WhyService />
      <WhyValue />
      <WhyExchange onSpeakToExpert={openConsultation} />
      <WhyTimeline />
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
