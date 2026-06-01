import { useState, type FormEvent } from "react";
import { Drawer } from "vaul";
import { X } from "lucide-react";
import {
  buildConsultationWhatsAppUrl,
  BIANCA_WHATSAPP_NUMBER,
} from "../../data/siteContact";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  sourcePage?: string;
};

type FormState = {
  clientName: string;
  phone: string;
  city: string;
};

const initialForm: FormState = {
  clientName: "",
  phone: "",
  city: "",
};

export default function ConsultationDrawer({
  open,
  onOpenChange,
  sourcePage = "cannes-2026",
}: Props) {
  const [form, setForm] = useState<FormState>(initialForm);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [whatsappUrl, setWhatsappUrl] = useState<string | null>(null);

  function resetDrawer() {
    setForm(initialForm);
    setError(null);
    setSubmitted(false);
    setSubmitting(false);
    setWhatsappUrl(null);
  }

  function handleOpenChange(nextOpen: boolean) {
    if (!nextOpen) {
      resetDrawer();
    }
    onOpenChange(nextOpen);
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setSubmitting(true);

    const name = form.clientName.trim();
    const phone = form.phone.trim();
    const city = form.city.trim();

    if (name.length < 2) {
      setError("Please enter your full name.");
      setSubmitting(false);
      return;
    }

    if (!/^[\d\s+\-().]{7,20}$/.test(phone)) {
      setError("Please enter a valid phone number.");
      setSubmitting(false);
      return;
    }

    if (city.length < 2) {
      setError("Please enter your city.");
      setSubmitting(false);
      return;
    }

    const url = buildConsultationWhatsAppUrl({
      clientName: name,
      phone,
      city,
      sourcePage,
    });

    setWhatsappUrl(url);

    // Log locally in dev when the API is available — production uses WhatsApp.
    fetch("/api/consultation-leads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ clientName: name, phone, city, sourcePage }),
    }).catch(() => {});

    const opened = window.open(url, "_blank", "noopener,noreferrer");
    if (!opened) {
      window.location.assign(url);
    }

    setSubmitted(true);
    setSubmitting(false);
  }

  return (
    <Drawer.Root
      open={open}
      onOpenChange={handleOpenChange}
      direction="right"
      shouldScaleBackground={false}
    >
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 z-50 bg-[#1d3c34]/60 backdrop-blur-[2px]" />
        <Drawer.Content
          aria-describedby={undefined}
          className="fixed inset-y-0 right-0 z-50 flex w-full max-w-md flex-col bg-[#faf8f5] shadow-2xl outline-none"
        >
          <div className="flex items-center justify-between border-b border-[#1d3c34]/10 px-6 py-5">
            <Drawer.Title className="font-editorial text-lg tracking-[0.12em] uppercase text-[#1d3c34]">
              Private Consultation
            </Drawer.Title>
            <Drawer.Close asChild>
              <button
                type="button"
                aria-label="Close consultation form"
                className="rounded-full p-2 text-on-cream-muted transition-colors hover:bg-[#1d3c34]/5 hover:text-bianca-forest"
              >
                <X className="size-5" />
              </button>
            </Drawer.Close>
          </div>

          <div className="flex-1 overflow-y-auto px-6 py-8">
            {submitted ? (
              <div className="flex h-full flex-col justify-center text-center">
                <p className="font-editorial text-2xl tracking-[0.06em] text-[#1d3c34]">
                  Almost done
                </p>
                <p className="mt-5 text-house-body text-on-cream-body">
                  WhatsApp should have opened with your details. Tap{" "}
                  <strong className="font-normal text-[#1d3c34]">Send</strong>{" "}
                  in the chat to confirm your private consultation — our
                  atelier team will reply on WhatsApp shortly.
                </p>
                {whatsappUrl ? (
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-8 inline-flex justify-center border border-[#1d3c34]/35 px-10 py-3 text-house-cta text-[#1d3c34] transition-colors duration-500 hover:border-[#1d3c34] hover:bg-[#1d3c34] hover:text-[#faf8f5]"
                  >
                    Open WhatsApp again
                  </a>
                ) : null}
                <Drawer.Close asChild>
                  <button
                    type="button"
                    className="mt-4 inline-flex justify-center px-10 py-3 text-house-body text-on-cream-muted transition hover:text-[#1d3c34]"
                  >
                    Close
                  </button>
                </Drawer.Close>
              </div>
            ) : (
              <>
                <p className="text-house-body text-on-cream-body">
                  Share your details and we&apos;ll open WhatsApp so you can
                  send your consultation request directly to our atelier team.
                </p>

                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                  <label className="block">
                    <span className="mb-2 block font-body text-[11px] uppercase tracking-[0.2em] text-on-cream-muted">
                      Full name
                    </span>
                    <input
                      required
                      type="text"
                      name="clientName"
                      autoComplete="name"
                      value={form.clientName}
                      onChange={(event) =>
                        setForm((current) => ({
                          ...current,
                          clientName: event.target.value,
                        }))
                      }
                      className="w-full border border-[#1d3c34]/15 bg-white px-4 py-3 font-body text-sm text-[#1d3c34] outline-none transition focus:border-[#1d3c34]/40 focus:ring-2 focus:ring-[#1d3c34]/10"
                      placeholder="Your name"
                    />
                  </label>

                  <label className="block">
                    <span className="mb-2 block font-body text-[11px] uppercase tracking-[0.2em] text-on-cream-muted">
                      Phone number
                    </span>
                    <input
                      required
                      type="tel"
                      name="phone"
                      autoComplete="tel"
                      value={form.phone}
                      onChange={(event) =>
                        setForm((current) => ({
                          ...current,
                          phone: event.target.value,
                        }))
                      }
                      className="w-full border border-[#1d3c34]/15 bg-white px-4 py-3 font-body text-sm text-[#1d3c34] outline-none transition focus:border-[#1d3c34]/40 focus:ring-2 focus:ring-[#1d3c34]/10"
                      placeholder="+91 98765 43210"
                    />
                  </label>

                  <label className="block">
                    <span className="mb-2 block font-body text-[11px] uppercase tracking-[0.2em] text-on-cream-muted">
                      City
                    </span>
                    <input
                      required
                      type="text"
                      name="city"
                      autoComplete="address-level2"
                      value={form.city}
                      onChange={(event) =>
                        setForm((current) => ({
                          ...current,
                          city: event.target.value,
                        }))
                      }
                      className="w-full border border-[#1d3c34]/15 bg-white px-4 py-3 font-body text-sm text-[#1d3c34] outline-none transition focus:border-[#1d3c34]/40 focus:ring-2 focus:ring-[#1d3c34]/10"
                      placeholder="Mumbai"
                    />
                  </label>

                  {error ? (
                    <p
                      role="alert"
                      className="font-body text-sm text-red-700"
                    >
                      {error}
                    </p>
                  ) : null}

                  <button
                    type="submit"
                    disabled={submitting}
                    className="inline-flex w-full justify-center border border-[#1d3c34] bg-[#1d3c34] px-10 py-3 text-house-cta text-[#faf8f5] transition-colors duration-500 hover:bg-transparent hover:text-bianca-forest disabled:cursor-not-allowed disabled:text-on-cream-muted"
                  >
                    {submitting ? "Opening WhatsApp…" : "Continue on WhatsApp"}
                  </button>

                  <p className="text-center font-body text-[11px] leading-relaxed text-on-cream-muted">
                    Requests go to WhatsApp +91 {BIANCA_WHATSAPP_NUMBER.slice(2)}
                  </p>
                </form>
              </>
            )}
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}
