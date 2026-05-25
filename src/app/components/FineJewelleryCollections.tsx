import { ChevronRight } from "lucide-react";
import { FINE_JEWELLERY_COLLECTIONS } from "../data/fineJewelleryCollections";

export default function FineJewelleryCollections() {
  return (
    <section
      id="collections"
      aria-labelledby="collections-heading"
      className="border-t border-[#1d3c34]/10 bg-[#faf8f5] px-6 py-16 md:px-10 md:py-24"
    >
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 text-center md:mb-16">
          <p className="mb-4 font-['Arial',sans-serif] text-[10px] uppercase tracking-[0.5em] text-[#766d42] md:text-[11px]">
            Curated for you
          </p>
          <h2
            id="collections-heading"
            className="font-['Times_New_Roman',serif] text-[clamp(1.75rem,4vw,2.75rem)] tracking-[0.08em] text-[#1d3c34]"
          >
            Our Collections
          </h2>
          <p className="mx-auto mt-4 max-w-xl font-['Arial',sans-serif] text-sm leading-relaxed text-[#5a6b66] md:text-[15px]">
            Three distinct worlds of diamond jewellery — each crafted with IGI-certified
            lab-grown stones and the same attention to detail as the house itself.
          </p>
        </div>

        <ul className="grid gap-10 md:grid-cols-3 md:gap-8 lg:gap-10">
          {FINE_JEWELLERY_COLLECTIONS.map((collection) => (
            <li key={collection.id} className="group flex flex-col">
              <div className="relative aspect-square overflow-hidden bg-[#f4f0e6] ring-1 ring-[#1d3c34]/10 transition duration-500 group-hover:ring-[#dccb7b]/50">
                <img
                  src={collection.image}
                  alt={collection.imageAlt}
                  className={`size-full transition duration-700 ease-out group-hover:scale-[1.03] ${collection.imageClassName ?? "object-cover"}`}
                  loading="lazy"
                />
              </div>
              <div className="flex flex-1 flex-col pt-8 text-center">
                <h3 className="font-['Times_New_Roman',serif] text-2xl tracking-[0.04em] text-[#1d3c34] md:text-[1.65rem]">
                  {collection.title}
                </h3>
                <p className="mx-auto mt-4 max-w-[280px] flex-1 font-['Arial',sans-serif] text-sm leading-relaxed text-[#5a6b66]">
                  {collection.description}
                </p>
                <span className="mt-6 inline-flex items-center justify-center gap-1.5 font-['Times_New_Roman',serif] text-xs uppercase tracking-[0.25em] text-[#766d42] transition group-hover:text-[#1d3c34]">
                  Explore
                  <ChevronRight className="size-3.5 opacity-70" aria-hidden />
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
