import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router";
import { useMediaMinWidth } from "../hooks/useMediaMinWidth";
import BrandImageWatermark from "./BrandImageWatermark";
import ProtectedImage from "./protection/ProtectedImage";

const DESIGN_W = 1512;
const CARD_TOP = 93;
const CARD_HEIGHT = 693;
const CARD_LEFT = 39;
const CARD_WIDTH = 1434;
const CARD_BOTTOM = CARD_TOP + CARD_HEIGHT;
const BOTTOM_SPACING = 96;
const DESIGN_H = CARD_BOTTOM + BOTTOM_SPACING;
/** Align with The House hero copy — 135px inset from card inner edge */
const CONTENT_LEFT = 174;
const CONTENT_WIDTH = 508;
const HERO_FOREST_BG = "#1d3c34";
/** Darker than page fill so the left of the gradient stroke reads on forest */
const HERO_STROKE_GREEN = "#071410";
/** Right-side editorial frame — inset within the forest card */
const IMAGE_PANEL = {
  left: 819,
  top: 130,
  width: 600,
  height: 620,
};

const GRADIENT_CARD_DESKTOP = `absolute rounded-[20px] border border-solid border-transparent [background:linear-gradient(${HERO_FOREST_BG},${HERO_FOREST_BG})_padding-box,linear-gradient(to_right,${HERO_STROKE_GREEN},#766d42,#dccb7b)_border-box]`;
const GRADIENT_CARD_MOBILE = `mx-auto w-full max-w-lg rounded-[16px] border border-solid border-transparent p-5 [background:linear-gradient(${HERO_FOREST_BG},${HERO_FOREST_BG})_padding-box,linear-gradient(to_right,${HERO_STROKE_GREEN},#766d42,#dccb7b)_border-box]`;

export type SalonEditorialHeroProps = {
  eyebrow: string;
  title: string;
  body: string;
  image: string;
  imageAlt: string;
  cta?: { href: string; label: string };
  /** Featured piece callout beneath the body copy */
  feature?: { label: string; detail: string };
  /**
   * `cover` — lifestyle / red-carpet photography filling the frame.
   * `contain` — atelier product plates with breathing room (default).
   */
  imageMode?: "cover" | "contain";
  objectPosition?: string;
};

function HeroCopy({
  eyebrow,
  title,
  body,
  feature,
  cta,
  headingId,
  align = "left",
  showCta = true,
}: Pick<
  SalonEditorialHeroProps,
  "eyebrow" | "title" | "body" | "cta" | "feature"
> & {
  headingId?: string;
  align?: "left" | "center";
  showCta?: boolean;
}) {
  const centered = align === "center";

  return (
    <div className={centered ? "text-center" : undefined}>
      <p
        className={`m-0 text-house-eyebrow text-gold-on-forest ${
          centered ? "text-center" : ""
        }`}
      >
        {eyebrow}
      </p>

      <h1
        id={headingId}
        className={
          centered
            ? "m-0 mt-4 text-center text-house-display text-[clamp(1.35rem,5.5vw,1.85rem)] leading-snug tracking-[0.06em] text-on-forest"
            : "m-0 mt-6 max-w-[508px] text-house-display text-[36px] leading-[1.2] tracking-[1.2px] text-on-forest"
        }
      >
        {title}
      </h1>

      <p
        className={
          centered
            ? "m-0 mt-4 text-center text-house-tagline text-[clamp(1rem,4vw,1.125rem)] leading-relaxed text-on-forest-body"
            : "m-0 mt-7 max-w-[508px] text-house-tagline text-[24px] leading-[1.45] tracking-[0.04em] text-on-forest-body"
        }
      >
        {body}
      </p>

      {feature ? (
        <div
          className={
            centered
              ? "mx-auto mt-6 max-w-sm border-t border-[#dccb7b]/35 pt-5"
              : "mt-8 max-w-[508px] border-l border-[#dccb7b]/35 pl-5"
          }
        >
          <p
            className={
              centered
                ? "m-0 font-editorial text-[1rem] tracking-[0.08em] text-on-forest"
                : "m-0 font-editorial text-[18px] tracking-[0.08em] text-on-forest"
            }
          >
            {feature.label}
          </p>
          <p className="m-0 mt-2 text-[11px] uppercase tracking-[0.22em] text-gold-on-forest">
            {feature.detail}
          </p>
        </div>
      ) : null}

      {showCta && cta ? (
        cta.href.startsWith("/") && !cta.href.startsWith("//") ? (
          <Link
            to={cta.href}
            className={
              centered
                ? "mt-8 block text-center font-editorial text-[15px] uppercase tracking-[0.08em] text-gold-on-forest"
                : "mt-9 w-fit font-editorial text-[15px] uppercase tracking-[0.8px] text-gold-on-forest transition-colors hover:text-on-forest"
            }
          >
            {cta.label}
          </Link>
        ) : (
          <a
            href={cta.href}
            className={
              centered
                ? "mt-8 block text-center font-editorial text-[15px] uppercase tracking-[0.08em] text-gold-on-forest"
                : "mt-9 w-fit font-editorial text-[15px] uppercase tracking-[0.8px] text-gold-on-forest transition-colors hover:text-on-forest"
            }
          >
            {cta.label}
          </a>
        )
      ) : null}
    </div>
  );
}

