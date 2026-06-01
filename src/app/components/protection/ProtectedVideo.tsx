import { forwardRef, type ReactNode, type VideoHTMLAttributes } from "react";
import { useMediaMinWidth } from "../../hooks/useMediaMinWidth";
import { isAppleMobile } from "../../lib/isAppleMobile";

type Props = VideoHTMLAttributes<HTMLVideoElement> & {
  wrapperClassName?: string;
  controlsOverlay?: ReactNode;
};

function blockInteraction(event: React.SyntheticEvent) {
  event.preventDefault();
}

const ProtectedVideo = forwardRef<HTMLVideoElement, Props>(function ProtectedVideo(
  { wrapperClassName = "", className = "", controlsOverlay, ...props },
  ref,
) {
  const isDesktop = useMediaMinWidth();

  if (!isDesktop) {
    if (wrapperClassName || controlsOverlay) {
      return (
        <div className={`relative size-full ${wrapperClassName}`}>
          <video {...props} ref={ref} className={`size-full ${className}`} />
          {controlsOverlay ? <div className="absolute inset-0 z-20">{controlsOverlay}</div> : null}
        </div>
      );
    }

    return <video {...props} ref={ref} className={className} />;
  }

  return (
    <div
      data-protected-media
      className={`protected-media relative size-full select-none ${wrapperClassName}`}
      onContextMenu={blockInteraction}
      onDragStart={blockInteraction}
    >
      <video
        {...props}
        ref={ref}
        controls={false}
        controlsList="nodownload nofullscreen noremoteplayback"
        disablePictureInPicture
        disableRemotePlayback
        draggable={false}
        className={`protected-media__asset pointer-events-none size-full select-none ${className}`}
      />
      <div
        className="protected-media__shield absolute inset-0 z-10"
        aria-hidden
        onContextMenu={blockInteraction}
        onDragStart={blockInteraction}
      />
      {controlsOverlay ? (
        <div className="pointer-events-none absolute inset-0 z-20">{controlsOverlay}</div>
      ) : null}
      {isAppleMobile() ? (
        <div
          className="ios-media-watermark absolute inset-0 z-[21] hidden touch-none md:block"
          aria-hidden
        />
      ) : null}
    </div>
  );
});

export default ProtectedVideo;
