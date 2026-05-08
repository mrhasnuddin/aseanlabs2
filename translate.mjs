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

// Keys that should NOT be translated (brand names, technical terms, acronyms)
const skipKeys = new Set([
  'nav.daoaas',
  'daoaas.badge',
  'daoaas.ctaSecondary',
  'onboard.rpcUrl',
  'onboard.titleHighlight', // "ENI." - brand
  'onboard.mmStep2BodyPart2', // "Ethereum Mainnet" - brand
  'onboard.mmStep5BodyPart4', // "ENI Mainnet" - brand
  'onboard.bgStep5BodyPart4', // "ENI Mainnet" - brand
  'onboard.tpStep4BodyPart2', // "ENI Mainnet" - brand
  'onboard.tpStep5BodyPart4', // "ENI Mainnet" - brand
  'nav.twitter',
  'nav.telegram',
  'nav.linktree',
  'nav.faq',
  'nav.eniMainnet',
]);

// Tags that should keep English names (crypto/tech industry terms)
const tagKeys = Object.keys(en).filter(k => k.startsWith('ecosystem.tag.'));
for (const k of tagKeys) {
  skipKeys.add(k);
}

async function run() {
  const keys = Object.keys(en);

  for (const [locale, code] of Object.entries(langs)) {
    const filePath = 'src/locales/' + locale + '.json';
    let translatedObj = {};
    
    if (fs.existsSync(filePath)) {
      try {
        translatedObj = JSON.parse(fs.readFileSync(filePath, 'utf8'));
      } catch (e) {
        console.error('Error reading ' + filePath + ', starting fresh:', e.message);
      }
    }

    console.log('\n=== Checking translations for ' + locale + ' ===');
    let addedCount = 0;
    let skippedCount = 0;
    
    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];
      const enText = en[key];
      
      // Skip keys that shouldn't be translated
      if (skipKeys.has(key)) {
        if (!translatedObj[key]) {
          translatedObj[key] = enText; // Use English value directly
          skippedCount++;
        }
        continue;
      }
      
      // Check if key is missing OR still has same English text (untranslated)
      const currentVal = translatedObj[key];
      const isMissing = !currentVal || currentVal.trim() === '';
      const isUntranslated = currentVal === enText && enText && /[a-zA-Z]{3,}/.test(enText);
      
      if (!isMissing && !isUntranslated) {
        continue; // Already translated
      }
      
      try {
        const label = isMissing ? 'MISSING' : 'UNTRANSLATED';
        console.log('[' + label + '] Translating [' + key + ']...');
        const res = await translate(enText, { to: code, forceBatch: false });
        translatedObj[key] = res.text;
        addedCount++;
      } catch (e) {
        console.error('Error on key "' + key + '" for ' + locale + ':', e.message);
        // Fallback to English if translation fails
        translatedObj[key] = enText;
      }
      
      // Small delay to avoid rate limiting
      if (addedCount % 5 === 0 && addedCount > 0) {
        await new Promise(resolve => setTimeout(resolve, 800));
      }
    }
    
    // Ensure the order matches en.json
    const finalObj = {};
    for (const key of keys) {
      finalObj[key] = translatedObj[key] || en[key];
    }
    
    fs.writeFileSync(filePath, JSON.stringify(finalObj, null, 2));
    console.log('Finished ' + locale + ' (' + addedCount + ' translated, ' + skippedCount + ' kept as-is)');
  }
  
  console.log('\n=== All translations complete! ===');
}

run();
