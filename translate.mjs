import fs from 'fs';
import translate from 'google-translate-api-x';

const en = JSON.parse(fs.readFileSync('src/locales/en.json', 'utf8'));
const langs = {
  ms: 'ms',
  id: 'id',
  'zh-CN': 'zh-CN',
  'zh-TW': 'zh-TW',
  vi: 'vi',
  ja: 'ja',
  ko: 'ko'
};

async function run() {
  const keys = Object.keys(en);
  const values = Object.values(en);

  for (const [locale, code] of Object.entries(langs)) {
    console.log(`Translating to ${locale}...`);
    try {
      const translatedObj = {};
      
      for (let i = 0; i < values.length; i++) {
        const text = values[i];
        const key = keys[i];
        
        try {
          const res = await translate(text, { to: code, forceBatch: false });
          translatedObj[key] = res.text;
        } catch (e) {
          console.error(`Error on key "${key}" for ${locale}:`, e.message);
          // Fallback to English if translation fails
          translatedObj[key] = text;
        }
        
        // Small delay to avoid rate limiting
        if (i % 5 === 0) {
           await new Promise(resolve => setTimeout(resolve, 500));
        }
      }
      
      fs.writeFileSync(`src/locales/${locale}.json`, JSON.stringify(translatedObj, null, 2));
      console.log(`Finished ${locale}`);
    } catch (e) {
      console.error(`Fatal error translating ${locale}:`, e.message);
    }
  }
}

run();
