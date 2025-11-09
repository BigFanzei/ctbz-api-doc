const fs = require('fs');
const spec = require('./openapi.json');

// 转义特殊字符
const specString = JSON.stringify(spec)
  .replace(/\\/g, '\\\\')
  .replace(/`/g, '\\`')
  .replace(/\$/g, '\\$');

const html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>CTBZ API Documentation</title>
    <link rel="stylesheet" type="text/css" href="https://unpkg.com/swagger-ui-dist@5.10.5/swagger-ui.css" />
    <style>
        body {
            margin: 0;
            padding: 0;
        }
        #swagger-ui {
            max-width: 1460px;
            margin: 0 auto;
        }
    </style>
</head>
<body>
    <div id="swagger-ui"></div>
    <script src="https://unpkg.com/swagger-ui-dist@5.10.5/swagger-ui-bundle.js"></script>
    <script src="https://unpkg.com/swagger-ui-dist@5.10.5/swagger-ui-standalone-preset.js"></script>
    <script>
        window.onload = function() {
            try {
                const spec = JSON.parse(\`${specString}\`);
                
                console.log('Spec loaded:', spec.openapi);
                
                window.ui = SwaggerUIBundle({
                    spec: spec,
                    dom_id: '#swagger-ui',
                    deepLinking: true,
                    presets: [
                        SwaggerUIBundle.presets.apis,
                        SwaggerUIStandalonePreset
                    ],
                    plugins: [
                        SwaggerUIBundle.plugins.DownloadUrl
                    ],
                    layout: "StandaloneLayout",
                    defaultModelsExpandDepth: 1,
                    defaultModelExpandDepth: 1,
                    docExpansion: "list",
                    filter: true,
                    showExtensions: true,
                    showCommonExtensions: true,
                    tryItOutEnabled: true
                });
            } catch (e) {
                console.error('Error loading spec:', e);
                document.getElementById('swagger-ui').innerHTML = '<h1>Error loading API documentation</h1><pre>' + e.message + '</pre>';
            }
        };
    </script>
</body>
</html>`;

fs.writeFileSync('index.html', html);
console.log('✅ Built index.html with embedded spec');
