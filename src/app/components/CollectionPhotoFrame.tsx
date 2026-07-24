import ProtectedImage from "./protection/ProtectedImage";
import BrandImageWatermark from "./BrandImageWatermark";
import SalonJewelVideo from "./SalonJewelVideo";
import { ATELIER_IMAGE_SIZES } from "../lib/optimizedImage";

const FRAME_WIDTH = 443;
const FRAME_HEIGHT = 508;

type FrameVariant = "gilt" | "ebony";
type FrameMat = "classic" | "flush";

type Props = {
  src: string;
  alt: string;
  "data-name"?: string;
  /** Scale frame to container width (for grids). Default: fixed atelier size. */
  fluid?: boolean;
  /** Gilt salon (default) or ebony wood — butterfly collection */
  variant?: FrameVariant;
  /**
   * Mount depth around the image well.
   * `flush` pulls the plate to the frame rabbet — for suite photos that should fill the frame.
   */
  mat?: FrameMat;
  /** Black image well — for dark-background product photography (e.g. necklaces). */
  darkImageWell?: boolean;
  /** Product-shot backdrop — overrides darkImageWell and cream default when set. */
  imageWellColor?: string;
  /** When set, the well plays a looping salon film instead of a still image. */
  video?: string;
  /** Video fit inside the well — contain shows the full piece/card */
  videoObjectFit?: "contain" | "cover";
  /** Optional still-image tuning for unusually tall or wide product photography. */
  imageClassName?: string;
  imageWrapperClassName?: string;
  /**
   * Override fluid frame proportions (CSS aspect-ratio). Use for landscape salon
   * suite photography so the plate fills the well without letterboxing.
   */
  aspectRatio?: string;
};

export default function CollectionPhotoFrame({
  src,
  alt,
  "data-name": dataName,
  fluid = false,
  variant = "gilt",
  mat = "classic",
  darkImageWell = false,
  imageWellColor,
  video,
  videoObjectFit = "cover",
  imageClassName = "max-h-full max-w-full object-contain object-center",
  imageWrapperClassName = "absolute inset-0 flex items-center justify-center",
  aspectRatio,
}: Props) {
  const isEbony = variant === "ebony";
  const isFlush = mat === "flush";
  const imageWellBg = imageWellColor
    ? ""
    : darkImageWell
      ? "bg-black"
      : isEbony
        ? ""
        : "bg-[#faf8f5]";
  const frameAspect = aspectRatio ?? `${FRAME_WIDTH} / ${FRAME_HEIGHT}`;
  const ebonyMountPad = isFlush
    ? "p-[2px] md:p-[3px]"
    : "p-4 md:p-[24px]";
  const giltMountPad = isFlush
    ? "p-[2px] md:p-[3px]"
    : "p-4 md:p-[24px]";
  return (
    <div
      className={`relative w-full max-w-full min-w-0 ${fluid ? "" : "shrink-0"}`}
      style={
        fluid
          ? { aspectRatio: frameAspect, width: "100%" }
          : { width: FRAME_WIDTH, height: FRAME_HEIGHT }
      }
      data-name={dataName}
    >
      {/* Outer frame */}
      <div
        className={
          isEbony
            ? "flex h-full w-full flex-col border border-[#6b5345] bg-gradient-to-br from-[#2a1e18] via-[#1a120c] to-[#100c09] p-[6px] shadow-[0_16px_48px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(122,99,85,0.35)]"
            : "flex h-full w-full flex-col border border-[#766d42]/65 bg-[#f4f0e6] p-[4px] shadow-[0_10px_40px_rgba(29,60,52,0.1)]"
        }
      >
        {isEbony ? (
          <div className="flex min-h-0 flex-1 flex-col bg-[#0a0908] p-[5px] shadow-[inset_0_4px_14px_rgba(0,0,0,0.72),inset_0_1px_0_rgba(92,64,51,0.22),inset_0_-1px_0_rgba(0,0,0,0.85)]">
            {/* Passe-partout — mat board set into the wood rabbet */}
            <div
              className={`flex min-h-0 flex-1 flex-col border border-[#5c4a3f]/55 bg-[#2c2826] shadow-[0_1px_0_rgba(122,99,85,0.18)] ${isFlush ? "p-0" : "p-[3px]"}`}
            >
              {/* Mount */}
              <div
                className={`flex min-h-0 flex-1 flex-col border border-[#7a6355]/45 bg-[#3d3835] shadow-[inset_0_2px_6px_rgba(0,0,0,0.35),inset_0_0_0_1px_rgba(122,99,85,0.22)] ${ebonyMountPad}`}
              >
                <div
                  className={`relative flex min-h-0 flex-1 overflow-hidden ${imageWellBg}`}
                  style={
                    imageWellColor
                      ? { backgroundColor: imageWellColor }
                      : { backgroundColor: "#141210" }
                  }
                >
                  {video ? (
                    <div className="absolute inset-0 overflow-hidden">
                      <SalonJewelVideo
                        src={video}
                        ariaLabel={alt}
                        objectFit={videoObjectFit}
                        autoPlay={false}
                      />
                    </div>
                  ) : (
                    <ProtectedImage
                      wrapperClassName={imageWrapperClassName}
                      src={src}
                      alt={alt}
                      sizes={ATELIER_IMAGE_SIZES}
                      loading="lazy"
                      decoding="async"
                      className={imageClassName}
                    />
                  )}
                  <BrandImageWatermark />
                </div>
              </div>
            </div>
          </div>
        ) : (
          <>
        {/* Passe-partout */}
        <div
          className={`flex min-h-0 flex-1 flex-col border border-[#766d42]/30 bg-[#faf8f5] ${isFlush ? "p-0" : "p-[3px]"}`}
        >
          {/* Mount — padding creates visible mat on all four sides */}
          <div
            className={`flex min-h-0 flex-1 flex-col border border-[#1d3c34]/12 bg-white shadow-[inset_0_0_0_1px_rgba(220,203,123,0.22)] ${giltMountPad}`}
          >
            <div
              className={`relative flex min-h-0 flex-1 overflow-hidden ${imageWellBg}`}
              style={imageWellColor ? { backgroundColor: imageWellColor } : undefined}
            >
              {video ? (
                <div className="absolute inset-0 overflow-hidden">
                  <SalonJewelVideo
                    src={video}
                    ariaLabel={alt}
                    objectFit={videoObjectFit}
                    autoPlay={false}
                  />
                </div>
              ) : (
                <ProtectedImage
                  wrapperClassName={imageWrapperClassName}
                  src={src}
                  alt={alt}
                  sizes={ATELIER_IMAGE_SIZES}
                  loading="lazy"
                  decoding="async"
                  className={imageClassName}
                />
              )}
              <BrandImageWatermark />
            </div>
          </div>
        </div>
          </>
        )}
      </div>
    </div>
  );
}

export const COLLECTION_FRAME_HEIGHT = FRAME_HEIGHT;
