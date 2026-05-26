import type { ImgHTMLAttributes } from "react";
import { isAppleMobile } from "../../lib/isAppleMobile";
import ProtectedCanvasImage from "./ProtectedCanvasImage";

type Props = ImgHTMLAttributes<HTMLImageElement> & {
  wrapperClassName?: string;
};

function blockInteraction(event: React.SyntheticEvent) {
  event.preventDefault();
}

export default function ProtectedImage({
  wrapperClassName = "",
  className = "",
  alt,
  ...props
}: Props) {
  if (isAppleMobile()) {
    return (
      <ProtectedCanvasImage
        wrapperClassName={wrapperClassName}
        className={className}
        alt={alt}
        {...props}
      />
    );
  }

  return (
    <div
      data-protected-media
      className={`protected-media relative select-none ${wrapperClassName}`}
      onContextMenu={blockInteraction}
      onDragStart={blockInteraction}
    >
      <img
        {...props}
        alt={alt}
        draggable={false}
        className={`protected-media__asset pointer-events-none select-none ${className}`}
      />
      <div
        className="protected-media__shield absolute inset-0 z-10"
        aria-hidden
        onContextMenu={blockInteraction}
        onDragStart={blockInteraction}
      />
    </div>
  );
}
