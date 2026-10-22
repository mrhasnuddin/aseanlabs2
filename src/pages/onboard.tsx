import { useState } from 'react';
import Image from 'next/image';
import { ArrowTopRightIcon } from '@radix-ui/react-icons';
import { CopyButton, PageIntro, PageShell } from '@/components/PageLayout';
import { Reveal, SplitText } from '@/components/home/Motion';
import { WalletMotif } from '@/components/home/CapabilityArtwork';
import { useTranslation } from '@/hooks/useTranslation';

type T = (key: string) => string;

const NETWORK_DETAILS = [
  { labelKey: 'onboard.networkName', value: 'ENI Mainnet' },
  { labelKey: 'onboard.chainId', value: '173' },
  { labelKey: 'onboard.explorer', value: 'https://scan.eniac.network' },
  { labelKey: 'onboard.mainnetToken', value: 'EGAS (used for gas fees)' },
  { labelKey: 'onboard.tokenId', value: '2730' },
  {
    labelKey: 'onboard.rpcUrl',
    value: 'https://rpc.eniac.network',
    backups: ['https://rpc1.eniac.network', 'https://rpc2.eniac.network', 'https://enirpc.com'],
  },
];

const WALLETS = [
  {
    id: 'metamask',
    name: 'MetaMask',
    iconSrc: '/wallet tutorial/MetaMask-icon-fox 2.svg',
    subtitleKey: 'onboard.mmSubtitle',
    href: 'https://metamask.io/download/',
    steps: [
      { titleKey: 'onboard.mmStep1Title', body: (t: T) => <>{t('onboard.mmStep1Body')}</> },
      {
        titleKey: 'onboard.mmStep2Title',
        body: (t: T) => <>{t('onboard.mmStep2BodyPart1')}<strong>&quot;{t('onboard.mmStep2BodyPart2')}&quot;</strong>){t('page.fullStop')}</>,
      },
      {
        titleKey: 'onboard.mmStep3Title',
        body: (t: T) => <>{t('onboard.mmStep3BodyPart1')}<strong>{t('onboard.mmStep3BodyPart2')}</strong>{t('onboard.mmStep3BodyPart3')}<strong>{t('onboard.mmStep3BodyPart4')}</strong>{t('page.fullStop')}</>,
      },
      {
        titleKey: 'onboard.mmStep4Title',
        body: (t: T) => <>{t('onboard.mmStep4BodyPart1')}<strong>{t('onboard.mmStep4BodyPart2')}</strong>{t('onboard.mmStep4BodyPart3')}</>,
      },
      {
        titleKey: 'onboard.mmStep5Title',
        body: (t: T) => <>{t('onboard.mmStep5BodyPart1')}<strong>{t('onboard.mmStep5BodyPart2')}</strong>{t('onboard.mmStep5BodyPart3')}<strong>{t('onboard.mmStep5BodyPart4')}</strong>{t('page.fullStop')}</>,
      },
    ],
  },
  {
    id: 'bitget',
    name: 'Bitget Wallet',
    iconSrc: '/wallet tutorial/bitget.svg',
    subtitleKey: 'onboard.bgSubtitle',
    href: 'https://web3.bitget.com/en/wallet-download',
    steps: [
      { titleKey: 'onboard.bgStep1Title', body: (t: T) => <>{t('onboard.bgStep1Body')}</> },
      { titleKey: 'onboard.bgStep2Title', body: (t: T) => <>{t('onboard.bgStep2Body')}</> },
      {
        titleKey: 'onboard.bgStep3Title',
        body: (t: T) => <>{t('onboard.bgStep3BodyPart1')}<strong>{t('onboard.bgStep3BodyPart2')}</strong>{t('onboard.bgStep3BodyPart3')}<strong>{t('onboard.bgStep3BodyPart4')}</strong>{t('page.fullStop')}</>,
      },
      {
        titleKey: 'onboard.bgStep4Title',
        body: (t: T) => <>{t('onboard.bgStep4BodyPart1')}<strong>({t('onboard.bgStep4BodyPart2')})</strong>{t('page.fullStop')}</>,
      },
      {
        titleKey: 'onboard.bgStep5Title',
        body: (t: T) => <>{t('onboard.bgStep5BodyPart1')}<strong>{t('onboard.bgStep5BodyPart2')}</strong>{t('onboard.bgStep5BodyPart3')}<strong>{t('onboard.bgStep5BodyPart4')}</strong>{t('onboard.bgStep5BodyPart5')}</>,
      },
    ],
  },
  {
    id: 'tokenpocket',
    name: 'Token Pocket',
    iconSrc: '/wallet tutorial/Token-Pocket-Color-Version03 1.svg',
    subtitleKey: 'onboard.tpSubtitle',
    href: 'https://www.tokenpocket.pro/en/download/app',
    steps: [
      { titleKey: 'onboard.tpStep1Title', body: (t: T) => <>{t('onboard.tpStep1Body')}</> },
      { titleKey: 'onboard.tpStep2Title', body: (t: T) => <>{t('onboard.tpStep2Body')}</> },
      {
        titleKey: 'onboard.tpStep3Title',
        body: (t: T) => <>{t('onboard.tpStep3BodyPart1')}<strong>+</strong>{t('onboard.tpStep3BodyPart2')}<strong>{t('onboard.tpStep3BodyPart3')}</strong>{t('onboard.tpStep3BodyPart4')}</>,
      },
      {
        titleKey: 'onboard.tpStep4Title',
        body: (t: T) => <>{t('onboard.tpStep4BodyPart1')}<strong>{t('onboard.tpStep4BodyPart2')}</strong>{t('onboard.tpStep4BodyPart3')}</>,
      },
      {
        titleKey: 'onboard.tpStep5Title',
        body: (t: T) => <>{t('onboard.tpStep5BodyPart1')}<strong>{t('onboard.tpStep5BodyPart2')}</strong>{t('onboard.tpStep5BodyPart3')}<strong>{t('onboard.tpStep5BodyPart4')}</strong>{t('onboard.tpStep5BodyPart5')}</>,
      },
    ],
  },
];

