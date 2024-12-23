import { readYAMLConfig, getSuricataConfigPath } from '../config/core.config';
import { Rule, parseRule, formatRule, toggleRule } from '../utils/ruleParser';
import * as fs from 'fs';
import * as path from 'path';

export const getRuleFiles = async (): Promise<string[]> => {
  try {
    const config = readYAMLConfig();
    return config['rule-files'] || [];
  } catch (error) {
    console.error('Failed to read rule files from config:', error);
    throw new Error('Failed to fetch rule files');
  }
};

export const getRuleFileContent = async (filePath: string): Promise<Rule[]> => {
  try {
    const configDir = path.dirname(getSuricataConfigPath());
    const absolutePath = path.resolve(configDir, filePath);
    
    const content = fs.readFileSync(absolutePath, 'utf8');
    return content
      .split('\n')
      .filter(line => line.trim())
      .map(line => parseRule(line))
      .filter((rule): rule is Rule => rule !== null);
  } catch (error) {
    console.error('Failed to read rule file:', error);
    throw new Error('Failed to fetch rule file content');
  }
};

export const addRule = async (filePath: string, rule: Rule): Promise<void> => {
  try {
    const configDir = path.dirname(getSuricataConfigPath());
    const absolutePath = path.resolve(configDir, filePath);
    
    const content = fs.readFileSync(absolutePath, 'utf8');
    const formattedRule = formatRule(rule);
    
    fs.writeFileSync(absolutePath, `${content}\n${formattedRule}`);
  } catch (error) {
    console.error('Failed to add rule:', error);
    throw new Error('Failed to add rule');
  }
};

export const updateRule = async (filePath: string, updatedRule: Rule): Promise<void> => {
  try {
    const configDir = path.dirname(getSuricataConfigPath());
    const absolutePath = path.resolve(configDir, filePath);
    
    const content = fs.readFileSync(absolutePath, 'utf8');
    const rules = content
      .split('\n')
      .filter(line => line.trim());
    
    const updatedRules = rules.map(line => {
      const rule = parseRule(line);
      if (rule && rule.options.sid === updatedRule.options.sid) {
        return formatRule(updatedRule);
      }
      return line;
    });
    
    fs.writeFileSync(absolutePath, updatedRules.join('\n'));
  } catch (error) {
    console.error('Failed to update rule:', error);
    throw new Error('Failed to update rule');
  }
};

export const deleteRule = async (filePath: string, sid: string): Promise<void> => {
  try {
    const configDir = path.dirname(getSuricataConfigPath());
    const absolutePath = path.resolve(configDir, filePath);
    
    const content = fs.readFileSync(absolutePath, 'utf8');
    const rules = content
      .split('\n')
      .filter(line => line.trim())
      .filter(line => {
        const rule = parseRule(line);
        return rule?.options.sid !== sid;
      });
    
    fs.writeFileSync(absolutePath, rules.join('\n'));
  } catch (error) {
    console.error('Failed to delete rule:', error);
    throw new Error('Failed to delete rule');
  }
};

export const toggleRuleStatus = async (filePath: string, rule: Rule): Promise<void> => {
  try {
    const configDir = path.dirname(getSuricataConfigPath());
    const absolutePath = path.resolve(configDir, filePath);
    
    const content = fs.readFileSync(absolutePath, 'utf8');
    const rules = content
      .split('\n')
      .filter(line => line.trim());
    
    const updatedRules = rules.map(line => {
      const currentRule = parseRule(line);
      if (currentRule && currentRule.options.sid === rule.options.sid) {
        return formatRule(toggleRule(rule));
      }
      return line;
    });
    
    fs.writeFileSync(absolutePath, updatedRules.join('\n'));
  } catch (error) {
    console.error('Failed to toggle rule status:', error);
    throw new Error('Failed to toggle rule status');
  }
};