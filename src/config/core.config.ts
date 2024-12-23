// Core configuration for Suricata
interface SuricataConfig {
  // Path to the main suricata.yaml configuration file
  configPath: string;
}

// Default configuration - this should be updated during initial setup
const config: SuricataConfig = {
  configPath: '/etc/suricata/suricata.yaml'
};

// Get the Suricata configuration file path
export const getSuricataConfigPath = (): string => config.configPath;

// Update the Suricata configuration file path
export const updateSuricataConfigPath = (newPath: string): void => {
  config.configPath = newPath;
};

// YAML configuration utilities
import * as yaml from 'js-yaml';
import * as fs from 'fs';

interface YAMLConfig {
  'rule-files': string[];
  [key: string]: any;
}

export const readYAMLConfig = (): YAMLConfig => {
  try {
    const fileContents = fs.readFileSync(config.configPath, 'utf8');
    return yaml.load(fileContents) as YAMLConfig;
  } catch (error) {
    console.error('Error reading YAML config:', error);
    throw new Error('Failed to read Suricata configuration');
  }
};

export const writeYAMLConfig = (config: YAMLConfig): void => {
  try {
    const yamlStr = yaml.dump(config);
    fs.writeFileSync(config.configPath, yamlStr, 'utf8');
  } catch (error) {
    console.error('Error writing YAML config:', error);
    throw new Error('Failed to write Suricata configuration');
  }
};

export default config;