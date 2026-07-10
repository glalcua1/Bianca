import { Link } from "react-router";
import ProtectedImage from "./protection/ProtectedImage";
import EditorialReveal from "./editorial/EditorialReveal";
import { HOME_DESTINATIONS } from "../data/homeDestinations";

/**
 * Compact destination grid — sits below the Cannes horizontal card
 * as a quieter secondary navigation strip.
 */
export default function HomeDestinationCards() {
  return (
    <section
      aria-labelledby="home-destinations-heading"
      className="relative overflow-hidden border-t border-[#1d3c34]/10 bg-[#f4f0e6] px-4 py-14 md:px-8 md:py-16"
    >
      <div className="relative mx-auto max-w-6xl">
        <EditorialReveal className="mx-auto max-w-xl text-center">
          <p className="text-house-eyebrow text-gold-on-cream">Navigate</p>
          <h2
            id="home-destinations-heading"
            className="mt-3 font-editorial text-[clamp(1.35rem,3vw,1.85rem)] tracking-[0.06em] text-[#1d3c34]"
          >
            Quick paths through the house
          </h2>
          <div
            className="mx-auto mt-5 h-px w-14 bg-gradient-to-r from-transparent via-[#766d42]/70 to-transparent"
            aria-hidden
          />
        </EditorialReveal>

        <ul className="mt-10 grid list-none grid-cols-1 gap-5 sm:grid-cols-2 lg:mt-12 lg:grid-cols-4 lg:gap-6">
          {HOME_DESTINATIONS.map((dest, index) => (
            <li key={dest.id}>
              <EditorialReveal delay={80 + index * 70} className="h-full">
                <Link
                  to={dest.to}
                  className="group relative flex h-full flex-col overflow-hidden border border-[#1d3c34]/10 bg-white transition-[transform,box-shadow,border-color] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 hover:border-[#766d42]/40 hover:shadow-[0_18px_40px_rgba(29,60,52,0.1)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#766d42] motion-reduce:transition-none motion-reduce:hover:translate-y-0"
                >
                  <div className="relative aspect-[5/4] overflow-hidden bg-[#1d3c34]">
                    <ProtectedImage
                      wrapperClassName="absolute inset-0 size-full"
                      src={dest.image}
                      alt={dest.imageAlt}
                      className={`size-full transition-transform duration-[1.3s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.05] motion-reduce:transition-none motion-reduce:group-hover:scale-100 ${dest.imageClassName ?? "object-cover object-center"}`}
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />
                    <div
                      className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#1d3c34]/70 via-transparent to-transparent"
                      aria-hidden
                    />
                    <p className="absolute bottom-3 left-3 font-editorial text-[10px] uppercase tracking-[0.2em] text-[#f0e6b8]">
                      {dest.eyebrow}
                    </p>
                  </div>

                  <div className="flex flex-1 flex-col px-4 py-4">
                    <h3 className="font-editorial text-[1.15rem] tracking-[0.04em] text-[#1d3c34] transition-colors duration-500 group-hover:text-[#524a28]">
                      {dest.title}
                    </h3>
                    <p className="mt-2 flex-1 text-[13px] leading-relaxed text-on-cream-body">
                      {dest.description}
                    </p>
                    <span className="mt-3 inline-flex items-center gap-2 font-editorial text-[11px] uppercase tracking-[0.16em] text-gold-on-cream">
                      {dest.cta}
                      <span
                        aria-hidden
                        className="inline-block transition-transform duration-500 group-hover:translate-x-1"
                      >
                        →
                      </span>
                    </span>
                  </div>
                </Link>
              </EditorialReveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
