import { LegalPage } from '@/components/PageLayout';
import { PageMotif } from '@/components/home/CapabilityArtwork';
import { Iris } from '@/components/icons/BrandSymbols';
import { useTranslation } from '@/hooks/useTranslation';

export default function PrivacyPolicyPage() {
  const { t } = useTranslation();

  return (
    <LegalPage
      ns="privacy"
      crumb={t('footer.privacyPolicy')}
      title={`${t('privacy.titlePart1')} ${t('privacy.titlePart2')}`}
      motif={<PageMotif symbol={Iris} nodes={8} />}
    >
      <p>
        <strong>{t('privacy.companyName')}</strong> {t('privacy.intro')}
      </p>

      <h2>{t('privacy.h1')}</h2>
      <p>{t('privacy.p1')}</p>
      <ul>
        <li><strong>{t('privacy.l1t')}</strong> {t('privacy.l1b')}</li>
        <li><strong>{t('privacy.l2t')}</strong> {t('privacy.l2b')}</li>
        <li><strong>{t('privacy.l3t')}</strong> {t('privacy.l3b')}</li>
      </ul>

      <h2>{t('privacy.h2')}</h2>
      <p>{t('privacy.p2')}</p>
      <ul>
        <li>{t('privacy.l4')}</li>
        <li>{t('privacy.l5')}</li>
        <li>{t('privacy.l6')}</li>
        <li>{t('privacy.l7')}</li>
        <li>{t('privacy.l8a')} <strong>{t('privacy.l8b')}</strong> {t('privacy.l8c')}</li>
      </ul>

      <h2>{t('privacy.h3')}</h2>
      <p>{t('privacy.p3')}</p>
      <ul>
        <li>{t('privacy.l9')}</li>
        <li>{t('privacy.l10')}</li>
        <li>{t('privacy.l11')}</li>
      </ul>
      <p className="al-legal-note">{t('privacy.p4')}</p>

      <h2>{t('privacy.h4')}</h2>
      <p>{t('privacy.p5')}</p>
      <ul>
        <li>{t('privacy.l12')}</li>
        <li>{t('privacy.l13')}</li>
      </ul>
      <p>{t('privacy.p6')}</p>

      <h2>{t('privacy.h5')}</h2>
      <p>{t('privacy.p7')}</p>

      <h2>{t('privacy.h6')}</h2>
      <p>{t('privacy.p8')}</p>
      <ul>
        <li>{t('privacy.l14')}</li>
        <li>{t('privacy.l15')}</li>
        <li>{t('privacy.l16')}</li>
      </ul>
      <p>{t('privacy.p9')}</p>

      <h2>{t('privacy.h7')}</h2>
      <p>{t('privacy.p10')}</p>

      <h2>{t('privacy.h8')}</h2>
      <p>{t('privacy.p11')}</p>

      <hr />

      <h2>{t('privacy.contactTitle')}</h2>
      <p>{t('privacy.contactText')}</p>
    </LegalPage>
  );
}
