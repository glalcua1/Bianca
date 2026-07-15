import SalonEditorialHero from "./SalonEditorialHero";

/** Cannes Film Festival showcase hero — shared salon packaging. */
export default function FineJewelleryHero() {
  return (
    <SalonEditorialHero
      eyebrow="Cannes Film Festival · 2026"
      title="Exclusive Jewellery Showcase"
      body="A cinematic editorial on Bianca Diamonds’ debut at Cannes — on the world’s most celebrated red carpet."
      image="/Cannes/IMG_7239.jpg"
      imageAlt="Bianca Diamonds on the Cannes Film Festival 2026 red carpet"
      imageMode="cover"
      objectPosition="center 18%"
      cta={{ href: "#jewels", label: "Discover the Collection →" }}
    />
  );
}
