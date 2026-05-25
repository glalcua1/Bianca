import type { ImgHTMLAttributes } from "react";

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
