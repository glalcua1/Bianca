import { Link } from "react-router";

// Use existing project images for product photos
import img1 from "figma:asset/db8ce4b6ba67f77b645c64a3e2fd3fcd1b7f2395.png";
import img2 from "figma:asset/6b26ef4fc22c5dab0298c677db3a48579b696098.png";
import img3 from "figma:asset/afa9671f19943983683b5212bd4e0ff5a61cc775.png";
import img4 from "figma:asset/581d41c78850052909c92d619a846a456fb23495.png";
import img5 from "figma:asset/200f28676d6a2eae898fcdcd9f13ebcd75250299.png";
import img6 from "figma:asset/75d88e2bc003dea111ea5784491167b05e57ecdf.png";
import img7 from "figma:asset/bcbf2ab8604eb3c4c44851f9e32172fab91932f2.png";
import img8 from "figma:asset/5ba4358549f78481bb5595ef12a37c5f59d7d33d.png";
import img9 from "figma:asset/791d0a8cf2d96d0d481c05ccdd58d68bc023a7a9.png";

const categories = [
  {
    title: "Diamond Earrings",
    description: "Timeless studs and drops for everyday elegance",
    items: [
      { name: "Classic Diamond Studs", price: 89500, image: img1 },
      { name: "Halo Drop Earrings", price: 145000, image: img2 },
      { name: "Emerald-Cut Studs", price: 178000, image: img3 },
    ],
  },
  {
    title: "Pendant Necklaces",
    description: "Delicate chains with meaningful centrepieces",
    items: [
      { name: "Solitaire Pendant", price: 72000, image: img4 },
      { name: "Tennis Pendant", price: 195000, image: img5 },
      { name: "Vintage Locket", price: 126000, image: img6 },
    ],
  },
  {
    title: "Tennis Bracelets",
    description: "Continuous brilliance for the wrist",
    items: [
      { name: "Classic Tennis", price: 245000, image: img7 },
      { name: "Eternity Half-Bracelet", price: 168000, image: img8 },
      { name: "Delicate Line Bracelet", price: 89000, image: img9 },
    ],
  },
];

function formatPrice(price: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(price);
}

export default function FineJewelleryPage() {
  return (
    <div className="min-h-screen bg-[#fffbeb]">
      {/* Hero */}
      <section
        className="relative flex flex-col items-center justify-center px-8 py-24 text-center"
        style={{ backgroundColor: "#1d3c34" }}
      >
        <Link
          to="/"
          className="absolute left-8 top-8 font-['Times_New_Roman',serif] text-sm tracking-[1.5px] uppercase transition-opacity hover:opacity-80"
          style={{ color: "#f9f9f9" }}
        >
          ← The House
        </Link>
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `radial-gradient(circle at 30% 50%, #dccb7b 0%, transparent 50%)`,
          }}
        />
        <h1
          className="relative z-10 mb-4 font-['Times_New_Roman',serif] text-4xl tracking-[2px] md:text-5xl"
          style={{ color: "#dccb7b" }}
        >
          Fine Jewellery
        </h1>
        <p
          className="relative z-10 max-w-xl font-['Arial',sans-serif] text-lg leading-relaxed"
          style={{ color: "#f9f9f9" }}
        >
          100% Certified Lab Grown Diamonds · BIS Hallmarked Gold
        </p>
      </section>

      {/* Categories */}
      <main className="mx-auto max-w-7xl px-6 py-16">
        {categories.map((category, idx) => (
          <section key={category.title} className="mb-24">
            <div className="mb-12 border-b border-[#1d3c34]/20 pb-6">
              <h2
                className="font-['Times_New_Roman',serif] text-3xl tracking-[1.5px]"
                style={{ color: "#1d3c34" }}
              >
                {category.title}
              </h2>
              <p
                className="mt-2 font-['Arial',sans-serif] text-base"
                style={{ color: "#5a6b66" }}
              >
                {category.description}
              </p>
            </div>

            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {category.items.map((item) => (
                <article
                  key={item.name}
                  className="group overflow-hidden rounded-lg bg-white shadow-[0_4px_24px_rgba(29,60,52,0.08)] transition-all duration-300 hover:shadow-[0_12px_40px_rgba(29,60,52,0.12)]"
                >
                  <div className="aspect-square overflow-hidden bg-[#f8f7f4]">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="border-t border-[#1d3c34]/10 px-6 py-5">
                    <h3
                      className="font-['Times_New_Roman',serif] text-lg tracking-[1px]"
                      style={{ color: "#1d3c34" }}
                    >
                      {item.name}
                    </h3>
                    <p
                      className="mt-2 font-['Arial',sans-serif] text-xl font-medium"
                      style={{ color: "#dccb7b" }}
                    >
                      {formatPrice(item.price)}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </section>
        ))}
      </main>

      {/* Footer CTA */}
      <section
        className="px-8 py-16 text-center"
        style={{ backgroundColor: "#1d3c34" }}
      >
        <p
          className="mb-6 font-['Arial',sans-serif] text-base"
          style={{ color: "#f9f9f9" }}
        >
          Explore our full collection or book a consultation.
        </p>
        <Link
          to="/"
          className="inline-block border border-[#dccb7b] px-8 py-3 font-['Times_New_Roman',serif] text-sm tracking-[2px] uppercase transition-colors hover:bg-[#dccb7b] hover:text-[#1d3c34]"
          style={{ color: "#dccb7b" }}
        >
          Return Home
        </Link>
      </section>
    </div>
  );
}
