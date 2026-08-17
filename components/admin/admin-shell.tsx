"use client";

import Link from "next/link";
import { useEffect, useState, useSyncExternalStore } from "react";
import { usePathname, useRouter } from "next/navigation";
import { onAuthStateChanged, signOut, type User } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import {
  BookOpenText,
  BriefcaseBusiness,
  Building2,
  CircleHelp,
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
import { BrandMark } from "@/components/shared/brand-mark";

const subscribeToClientReady = () => () => {};

const navigationGroups = [
  {
    label: "Utama",
    items: [
      ["Dashboard", "/admin", Gauge],
      ["Layanan", "/admin/services", BriefcaseBusiness],
      ["Artikel", "/admin/articles", BookOpenText],
    ],
  },
  {
    label: "Kepercayaan",
    items: [
      ["Partner & Klien", "/admin/partners", Handshake],
      ["Testimoni", "/admin/testimonials", Star],
      ["FAQ", "/admin/faqs", CircleHelp],
      ["Tim", "/admin/team", Users],
    ],
  },
  {
    label: "Operasional",
    items: [["Konsultasi", "/admin/leads", MessageSquareText]],
  },
  {
    label: "Sistem",
    items: [["Pengaturan", "/admin/settings", Settings]],
  },
] as const;

export function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const isLoginPage = pathname === "/admin/login";
  const isClientReady = useSyncExternalStore(
    subscribeToClientReady,
    () => true,
    () => false,
  );
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(!isLoginPage && isFirebaseConfigured);
  const [authorized, setAuthorized] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (isLoginPage || !isFirebaseConfigured || !auth || !db) return;

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

  if (isLoginPage) return <>{children}</>;

  if (!isClientReady) {
    return <AdminAccessLoading />;
  }

  if (!isFirebaseConfigured || !auth || !db) return <MissingConfiguration />;

  if (loading || !authorized) {
    return <AdminAccessLoading />;
  }

  async function logout() {
    if (auth) await signOut(auth);
    router.replace("/admin/login");
  }

  return (
    <div className="min-h-screen bg-admin-surface">
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-72 border-r border-white/8 bg-brand-ink text-white transition-transform lg:translate-x-0",
          sidebarOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex h-full min-h-0 flex-col p-4">
          <div className="flex h-16 shrink-0 items-center gap-3 border-b border-white/10 px-2">
            <BrandMark frameClassName="h-10 w-10 rounded-xl ring-white/10" />
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold tracking-[-0.02em]">Yuk Jadi Legal</p>
              <p className="mt-0.5 text-xs text-slate-400">Admin Website</p>
            </div>
          </div>

          <div className="min-h-0 flex-1 overflow-y-auto py-4 pr-1 [scrollbar-width:thin] [scrollbar-color:rgba(255,255,255,.18)_transparent]">
            <nav className="space-y-5" aria-label="Navigasi admin">
              {navigationGroups.map((group) => (
                <div key={group.label}>
                  <p className="px-3 text-[10px] font-medium uppercase tracking-[0.13em] text-slate-500">
                    {group.label}
                  </p>
                  <div className="mt-2 grid gap-1">
                    {group.items.map(([label, href, Icon]) => {
                      const active = href === "/admin" ? pathname === href : pathname.startsWith(href);

                      return (
                        <Link
                          key={href}
                          href={href}
                          onClick={() => setSidebarOpen(false)}
                          className={cn(
                            "flex min-h-11 items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition",
                            active
                              ? "bg-white text-brand-ink shadow-sm"
                              : "text-slate-300 hover:bg-white/8 hover:text-white",
                          )}
                        >
                          <Icon className="h-4 w-4 shrink-0" />
                          <span className="min-w-0 truncate">{label}</span>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              ))}
            </nav>
          </div>

          <div className="mt-3 shrink-0 border-t border-white/10 pt-3">
            <div className="rounded-2xl border border-white/10 bg-white/[.035] p-3">
              <p className="truncate text-[11px] text-slate-400">{user?.email}</p>
              <button
                onClick={logout}
                className="mt-2 flex w-full items-center gap-2 rounded-xl px-2 py-2 text-sm font-medium text-white transition hover:bg-white/8"
              >
                <LogOut className="h-4 w-4" />
                Keluar
              </button>
            </div>
          </div>
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
        <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b border-slate-200 bg-white/92 px-5 backdrop-blur lg:px-8">
          <button
            onClick={() => setSidebarOpen(true)}
            className="grid h-10 w-10 place-items-center rounded-xl border border-slate-200 bg-white lg:hidden"
            aria-label="Buka menu admin"
          >
            <Menu className="h-5 w-5" />
          </button>

          <div className="hidden lg:block">
            <p className="text-[10px] font-medium uppercase tracking-[0.13em] text-slate-400">Admin Website</p>
            <p className="mt-1 text-sm font-medium text-slate-700">Kelola informasi yang tampil untuk calon klien.</p>
          </div>

          <Link href="/" target="_blank" className="text-sm font-semibold text-brand-navy hover:text-brand-gold-dark">
            Lihat website ↗
          </Link>
        </header>

        <main className="p-5 lg:p-8">{children}</main>
      </div>
    </div>
  );
}

function AdminAccessLoading() {
  return (
    <main className="grid min-h-screen place-items-center bg-brand-paper text-sm font-medium text-slate-600">
      Memeriksa akses admin...
    </main>
  );
}

function MissingConfiguration() {
  return (
    <main className="grid min-h-screen place-items-center bg-brand-paper p-6">
      <div className="max-w-xl rounded-[2rem] border border-amber-200 bg-white p-8 shadow-xl shadow-slate-900/5">
        <Building2 className="h-9 w-9 text-brand-navy" />
        <h1 className="mt-5 text-3xl font-semibold tracking-[-0.05em] text-slate-950">Setup admin belum selesai.</h1>
        <p className="mt-4 text-sm leading-7 text-slate-600">
          Lengkapi konfigurasi Firebase di file lingkungan project, lalu jalankan ulang development server. Panduan lengkap tersedia di SETUP.md.
        </p>
        <Link href="/" className="mt-6 inline-block text-sm font-semibold text-brand-navy">
          ← Kembali ke website
        </Link>
      </div>
    </main>
  );
}
