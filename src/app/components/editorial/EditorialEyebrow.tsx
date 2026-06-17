type Props = {
  children: React.ReactNode;
  tone?: "light" | "dark" | "gold";
  className?: string;
};

const toneClasses = {
  light: "text-on-forest-muted",
  dark: "text-gold-on-cream",
  gold: "text-gold-on-forest",
};

export default function EditorialEyebrow({
  children,
  tone = "dark",
  className = "",
}: Props) {
  return (
    <p
      className={`text-house-eyebrow ${toneClasses[tone]} ${className}`}
    >
      {children}
    </p>
  );
}
