import { cert, getApps, initializeApp, type App } from "firebase-admin/app";
import { getAppCheck, type AppCheck } from "firebase-admin/app-check";
import { getAuth, type Auth } from "firebase-admin/auth";
import { getFirestore, type Firestore } from "firebase-admin/firestore";

const projectId = process.env.FIREBASE_ADMIN_PROJECT_ID;
const clientEmail = process.env.FIREBASE_ADMIN_CLIENT_EMAIL;
const privateKey = process.env.FIREBASE_ADMIN_PRIVATE_KEY?.replace(/\\n/g, "\n");

export const isFirebaseAdminConfigured = Boolean(
  projectId && clientEmail && privateKey,
);

let adminApp: App | null = null;
let adminAuth: Auth | null = null;
let adminDb: Firestore | null = null;
let adminAppCheck: AppCheck | null = null;

if (isFirebaseAdminConfigured) {
  adminApp =
    getApps()[0] ??
    initializeApp({
      credential: cert({
        projectId: projectId!,
        clientEmail: clientEmail!,
        privateKey: privateKey!,
      }),
    });

  adminAuth = getAuth(adminApp);
  adminDb = getFirestore(adminApp);
  adminAppCheck = getAppCheck(adminApp);
}

export { adminApp, adminAuth, adminDb, adminAppCheck };
