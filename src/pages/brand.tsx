import { useCallback, useEffect, useRef } from 'react';
import { Check, Copy, Download } from 'lucide-react';
import { ALL_ACCENT_SYMBOLS, LogoMark } from '@/components/icons/BrandSymbols';
import { PageIntro, PageShell, useCopy } from '@/components/PageLayout';
import { Reveal, SplitText } from '@/components/home/Motion';
import { BrandMotif } from '@/components/home/CapabilityArtwork';
import { useTranslation } from '@/hooks/useTranslation';

const COLORS = [
  { name: 'Canvas (Yellow)', hex: '#F4BF4B' },
  { name: 'Ink', hex: '#171914' },
  { name: 'Accent (Cyan)', hex: '#00E5FF' },
  { name: 'Paper', hex: '#F5F2E7' },
];

function ColorSwatch({ name, hex }: { name: string; hex: string }) {
  const { t } = useTranslation();
  const [copied, copy] = useCopy(hex);
  return (
    <li className="al-swatch">
      <button
        type="button"
        onClick={copy}
        data-copied={copied || undefined}
        style={{ background: hex }}
        aria-label={`${t('brand.clickToCopy')}: ${name} ${hex}`}
      >
        <span aria-hidden="true">
          {copied ? <Check size={12} /> : <Copy size={12} />}
          {t(copied ? 'brand.copied' : 'brand.clickToCopy')}
        </span>
      </button>
      <h3>{name}</h3>
      <p>{hex}</p>
      <span className="sr-only" aria-live="polite">
        {copied ? t('brand.copied') : ''}
      </span>
    </li>
  );
}

type PhysicsNode = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  isDragging: boolean;
};