export default function OnboardPage() {
  const { t } = useTranslation();
  const [walletId, setWalletId] = useState(WALLETS[0].id);
  const wallet = WALLETS.find((w) => w.id === walletId) ?? WALLETS[0];

  return (
    <PageShell title={t('onboard.pageTitle')} description={t('onboard.pageDesc')}>
      <PageIntro
        crumb={t('nav.walletTutorial')}
        title={t('onboard.titlePart1')}
        highlight={`${t('onboard.titlePart2')} ${t('onboard.titleHighlight')}`}
        motif={<WalletMotif />}
      >
        <p>{t('onboard.subtitle')}</p>
      </PageIntro>

      <section className="al-section" aria-labelledby="network-title">
        <div className="al-container al-split">
          <Reveal className="al-section-heading">
            <h2 id="network-title">
              <SplitText text={t('onboard.networkDetailsTitle')} />
            </h2>
          </Reveal>
          <dl className="al-spec">
            {NETWORK_DETAILS.map((item) => (
              <div key={item.labelKey}>
                <dt>{t(item.labelKey)}</dt>
                <dd>
                  <div className="al-spec-value">
                    <span>{item.value}</span>
                    <CopyButton value={item.value} label={t(item.labelKey)} />
                  </div>
                  {item.backups && (
                    <div className="al-spec-backups">
                      <p className="al-small-label">{t('onboard.backupRpcs')}</p>
                      <ul>
                        {item.backups.map((rpc) => (
                          <li key={rpc}>
                            <span>{rpc}</span>
                            <CopyButton value={rpc} label={rpc} />
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="al-section" aria-labelledby="wallet-title">
        <div className="al-container">
          <Reveal className="al-section-heading">
            <h2 id="wallet-title">
              <SplitText text={t('onboard.addToWallet')} />
            </h2>
          </Reveal>
          <div className="al-wallet-tabs">
            {WALLETS.map((w) => (
              <button
                key={w.id}
                type="button"
                aria-pressed={w.id === wallet.id}
                aria-controls="wallet-steps"
                onClick={() => setWalletId(w.id)}
              >
                <Image src={w.iconSrc} alt="" width={36} height={36} />
                <span>
                  <strong>{w.name}</strong>
                  <small>{t(w.subtitleKey)}</small>
                </span>
              </button>
            ))}
          </div>
          <div id="wallet-steps">
            <ol className="al-steps al-motion" aria-label={wallet.name}>
              {wallet.steps.map((step, i) => (
                <li className="al-step" key={step.titleKey} style={{ '--i': i } as React.CSSProperties}>
                  <span className="al-step-node" aria-hidden="true">
                    0{i + 1}
                  </span>
                  <h3>{t(step.titleKey)}</h3>
                  <p>{step.body(t)}</p>
                </li>
              ))}
            </ol>
            <div className="al-wallet-foot">
              <p>{t('onboard.noWallet')}</p>
              <a
                href={wallet.href}
                target="_blank"
                rel="noopener noreferrer"
                className="al-button"
              >
                {t('onboard.getWallet').replace('{wallet}', wallet.name)}
                <ArrowTopRightIcon width={17} height={17} aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
