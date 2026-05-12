const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'src');

function walk(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? walk(dirPath, callback) : callback(path.join(dir, f));
  });
}

const replacements = [
  // SVG Fills
  { regex: /fill="#F4BF4B"/g, replacement: 'fill="currentColor" className="text-canvas"' },
  { regex: /fill="#00E5FF"/g, replacement: 'fill="currentColor" className="text-accent"' },
  { regex: /fill="#000000"/g, replacement: 'fill="currentColor" className="text-struct"' },
  { regex: /stroke="#000000"/g, replacement: 'stroke="currentColor" className="text-struct"' },
  { regex: /stroke="black"/g, replacement: 'stroke="currentColor" className="text-struct"' },
  
  // Inline Styles in TSX
  { regex: /'#F4BF4B'/g, replacement: "'var(--color-canvas)'" },
  { regex: /'#000000'/g, replacement: "'var(--color-struct)'" },
  { regex: /'#000'/g, replacement: "'var(--color-struct)'" },
  { regex: /'#00E5FF'/g, replacement: "'var(--color-accent)'" },
  { regex: /'#00ccff'/g, replacement: "'var(--color-accent)'" },

  // Tailwind shadows
  { regex: /shadow-\[([^\]]+)_#F4BF4B\]/g, replacement: 'shadow-[$1_var(--color-canvas)]' },
  { regex: /shadow-\[([^\]]+)_#000000\]/g, replacement: 'shadow-[$1_var(--color-struct)]' },

  // Border left/right/top/bottom colors in Tailwind
  { regex: /border-l-\[#F4BF4B\]/g, replacement: 'border-l-canvas' },
  { regex: /border-r-\[#F4BF4B\]/g, replacement: 'border-r-canvas' },
  { regex: /border-t-\[#F4BF4B\]/g, replacement: 'border-t-canvas' },
  { regex: /border-b-\[#F4BF4B\]/g, replacement: 'border-b-canvas' },
];

walk(dir, function(filePath) {
  if (filePath.endsWith('.tsx') || filePath.endsWith('.ts')) {
    if (filePath.includes('brand.tsx')) return; 
    if (filePath.includes('globals.css')) return;

    let originalContent = fs.readFileSync(filePath, 'utf8');
    let content = originalContent;

    replacements.forEach(r => {
      content = content.replace(r.regex, r.replacement);
    });

    if (content !== originalContent) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log('Updated: ', filePath);
    }
  }
});
