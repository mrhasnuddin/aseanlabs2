const fs = require('fs');

function removeDuplicateAttrs(filepath) {
  let content = fs.readFileSync(filepath, 'utf8');
  
  // replace duplicate className
  content = content.replace(/ className="([^"]+)"(.*?)\s+className="([^"]+)"/g, ' className="$1 $3"$2');
  content = content.replace(/ className='([^']+)'(.*?)\s+className='([^']+)'/g, ' className=\'$1 $3\'$2');

  // replace duplicate fill
  content = content.replace(/ fill="([^"]+)"(.*?)\s+fill="([^"]+)"/g, ' fill="$1"$2');
  
  // replace duplicate stroke
  content = content.replace(/ stroke="([^"]+)"(.*?)\s+stroke="([^"]+)"/g, ' stroke="$1"$2');

  fs.writeFileSync(filepath, content);
  console.log('Fixed', filepath);
}

removeDuplicateAttrs('src/components/FoundationSection.tsx');
removeDuplicateAttrs('src/components/icons/DaoaaSIcon.tsx');
removeDuplicateAttrs('src/components/icons/EcosystemIcon.tsx');
removeDuplicateAttrs('src/components/icons/TokenIcon.tsx');
