import { useEffect, useRef, useState } from 'react';
import createGlobe from 'cobe';
import { PageIntro, PageShell } from '@/components/PageLayout';
import { CountUp, Reveal, SplitText } from '@/components/home/Motion';
import { WhyMotif } from '@/components/home/CapabilityArtwork';
import { useTranslation } from '@/hooks/useTranslation';

const ADVANTAGES = [
  ['10,000+', 'why.adv1'],
  ['150+', 'why.adv2'],
  ['7', 'why.adv3'],
];

const REGIONS = [
  { country: 'Malaysia', countryKey: 'why.countryMY', languages: 'EN · CN · MY', location: [4.2105, 101.9758] },
  { country: 'Singapore', countryKey: 'why.countrySG', languages: 'EN · CN', location: [1.3521, 103.8198] },
  { country: 'Thailand', countryKey: 'why.countryTH', languages: 'TH · EN', location: [15.8700, 100.9925] },
  { country: 'Vietnam', countryKey: 'why.countryVN', languages: 'EN', location: [14.0583, 108.2772] },
  { country: 'Japan', countryKey: 'why.countryJP', languages: 'JP · EN', location: [36.2048, 138.2529] },
  { country: 'Korea', countryKey: 'why.countryKR', languages: 'KR · EN', location: [35.9078, 127.7669] },
  { country: 'China', countryKey: 'why.countryCN', languages: 'CN · EN', location: [35.8617, 104.1954] }
];

// Globe config constants
const GLOBE_PX = 560;
const DEFAULT_PHI = -3.39;  // phi = -(π/2 + lon_rad); centers on ~104°E (ASEAN core)
const DEFAULT_THETA = 0.28; // Tilt to show the region well
const SPRING_K = 0.04;      // Magnet spring strength (0-1)
const INK: [number, number, number] = [0.09, 0.1, 0.08];
const YELLOW: [number, number, number] = [0.96, 0.75, 0.29];
const CYAN: [number, number, number] = [0, 0.9, 1];

// Arc connections between ASEAN countries
const ARCS: Array<{ from: [number, number]; to: [number, number] }> = [
  { from: [1.3521, 103.8198], to: [4.2105, 101.9758] },   // Singapore → Malaysia
  { from: [1.3521, 103.8198], to: [15.87, 100.9925] },    // Singapore → Thailand
  { from: [1.3521, 103.8198], to: [14.0583, 108.2772] },  // Singapore → Vietnam
  { from: [14.0583, 108.2772], to: [35.8617, 104.1954] }, // Vietnam → China
  { from: [35.8617, 104.1954], to: [36.2048, 138.2529] }, // China → Japan
  { from: [35.8617, 104.1954], to: [35.9078, 127.7669] }, // China → Korea
  { from: [36.2048, 138.2529], to: [35.9078, 127.7669] }, // Japan → Korea
];

// Matches cobe v2's projection math, with scale applied for zoomed label positions
function projectGlobePoint(
  lat: number, lon: number, phi: number, theta: number, scale = 1
) {
  const PI = Math.PI;
  const radLat = lat * PI / 180;
  const radLon = lon * PI / 180 - PI;
  const cosLat = Math.cos(radLat);
  const x = -cosLat * Math.cos(radLon);
  const y = Math.sin(radLat);
  const z = cosLat * Math.sin(radLon);
  const r = 0.85; // marker elevation (ee=0.8 + default markerElevation=0.05)
  const vx = x * r, vy = y * r, vz = z * r;
  const cosPhi = Math.cos(phi), sinPhi = Math.sin(phi);
  const cosTheta = Math.cos(theta), sinTheta = Math.sin(theta);
  const cx = cosPhi * vx + sinPhi * vz;
  const cy = sinPhi * sinTheta * vx + cosTheta * vy - cosPhi * sinTheta * vz;
  const cz = -sinPhi * cosTheta * vx + sinTheta * vy + cosPhi * cosTheta * vz;
  // Apply scale to output coordinates (matches cobe's B parameter)
  return {
    x: (cx * scale + 1) / 2,
    y: (-cy * scale + 1) / 2,
    visible: cz >= 0,
  };
}

