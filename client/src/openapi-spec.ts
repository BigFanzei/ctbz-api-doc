import yaml from 'js-yaml';
import openapiYaml from '../public/openapi.yaml?raw';

// Parse YAML content and export as JavaScript object
export const openapiSpec = yaml.load(openapiYaml) as Record<string, any>;