function FloatingSymbols() {
  const containerRef = useRef<HTMLDivElement>(null);
  const nodesRef = useRef<PhysicsNode[]>([]);
  const symbolsRef = useRef<(HTMLDivElement | null)[]>([]);
  const animationFrameRef = useRef<number>();
  const dragTargetRef = useRef<{ index: number; offsetX: number; offsetY: number } | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const width = containerRef.current.clientWidth;
    const height = containerRef.current.clientHeight;
    // Reduced motion keeps the symbols still until someone drags one.
    const drift = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 3;

    nodesRef.current = ALL_ACCENT_SYMBOLS.map(() => {
      const radius = 32;
      return {
        x: radius + Math.random() * Math.max(width - radius * 2, 0),
        y: radius + Math.random() * Math.max(height - radius * 2, 0),
        vx: (Math.random() - 0.5) * drift,
        vy: (Math.random() - 0.5) * drift,
        radius,
        isDragging: false,
      };
    });

    const updatePhysics = () => {
      if (!containerRef.current) return;
      const width = containerRef.current.clientWidth;
      const height = containerRef.current.clientHeight;

      nodesRef.current.forEach((node) => {
        if (node.isDragging) return;
        node.x += node.vx;
        node.y += node.vy;

        if (node.x - node.radius < 0) { node.x = node.radius; node.vx *= -1; }
        else if (node.x + node.radius > width) { node.x = width - node.radius; node.vx *= -1; }

        if (node.y - node.radius < 0) { node.y = node.radius; node.vy *= -1; }
        else if (node.y + node.radius > height) { node.y = height - node.radius; node.vy *= -1; }
      });

      for (let i = 0; i < nodesRef.current.length; i++) {
        for (let j = i + 1; j < nodesRef.current.length; j++) {
          const n1 = nodesRef.current[i];
          const n2 = nodesRef.current[j];
          const dx = n2.x - n1.x;
          const dy = n2.y - n1.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const minD = n1.radius + n2.radius;

          if (dist < minD && dist > 0) {
            const overlap = minD - dist;
            const nx = dx / dist;
            const ny = dy / dist;
            const massRatio = 0.5;

            if (!n1.isDragging) {
              n1.x -= nx * overlap * massRatio;
              n1.y -= ny * overlap * massRatio;
              n1.vx -= nx * overlap * 0.05;
              n1.vy -= ny * overlap * 0.05;
            }
            if (!n2.isDragging) {
              n2.x += nx * overlap * massRatio;
              n2.y += ny * overlap * massRatio;
              n2.vx += nx * overlap * 0.05;
              n2.vy += ny * overlap * 0.05;
            }
          }
        }
      }

      nodesRef.current.forEach((node) => {
        const speed = Math.sqrt(node.vx * node.vx + node.vy * node.vy);
        if (speed > 2.5 && !node.isDragging) {
          node.vx *= 0.95;
          node.vy *= 0.95;
        }
      });

      nodesRef.current.forEach((node, i) => {
        const el = symbolsRef.current[i];
        if (el) {
          el.style.transform = `translate(${node.x - node.radius}px, ${node.y - node.radius}px)`;
        }
      });
      animationFrameRef.current = requestAnimationFrame(updatePhysics);
    };

    animationFrameRef.current = requestAnimationFrame(updatePhysics);
    return () => { if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current); };
  }, []);

  const handlePointerDown = (e: React.PointerEvent, index: number) => {
    if (!containerRef.current) return;
    e.preventDefault();
    const node = nodesRef.current[index];
    node.isDragging = true;
    const rect = containerRef.current.getBoundingClientRect();
    dragTargetRef.current = {
      index,
      offsetX: e.clientX - rect.left - node.x,
      offsetY: e.clientY - rect.top - node.y,
    };
    node.vx = 0;
    node.vy = 0;
  };

  const handlePointerMove = useCallback((e: PointerEvent) => {
    if (!dragTargetRef.current || !containerRef.current) return;
    const { index, offsetX, offsetY } = dragTargetRef.current;
    const node = nodesRef.current[index];
    const rect = containerRef.current.getBoundingClientRect();
    const newX = e.clientX - rect.left - offsetX;
    const newY = e.clientY - rect.top - offsetY;
    node.vx = newX - node.x;
    node.vy = newY - node.y;
    node.x = newX;
    node.y = newY;
  }, []);

  const handlePointerUp = useCallback(() => {
    if (dragTargetRef.current) {
      nodesRef.current[dragTargetRef.current.index].isDragging = false;
      dragTargetRef.current = null;
    }
  }, []);

  useEffect(() => {
    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerUp);
    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
    };
  }, [handlePointerMove, handlePointerUp]);

  return (
    <div ref={containerRef} className="al-symbol-field" aria-hidden="true">
      {ALL_ACCENT_SYMBOLS.map((Symbol, i) => (
        <div
          key={i}
          ref={(el) => { symbolsRef.current[i] = el; }}
          onPointerDown={(e) => handlePointerDown(e, i)}
        >
          <Symbol size={56} />
        </div>
      ))}
    </div>
  );
}

function BrandSection({
  index,
  title,
  action,
  children,
}: {
  index: string;
  title: string;
  action?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <section className="al-section" aria-labelledby={`brand-${index}`}>
      <div className="al-container">
        <Reveal className="al-brand-heading">
          <span>{index}</span>
          <h2 id={`brand-${index}`}>
            <SplitText text={title} />
          </h2>
          {action}
        </Reveal>
        {children}
      </div>
    </section>
  );
}

function DownloadLink({ href, label }: { href: string; label: string }) {
  return (
    <a href={href} download className="al-button">
      {label}
      <Download size={17} aria-hidden="true" />
    </a>
  );
}

function Wordmark({ withSymbol = false }: { withSymbol?: boolean }) {
  return (
    <span className="al-wordmark al-logo-wordmark">
      {withSymbol && <LogoMark size="1.25em" className="al-logo-symbol" aria-hidden="true" />}
      <span>
        ASEAN<span className="al-wordmark-labs">LABS</span>
      </span>
    </span>
  );
}

