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
  },
  tags: []
};

const files = fs.readdirSync(specsDir).filter(f => f.endsWith('.yaml'));

console.log('Merging', files.length, 'YAML files...');

files.forEach(file => {
  const content = fs.readFileSync(path.join(specsDir, file), 'utf8');
  const spec = yaml.load(content);

  // Get tag name from filename (without .yaml extension)
  const tagName = file.replace('.yaml', '');

  // Add tag definition
  mergedSpec.tags.push({
    name: tagName,
    description: `APIs from ${file}`
  });

  // Add tag to all operations in this file's paths
  if (spec.paths) {
    Object.keys(spec.paths).forEach(pathKey => {
      const pathItem = spec.paths[pathKey];

      // Add tag to each HTTP method
      ['get', 'post', 'put', 'patch', 'delete', 'options', 'head'].forEach(method => {
        if (pathItem[method]) {
          if (!pathItem[method].tags) {
            pathItem[method].tags = [];
          }
          pathItem[method].tags.push(tagName);
        }
      });
    });

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
console.log('   Total tags:', mergedSpec.tags.length);
