type Props = {
  className?: string;
};

/** House mark — bottom-right overlay to brand imagery and mask corner artefacts. */
export default function BrandImageWatermark({ className = "" }: Props) {
  return (
    <img
      src="/BD_watermark.png"
      alt=""
      aria-hidden
      draggable={false}
      className={`pointer-events-none absolute bottom-3 right-3 z-[6] hidden h-auto w-[clamp(48px,20%,76px)] select-none opacity-95 md:block md:bottom-4 md:right-4 md:w-[clamp(52px,18%,84px)] ${className}`}
    />
  );
}
