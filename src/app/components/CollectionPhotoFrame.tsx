import ProtectedImage from "./protection/ProtectedImage";
import BrandImageWatermark from "./BrandImageWatermark";
import SalonJewelVideo from "./SalonJewelVideo";
import { ATELIER_IMAGE_SIZES } from "../lib/optimizedImage";

const FRAME_WIDTH = 443;
const FRAME_HEIGHT = 508;

type Props = {
  src: string;
  alt: string;
  "data-name"?: string;
  /** Scale frame to container width (for grids). Default: fixed atelier size. */
  fluid?: boolean;
  /** Black image well — for dark-background product photography (e.g. necklaces). */
  darkImageWell?: boolean;
  /** Product-shot backdrop — overrides darkImageWell and cream default when set. */
  imageWellColor?: string;
  /** When set, the well plays a looping salon film instead of a still image. */
  video?: string;
  /** Video fit inside the well — contain shows the full piece/card */
  videoObjectFit?: "contain" | "cover";
};

export default function CollectionPhotoFrame({
  src,
  alt,
  "data-name": dataName,
  fluid = false,
  darkImageWell = false,
  imageWellColor,
  video,
  videoObjectFit = "cover",
}: Props) {
  const imageWellBg = imageWellColor
    ? ""
    : darkImageWell
      ? "bg-black"
      : "bg-[#faf8f5]";
  return (
    <div
      className={`relative w-full max-w-full min-w-0 ${fluid ? "" : "shrink-0"}`}
      style={
        fluid
          ? { aspectRatio: `${FRAME_WIDTH} / ${FRAME_HEIGHT}`, width: "100%" }
          : { width: FRAME_WIDTH, height: FRAME_HEIGHT }
      }
      data-name={dataName}
    >
      {/* Gilt outer frame */}
      <div className="flex h-full w-full flex-col border border-[#766d42]/65 bg-[#f4f0e6] p-[4px] shadow-[0_10px_40px_rgba(29,60,52,0.1)]">
        {/* Passe-partout */}
        <div className="flex min-h-0 flex-1 flex-col border border-[#766d42]/30 bg-[#faf8f5] p-[3px]">
          {/* White mount — padding creates visible mat on all four sides */}
          <div className="flex min-h-0 flex-1 flex-col border border-[#1d3c34]/12 bg-white p-4 shadow-[inset_0_0_0_1px_rgba(220,203,123,0.22)] md:p-[24px]">
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
                  wrapperClassName="absolute inset-0 flex items-center justify-center"
                  src={src}
                  alt={alt}
                  sizes={ATELIER_IMAGE_SIZES}
                  loading="lazy"
                  decoding="async"
                  className="max-h-full max-w-full object-contain object-center"
                />
              )}
              <BrandImageWatermark />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export const COLLECTION_FRAME_HEIGHT = FRAME_HEIGHT;
