import { useRouter } from 'next/router';
import en from '@/locales/en.json';
import ms from '@/locales/ms.json';
import id from '@/locales/id.json';
import zhTW from '@/locales/zh-TW.json';
import zhCN from '@/locales/zh-CN.json';
import vi from '@/locales/vi.json';
import ja from '@/locales/ja.json';
import ko from '@/locales/ko.json';

const dictionaries: Record<string, Record<string, string>> = {
  en,
  ms,
  id,
  'zh-TW': zhTW,
  'zh-CN': zhCN,
  vi,
  ja,
  ko,
};

export const LOCALE_NAMES: Record<string, string> = {
  en: 'English',
  ms: 'Bahasa Melayu',
  id: 'Bahasa Indonesia',
  'zh-TW': '繁體中文',
  'zh-CN': '简体中文',
  vi: 'Tiếng Việt',
  ja: '日本語',
  ko: '한국어',
};

export const LOCALE_FLAGS: Record<string, string> = {
  en: '🇬🇧',
  ms: '🇲🇾',
  id: '🇮🇩',
  'zh-TW': '🇹🇼',
  'zh-CN': '🇨🇳',
  vi: '🇻🇳',
  ja: '🇯🇵',
  ko: '🇰🇷',
};

export function useTranslation() {
  const { locale = 'en' } = useRouter();
  const dict = dictionaries[locale] || dictionaries.en;

  function t(key: string): string {
    return dict[key] || dictionaries.en[key] || key;
  }

  return { t, locale };
}
