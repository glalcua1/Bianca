import {
  HOME_HERO_VIDEO_DESKTOP,
  HOME_HERO_VIDEO_POSTER,
  HOME_HERO_VIDEO_SEO,
} from "../../data/homeHeroVideo";

type Props = {
  className?: string;
};

/** Self-hosted MP4 player with src in the HTML — required for video indexing. */
export default function IndexableHeroFilmPlayer({ className = "" }: Props) {
  return (
    <div
      className={`relative aspect-video w-full overflow-hidden bg-black ${className}`}
    >
      <video
        controls
        playsInline
        preload="metadata"
        poster={HOME_HERO_VIDEO_POSTER}
        width={1920}
        height={1080}
        title={HOME_HERO_VIDEO_SEO.name}
        aria-label={HOME_HERO_VIDEO_SEO.name}
        className="absolute inset-0 size-full bg-black object-contain object-center"
      >
        <source src={HOME_HERO_VIDEO_DESKTOP} type="video/mp4" />
      </video>
    </div>
  );
}
