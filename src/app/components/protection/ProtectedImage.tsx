import type { ImgHTMLAttributes } from "react";
import { getOptimizedPicture } from "../../lib/optimizedImage";

type Props = ImgHTMLAttributes<HTMLImageElement> & {
  wrapperClassName?: string;
  /** Above-the-fold hero images — defaults to lazy for everything else */
  priority?: boolean;
  /** Responsive layout hint for srcset (atelier frames, editorial panels) */
  sizes?: string;
};

/**
 * Single <img> or <picture> with WebP srcset when build-time derivatives exist.
 * Desktop protection is handled by content-protection CSS and useContentProtection hooks.
 */
export default function ProtectedImage({
  wrapperClassName = "",
  className = "",
  alt,
  src,
  priority = false,
  loading,
  decoding = "async",
  draggable = false,
  sizes,
  ...props
}: Props) {
  const loadingAttr = loading ?? (priority ? "eager" : "lazy");
  const picture =
    typeof src === "string" ? getOptimizedPicture(src, sizes) : null;

  const img = (
    <img
      {...props}
      src={src}
      alt={alt}
      loading={loadingAttr}
      decoding={decoding}
      draggable={draggable}
      fetchPriority={priority ? "high" : undefined}
      className={className}
    />
  );

  const content =
    picture && src ? (
      <picture>
        <source
          type="image/webp"
          srcSet={picture.srcSet}
          sizes={picture.sizes}
        />
        {img}
      </picture>
    ) : (
      img
    );

  if (wrapperClassName) {
    return <div className={wrapperClassName}>{content}</div>;
  }

  return content;
}
