"use client";

/**
 * Subtle SVG-based noise overlay. Adds tactile depth to large dark surfaces
 * without imposing a paint-heavy bitmap. Pointer-events disabled.
 *
 * Use as a sibling element inside a relative-positioned dark section:
 *
 *   <section className="relative dark bg-plum-900">
 *     <GrainOverlay />
 *     ...
 *   </section>
 */
export default function GrainOverlay({
  opacity = 0.06,
  className = "",
}: {
  opacity?: number;
  className?: string;
}) {
  return (
    <svg
      aria-hidden="true"
      className={`absolute inset-0 w-full h-full pointer-events-none mix-blend-overlay ${className}`}
      style={{ opacity }}
    >
      <filter id="anduber-noise">
        <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" stitchTiles="stitch" />
        <feColorMatrix
          values="0 0 0 0 0
                  0 0 0 0 0
                  0 0 0 0 0
                  0 0 0 0.7 0"
        />
      </filter>
      <rect width="100%" height="100%" filter="url(#anduber-noise)" />
    </svg>
  );
}
