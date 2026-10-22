import { useEffect, useId, useRef, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { ChevronDownIcon, GlobeIcon } from '@radix-ui/react-icons';
import { LOCALE_NAMES, LOCALE_SHORT, useTranslation } from '@/hooks/useTranslation';

interface Props {
  variant?: 'nav' | 'footer' | 'mobile';
}

export function LanguageSwitcher({ variant = 'nav' }: Props) {
  const { t } = useTranslation();
  const { asPath, locale = 'en', locales = [] } = useRouter();
  const [open, setOpen] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const menuId = useId();

  useEffect(() => {
    if (!open) return;
    const close = (event: PointerEvent) => {
      if (!root.current?.contains(event.target as Node)) setOpen(false);
    };
    const escape = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return;
      setOpen(false);
      root.current?.querySelector('button')?.focus();
    };
    document.addEventListener('pointerdown', close);
    document.addEventListener('keydown', escape);
    return () => {
      document.removeEventListener('pointerdown', close);
      document.removeEventListener('keydown', escape);
    };
  }, [open]);

  useEffect(() => setOpen(false), [asPath, locale]);

  const links = (
    <ul id={menuId} className={variant === 'mobile' ? undefined : 'al-language-menu'}>
      {locales.map((code) => (
        <li key={code}>
          <Link
            href={asPath}
            locale={code}
            lang={code}
            hrefLang={code}
            aria-current={code === locale ? 'true' : undefined}
          >
            {LOCALE_NAMES[code] || code}
            <span>{LOCALE_SHORT[code] || code}</span>
          </Link>
        </li>
      ))}
    </ul>
  );

  if (variant === 'mobile') {
    return (
      <nav className="al-language-list" aria-label={t('nav.language')}>
        {links}
      </nav>
    );
  }

  return (
    <div className={`al-language al-language-${variant}`} ref={root}>
      <button
        type="button"
        aria-expanded={open}
        aria-controls={menuId}
        aria-label={`${t('nav.language')}: ${LOCALE_NAMES[locale] || locale}`}
        onClick={() => setOpen(!open)}
      >
        <GlobeIcon width={16} height={16} aria-hidden="true" />
        <span>{variant === 'nav' ? LOCALE_SHORT[locale] : LOCALE_NAMES[locale]}</span>
        <ChevronDownIcon width={14} height={14} aria-hidden="true" />
      </button>
      {open && links}
    </div>
  );
}
