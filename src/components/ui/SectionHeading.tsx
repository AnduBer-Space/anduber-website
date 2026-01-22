import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  description?: string;
  align?: "left" | "center" | "right";
  className?: string;
  light?: boolean;
}

export default function SectionHeading({
  title,
  subtitle,
  description,
  align = "center",
  className,
  light = false,
}: SectionHeadingProps) {
  const alignClasses = {
    left: "text-left",
    center: "text-center mx-auto",
    right: "text-right ml-auto",
  };

  return (
    <div className={cn("max-w-3xl mb-12", alignClasses[align], className)}>
      {subtitle && (
        <span
          className={cn(
            "inline-block text-sm font-medium uppercase tracking-wider mb-3",
            light ? "text-teal-400" : "text-teal-500"
          )}
        >
          {subtitle}
        </span>
      )}
      <h2
        className={cn(
          "font-serif text-3xl md:text-4xl lg:text-5xl font-bold mb-4",
          light ? "text-cream-50" : "text-plum-900 dark:text-cream-50"
        )}
      >
        {title}
      </h2>
      {align === "center" && (
        <div className="divider-gold mt-6 mb-6" />
      )}
      {description && (
        <p
          className={cn(
            "text-lg",
            light ? "text-plum-200" : "text-plum-600 dark:text-plum-200"
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}
