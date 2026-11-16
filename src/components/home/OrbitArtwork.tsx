import { LogoMark } from '@/components/icons/BrandSymbols';

// Both arcs turn about the mark's centre, not their own boxes, so each half circle stays on its ring.
const aboutCentre = { transformBox: 'view-box', transformOrigin: '260px 260px' } as const;

/* After Gravity's hero: the still mark inside two half-circle arcs and nothing else. The outer arc
   is a row of short radial ticks on a solid baseline, like a lens scale, and turns slowly one way;
   the inner arc turns the other way, faster. Centre is (260,260). */
export function OrbitArtwork() {
  return (
    <div className="al-orbit al-motion" aria-hidden="true">
      <svg viewBox="0 0 520 520" fill="none">
        <g className="al-spin-rev" style={{ ...aboutCentre, animationDuration: '90s' }}>
          {/* A wide stroke with a short dash draws the ticks: each 8 long, one every 6 along the arc. */}
          <path
            d="M180.31 478.95A233 233 0 0 1 339.69 41.05"
            stroke="currentColor"
            strokeWidth="8"
            strokeDasharray="1.2 4.8"
          />
          {/* A solid baseline just inside the ticks, on the same span, so the scale reads as two layers. */}
          <path d="M182.7 472.37A226 226 0 0 1 337.3 47.63" stroke="currentColor" strokeWidth="1.5" />
        </g>
        <g className="al-spin" style={{ ...aboutCentre, animationDuration: '48s' }}>
          <path d="M84 260A176 176 0 0 1 436 260" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="436" cy="260" r="8" fill="var(--al-cyan)" stroke="currentColor" strokeWidth="2" />
        </g>
        <LogoMark size={150} y={185} className="al-art-ink" />
      </svg>
    </div>
  );
}
