import { useId } from 'react';
import type { SymbolProps } from '@/components/icons/BrandSymbols';
import { Clover, Hourglass, Iris, Sparkle } from '@/components/icons/BrandSymbols';

type Kind = 'strategy' | 'creative' | 'development' | 'community' | 'expansion';

/* Shared drawing vocabulary, 60-30-10: yellow canvas, ink fills and 1px ink lines as the main contrast,
   cyan/paper only as small accents. Mono annotations, packets on paths. */
function Label({ x, y, children, anchor }: { x: number; y: number; children: string; anchor?: 'start' | 'middle' | 'end' }) {
  return (
    <text x={x} y={y} className="al-art-label" textAnchor={anchor}>
      {children}
    </text>
  );
}
function Flow({ d, delay = 0, duration }: { d: string; delay?: number; duration?: number }) {
  return (
    <path
      d={d}
      pathLength={100}
      className="al-flow"
      stroke="currentColor"
      strokeWidth={5}
      style={{ animationDelay: `${delay}s`, animationDuration: duration ? `${duration}s` : undefined }}
    />
  );
}
// Brand symbols sit on ink fills, so they take the yellow canvas colour.
const inverse = { className: 'al-art-inverse' } satisfies Partial<SymbolProps>;
// Server and browser Math.cos/sqrt can differ in the last digit; rounding keeps hydration identical.
const r2 = (n: number) => Math.round(n * 100) / 100;

function Strategy() {
  const trajectory = 'M70 206C150 200 214 158 290 74';
  return (
    <svg viewBox="0 0 400 250" fill="none">
      <path d="M40 128H360M200 22V234" stroke="currentColor" strokeOpacity=".35" />
      <circle cx="200" cy="128" r="56" stroke="currentColor" strokeOpacity=".25" strokeDasharray="2 6" />
      <circle cx="200" cy="128" r="104" stroke="currentColor" strokeOpacity=".25" strokeDasharray="2 6" />
      {[[104, 170], [134, 96], [156, 196], [238, 176], [262, 154], [120, 62], [316, 196], [170, 148]].map(([x, y]) => (
        <circle key={`${x}-${y}`} cx={x} cy={y} r="3" fill="currentColor" />
      ))}
      <path d={trajectory} stroke="currentColor" strokeWidth="1.5" />
      <Flow d={trajectory} />
      <circle cx="70" cy="206" r="5" fill="currentColor" />
      <circle cx="290" cy="74" r="34" stroke="currentColor" strokeDasharray="10 6" className="al-spin" />
      <circle cx="290" cy="74" r="22" fill="currentColor" />
      <circle cx="290" cy="74" r="13" stroke="var(--al-yellow)" />
      <circle cx="290" cy="74" r="5" fill="var(--al-cyan)" />
      <path d="M290 26v12M290 110v12M242 74h12M326 74h12" stroke="currentColor" />
      <rect x="36" y="22" width="50" height="50" fill="currentColor" />
      <Hourglass size={34} x={44} y={30} {...inverse} />
      <Label x={208} y={34}>REACH</Label>
      <Label x={360} y={120} anchor="end">FIT</Label>
      <Label x={326} y={44}>POSITION</Label>
      <Label x={58} y={232}>LAUNCH</Label>
    </svg>
  );
}

