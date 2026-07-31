import { lazy, Suspense, useState } from "react";
import { Link } from "react-router";
import ProtectedImage from "./protection/ProtectedImage";
import EditorialReveal from "./editorial/EditorialReveal";
import {
  HOME_SECTION_CARDS,
  type HomeSectionCard,
} from "../data/homeSectionCards";
import { BLUE_DIAMOND_CARD } from "../data/blueDiamond";

const PdfLookbookDrawer = lazy(() => import("./PdfLookbookDrawer"));
const BlueStarCollectionDrawer = lazy(
  () => import("./BlueStarCollectionDrawer"),
);

function toneClasses(tone: HomeSectionCard["tone"], imageWellColor?: string) {
  if (imageWellColor) {
    return {
      well: "",
      wellStyle: { backgroundColor: imageWellColor } as const,
      panel: "bg-[#faf8f5]",
    };
  }
  switch (tone) {
    case "forest":
      return {
        well: "bg-[#1d3c34]",
        wellStyle: undefined,
        panel: "bg-[#faf8f5]",
      };
    case "ink":
      return {
        well: "bg-[#0c0b0a]",
        wellStyle: undefined,
        panel: "bg-[#faf8f5]",
      };
    default:
      return {
        well: "bg-[#f4f0e6]",
        wellStyle: undefined,
        panel: "bg-[#faf8f5]",
      };
  }
}

