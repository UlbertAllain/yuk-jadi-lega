const required = [
  "NEXT_PUBLIC_SITE_URL",
  "NEXT_PUBLIC_FIREBASE_API_KEY",
  "NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN",
  "NEXT_PUBLIC_FIREBASE_PROJECT_ID",
  "NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET",
  "NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID",
  "NEXT_PUBLIC_FIREBASE_APP_ID",
  "FIREBASE_ADMIN_PROJECT_ID",
  "FIREBASE_ADMIN_CLIENT_EMAIL",
  "FIREBASE_ADMIN_PRIVATE_KEY",
  "CLOUDINARY_CLOUD_NAME",
  "CLOUDINARY_API_KEY",
  "CLOUDINARY_API_SECRET",
];

const optional = [
  "NEXT_PUBLIC_FIREBASE_APP_CHECK_SITE_KEY",
  "NEXT_PUBLIC_FIREBASE_APP_CHECK_DEBUG",
  "FIREBASE_APP_CHECK_ENFORCE_CUSTOM_API",
  "NEXT_PUBLIC_GA_MEASUREMENT_ID",
  "RESEND_API_KEY",
  "LEAD_NOTIFICATION_FROM",
  "LEAD_NOTIFICATION_TO",
];

const missing = required.filter((key) => !process.env[key]?.trim());
const warnings = [];

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();
if (siteUrl) {
  try {
    const url = new URL(siteUrl);
    if (url.protocol !== "https:" && url.hostname !== "localhost") {
      warnings.push("NEXT_PUBLIC_SITE_URL sebaiknya menggunakan HTTPS di production.");
    }
  } catch {
    warnings.push("NEXT_PUBLIC_SITE_URL bukan URL yang valid.");
  }
}

if (
  process.env.FIREBASE_ADMIN_PROJECT_ID &&
  process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID &&
  process.env.FIREBASE_ADMIN_PROJECT_ID !== process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID
) {
  warnings.push("FIREBASE_ADMIN_PROJECT_ID berbeda dari NEXT_PUBLIC_FIREBASE_PROJECT_ID.");
}

const privateKey = process.env.FIREBASE_ADMIN_PRIVATE_KEY || "";
if (privateKey && !privateKey.includes("BEGIN PRIVATE KEY")) {
  warnings.push("FIREBASE_ADMIN_PRIVATE_KEY tidak terlihat seperti private key service account.");
}

if (process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET) {
  warnings.push(
    "NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET sudah tidak dipakai sejak V8. Hapus setelah signed upload terverifikasi.",
  );
}

if (process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME) {
  warnings.push(
    "NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME tidak diperlukan lagi; cloud name berasal dari server signature endpoint.",
  );
}

const appCheckEnforced = process.env.FIREBASE_APP_CHECK_ENFORCE_CUSTOM_API === "true";
if (appCheckEnforced && !process.env.NEXT_PUBLIC_FIREBASE_APP_CHECK_SITE_KEY?.trim()) {
  warnings.push(
    "FIREBASE_APP_CHECK_ENFORCE_CUSTOM_API=true tetapi NEXT_PUBLIC_FIREBASE_APP_CHECK_SITE_KEY belum diisi.",
  );
}

const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID?.trim();
if (gaId && !/^G-[A-Z0-9]+$/i.test(gaId)) {
  warnings.push("NEXT_PUBLIC_GA_MEASUREMENT_ID biasanya berbentuk G-XXXXXXXXXX.");
}

const resendKeys = ["RESEND_API_KEY", "LEAD_NOTIFICATION_FROM", "LEAD_NOTIFICATION_TO"];
const configuredResendKeys = resendKeys.filter((key) => process.env[key]?.trim());
if (configuredResendKeys.length > 0 && configuredResendKeys.length < resendKeys.length) {
  warnings.push(
    "Notifikasi email lead belum lengkap. Isi RESEND_API_KEY, LEAD_NOTIFICATION_FROM, dan LEAD_NOTIFICATION_TO sekaligus, atau kosongkan semuanya.",
  );
}

console.log("\nYuk Jadi Legal — Production Environment Check\n");

for (const key of required) {
  console.log(`${process.env[key]?.trim() ? "[OK]" : "[MISSING]"} ${key}`);
}

for (const key of optional) {
  console.log(`${process.env[key]?.trim() ? "[SET]" : "[OPTIONAL]"} ${key}`);
}

if (warnings.length) {
  console.log("\nWarnings:");
  warnings.forEach((warning) => console.log(`- ${warning}`));
}

if (missing.length) {
  console.error(`\nEnvironment belum lengkap: ${missing.length} variable wajib belum diisi.`);
  process.exit(1);
}

console.log("\nEnvironment minimum production sudah lengkap.\n");
