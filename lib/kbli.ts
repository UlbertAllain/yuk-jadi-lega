export type KbliApiItem = {
  code: string;
  title: string;
};

export type KbliApiResponse = {
  items: KbliApiItem[];
  page: number;
  limit: number;
  returned: number;
  hasNext: boolean;
  source: {
    dataset: "KBLI 2025";
    provider: "TenderX Open Data";
    officialReference: "Badan Pusat Statistik";
  };
};

type TenderXKbliItem = {
  kode?: unknown;
  judul?: unknown;
};

type TenderXKbliResponse = {
  status?: unknown;
  data?: unknown;
};

const TENDERX_KBLI_ENDPOINT = "https://tenderx.id/api/v1/kbli";

function normalizeItem(item: TenderXKbliItem): KbliApiItem | null {
  const code = String(item.kode ?? "").trim();
  const title = String(item.judul ?? "").trim();
  if (!/^\d{5}$/.test(code) || !title) return null;

  return {
    code,
    title,
  };
}

export async function searchKbli2025({
  query,
  page,
  limit,
}: {
  query: string;
  page: number;
  limit: number;
}): Promise<KbliApiResponse> {
  const url = new URL(TENDERX_KBLI_ENDPOINT);
  url.searchParams.set("q", query);
  url.searchParams.set("page", String(page));
  url.searchParams.set("limit", String(limit));

  const response = await fetch(url, {
    headers: {
      Accept: "application/json",
    },
    next: {
      revalidate: 21600,
    },
  });

  if (!response.ok) {
    throw new Error(`KBLI upstream merespons ${response.status}.`);
  }

  const payload = (await response.json()) as TenderXKbliResponse;
  if (payload.status !== "success" || !Array.isArray(payload.data)) {
    throw new Error("Format respons KBLI upstream tidak valid.");
  }

  const items = payload.data
    .map((item) => normalizeItem(item as TenderXKbliItem))
    .filter((item): item is KbliApiItem => Boolean(item));

  return {
    items,
    page,
    limit,
    returned: items.length,
    hasNext: items.length === limit,
    source: {
      dataset: "KBLI 2025",
      provider: "TenderX Open Data",
      officialReference: "Badan Pusat Statistik",
    },
  };
}
