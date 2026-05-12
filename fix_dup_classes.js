const fs = require('fs');

const file = 'src/components/icons/NetworkIcons.tsx';
let content = fs.readFileSync(file, 'utf8');

// The duplicate classNames are like:
// className="text-struct" stroke="currentColor" className="text-canvas"
// We want to change it to:
// className="text-struct stroke-canvas"

let newContent = content.replace(/className="([^"]+)"\s+stroke="currentColor"\s+className="([^"]+)"/g, (match, class1, class2) => {
  // class1 is text-struct, class2 is text-canvas
  // or vice versa
  const strokeColor = class2.replace('text-', 'stroke-');
  return `className="${class1} ${strokeColor}"`;
});

// Also check for the reverse if any:
// stroke="currentColor" className="text-canvas" ... wait, the regex above handles the exact sequence.
// Let's just do a more generic replace if needed, but looking at the file it's exactly:
// className="text-struct" stroke="currentColor" className="text-canvas"
// or
// className="text-canvas" stroke="currentColor" className="text-struct"

if (content !== newContent) {
  fs.writeFileSync(file, newContent);
  console.log('Fixed duplicate classNames in NetworkIcons.tsx');
} else {
  console.log('No duplicate classNames found or regex mismatch');
}
