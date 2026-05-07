import fs from 'fs';
import translate from 'google-translate-api-x';

const en = JSON.parse(fs.readFileSync('src/locales/en.json', 'utf8'));
const locale = 'zh-TW';
const code = 'zh-TW';

async function run() {
  const keys = Object.keys(en);
  const values = Object.values(en);

  console.log(`Translating to ${locale}...`);
  try {
    const translatedObj = {};
    const chunkSize = 1; // Process one by one to avoid any batch issues
    for (let i = 0; i < values.length; i += chunkSize) {
      const chunk = values.slice(i, i + chunkSize);
      try {
        const res = await translate(chunk, { to: code, forceBatch: false });
        chunk.forEach((_, idx) => {
          const absoluteIdx = i + idx;
          const key = keys[absoluteIdx];
          translatedObj[key] = res[idx] ? res[idx].text : chunk[idx];
        });
      } catch (e) {
        console.error(`Error on chunk ${i}:`, e.message);
        // Fallback to original
        chunk.forEach((_, idx) => {
          const absoluteIdx = i + idx;
          const key = keys[absoluteIdx];
          translatedObj[key] = chunk[idx];
        });
      }
    }
    
    fs.writeFileSync(`src/locales/${locale}.json`, JSON.stringify(translatedObj, null, 2));
    console.log(`Finished ${locale}`);
  } catch (e) {
    console.error(`Error translating ${locale}:`, e.message);
  }
}

run();
