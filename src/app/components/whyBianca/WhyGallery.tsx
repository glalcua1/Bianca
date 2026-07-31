import { Link } from "react-router";
import EditorialEyebrow from "../editorial/EditorialEyebrow";
import EditorialReveal from "../editorial/EditorialReveal";
import ProtectedImage from "../protection/ProtectedImage";
import WhyCtaButton from "./WhyCtaButton";
import { WHY_GALLERY_PIECES } from "../../data/whyChooseBianca";

export default function WhyGallery() {
  return (
    <section
      aria-labelledby="modern-design-heading"
      className="px-6 py-20 md:px-10 md:py-28"
    >
      <div className="mx-auto max-w-6xl">
        <EditorialReveal className="mx-auto max-w-3xl text-center">
          <EditorialEyebrow className="mb-4">Modern Design</EditorialEyebrow>
          <h2
            id="modern-design-heading"
            className="font-editorial text-[clamp(1.75rem,4vw,2.75rem)] tracking-[0.05em] text-[#1d3c34]"
          >
            Modern Design, Without the Ordinary.
          </h2>
          <div className="mx-auto mt-6 max-w-2xl space-y-4 text-house-body leading-relaxed text-on-cream-body">
            <p>
              We believe lab-grown diamonds deserve a new design language.
            </p>
            <p>
              Our aesthetic is modern, refined and contemporary—created for
              people who appreciate timeless luxury but don&apos;t necessarily
              want traditional jewellery.
            </p>
            <p>
              From understated everyday pieces to statement jewellery, our
              designs are created to feel relevant today and beautiful for years
              to come.
            </p>
          </div>
        </EditorialReveal>

        <ul className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
          {WHY_GALLERY_PIECES.map((piece, index) => (
            <EditorialReveal key={piece.id} delay={(index % 3) * 70}>
              <li>
                <Link
                  to={piece.to}
                  className="group relative block overflow-hidden bg-[#f4f0e6] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#766d42]"
                >
                  <div
                    className={`relative overflow-hidden ${
                      index % 5 === 0 || index % 5 === 3
                        ? "aspect-[4/5]"
                        : "aspect-square"
                    }`}
                  >
                    <ProtectedImage
                      src={piece.image}
                      alt={piece.imageAlt}
                      wrapperClassName="absolute inset-0"
                      className="size-full object-cover object-center transition-transform duration-[1.4s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                      sizes="(max-width: 768px) 90vw, 33vw"
                      loading="lazy"
                    />
                    <div
                      className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#1d3c34]/75 via-[#1d3c34]/10 to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-95"
                      aria-hidden
                    />
                    <div className="absolute inset-x-0 bottom-0 translate-y-1 p-5 transition-transform duration-500 group-hover:translate-y-0 motion-reduce:translate-y-0">
                      <p className="font-editorial text-[10px] uppercase tracking-[0.2em] text-gold-on-forest">
                        {piece.collection}
                      </p>
                      <p className="mt-1 font-editorial text-lg tracking-[0.04em] text-[#f9f9f9]">
                        {piece.name}
                      </p>
                      <p className="mt-2 font-editorial text-[11px] uppercase tracking-[0.18em] text-[#f9f9f9]/80 opacity-0 transition-opacity duration-500 group-hover:opacity-100 motion-reduce:opacity-100">
                        Explore →
                      </p>
                    </div>
                  </div>
                </Link>
              </li>
            </EditorialReveal>
          ))}
        </ul>

        <EditorialReveal className="mt-12 text-center">
          <WhyCtaButton to="/fine-jewellery">Explore the Collection</WhyCtaButton>
        </EditorialReveal>
      </div>
    </section>
  );
}
