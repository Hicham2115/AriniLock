import { cn } from "@/lib/utils";

interface MarqueeProps {
  text: string;
  className?: string;
  trackClassName?: string;
  fast?: boolean;
}

export function Marquee({ text, className, trackClassName, fast }: MarqueeProps) {
  return (
    <div className={cn("overflow-hidden", className)}>
      <div
        className={cn(
          "flex w-max",
          fast ? "animate-marquee-fast" : "animate-marquee",
          trackClassName,
        )}
      >
        <span className="whitespace-nowrap px-6">{text}</span>
        <span aria-hidden="true" className="whitespace-nowrap px-6">
          {text}
        </span>
      </div>
    </div>
  );
}
