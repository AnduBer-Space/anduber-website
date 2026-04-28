import { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface ExplainerProps extends HTMLAttributes<HTMLParagraphElement> {
  /** Visual size — defaults to medium. Use `lg` directly under hero/h1 headings. */
  size?: "sm" | "md" | "lg";
  /** When true, center within parent. */
  center?: boolean;
}

const SIZES = {
  sm: "text-base md:text-lg",
  md: "text-lg md:text-xl",
  lg: "text-xl md:text-2xl",
};

/**
 * A friendly, plain-language one-liner that lives directly underneath a
 * technical heading (Applied Intersectionality, The Silo Trap, etc.). Uses
 * the Fraunces accent serif in italic so readers visually parse it as the
 * "in plain words" voice rather than a footnote.
 */
export default function Explainer({
  size = "md",
  center = false,
  className,
  children,
  ...props
}: ExplainerProps) {
  return (
    <p
      className={cn(
        "font-accent italic leading-snug",
        "text-plum-700 dark:text-cream-300",
        "max-w-[60ch]",
        center && "mx-auto text-center",
        SIZES[size],
        className
      )}
      {...props}
    >
      {children}
    </p>
  );
}
