import EditorialReveal from "../editorial/EditorialReveal";

export default function CannesQuoteBlock() {
  return (
    <section
      aria-label="Editorial quote"
      className="border-y border-[#1d3c34]/8 bg-[#f4f0e6] px-6 py-20 md:px-10 md:py-28 lg:px-16 lg:py-32"
    >
      <EditorialReveal>
        <blockquote className="mx-auto max-w-4xl text-center">
          <p className="font-['Times_New_Roman',serif] text-[clamp(1.5rem,3.5vw,2.35rem)] italic leading-[1.45] tracking-[0.04em] text-[#1d3c34]">
            &ldquo;In just months, Bianca Diamonds stepped onto one of the
            world&apos;s most iconic stages.&rdquo;
          </p>
          <footer className="mt-10">
            <cite className="not-italic">
              <span className="font-['Arial',sans-serif] text-[10px] uppercase tracking-[0.45em] text-[#766d42]">
                Bianca Diamonds — Cannes Film Festival 2026
              </span>
            </cite>
          </footer>
        </blockquote>
      </EditorialReveal>
    </section>
  );
}
