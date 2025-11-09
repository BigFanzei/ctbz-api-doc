import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const specsDir = path.join(__dirname, 'client/public/specs');
const outputFilePublic = path.join(__dirname, 'client/public/openapi.yaml');
const outputFileSrc = path.join(__dirname, 'client/src/openapi.yaml');

// 读取所有YAML文件
const files = fs.readdirSync(specsDir).filter(f => f.endsWith('.yaml'));

console.log(`Found ${files.length} YAML files:`);
files.forEach(f => console.log(`  - ${f}`));

// 合并规范
const mergedSpec = {
  openapi: '3.0.4',
  info: {
    title: 'Complete API Documentation',
    version: '1.0.0',
    description: '完整的API文档，包含所有端点和模型定义'
  },
  servers: [
    { url: 'https://api.example.com', description: 'Production' },
    { url: 'https://sandbox.api.example.com', description: 'Sandbox' }
  ],
  security: [{ ApiKeyAuth: [] }],
  paths: {},
  components: {
    schemas: {},
    parameters: {},
    securitySchemes: {
      ApiKeyAuth: {
        type: 'apiKey',
        in: 'header',
        name: 'Authorization'
      }
    }
  },
  tags: []
};

const tagSet = new Set();

// 合并每个文件
files.forEach(file => {
  const content = fs.readFileSync(path.join(specsDir, file), 'utf8');
  const spec = yaml.load(content);

  // 从文件名生成 tag 名称（去掉 .yaml 后缀，保持 camelCase）
  const tagName = file.replace('.yaml', '');

  // 生成显示名称（首字母大写，在大写字母前添加空格）
  const displayName = tagName
    .replace(/([A-Z])/g, ' $1')
    .trim()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  // 合并paths，并为每个操作添加 tag
  if (spec.paths && Object.keys(spec.paths).length > 0) {
    // 只有当文件包含 paths 时才添加 tag 定义
    const tagDescription = spec.info?.description || `${displayName} related APIs`;
    tagSet.add(JSON.stringify({
      name: tagName,  // 使用 camelCase 作为 tag name
      description: tagDescription,
      'x-displayName': displayName  // 使用 Title Case 作为显示名称
    }));

    Object.keys(spec.paths).forEach(pathKey => {
      const pathItem = spec.paths[pathKey];
      // 为每个 HTTP 方法添加 tag
      ['get', 'post', 'put', 'patch', 'delete', 'options', 'head'].forEach(method => {
        if (pathItem[method]) {
          if (!pathItem[method].tags) {
            pathItem[method].tags = [];
          }
          if (!pathItem[method].tags.includes(tagName)) {
            pathItem[method].tags.push(tagName);
          }
        }
      });
    });
    Object.assign(mergedSpec.paths, spec.paths);
  }

  // 合并components
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

  // 收集tags（保留原有的 tags）
  if (spec.tags) {
    spec.tags.forEach(tag => tagSet.add(JSON.stringify(tag)));
  }
});

// 添加tags
mergedSpec.tags = Array.from(tagSet).map(t => JSON.parse(t));

// 写入合并后的文件到两个位置
const yamlContent = yaml.dump(mergedSpec, { lineWidth: -1 });
fs.writeFileSync(outputFilePublic, yamlContent);
fs.writeFileSync(outputFileSrc, yamlContent);

console.log(`\n✅ Merged specification written to:`);
console.log(`   - ${outputFilePublic}`);
console.log(`   - ${outputFileSrc}`);
console.log(`   Total paths: ${Object.keys(mergedSpec.paths).length}`);
console.log(`   Total schemas: ${Object.keys(mergedSpec.components.schemas).length}`);
console.log(`   Total tags: ${mergedSpec.tags.length}`);
