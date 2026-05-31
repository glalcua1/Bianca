type Props = {
  className?: string;
};

export default function SiteCopyright({ className = "text-on-cream-muted" }: Props) {
  return (
    <p className={`font-body text-xs tracking-wide ${className}`}>
      Copyright Bianca Diamonds 2026
    </p>
  );
}
