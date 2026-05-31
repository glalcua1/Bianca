import { useEffect, useRef, useState, type ImgHTMLAttributes } from "react";

type Props = ImgHTMLAttributes<HTMLImageElement> & {
  wrapperClassName?: string;
};

function blockInteraction(event: React.SyntheticEvent) {
  event.preventDefault();
}

function readObjectFit(className: string): "cover" | "contain" {
  if (className.includes("object-contain")) return "contain";
  return "cover";
}

function drawImageToCanvas(
  canvas: HTMLCanvasElement,
  image: HTMLImageElement,
  objectFit: "cover" | "contain",
  cssWidth: number,
  cssHeight: number,
) {
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  ctx.clearRect(0, 0, cssWidth, cssHeight);
  const width = cssWidth;
  const height = cssHeight;

  const scale =
    objectFit === "contain"
      ? Math.min(width / image.naturalWidth, height / image.naturalHeight)
      : Math.max(width / image.naturalWidth, height / image.naturalHeight);

  const drawWidth = image.naturalWidth * scale;
  const drawHeight = image.naturalHeight * scale;
  const offsetX = (width - drawWidth) / 2;
  const offsetY = (height - drawHeight) / 2;

  ctx.drawImage(image, offsetX, offsetY, drawWidth, drawHeight);
}

export default function ProtectedCanvasImage({
  wrapperClassName = "",
  className = "",
  alt = "",
  src,
}: Props) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [useFallbackImg, setUseFallbackImg] = useState(false);
  const objectFit = readObjectFit(className);
  const imageSrc = typeof src === "string" ? src : "";

  useEffect(() => {
    if (useFallbackImg) return;

    const wrapper = wrapperRef.current;
    const canvas = canvasRef.current;
    if (!wrapper || !canvas || !imageSrc) return;

    const image = new Image();
    image.decoding = "async";

    const render = () => {
      const rect = wrapper.getBoundingClientRect();
      const cssWidth = Math.max(1, Math.round(rect.width));
      const cssHeight = Math.max(1, Math.round(rect.height));
      const dpr = Math.min(window.devicePixelRatio || 1, 3);

      canvas.width = cssWidth * dpr;
      canvas.height = cssHeight * dpr;
      canvas.style.width = `${cssWidth}px`;
      canvas.style.height = `${cssHeight}px`;

      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);

      if (image.complete && image.naturalWidth > 0) {
        drawImageToCanvas(canvas, image, objectFit, cssWidth, cssHeight);
      }
    };

    image.onload = render;
    image.onerror = () => {
      setUseFallbackImg(true);
    };

    if (imageSrc.startsWith("/") || imageSrc.startsWith(window.location.origin)) {
      image.crossOrigin = "anonymous";
    }

    image.src = imageSrc;

    const observer = new ResizeObserver(render);
    observer.observe(wrapper);
    render();

    return () => {
      observer.disconnect();
      image.onload = null;
      image.onerror = null;
    };
  }, [imageSrc, objectFit, useFallbackImg]);

  return (
    <div
      ref={wrapperRef}
      data-protected-media
      data-protected-canvas
      className={`protected-media protected-media--canvas relative select-none ${wrapperClassName}`}
      onContextMenu={blockInteraction}
      onDragStart={blockInteraction}
    >
      {useFallbackImg ? (
        <img
          src={imageSrc}
          alt={alt}
          draggable={false}
          className={`protected-media__asset pointer-events-none size-full select-none ${className}`}
        />
      ) : (
        <canvas
          ref={canvasRef}
          role="img"
          aria-label={alt}
          className={`protected-media__asset pointer-events-none size-full select-none ${className}`}
        />
      )}
      <div
        className="protected-media__shield absolute inset-0 z-10 touch-none"
        aria-hidden
        onContextMenu={blockInteraction}
        onDragStart={blockInteraction}
      />
      <div
        className="ios-media-watermark absolute inset-0 z-[11] hidden touch-none md:block"
        aria-hidden
      />
    </div>
  );
}
