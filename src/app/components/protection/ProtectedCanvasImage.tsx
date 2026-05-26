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
) {
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  const { width, height } = canvas;
  ctx.clearRect(0, 0, width, height);

  const scale =
    objectFit === "contain"
      ? Math.min(width / image.naturalWidth, height / image.naturalHeight)
      : Math.max(width / image.naturalWidth, height / image.naturalHeight);

  const drawWidth = image.naturalWidth * scale;
  const drawHeight = image.naturalHeight * scale;
  const offsetX = (width - drawWidth) / 2;
  const offsetY = (height - drawHeight) / 2;

  ctx.drawImage(image, offsetX, offsetY, drawWidth, drawHeight);

  ctx.save();
  ctx.globalAlpha = 0.14;
  ctx.translate(width / 2, height / 2);
  ctx.rotate(-Math.PI / 6);
  ctx.fillStyle = "#1d3c34";
  ctx.font = "600 11px Arial, sans-serif";
  ctx.textAlign = "center";

  const label = "BIANCA DIAMONDS";
  const stepX = 140;
  const stepY = 48;
  for (let y = -height; y < height; y += stepY) {
    for (let x = -width; x < width; x += stepX) {
      ctx.fillText(label, x, y);
    }
  }
  ctx.restore();
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
      const width = Math.max(1, Math.round(rect.width));
      const height = Math.max(1, Math.round(rect.height));
      canvas.width = width;
      canvas.height = height;
      if (image.complete && image.naturalWidth > 0) {
        drawImageToCanvas(canvas, image, objectFit);
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
      <div className="ios-media-watermark absolute inset-0 z-[11] touch-none" aria-hidden />
    </div>
  );
}
