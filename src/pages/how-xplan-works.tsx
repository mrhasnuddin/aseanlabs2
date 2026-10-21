import { Burst, Clover, Hourglass, Sparkle } from '@/components/icons/BrandSymbols';
import { PageIntro, PageShell } from '@/components/PageLayout';
import { Reveal } from '@/components/home/Motion';
import { XplanMotif } from '@/components/home/CapabilityArtwork';
import { useTranslation } from '@/hooks/useTranslation';

type T = (key: string) => string;

const XPLAN_STEPS = [
  {
    symbol: Hourglass,
    body: (t: T) => <>{t('xplan.step1BodyPart1')}<strong>{t('xplan.step1BodyPart2')}</strong>{t('xplan.step1BodyPart3')}<strong>{t('xplan.step1BodyPart4')}</strong>{t('xplan.step1BodyPart5')}<strong>{t('xplan.step1BodyPart6')}</strong>{t('page.fullStop')}</>,
  },
  {
    symbol: Sparkle,
    body: (t: T) => <>{t('xplan.step2BodyPart1')}<strong>{t('xplan.step2BodyPart2')}</strong>{t('xplan.step2BodyPart3')}<strong>{t('xplan.step2BodyPart4')}</strong>{t('xplan.step2BodyPart5')}<strong>{t('xplan.step2BodyPart6')}</strong>{t('xplan.step2BodyPart7')}<strong>{t('xplan.step2BodyPart8')}</strong>{t('page.fullStop')}</>,
  },
  {
    symbol: Clover,
    body: (t: T) => <>{t('xplan.step3BodyPart1')}<strong>{t('xplan.step3BodyPart2')}</strong>{t('xplan.step3BodyPart3')}<strong>{t('xplan.step3BodyPart4')}</strong>{t('xplan.step3BodyPart5')}<strong>{t('xplan.step3BodyPart6')}</strong>{t('page.fullStop')}</>,
  },
  {
    symbol: Burst,
    body: (t: T) => <>{t('xplan.step4BodyPart1')}<strong>{t('xplan.step4BodyPart2')}</strong>{t('xplan.step4BodyPart3')}<strong>{t('xplan.step4BodyPart4')}</strong>{t('xplan.step4BodyPart5')}<strong>{t('xplan.step4BodyPart6')}</strong>{t('xplan.step4BodyPart7')}</>,
  },
];

export default function HowXplanWorksPage() {
  const { t } = useTranslation();

  return (
    <PageShell title={t('xplan.pageTitle')} description={t('xplan.pageDesc')}>
      <PageIntro
        crumb={t('nav.howXplanWorks')}
        eyebrow="DAOaaS"
        title={t('nav.howXplanWorks')}
        motif={<XplanMotif />}
      >
        <p>{t('xplan.subtitle')}</p>
      </PageIntro>

      <section className="al-container al-process-steps" aria-labelledby="steps-title">
        <h2 id="steps-title" className="sr-only">
          {t('nav.howXplanWorks')}
        </h2>
        <ol className="al-process-grid al-process-grid-4">
          {XPLAN_STEPS.map(({ symbol: Symbol, body }, i) => (
            <li key={i}>
              <Reveal className="al-process-step">
                <div className="al-process-step-top">
                  <span>
                    {t('xplan.stepPrefix')} 0{i + 1}
                  </span>
                  <Symbol size={44} aria-hidden="true" />
                </div>
                <h3>{t(`xplan.step${i + 1}Title`)}</h3>
                <p>{body(t)}</p>
              </Reveal>
            </li>
          ))}
        </ol>
      </section>
    </PageShell>
  );
}
