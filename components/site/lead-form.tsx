"use client";

import { useMemo, useState } from "react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { db } from "@/lib/firebase";
import type { ServiceOption } from "@/types";

type FormState = "idle" | "loading" | "success" | "error";

const fieldClass =
  "h-12 w-full border border-brand-navy/12 bg-white px-3.5 font-normal text-brand-ink outline-none transition placeholder:text-slate-400 focus:border-brand-gold focus:ring-1 focus:ring-brand-gold/20";

export function LeadForm({
  services,
  defaultService = "",
}: {
  services: ServiceOption[];
  defaultService?: string;
}) {
  const [name, setName] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [email, setEmail] = useState("");
  const [serviceSlug, setServiceSlug] = useState(defaultService);
  const [message, setMessage] = useState("");
  const [website, setWebsite] = useState("");
  const [state, setState] = useState<FormState>("idle");

  const selectedService = useMemo(
    () => services.find((service) => service.slug === serviceSlug),
    [serviceSlug, services],
  );

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState("loading");

    if (website) {
      setState("success");
      return;
    }

    if (!db) {
      setState("error");
      return;
    }

    try {
      await addDoc(collection(db, "leads"), {
        name: name.trim(),
        whatsapp: whatsapp.trim(),
        email: email.trim(),
        serviceSlug,
        message: message.trim(),
        source: "website-form",
        status: "baru",
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });

      setState("success");
      setName("");
      setWhatsapp("");
      setEmail("");
      setMessage("");
      setServiceSlug(defaultService);
    } catch (error) {
      console.error(error);
      setState("error");
    }
  }

  if (state === "success") {
    return (
      <div className="border-l-[3px] border-brand-gold bg-brand-paper p-7 sm:p-8">
        <CheckCircle2 className="h-9 w-9 text-brand-navy" strokeWidth={1.7} />
        <h3 className="mt-5 text-2xl font-semibold tracking-[-0.04em] text-brand-ink">
          Konsultasi sudah terkirim.
        </h3>
        <p className="mt-3 max-w-xl text-sm leading-7 text-slate-600">
          Tim Yuk Jadi Legal akan meninjau kebutuhan yang Anda kirim dan menghubungi melalui kontak yang tersedia.
        </p>
        <button
          type="button"
          onClick={() => setState("idle")}
          className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-brand-navy"
        >
          Kirim konsultasi lain <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="relative bg-white p-6 sm:p-8">
      <div className="pointer-events-none absolute -left-[9999px] h-px w-px overflow-hidden" aria-hidden="true">
        <label>
          Website
          <input
            tabIndex={-1}
            autoComplete="off"
            value={website}
            onChange={(event) => setWebsite(event.target.value)}
          />
        </label>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <FieldLabel label="Nama lengkap">
          <input
            value={name}
            onChange={(event) => setName(event.target.value)}
            required
            minLength={2}
            maxLength={120}
            autoComplete="name"
            className={fieldClass}
            placeholder="Nama Anda"
          />
        </FieldLabel>

        <FieldLabel label="WhatsApp">
          <input
            value={whatsapp}
            onChange={(event) => setWhatsapp(event.target.value.replace(/\D/g, ""))}
            required
            minLength={8}
            maxLength={30}
            inputMode="tel"
            autoComplete="tel"
            className={fieldClass}
            placeholder="08xxxxxxxxxx"
          />
        </FieldLabel>

        <FieldLabel label="Email" optional>
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            maxLength={160}
            autoComplete="email"
            className={fieldClass}
            placeholder="nama@email.com"
          />
        </FieldLabel>

        <FieldLabel label="Layanan">
          <select
            value={serviceSlug}
            onChange={(event) => setServiceSlug(event.target.value)}
            className={fieldClass}
          >
            <option value="">Belum yakin / konsultasi umum</option>
            {services.map((service) => (
              <option key={service.id} value={service.slug}>
                {service.title}
              </option>
            ))}
          </select>
        </FieldLabel>
      </div>

      <label className="mt-5 grid gap-2 text-xs font-semibold uppercase tracking-[0.08em] text-brand-ink">
        Ceritakan kebutuhan Anda
        <textarea
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          required
          minLength={3}
          maxLength={3000}
          rows={5}
          className="w-full border border-brand-navy/12 bg-white px-3.5 py-3 font-normal normal-case leading-6 tracking-normal text-brand-ink outline-none transition placeholder:text-slate-400 focus:border-brand-gold focus:ring-1 focus:ring-brand-gold/20"
          placeholder={
            selectedService
              ? `Saya ingin konsultasi tentang ${selectedService.title}...`
              : "Contoh: usaha saya sudah berjalan tetapi belum memiliki badan usaha..."
          }
        />
      </label>

      {state === "error" ? (
        <p className="mt-4 border-l-2 border-rose-500 bg-rose-50 px-4 py-3 text-sm text-rose-700">
          Konsultasi belum berhasil terkirim. Silakan coba lagi atau gunakan WhatsApp untuk menghubungi tim kami.
        </p>
      ) : null}

      <div className="mt-7 flex flex-wrap items-center justify-between gap-4 border-t border-brand-navy/10 pt-6">
        <p className="max-w-sm text-[10px] leading-5 text-slate-400">
          Dengan mengirim form, Anda menyetujui informasi awal digunakan untuk menindaklanjuti konsultasi.
        </p>
        <button
          type="submit"
          disabled={state === "loading"}
          className="inline-flex h-12 items-center gap-3 bg-brand-navy px-6 text-sm font-semibold text-white transition hover:bg-brand-navy-dark disabled:cursor-not-allowed disabled:opacity-60"
        >
          {state === "loading" ? "Mengirim..." : "Kirim Konsultasi"}
          <ArrowRight className="h-4 w-4 text-brand-gold-soft" />
        </button>
      </div>
    </form>
  );
}

function FieldLabel({
  label,
  optional,
  children,
}: {
  label: string;
  optional?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="grid gap-2 text-xs font-semibold uppercase tracking-[0.08em] text-brand-ink">
      <span>
        {label}
        {optional ? <span className="ml-1 font-semibold normal-case tracking-normal text-slate-400">(opsional)</span> : null}
      </span>
      {children}
    </label>
  );
}
