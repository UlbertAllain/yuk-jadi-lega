type LeadNotificationInput = {
  id: string;
  name: string;
  whatsapp: string;
  email: string;
  serviceSlug: string;
  message: string;
};

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

export async function sendLeadNotification(input: LeadNotificationInput) {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  const from = process.env.LEAD_NOTIFICATION_FROM?.trim();
  const recipients = (process.env.LEAD_NOTIFICATION_TO || "")
    .split(",")
    .map((value) => value.trim())
    .filter(Boolean);

  if (!apiKey || !from || !recipients.length) {
    return { configured: false, sent: false } as const;
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || "";
  const adminUrl = siteUrl ? `${siteUrl}/admin/leads` : "";
  const serviceLabel = input.serviceSlug || "Konsultasi umum";

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
      "Idempotency-Key": `lead-${input.id}`,
    },
    body: JSON.stringify({
      from,
      to: recipients,
      subject: `Lead konsultasi baru — ${input.name}`,
      html: `
        <div style="font-family:Arial,sans-serif;line-height:1.6;color:#08233f">
          <h2 style="margin:0 0 18px">Lead konsultasi baru</h2>
          <p><strong>Nama:</strong> ${escapeHtml(input.name)}</p>
          <p><strong>WhatsApp:</strong> ${escapeHtml(input.whatsapp)}</p>
          <p><strong>Email:</strong> ${escapeHtml(input.email || "-")}</p>
          <p><strong>Layanan:</strong> ${escapeHtml(serviceLabel)}</p>
          <p><strong>Pesan:</strong></p>
          <div style="white-space:pre-wrap;padding:14px;background:#f6f8fa;border-left:3px solid #d4b031">${escapeHtml(input.message)}</div>
          ${adminUrl ? `<p style="margin-top:22px"><a href="${escapeHtml(adminUrl)}">Buka dashboard lead</a></p>` : ""}
        </div>
      `,
    }),
  });

  if (!response.ok) {
    const detail = await response.text();
    throw new Error(`Resend notification failed (${response.status}): ${detail}`);
  }

  return { configured: true, sent: true } as const;
}
