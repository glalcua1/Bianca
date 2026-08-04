import { motion } from "motion/react";
import EditorialEyebrow from "../editorial/EditorialEyebrow";
import { JPP_STEPS } from "../../data/jppConfig";

export default function JppHowItWorks() {
  return (
    <section
      id="how-it-works"
      className="scroll-mt-24 bg-[#faf8f5] px-6 py-20 md:px-10 md:py-28"
    >
      <div className="mx-auto max-w-5xl">
        <div className="max-w-2xl">
          <EditorialEyebrow>How it works</EditorialEyebrow>
          <h2 className="mt-4 font-editorial text-[clamp(1.85rem,4vw,2.75rem)] tracking-[0.05em] text-[#1d3c34]">
            Four simple steps to your Bianca JPP.
          </h2>
          <p className="mt-4 max-w-xl text-house-body leading-relaxed text-on-cream-body">
            Register, receive your unique number, speak with Bianca, and begin
            your monthly journey towards the jewellery you love.
          </p>
        </div>

        <ol className="mt-14 grid gap-10 md:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {JPP_STEPS.map((item, index) => (
            <motion.li
              key={item.step}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{
                duration: 0.55,
                delay: index * 0.08,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="border-t border-[#1d3c34]/15 pt-6"
            >
              <p className="font-editorial text-[12px] tracking-[0.22em] text-gold-on-cream">
                {item.step}
              </p>
              <h3 className="mt-3 font-editorial text-xl tracking-[0.04em] text-[#1d3c34]">
                {item.title}
              </h3>
              <p className="mt-3 text-[14px] leading-relaxed text-on-cream-body">
                {item.body}
              </p>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
