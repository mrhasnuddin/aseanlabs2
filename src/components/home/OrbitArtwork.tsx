import { LogoMark } from '@/components/icons/BrandSymbols';

/* Flat orbit system around the still mark: concentric rings turn at different speeds, packets
   travel in along the axis. Node coordinates are precomputed on the rings (centre 400,260). */
export function OrbitArtwork() {
  return (
    <div className="al-orbit al-motion" aria-hidden="true">
      <svg viewBox="0 0 800 520" fill="none">
        <path d="M24 260H164M636 260H776" stroke="currentColor" strokeOpacity=".5" />
        <path d="M400 2v16M400 502v16M24 252v16M776 252v16" stroke="currentColor" strokeOpacity=".5" />
        <path d="M24 260H164" pathLength={100} className="al-flow" stroke="currentColor" strokeWidth="5" />
        <path
          d="M776 260H636"
          pathLength={100}
          className="al-flow"
          stroke="currentColor"
          strokeWidth="5"
          style={{ animationDelay: '1.8s' }}
        />
        <g className="al-spin" style={{ animationDuration: '96s' }}>
          <circle cx="400" cy="260" r="240" stroke="currentColor" strokeOpacity=".45" strokeDasharray="1 7" />
          <circle cx="607.85" cy="380" r="4" fill="currentColor" />
          <circle cx="192.15" cy="380" r="4" fill="currentColor" />
          <circle cx="400" cy="20" r="4" fill="currentColor" />
        </g>
        <g className="al-spin-rev" style={{ animationDuration: '72s' }}>
          <circle cx="400" cy="260" r="196" stroke="currentColor" strokeOpacity=".22" />
          <path d="M332.97 75.82A196 196 0 0 1 584.18 192.96" stroke="currentColor" strokeWidth="2" />
          <circle cx="584.18" cy="192.96" r="9" fill="var(--al-cyan)" stroke="currentColor" strokeWidth="2" />
        </g>
        <g className="al-spin" style={{ animationDuration: '54s' }}>
          <circle cx="400" cy="260" r="150" stroke="currentColor" strokeOpacity=".35" strokeDasharray="64 10 2 10" />
          <circle cx="259.05" cy="208.7" r="6" fill="var(--al-paper)" stroke="currentColor" strokeWidth="2" />
          <path d="M469 389.9h12m-6-6v12M469 130.1h12m-6-6v12" stroke="currentColor" />
        </g>
        <circle cx="400" cy="260" r="112" stroke="currentColor" strokeOpacity=".16" />
        <LogoMark size={150} y={185} className="al-art-ink" />
        <text x="24" y="246" className="al-orbit-caption">
          IDEAS INTO ACTION
        </text>
        <text x="776" y="246" className="al-orbit-caption" textAnchor="end">
          BUILT ON ENI
        </text>
      </svg>
    </div>
  );
}