function Creative() {
  return (
    <svg viewBox="0 0 400 250" fill="none">
      <path d="M110 76H290M110 144H290M166 20V200M234 20V200" stroke="currentColor" strokeOpacity=".3" strokeDasharray="3 5" />
      <rect x="130" y="40" width="140" height="140" fill="currentColor" />
      {/* The construction grid carries on inside the ink tile in yellow. */}
      <g stroke="var(--al-yellow)">
        <path d="M130 76H270M130 144H270M166 40V180M234 40V180" strokeOpacity=".3" strokeDasharray="3 5" />
        <path d="M130 40 270 180M270 40 130 180" strokeOpacity=".2" />
        <circle cx="200" cy="110" r="70" strokeOpacity=".6" strokeDasharray="1 5" className="al-spin" />
        <circle cx="200" cy="110" r="48" strokeOpacity=".3" />
      </g>
      <Sparkle size={84} x={158} y={68} {...inverse} />
      {[[130, 40], [270, 40], [130, 180], [270, 180]].map(([x, y]) => (
        <rect key={`${x}-${y}`} x={x - 3.5} y={y - 3.5} width="7" height="7" fill="var(--al-yellow)" stroke="currentColor" />
      ))}
      {['var(--al-yellow)', 'var(--al-ink)', 'var(--al-cyan)', 'var(--al-paper)'].map((fill, i) => (
        <rect
          key={fill}
          x="316"
          y={52 + i * 34}
          width="26"
          height="26"
          fill={fill}
          stroke="currentColor"
          className={i === 2 ? 'al-float' : undefined}
        />
      ))}
      <text x="40" y="98" className="al-art-display">Aa</text>
      <path d="M40 106H98" stroke="currentColor" strokeOpacity=".4" />
      <Label x={40} y={126}>SPACE</Label>
      <Label x={40} y={140}>GROTESK</Label>
      <Label x={130} y={226}>IDENTITY SYSTEM</Label>
    </svg>
  );
}

function Development() {
  const pipeline = 'M172 110H196V74H325V150';
  return (
    <svg viewBox="0 0 400 250" fill="none">
      <rect x="28" y="48" width="144" height="124" fill="currentColor" />
      <path d="M28 70H172" stroke="var(--al-yellow)" strokeOpacity=".35" />
      {[40, 50, 60].map((x) => (
        <circle key={x} cx={x} cy="59" r="3" fill="var(--al-yellow)" />
      ))}
      <path
        d="M44 90h44M56 104h70M56 118h50M44 132h28M56 146h60"
        stroke="var(--al-yellow)"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <rect x="124" y="140" width="7" height="12" fill="var(--al-cyan)" />
      <path d={pipeline} stroke="currentColor" />
      <Flow d={pipeline} duration={3} />
      <rect x="216" y="56" width="80" height="36" fill="var(--al-yellow)" stroke="currentColor" />
      <Label x={256} y={78} anchor="middle">TESTNET</Label>
      <rect x="280" y="150" width="90" height="36" fill="var(--al-ink)" stroke="currentColor" />
      <text x="325" y="172" className="al-art-label al-art-label-inverse" textAnchor="middle">
        MAINNET
      </text>
      <circle cx="370" cy="150" r="11" stroke="currentColor" className="al-pulse" />
      <circle cx="370" cy="150" r="11" fill="var(--al-cyan)" stroke="currentColor" />
      <path d="m364.5 150 4 4 7-8" stroke="currentColor" strokeWidth="1.5" />
      <Label x={28} y={196}>{'</> BUILD'}</Label>
      <Label x={280} y={212}>DEPLOY</Label>
    </svg>
  );
}

function Community() {
  const sources = [
    { label: 'QUESTS', x: 40, y: 40, w: 96, d: 'M136 54Q220 54 262 96' },
    { label: 'EVENTS', x: 464, y: 40, w: 96, d: 'M464 54Q380 54 338 96' },
    { label: 'REFERRALS', x: 30, y: 184, w: 120, d: 'M150 198Q220 198 262 154' },
    { label: 'REWARDS', x: 456, y: 184, w: 110, d: 'M456 198Q380 198 338 154' },
  ];
  const members = Array.from({ length: 6 }, (_, i) => {
    const angle = (Math.PI / 3) * i;
    return [r2(300 + 78 * Math.cos(angle)), r2(125 + 78 * Math.sin(angle))];
  });
  return (
    <svg viewBox="0 0 600 250" fill="none">
      {sources.map((s, i) => (
        <g key={s.label}>
          <path d={s.d} stroke="currentColor" strokeOpacity=".45" />
          <Flow d={s.d} delay={i * 0.9} />
          <rect x={s.x} y={s.y} width={s.w} height="28" fill="var(--al-yellow)" stroke="currentColor" />
          <Label x={s.x + s.w / 2} y={s.y + 18} anchor="middle">{s.label}</Label>
        </g>
      ))}
      <circle cx="300" cy="125" r="78" stroke="currentColor" strokeOpacity=".4" strokeDasharray="2 6" />
      <g className="al-spin">
        {members.map(([x, y], i) => (
          <g key={i}>
            <path d={`M300 125L${x} ${y}`} stroke="currentColor" strokeOpacity=".25" />
            <circle cx={x} cy={y} r="8" fill={i === 0 ? 'var(--al-cyan)' : 'currentColor'} stroke="currentColor" />
          </g>
        ))}
      </g>
      <circle cx="300" cy="125" r="40" fill="currentColor" />
      <Clover size={50} x={275} y={100} {...inverse} />
    </svg>
  );
}

