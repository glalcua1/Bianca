import { useEffect, useState } from "react";
import SiteNav from "../components/SiteNav";
import SiteFooter from "../components/SiteFooter";
import JppHero from "../components/jpp/JppHero";
import JppPlanOverview from "../components/jpp/JppPlanOverview";
import JppHowItWorks from "../components/jpp/JppHowItWorks";
import JppRegistrationForm from "../components/jpp/JppRegistrationForm";
import JppSuccess from "../components/jpp/JppSuccess";
import JppStickyCta from "../components/jpp/JppStickyCta";
import { usePageMeta } from "../hooks/usePageMeta";
import {
  JPP_SEO,
  type JppPaymentDetails,
  type JppPublicCustomer,
} from "../data/jppConfig";
import { trackJppEvent } from "../lib/jppAnalytics";

function scrollToId(id: string) {
  const el = document.getElementById(id);
  el?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export default function JewelleryPurchasePlanPage() {
  const [result, setResult] = useState<{
    customer: JppPublicCustomer;
    payment: JppPaymentDetails;
    duplicate?: boolean;
  } | null>(null);
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
      const confirmation = document.getElementById("jpp-confirmation");
      if (!register) {
        setShowSticky(false);
        return;
      }
      const registerTop = register.getBoundingClientRect().top;
      const confirmationVisible = Boolean(
        confirmation && confirmation.getBoundingClientRect().top < window.innerHeight,
      );
      setShowSticky(
        window.scrollY > 420 && registerTop > 120 && !result && !confirmationVisible,
      );
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [result]);

  useEffect(() => {
    if (result) {
      scrollToId("jpp-confirmation");
    }
  }, [result]);

  return (
    <main className="min-h-screen bg-[#faf8f5] pb-20 md:pb-0" data-protected-page>
      <div className="bg-[#1d3c34]">
        <SiteNav />
      </div>

      {!result ? (
        <>
          <JppHero
            onRegister={() => scrollToId("register")}
            onHowItWorks={() => scrollToId("how-it-works")}
          />
          <JppPlanOverview />
          <JppHowItWorks />
          <JppRegistrationForm
            onSuccess={(customer, payment) =>
              setResult({ customer, payment, duplicate: false })
            }
            onDuplicate={(customer) => {
              if (!customer) return;
              setResult({
                customer,
                payment: {
                  bankName: "",
                  accountNumber: "",
                  ifsc: null,
                  ifscConfigured: false,
                  accountType: "",
                },
                duplicate: true,
              });
            }}
          />
          <JppStickyCta
            visible={showSticky}
            onRegister={() => scrollToId("register")}
          />
        </>
      ) : (
        <JppSuccess
          customer={result.customer}
          payment={result.payment}
          duplicate={result.duplicate}
        />
      )}

      <SiteFooter />
    </main>
  );
}
