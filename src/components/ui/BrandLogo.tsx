import Image from "next/image";
import { cn } from "@/lib/utils";

interface BrandLogoProps {
  className?: string;
  size?: number;
}

export function BrandLogo({ className, size = 28 }: BrandLogoProps) {
  return (
    <div 
      className={cn("relative flex items-center justify-center shrink-0", className)} 
      style={{ width: size, height: size }}
    >
      <Image
        src="/greencredit-logo.png"
        alt="Green Credit AI Logo"
        width={size * 2} // Double resolution for high-DPI displays
        height={size * 2}
        className="w-full h-full object-contain"
        priority
      />
    </div>
  );
}
