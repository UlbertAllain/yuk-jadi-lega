import { createHash } from "node:crypto";
import { NextResponse } from "next/server";
import { adminAppCheck, adminAuth, adminDb } from "@/lib/firebase-admin";

export const runtime = "nodejs";

const ALLOWED_FOLDERS = new Set([
  "yuk-jadi-legal",
  "yuk-jadi-legal/articles",
  "yuk-jadi-legal/team",
  "yuk-jadi-legal/partners",
  "yuk-jadi-legal/testimonials",
]);

function unauthorized(message = "Akses tidak diizinkan.") {
  return NextResponse.json({ error: message }, { status: 401 });
}

export async function POST(request: Request) {
  if (!adminAuth || !adminDb) {
    return NextResponse.json(
      { error: "Firebase Admin belum dikonfigurasi di server." },
      { status: 503 },
    );
  }

  const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;

  if (!cloudName || !apiKey || !apiSecret) {
    return NextResponse.json(
      { error: "Cloudinary signed upload belum dikonfigurasi di server." },
      { status: 503 },
    );
  }

  const authorization = request.headers.get("authorization");
  const idToken = authorization?.startsWith("Bearer ")
    ? authorization.slice(7)
    : "";

  if (!idToken) return unauthorized();

  try {
    const decoded = await adminAuth.verifyIdToken(idToken, true);
    const adminSnapshot = await adminDb.collection("admins").doc(decoded.uid).get();

    if (!adminSnapshot.exists || adminSnapshot.data()?.active !== true) {
      return NextResponse.json({ error: "Akun bukan admin aktif." }, { status: 403 });
    }

    const shouldVerifyAppCheck =
      process.env.FIREBASE_APP_CHECK_ENFORCE_CUSTOM_API === "true";

    if (shouldVerifyAppCheck) {
      const appCheckToken = request.headers.get("x-firebase-appcheck");
      if (!appCheckToken || !adminAppCheck) {
        return unauthorized("App Check token diperlukan.");
      }
      await adminAppCheck.verifyToken(appCheckToken);
    }

    const body = (await request.json()) as { folder?: unknown };
    const folder = typeof body.folder === "string" ? body.folder.trim() : "";

    if (!ALLOWED_FOLDERS.has(folder)) {
      return NextResponse.json({ error: "Folder upload tidak diizinkan." }, { status: 400 });
    }

    const timestamp = Math.floor(Date.now() / 1000);
    const stringToSign = `folder=${folder}&timestamp=${timestamp}${apiSecret}`;
    const signature = createHash("sha1").update(stringToSign).digest("hex");

    return NextResponse.json({
      cloudName,
      apiKey,
      timestamp,
      folder,
      signature,
    });
  } catch (error) {
    console.error("[cloudinary-signature] request rejected", error);
    return unauthorized("Sesi admin tidak valid atau sudah kedaluwarsa.");
  }
}
