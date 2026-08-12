import { useEffect, useState } from "react";
import SiteNav from "../components/SiteNav";
import SiteFooter from "../components/SiteFooter";
import JppHero from "../components/jpp/JppHero";
import JppHowItWorks from "../components/jpp/JppHowItWorks";
import JppRegister from "../components/jpp/JppRegister";
import JppPlans from "../components/jpp/JppPlans";
import JppCalculator from "../components/jpp/JppCalculator";
import JppTerms from "../components/jpp/JppTerms";
import JppFinalCta from "../components/jpp/JppFinalCta";
import JppStickyCta from "../components/jpp/JppStickyCta";
import { usePageMeta } from "../hooks/usePageMeta";
import { JPP_SEO } from "../data/jppConfig";
import { trackJppEvent } from "../lib/jppAnalytics";

function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export default function JewelleryPurchasePlanPage() {
  const [showSticky, setShowSticky] = useState(false);

  usePageMeta(JPP_SEO.title, JPP_SEO.description, {
    canonical: JPP_SEO.canonical,
    ogImage: JPP_SEO.ogImage,
  });

  useEffect(() => {
    trackJppEvent("jpp_page_view");
  }, []);

  useEffect(() => {
    function onScroll() {
      const register = document.getElementById("register");
      const pastHero = window.scrollY > 520;
      const nearRegister = Boolean(
        register &&
          register.getBoundingClientRect().top < window.innerHeight * 0.65 &&
          register.getBoundingClientRect().bottom > window.innerHeight * 0.25,
      );
      setShowSticky(pastHero && !nearRegister);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <main className="min-h-screen bg-[#faf8f5] pb-20 md:pb-0" data-protected-page>
      <div className="bg-[#1d3c34]">
        <SiteNav />
      </div>

      <JppHero
        onRegister={() => scrollToId("register")}
        onHowItWorks={() => scrollToId("how-it-works")}
      />
      <JppHowItWorks />
      <JppRegister />
      <JppPlans />
      <JppCalculator />
      <JppTerms />
      <JppFinalCta />
      <JppStickyCta
        visible={showSticky}
        onRegister={() => scrollToId("register")}
      />

      <SiteFooter />
    </main>
  );
}
