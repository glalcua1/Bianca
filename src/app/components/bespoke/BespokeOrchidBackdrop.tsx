type Props = {
  /** Full-bleed section wash vs corner accent */
  variant?: "wash" | "corner";
  className?: string;
};

const ORCHID_PATTERN =
  "/elegant-pattern-white-orchids-intricate-silver-designs-soft-pastel-backdrop.jpg";

export default function BespokeOrchidBackdrop({
  variant = "wash",
  className = "",
}: Props) {
  if (variant === "corner") {
    return (
      <div
        className={`pointer-events-none absolute overflow-hidden ${className}`}
        aria-hidden
      >
        <div
          className="size-full opacity-[0.22] mix-blend-multiply"
          style={{
            backgroundImage: `url('${ORCHID_PATTERN}')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
      </div>
    );
  }

  return (
    <div
      className={`pointer-events-none absolute inset-0 ${className}`}
      aria-hidden
    >
      <div
        className="absolute inset-0 opacity-[0.07] mix-blend-multiply"
        style={{
          backgroundImage: `url('${ORCHID_PATTERN}')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#faf8f5]/40 via-transparent to-[#faf8f5]/80" />
    </div>
  );
}
