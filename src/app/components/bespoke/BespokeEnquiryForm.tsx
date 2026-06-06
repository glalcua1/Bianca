import { useRef, useState, type FormEvent } from "react";
import { Upload, X } from "lucide-react";
import EditorialReveal from "../editorial/EditorialReveal";
import {
  BESPOKE_BUDGET_RANGES,
  BESPOKE_CONSULTATION_METHODS,
  BESPOKE_DIAMOND_SHAPES,
  BESPOKE_JEWELLERY_TYPES,
  BESPOKE_OCCASIONS,
} from "../../data/bespokeJewellery";
import { buildBespokeEnquiryWhatsAppUrl } from "../../lib/bespokeEnquiry";

const fieldClass =
  "w-full border-0 border-b border-[#766d42]/50 bg-transparent px-0 py-3.5 font-body text-[15px] leading-normal text-[#1d3c34] placeholder:text-[#455650] outline-none transition-[border-color,box-shadow] duration-200 focus:border-[#1d3c34] focus:ring-0";

const selectClass = `${fieldClass} cursor-pointer appearance-none bg-[url('data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 width=%2712%27 height=%278%27 viewBox=%270 0 12 8%27%3E%3Cpath fill=%27%231d3c34%27 d=%27M1 1l5 5 5-5%27/%3E%3C/svg%3E%27)] bg-[length:10px] bg-[right_0_center] bg-no-repeat pr-6`;

const labelClass =
  "mb-1.5 block font-body text-[11px] font-medium uppercase tracking-[0.18em] text-[#1d3c34]";

type Props = {
  sourcePage?: string;
};

