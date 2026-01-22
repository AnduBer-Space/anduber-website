"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  showText?: boolean;
  size?: "sm" | "md" | "lg" | "xl";
}

export default function Logo({ className, showText = true, size = "md" }: LogoProps) {
  const sizes = {
    sm: { icon: 32, text: "text-lg" },
    md: { icon: 40, text: "text-xl" },
    lg: { icon: 56, text: "text-2xl" },
    xl: { icon: 80, text: "text-3xl" },
  };

  const { icon, text } = sizes[size];

  return (
    <div className={cn("flex items-center gap-3", className)}>
      <div className="relative flex-shrink-0" style={{ width: icon, height: icon }}>
        <Image
          src="/images/logo.png.png"
          alt="AnduBer Logo"
          width={icon}
          height={icon}
          className="object-contain"
          priority
        />
      </div>

      {showText && (
        <span className={cn("font-serif font-bold tracking-wide", text)}>
          <span className="text-gold-400">Andu</span>
          <span className="text-teal-500">Ber</span>
        </span>
      )}
    </div>
  );
}
