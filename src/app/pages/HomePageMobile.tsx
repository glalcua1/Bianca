import { Link } from "react-router";
import CollectionPhotoFrame from "../components/CollectionPhotoFrame";
import MobileSiteNav from "../components/MobileSiteNav";
import ProtectedImage from "../components/protection/ProtectedImage";
import { BiancaHouseLogo } from "../components/BiancaLogo";
import HomeBiancaStoryMobile from "../components/HomeBiancaStoryMobile";

const COLLECTIONS = [
  {
    title: "Modern Essentials",
    description:
      "Discover diamonds designed for modern living — effortless pieces that bring refined sparkle to every moment of your day.",
    image: "/Rings/IMG_5302.jpg",
    alt: "Modern Essentials – diamond ring",
  },
  {
    title: "Occasion Elegance",
    description:
      "Explore statement diamonds crafted to elevate life's most memorable celebrations with brilliance, beauty, and presence.",
    image: "/Earrings_2.png",
    alt: "Occasion Elegance – diamond earrings",
  },
  {
    title: "The Bridal Edit",
    description:
      "Explore timeless diamonds created to honor the beauty, promise, and joy of your wedding journey.",
    image: "/Necklace.png",
    alt: "The Bridal Edit – diamond necklace",
  },
] as const;

export default function HomePageMobile() {
  return (
    <div className="min-h-screen bg-[#faf8f5]" data-protected-page>
      <MobileSiteNav activeItem="the-house" />

      <section className="bg-[#1d3c34] px-4 pb-10 pt-2">
        <div className="mx-auto max-w-lg rounded-[16px] border border-[#1d3c34]/40 bg-white p-5 shadow-[0_12px_40px_rgba(0,0,0,0.12)]">
          <BiancaHouseLogo maxWidth={200} className="mx-auto" />

          <div className="relative mt-6 w-full overflow-hidden rounded-[12px] bg-[#faf8f5]">
            <ProtectedImage
              priority
              wrapperClassName="relative block w-full overflow-hidden"
              src="/Bianca_girl2.jpg"
              alt="Bianca Diamonds — lab-grown diamond fine jewellery"
              className="mx-auto block h-auto w-full max-h-[min(72vh,500px)] object-contain object-top"
            />
          </div>

          <h1 className="mt-6 text-center text-house-display text-[clamp(1.35rem,5.5vw,1.75rem)] uppercase leading-snug tracking-[0.08em] text-[#1d3c34]">
            Modern Sparkle. Timeless Impact.
          </h1>
          <p className="mt-3 text-center text-house-tagline text-[clamp(1rem,4vw,1.125rem)] capitalize tracking-[0.06em] text-on-cream-body">
            100% Certified Lab Grown Diamonds
          </p>
        </div>
      </section>

      <section
        aria-labelledby="mobile-collections-heading"
        className="px-4 py-12"
      >
        <div className="mx-auto max-w-lg text-center">
          <p className="text-house-eyebrow text-gold-on-cream">Collections</p>
          <h2
            id="mobile-collections-heading"
            className="mt-3 font-editorial text-[clamp(1.5rem,5vw,2rem)] tracking-[0.06em] text-[#1d3c34]"
          >
            Curated for Every Chapter
          </h2>
        </div>

        <ul className="mx-auto mt-10 flex max-w-lg flex-col gap-14">
          {COLLECTIONS.map((collection) => (
            <li key={collection.title}>
              <Link
                to="/fine-jewellery#collections"
                className="flex flex-col items-center"
              >
                <div className="w-full max-w-[443px]">
                  <CollectionPhotoFrame
                    fluid
                    src={collection.image}
                    alt={collection.alt}
                    data-name={collection.title}
                  />
                </div>
                <h3 className="mt-6 font-editorial text-xl tracking-[0.04em] text-[#1d3c34]">
                  {collection.title}
                </h3>
                <p className="mt-3 max-w-sm text-center text-house-body leading-relaxed text-on-cream-body">
                  {collection.description}
                </p>
                <span className="mt-4 text-[13px] uppercase tracking-[0.14em] text-gold-on-cream">
                  Explore collection →
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="border-y border-[#1d3c34]/10 bg-[#f4f0e6] px-4 py-12">
        <div className="mx-auto max-w-lg text-center">
          <p className="text-house-eyebrow text-gold-on-cream">
            Cannes Film Festival · 2026
          </p>
          <h2 className="mt-4 font-editorial text-[clamp(1.35rem,5vw,1.75rem)] tracking-[0.06em] text-[#1d3c34]">
            Exclusive Jewellery Showcase
          </h2>
          <p className="mt-4 text-house-body text-on-cream-body">
            A cinematic editorial on Bianca Diamonds&apos; debut at Cannes — on
            the world&apos;s most celebrated red carpet.
          </p>
          <Link
            to="/fine-jewellery/cannes-2026"
            className="mt-6 inline-block font-editorial text-[15px] uppercase tracking-[0.08em] text-gold-on-cream"
          >
            Discover the Collection →
          </Link>
        </div>
      </section>

      <HomeBiancaStoryMobile />
    </div>
  );
}
