type Props = {
  children: React.ReactNode;
  tone?: "light" | "dark" | "gold";
  className?: string;
};

const toneClasses = {
  light: "text-[#f9f9f9]/70",
  dark: "text-[#766d42]",
  gold: "text-[#dccb7b]/90",
};

export default function EditorialEyebrow({
  children,
  tone = "dark",
  className = "",
}: Props) {
  return (
    <p
      className={`font-['Arial',sans-serif] text-[10px] uppercase tracking-[0.5em] md:text-[11px] ${toneClasses[tone]} ${className}`}
    >
      {children}
    </p>
  );
}
