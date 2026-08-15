"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { signInWithEmailAndPassword } from "firebase/auth";
import { ArrowRight, Eye, EyeOff } from "lucide-react";
import { auth, isFirebaseConfigured } from "@/lib/firebase";
import { BrandMark } from "@/components/shared/brand-mark";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    if (params.get("error") === "not-admin") {
      const timeoutId = window.setTimeout(() => {
        setError("Akun ini belum memiliki akses admin.");
      }, 0);

      return () => {
        window.clearTimeout(timeoutId);
      };
    }
  }, []);

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!auth) {
      setError("Konfigurasi website belum lengkap.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      await signInWithEmailAndPassword(auth, email.trim(), password);
      router.replace("/admin");
    } catch (signInError) {
      console.error(signInError);
      setError(
        "Email atau password tidak sesuai, atau akun belum memiliki akses.",
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="grid min-h-screen bg-brand-ink lg:grid-cols-2">
      <section className="hidden items-end p-12 text-white lg:flex">
        <div className="max-w-xl">
          <BrandMark frameClassName="h-16 w-16 rounded-2xl" />
          <p className="mt-8 text-xs font-semibold uppercase tracking-[0.2em] text-brand-gold-soft">
            Yuk Jadi Legal
          </p>
          <h1 className="mt-4 text-5xl font-semibold tracking-[-0.06em]">
            Kelola website dari satu tempat.
          </h1>
          <p className="mt-5 text-sm leading-7 text-slate-300">
            Perbarui layanan, artikel, partner, testimoni, FAQ, tim, studi
            kasus, dan konsultasi yang masuk tanpa mengubah kode.
          </p>
        </div>
      </section>

      <section className="grid place-items-center bg-brand-paper p-6 sm:p-10">
        <form
          onSubmit={submit}
          className="w-full max-w-md rounded-[2rem] bg-white p-7 shadow-2xl shadow-slate-900/10 sm:p-9"
        >
          <div className="grid h-12 w-12 place-items-center rounded-2xl bg-brand-navy text-sm font-semibold text-white">
            YJL
          </div>
          <h2 className="mt-6 text-3xl font-semibold tracking-[-0.05em] text-slate-950">
            Masuk Admin
          </h2>
          <p className="mt-2 text-sm leading-6 text-slate-500">
            Masuk menggunakan akun admin Yuk Jadi Legal.
          </p>

          {!isFirebaseConfigured ? (
            <p className="mt-5 rounded-xl bg-amber-50 p-4 text-sm text-amber-800">
              Konfigurasi aplikasi belum lengkap. Selesaikan setup sebelum masuk
              ke panel admin.
            </p>
          ) : null}

          <label className="mt-7 grid gap-2 text-sm font-medium text-slate-700">
            Email
            <input
              type="email"
              required
              autoComplete="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="h-12 rounded-xl border border-slate-200 px-4 font-normal outline-none focus:border-brand-navy"
              placeholder="admin@yukjadilegal.id"
            />
          </label>

          <label className="mt-4 grid gap-2 text-sm font-medium text-slate-700">
            Password
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                required
                autoComplete="current-password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="h-12 w-full rounded-xl border border-slate-200 px-4 pr-12 font-normal outline-none focus:border-brand-navy"
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPassword((value) => !value)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
                aria-label={
                  showPassword ? "Sembunyikan password" : "Lihat password"
                }
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>
          </label>

          {error ? (
            <p className="mt-4 rounded-xl bg-rose-50 px-4 py-3 text-sm text-rose-700">
              {error}
            </p>
          ) : null}

          <button
            disabled={loading || !isFirebaseConfigured}
            className="mt-6 inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-brand-navy text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? "Memproses..." : "Masuk"}
            <ArrowRight className="h-4 w-4" />
          </button>
        </form>
      </section>
    </main>
  );
}
