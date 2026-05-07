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

  for (const [locale, code] of Object.entries(langs)) {
    const filePath = `src/locales/${locale}.json`;
    let translatedObj = {};
    
    if (fs.existsSync(filePath)) {
      try {
        translatedObj = JSON.parse(fs.readFileSync(filePath, 'utf8'));
      } catch (e) {
        console.error(`Error reading ${filePath}, starting fresh:`, e.message);
      }
    }

    console.log(`Checking translations for ${locale}...`);
    let addedCount = 0;
    
    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];
      const text = en[key];
      
      // Skip if key already exists and is not empty
      if (translatedObj[key] && translatedObj[key].trim() !== '') {
        continue;
      }
      
      try {
        console.log(`Translating [${key}]...`);
        const res = await translate(text, { to: code, forceBatch: false });
        translatedObj[key] = res.text;
        addedCount++;
      } catch (e) {
        console.error(`Error on key "${key}" for ${locale}:`, e.message);
        // Fallback to English if translation fails
        translatedObj[key] = text;
      }
      
      // Small delay to avoid rate limiting
      if (addedCount % 5 === 0 && addedCount > 0) {
         await new Promise(resolve => setTimeout(resolve, 500));
      }
    }
    
    // Ensure the order matches en.json
    const finalObj = {};
    for (const key of keys) {
      finalObj[key] = translatedObj[key] || en[key];
    }
    
    fs.writeFileSync(filePath, JSON.stringify(finalObj, null, 2));
    console.log(`Finished ${locale} (${addedCount} keys added)`);
  }
}

run();
