import { useState, type FormEvent } from "react";
import { Drawer } from "vaul";
import { X } from "lucide-react";

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

  function resetDrawer() {
    setForm(initialForm);
    setError(null);
    setSubmitted(false);
    setSubmitting(false);
  }

  function handleOpenChange(nextOpen: boolean) {
    if (!nextOpen) {
      resetDrawer();
    }
    onOpenChange(nextOpen);
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setSubmitting(true);

    try {
      const response = await fetch("/api/consultation-leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, sourcePage }),
      });

      const data = (await response.json()) as { ok?: boolean; error?: string };

      if (!response.ok || !data.ok) {
        setError(data.error ?? "Something went wrong. Please try again.");
        return;
      }

      setSubmitted(true);
    } catch {
      setError("Unable to reach the server. Please try again.");
    } finally {
      setSubmitting(false);
    }
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
                  Thank you
                </p>
                <p className="mt-5 text-house-body text-on-cream-body">
                  Someone from Bianca Diamonds will call you shortly to confirm
                  your private consultation slot.
                </p>
                <Drawer.Close asChild>
                  <button
                    type="button"
                    className="mt-10 inline-flex justify-center border border-[#1d3c34]/35 px-10 py-3 text-house-cta text-[#1d3c34] transition-colors duration-500 hover:border-[#1d3c34] hover:bg-[#1d3c34] hover:text-[#faf8f5]"
                  >
                    Close
                  </button>
                </Drawer.Close>
              </div>
            ) : (
              <>
                <p className="text-house-body text-on-cream-body">
                  Share your details and our atelier team will reach out to
                  arrange a private consultation at your convenience.
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
                    {submitting ? "Submitting…" : "Request consultation"}
                  </button>
                </form>
              </>
            )}
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}
