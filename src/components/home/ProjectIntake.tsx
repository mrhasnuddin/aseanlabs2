import { useRef, useState, type FormEvent } from 'react';
import Link from 'next/link';
import { ArrowRightIcon, ArrowTopRightIcon, CheckIcon, ChevronDownIcon, CopyIcon } from '@radix-ui/react-icons';
import { useTranslation } from '@/hooks/useTranslation';
import styles from './ProjectIntake.module.css';

const PACKAGES = [
  { id: 'launch', name: 'Launch Sprint', price: '5,500', duration: 'Four weeks', description: 'A focused engagement for your next launch.' },
  { id: 'community', name: 'Community Growth', price: '4,500', duration: '30 days', description: 'Dedicated support for your community’s next stage.' },
  { id: 'regional', name: 'Regional Market Entry', price: '9,000', duration: 'Eight weeks', description: 'A focused engagement for entering a new regional market.' },
  { id: 'opencrew', name: 'OpenCrew Representation', price: '4,000', duration: 'Per month', description: 'Ongoing representation through a monthly engagement.' },
] as const;
const EXTRA_OPTIONS = [
  { id: 'standalone', name: 'Standalone service' },
  { id: 'choose', name: 'Help me choose' },
];
const EMAIL = 'contact@aseanlabs.io';

