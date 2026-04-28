import { SVGProps } from "react";

/**
 * AnduBer brand icon set.
 *
 * Shared vocabulary: nodes, intersecting lines, geometric balance. All icons
 * are 24×24, stroke-only, currentColor — so a parent's `text-token-gold` /
 * `text-token-teal` flows through. Round line caps and joins so the marks
 * feel hand-drawn rather than CAD-perfect.
 */

type IconProps = SVGProps<SVGSVGElement> & { size?: number };

function Base({
  size = 24,
  strokeWidth = 1.5,
  children,
  ...rest
}: IconProps & { children: React.ReactNode }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...rest}
    >
      {children}
    </svg>
  );
}

// ============================================================
// THREE ENGINES — Partners / Labs / Gathering
// ============================================================

/** Strategic engine — a hub-and-spoke advisory pattern. Centre node radiates
 *  to four partner nodes; suggests embedded consultancy. */
export function IconEnginePartners(props: IconProps) {
  return (
    <Base {...props}>
      <circle cx="12" cy="12" r="2.5" />
      <line x1="12" y1="9.5" x2="12" y2="3" />
      <line x1="9.5" y1="12" x2="3" y2="12" />
      <line x1="14.5" y1="12" x2="21" y2="12" />
      <line x1="12" y1="14.5" x2="12" y2="21" />
      <circle cx="12" cy="3" r="1.2" />
      <circle cx="3" cy="12" r="1.2" />
      <circle cx="21" cy="12" r="1.2" />
      <circle cx="12" cy="21" r="1.2" />
    </Base>
  );
}

/** Invention engine — a flask cradling three rising idea-nodes. Lab-built
 *  things, not bench-warmer research. */
export function IconEngineLabs(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M9 3h6" />
      <path d="M10 3v5l-5 9a2 2 0 0 0 1.8 3h10.4a2 2 0 0 0 1.8-3l-5-9V3" />
      <circle cx="9.5" cy="15.5" r="1" />
      <circle cx="13" cy="13.5" r="0.9" />
      <circle cx="14.5" cy="17" r="1.1" />
    </Base>
  );
}

/** Ecosystem engine — three orbiting bodies around a shared centre. The
 *  Gathering: community + capital + network in cyclical exchange. */
export function IconEngineGathering(props: IconProps) {
  return (
    <Base {...props}>
      <circle cx="12" cy="12" r="1.4" />
      <circle cx="12" cy="4.5" r="2" />
      <circle cx="5.5" cy="16.5" r="2" />
      <circle cx="18.5" cy="16.5" r="2" />
      <path d="M12 6.5v3" opacity="0.6" />
      <path d="M7.2 15.4 10 13.2" opacity="0.6" />
      <path d="M16.8 15.4 14 13.2" opacity="0.6" />
    </Base>
  );
}

// ============================================================
// THREE PILLARS — Collision / Imagination / Resilience
// ============================================================

/** Radical Collision — two diverging lines crossing at a heavier node, with
 *  sparkers at the four termini. The unusual suspects in the same room. */
export function IconPillarCollision(props: IconProps) {
  return (
    <Base {...props}>
      <line x1="4" y1="4" x2="20" y2="20" />
      <line x1="20" y1="4" x2="4" y2="20" />
      <circle cx="12" cy="12" r="2.6" />
      <circle cx="4" cy="4" r="1.1" />
      <circle cx="20" cy="4" r="1.1" />
      <circle cx="4" cy="20" r="1.1" />
      <circle cx="20" cy="20" r="1.1" />
    </Base>
  );
}

/** Applied Imagination — a small mind-map. Centre node with four branches,
 *  each ending in a leaf-node. Tools to map a problem and find leverage. */
export function IconPillarImagination(props: IconProps) {
  return (
    <Base {...props}>
      <circle cx="12" cy="12" r="2.2" />
      <path d="M12 9.8V6" />
      <path d="M12 14.2V18" />
      <path d="M9.8 12H6" />
      <path d="M14.2 12H18" />
      <circle cx="12" cy="4.5" r="1.4" />
      <circle cx="12" cy="19.5" r="1.4" />
      <circle cx="4.5" cy="12" r="1.4" />
      <circle cx="19.5" cy="12" r="1.4" />
      <path d="M9 9 7 7" opacity="0.6" />
      <path d="M15 15l2 2" opacity="0.6" />
    </Base>
  );
}

/** Systemic Resilience — three concentric arcs over a base node; layered
 *  defences, the "still working in three years" aesthetic. */
export function IconPillarResilience(props: IconProps) {
  return (
    <Base {...props}>
      <circle cx="12" cy="13" r="1.6" />
      <path d="M5 13a7 7 0 0 1 14 0" />
      <path d="M7.5 13a4.5 4.5 0 0 1 9 0" opacity="0.85" />
      <path d="M3 18.5h18" />
    </Base>
  );
}

// ============================================================
// PATHWAYS — Funders / Organisations / Innovators
// ============================================================

/** Funders & Philanthropists — coin face with radial rays. Capital that
 *  bends systems rather than bandages symptoms. */
export function IconPathwayFunders(props: IconProps) {
  return (
    <Base {...props}>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 4v2.5" />
      <path d="M12 17.5V20" />
      <path d="M4 12h2.5" />
      <path d="M17.5 12H20" />
      <path d="M5.6 5.6 7.4 7.4" />
      <path d="M16.6 16.6 18.4 18.4" />
      <path d="M5.6 18.4 7.4 16.6" />
      <path d="M16.6 7.4 18.4 5.6" />
    </Base>
  );
}

/** Organisations & Governments — institutional footprint with three
 *  horizontal levels and a connecting node at the door. */
export function IconPathwayOrgs(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M4 21h16" />
      <path d="M5 21V8l7-4 7 4v13" />
      <path d="M9 21v-4h6v4" />
      <line x1="8" y1="11" x2="16" y2="11" />
      <line x1="8" y1="14" x2="16" y2="14" />
      <circle cx="12" cy="19" r="0.9" />
    </Base>
  );
}

/** Innovators — a bulb-shaped node graph. A founder with the skeleton of
 *  an idea: a network the standard pipeline overlooks. */
export function IconPathwayInnovators(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M9 18h6" />
      <path d="M10 21h4" />
      <path d="M7 12.5a5 5 0 1 1 10 0c0 2-1 3-2 4H9c-1-1-2-2-2-4Z" />
      <circle cx="10" cy="11" r="1" />
      <circle cx="14" cy="11" r="1" />
      <circle cx="12" cy="14" r="1" />
      <line x1="10.7" y1="11.4" x2="13.3" y2="11.4" opacity="0.7" />
      <line x1="10.5" y1="11.7" x2="11.6" y2="13.3" opacity="0.7" />
      <line x1="13.5" y1="11.7" x2="12.4" y2="13.3" opacity="0.7" />
    </Base>
  );
}
