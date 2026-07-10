import MobileSiteNav from "../components/MobileSiteNav";
import ProtectedImage from "../components/protection/ProtectedImage";
import { BiancaHouseLogo } from "../components/BiancaLogo";
import HomeSectionCards from "../components/HomeSectionCards";
import HomeBiancaStoryMobile from "../components/HomeBiancaStoryMobile";

export default function HomePageMobile() {
  return (
    <div className="min-h-screen bg-[#faf8f5]" data-protected-page>
      <MobileSiteNav activeItem="the-house" />

      <section className="bg-[#1d3c34] px-4 pb-10 pt-2">
        <div className="mx-auto max-w-lg rounded-[16px] border border-[#1d3c34]/40 bg-white p-5 shadow-[0_12px_40px_rgba(0,0,0,0.12)]">
          <BiancaHouseLogo maxWidth={200} className="mx-auto" />

          <div className="relative mt-6 w-full overflow-hidden rounded-[12px] bg-white">
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

      {/* Full-width horizontal section cards — Fine Jewellery → Bespoke → Butterfly → Cannes */}
      <HomeSectionCards />

      <HomeBiancaStoryMobile />
    </div>
  );
}
