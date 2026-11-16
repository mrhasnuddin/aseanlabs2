import mappings from '@/data/intake-form.json';

const GOOGLE_INTAKE_URL = 'https://docs.google.com/forms/d/e/1FAIpQLSdi2NrjmdITggC4djT0CuFu_F1FPt1rE0M5Rvyji4P0SwsjTw/viewform';
export type IntakePackage = keyof typeof mappings.en.packages;

// Public question IDs and exact option values verified against the owner's form.
// Traditional Chinese uses the form's Simplified Chinese branch; Japanese and
// Korean fall back to English because the form has no matching branches.
// The link opens the form on the visitor's language, with a package ticked when one is given.
export function buildIntakeUrl(locale: string, pkg?: IntakePackage) {
  const key = locale === 'zh-TW' ? 'zh-CN' : locale;
  const mapping = mappings[key as keyof typeof mappings] || mappings.en;
  const url = new URL(GOOGLE_INTAKE_URL);
  url.searchParams.set('usp', 'pp_url');
  url.searchParams.set('entry.43636121', mapping.language);
  if (pkg) url.searchParams.set(mapping.packageField, mapping.packages[pkg]);
  return url.toString();
}
