import { useState } from "react";
import { Link } from "react-router";
import EditorialEyebrow from "../editorial/EditorialEyebrow";
import EditorialReveal from "../editorial/EditorialReveal";
import ConsultationDrawer from "../consultation/ConsultationDrawer";

export default function CannesCtaSection() {
  const [consultationOpen, setConsultationOpen] = useState(false);

  return (
    <>
      <section
        aria-labelledby="cannes-cta-heading"
        className="bg-[#1d3c34] px-6 py-24 md:px-10 md:py-32 lg:px-16"
      >
        <EditorialReveal className="mx-auto max-w-3xl text-center">
          <EditorialEyebrow tone="gold" className="mb-6">
            Continue the Journey
          </EditorialEyebrow>
          <h2
            id="cannes-cta-heading"
            className="font-editorial text-[clamp(1.75rem,4vw,2.75rem)] tracking-[0.06em] text-[#f9f9f9]"
          >
            Discover Fine Jewellery
          </h2>
          <p className="mx-auto mt-5 max-w-lg text-house-body text-on-forest-body">
            Explore our collections or arrange a private consultation with the
            Bianca atelier team.
          </p>

          <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-6">
            <Link
              to="/fine-jewellery#collections"
              className="inline-flex min-w-[220px] justify-center border border-[#f9f9f9]/35 px-10 py-3 text-house-cta text-[#f9f9f9] transition-colors duration-500 hover:border-[#f9f9f9] hover:bg-[#f9f9f9] hover:text-bianca-forest"
            >
              Explore Collections
            </Link>
            <button
              type="button"
              onClick={() => setConsultationOpen(true)}
              className="inline-flex min-w-[220px] justify-center border border-[#f9f9f9]/20 px-10 py-3 text-house-cta text-on-forest transition-colors duration-500 hover:border-[#f9f9f9]/50 hover:text-[#f9f9f9]"
            >
              Book a Private Consultation
            </button>
          </div>
        </EditorialReveal>
      </section>

      <ConsultationDrawer
        open={consultationOpen}
        onOpenChange={setConsultationOpen}
        sourcePage="cannes-2026"
      />
    </>
  );
}
