import { Palette, Scale, ScanLine, Sparkles } from "lucide-react";
import EditorialReveal from "../editorial/EditorialReveal";
import { LAB_GROWN_FOUR_CS } from "../../data/labGrownDiamondFaq";

const iconMap = {
  sparkles: Sparkles,
  palette: Palette,
  scan: ScanLine,
  scale: Scale,
} as const;

type Card = (typeof LAB_GROWN_FOUR_CS)[number];

type Props = {
  cards: readonly Card[];
};

export default function FaqFourCsCards({ cards }: Props) {
  return (
    <ul className="mx-auto grid max-w-5xl gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {cards.map((card, i) => {
        const Icon = iconMap[card.icon];
        return (
          <li key={card.id}>
            <EditorialReveal delay={i * 70}>
              <article className="group h-full border border-[#766d42]/20 bg-[#faf8f5] px-6 py-10 text-center transition-all duration-500 hover:border-[#766d42]/45 hover:shadow-[inset_0_0_0_1px_rgba(220,203,123,0.2)]">
                <Icon
                  className="mx-auto size-7 text-[#766d42] transition-transform duration-500 group-hover:scale-110"
                  strokeWidth={1.15}
                  aria-hidden
                />
                <h3 className="mt-5 font-editorial text-xl tracking-[0.06em] text-[#1d3c34]">
                  {card.title}
                </h3>
                <p className="mt-3 text-house-body text-sm leading-relaxed text-on-cream-body">
                  {card.description}
                </p>
              </article>
            </EditorialReveal>
          </li>
        );
      })}
    </ul>
  );
}