function CardChrome({
  eyebrow,
  title,
  description,
  cta,
  imageOnRight,
  panelClass,
}: {
  eyebrow: string;
  title: string;
  description: string;
  cta: string;
  imageOnRight: boolean;
  panelClass: string;
}) {
  return (
    <div
      className={`relative flex flex-col justify-center ${panelClass} px-7 py-10 sm:px-10 sm:py-12 md:px-12 lg:px-16 lg:py-14 ${
        imageOnRight ? "md:order-1" : "md:order-2"
      }`}
    >
      <div
        className="pointer-events-none absolute inset-y-8 left-0 w-px bg-gradient-to-b from-transparent via-[#766d42]/50 to-transparent opacity-0 transition-opacity duration-700 group-hover:opacity-100 md:inset-y-12"
        aria-hidden
      />

      <p className="font-editorial text-[11px] uppercase tracking-[0.28em] text-gold-on-cream">
        {eyebrow}
      </p>

      <h3 className="mt-4 font-editorial text-[clamp(1.85rem,3.5vw,2.75rem)] tracking-[0.04em] text-[#1d3c34] transition-colors duration-500 group-hover:text-[#524a28]">
        {title}
      </h3>

      <div
        className="mt-5 h-px w-12 origin-left bg-[#766d42]/55 transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-150"
        aria-hidden
      />

      <p className="mt-6 max-w-md text-[15px] leading-[1.75] text-on-cream-body sm:text-[16px]">
        {description}
      </p>

      <span className="mt-8 inline-flex items-center gap-3 font-editorial text-[12px] uppercase tracking-[0.2em] text-gold-on-cream sm:mt-10">
        <span className="relative">
          {cta}
          <span
            className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-[#766d42]/70 transition-transform duration-500 group-hover:scale-x-100 motion-reduce:scale-x-100"
            aria-hidden
          />
        </span>
        <span
          aria-hidden
          className="inline-block transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-2"
        >
          →
        </span>
      </span>
    </div>
  );
}

function CardImage({
  image,
  imageAlt,
  imageClassName,
  imageOnRight,
  wellClass,
  wellStyle,
  showOverlay = true,
}: {
  image: string;
  imageAlt: string;
  imageClassName?: string;
  imageOnRight: boolean;
  wellClass: string;
  wellStyle?: { backgroundColor: string };
  /** Soft vignette — off for product stills that need full clarity */
  showOverlay?: boolean;
}) {
  return (
    <div
      className={`relative min-h-[280px] overflow-hidden sm:min-h-[340px] md:min-h-full ${wellClass} ${
        imageOnRight ? "md:order-2" : "md:order-1"
      }`}
      style={wellStyle}
    >
      <ProtectedImage
        wrapperClassName="absolute inset-0 size-full"
        src={image}
        alt={imageAlt}
        className={`size-full transition-transform duration-[1.6s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.045] motion-reduce:transition-none motion-reduce:group-hover:scale-100 ${imageClassName ?? "object-cover object-center"}`}
        sizes="(max-width: 768px) 100vw, 50vw"
      />
      {showOverlay ? (
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent opacity-60 md:bg-gradient-to-r md:from-transparent md:via-transparent md:to-black/10"
          aria-hidden
        />
      ) : null}
      <div
        className={`pointer-events-none absolute inset-y-0 w-[2px] origin-top scale-y-0 bg-gradient-to-b from-[#dccb7b] via-[#766d42] to-[#dccb7b] transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-y-100 motion-reduce:scale-y-100 ${
          imageOnRight ? "left-0" : "right-0"
        }`}
        aria-hidden
      />
    </div>
  );
}

const cardShellClass =
  "group relative grid overflow-hidden border border-[#1d3c34]/10 bg-[#faf8f5] transition-[border-color,box-shadow] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] hover:border-[#766d42]/40 hover:shadow-[0_24px_64px_rgba(29,60,52,0.1)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#766d42] motion-reduce:transition-none md:min-h-[420px] md:grid-cols-2 lg:min-h-[480px] w-full text-left";

function SectionCard({
  card,
  index,
}: {
  card: HomeSectionCard;
  index: number;
}) {
  const tones = toneClasses(card.tone, card.imageWellColor);
  const imageOnRight = index % 2 === 0;

  return (
    <EditorialReveal delay={index * 80}>
      <Link
        to={card.to}
        className={cardShellClass}
        aria-label={`${card.title} — ${card.cta}`}
      >
        <CardChrome
          eyebrow={card.eyebrow}
          title={card.title}
          description={card.description}
          cta={card.cta}
          imageOnRight={imageOnRight}
          panelClass={tones.panel}
        />
        <CardImage
          image={card.image}
          imageAlt={card.imageAlt}
          imageClassName={card.imageClassName}
          imageOnRight={imageOnRight}
          wellClass={tones.well}
          wellStyle={tones.wellStyle}
        />
      </Link>
    </EditorialReveal>
  );
}

function BlueDiamondCta({
  label,
  onClick,
  expanded,
}: {
  label: string;
  onClick: () => void;
  expanded: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-haspopup="dialog"
      aria-expanded={expanded}
      className="group/cta inline-flex items-center gap-3 font-editorial text-[12px] uppercase tracking-[0.2em] text-gold-on-cream transition-colors hover:text-[#524a28]"
    >
      <span className="relative">
        {label}
        <span
          className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-[#766d42]/70 transition-transform duration-500 group-hover/cta:scale-x-100 motion-reduce:scale-x-100"
          aria-hidden
        />
      </span>
      <span
        aria-hidden
        className="inline-block transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/cta:translate-x-2"
      >
        →
      </span>
    </button>
  );
}

function BlueDiamondCard({ index }: { index: number }) {
  const [storyOpen, setStoryOpen] = useState(false);
  const [collectionOpen, setCollectionOpen] = useState(false);
  const card = BLUE_DIAMOND_CARD;
  const tones = toneClasses("ink", card.imageWellColor);
  const imageOnRight = index % 2 === 0;

  return (
    <>
      <EditorialReveal delay={index * 80}>
        <article className={cardShellClass}>
          <div
            className={`relative flex flex-col justify-center ${tones.panel} px-7 py-10 sm:px-10 sm:py-12 md:px-12 lg:px-16 lg:py-14 ${
              imageOnRight ? "md:order-1" : "md:order-2"
            }`}
          >
            <div
              className="pointer-events-none absolute inset-y-8 left-0 w-px bg-gradient-to-b from-transparent via-[#766d42]/50 to-transparent opacity-0 transition-opacity duration-700 group-hover:opacity-100 md:inset-y-12"
              aria-hidden
            />

            <p className="font-editorial text-[11px] uppercase tracking-[0.28em] text-gold-on-cream">
              {card.eyebrow}
            </p>

            <h3 className="mt-4 font-editorial text-[clamp(1.85rem,3.5vw,2.75rem)] tracking-[0.04em] text-[#1d3c34] transition-colors duration-500 group-hover:text-[#524a28]">
              {card.title}
            </h3>

            <div
              className="mt-5 h-px w-12 origin-left bg-[#766d42]/55 transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-150"
              aria-hidden
            />

            <p className="mt-6 max-w-md text-[15px] leading-[1.75] text-on-cream-body sm:text-[16px]">
              {card.description}
            </p>

            <div className="mt-8 flex flex-col items-start gap-4 sm:mt-10">
              <BlueDiamondCta
                label={card.storyCta}
                onClick={() => setStoryOpen(true)}
                expanded={storyOpen}
              />
              <BlueDiamondCta
                label={card.collectionCta}
                onClick={() => setCollectionOpen(true)}
                expanded={collectionOpen}
              />
            </div>
          </div>

          <CardImage
            image={card.image}
            imageAlt={card.imageAlt}
            imageClassName={card.imageClassName}
            imageOnRight={imageOnRight}
            wellClass={tones.well}
            wellStyle={tones.wellStyle}
            showOverlay={false}
          />
        </article>
      </EditorialReveal>

      {(storyOpen || collectionOpen) && (
        <Suspense fallback={null}>
          <PdfLookbookDrawer
            open={storyOpen}
            onOpenChange={setStoryOpen}
            pdfSrc={card.pdfSrc}
            title="Blue Star Story"
            description="Exclusive lab-grown blue diamonds by Bianca — rarity, colour, and high jewellery."
          />
          <BlueStarCollectionDrawer
            open={collectionOpen}
            onOpenChange={setCollectionOpen}
          />
        </Suspense>
      )}
    </>
  );
}

export default function HomeSectionCards() {
  return (
    <section
      aria-labelledby="home-sections-heading"
      className="relative overflow-hidden bg-[#faf8f5]"
    >
      <h2 id="home-sections-heading" className="sr-only">
        Collections
      </h2>
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden
        style={{
          background:
            "radial-gradient(ellipse 70% 40% at 50% 0%, rgba(244,240,230,0.9) 0%, transparent 65%)",
        }}
      />

      <div className="relative mx-auto max-w-[1400px] px-4 py-14 sm:px-6 md:px-8 md:py-20 lg:px-10">
        <div className="flex flex-col gap-6 md:gap-8 lg:gap-10">
          <BlueDiamondCard index={0} />
          {HOME_SECTION_CARDS.map((card, index) => (
            <SectionCard key={card.id} card={card} index={index + 1} />
          ))}
        </div>
      </div>
    </section>
  );
}
