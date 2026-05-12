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
  { regex: /bg-\[#F4BF4B\]/g, replacement: 'bg-canvas' },
  { regex: /text-\[#F4BF4B\]/g, replacement: 'text-canvas' },
  { regex: /border-\[#F4BF4B\]/g, replacement: 'border-canvas' },
  
  { regex: /bg-\[#000000\]/g, replacement: 'bg-struct' },
  { regex: /text-\[#000000\]/g, replacement: 'text-struct' },
  { regex: /border-\[#000000\]/g, replacement: 'border-struct' },
  { regex: /ring-\[#000000\]/g, replacement: 'ring-struct' },
  
  { regex: /bg-black/g, replacement: 'bg-struct' },
  { regex: /text-black/g, replacement: 'text-struct' },
  { regex: /border-black/g, replacement: 'border-struct' },
  { regex: /ring-black/g, replacement: 'ring-struct' },
  
  { regex: /bg-\[#00E5FF\]/g, replacement: 'bg-accent' },
  { regex: /text-\[#00E5FF\]/g, replacement: 'text-accent' },
  { regex: /border-\[#00E5FF\]/g, replacement: 'border-accent' },
  
  { regex: /bg-white/g, replacement: 'bg-relief' },
  { regex: /text-white/g, replacement: 'text-relief' },
  { regex: /border-white/g, replacement: 'border-relief' },
  
  { regex: /bg-\[#FFFFFF\]/g, replacement: 'bg-relief' },
  { regex: /text-\[#FFFFFF\]/g, replacement: 'text-relief' },
  { regex: /border-\[#FFFFFF\]/g, replacement: 'border-relief' },

  { regex: /bg-\[#EAEAEA\]/g, replacement: 'bg-canvas' },
  { regex: /text-\[#EAEAEA\]/g, replacement: 'text-canvas' },

  { regex: /bg-\[#0F172A\]/g, replacement: 'bg-struct' },
  { regex: /text-\[#0F172A\]/g, replacement: 'text-struct' },

  { regex: /bg-\[#D9F844\]/g, replacement: 'bg-accent' },
  { regex: /text-\[#D9F844\]/g, replacement: 'text-accent' },

  // Exceptions where we still want literal black/white/colors
  // We can skip brand.tsx since it defines the presets explicitly
];

walk(dir, function(filePath) {
  if (filePath.endsWith('.tsx') || filePath.endsWith('.ts')) {
    if (filePath.includes('brand.tsx')) return; // Already refactored and has literal colors in PRESETS
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
