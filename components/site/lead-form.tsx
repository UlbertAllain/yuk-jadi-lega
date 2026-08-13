"use client";

import { useMemo, useState } from "react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { db } from "@/lib/firebase";
import type { ServiceOption } from "@/types";

type FormState = "idle" | "loading" | "success" | "error";

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

    // Honeypot: basic protection against automated form spam.
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
      <div className="rounded-[2rem] border border-emerald-200 bg-emerald-50 p-8">
        <CheckCircle2 className="h-10 w-10 text-emerald-700" />
        <h3 className="mt-5 text-2xl font-black tracking-[-0.04em] text-slate-950">
          Konsultasimu sudah terkirim.
        </h3>
        <p className="mt-3 text-sm leading-7 text-slate-600">
          Tim Yuk Jadi Legal akan meninjau kebutuhan yang kamu kirim dan menghubungi melalui kontak yang tersedia.
        </p>
        <button
          type="button"
          onClick={() => setState("idle")}
          className="mt-6 text-sm font-bold text-brand-green"
        >
          Kirim konsultasi lain →
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={submit}
      className="relative rounded-[2rem] border border-slate-200 bg-white p-6 shadow-xl shadow-slate-900/5 sm:p-8"
    >
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
        <label className="grid gap-2 text-sm font-bold text-slate-700">
          Nama lengkap
          <input
            value={name}
            onChange={(event) => setName(event.target.value)}
            required
            minLength={2}
            maxLength={120}
            autoComplete="name"
            className="h-12 rounded-xl border border-slate-200 px-4 font-normal outline-none transition focus:border-brand-green"
            placeholder="Nama kamu"
          />
        </label>

        <label className="grid gap-2 text-sm font-bold text-slate-700">
          WhatsApp
          <input
            value={whatsapp}
            onChange={(event) => setWhatsapp(event.target.value.replace(/\D/g, ""))}
            required
            minLength={8}
            maxLength={30}
            inputMode="tel"
            autoComplete="tel"
            className="h-12 rounded-xl border border-slate-200 px-4 font-normal outline-none transition focus:border-brand-green"
            placeholder="08xxxxxxxxxx"
          />
        </label>

        <label className="grid gap-2 text-sm font-bold text-slate-700">
          Email <span className="font-normal text-slate-400">(opsional)</span>
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            maxLength={160}
            autoComplete="email"
            className="h-12 rounded-xl border border-slate-200 px-4 font-normal outline-none transition focus:border-brand-green"
            placeholder="nama@email.com"
          />
        </label>

        <label className="grid gap-2 text-sm font-bold text-slate-700">
          Layanan
          <select
            value={serviceSlug}
            onChange={(event) => setServiceSlug(event.target.value)}
            className="h-12 rounded-xl border border-slate-200 bg-white px-4 font-normal outline-none transition focus:border-brand-green"
          >
            <option value="">Belum yakin / konsultasi umum</option>
            {services.map((service) => (
              <option key={service.id} value={service.slug}>
                {service.title}
              </option>
            ))}
          </select>
        </label>
      </div>

      <label className="mt-5 grid gap-2 text-sm font-bold text-slate-700">
        Ceritakan kebutuhanmu
        <textarea
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          required
          minLength={3}
          maxLength={3000}
          rows={5}
          className="rounded-xl border border-slate-200 px-4 py-3 font-normal leading-6 outline-none transition focus:border-brand-green"
          placeholder={
            selectedService
              ? `Saya ingin konsultasi tentang ${selectedService.title}...`
              : "Contoh: usaha saya sudah berjalan tetapi belum punya badan usaha..."
          }
        />
      </label>

      {state === "error" ? (
        <p className="mt-4 rounded-xl bg-rose-50 px-4 py-3 text-sm text-rose-700">
          Konsultasi belum berhasil terkirim. Silakan coba lagi atau gunakan tombol WhatsApp untuk menghubungi tim kami.
        </p>
      ) : null}

      <button
        type="submit"
        disabled={state === "loading"}
        className="mt-6 inline-flex h-12 items-center gap-2 rounded-full bg-brand-green px-6 text-sm font-black text-white transition hover:bg-brand-green-dark disabled:cursor-not-allowed disabled:opacity-60"
      >
        {state === "loading" ? "Mengirim..." : "Kirim Konsultasi"}
        <ArrowRight className="h-4 w-4" />
      </button>
    </form>
  );
}