export default function BespokeEnquiryForm({
  sourcePage = "bespoke-jewellery",
}: Props) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [inspirationFiles, setInspirationFiles] = useState<File[]>([]);

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    consultationMethod: BESPOKE_CONSULTATION_METHODS[0],
    jewelleryType: BESPOKE_JEWELLERY_TYPES[0],
    occasion: BESPOKE_OCCASIONS[0],
    budgetRange: BESPOKE_BUDGET_RANGES[1],
    diamondShape: BESPOKE_DIAMOND_SHAPES[0],
    vision: "",
  });

  function handleFilesChange(files: FileList | null) {
    if (!files) return;
    setInspirationFiles((current) => {
      const merged = [...current, ...Array.from(files)];
      return merged.slice(0, 8);
    });
  }

  function removeFile(index: number) {
    setInspirationFiles((current) => current.filter((_, i) => i !== index));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setSubmitting(true);

    const fullName = form.fullName.trim();
    const email = form.email.trim();
    const phone = form.phone.trim();
    const vision = form.vision.trim();

    if (fullName.length < 2) {
      setError("Please enter your full name.");
      setSubmitting(false);
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address.");
      setSubmitting(false);
      return;
    }

    if (!/^[\d\s+\-().]{7,20}$/.test(phone)) {
      setError("Please enter a valid phone number.");
      setSubmitting(false);
      return;
    }

    if (vision.length < 10) {
      setError("Please share a few words about your vision.");
      setSubmitting(false);
      return;
    }

    const lead = {
      fullName,
      email,
      phone,
      consultationMethod: form.consultationMethod,
      jewelleryType: form.jewelleryType,
      occasion: form.occasion,
      budgetRange: form.budgetRange,
      diamondShape: form.diamondShape,
      vision,
      inspirationFileNames: inspirationFiles.map((f) => f.name),
      sourcePage,
    };

    const url = buildBespokeEnquiryWhatsAppUrl(lead);

    fetch("/api/consultation-leads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        clientName: fullName,
        phone,
        city: email,
        sourcePage: `bespoke:${sourcePage}`,
        bespokeEnquiry: lead,
      }),
    }).catch(() => {});

    const opened = window.open(url, "_blank", "noopener,noreferrer");
    if (!opened) {
      window.location.assign(url);
    }

    setSubmitted(true);
    setSubmitting(false);
  }

  if (submitted) {
    return (
      <EditorialReveal className="mx-auto max-w-xl text-center">
        <div className="border border-[#766d42]/20 bg-[#faf8f5] px-8 py-14 md:px-12 md:py-16">
          <div className="mx-auto mb-6 h-px w-12 bg-[#dccb7b]" aria-hidden />
          <p className="font-editorial text-[clamp(1.5rem,3vw,2rem)] tracking-[0.06em] text-[#1d3c34]">
            Thank you for sharing your vision.
          </p>
          <p className="mt-5 text-[15px] leading-relaxed text-[#1d3c34]/90">
            A Bianca Diamonds design specialist will contact you shortly to
            begin your bespoke journey. WhatsApp should have opened with your
            enquiry — tap{" "}
            <strong className="font-normal text-[#1d3c34]">Send</strong> to
            confirm, and share your inspiration images in the chat.
          </p>
        </div>
      </EditorialReveal>
    );
  }

  return (
    <EditorialReveal className="mx-auto max-w-2xl">
      <form
        className="space-y-8 border border-[#766d42]/20 bg-[#faf8f5] p-8 shadow-[0_20px_60px_rgba(29,60,52,0.06)] md:p-12"
        onSubmit={handleSubmit}
        noValidate
      >
        <div className="grid gap-8 md:grid-cols-2">
          <label className="block md:col-span-2">
            <span className={labelClass}>Full name</span>
            <input
              required
              type="text"
              name="fullName"
              autoComplete="name"
              value={form.fullName}
              onChange={(e) =>
                setForm((c) => ({ ...c, fullName: e.target.value }))
              }
              className={fieldClass}
              placeholder="Your name"
            />
          </label>

          <label className="block">
            <span className={labelClass}>Email</span>
            <input
              required
              type="email"
              name="email"
              autoComplete="email"
              value={form.email}
              onChange={(e) =>
                setForm((c) => ({ ...c, email: e.target.value }))
              }
              className={fieldClass}
              placeholder="you@example.com"
            />
          </label>

          <label className="block">
            <span className={labelClass}>Phone</span>
            <input
              required
              type="tel"
              name="phone"
              autoComplete="tel"
              value={form.phone}
              onChange={(e) =>
                setForm((c) => ({ ...c, phone: e.target.value }))
              }
              className={fieldClass}
              placeholder="+91 98765 43210"
            />
          </label>

          <label className="block">
            <span className={labelClass}>Preferred consultation method</span>
            <select
              name="consultationMethod"
              value={form.consultationMethod}
              onChange={(e) =>
                setForm((c) => ({
                  ...c,
                  consultationMethod: e.target.value,
                }))
              }
              className={selectClass}
            >
              {BESPOKE_CONSULTATION_METHODS.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </label>

          <label className="block">
            <span className={labelClass}>Jewellery type</span>
            <select
              name="jewelleryType"
              value={form.jewelleryType}
              onChange={(e) =>
                setForm((c) => ({ ...c, jewelleryType: e.target.value }))
              }
              className={selectClass}
            >
              {BESPOKE_JEWELLERY_TYPES.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </label>

          <label className="block">
            <span className={labelClass}>Occasion</span>
            <select
              name="occasion"
              value={form.occasion}
              onChange={(e) =>
                setForm((c) => ({ ...c, occasion: e.target.value }))
              }
              className={selectClass}
            >
              {BESPOKE_OCCASIONS.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </label>

          <label className="block">
            <span className={labelClass}>Budget range</span>
            <select
              name="budgetRange"
              value={form.budgetRange}
              onChange={(e) =>
                setForm((c) => ({ ...c, budgetRange: e.target.value }))
              }
              className={selectClass}
            >
              {BESPOKE_BUDGET_RANGES.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </label>

          <label className="block md:col-span-2">
            <span className={labelClass}>Preferred diamond shape</span>
            <select
              name="diamondShape"
              value={form.diamondShape}
              onChange={(e) =>
                setForm((c) => ({ ...c, diamondShape: e.target.value }))
              }
              className={selectClass}
            >
              {BESPOKE_DIAMOND_SHAPES.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div>
          <span className={labelClass}>Upload inspiration images</span>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            multiple
            className="sr-only"
            onChange={(e) => {
              handleFilesChange(e.target.files);
              e.target.value = "";
            }}
          />
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="flex w-full items-center justify-center gap-2 border border-dashed border-[#766d42]/55 bg-[#faf8f5] px-4 py-8 text-[15px] text-[#1d3c34]/85 transition hover:border-[#766d42] hover:text-[#1d3c34]"
          >
            <Upload className="size-4 text-[#766d42]" aria-hidden />
            Select images (up to 8)
          </button>
          {inspirationFiles.length > 0 ? (
            <ul className="mt-3 space-y-2">
              {inspirationFiles.map((file, index) => (
                <li
                  key={`${file.name}-${index}`}
                  className="flex items-center justify-between gap-3 border border-[#766d42]/35 bg-white px-3 py-2 font-body text-[13px] text-[#1d3c34]"
                >
                  <span className="truncate">{file.name}</span>
                  <button
                    type="button"
                    onClick={() => removeFile(index)}
                    className="shrink-0 rounded p-1 text-[#566b65] hover:text-[#1d3c34]"
                    aria-label={`Remove ${file.name}`}
                  >
                    <X className="size-3.5" />
                  </button>
                </li>
              ))}
            </ul>
          ) : null}
        </div>

        <label className="block">
          <span className={labelClass}>Tell us your vision</span>
          <textarea
            required
            name="vision"
            rows={5}
            value={form.vision}
            onChange={(e) =>
              setForm((c) => ({ ...c, vision: e.target.value }))
            }
            className={`${fieldClass} resize-y min-h-[140px]`}
            placeholder="Share your inspiration, occasion, and how you imagine wearing this piece…"
          />
        </label>

        {error ? (
          <p role="alert" className="font-body text-sm text-red-700">
            {error}
          </p>
        ) : null}

        <button
          type="submit"
          disabled={submitting}
          className="inline-flex w-full justify-center border border-[#1d3c34] bg-[#1d3c34] px-10 py-3.5 text-house-cta text-[#faf8f5] transition-colors duration-500 hover:bg-transparent hover:text-bianca-forest disabled:cursor-not-allowed disabled:opacity-60"
        >
          {submitting ? "Opening WhatsApp…" : "Request Private Consultation"}
        </button>
      </form>
    </EditorialReveal>
  );
}