// Cities from real longitude/latitude, KUL as hub. Longitude uses a square-root scale so the dense
// Southeast Asian cluster spreads out while east-west order is kept. [code, lon, lat, label dx, dy, anchor]
const CITIES: [string, number, number, number, number, 'start' | 'end'][] = [
  ['KUL', 101.69, 3.14, -13, 4, 'end'],
  ['SIN', 103.82, 1.35, 10, 15, 'start'],
  ['BKK', 100.5, 13.75, -10, 4, 'end'],
  ['SGN', 106.63, 10.82, 10, 4, 'start'],
  ['CGK', 106.85, -6.2, 10, 4, 'start'],
  ['MNL', 120.98, 14.6, 10, 4, 'start'],
  ['HKG', 114.17, 22.3, 10, 4, 'start'],
  ['SEL', 126.98, 37.57, 10, 4, 'start'],
  ['TYO', 139.69, 35.68, -10, -9, 'end'],
];
const project = (lon: number, lat: number) => [r2(40 + Math.sqrt(lon - 99.5) * 80), r2(18 + (40 - lat) * 4.6)];

function Expansion() {
  const dots = useId();
  const [hx, hy] = project(CITIES[0][1], CITIES[0][2]);
  return (
    <svg viewBox="0 0 600 250" fill="none">
      <defs>
        <pattern id={dots} width="16" height="16" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="1" fill="currentColor" fillOpacity=".28" />
        </pattern>
      </defs>
      <rect width="600" height="250" fill={`url(#${dots})`} />
      {CITIES.slice(1).map(([code, lon, lat, dx, dy, anchor], i) => {
        const [x, y] = project(lon, lat);
        const lift = r2(Math.min(Math.hypot(x - hx, y - hy) * 0.25, 44));
        const d = `M${hx} ${hy}Q${(hx + x) / 2} ${Math.max(Math.min(hy, y) - lift, 4)} ${x} ${y}`;
        return (
          <g key={code}>
            <path d={d} stroke="currentColor" strokeOpacity=".5" />
            <Flow d={d} delay={i * 0.45} duration={4.2} />
            <circle cx={x} cy={y} r="5" fill="currentColor" />
            <Label x={x + dx} y={y + dy} anchor={anchor === 'end' ? 'end' : undefined}>{code}</Label>
          </g>
        );
      })}
      <circle cx={hx} cy={hy} r="8" stroke="currentColor" className="al-pulse" />
      <circle cx={hx} cy={hy} r="8" fill="var(--al-cyan)" stroke="currentColor" />
      <Label x={hx + CITIES[0][3]} y={hy + CITIES[0][4]} anchor="end">KUL</Label>
    </svg>
  );
}

const ART: Record<Kind, () => JSX.Element> = {
  strategy: Strategy,
  creative: Creative,
  development: Development,
  community: Community,
  expansion: Expansion,
};

export function CapabilityArtwork({ kind }: { kind: Kind }) {
  const Art = ART[kind];
  return (
    <div className={`al-cap-art al-cap-art-${kind} al-motion`} aria-hidden="true">
      <Art />
    </div>
  );
}

