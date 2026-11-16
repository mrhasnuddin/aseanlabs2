import { Chevrons, Hourglass, Sparkle } from '@/components/icons/BrandSymbols';

const INK = 'var(--al-ink)';
const YELLOW = 'var(--al-yellow)';
const PAPER = 'var(--al-paper)';
const CYAN = 'var(--al-cyan)';
const line = { stroke: INK, strokeWidth: 3, strokeLinejoin: 'round', strokeLinecap: 'round' } as const;

/* The shared base of the collection: shoulders, neck, ears and head. Traits are drawn on top. */
function Bust({ skin, body }: { skin: string; body: string }) {
  return (
    <>
      <path d="M34 240v-22c0-24 19-42 42-42h88c23 0 42 18 42 42v22Z" fill={body} {...line} />
      <rect x="103" y="148" width="34" height="40" fill={skin} {...line} />
      <rect x="60" y="100" width="14" height="26" rx="7" fill={skin} {...line} />
      <rect x="166" y="100" width="14" height="26" rx="7" fill={skin} {...line} />
      <rect x="70" y="56" width="100" height="106" rx="32" fill={skin} {...line} />
    </>
  );
}

/* Collection-style team avatars: one base, different traits (background, headwear, eyes, brand pin).
   Abstract characters, not likenesses. Colours stay fixed so they read the same on any card. */
export function TeamAvatar({ id }: { id: 'dean' | 'leo' | 'irhas' }) {
  if (id === 'dean') {
    return (
      <svg viewBox="0 0 240 240" fill="none" className="al-team-avatar" aria-hidden="true">
        <rect width="240" height="240" fill={YELLOW} />
        <circle cx="120" cy="108" r="96" stroke={INK} strokeOpacity=".5" strokeDasharray="2 8" />
        <path d="M26 62h12m-6-6v12M202 156h12m-6-6v12" stroke={INK} />
        <circle cx="193.5" cy="46.3" r="7" fill={CYAN} stroke={INK} strokeWidth="2" />
        <Bust skin={PAPER} body={INK} />
        <path d="M70 96V86c0-18 14-32 32-32h36c18 0 32 14 32 32v10h-18l-8-14H90l-8 14Z" fill={INK} />
        <rect x="78" y="98" width="84" height="22" fill={CYAN} {...line} />
        <path d="M88 109h20" {...line} />
        <path d="M108 141h24" {...line} />
        <path d="M108 186v10M132 186v10" stroke={YELLOW} strokeWidth="3" strokeLinecap="round" />
        <Sparkle size={28} x={106} y={202} style={{ color: YELLOW }} />
        <text x="16" y="28" className="al-avatar-id" fill={INK}>
          #001
        </text>
      </svg>
    );
  }
  if (id === 'leo') {
    return (
      <svg viewBox="0 0 240 240" fill="none" className="al-team-avatar" aria-hidden="true">
        <rect width="240" height="240" fill={INK} />
        <circle cx="120" cy="108" r="96" stroke={YELLOW} strokeOpacity=".55" strokeDasharray="14 8" />
        <path d="M202 62h12m-6-6v12M26 156h12m-6-6v12" stroke={YELLOW} />
        <circle cx="46.5" cy="46.3" r="7" fill={CYAN} stroke={YELLOW} strokeWidth="2" />
        <Bust skin={YELLOW} body={PAPER} />
        <path d="M68 92v-6c0-19 15-34 34-34h36c19 0 34 15 34 34v6Z" fill={PAPER} {...line} />
        <rect x="64" y="84" width="112" height="18" fill={PAPER} {...line} />
        <path d="M84 84v18M102 84v18M120 84v18M138 84v18M156 84v18" stroke={INK} strokeWidth="2" />
        <circle cx="99" cy="124" r="14" fill={PAPER} {...line} />
        <circle cx="141" cy="124" r="14" fill={PAPER} {...line} />
        <path d="M113 124h14" {...line} />
        <circle cx="99" cy="124" r="3.5" fill={INK} />
        <circle cx="141" cy="124" r="3.5" fill={INK} />
        <path d="M108 147q12 8 24 0" {...line} />
        <path d="M96 178l24 20 24-20" {...line} />
        <Hourglass size={26} x={107} y={206} style={{ color: INK }} />
        <text x="16" y="28" className="al-avatar-id" fill={YELLOW}>
          #002
        </text>
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 240 240" fill="none" className="al-team-avatar" aria-hidden="true">
      <rect width="240" height="240" fill={PAPER} />
      <circle cx="120" cy="108" r="96" stroke={INK} strokeOpacity=".5" strokeDasharray="2 8" />
      <path d="M29.8 75.2L210.2 75.2M210.2 75.2L168 191" stroke={INK} strokeOpacity=".35" />
      <circle cx="29.8" cy="75.2" r="5" fill={INK} />
      <circle cx="210.2" cy="75.2" r="5" fill={INK} />
      <Bust skin={YELLOW} body={INK} />
      <path d="M70 98V86c0-18 14-32 32-32h36c18 0 32 14 32 32v12h-12c-24 0-44-8-58-24-6 10-16 18-30 24Z" fill={INK} />
      <path d="M92 110h18M130 110h18" {...line} />
      <circle cx="101" cy="122" r="4.5" fill={INK} />
      <circle cx="139" cy="122" r="4.5" fill={INK} />
      <path d="M110 144h18" {...line} />
      <rect x="164" y="98" width="18" height="30" fill={INK} />
      <path d="M173 128v10c0 8-6 14-14 14h-6" {...line} />
      <circle cx="149" cy="152" r="6" fill={CYAN} stroke={INK} strokeWidth="2" />
      <path d="M108 186v10M132 186v10" stroke={YELLOW} strokeWidth="3" strokeLinecap="round" />
      <Chevrons size={28} x={106} y={202} style={{ color: YELLOW }} />
      <text x="16" y="28" className="al-avatar-id" fill={INK}>
        #003
      </text>
    </svg>
  );
}
