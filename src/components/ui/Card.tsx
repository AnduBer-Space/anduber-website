"use client";

import { cn } from "@/lib/utils";
import { motion, HTMLMotionProps } from "framer-motion";

interface CardProps extends Omit<HTMLMotionProps<"div">, "whileHover" | "transition"> {
  hover?: boolean;
  glow?: boolean;
  variant?: "default" | "dark" | "glass";
}

export default function Card({
  className,
  hover = true,
  glow = false,
  variant = "default",
  children,
  ...props
}: CardProps) {
  const variants = {
    default: "bg-white dark:bg-plum-800",
    dark: "bg-plum-800",
    glass: "bg-white/10 backdrop-blur-md border border-white/20",
  };

  return (
    <motion.div
      className={cn(
        "rounded-2xl shadow-lg transition-all duration-300 overflow-hidden",
        variants[variant],
        hover && "hover:shadow-xl",
        glow && "hover:shadow-glow-gold",
        className
      )}
      whileHover={hover ? { y: -8, boxShadow: "0 20px 40px rgba(0,0,0,0.3)" } : undefined}
      transition={{ duration: 0.3 }}
      {...props}
    >
      {children}
    </motion.div>
  );
}