/* EVM at the centre; chains, wallets, tooling and Hevium (official DEX partner) feed into it.
   Nodes sit on the r=164 ring around (300,210). */
export const HEVIUM_MARK_PATH =
  'M 24 -52.5 C 13.93 -36.78, -6.86 -25.5, -9 -6.5 C -7.36 -1.09, 3.27 -0.77, 9 -3.5 C 34.23 -15.52, 54.85 -34.92, 77 -52.5 C 66.44 -36.98, 45.8 -25.2, 44 -10.5 C 43.2 -4.8, 48.2 -2.9, 53.5 -2.1 C 61.5 -0.9, 69.2 -0.35, 77 0 C 59.09 1.69, 40.82 1.17, 26 9.5 C 7.63 19.83, -7.73 37.21, -24 52.5 C -13.93 36.78, 6.86 25.5, 9 6.5 C 7.36 1.09, -3.27 0.77, -9 3.5 C -34.23 15.52, -54.85 34.92, -77 52.5 C -66.44 36.98, -45.8 25.2, -44 10.5 C -43.2 4.8, -48.2 2.9, -53.5 2.1 C -61.5 0.9, -69.2 0.35, -77 0 C -59.09 -1.69, -40.82 -1.17, -26 -9.5 C -7.63 -19.83, 7.73 -37.21, 24 -52.5 Z';

export function HeviumMark({ className }: { className?: string }) {
  return (
    <svg viewBox="-84 -60 168 120" fill="none" className={className} aria-hidden="true">
      <path d={HEVIUM_MARK_PATH} fill="currentColor" />
    </svg>
  );
}

const RADAR_AXIS_TICKS = [
  'M300 34v8',
  'M300 378v8',
  'M124 210h8',
  'M468 210h8',
];

const RADAR_NODES: {
  label: string;
  x: number;
  y: number;
  bearing: string;
  lx: number;
  ly: number;
  anchor: 'start' | 'end';
}[] = [
  // Inner orbit (r=104) — core protocol layer
  {
    label: 'CHAINS',
    x: 240.35,
    y: 124.81,
    bearing: 'M272.47 170.68L244.36 130.54',
    lx: 222,
    ly: 129,
    anchor: 'end',
  },
  {
    label: 'TOOLING',
    x: 359.65,
    y: 295.19,
    bearing: 'M327.53 249.32L355.64 289.46',
    lx: 378,
    ly: 299,
    anchor: 'start',
  },
  // Outer orbit (r=172) — user access
  {
    label: 'WALLETS',
    x: 154.14,
    y: 301.14,
    bearing: 'M259.29 235.44L160.07 297.44',
    lx: 134,
    ly: 305,
    anchor: 'end',
  },
];

/* Flat 2D technical radar centred on EVM: pulses radiate outward across two concentric orbits
   with two inner nodes (CHAINS, TOOLING) and two outer nodes (WALLETS, DEX · HEVIUM). */
