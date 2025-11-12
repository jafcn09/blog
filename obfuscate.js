const fs = require('fs');
const path = require('path');
const JavaScriptObfuscator = require('javascript-obfuscator');

const buildDir = path.join(__dirname, 'build');
const jsFiles = [];

function findJSFiles(dir) {
  const files = fs.readdirSync(dir);

  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      findJSFiles(filePath);
    } else if (file.endsWith('.js')) {
      jsFiles.push(filePath);
    }
  });
}


function obfuscateFile(filePath) {
  try {
    const code = fs.readFileSync(filePath, 'utf8');

    const obfuscated = JavaScriptObfuscator.obfuscate(code, {
      compact: true,
      controlFlowFlattening: true,
      deadCodeInjection: true,
      debugProtection: true,
      debugProtectionInterval: true,
      disableConsoleOutput: true,
      identifierNamesGenerator: 'hexadecimal',
      log: false,
      renameGlobals: false,
      rotateStringArray: true,
      selfDefending: true,
      stringArray: true,
      stringArrayEncoding: ['base64'],
      stringArrayThreshold: 0.75,
      unicodeEscapeSequence: false
    }).obfuscatedCode;

    fs.writeFileSync(filePath, obfuscated, 'utf8');
    console.log(`✓ Ofuscado: ${filePath}`);
  } catch (error) {
    console.error(`✗ Error ofuscando ${filePath}:`, error.message);
  }
}


if (fs.existsSync(buildDir)) {
 
  findJSFiles(buildDir);

  if (jsFiles.length > 0) {
    jsFiles.forEach(file => obfuscateFile(file));
   
  } else {

  }
} else {
  console.error('El directorio build no existe. Ejecuta npm run build primero.');
  process.exit(1);
}