const fs = require('fs');
let content = fs.readFileSync('components/hero/HeroSection.tsx', 'utf8');
content = content.replace(/\\\`/g, '`').replace(/\\\$/g, '$');
fs.writeFileSync('components/hero/HeroSection.tsx', content);
