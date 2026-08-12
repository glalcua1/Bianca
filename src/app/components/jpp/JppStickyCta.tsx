type Props = {
  visible: boolean;
  onRegister: () => void;
};

export default function JppStickyCta({ visible, onRegister }: Props) {
  if (!visible) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-[#1d3c34]/10 bg-[#faf8f5]/95 px-4 py-3 backdrop-blur-md md:hidden">
      <button
        type="button"
        onClick={onRegister}
        className="inline-flex w-full items-center justify-center bg-[#1d3c34] px-6 py-3.5 text-house-cta text-[#faf8f5] transition-opacity hover:opacity-90"
      >
        Register for Bianca JPP
      </button>
    </div>
  );
}
