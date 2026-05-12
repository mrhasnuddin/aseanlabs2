const fs = require('fs');
const path = require('path');

const localesDir = path.join(__dirname, 'src', 'locales');
const en = require(path.join(localesDir, 'en.json'));
const zhCNPath = path.join(localesDir, 'zh-CN.json');
const zhCN = require(zhCNPath);

let missing = [];
for (const key in en) {
  if (!zhCN[key]) {
    missing.push(key);
  }
}

console.log("Missing keys:");
missing.forEach(k => console.log(k));
