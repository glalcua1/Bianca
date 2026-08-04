import { motion } from "motion/react";
import {
  CalendarDays,
  Gem,
  IdCard,
  Phone,
  Sparkles,
  Wallet,
} from "lucide-react";
import EditorialEyebrow from "../editorial/EditorialEyebrow";
import {
  JPP_PLAN_ONE,
  JPP_PLAN_TWO,
  getJppPublicConfig,
} from "../../data/jppConfig";
import { trackJppEvent } from "../../lib/jppAnalytics";

const planOneIcons = [Wallet, CalendarDays, Sparkles, Gem, IdCard];
const planTwoIcons = [Wallet, CalendarDays, Gem, IdCard];

function PlanCard({
  plan,
  icons,
  delay,
}: {
  plan: typeof JPP_PLAN_ONE | typeof JPP_PLAN_TWO;
  icons: typeof planOneIcons;
  delay: number;
}) {
  const config = getJppPublicConfig();

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className="flex h-full flex-col border border-[#1d3c34]/12 bg-[#faf8f5] p-8 md:p-10"
    >
      <p className="font-editorial text-[12px] tracking-[0.28em] text-gold-on-cream">
        {plan.label}
      </p>
      <h3 className="mt-4 font-editorial text-[clamp(1.55rem,2.5vw,1.9rem)] tracking-[0.04em] text-[#1d3c34]">
        {plan.title}
      </h3>
      <p className="mt-4 text-house-body leading-relaxed text-on-cream-body">
        {plan.summary}
      </p>

      <ul className="mt-8 flex-1 space-y-4">
        {plan.points.map((point, index) => {
          const Icon = icons[index] ?? Sparkles;
          return (
            <li key={point} className="flex gap-3.5">
              <Icon
                className="mt-0.5 size-5 shrink-0 text-[#766d42]"
                strokeWidth={1.25}
                aria-hidden
              />
              <span className="text-[14px] leading-relaxed text-on-cream-body">
                {point}
              </span>
            </li>
          );
        })}
      </ul>

      <a
        href={config.phoneTel}
        onClick={() => trackJppEvent("jpp_call_bianca_clicked")}
        className="mt-10 inline-flex items-center justify-center gap-2.5 border border-[#1d3c34] bg-[#1d3c34] px-8 py-3.5 text-house-cta text-[#faf8f5] transition-colors duration-500 hover:bg-transparent hover:text-bianca-forest"
      >
        <Phone className="size-4" strokeWidth={1.25} aria-hidden />
        {plan.cta}
      </a>
    </motion.article>
  );
}

export default function JppPlans() {
  return (
    <section
      id="plans"
      className="scroll-mt-24 bg-[#f4f0e6] px-6 py-20 md:px-10 md:py-28"
    >
      <div className="mx-auto max-w-6xl">
        <div className="max-w-2xl">
          <EditorialEyebrow>Two ways to begin</EditorialEyebrow>
          <h2 className="mt-4 font-editorial text-[clamp(1.85rem,4vw,2.75rem)] tracking-[0.05em] text-[#1d3c34]">
            Choose the Jewellery Purchase Plan that suits you.
          </h2>
          <p className="mt-4 max-w-xl text-house-body leading-relaxed text-on-cream-body">
            Whether you prefer a fixed monthly rhythm or the freedom to
            contribute as you please, Bianca walks with you — and issues a
            personal plan ID for every installment.
          </p>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-2 lg:gap-8">
          <PlanCard plan={JPP_PLAN_ONE} icons={planOneIcons} delay={0} />
          <PlanCard plan={JPP_PLAN_TWO} icons={planTwoIcons} delay={0.08} />
        </div>
      </div>
    </section>
  );
}
