import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";

interface SectionProps extends HTMLAttributes<HTMLElement> {
  variant?: "dark" | "light" | "gradient";
  padding?: "sm" | "md" | "lg" | "xl";
}

export default function Section({
  className,
  variant = "light",
  padding = "lg",
  children,
  ...props
}: SectionProps) {
  const variants = {
    dark: "bg-plum-900 text-cream-50",
    light: "bg-cream-50 text-plum-900",
    gradient:
      "bg-gradient-to-b from-plum-900 via-plum-800 to-plum-900 text-cream-50",
  };

  const paddings = {
    sm: "py-8 md:py-12",
    md: "py-12 md:py-16",
    lg: "py-16 md:py-24",
    xl: "py-24 md:py-32",
  };

  return (
    <section
      className={cn(variants[variant], paddings[padding], className)}
      {...props}
    >
      {children}
    </section>
  );
}