export function ProjectIntake() {
  const { t } = useTranslation();
  const [selected, setSelected] = useState('choose');
  const [brief, setBrief] = useState('');
  const [copied, setCopied] = useState(false);
  const [copyError, setCopyError] = useState(false);
  const packageField = useRef<HTMLSelectElement>(null);
  const review = useRef<HTMLDivElement>(null);

  function choosePackage(id: string) {
    setSelected(id);
    setBrief('');
    packageField.current?.focus();
  }

  function prepareBrief(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const choice = [...PACKAGES, ...EXTRA_OPTIONS].find((item) => item.id === selected)!;
    const price = PACKAGES.find((item) => item.id === selected);
    setBrief([
      `Name: ${String(data.get('name')).trim()}`,
      `Email: ${String(data.get('email')).trim()}`,
      `Project: ${String(data.get('project')).trim()}`,
      `Package: ${choice.name}${price ? ` (${price.price} USDT / ${price.duration.toLowerCase()})` : ''}`,
      '', 'Project brief:', String(data.get('brief')).trim(),
    ].join('\n'));
    setCopied(false);
    setCopyError(false);
    requestAnimationFrame(() => review.current?.focus());
  }

  async function copyBrief() {
    try { await navigator.clipboard.writeText(brief); setCopied(true); setCopyError(false); }
    catch { setCopyError(true); }
  }

  return <section id="packages" className={`al-section ${styles.section}`} aria-labelledby="packages-title">
    <div className="al-container">
      <header className={styles.heading}>
        <div><p className="al-small-label">{t('intake.packagesLabel')}</p><h2 id="packages-title">{t('intake.packagesTitle')}</h2></div>
        <p>{t('intake.packagesBody')}</p>
      </header>
      <ul className={styles.packages}>
        {PACKAGES.map((item, index) => <li key={item.id}>
          <span className={styles.index}>0{index + 1}</span>
          <h3>{item.name}</h3>
          <p className={styles.description}>{item.id === 'opencrew' ? <><a href="https://open-crew.vercel.app/" target="_blank" rel="noopener noreferrer">OpenCrew<ArrowTopRightIcon aria-hidden="true" /></a> {t('intake.opencrewPartner')}</> : t(`intake.${item.id}Desc`)}</p>
          <div className={styles.price}><strong>{item.price}</strong><span>USDT</span></div>
          <p className={styles.duration}>{t(`intake.${item.id}Duration`)}</p>
          <button type="button" className="al-text-link" onClick={() => choosePackage(item.id)} aria-label={`${t('intake.discuss')} — ${item.name}`}>
            {t('intake.discuss')}<ArrowRightIcon aria-hidden="true" />
          </button>
        </li>)}
      </ul>
      <p className={styles.feeNote}>{t('intake.feeNote')}</p>
      <div id="contact" className={styles.intake}>
        <div className={styles.intro}>
          <p className="al-small-label">{t('intake.briefLabel')}</p>
          <h2 id="intake-title">{t('intake.title')}</h2>
          <p>{t('intake.body')}</p>
          <div className={styles.alternatives}>
            <p>{t('intake.alternative')}</p>
            <a href={`mailto:${EMAIL}`} className="al-text-link">{EMAIL}<ArrowTopRightIcon aria-hidden="true" /></a>
            <a href="https://www.linkedin.com/company/107538116/" className="al-text-link" target="_blank" rel="noopener noreferrer">{t('contact.linkedin')}<ArrowTopRightIcon aria-hidden="true" /></a>
          </div>
        </div>
        <form className={styles.form} action={`mailto:${EMAIL}`} method="post" encType="text/plain" aria-labelledby="intake-title" onSubmit={prepareBrief} onChange={() => { setBrief(''); setCopied(false); }}>
          <p className={styles.formHint}>{t('intake.requiredNote')}</p>
          <div className={styles.twoColumns}>
            <div className={styles.field}><label htmlFor="intake-name">{t('intake.name')}</label><input id="intake-name" name="name" autoComplete="name" maxLength={100} required pattern=".*\S.*" /></div>
            <div className={styles.field}><label htmlFor="intake-email">{t('intake.email')}</label><input id="intake-email" name="email" type="email" autoComplete="email" maxLength={254} required /></div>
          </div>
          <div className={styles.field}><label htmlFor="intake-project">{t('intake.project')}</label><input id="intake-project" name="project" autoComplete="organization" maxLength={200} required pattern=".*\S.*" /></div>
          <div className={styles.field}>
            <label htmlFor="intake-package">{t('intake.package')}</label>
            <div className={styles.selectWrap}><select id="intake-package" name="package" ref={packageField} value={selected} onChange={(event) => setSelected(event.target.value)} required>
              {PACKAGES.map((item) => <option key={item.id} value={item.id}>{item.name} · {item.price} USDT / {t(`intake.${item.id}Duration`).toLowerCase()}</option>)}
              {EXTRA_OPTIONS.map((item) => <option key={item.id} value={item.id}>{t(`intake.${item.id}Option`)}</option>)}
            </select><ChevronDownIcon aria-hidden="true" /></div>
          </div>
          <div className={styles.field}><label htmlFor="intake-brief">{t('intake.brief')}</label><p id="intake-brief-hint">{t('intake.briefHint')}</p><textarea id="intake-brief" name="brief" rows={5} maxLength={3000} required aria-describedby="intake-brief-hint" /></div>
          <p className={styles.privacy}>{t('intake.privacyNote')} <Link href="/privacy-policy">{t('footer.privacyPolicy')}</Link>.</p>
          <button type="submit" className="al-button">{t('intake.prepare')}<ArrowRightIcon aria-hidden="true" /></button>
          <p className={styles.formHint}>{t('intake.emailNote')}</p>
          {brief && <div className={styles.review} ref={review} tabIndex={-1}>
            <h3>{t('intake.ready')}</h3><p role="status">{t('intake.readyBody')}</p>
            <label className="sr-only" htmlFor="intake-prepared">{t('intake.preparedBrief')}</label><textarea id="intake-prepared" readOnly value={brief} rows={9} />
            <a className="al-button" href={`mailto:${EMAIL}?subject=${encodeURIComponent('ASEAN Labs project enquiry')}&body=${encodeURIComponent(brief)}`}>{t('intake.openEmail')}<ArrowTopRightIcon aria-hidden="true" /></a>
            <button type="button" className="al-text-link" onClick={copyBrief}>{copied ? t('intake.copied') : t('intake.copy')}{copied ? <CheckIcon aria-hidden="true" /> : <CopyIcon aria-hidden="true" />}</button>
            <span role="status" className="sr-only">{copied ? t('intake.copied') : ''}</span>
            {copyError && <p role="alert">{t('intake.copyError')}</p>}
          </div>}
        </form>
      </div>
    </div>
  </section>;
}
