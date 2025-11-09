import SwaggerUI from 'swagger-ui-react';
import 'swagger-ui-react/swagger-ui.css';
import { openapiSpec } from '../openapi-spec';

export default function ApiDocs() {
  return (
    <div className="api-docs-container min-h-screen bg-background">
      <SwaggerUI
        spec={openapiSpec}
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
