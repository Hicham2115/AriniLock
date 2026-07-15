import Image from "next/image";
import { cn } from "@/lib/utils";
import logoIcon from "@/app/assets/WhatsApp_Image_2026-06-16_at_19.08.12-removebg-preview.png";

interface LogoMarkProps {
  className?: string;
  inverted?: boolean;
}

export function LogoMark({ className, inverted }: LogoMarkProps) {
  return (
    <div className={cn("flex select-none items-center gap-3", className)}>
      <Image
        src={logoIcon}
        alt="ARINILOCK icon"
        className={cn(
          "h-24 w-auto shrink-0 object-contain",
          inverted && "brightness-0 invert",
        )}
        priority
      />
      {/* <span className={cn("font-display2 text-[1.35rem] font-bold tracking-[0.18em]", inverted ? "text-white" : "text-[#162847]")}>
        ARINILOCK
      </span> */}
    </div>
  );
}
