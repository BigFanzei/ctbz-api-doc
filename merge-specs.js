const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

const specsDir = path.join(__dirname, 'specs');
const outputYamlFile = path.join(__dirname, 'openapi.yaml');
const outputJsonFile = path.join(__dirname, 'openapi.json');

// Initialize the base OpenAPI structure
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

// Read all YAML files
const files = fs.readdirSync(specsDir).filter(f => f.endsWith('.yaml'));

console.log('Merging', files.length, 'YAML files...');

files.forEach(file => {
  const content = fs.readFileSync(path.join(specsDir, file), 'utf8');
  const spec = yaml.load(content);

  // Merge paths
  if (spec.paths) {
    Object.assign(mergedSpec.paths, spec.paths);
  }

  // Merge components
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

// Write output files
fs.writeFileSync(outputYamlFile, yaml.dump(mergedSpec, { lineWidth: -1 }));
fs.writeFileSync(outputJsonFile, JSON.stringify(mergedSpec, null, 2));

console.log('✅ Merged specification written to:');
console.log('   - openapi.yaml');
console.log('   - openapi.json');
console.log('   Total paths:', Object.keys(mergedSpec.paths).length);
console.log('   Total schemas:', Object.keys(mergedSpec.components.schemas).length);