function Globe({ activeRegion }: { activeRegion: string | null }) {
  const { t } = useTranslation();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const labelsRef = useRef<HTMLDivElement>(null);
  const pointerInteracting = useRef<number | null>(null);
  const phiRef = useRef(DEFAULT_PHI);
  // Ref so animation loop always reads latest activeRegion without stale closure
  const activeRegionRef = useRef(activeRegion);
  // Spring target phi — updated when country is clicked or deselected
  const targetPhiRef = useRef(DEFAULT_PHI);

  // Keep refs in sync with props/state
  useEffect(() => {
    activeRegionRef.current = activeRegion;
    const region = REGIONS.find((r) => r.country === activeRegion);
    // Correct formula: phi = -(PI/2 + lon_rad) — centers longitude on the globe face
    targetPhiRef.current = region
      ? -(Math.PI / 2 + region.location[1] * Math.PI / 180)
      : DEFAULT_PHI;
  }, [activeRegion]);

  useEffect(() => {
    if (!canvasRef.current) return;

    let globe: ReturnType<typeof createGlobe> | undefined;
    let animFrameId: number;
    let cancelled = false;
    // Reduced motion jumps straight to the selected region instead of easing.
    const spring = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 1 : SPRING_K;

    const initRafId = requestAnimationFrame(() => {
      if (cancelled || !canvasRef.current) return;

      globe = createGlobe(canvasRef.current, {
        devicePixelRatio: Math.min(window.devicePixelRatio || 1, 2),
        width: GLOBE_PX,
        height: GLOBE_PX,
        phi: phiRef.current,
        theta: DEFAULT_THETA,
        dark: 0,
        diffuse: 1.1,
        mapSamples: 16000,
        mapBrightness: 3,
        baseColor: YELLOW,
        markerColor: INK,
        glowColor: YELLOW,
        markers: REGIONS.map((r) => ({
          location: r.location as [number, number],
          size: 0.04,
        })),
        arcs: ARCS.map((a) => ({ ...a, color: INK })),
        arcColor: INK,
        arcWidth: 1,
        arcHeight: 0.4,
      } as any);

      // Direct DOM label update — no React re-renders per frame
      const updateLabels = (phi: number, active: string | null) => {
        if (!labelsRef.current) return;
        const els = labelsRef.current.children;
        REGIONS.forEach((region, i) => {
          const el = els[i] as HTMLElement | undefined;
          if (!el) return;
          const [lat, lon] = region.location;
          const pos = projectGlobePoint(lat, lon, phi, DEFAULT_THETA);
          el.style.left = `${pos.x * 100}%`;
          el.style.top = `${pos.y * 100}%`;
          el.style.opacity = pos.visible ? '1' : '0';
          el.classList.toggle('is-active', region.country === active);
        });
      };

      const animate = () => {
        if (cancelled) return;

        // No auto-rotate. Spring/magnet: ease toward targetPhi (country or default)
        if (pointerInteracting.current === null) {
          phiRef.current += (targetPhiRef.current - phiRef.current) * spring;
        }

        const active = activeRegionRef.current;

        // Update marker sizes + colors based on active region
        globe!.update({
          phi: phiRef.current,
          markers: REGIONS.map((r) => ({
            location: r.location as [number, number],
            size: r.country === active ? 0.08 : 0.04,
            color: r.country === active ? CYAN : INK,
          })),
        });

        updateLabels(phiRef.current, active);
        animFrameId = requestAnimationFrame(animate);
      };
      animFrameId = requestAnimationFrame(animate);
    });

    return () => {
      cancelled = true;
      cancelAnimationFrame(initRafId);
      cancelAnimationFrame(animFrameId);
      globe?.destroy();
    };
  }, []);

  return (
    <div
      className="al-globe al-motion"
      aria-hidden="true"
      onPointerDown={(e) => {
        (e.target as HTMLElement).setPointerCapture(e.pointerId);
        pointerInteracting.current = e.clientX;
      }}
      onPointerUp={() => { pointerInteracting.current = null; }}
      onPointerOut={() => { pointerInteracting.current = null; }}
      onPointerMove={(e) => {
        if (pointerInteracting.current !== null) {
          const delta = e.clientX - pointerInteracting.current;
          pointerInteracting.current = e.clientX;
          phiRef.current += delta * 0.004;
        }
      }}
    >
      {/* Outer orbit: a dotted ring that turns slowly with one cyan node riding on it. */}
      <svg className="al-globe-ring" viewBox="0 0 100 100" fill="none">
        <g className="al-spin" style={{ animationDuration: '80s' }}>
          <circle cx="50" cy="50" r="49.5" stroke="currentColor" strokeOpacity=".55" strokeWidth=".17" strokeDasharray=".17 1.2" />
          <circle cx="50" cy=".5" r="1.3" fill="var(--al-cyan)" stroke="currentColor" strokeWidth=".3" />
        </g>
      </svg>
      <canvas ref={canvasRef} />
      {/* Country labels — positions updated via direct DOM manipulation each frame */}
      <div ref={labelsRef} className="al-globe-labels">
        {REGIONS.map((region) => (
          <div key={region.country} className="al-globe-label">
            <span>{t(region.countryKey)}</span>
            <span />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function WhyUsPage() {
  const [activeRegion, setActiveRegion] = useState<string | null>(null);
  const { t } = useTranslation();

  return (
    <PageShell title={t('why.pageTitle')} description={t('why.pageDesc')}>
      <PageIntro
        crumb={t('nav.whyUs')}
        eyebrow={t('why.badge')}
        title={t('why.titlePart1')}
        highlight={t('why.titleHighlight')}
        motif={<WhyMotif />}
      >
        <p>{t('why.desc1')}</p>
        <p>{t('why.desc2')}</p>
      </PageIntro>

      <section className="al-container" aria-label={t('why.badge')}>
        <Reveal>
          <ul className="al-advantages">
            {ADVANTAGES.map(([stat, key]) => (
              <li className="al-advantage" key={key}>
                <span>
                  <CountUp value={stat} />
                </span>
                <p className="al-small-label">{t(`${key}Title`)}</p>
                <p>{t(`${key}Desc`)}</p>
              </li>
            ))}
          </ul>
        </Reveal>
      </section>

      <section className="al-section al-regions" aria-labelledby="regions-title">
        <div className="al-container al-regions-layout">
          <Globe activeRegion={activeRegion} />
          <div>
            <Reveal className="al-section-heading">
              <h2 id="regions-title">
                <SplitText text={t('why.regionTitle')} />
              </h2>
              <p>{t('why.regionDesc')}</p>
            </Reveal>
            <ul className="al-region-list">
              {REGIONS.map((region) => {
                const isActive = activeRegion === region.country;
                return (
                  <li key={region.country}>
                    <button
                      type="button"
                      aria-pressed={isActive}
                      onClick={() => setActiveRegion(isActive ? null : region.country)}
                    >
                      <span>{t(region.countryKey)}</span>
                      <span>{region.languages}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
