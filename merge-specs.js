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
  paths: {
    '/': {
      get: {
        summary: 'API Overview',
        description: 'Welcome to CTBZ API Documentation',
        tags: ['Overview'],
        responses: {
          '200': {
            description: 'API Information'
          }
        }
      }
    }
  },
  components: {
    schemas: {},
    parameters: {},
    securitySchemes: {}
  }
};

const tagMap = new Map();
const files = fs.readdirSync(specsDir).filter(f => f.endsWith('.yaml')).sort();

console.log('Merging', files.length, 'YAML files...');

files.forEach(file => {
  const content = fs.readFileSync(path.join(specsDir, file), 'utf8');
  const spec = yaml.load(content);

  // Get tag name from filename (without .yaml extension)
  const tagName = file.replace('.yaml', '');

  // Store tag info for later
  tagMap.set(tagName, {
    name: tagName,
    description: `APIs from ${file}`
  });

  // Add tag to all operations in this file's paths
  if (spec.paths) {
    Object.keys(spec.paths).forEach(pathKey => {
      // Clone the path item to avoid mutations
      const pathItem = JSON.parse(JSON.stringify(spec.paths[pathKey]));

      // Replace tags with filename-based tag for each HTTP method
      ['get', 'post', 'put', 'patch', 'delete', 'options', 'head'].forEach(method => {
        if (pathItem[method]) {
          // Completely replace tags array with only our filename-based tag
          delete pathItem[method].tags;
          pathItem[method].tags = [tagName];
        }
      });

      mergedSpec.paths[pathKey] = pathItem;
    });
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

// Add tags array at the end, but only include tags that have operations
const tagsWithOps = [];
tagMap.forEach((tag, tagName) => {
  // Count operations with this tag
  let count = 0;
  Object.keys(mergedSpec.paths).forEach(pathKey => {
    const pathItem = mergedSpec.paths[pathKey];
    ['get', 'post', 'put', 'patch', 'delete', 'options', 'head'].forEach(method => {
      if (pathItem[method] && pathItem[method].tags && pathItem[method].tags.includes(tagName)) {
        count++;
      }
    });
  });

  // Only add tag if it has at least one operation
  if (count > 0) {
    tagsWithOps.push(tag);
  } else {
    console.log(`   ⚠️  Skipping tag "${tagName}" (0 operations)`);
  }
});

// Add an "Overview" tag at position 0 to handle Redoc's off-by-one issue
const overviewTag = {
  name: 'Overview',
  description: 'API Documentation Overview'
};

// Insert Overview at the beginning
mergedSpec.tags = [overviewTag, ...tagsWithOps];

// Add x-tagGroups to explicitly control Redoc navigation order
mergedSpec['x-tagGroups'] = [
  {
    name: 'Getting Started',
    tags: ['Overview']
  },
  {
    name: 'API Endpoints',
    tags: tagsWithOps.map(t => t.name)
  }
];

fs.writeFileSync(outputJsonFile, JSON.stringify(mergedSpec, null, 2));

console.log('✅ Merged specification written to openapi.json');
console.log('   Total paths:', Object.keys(mergedSpec.paths).length);
console.log('   Total schemas:', Object.keys(mergedSpec.components.schemas).length);
console.log('   Total tags:', mergedSpec.tags.length);
