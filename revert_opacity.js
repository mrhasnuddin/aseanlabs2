const fs = require('fs');
const path = require('path');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(file));
    } else if (file.endsWith('.tsx')) {
      results.push(file);
    }
  });
  return results;
}

const files = walk(path.join(__dirname, 'src'));

// We want to revert `[prefix]-[color] opacity-[val]` back to `[prefix]-[color]/[val]`
// Example: text-canvas opacity-80 -> text-canvas/80
const regexRevert = /(text|border|bg|divide)-(canvas|struct|accent|relief|background|foreground)\s+opacity-([0-9]+)/g;

let changedCount = 0;

for (const file of files) {
  let content = fs.readFileSync(file, 'utf8');
  let newContent = content.replace(regexRevert, (match, type, color, opacity) => {
    return `${type}-${color}/${opacity}`;
  });

  if (content !== newContent) {
    fs.writeFileSync(file, newContent);
    changedCount++;
    console.log(`Reverted ${file}`);
  }
}

console.log(`Total files reverted: ${changedCount}`);
