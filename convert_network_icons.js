const fs = require('fs');
const path = require('path');

const svgDir = path.join(__dirname, 'public', 'network arch');
const outPath = path.join(__dirname, 'src', 'components', 'icons', 'NetworkIcons.tsx');

const files = fs.readdirSync(svgDir).filter(f => f.endsWith('.svg'));

let outCode = `import React from 'react';\n\n`;

for (const file of files) {
  const compName = file.replace('.svg', '').replace(/[^a-zA-Z0-9]/g, '');
  const TitleCaseName = compName.charAt(0).toUpperCase() + compName.slice(1) + 'Icon';
  
  let content = fs.readFileSync(path.join(svgDir, file), 'utf8');
  
  // Basic cleanup to JSX
  content = content.replace(/xmlns:xlink/g, 'xmlnsXlink');
  content = content.replace(/xlink:href/g, 'xlinkHref');
  content = content.replace(/fill-rule/g, 'fillRule');
  content = content.replace(/clip-rule/g, 'clipRule');
  content = content.replace(/stroke-width/g, 'strokeWidth');
  content = content.replace(/stroke-linecap/g, 'strokeLinecap');
  content = content.replace(/stroke-linejoin/g, 'strokeLinejoin');
  content = content.replace(/stroke-miterlimit/g, 'strokeMiterlimit');
  content = content.replace(/stroke-dasharray/g, 'strokeDasharray');
  content = content.replace(/stroke-dashoffset/g, 'strokeDashoffset');
  content = content.replace(/fill-opacity/g, 'fillOpacity');
  content = content.replace(/stroke-opacity/g, 'strokeOpacity');
  content = content.replace(/class=/g, 'className=');
  
  // Replace colors with semantic classes
  content = content.replace(/fill="#F4BF4B"/gi, 'fill="currentColor" className="text-canvas"');
  content = content.replace(/fill="black"/gi, 'fill="currentColor" className="text-struct"');
  content = content.replace(/stroke="#F4BF4B"/gi, 'stroke="currentColor" className="text-canvas"');
  content = content.replace(/stroke="black"/gi, 'stroke="currentColor" className="text-struct"');
  
  // Make viewBox responsive
  content = content.replace(/<svg\s+width="[^"]*"\s+height="[^"]*"/g, '<svg width="100%" height="100%" className={className}');
  
  // Handle other attributes
  content = content.replace(/<svg ([^>]*)>/, `<svg $1 {...props}>`);
  
  outCode += `export const ${TitleCaseName} = ({ className, ...props }: React.SVGProps<SVGSVGElement>) => (\n  ${content.trim()}\n);\n\n`;
}

fs.writeFileSync(outPath, outCode);
console.log('Created NetworkIcons.tsx');
