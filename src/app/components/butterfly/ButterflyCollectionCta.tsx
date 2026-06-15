import { Link } from "react-router";
import EditorialReveal from "../editorial/EditorialReveal";
import BespokeButterflyMark from "../bespoke/BespokeButterflyMark";
import { BESPOKE_JEWELLERY_PATH } from "../../data/bespokeJewellery";

type Props = {
  onBookConsultation: () => void;
};

export default function ButterflyCollectionCta({ onBookConsultation }: Props) {
  return (
    <section
      aria-labelledby="butterfly-cta-heading"
      className="relative overflow-hidden border-t border-[#766d42]/20 bg-[#1d3c34] px-6 py-24 md:px-10 md:py-32"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_100%,rgba(220,203,123,0.1),transparent_60%)]"
        aria-hidden
      />
      <EditorialReveal className="relative mx-auto max-w-3xl text-center">
        <BespokeButterflyMark
          tone="gold"
          className="mx-auto mb-6 size-8 opacity-50"
        />
        <h2
          id="butterfly-cta-heading"
          className="font-editorial text-[clamp(1.75rem,4vw,2.75rem)] tracking-[0.06em] text-[#f9f9f9]"
        >
          Commission Your Butterfly
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-house-body leading-relaxed text-on-forest-body">
          Each piece in the collection may be composed to your specification —
          centre stone, metal, and proportion — in a private salon consultation.
        </p>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <button
            type="button"
            onClick={onBookConsultation}
            className="inline-flex min-w-[240px] justify-center border border-[#f9f9f9] bg-[#f9f9f9] px-10 py-3.5 text-house-cta text-[#1d3c34] transition duration-300 ease-out hover:bg-transparent hover:text-[#f9f9f9]"
          >
            Book A Private Consultation
          </button>
          <Link
            to={BESPOKE_JEWELLERY_PATH}
            className="inline-flex min-w-[240px] justify-center border border-[#f9f9f9]/35 px-10 py-3.5 text-house-cta text-[#f9f9f9] transition duration-300 ease-out hover:border-[#f9f9f9] hover:bg-[#f9f9f9]/10"
          >
            Explore Bespoke
          </Link>
        </div>
      </EditorialReveal>
    </section>
  );
}
