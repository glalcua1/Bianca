import { useState } from "react";
import SiteNav from "../components/SiteNav";
import SiteFooter from "../components/SiteFooter";
import ConsultationDrawer from "../components/consultation/ConsultationDrawer";
import ButterflyCinemaHero from "../components/butterfly/ButterflyCinemaHero";
import ButterflySalonGallery from "../components/butterfly/ButterflySalonGallery";
import ButterflyCollectionCta from "../components/butterfly/ButterflyCollectionCta";
import { usePageMeta } from "../hooks/usePageMeta";
import { BUTTERFLY_COLLECTION_SEO } from "../data/butterflyCollection";

export default function ButterflyCollectionPage() {
  const [consultationOpen, setConsultationOpen] = useState(false);

  usePageMeta(
    BUTTERFLY_COLLECTION_SEO.title,
    BUTTERFLY_COLLECTION_SEO.description,
  );

  return (
    <main className="min-h-screen bg-[#faf8f5]" data-protected-page>
      <section className="relative bg-[#0f1f1b] md:min-h-screen">
        <div className="relative z-30 md:absolute md:inset-x-0 md:top-0">
          <SiteNav activeItem="butterfly-collection" variant="overlay" />
        </div>

        <ButterflyCinemaHero />
      </section>

      <ButterflySalonGallery />

      <div className="border-t border-[#766d42]/15 bg-[#1d3c34]">
        <div className="mx-auto grid max-w-6xl grid-cols-3 divide-x divide-[#766d42]/25 px-6 py-5 md:px-10">
          {[
            { label: "Orchid", sub: "Rare beauty" },
            { label: "Butterfly", sub: "Transformation" },
            { label: "Heirloom", sub: "Forever yours" },
          ].map((item) => (
            <div
              key={item.label}
              className="flex flex-col items-center px-2 text-center first:pl-0 last:pr-0"
            >
              <span className="font-editorial text-[10px] uppercase tracking-[0.22em] text-gold-on-forest md:text-[11px]">
                {item.label}
              </span>
              <span className="mt-1 text-[9px] uppercase tracking-[0.16em] text-on-forest-muted">
                {item.sub}
              </span>
            </div>
          ))}
        </div>
      </div>

      <ButterflyCollectionCta
        onBookConsultation={() => setConsultationOpen(true)}
      />

      <SiteFooter />

      <ConsultationDrawer
        open={consultationOpen}
        onOpenChange={setConsultationOpen}
        sourcePage="butterfly-collection"
      />
    </main>
  );
}
