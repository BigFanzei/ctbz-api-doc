import SwaggerUI from 'swagger-ui-react';
import 'swagger-ui-react/swagger-ui.css';
import { openapiSpec } from '../openapi-spec';
import { useEffect, useState } from 'react';

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

  // 过滤路径：只保留以指定标签开头的路径
  const filteredPaths: any = {};

  Object.keys(filteredSpec.paths).forEach((path) => {
    // 提取路径的第一段作为标签（例如 /customers/... -> customers）
    const pathSegments = path.split('/').filter(Boolean);
    const pathTag = pathSegments[0];

    if (pathTag === tag) {
      filteredPaths[path] = filteredSpec.paths[path];
    }
  });

  filteredSpec.paths = filteredPaths;

  return filteredSpec;
}

export default function ApiDocs() {
  const [currentTag, setCurrentTag] = useState<string | null>(null);
  const [filteredSpec, setFilteredSpec] = useState<any>(openapiSpec);

  useEffect(() => {
    // 从URL hash中提取标签
    const extractTagFromHash = () => {
      const hash = window.location.hash;
      // 匹配 #tag/xxx 格式
      const tagMatch = hash.match(/#tag\/([^/]+)/);
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
