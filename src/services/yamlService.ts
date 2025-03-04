import yaml from 'js-yaml';

export interface SuricataConfig {
  rule_files: string[];
  [key: string]: any;
}

export const readSuricataConfig = async (configPath: string): Promise<SuricataConfig> => {
  try {
    const response = await fetch(`/api/config/read?path=${encodeURIComponent(configPath)}`);
    if (!response.ok) {
      throw new Error('Failed to read Suricata configuration');
    }
    const content = await response.text();
    return yaml.load(content) as SuricataConfig;
  } catch (error) {
    console.error('Error reading Suricata configuration:', error);
    throw error;
  }
};