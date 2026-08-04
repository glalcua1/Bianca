import { useEffect, useState } from "react";
import { Phone } from "lucide-react";
import EditorialEyebrow from "../editorial/EditorialEyebrow";
import { getJppPublicConfig } from "../../data/jppConfig";
import { trackJppEvent } from "../../lib/jppAnalytics";
import { buildWhatsAppChatUrl } from "../../lib/whatsappContact";

function WhatsAppGlyph({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

export default function JppFinalCta() {
  const config = getJppPublicConfig();
  const [whatsappHref, setWhatsappHref] = useState("#");

  useEffect(() => {
    const text = [
      "Hello Bianca Diamonds,",
      "",
      "I would like to enrol in the Bianca Jewellery Purchase Plan.",
      "Please guide me on the next steps.",
    ].join("\n");
    setWhatsappHref(
      buildWhatsAppChatUrl(config.whatsappDigits, { text }),
    );
  }, [config.whatsappDigits]);

  return (
    <section className="bg-[#1d3c34] px-6 py-20 md:px-10 md:py-24">
      <div className="mx-auto max-w-3xl text-center">
        <EditorialEyebrow tone="gold">Begin with a conversation</EditorialEyebrow>
        <h2 className="mt-4 font-editorial text-[clamp(1.85rem,4vw,2.75rem)] tracking-[0.05em] text-[#f9f9f9]">
          Call Bianca to enrol in your Jewellery Purchase Plan.
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-house-body leading-relaxed text-on-forest-body">
          We will create your personal plan ID, explain installment guidance,
          and help you take the first step towards jewellery that feels like
          yours.
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a
            href={config.phoneTel}
            onClick={() => trackJppEvent("jpp_call_bianca_clicked")}
            className="inline-flex min-w-[220px] items-center justify-center gap-2.5 border border-[#f9f9f9] bg-[#f9f9f9] px-8 py-3.5 text-house-cta text-[#1d3c34] transition-colors duration-500 hover:bg-transparent hover:text-[#f9f9f9]"
          >
            <Phone className="size-4" strokeWidth={1.25} aria-hidden />
            Call Now
          </a>
          {config.whatsappDigits ? (
            <a
              href={whatsappHref}
              target="_blank"
              rel="noreferrer"
              onClick={() => trackJppEvent("jpp_whatsapp_clicked")}
              className="inline-flex min-w-[220px] items-center justify-center gap-2.5 border border-[#f9f9f9]/35 px-8 py-3.5 text-house-cta text-[#f9f9f9] transition-colors duration-500 hover:border-[#f9f9f9] hover:bg-[#f9f9f9]/10"
            >
              <WhatsAppGlyph className="size-4" />
              WhatsApp Bianca
            </a>
          ) : null}
        </div>

        <p className="mt-8 font-editorial text-[14px] tracking-[0.06em] text-gold-on-forest">
          {config.phoneDisplay}
        </p>
      </div>
    </section>
  );
}
