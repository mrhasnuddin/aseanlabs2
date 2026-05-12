import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Globe, ChevronDown } from 'lucide-react';
import { LOCALE_NAMES, LOCALE_SHORT, LOCALE_FLAGS } from '@/hooks/useTranslation';

interface Props {
  variant?: 'nav' | 'footer' | 'mobile';
}

export function LanguageSwitcher({ variant = 'nav' }: Props) {
  const router = useRouter();
  const { pathname, asPath, query, locale = 'en', locales = [] } = router;
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const changeLanguage = (nextLocale: string) => {
    setIsOpen(false);
    router.push({ pathname, query }, asPath, { locale: nextLocale });
  };

  if (variant === 'mobile') {
    return (
      <div className="flex flex-col gap-3 mt-4">
        <span className="font-mono text-xs font-bold uppercase tracking-widest text-foreground/50">Language</span>
        <div className="grid grid-cols-2 gap-2">
          {locales.map((loc) => (
            <button
              key={loc}
              onClick={() => changeLanguage(loc)}
              className={`flex items-center justify-between border-2 px-3 py-2 text-left font-mono text-sm font-bold transition-colors ${
                loc === locale
                  ? 'border-ink bg-ink text-canvas'
                  : 'border-ink/20 text-ink hover:border-ink hover:bg-ink/5'
              }`}
            >
              <span>{LOCALE_SHORT[loc] || loc.toUpperCase()}</span>
              <span>{LOCALE_FLAGS[loc]}</span>
            </button>
          ))}
        </div>
      </div>
    );
  }

  // Desktop (Nav & Footer) — compact initials in button, full names in dropdown
  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`inline-flex items-center justify-center gap-2 border-2 px-4 py-2 font-mono text-sm font-bold uppercase tracking-widest transition-colors duration-0 ${
          variant === 'footer'
            ? 'border-struct bg-transparent text-struct hover:bg-struct hover:text-canvas'
            : 'border-ink bg-transparent text-ink hover:bg-ink hover:text-canvas'
        }`}
      >
        <Globe size={14} />
        <span>{LOCALE_SHORT[locale] || locale.toUpperCase()}</span>
        <ChevronDown size={14} className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div 
          className={`absolute ${variant === 'footer' ? 'bottom-full mb-2' : 'top-full mt-2'} right-0 z-50 w-48 border-2 bg-background shadow-[4px_4px_0_0_#000] ${
            variant === 'footer' ? 'border-struct' : 'border-ink'
          }`}
        >
          <div className="flex flex-col py-1">
            {locales.map((loc) => (
              <button
                key={loc}
                onClick={() => changeLanguage(loc)}
                className={`flex w-full items-center justify-between px-4 py-2 text-left font-mono text-sm font-bold transition-colors ${
                  loc === locale
                    ? 'bg-ink text-canvas'
                    : 'text-ink hover:bg-ink/5'
                }`}
              >
                <span>{LOCALE_NAMES[loc] || loc.toUpperCase()}</span>
                <span className="text-base">{LOCALE_FLAGS[loc]}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
