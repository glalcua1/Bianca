import { Link } from "react-router";
import ProtectedImage from "./protection/ProtectedImage";
import EditorialReveal from "./editorial/EditorialReveal";
import { HOME_DESTINATIONS } from "../data/homeDestinations";

type Props = {
  /** Tighter padding when nested inside the desktop Figma artboard. */
  artboard?: boolean;
};

export default function HomeDestinationCards({ artboard = false }: Props) {
  return (
    <section
      aria-labelledby="home-destinations-heading"
      className={
        artboard
          ? "relative w-full bg-transparent px-1 py-6"
          : "relative overflow-hidden border-t border-[#1d3c34]/10 bg-[#faf8f5] px-4 py-14 md:px-8 md:py-20"
      }
    >
      {/* Soft parchment wash — atmosphere without competing with imagery */}
      {!artboard && (
        <>
          <div
            className="pointer-events-none absolute inset-0 opacity-80"
            aria-hidden
            style={{
              background:
                "radial-gradient(ellipse 80% 55% at 50% 0%, rgba(244,240,230,0.95) 0%, transparent 70%), linear-gradient(180deg, #faf8f5 0%, #f4f0e6 48%, #faf8f5 100%)",
            }}
          />
          <div
            className="pointer-events-none absolute -left-24 top-1/3 h-72 w-72 rounded-full opacity-[0.12]"
            aria-hidden
            style={{
              background:
                "radial-gradient(circle, rgba(118,109,66,0.55) 0%, transparent 70%)",
            }}
          />
          <div
            className="pointer-events-none absolute -right-16 bottom-0 h-64 w-64 rounded-full opacity-[0.1]"
            aria-hidden
            style={{
              background:
                "radial-gradient(circle, rgba(29,60,52,0.45) 0%, transparent 70%)",
            }}
          />
        </>
      )}

      <div
        className={`relative mx-auto ${artboard ? "max-w-none" : "max-w-6xl"}`}
      >
        <EditorialReveal className="mx-auto max-w-2xl text-center">
          <p className="text-house-eyebrow text-gold-on-cream">The House</p>
          <h2
            id="home-destinations-heading"
            className={`mt-3 font-editorial tracking-[0.06em] text-[#1d3c34] ${
              artboard ? "text-[28px]" : "text-[clamp(1.5rem,4vw,2.15rem)]"
            }`}
          >
            Explore Bianca
          </h2>
          <p
            className={`mx-auto mt-3 max-w-lg leading-relaxed text-on-cream-body ${
              artboard ? "text-[15px]" : "mt-4 text-house-body"
            }`}
          >
            Four doors into the world of Bianca — fine jewellery, private
            commissions, the butterfly emblem, and the Cannes stage.
          </p>
          <div
            className="mx-auto mt-5 h-px w-16 bg-gradient-to-r from-transparent via-[#766d42]/70 to-transparent"
            aria-hidden
          />
        </EditorialReveal>

        <ul
          className={`mt-8 grid list-none grid-cols-1 gap-6 sm:grid-cols-2 ${
            artboard
              ? "mt-7 grid-cols-4 gap-5"
              : "lg:mt-14 lg:grid-cols-4 lg:gap-6"
          }`}
        >
          {HOME_DESTINATIONS.map((dest, index) => (
            <li key={dest.id}>
              <EditorialReveal delay={100 + index * 90} className="h-full">
                <Link
                  to={dest.to}
                  className="group relative flex h-full flex-col overflow-hidden rounded-[2px] border border-[#1d3c34]/12 bg-white shadow-[0_10px_36px_rgba(29,60,52,0.06)] transition-[transform,box-shadow,border-color] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1.5 hover:border-[#766d42]/45 hover:shadow-[0_22px_48px_rgba(29,60,52,0.14)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#766d42] motion-reduce:transition-none motion-reduce:hover:translate-y-0"
                >
                  <div
                    className={`relative overflow-hidden bg-[#1d3c34] ${
                      artboard ? "aspect-[3/4]" : "aspect-[4/5]"
                    }`}
                  >
                    <ProtectedImage
                      wrapperClassName="absolute inset-0 size-full"
                      src={dest.image}
                      alt={dest.imageAlt}
                      className={`size-full transition-transform duration-[1.4s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06] motion-reduce:transition-none motion-reduce:group-hover:scale-100 ${dest.imageClassName ?? "object-cover object-center"}`}
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />
                    <div
                      className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#1d3c34]/75 via-[#1d3c34]/15 to-transparent opacity-90 transition-opacity duration-700 group-hover:opacity-100"
                      aria-hidden
                    />
                    <p className="absolute left-4 top-4 font-editorial text-[10px] uppercase tracking-[0.22em] text-[#f0e6b8]">
                      {dest.eyebrow}
                    </p>
                    <div
                      className="pointer-events-none absolute bottom-0 left-0 h-[2px] w-full origin-left scale-x-0 bg-gradient-to-r from-[#dccb7b] via-[#766d42] to-[#dccb7b] transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-100 motion-reduce:scale-x-100"
                      aria-hidden
                    />
                  </div>

                  <div
                    className={`flex flex-1 flex-col ${
                      artboard ? "px-4 pb-5 pt-4" : "px-5 pb-6 pt-5"
                    }`}
                  >
                    <h3
                      className={`font-editorial tracking-[0.04em] text-[#1d3c34] transition-colors duration-500 group-hover:text-[#524a28] ${
                        artboard ? "text-[22px]" : "text-[1.35rem]"
                      }`}
                    >
                      {dest.title}
                    </h3>
                    <p
                      className={`mt-2.5 flex-1 leading-relaxed text-on-cream-body ${
                        artboard ? "text-[13px]" : "mt-3 text-[14px]"
                      }`}
                    >
                      {dest.description}
                    </p>
                    <span className="mt-4 inline-flex items-center gap-2 font-editorial text-[12px] uppercase tracking-[0.16em] text-gold-on-cream">
                      <span className="relative">
                        {dest.cta}
                        <span
                          className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-[#766d42]/70 transition-transform duration-500 group-hover:scale-x-100 motion-reduce:scale-x-100"
                          aria-hidden
                        />
                      </span>
                      <span
                        aria-hidden
                        className="inline-block translate-x-0 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-1.5"
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
