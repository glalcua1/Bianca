import { Phone } from "lucide-react";
import { getJppPublicConfig } from "../../data/jppConfig";
import { trackJppEvent } from "../../lib/jppAnalytics";

type Props = {
  visible: boolean;
};

export default function JppStickyCta({ visible }: Props) {
  const config = getJppPublicConfig();
  if (!visible) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-[#1d3c34]/10 bg-[#faf8f5]/95 px-4 py-3 backdrop-blur-md md:hidden">
      <a
        href={config.phoneTel}
        onClick={() => trackJppEvent("jpp_call_bianca_clicked")}
        className="inline-flex w-full items-center justify-center gap-2.5 bg-[#1d3c34] px-6 py-3.5 text-house-cta text-[#faf8f5] transition-opacity hover:opacity-90"
      >
        <Phone className="size-4" strokeWidth={1.25} aria-hidden />
        Call Now to Enrol
      </a>
    </div>
  );
}
