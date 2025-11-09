const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

const specsDir = path.join(__dirname, 'specs');
const outputJsonFile = path.join(__dirname, 'openapi.json');

const mergedSpec = {
  openapi: '3.0.4',
  info: {
    title: 'CTBZ API Documentation',
    version: '1.0.0',
    description: 'Complete API documentation'
  },
  servers: [
    {
      url: 'https://api.example.com',
      description: 'Production'
    }
  ],
  paths: {},
  components: {
    schemas: {},
    parameters: {},
    securitySchemes: {}
  }
};

const files = fs.readdirSync(specsDir).filter(f => f.endsWith('.yaml'));

console.log('Merging', files.length, 'YAML files...');

files.forEach(file => {
  const content = fs.readFileSync(path.join(specsDir, file), 'utf8');
  const spec = yaml.load(content);

  if (spec.paths) {
    Object.assign(mergedSpec.paths, spec.paths);
  }

  if (spec.components) {
    if (spec.components.schemas) {
      Object.assign(mergedSpec.components.schemas, spec.components.schemas);
    }
    if (spec.components.parameters) {
      Object.assign(mergedSpec.components.parameters, spec.components.parameters);
    }
    if (spec.components.securitySchemes) {
      Object.assign(mergedSpec.components.securitySchemes, spec.components.securitySchemes);
    }
  }
});

fs.writeFileSync(outputJsonFile, JSON.stringify(mergedSpec, null, 2));

console.log('✅ Merged specification written to openapi.json');
console.log('   Total paths:', Object.keys(mergedSpec.paths).length);
console.log('   Total schemas:', Object.keys(mergedSpec.components.schemas).length);
