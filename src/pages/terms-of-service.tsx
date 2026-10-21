import { LegalPage } from '@/components/PageLayout';
import { PageMotif } from '@/components/home/CapabilityArtwork';
import { Chevrons } from '@/components/icons/BrandSymbols';
import { useTranslation } from '@/hooks/useTranslation';

export default function TermsOfServicePage() {
  const { t } = useTranslation();

  return (
    <LegalPage
      ns="tos"
      crumb={t('footer.termsOfService')}
      title={`${t('tos.titlePart1')} ${t('tos.titlePart2')} ${t('tos.titlePart3')}`}
      motif={<PageMotif symbol={Chevrons} nodes={10} />}
    >
      <p>
        {t('tos.intro')} <strong>{t('tos.companyName')}</strong> {t('tos.introEnd')}
      </p>

      <h2>{t('tos.h1')}</h2>
      <p>
        <strong>{t('tos.companyName')}</strong> {t('tos.p1')}
      </p>

      <h2>{t('tos.h2')}</h2>
      <p>{t('tos.p2')}</p>

      <h2>{t('tos.h3')}</h2>
      <p>{t('tos.p3')}</p>
      <ul>
        <li>{t('tos.l1')}</li>
        <li>{t('tos.l2')}</li>
        <li>{t('tos.l3')}</li>
      </ul>

      <h2>{t('tos.h4')}</h2>
      <p>{t('tos.p4')}</p>
      <ul>
        <li>{t('tos.l4')}</li>
        <li>{t('tos.l5')}</li>
        <li>{t('tos.l6')}</li>
      </ul>
      <p className="al-legal-note">{t('tos.p5')}</p>

      <h2>{t('tos.h5')}</h2>
      <p>{t('tos.p6')}</p>

      <h2>{t('tos.h6')}</h2>
      <p>{t('tos.p7')}</p>
      <ul>
        <li><strong>{t('tos.l7t')}</strong> {t('tos.l7b')}</li>
        <li>{t('tos.l8')}</li>
        <li>{t('tos.l9')}</li>
      </ul>
      <p className="al-legal-note">{t('tos.p8')}</p>

      <h2>{t('tos.h7')}</h2>
      <p>{t('tos.p9')}</p>
      <ul>
        <li>{t('tos.l10')}</li>
        <li>{t('tos.l11')}</li>
        <li>{t('tos.l12')}</li>
      </ul>
      <p className="al-legal-note">{t('tos.p10')}</p>

      <h2>{t('tos.h8')}</h2>
      <p>{t('tos.p11')}</p>

      <h2>{t('tos.h9')}</h2>
      <p>{t('tos.p12')}</p>

      <h2>{t('tos.h10')}</h2>
      <p>{t('tos.p13')}</p>

      <hr />

      <h2>{t('tos.contactTitle')}</h2>
      <p>{t('tos.contactText')}</p>
    </LegalPage>
  );
}
