import MobileSiteNav from "../components/MobileSiteNav";
import HomeHeroCard from "../components/HomeHeroCard";
import HomeSectionCards from "../components/HomeSectionCards";
import HomeBiancaStoryMobile from "../components/HomeBiancaStoryMobile";

export default function HomePageMobile() {
  return (
    <div className="min-h-screen bg-[#faf8f5]" data-protected-page>
      <MobileSiteNav activeItem="the-house" />

      <section className="bg-[#1d3c34] px-4 pb-10 pt-2">
        <HomeHeroCard layout="mobile" />
      </section>

      {/* Full-width horizontal section cards — Fine Jewellery → Bespoke → Butterfly → Cannes */}
      <HomeSectionCards />

      <HomeBiancaStoryMobile />
    </div>
  );
}
