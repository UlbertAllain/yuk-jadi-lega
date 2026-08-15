"use client";

import { useRef, useState } from "react";
import { getToken as getAppCheckToken } from "firebase/app-check";
import { ImagePlus, Loader2, Trash2 } from "lucide-react";
import { CmsImage } from "@/components/shared/cms-image";
import { appCheck, auth } from "@/lib/firebase";

const MAX_IMAGE_SIZE = 5 * 1024 * 1024;
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"];

type MediaUploaderProps = {
  value?: string;
  onChange: (url: string) => void;
  folder?: string;
};

type SignedUploadConfig = {
  cloudName: string;
  apiKey: string;
  timestamp: number;
  folder: string;
  signature: string;
  error?: string;
};

export function MediaUploader({
  value,
  onChange,
  folder = "yuk-jadi-legal",
}: MediaUploaderProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function upload(file: File) {
    if (!ACCEPTED_IMAGE_TYPES.includes(file.type)) {
      setError("Gunakan gambar JPG, PNG, atau WebP.");
      return;
    }

    if (file.size > MAX_IMAGE_SIZE) {
      setError("Ukuran gambar maksimal 5 MB.");
      return;
    }

    const user = auth?.currentUser;
    if (!user) {
      setError("Sesi admin tidak ditemukan. Silakan login ulang.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const idToken = await user.getIdToken();
      const headers: Record<string, string> = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${idToken}`,
      };

      if (appCheck) {
        const token = await getAppCheckToken(appCheck, false);
        headers["X-Firebase-AppCheck"] = token.token;
      }

      const signatureResponse = await fetch("/api/admin/cloudinary-signature", {
        method: "POST",
        headers,
        body: JSON.stringify({ folder }),
      });

      const signed = (await signatureResponse.json()) as SignedUploadConfig;
      if (!signatureResponse.ok) {
        throw new Error(signed.error || "Gagal membuat signature upload.");
      }

      const form = new FormData();
      form.append("file", file);
      form.append("api_key", signed.apiKey);
      form.append("timestamp", String(signed.timestamp));
      form.append("folder", signed.folder);
      form.append("signature", signed.signature);

      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${signed.cloudName}/image/upload`,
        {
          method: "POST",
          body: form,
        },
      );

      if (!response.ok) {
        throw new Error("Cloudinary signed upload failed");
      }

      const data = (await response.json()) as { secure_url?: string };
      if (!data.secure_url) {
        throw new Error("Cloudinary response missing secure_url");
      }

      onChange(data.secure_url);
    } catch (uploadError) {
      console.error(uploadError);
      setError(
        uploadError instanceof Error
          ? uploadError.message
          : "Upload belum berhasil. Periksa konfigurasi media lalu coba lagi.",
      );
    } finally {
      setLoading(false);
      if (inputRef.current) {
        inputRef.current.value = "";
      }
    }
  }

  return (
    <div>
      <div className="flex flex-col gap-3 sm:flex-row">
        <input
          type="url"
          value={value || ""}
          onChange={(event) => onChange(event.target.value)}
          className="h-11 flex-1 rounded-xl border border-slate-200 px-3.5 text-sm outline-none focus:border-brand-navy"
          placeholder="https://res.cloudinary.com/..."
        />
        <input
          ref={inputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp"
          className="hidden"
          onChange={(event) => {
            const file = event.target.files?.[0];
            if (file) void upload(file);
          }}
        />
        <button
          type="button"
          disabled={loading}
          onClick={() => inputRef.current?.click()}
          className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-slate-200 px-4 text-sm font-semibold text-slate-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <ImagePlus className="h-4 w-4" />
          )}
          {loading ? "Mengunggah..." : "Upload"}
        </button>
      </div>

      {value ? (
        <div className="mt-3 overflow-hidden rounded-xl border border-slate-100 bg-slate-50">
          <CmsImage src={value} alt="Preview media" className="h-28 w-full object-cover" />
          <button
            type="button"
            onClick={() => onChange("")}
            className="flex w-full items-center justify-center gap-2 border-t border-slate-100 px-3 py-2 text-xs font-semibold text-rose-600"
          >
            <Trash2 className="h-3.5 w-3.5" />
            Hapus gambar
          </button>
        </div>
      ) : null}

      {error ? <p className="mt-2 text-xs text-rose-600">{error}</p> : null}
    </div>
  );
}
