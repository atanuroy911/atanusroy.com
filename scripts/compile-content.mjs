import { readdirSync, readFileSync, writeFileSync } from 'fs';
import { join } from 'path';
import yaml from 'js-yaml';

const LOCALES = ['en', 'bn'];
const contentData = {};

for (const locale of LOCALES) {
  const localeDir = join(process.cwd(), 'content', locale);
  
  const readYamlDir = (dirName) => {
    const dirPath = join(localeDir, dirName);
    try {
      const files = readdirSync(dirPath).filter((f) => f.endsWith('.yaml'));
      let merged = {};
      for (const file of files) {
        const fileContent = yaml.load(readFileSync(join(dirPath, file), 'utf8'));
        merged = { ...merged, ...fileContent };
      }
      return merged;
    } catch (e) {
      console.warn(`Warning: Could not read directory ${dirPath}`, e.message);
      return {};
    }
  };
  
  const common = readYamlDir('common');
  const academic = readYamlDir('academic');
  const developer = readYamlDir('developer');
  
  contentData[locale] = {
    ...common,
    academic,
    developer
  };
}

const outputPath = join(process.cwd(), 'src', 'lib', 'content-data.json');
writeFileSync(outputPath, JSON.stringify(contentData, null, 2), 'utf8');
console.log(`Successfully compiled content YAMLs into ${outputPath}`);
