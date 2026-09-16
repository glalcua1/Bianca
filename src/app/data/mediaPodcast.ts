/** Featured podcast content for the Media page. */

export const MEDIA_PODCAST_VIDEO_ID = "FicU78IRX1M";

/** Dedicated watch page — /media is a press archive, not a single-video watch page. */
export const MEDIA_PODCAST_WATCH_PATH = "/podcast";

export const MEDIA_PODCAST = {
  eyebrow: "Featured Podcast",
  heading: "The Conversation Changing How We Think About Diamonds",
  description:
    "Explore the most comprehensive podcast on lab-grown diamonds and the changing jewellery industry — from evolving consumer mindsets and new definitions of luxury to the trends shaping the future of diamond jewellery.",
  supporting:
    "A thought-provoking conversation about how lab-grown diamonds are changing consumer perceptions, jewellery buying behaviour and the future of the industry.",
  ctaLabel: "Watch the Podcast",
  watchUrl: `https://www.youtube.com/watch?v=${MEDIA_PODCAST_VIDEO_ID}`,
  embedUrl: `https://www.youtube.com/embed/${MEDIA_PODCAST_VIDEO_ID}`,
  questionsEyebrow: "Inside the Conversation",
  questionsHeading: "Questions the Podcast Explores",
  questionsIntro:
    "From the value of natural diamonds to the rise of lab-grown diamonds, sustainability, luxury and changing consumer behaviour — the conversation challenges some of the assumptions shaping today's jewellery industry.",
  questions: [
    "Are Natural Diamonds a Marketing Scam?",
    "Are Diamonds Really an Investment?",
    "Are Lab-Grown Diamonds Fake?",
    "Do Rich People Hide Lab-Grown Diamonds?",
    "Are Lab-Grown Diamonds Truly Sustainable?",
    "Can You Tell Lab-Grown & Natural Apart?",
    "Why Bianca Diamonds?",
    "Why No Physical Store?",
    "Can Luxury Jewellery Work Without a Showroom?",
    "The Cannes Story Begins",
    "How Cannes Changed Bianca Diamonds",
    "Are Celebrities Changing Diamond Trends?",
  ],
} as const;

/**
 * VideoObject fields grounded in YouTube oEmbed / public page data.
 * uploadDate omitted — not reliably available without inventing metadata.
 */
export const MEDIA_PODCAST_VIDEO_SEO = {
  name: "Episode 74 | The Old Rules of Jewellery Are Finally Changing | Ft. Shweta Rastogi Lal",
  description:
    "The most comprehensive podcast on lab-grown diamonds and the changing jewellery industry — a deep conversation on changing mindsets, consumer behaviour and emerging jewellery trends featuring Shweta Rastogi Lal of Bianca Diamonds.",
  thumbnailUrl: `https://i.ytimg.com/vi/${MEDIA_PODCAST_VIDEO_ID}/hqdefault.jpg`,
  thumbnailUrlMax: `https://i.ytimg.com/vi/${MEDIA_PODCAST_VIDEO_ID}/maxresdefault.jpg`,
  embedUrl: `https://www.youtube.com/embed/${MEDIA_PODCAST_VIDEO_ID}`,
  watchUrl: `https://www.youtube.com/watch?v=${MEDIA_PODCAST_VIDEO_ID}`,
  pagePath: MEDIA_PODCAST_WATCH_PATH,
  pageUrl: `https://www.biancadiamonds.com${MEDIA_PODCAST_WATCH_PATH}`,
  publisherName: "Mic Pe Milenge with Tamanna",
  iframeTitle:
    "Bianca Diamonds podcast on lab-grown diamonds and the changing jewellery industry",
  pageTitle:
    "Featured Podcast | The Old Rules of Jewellery Are Finally Changing | Bianca Diamonds",
  pageDescription:
    "Watch the Bianca Diamonds featured podcast: Episode 74 of Mic Pe Milenge with Tamanna, featuring Shweta Rastogi Lal on lab-grown diamonds and the changing jewellery industry.",
} as const;
