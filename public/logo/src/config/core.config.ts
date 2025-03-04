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

export default config;