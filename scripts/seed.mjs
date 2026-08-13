import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc, getFirestore, serverTimestamp, setDoc } from "firebase/firestore";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const raw = JSON.parse(await fs.readFile(path.join(root, "data", "seed-data.json"), "utf8"));

const required = [
  "NEXT_PUBLIC_FIREBASE_API_KEY",
  "NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN",
  "NEXT_PUBLIC_FIREBASE_PROJECT_ID",
  "NEXT_PUBLIC_FIREBASE_APP_ID",
  "SEED_ADMIN_EMAIL",
  "SEED_ADMIN_PASSWORD",
];

const missing = required.filter((key) => !process.env[key]);
if (missing.length) {
  console.error(`\nSeed dibatalkan. Env belum lengkap: ${missing.join(", ")}\n`);
  process.exit(1);
}

const app = initializeApp({
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
});

const auth = getAuth(app);
const db = getFirestore(app);

console.log("\nYuk Jadi Legal — seeder");
console.log("--------------------------------");
console.log(`Login sebagai ${process.env.SEED_ADMIN_EMAIL}...`);
const credential = await signInWithEmailAndPassword(auth, process.env.SEED_ADMIN_EMAIL, process.env.SEED_ADMIN_PASSWORD);

const adminSnapshot = await getDoc(doc(db, "admins", credential.user.uid));
if (!adminSnapshot.exists() || adminSnapshot.data().active !== true) {
  console.error("\nAkun berhasil login tetapi belum terdaftar sebagai admin aktif.");
  console.error(`Buat Firestore document: admins/${credential.user.uid}`);
  console.error("Field: active=true dan email=<email admin>\n");
  process.exit(1);
}

async function seedCollection(name, items) {
  console.log(`Seeding ${name} (${items.length})...`);
  for (const item of items) {
    const { id, ...data } = item;
    await setDoc(doc(db, name, id), {
      ...data,
      updatedAt: serverTimestamp(),
    });
  }
}

await seedCollection("serviceCategories", raw.serviceCategories);
await seedCollection("services", raw.services);
await seedCollection("articles", raw.articles);
await seedCollection("testimonials", raw.testimonials);
await seedCollection("partners", raw.partners);
await seedCollection("faqs", raw.faqs);
await seedCollection("teamMembers", raw.teamMembers);
await seedCollection("caseStudies", raw.caseStudies);

const { id: settingsId, ...settings } = raw.siteSettings;
await setDoc(doc(db, "siteSettings", settingsId), {
  ...settings,
  updatedAt: serverTimestamp(),
});

console.log("\nSeed selesai.");
console.log("Seed awal selesai. Partner, client, testimonial, tim, studi kasus, kontak, dan statistik sengaja tidak diisi.");
console.log("Masukkan data resmi Yuk Jadi Legal melalui CMS sebelum website dipublikasikan.\n");
process.exit(0);
