import type { ImgHTMLAttributes } from "react";
import { useMediaMinWidth } from "../../hooks/useMediaMinWidth";
import { isAppleMobile } from "../../lib/isAppleMobile";
import ProtectedCanvasImage from "./ProtectedCanvasImage";

type Props = ImgHTMLAttributes<HTMLImageElement> & {
  wrapperClassName?: string;
};

function blockInteraction(event: React.SyntheticEvent) {
  event.preventDefault();
}

function stripProtectionClasses(className: string) {
  return className
    .replace(/\bpointer-events-none\b/g, "")
    .replace(/\bselect-none\b/g, "")
    .replace(/\btouch-none\b/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

export default function ProtectedImage({
  wrapperClassName = "",
  className = "",
  alt,
  ...props
}: Props) {
  const isDesktop = useMediaMinWidth();
  const useCanvasProtection = isAppleMobile() && isDesktop;

  if (!isDesktop) {
    const mobileClassName = stripProtectionClasses(className);

    if (wrapperClassName) {
      return (
        <div className={wrapperClassName}>
          <img {...props} alt={alt} className={mobileClassName} />
        </div>
      );
    }

    return <img {...props} alt={alt} className={mobileClassName} />;
  }

  if (useCanvasProtection) {
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