export function NetworkArtwork() {
  return (
    <svg viewBox="0 0 600 420" fill="none" className="al-motion">
      {/* Scope crosshair & cardinal range ticks */}
      <path d="M300 28V392M118 210H482" stroke="currentColor" strokeOpacity=".14" />
      {RADAR_AXIS_TICKS.map((d) => (
        <path key={d} d={d} stroke="currentColor" strokeOpacity=".45" />
      ))}

      {/* Two concentric orbits */}
      <circle cx="300" cy="210" r="104" stroke="currentColor" strokeOpacity=".35" />
      <circle cx="300" cy="210" r="172" stroke="currentColor" strokeOpacity=".48" strokeDasharray="2 6" />

      {/* Outward radar pulses radiating from EVM core (r=48) to outer orbit (r=172) */}
      {[0, 1.4, 2.8].map((delay) => (
        <circle
          key={delay}
          cx="300"
          cy="210"
          r="48"
          stroke="currentColor"
          strokeWidth="1.5"
          vectorEffect="non-scaling-stroke"
          className="al-radar-pulse"
          style={{ animationDelay: `${delay}s` }}
        />
      ))}

      {/* Inner & outer standard nodes */}
      {RADAR_NODES.map(({ label, x, y, bearing, lx, ly, anchor }) => (
        <g key={label}>
          <path d={bearing} stroke="currentColor" strokeOpacity=".3" />
          <circle cx={x} cy={y} r="12" stroke="currentColor" strokeOpacity=".35" />
          <circle cx={x} cy={y} r="7" fill="currentColor" />
          <Label x={lx} y={ly} anchor={anchor}>{label}</Label>
        </g>
      ))}

      {/* Outer orbit (r=172) featured DEX partner node: DEX · HEVIUM */}
      <g>
        <path d="M340.71 184.56L429.75 128.92" stroke="currentColor" strokeOpacity=".38" />
        <circle cx="445.86" cy="118.86" r="25" stroke="currentColor" strokeDasharray="3 3" strokeOpacity=".5" />
        <circle cx="445.86" cy="118.86" r="19" fill="currentColor" />
        <g transform="translate(445.86 118.86) scale(0.165)">
          <path d={HEVIUM_MARK_PATH} fill="var(--al-yellow)" />
        </g>
        <circle cx="460.5" cy="104.5" r="5" fill="var(--al-cyan)" stroke="currentColor" strokeWidth="1.5" />
        <Label x={475} y={123}>{`DEX · HEVIUM`}</Label>
      </g>

      {/* Central EVM radar core */}
      <circle cx="300" cy="210" r="48" fill="currentColor" />
      <text x="300" y="219" textAnchor="middle" className="al-network-mark">
        EVM
      </text>
    </svg>
  );
}

/* Compact orbit for secondary-page intros: a still symbol on an ink disc inside slowly turning rings. */
export function PageMotif({
  symbol: Symbol,
  nodes,
}: {
  symbol: (props: SymbolProps) => JSX.Element;
  nodes: number;
}) {
  return (
    <div className="al-page-motif al-motion" aria-hidden="true">
      <svg viewBox="0 0 240 240" fill="none">
        <path d="M120 2v14M120 224v14M2 120h14M224 120h14" stroke="currentColor" strokeOpacity=".5" />
        <g className="al-spin">
          <circle cx="120" cy="120" r="104" stroke="currentColor" strokeOpacity=".45" strokeDasharray="1 7" />
          <path d="M16 120A104 104 0 0 1 120 16" stroke="currentColor" strokeWidth="2" />
          {Array.from({ length: nodes }, (_, i) => {
            const angle = (2 * Math.PI * i) / nodes;
            return <circle key={i} cx={r2(120 + 104 * Math.cos(angle))} cy={r2(120 + 104 * Math.sin(angle))} r="3.5" fill="currentColor" />;
          })}
        </g>
        <g className="al-spin-rev">
          <circle cx="120" cy="120" r="76" stroke="currentColor" strokeOpacity=".25" />
          <circle cx="196" cy="120" r="7" fill="var(--al-cyan)" stroke="currentColor" />
        </g>
        <circle cx="120" cy="120" r="56" fill="currentColor" />
        <Symbol size={68} x={86} y={86} {...inverse} />
      </svg>
    </div>
  );
}

// DAOaaS round mark traced from public/partners/DAOaaS C 3.png into a 100-unit box; the triangle is a cut-out.
// Seven region nodes on the outer ring, starting at the top.
const WHY_NODES = Array.from({ length: 7 }, (_, i) => {
  const angle = (2 * Math.PI * i) / 7 - Math.PI / 2;
  return [r2(120 + 104 * Math.cos(angle)), r2(120 + 104 * Math.sin(angle))];
});

