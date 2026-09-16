type Props = {
  videoId: string;
  title: string;
  className?: string;
};

/**
 * YouTube iframe present on first paint — Googlebot does not click facades.
 * Keep 16:9 and a real pixel size so video indexing can measure the player.
 */
export default function IndexableYouTubeEmbed({
  videoId,
  title,
  className = "",
}: Props) {
  return (
    <div
      className={`relative aspect-video w-full overflow-hidden bg-black ${className}`}
    >
      <iframe
        src={`https://www.youtube.com/embed/${videoId}?rel=0`}
        title={title}
        width={1280}
        height={720}
        allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        referrerPolicy="strict-origin-when-cross-origin"
        className="absolute inset-0 size-full border-0"
      />
    </div>
  );
}
