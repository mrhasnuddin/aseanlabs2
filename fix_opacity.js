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

const regexText = /(text|border|bg|divide)-(canvas|struct|accent|relief|background|foreground)\/([0-9]+)/g;

let changedCount = 0;

for (const file of files) {
  let content = fs.readFileSync(file, 'utf8');
  let newContent = content.replace(regexText, (match, type, color, opacity) => {
    // If it's a background or border, we might not want to apply opacity- to the whole element.
    // However, tailwind color opacities like bg-canvas/10 make the background semi-transparent.
    // Wait, if it's text- or border-, using opacity- works fine for text, but border- opacity doesn't exist separately (opacity- applies to the whole element).
    // Actually, tailwind has text-opacity-[val], bg-opacity-[val], border-opacity-[val] which are DEPRECATED in v3 but might still work? No, they set the variable --tw-text-opacity which doesn't help if the color is a hex code!
    // If the color is a hex code, `color: #F4BF4B` ignores `--tw-text-opacity` completely.
    // So the ONLY way is `opacity-[val]` which makes the WHOLE element transparent.
    // Let's just do `opacity-[val]` for all of them. It's better than invisible text!
    return `${type}-${color} opacity-${opacity}`;
  });

  if (content !== newContent) {
    fs.writeFileSync(file, newContent);
    changedCount++;
    console.log(`Updated ${file}`);
  }
}

console.log(`Total files updated: ${changedCount}`);
