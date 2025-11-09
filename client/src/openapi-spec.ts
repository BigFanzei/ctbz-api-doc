import yaml from 'js-yaml';
import openapiYaml from './openapi.yaml?raw';

// Parse YAML content to JavaScript object
export const openapiSpec = yaml.load(openapiYaml);
