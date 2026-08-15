import { getApps, initializeApp, type FirebaseApp } from "firebase/app";
import {
  initializeAppCheck,
  ReCaptchaEnterpriseProvider,
  type AppCheck,
} from "firebase/app-check";
import { getAuth, type Auth } from "firebase/auth";
import { getFirestore, type Firestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

const appCheckSiteKey = process.env.NEXT_PUBLIC_FIREBASE_APP_CHECK_SITE_KEY;
const appCheckDebug = process.env.NEXT_PUBLIC_FIREBASE_APP_CHECK_DEBUG === "true";

export const isFirebaseConfigured = Boolean(
  firebaseConfig.apiKey &&
    firebaseConfig.authDomain &&
    firebaseConfig.projectId &&
    firebaseConfig.appId,
);

export const isAppCheckConfigured = Boolean(appCheckSiteKey);

let app: FirebaseApp | null = null;
let auth: Auth | null = null;
let db: Firestore | null = null;
let appCheck: AppCheck | null = null;

if (isFirebaseConfigured) {
  app = getApps()[0] ?? initializeApp(firebaseConfig);
  db = getFirestore(app);

  if (typeof window !== "undefined") {
    auth = getAuth(app);

    if (appCheckSiteKey) {
      if (appCheckDebug && process.env.NODE_ENV !== "production") {
        const appCheckGlobal = self as typeof self & {
          FIREBASE_APPCHECK_DEBUG_TOKEN?: boolean | string;
        };
        appCheckGlobal.FIREBASE_APPCHECK_DEBUG_TOKEN = true;
      }

      try {
        appCheck = initializeAppCheck(app, {
          provider: new ReCaptchaEnterpriseProvider(appCheckSiteKey),
          isTokenAutoRefreshEnabled: true,
        });
      } catch (error) {
        // HMR may attempt to initialize the singleton more than once in development.
        if (process.env.NODE_ENV === "production") {
          console.error("Firebase App Check gagal diinisialisasi", error);
        }
      }
    }
  }
}

export { app, auth, db, appCheck };
