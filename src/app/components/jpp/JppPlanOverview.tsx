import EditorialEyebrow from "../editorial/EditorialEyebrow";
import { JPP_PLAN_PLACEHOLDERS } from "../../data/jppConfig";

export default function JppPlanOverview() {
  return (
    <section className="bg-[#1d3c34] px-6 py-16 md:px-10 md:py-20">
      <div className="mx-auto max-w-4xl text-center">
        <EditorialEyebrow tone="gold">What is Bianca JPP?</EditorialEyebrow>
        <h2 className="mt-4 font-editorial text-[clamp(1.7rem,3.8vw,2.5rem)] tracking-[0.05em] text-[#f9f9f9]">
          Plan ahead for the jewellery you love.
        </h2>
        <p className="mx-auto mt-5 max-w-2xl text-house-body leading-relaxed text-on-forest-body">
          Bianca JPP helps you move towards your next Bianca Diamonds purchase
          through simple monthly installments, personal guidance, and a dedicated
          JPP number for your journey.
        </p>
        <ul className="mx-auto mt-10 grid max-w-3xl gap-4 text-left text-[13px] leading-relaxed text-on-forest-muted md:grid-cols-3">
          <li className="border-t border-[#f9f9f9]/15 pt-4">
            {JPP_PLAN_PLACEHOLDERS.minimumInstallment}
          </li>
          <li className="border-t border-[#f9f9f9]/15 pt-4">
            {JPP_PLAN_PLACEHOLDERS.duration}
          </li>
          <li className="border-t border-[#f9f9f9]/15 pt-4">
            {JPP_PLAN_PLACEHOLDERS.redemptionNote}
          </li>
        </ul>
      </div>
    </section>
  );
}