function HeroPortrait({
  image,
  imageAlt,
  imageMode = "contain",
  objectPosition = "center",
  mobile = false,
}: Pick<
  SalonEditorialHeroProps,
  "image" | "imageAlt" | "imageMode" | "objectPosition"
> & { mobile?: boolean }) {
  const cover = imageMode === "cover";

  if (mobile) {
    return (
      <div className="relative mx-auto mt-6 w-full max-w-full overflow-hidden rounded-[12px] bg-black">
        <ProtectedImage
          priority
          wrapperClassName={
            cover
              ? "relative block aspect-[4/5] w-full max-w-full [&_picture]:absolute [&_picture]:inset-0 [&_picture]:block [&_picture]:h-full [&_picture]:w-full"
              : "relative block w-full max-w-full"
          }
          alt={imageAlt}
          className={
            cover
              ? "absolute inset-0 h-full w-full object-cover"
              : "mx-auto block h-auto w-full max-w-full max-h-[min(70vh,480px)] object-contain object-bottom"
          }
          style={cover ? { objectPosition } : undefined}
          src={image}
        />
        <BrandImageWatermark className="!block bottom-4 right-4 w-[clamp(48px,16%,72px)]" />
      </div>
    );
  }

  return (
    <div
      className="absolute overflow-hidden rounded-[16px] bg-black"
      style={{
        left: IMAGE_PANEL.left,
        top: IMAGE_PANEL.top,
        width: IMAGE_PANEL.width,
        height: IMAGE_PANEL.height,
      }}
      data-name="Hero portrait frame"
    >
      {cover ? (
        <>
          <ProtectedImage
            priority
            wrapperClassName="absolute inset-0 [&_picture]:block [&_picture]:h-full [&_picture]:w-full"
            alt={imageAlt}
            className="h-full w-full object-cover"
            style={{ objectPosition }}
            src={image}
          />
          <BrandImageWatermark className="bottom-5 right-5 w-[clamp(56px,14%,92px)] md:bottom-6 md:right-6" />
        </>
      ) : (
        <div className="absolute inset-0 flex items-center justify-center overflow-hidden px-8 py-8">
          <ProtectedImage
            priority
            wrapperClassName="relative flex max-h-full max-w-full items-center justify-center"
            alt={imageAlt}
            className="max-h-full max-w-full object-contain"
            src={image}
          />
          <BrandImageWatermark className="bottom-5 right-5 w-[clamp(56px,14%,92px)] md:bottom-6 md:right-6" />
        </div>
      )}
    </div>
  );
}

function SalonEditorialHeroMobile({
  headingId,
  ...props
}: SalonEditorialHeroProps & { headingId?: string }) {
  return (
    <section className="overflow-x-clip bg-[#1d3c34] px-4 pb-10 pt-2">
      <div className={GRADIENT_CARD_MOBILE}>
        <HeroCopy
          {...props}
          headingId={headingId}
          align="center"
          showCta={false}
        />
        <HeroPortrait
          image={props.image}
          imageAlt={props.imageAlt}
          imageMode={props.imageMode}
          objectPosition={props.objectPosition}
          mobile
        />
        {props.cta ? (
          <a
            href={props.cta.href}
            className="mt-8 block text-center font-editorial text-[15px] uppercase tracking-[0.08em] text-gold-on-forest"
          >
            {props.cta.label}
          </a>
        ) : null}
      </div>
    </section>
  );
}

/**
 * House salon hero — forest card, gold gradient stroke, left editorial column,
 * right portrait frame. Shared by Cannes and Fine Jewellery category pages.
 */
export default function SalonEditorialHero({
  headingId,
  ...props
}: SalonEditorialHeroProps & { headingId?: string }) {
  const isDesktop = useMediaMinWidth();
  const [scale, setScale] = useState(1);
  const [height, setHeight] = useState(DESIGN_H);

  const compute = useCallback(() => {
    const s = window.innerWidth / DESIGN_W;
    setScale(s);
    setHeight(Math.ceil(DESIGN_H * s));
  }, []);

  useEffect(() => {
    if (!isDesktop) return;
    compute();
    window.addEventListener("resize", compute);
    return () => window.removeEventListener("resize", compute);
  }, [compute, isDesktop]);

  if (!isDesktop) {
    return <SalonEditorialHeroMobile {...props} headingId={headingId} />;
  }

  return (
    <div
      className="relative z-10 w-full overflow-hidden bg-[#1d3c34]"
      style={{ height: `${height}px` }}
      aria-labelledby={headingId}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: `${DESIGN_W}px`,
          height: `${DESIGN_H}px`,
          transformOrigin: "top left",
          transform: `scale(${scale})`,
          willChange: "transform",
        }}
      >
        <div
          className="relative bg-[#1d3c34]"
          style={{ width: DESIGN_W, height: DESIGN_H }}
        >
          <div
            className={GRADIENT_CARD_DESKTOP}
            style={{
              left: CARD_LEFT,
              top: CARD_TOP,
              width: CARD_WIDTH,
              height: CARD_HEIGHT,
            }}
          />

          <HeroPortrait
            image={props.image}
            imageAlt={props.imageAlt}
            imageMode={props.imageMode}
            objectPosition={props.objectPosition}
          />

          <div
            className="absolute flex flex-col justify-center"
            style={{
              left: CONTENT_LEFT,
              top: CARD_TOP,
              width: CONTENT_WIDTH,
              height: CARD_HEIGHT,
            }}
          >
            <HeroCopy {...props} headingId={headingId} />
          </div>
        </div>
      </div>
    </div>
  );
}
