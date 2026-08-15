import type { ImgHTMLAttributes } from "react";

type CmsImageProps = ImgHTMLAttributes<HTMLImageElement>;

/**
 * Renders media URLs managed from the CMS.
 * URLs can come from Cloudinary or another configured HTTPS source, so this
 * intentionally avoids Next Image host allow-list coupling.
 */
export function CmsImage({ loading = "lazy", alt = "", ...props }: CmsImageProps) {
  // eslint-disable-next-line @next/next/no-img-element
  return <img loading={loading} alt={alt} {...props} />;
}
