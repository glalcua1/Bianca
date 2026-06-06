import EditorialEyebrow from "../editorial/EditorialEyebrow";
import EditorialReveal from "../editorial/EditorialReveal";

type Props = {
  id?: string;
  eyebrow: string;
  title: string;
  subtitle?: string;
  tone?: "light" | "dark";
  align?: "center" | "left";
  className?: string;
};

export default function BespokeSectionHeader({
  id,
  eyebrow,
  title,
  subtitle,
  tone = "light",
  align = "center",
  className = "",
}: Props) {
  const isDark = tone === "dark";
  const alignClass = align === "center" ? "text-center mx-auto" : "text-left";

  return (
    <EditorialReveal className={`mb-14 max-w-3xl md:mb-20 ${alignClass} ${className}`}>
      <div
        className={`mb-6 h-px w-16 bg-gradient-to-r from-transparent via-[#dccb7b] to-transparent ${
          align === "center" ? "mx-auto" : ""
        }`}
        aria-hidden
      />
      <EditorialEyebrow tone={isDark ? "gold" : "dark"} className="mb-4">
        {eyebrow}
      </EditorialEyebrow>
      <h2
        id={id}
        className={`font-editorial text-[clamp(1.85rem,4.2vw,2.75rem)] font-normal leading-[1.15] tracking-[0.06em] ${
          isDark ? "text-[#f9f9f9]" : "text-[#1d3c34]"
        }`}
      >
        {title}
      </h2>
      {subtitle ? (
        <p
          className={`mt-5 text-house-body leading-relaxed ${
            isDark ? "text-on-forest-body" : "text-on-cream-body"
          } ${align === "center" ? "mx-auto max-w-2xl" : "max-w-xl"}`}
        >
          {subtitle}
        </p>
      ) : null}
    </EditorialReveal>
  );
}
