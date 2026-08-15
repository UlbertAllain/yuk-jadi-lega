import { FieldValue } from "firebase-admin/firestore";
import { NextResponse } from "next/server";
import { adminDb } from "@/lib/firebase-admin";
import { sendLeadNotification } from "@/lib/lead-notification";

export const runtime = "nodejs";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const WHATSAPP_PATTERN = /^\d{8,30}$/;

type LeadRequest = {
  name?: unknown;
  whatsapp?: unknown;
  email?: unknown;
  serviceSlug?: unknown;
  message?: unknown;
  website?: unknown;
};

function text(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function invalid(message: string) {
  return NextResponse.json({ error: message }, { status: 400 });
}

export async function POST(request: Request) {
  if (!adminDb) {
    return NextResponse.json(
      { error: "Layanan konsultasi belum tersedia." },
      { status: 503 },
    );
  }

  let body: LeadRequest;
  try {
    body = (await request.json()) as LeadRequest;
  } catch {
    return invalid("Payload konsultasi tidak valid.");
  }

  // Honeypot: bot dianggap sukses agar tidak mendapat sinyal untuk mencoba ulang.
  if (text(body.website)) {
    return NextResponse.json({ ok: true });
  }

  const name = text(body.name);
  const whatsapp = text(body.whatsapp).replace(/\D/g, "");
  const email = text(body.email);
  const serviceSlug = text(body.serviceSlug);
  const message = text(body.message);

  if (name.length < 2 || name.length > 120) {
    return invalid("Nama harus terdiri dari 2 sampai 120 karakter.");
  }

  if (!WHATSAPP_PATTERN.test(whatsapp)) {
    return invalid("Nomor WhatsApp tidak valid.");
  }

  if (email && (email.length > 160 || !EMAIL_PATTERN.test(email))) {
    return invalid("Alamat email tidak valid.");
  }

  if (serviceSlug.length > 120) {
    return invalid("Layanan yang dipilih tidak valid.");
  }

  if (message.length < 3 || message.length > 3000) {
    return invalid("Pesan harus terdiri dari 3 sampai 3000 karakter.");
  }

  const leadRef = adminDb.collection("leads").doc();

  await leadRef.set({
    name,
    whatsapp,
    email,
    serviceSlug,
    message,
    source: "website-form",
    status: "baru",
    createdAt: FieldValue.serverTimestamp(),
    updatedAt: FieldValue.serverTimestamp(),
  });

  try {
    await sendLeadNotification({
      id: leadRef.id,
      name,
      whatsapp,
      email,
      serviceSlug,
      message,
    });
  } catch (error) {
    // Email notification is operational convenience only. Never fail a valid lead.
    console.error("[lead-notification] notification failed", error);
  }

  return NextResponse.json({ ok: true }, { status: 201 });
}
