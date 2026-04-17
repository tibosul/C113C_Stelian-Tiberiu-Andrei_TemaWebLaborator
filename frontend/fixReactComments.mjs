import fs from 'fs';

const reactFile = './src/pages/LandingPage.tsx';

let content = fs.readFileSync(reactFile, 'utf8');

// Replace standard HTML comments with JSX comments
content = content.replace(/<!--([\s\S]*?)-->/g, '{/*$1*/}');

fs.writeFileSync(reactFile, content);
console.log('Fixed comments!');
