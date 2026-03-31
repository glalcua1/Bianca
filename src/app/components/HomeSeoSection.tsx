/**
 * Visible editorial SEO copy for the homepage (search + readers who scroll).
 */
export default function HomeSeoSection() {
  return (
    <section
      aria-labelledby="seo-editorial-heading"
      className="border-t border-[#1d3c34]/10 bg-[#faf8f5]"
    >
      <div className="mx-auto max-w-3xl px-6 py-14 md:py-20">
        <h2
          id="seo-editorial-heading"
          className="sr-only"
        >
          About Bianca Diamonds — lab-grown diamond jewellery
        </h2>
        <div className="space-y-5 font-['Arial',sans-serif] text-sm leading-[1.75] text-[#5a6b66] md:text-[15px]">
          <p>
            Discover a new era of fine jewellery with ethically crafted,
            lab-grown diamonds. At Bianca Diamonds, we create elegant, timeless
            pieces designed for modern women who value luxury, sustainability,
            and everyday wearability. Our collections feature certified lab-grown
            diamonds with exceptional brilliance, offering the same sparkle,
            purity, and durability as mined diamonds—without the environmental
            impact or inflated pricing.
          </p>
          <p>
            Whether you&apos;re looking for engagement rings, wedding bands,
            solitaire pendants, tennis bracelets, or daily-wear diamond
            jewellery, our handcrafted designs are made to suit every moment.
            Each piece is IGI-certified, responsibly sourced, and crafted with
            precision to ensure maximum shine and long-lasting quality.
          </p>
          <p>
            We offer custom jewellery design, personalised fittings, and styling
            support to help you find the perfect piece. With transparent
            pricing, premium workmanship, and nationwide delivery across India,
            Bianca Diamonds makes luxury diamonds truly accessible. Explore our
            latest lab-grown diamond rings, earrings, necklaces, and
            bracelets—designed to make every day a little more beautiful.
          </p>
        </div>
      </div>
    </section>
  );
}
