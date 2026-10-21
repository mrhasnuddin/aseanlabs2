import { PageIntro, PageShell } from '@/components/PageLayout';
import { Reveal, SplitText } from '@/components/home/Motion';
import { ProcessMotif } from '@/components/home/CapabilityArtwork';
import { useTranslation } from '@/hooks/useTranslation';

const STEPS = ['01', '02', '03', '04', '05'];

export default function ProcessPage() {
  const { t } = useTranslation();

  return (
    <PageShell title={t('process.pageTitle')} description={t('process.pageDesc')}>
      <PageIntro
        crumb={t('nav.process')}
        eyebrow={t('process.badge')}
        title={t('process.titlePart1')}
        highlight={t('process.titleHighlight')}
        motif={<ProcessMotif />}
      >
        <p>{t('process.subtitle')}</p>
      </PageIntro>

      <section className="al-container al-process-steps" aria-labelledby="steps-title">
        <h2 id="steps-title" className="sr-only">
          {t('process.badge')}
        </h2>
        <Reveal>
          <ol className="al-steps al-motion">
            {STEPS.map((n, i) => (
              <li className="al-step" key={n} style={{ '--i': i } as React.CSSProperties}>
                <span className="al-step-node" aria-hidden="true">
                  {n}
                </span>
                {/* Dictionary titles carry their own "01 —" prefix; the node already shows it. */}
                <h3>{t(`process.step${n}Title`).replace(/^\d+\s*[—–-]\s*/, '')}</h3>
                <p>{t(`process.step${n}Desc`)}</p>
              </li>
            ))}
          </ol>
        </Reveal>
      </section>

      <section className="al-section al-standards" aria-labelledby="standards-title">
        <div className="al-container">
          <Reveal className="al-section-heading">
            <h2 id="standards-title">
              <SplitText text={t('process.standardsTitle')} />
            </h2>
          </Reveal>
          <div className="al-process-grid">
            {[1, 2, 3].map((i) => (
              <Reveal key={i} className="al-process-step">
                <div className="al-process-step-top">
                  <span>0{i}</span>
                </div>
                <h3>{t(`process.standard${i}Title`)}</h3>
                <p>{t(`process.standard${i}Desc`)}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </PageShell>
  );
}
