import { NextResponse } from "next/server";
import { searchKbli2025 } from "@/lib/kbli";

const DEFAULT_LIMIT = 20;
const MAX_LIMIT = 50;

function positiveInteger(value: string | null, fallback: number) {
  const parsed = Number.parseInt(value || "", 10);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = (searchParams.get("q") || "").trim().slice(0, 100);
  const page = Math.min(500, positiveInteger(searchParams.get("page"), 1));
  const requestedLimit = positiveInteger(searchParams.get("limit"), DEFAULT_LIMIT);
  const limit = Math.min(MAX_LIMIT, requestedLimit);

  try {
    const result = await searchKbli2025({ query, page, limit });

    return NextResponse.json(result, {
      headers: {
        "Cache-Control": "public, max-age=300, s-maxage=21600, stale-while-revalidate=86400",
      },
    });
  } catch (error) {
    console.error("[api/kbli] Gagal mengambil KBLI 2025:", error);

    return NextResponse.json(
      {
        error: "Sumber data KBLI sedang tidak tersedia. Silakan coba lagi beberapa saat.",
      },
      {
        status: 502,
        headers: {
          "Cache-Control": "no-store",
        },
      },
    );
  }
}
