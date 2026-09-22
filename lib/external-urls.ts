export const BPS_KBLI_URL = "https://klasifikasi.web.bps.go.id/app/kbli";
export const RESEND_EMAILS_ENDPOINT = "https://api.resend.com/emails";
export const TENDERX_KBLI_ENDPOINT = "https://tenderx.id/api/v1/kbli";

export function cloudinaryImageUploadUrl(cloudName: string) {
  return `https://api.cloudinary.com/v1_1/${encodeURIComponent(cloudName)}/image/upload`;
}
