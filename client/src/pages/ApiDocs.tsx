import SwaggerUI from 'swagger-ui-react';
import 'swagger-ui-react/swagger-ui.css';
import { openapiSpec } from '../openapi-spec';
import { useEffect, useState } from 'react';

// 将 camelCase 或 kebab-case 转换为 Title Case（用于匹配 OpenAPI tags）
function normalizeTagName(tag: string): string {
  // 将 camelCase 转换为带空格的形式：virtualAccount -> Virtual Account
  return tag
    .replace(/([A-Z])/g, ' $1') // 在大写字母前添加空格
    .trim()
    .split(/[\s-_]+/) // 按空格、横线、下划线分割
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
}

// 根据标签过滤OpenAPI规范
function filterSpecByTag(spec: any, tag: string | null) {
  if (!tag || !spec) {
    return spec;
  }

  // 深拷贝spec以避免修改原始对象
  const filteredSpec = JSON.parse(JSON.stringify(spec));

  if (!filteredSpec.paths) {
    return filteredSpec;
  }

  // 标准化tag名称：将 camelCase 转换为 Title Case
  const normalizedTag = normalizeTagName(tag);

  // 过滤路径：只保留包含指定 tag 的操作
  const filteredPaths: any = {};

  Object.keys(filteredSpec.paths).forEach((path) => {
    const pathItem = filteredSpec.paths[path];
    const filteredPathItem: any = {};
    let hasMatchingOperation = false;

    // 检查每个 HTTP 方法
    ['get', 'post', 'put', 'patch', 'delete', 'options', 'head'].forEach((method) => {
      const operation = pathItem[method];
      if (operation && operation.tags) {
        // 检查操作的 tags 数组中是否包含匹配的 tag
        if (operation.tags.includes(normalizedTag)) {
          filteredPathItem[method] = operation;
          hasMatchingOperation = true;
        }
      }
    });

    // 保留 parameters 等路径级别的属性
    if (hasMatchingOperation) {
      if (pathItem.parameters) {
        filteredPathItem.parameters = pathItem.parameters;
      }
      filteredPaths[path] = filteredPathItem;
    }
  });

  filteredSpec.paths = filteredPaths;

  // 只保留匹配的 tag 定义
  if (filteredSpec.tags) {
    filteredSpec.tags = filteredSpec.tags.filter((t: any) => t.name === normalizedTag);
  }

  return filteredSpec;
}

export default function ApiDocs() {
  const [currentTag, setCurrentTag] = useState<string | null>(null);
  const [filteredSpec, setFilteredSpec] = useState<any>(openapiSpec);

  useEffect(() => {
    // 从URL hash中提取标签
    const extractTagFromHash = () => {
      const hash = window.location.hash;
      // 匹配 #/tag/xxx 格式（Swagger UI使用的格式）
      const tagMatch = hash.match(/#\/tag\/([^/]+)/);
      return tagMatch ? tagMatch[1] : null;
    };

    const updateSpec = () => {
      const tag = extractTagFromHash();
      setCurrentTag(tag);
      setFilteredSpec(filterSpecByTag(openapiSpec, tag));
    };

    // 初始化时更新
    updateSpec();

    // 监听hash变化
    const handleHashChange = () => {
      updateSpec();
    };

    window.addEventListener('hashchange', handleHashChange);

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  return (
    <div className="api-docs-container min-h-screen bg-background">
      <SwaggerUI
        spec={filteredSpec as object}
        deepLinking={true}
        displayOperationId={false}
        defaultModelsExpandDepth={1}
        defaultModelExpandDepth={1}
        docExpansion="list"
        filter={true}
        showExtensions={true}
        showCommonExtensions={true}
        tryItOutEnabled={true}
      />
    </div>
  );
}
