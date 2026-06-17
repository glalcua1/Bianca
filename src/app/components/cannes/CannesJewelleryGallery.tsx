import EditorialEyebrow from "../editorial/EditorialEyebrow";
import EditorialReveal from "../editorial/EditorialReveal";
import ProtectedImage from "../protection/ProtectedImage";
import {
  CANNES_JEWELLERY_PIECES,
  CANNES_SHOWCASE_ROW,
} from "../../data/cannesShowcase2026";

function formatPieceIndex(index: number, total: number) {
  return `${String(index + 1).padStart(2, "0")} / ${String(total).padStart(2, "0")}`;
}

export default function CannesJewelleryGallery() {
  const total = CANNES_JEWELLERY_PIECES.length;

  return (
    <section
      id="jewels"
      aria-labelledby="cannes-jewels-heading"
      className="border-t border-[#1d3c34]/8 bg-[#faf8f5] px-6 py-20 md:px-10 md:py-28 lg:px-16 lg:py-32"
    >
      <div className="mx-auto max-w-6xl">
        <EditorialReveal className="mb-16 text-center md:mb-20">
          <EditorialEyebrow className="mb-5">The Showcase</EditorialEyebrow>
          <h2
            id="cannes-jewels-heading"
            className="font-editorial text-[clamp(1.75rem,4vw,2.75rem)] tracking-[0.06em] text-[#1d3c34]"
          >
            Jewels Seen at Cannes
          </h2>
          <p className="mx-auto mt-5 max-w-lg text-house-body text-on-cream-body">
            {total} pieces — each composed for the red carpet and crafted for
            a lifetime beyond it.
          </p>
        </EditorialReveal>

        <ul className="space-y-20 md:space-y-28 lg:space-y-32">
          {CANNES_JEWELLERY_PIECES.map((piece, index) => {
            const isEven = index % 2 === 0;

            return (
              <li key={piece.id}>
                <EditorialReveal delay={80}>
                  <article className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14 xl:gap-20">
                    <div
                      className={`group ${
                        isEven ? "lg:order-1" : "lg:order-2"
                      }`}
                    >
                      <div
                        className={`relative flex items-center justify-center overflow-hidden bg-[#f4f0e6] shadow-[0_20px_50px_rgba(29,60,52,0.06)] ring-1 ring-[#1d3c34]/8 ${
                          piece.layout === "portrait"
                            ? "aspect-[4/5]"
                            : "aspect-[5/4] md:aspect-[3/2]"
                        }`}
                      >
                        <ProtectedImage
                          src={piece.image}
                          alt={piece.imageAlt}
                          wrapperClassName="size-full"
                          className={`size-full transition duration-[1000ms] ease-out group-hover:scale-[1.02] ${piece.imageClassName ?? "object-contain p-8 md:p-12"}`}
                          loading="lazy"
                        />
                      </div>
                    </div>

                    <div
                      className={`${
                        isEven
                          ? "lg:order-2 lg:pl-2 xl:pl-8"
                          : "lg:order-1 lg:pr-2 xl:pr-8"
                      }`}
                    >
                      <p
                        className="text-house-eyebrow text-gold-on-cream"
                        aria-hidden
                      >
                        {formatPieceIndex(index, total)}
                      </p>
                      <p className="mt-3 font-body text-[10px] uppercase tracking-[0.45em] text-gold-on-cream">
                        {piece.collection}
                      </p>
                      <h3 className="mt-3 font-editorial text-[clamp(1.4rem,2.8vw,1.85rem)] leading-[1.2] tracking-[0.05em] text-[#1d3c34]">
                        {piece.type}
                      </h3>
                      <p className="mt-3 font-body text-[11px] uppercase tracking-[0.28em] text-on-cream-subtle">
                        {piece.inspiration}
                      </p>
                      <div
                        className="my-7 h-px w-10 bg-[#1d3c34]/12"
                        aria-hidden
                      />
                      <p className="max-w-md text-house-body text-on-cream-body">
                        {piece.description}
                      </p>
                    </div>
                  </article>
                </EditorialReveal>
              </li>
            );
          })}
        </ul>

        <EditorialReveal className="mt-20 border-t border-[#1d3c34]/10 pt-14 md:mt-28 md:pt-20" delay={100}>
          <p className="mb-8 text-center font-body text-[10px] uppercase tracking-[0.45em] text-gold-on-cream md:mb-10">
            The Collection
          </p>
          <ul className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-5 lg:gap-6">
            {CANNES_SHOWCASE_ROW.map((item) => (
              <li key={item.src}>
                <figure className="group">
                  <div className="relative aspect-[3/4] overflow-hidden bg-[#f4f0e6] shadow-[0_16px_40px_rgba(29,60,52,0.06)] ring-1 ring-[#1d3c34]/8">
                    <ProtectedImage
                      src={item.src}
                      alt={item.alt}
                      wrapperClassName="size-full"
                      className="size-full object-cover object-center transition duration-700 ease-out group-hover:scale-[1.02]"
                      loading="lazy"
                    />
                  </div>
                  <figcaption className="mt-3 text-center font-body text-[10px] uppercase tracking-[0.32em] text-on-cream-muted">
                    {item.label}
                  </figcaption>
                </figure>
              </li>
            ))}
          </ul>
        </EditorialReveal>
      </div>
    </section>
  );
}
