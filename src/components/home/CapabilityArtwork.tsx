import { useId } from 'react';
import type { SymbolProps } from '@/components/icons/BrandSymbols';
import { Burst, Chevrons, Clover, Hourglass, Iris, Sparkle } from '@/components/icons/BrandSymbols';

type Kind = 'strategy' | 'creative' | 'development' | 'community' | 'expansion';

/* Shared drawing vocabulary, 60-30-10: yellow canvas, ink fills and 1px ink lines as the main contrast,
   cyan/paper only as small accents. Mono annotations, packets on paths. */
function Label({ x, y, children, anchor }: { x: number; y: number; children: string; anchor?: 'middle' | 'end' }) {
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

/* ENI's own logo, from public/partners/mono/eni.svg (viewBox 312.29 x 96.28), drawn in currentColor. */
function EniLogo(props: React.SVGProps<SVGGElement>) {
  return (
    <g fill="currentColor" {...props}>
      <path d="M125.66,16.71c-5.69,5.25-8.53,13.91-8.53,25.96v11.13c0,12.05,2.84,20.71,8.53,25.96,5.69,4.94,15.55,7.42,29.58,7.42h35.07v-11.13h0s-35.16,0-35.16,0c-9.43-.01-15.85-1.55-19.25-4.63-3.66-2.97-5.54-8.54-5.68-16.69h55.3v-12.98h-55.3c.13-8.15,2.02-13.72,5.68-16.69,3.4-3.08,9.82-4.62,19.25-4.63h35.16V9.29h-35.07c-14.03,0-23.89,2.48-29.58,7.42Z" />
      <polygon points="270.19 68.63 220 9.29 204.95 9.29 204.95 87.17 218.33 87.17 218.33 24.59 270.19 87.17 283.01 87.17 283.01 9.29 270.19 9.29 270.19 68.63" />
      <rect x="297.65" y="9.29" width="14.64" height="77.88" />
      <path d="M0,62.47v30.31c0,2.24,2.07,3.9,4.26,3.42l68.36-15.16c3.66-.81,3.66-6.02,0-6.83L4.26,59.05c-2.19-.48-4.26,1.18-4.26,3.42Z" />
      <path d="M72.58,15.23L4.26,.08C2.07-.4,0,1.26,0,3.5v30.31c0,2.24,2.07,3.9,4.26,3.42l68.33-15.16c3.66-.81,3.66-6.02,0-6.83Z" />
      <path d="M83.76,29.57L15.42,44.72c-3.66,.81-3.66,6.02,0,6.83l68.35,15.15c2.19,.48,4.26-1.18,4.26-3.42v-30.3c0-2.24-2.08-3.9-4.27-3.42Z" />
    </g>
  );
}

/* ENI at the centre (the logo stays still); EVM, AppChains and builders feed into it. Nodes sit on
   the r=170 ring around (300,210) at -90, 150 and 30 degrees. */
const ENI_FEEDS = [
  { label: 'EVM', x: 300, y: 40, d: 'M300 49V168', lx: 300, ly: 24, accent: true },
  { label: 'APPCHAINS', x: 152.78, y: 295, d: 'M160.6 290.5L222 252', lx: 152.78, ly: 326 },
  { label: 'BUILDERS', x: 447.22, y: 295, d: 'M439.4 290.5L378 252', lx: 447.22, ly: 326 },
];
export function NetworkArtwork() {
  return (
    <svg viewBox="0 0 600 420" fill="none" className="al-motion">
      <circle cx="300" cy="210" r="170" stroke="currentColor" strokeOpacity=".45" strokeDasharray="1 7" className="al-spin" />
      <circle cx="300" cy="210" r="122" stroke="currentColor" strokeOpacity=".18" />
      {ENI_FEEDS.map(({ label, x, y, d, lx, ly, accent }, i) => (
        <g key={label}>
          <path d={d} stroke="currentColor" />
          <Flow d={d} delay={i * 0.9} duration={2.6} />
          <circle cx={x} cy={y} r="9" fill={accent ? 'var(--al-cyan)' : 'currentColor'} stroke="currentColor" strokeWidth="2" />
          <Label x={lx} y={ly} anchor="middle">{label}</Label>
        </g>
      ))}
      <rect x="186" y="168" width="228" height="84" fill="currentColor" />
      <EniLogo transform="translate(220 185.35) scale(0.5124)" className="al-art-inverse" />
    </svg>
  );
}

export function GrowthArtwork() {
  const people = [[-20, -18], [16, -22], [-26, 14], [8, 10], [30, 6]];
  return (
    <div className="al-cap-art al-growth-art al-motion" aria-hidden="true">
      <svg viewBox="0 0 600 250" fill="none">
        <circle cx="100" cy="115" r="70" stroke="currentColor" strokeOpacity=".4" strokeDasharray="2 6" className="al-spin" />
        <circle cx="100" cy="115" r="54" fill="currentColor" />
        {people.map(([dx, dy], i) => (
          <circle key={i} cx={100 + dx} cy={115 + dy} r="8" fill="var(--al-yellow)" />
        ))}
        <circle cx="300" cy="115" r="70" stroke="currentColor" strokeOpacity=".4" strokeDasharray="10 6" className="al-spin-rev" />
        <path d="M300 63 352 115 300 167 248 115Z" fill="currentColor" />
        <path d="m282 115 12 12 24-26" stroke="var(--al-cyan)" strokeWidth="2.5" />
        <circle cx="500" cy="115" r="54" fill="currentColor" />
        <g className="al-spin">
          <Burst size={62} x={469} y={84} {...inverse} />
        </g>
        {['M160 115H238', 'M362 115H440'].map((d, i) => (
          <g key={d}>
            <path d={d} stroke="currentColor" />
            <path d={`M${i ? 432 : 230} 109l8 6-8 6`} stroke="currentColor" />
            <Flow d={d} delay={i * 1.6} duration={3.2} />
          </g>
        ))}
      </svg>
    </div>
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
const DAOAAS_MARK = 'M46.1 0.1L40.3 0.9L35.3 2.2L31.1 3.7L26 6.1L18.3 11.3L12.4 17.0L7 24.5L4.8 28.6L2.9 33.3L1.6 37.4L0.4 43.6L0 48.4L0.1 53.5L0.8 59.0L2 64.1L3.6 68.6L6.4 74.5L9.1 78.8L12.7 83.3L19.2 89.4L25.7 93.7L29.7 95.7L36 98.0L44.5 99.7L48.9 100.0L55.7 99.7L64.9 97.7L73.6 94.1L80.3 89.8L84.6 86.1L88.1 82.4L90.9 78.8L93.9 73.9L97.6 65.3L99.6 56.5L100 52.0L99.9 46.3L98.4 37.3L94.8 27.7L92 22.7L88.8 18.4L82.8 12.2L79.7 9.7L74.7 6.5L70.8 4.5L65.7 2.5L57.3 0.5L53.7 0.1ZM22.6 76.2L42.6 41.3L47.7 49.5L48.1 51.1L38.2 68.3L83.8 68.5L68.1 76.4ZM43.9 17.5L64 51.9L53.3 52.1L52.3 51.1L51.9 49.9L49.6 46.4L49.2 45.1L45.2 38.8L43.2 34.8L42.6 34.7L40.5 37.9L40.1 39.2L39.3 39.9L38.9 41.2L37.7 42.7L37.3 44.0L36.1 45.5L35.7 46.8L34.6 48.3L34.2 49.6L33.4 50.2L33 51.5L31.8 53.0L31.4 54.3L30.2 55.8L29.8 57.1L28.6 58.6L28.2 59.9L27 61.4L26.6 62.7L25.8 63.4L25.4 64.6L24.2 66.1L23.8 67.4L22.6 68.9L20.7 73.0L20 73.6L19.8 70.7L20.2 69.5L20.2 64.5L20.6 63.6L20.6 58.6L20.9 58.3L21 56.2L22.5 53.9L22.9 52.6L23.7 51.9L24.1 50.6L25.3 49.2L25.7 47.9L26.9 46.4L28.9 42.3L29.7 41.6L30.5 39.5L31.3 38.8L31.7 37.5L32.9 36.0L33.3 34.8L34.1 34.0L36.4 29.2L37.2 28.5L37.6 27.2L38.8 25.7L39.2 24.4L40 23.6L42.4 18.9L43.2 18.2L43.4 17.5ZM47.3 15.9L50.6 17.9L51.3 18.7L51.8 18.7L52.5 19.5L53 19.5L53.7 20.3L54.2 20.3L54.9 21.1L55.4 21.1L61.9 25.7L68.7 37.9L69.5 38.7L70.3 40.7L71.1 41.5L71.5 42.8L72.7 44.3L73.1 45.6L74.3 47.1L74.7 48.4L78.6 54.6L79 55.9L80.2 57.4L80.6 58.7L81.8 60.2L82.2 61.5L83.4 63.0L84.2 64.5L84 65.2L44.1 65.0L46 61.0L46.8 60.3L47.2 59.0L48 58.3L49.4 55.6L69.8 55.5L68.6 53.0L67.4 51.5L67 50.2L65.8 48.8L65.4 47.5L64.3 46.0L63.9 44.7L59.9 38.4L59.5 37.1L58.3 35.7L57.5 33.7L56.7 32.9L56.3 31.6L53.9 28.1L51.5 23.3L50.7 22.5L50.3 21.3L47.2 16.3Z';
// Triangle loop around (120,120), circumradius 100: participate, verify, reward.
const XPLAN_LOOP = 'M120 20L206.6 170H33.4Z';

/* /how-xplan-works: the DAOaaS mark inside a triangular loop; a packet travels the loop and each
   corner pulses in turn. */
export function XplanMotif() {
  return (
    <div className="al-page-motif al-motion" aria-hidden="true">
      <svg viewBox="0 0 240 240" fill="none">
        <path d={XPLAN_LOOP} stroke="currentColor" strokeOpacity=".5" />
        <Flow d={XPLAN_LOOP} duration={6} />
        {[[120, 20], [206.6, 170], [33.4, 170]].map(([x, y], i) => (
          <g key={i}>
            <circle cx={x} cy={y} r="9" stroke="currentColor" className="al-pulse" style={{ animationDelay: `${i * 0.93}s` }} />
            <circle cx={x} cy={y} r="9" fill={i === 0 ? 'var(--al-cyan)' : 'currentColor'} stroke="currentColor" strokeWidth="2" />
          </g>
        ))}
        <path d={DAOAAS_MARK} fill="currentColor" fillRule="evenodd" transform="translate(80 80) scale(0.8)" />
      </svg>
    </div>
  );
}

/* /onboard: the wallet "X" whose halves part and snap back together, on a line carrying packets
   from a wallet node (left) through the mark to the chain (right). */
export function WalletMotif() {
  return (
    <div className="al-page-motif al-motion" aria-hidden="true">
      <svg viewBox="0 0 240 240" fill="none">
        <path d="M120 2v14M120 224v14" stroke="currentColor" strokeOpacity=".5" />
        <circle cx="120" cy="120" r="104" stroke="currentColor" strokeOpacity=".4" strokeDasharray="1 7" />
        <path d="M30 120H64M176 120H210" stroke="currentColor" />
        <Flow d="M18 120H64" duration={2.4} />
        <Flow d="M176 120H222" delay={1.2} duration={2.4} />
        <rect x="6" y="108" width="24" height="24" fill="currentColor" />
        <circle cx="222" cy="120" r="10" fill="var(--al-cyan)" stroke="currentColor" strokeWidth="2" />
        <circle cx="120" cy="120" r="56" fill="currentColor" />
        <Chevrons size={64} x={88} y={88} className="al-art-inverse al-wallet-chevrons" />
      </svg>
    </div>
  );
}

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