/* /why-us: the Iris sends slow ripples out to seven region nodes, a signal spreading across the region. */
export function WhyMotif() {
  return (
    <div className="al-page-motif al-motion" aria-hidden="true">
      <svg viewBox="0 0 240 240" fill="none">
        <circle cx="120" cy="120" r="104" stroke="currentColor" strokeOpacity=".25" />
        {[0, 1.2, 2.4].map((delay) => (
          <circle key={delay} cx="120" cy="120" r="56" stroke="currentColor" className="al-ripple" style={{ animationDelay: `${delay}s` }} />
        ))}
        {WHY_NODES.map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r={i === 0 ? 6 : 4} fill={i === 0 ? 'var(--al-cyan)' : 'currentColor'} stroke="currentColor" strokeWidth={i === 0 ? 2 : 0} />
        ))}
        <circle cx="120" cy="120" r="56" fill="currentColor" />
        <Iris size={68} x={86} y={86} {...inverse} />
      </svg>
    </div>
  );
}

/* /process: a progress ring fills around the hourglass, then the hourglass turns over (qualify, then build).
   The hourglass looks the same rotated 180 degrees, so each turn lands seamlessly. */
export function ProcessMotif() {
  return (
    <div className="al-page-motif al-motion" aria-hidden="true">
      <svg viewBox="0 0 240 240" fill="none">
        <path d="M120 2v14M120 224v14M2 120h14M224 120h14" stroke="currentColor" strokeOpacity=".5" />
        <circle cx="120" cy="120" r="84" stroke="currentColor" strokeOpacity=".2" />
        <circle cx="120" cy="120" r="84" stroke="currentColor" strokeWidth="3" pathLength={100} className="al-motif-draw" transform="rotate(-90 120 120)" />
        <circle cx="120" cy="36" r="6" fill="var(--al-cyan)" stroke="currentColor" strokeWidth="2" />
        <circle cx="120" cy="120" r="56" fill="currentColor" />
        <g className="al-motif-flip">
          <Hourglass size={68} x={86} y={86} {...inverse} />
        </g>
      </svg>
    </div>
  );
}

/* /events: an event pass hanging from a pin and swaying like a lanyard badge. The pin stays put;
   the straps and the pass swing about it. */
export function EventsMotif() {
  return (
    <div className="al-page-motif al-motion" aria-hidden="true">
      <svg viewBox="0 0 240 240" fill="none">
        <g className="al-motif-sway">
          <path d="M120 12L98 66M120 12L142 66" stroke="currentColor" strokeWidth="2" />
          <rect x="56" y="66" width="128" height="164" fill="currentColor" />
          <Clover size={72} x={84} y={96} {...inverse} />
          <path d="M82 194h76M82 208h46" stroke="var(--al-yellow)" strokeWidth="3" />
        </g>
        <circle cx="120" cy="12" r="7" fill="var(--al-cyan)" stroke="currentColor" strokeWidth="2" />
      </svg>
    </div>
  );
}

/* /brand: a design-tool moment. The selection box around the Sparkle scales out and back as if
   resized, then the Sparkle snaps a quarter turn; its four arms make each turn land seamlessly. */
export function BrandMotif() {
  const handles = [[56, 56], [184, 56], [56, 184], [184, 184]];
  return (
    <div className="al-page-motif al-motion" aria-hidden="true">
      <svg viewBox="0 0 240 240" fill="none">
        <path d="M0 120H240M120 0V240" stroke="currentColor" strokeOpacity=".3" strokeDasharray="3 5" />
        <circle cx="120" cy="120" r="104" stroke="currentColor" strokeOpacity=".22" />
        <g className="al-motif-select">
          <rect x="56" y="56" width="128" height="128" stroke="currentColor" strokeDasharray="4 4" />
          {handles.map(([x, y], i) => (
            <rect key={i} x={x - 5} y={y - 5} width="10" height="10" fill={i === 1 ? 'var(--al-cyan)' : 'var(--al-yellow)'} stroke="currentColor" strokeWidth="1.5" />
          ))}
        </g>
        <circle cx="120" cy="120" r="48" fill="currentColor" />
        <g className="al-motif-turn">
          <Sparkle size={56} x={92} y={92} {...inverse} />
        </g>
      </svg>
    </div>
  );
}