export default function BrandIdentityPage() {
  const { t } = useTranslation();

  return (
    <PageShell title={t('brand.pageTitle')} description={t('brand.pageDesc')}>
      <PageIntro
        crumb={t('nav.brand')}
        title={t('nav.brand')}
        motif={<BrandMotif />}
      >
        <p>{t('brand.overviewDesc')}</p>
      </PageIntro>

      <BrandSection index="01" title={t('brand.personalityTitle')}>
        <div className="al-process-grid">
          {[1, 2, 3].map((i) => (
            <div className="al-process-step" key={i}>
              <span className="al-small-label al-trait-label">{t(`brand.personality${i}Sub`)}</span>
              <h3>{t(`brand.personality${i}Title`)}</h3>
              <p>{t(`brand.personality${i}Desc`)}</p>
            </div>
          ))}
        </div>
      </BrandSection>

      <BrandSection
        index="02"
        title={t('brand.logosTitle')}
        action={<DownloadLink href="/Brand Kit/AseanLabs Logo.7z" label={t('brand.downloadLogoPack')} />}
      >
        <div className="al-logo-grid">
          <div className="al-logo-tile">
            <span className="al-small-label">{t('brand.symbolLabel')}</span>
            <LogoMark size={110} className="al-logo-symbol" />
          </div>
          <div className="al-logo-tile">
            <span className="al-small-label">{t('brand.wordmarkLabel')}</span>
            <Wordmark />
          </div>
          <div className="al-logo-tile al-logo-tile-wide al-logo-tile-ink">
            <span className="al-small-label">{t('brand.combinedLabel')}</span>
            <Wordmark withSymbol />
          </div>
        </div>
        <p className="al-brand-note">{t('brand.logosDesc')}</p>
      </BrandSection>

      <BrandSection index="03" title={t('brand.colorsTitle')}>
        <p className="al-brand-note">{t('brand.colorsDesc')}</p>
        <ul className="al-swatches">
          {COLORS.map((color) => (
            <ColorSwatch key={color.hex} {...color} />
          ))}
        </ul>
      </BrandSection>

      <BrandSection index="04" title={t('brand.typographyTitle')}>
        <div className="al-type-grid">
          <div className="al-type-card">
            <span className="al-small-label">{t('brand.primaryTypeface')}</span>
            <h3 className="al-type-name">{t('brand.primaryTypefaceName')}</h3>
            <p>{t('brand.primaryTypefaceDesc')}</p>
            <div className="al-type-samples">
              <div>
                <p className="al-small-label">{t('brand.titleDisplay')}</p>
                <p className="al-type-display">{t('hero.headline')}</p>
              </div>
              <div>
                <p className="al-small-label">{t('brand.bodyCopy')}</p>
                <p>{t('brand.bodyCopyExample')}</p>
              </div>
            </div>
            <DownloadLink
              href="https://fonts.google.com/download?family=Space+Grotesk"
              label={t('brand.downloadFont')}
            />
          </div>
          <div className="al-type-card al-type-mono">
            <span className="al-small-label">{t('brand.secondaryTypeface')}</span>
            <h3 className="al-type-name">{t('brand.secondaryTypefaceName')}</h3>
            <p>{t('brand.secondaryTypefaceDesc')}</p>
            <div className="al-type-samples">
              <div>
                <p className="al-small-label">{t('brand.badgeAccents')}</p>
                <p className="al-small-label">{t('brand.badgeAccentsExample')}</p>
              </div>
              <div>
                <p className="al-small-label">{t('brand.dataMetrics')}</p>
                <p className="al-type-display">{t('brand.dataMetricsExample')}</p>
              </div>
            </div>
            <DownloadLink
              href="https://fonts.google.com/download?family=IBM+Plex+Mono"
              label={t('brand.downloadFont')}
            />
          </div>
        </div>
      </BrandSection>

      <BrandSection
        index="05"
        title={t('brand.graphicAssetsTitle')}
        action={<DownloadLink href="/Brand Kit/Symbols.7z" label={t('brand.downloadGraphicAssets')} />}
      >
        <p className="al-brand-note">{t('brand.graphicAssetsDesc')}</p>
        <FloatingSymbols />
      </BrandSection>
    </PageShell>
  );
}
