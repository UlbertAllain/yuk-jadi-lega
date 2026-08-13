"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { onAuthStateChanged, signOut, type User } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import {
  BookOpenText,
  BriefcaseBusiness,
  Building2,
  CircleHelp,
  FileText,
  Gauge,
  Handshake,
  LogOut,
  Menu,
  MessageSquareText,
  Settings,
  Star,
  Users,
} from "lucide-react";
import { auth, db, isFirebaseConfigured } from "@/lib/firebase";
import { cn } from "@/lib/format";

const navigation = [
  ["Dashboard", "/admin", Gauge],
  ["Layanan", "/admin/services", BriefcaseBusiness],
  ["Artikel", "/admin/articles", BookOpenText],
  ["Partner & Klien", "/admin/partners", Handshake],
  ["Testimoni", "/admin/testimonials", Star],
  ["FAQ", "/admin/faqs", CircleHelp],
  ["Tim", "/admin/team", Users],
  ["Studi Kasus", "/admin/case-studies", FileText],
  ["Konsultasi", "/admin/leads", MessageSquareText],
  ["Pengaturan", "/admin/settings", Settings],
] as const;

export function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const isLoginPage = pathname === "/admin/login";

  useEffect(() => {
    if (isLoginPage) {
      setLoading(false);
      return;
    }

    if (!isFirebaseConfigured || !auth || !db) {
      setLoading(false);
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, async (nextUser) => {
      if (!nextUser) {
        setUser(null);
        setAuthorized(false);
        setLoading(false);
        router.replace("/admin/login");
        return;
      }

      setUser(nextUser);

      try {
        const adminSnapshot = await getDoc(doc(db!, "admins", nextUser.uid));
        const allowed = adminSnapshot.exists() && adminSnapshot.data().active === true;

        setAuthorized(allowed);
        if (!allowed) {
          await signOut(auth!);
          router.replace("/admin/login?error=not-admin");
        }
      } catch (error) {
        console.error("Gagal memeriksa akses admin", error);
        setAuthorized(false);
        await signOut(auth!);
        router.replace("/admin/login");
      } finally {
        setLoading(false);
      }
    });

    return unsubscribe;
  }, [isLoginPage, router]);

  if (isLoginPage) {
    return <>{children}</>;
  }

  if (!isFirebaseConfigured) {
    return <MissingConfiguration />;
  }

  if (loading || !authorized) {
    return (
      <main className="grid min-h-screen place-items-center bg-brand-paper text-sm font-bold text-slate-600">
        Memeriksa akses admin...
      </main>
    );
  }

  async function logout() {
    if (auth) {
      await signOut(auth);
    }
    router.replace("/admin/login");
  }

  return (
    <div className="min-h-screen bg-admin-surface">
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-72 border-r border-slate-200 bg-brand-ink p-5 text-white transition-transform lg:translate-x-0",
          sidebarOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex h-14 items-center gap-3 px-2">
          <span className="grid h-10 w-10 place-items-center rounded-xl bg-white text-xs font-black text-brand-green">
            YJL
          </span>
          <div>
            <p className="font-black tracking-[-0.03em]">Yuk Jadi Legal</p>
            <p className="text-xs text-slate-400">Admin Website</p>
          </div>
        </div>

        <nav className="mt-8 grid gap-1">
          {navigation.map(([label, href, Icon]) => {
            const active =
              href === "/admin" ? pathname === href : pathname.startsWith(href);

            return (
              <Link
                key={href}
                href={href}
                onClick={() => setSidebarOpen(false)}
                className={cn(
                  "flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-bold transition",
                  active
                    ? "bg-white text-brand-ink"
                    : "text-slate-300 hover:bg-white/10 hover:text-white",
                )}
              >
                <Icon className="h-4 w-4" />
                {label}
              </Link>
            );
          })}
        </nav>

        <div className="absolute bottom-5 left-5 right-5 rounded-2xl border border-white/10 p-4">
          <p className="truncate text-xs text-slate-400">{user?.email}</p>
          <button
            onClick={logout}
            className="mt-3 flex items-center gap-2 text-sm font-bold text-white"
          >
            <LogOut className="h-4 w-4" />
            Keluar
          </button>
        </div>
      </aside>

      {sidebarOpen ? (
        <button
          className="fixed inset-0 z-40 bg-black/30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
          aria-label="Tutup menu admin"
        />
      ) : null}

      <div className="lg:pl-72">
        <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b border-slate-200 bg-white/90 px-5 backdrop-blur lg:px-8">
          <button
            onClick={() => setSidebarOpen(true)}
            className="grid h-10 w-10 place-items-center rounded-xl border border-slate-200 lg:hidden"
            aria-label="Buka menu admin"
          >
            <Menu className="h-5 w-5" />
          </button>

          <div className="hidden lg:block">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-slate-400">
              Admin Website
            </p>
            <p className="mt-1 text-sm font-bold text-slate-700">
              Kelola informasi yang tampil untuk calon klien.
            </p>
          </div>

          <Link
            href="/"
            target="_blank"
            className="text-sm font-black text-brand-green"
          >
            Lihat website ↗
          </Link>
        </header>

        <main className="p-5 lg:p-8">{children}</main>
      </div>
    </div>
  );
}

function MissingConfiguration() {
  return (
    <main className="grid min-h-screen place-items-center bg-brand-paper p-6">
      <div className="max-w-xl rounded-[2rem] border border-amber-200 bg-white p-8 shadow-xl shadow-slate-900/5">
        <Building2 className="h-9 w-9 text-brand-green" />
        <h1 className="mt-5 text-3xl font-black tracking-[-0.05em] text-slate-950">
          Setup admin belum selesai.
        </h1>
        <p className="mt-4 text-sm leading-7 text-slate-600">
          Lengkapi konfigurasi Firebase di file lingkungan project, lalu jalankan ulang development server. Panduan lengkap tersedia di SETUP.md.
        </p>
        <Link
          href="/"
          className="mt-6 inline-block text-sm font-black text-brand-green"
        >
          ← Kembali ke website
        </Link>
      </div>
    </main>
  );
}
