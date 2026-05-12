const fs = require('fs');

function fixDuplicateClassNames(filepath) {
  let content = fs.readFileSync(filepath, 'utf8');
  // find instances of className="text-accent" ... className="text-struct"
  // just remove the second one.
  content = content.replace(/className="text-accent"([^>]+)className="text-struct"/g, 'className="text-accent"$1');
  
  // also check the other way around just in case
  content = content.replace(/className="text-struct"([^>]+)className="text-accent"/g, 'className="text-struct"$1');

  // and same for fill="currentColor" if duplicated? the error is about className.
  fs.writeFileSync(filepath, content);
  console.log('Fixed', filepath);
}

fixDuplicateClassNames('src/components/icons/EcosystemIcon.tsx');
fixDuplicateClassNames('src/components/icons/DaoaaSIcon.tsx');

