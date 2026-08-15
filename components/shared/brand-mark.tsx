import Image from "next/image";
import { cn } from "@/lib/format";

export function BrandMark({
  className,
  frameClassName,
}: {
  className?: string;
  frameClassName?: string;
}) {
  return (
    <span
      className={cn(
        "relative block shrink-0 overflow-hidden rounded-[22%] bg-white shadow-[0_6px_18px_rgba(6,23,46,.08)] ring-1 ring-brand-navy/10",
        frameClassName,
      )}
      aria-hidden="true"
    >
      <Image
        src="/brand/yuk-jadi-legal-logo.png"
        alt=""
        fill
        sizes="72px"
        priority
        className={cn(
          "pointer-events-none select-none object-cover scale-[1.62]",
          className,
        )}
        style={{ objectPosition: "50% 41%" }}
      />
    </span>
  );
}
