import { getSuricataConfigPath } from '../config/core.config';
import { Rule, parseRule, formatRule } from '../utils/ruleParser';
import { readSuricataConfig } from './yamlService';
import { readRuleFile, updateRuleInFile, toggleRuleInFile, addRuleToFile, deleteRuleFromFile } from './ruleFileService';

export const getRuleFiles = async (): Promise<string[]> => {
  try {
    const configPath = getSuricataConfigPath();
    const config = await readSuricataConfig(configPath);
    return config.rule_files || [];
  } catch (error) {
    console.error('Failed to get rule files:', error);
    throw error;
  }
};

export const getRuleFileContent = async (filePath: string): Promise<Rule[]> => {
  try {
    const content = await readRuleFile(filePath);
    return content
      .split('\n')
      .filter(line => line.trim() && !line.trim().startsWith('#'))
      .map(line => parseRule(line))
      .filter((rule): rule is Rule => rule !== null);
  } catch (error) {
    console.error('Failed to get rule file content:', error);
    throw error;
  }
};

export const updateRule = async (filePath: string, rule: Rule): Promise<void> => {
  await updateRuleInFile(filePath, rule);
};

export const addRule = async (filePath: string, rule: Rule): Promise<void> => {
  await addRuleToFile(filePath, rule);
};

export const deleteRule = async (filePath: string, sid: string): Promise<void> => {
  await deleteRuleFromFile(filePath, sid);
};

export const toggleRuleStatus = async (filePath: string, rule: Rule): Promise<void> => {
  await toggleRuleInFile(filePath, rule);
};