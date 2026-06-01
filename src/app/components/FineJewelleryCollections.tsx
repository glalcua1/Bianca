import { ChevronRight } from "lucide-react";
import { FINE_JEWELLERY_COLLECTIONS } from "../data/fineJewelleryCollections";
import ProtectedImage from "./protection/ProtectedImage";

export default function FineJewelleryCollections() {
  return (
    <section
      id="collections"
      aria-labelledby="collections-heading"
      className="border-t border-[#1d3c34]/10 bg-[#faf8f5] px-6 py-16 md:px-10 md:py-24"
    >
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 text-center md:mb-16">
          <p className="mb-4 text-house-eyebrow text-gold-on-cream">
            Curated for you
          </p>
          <h2
            id="collections-heading"
            className="font-editorial text-[clamp(1.75rem,4vw,2.75rem)] tracking-[0.08em] text-[#1d3c34]"
          >
            Our Collections
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-house-body text-on-cream-body">
            Three distinct worlds of diamond jewellery — each crafted with IGI-certified
            lab-grown stones and the same attention to detail as the house itself.
          </p>
        </div>

        <ul className="grid gap-10 md:grid-cols-3 md:gap-8 lg:gap-10">
          {FINE_JEWELLERY_COLLECTIONS.map((collection) => (
            <li key={collection.id} className="group flex flex-col">
              <div className="relative aspect-square overflow-hidden bg-[#f4f0e6] ring-1 ring-[#1d3c34]/10 transition duration-500 group-hover:ring-[#dccb7b]/50">
                <ProtectedImage
                  wrapperClassName="size-full"
                  src={collection.image}
                  alt={collection.imageAlt}
                  className={`size-full transition duration-700 ease-out group-hover:scale-[1.03] ${collection.imageClassName ?? "object-cover"}`}
                  loading="lazy"
                />
              </div>
              <div className="flex flex-1 flex-col pt-8 text-center">
                <h3 className="font-editorial text-2xl tracking-[0.04em] text-[#1d3c34] md:text-[1.65rem]">
                  {collection.title}
                </h3>
                <p className="mx-auto mt-4 max-w-[280px] flex-1 text-house-body text-on-cream-body">
                  {collection.description}
                </p>
                <span className="mt-6 inline-flex items-center justify-center gap-1.5 text-house-cta text-gold-on-cream transition group-hover:text-bianca-forest">
                  Explore
                  <ChevronRight className="size-3.5 text-gold-on-cream" aria-hidden />
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
