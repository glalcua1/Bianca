import type { ImgHTMLAttributes } from "react";

type Props = ImgHTMLAttributes<HTMLImageElement> & {
  wrapperClassName?: string;
  /** Above-the-fold hero images — defaults to lazy for everything else */
  priority?: boolean;
};

/**
 * Single <img> element — desktop protection is handled by content-protection CSS
 * and useContentProtection hooks. Avoids mobile double-render and canvas overhead.
 */
export default function ProtectedImage({
  wrapperClassName = "",
  className = "",
  alt,
  priority = false,
  loading,
  decoding = "async",
  draggable = false,
  ...props
}: Props) {
  const img = (
    <img
      {...props}
      alt={alt}
      loading={loading ?? (priority ? "eager" : "lazy")}
      decoding={decoding}
      draggable={draggable}
      fetchPriority={priority ? "high" : undefined}
      className={className}
    />
  );

  if (wrapperClassName) {
    return <div className={wrapperClassName}>{img}</div>;
  }

  return img;
}
