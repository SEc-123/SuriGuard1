import { BaseService } from './BaseService';
import { Rule } from '../types/rule';
import * as fs from 'fs/promises';
import * as path from 'path';
import { parseRule, formatRule } from '../utils/ruleParser';

export class RuleService extends BaseService {
  private rulesPath: string;

  constructor(rulesPath: string) {
    super();
    this.rulesPath = rulesPath;
  }

  async getRules(filePath: string): Promise<Rule[]> {
    const content = await fs.readFile(path.join(this.rulesPath, filePath), 'utf8');
    return content
      .split('\n')
      .filter(line => line.trim())
      .map(line => parseRule(line))
      .filter((rule): rule is Rule => rule !== null);
  }

  async addRule(filePath: string, rule: Rule): Promise<void> {
    const fullPath = path.join(this.rulesPath, filePath);
    const content = await fs.readFile(fullPath, 'utf8');
    const formattedRule = formatRule(rule);
    await fs.writeFile(fullPath, `${content}\n${formattedRule}`);
  }

  async updateRule(filePath: string, rule: Rule): Promise<void> {
    const fullPath = path.join(this.rulesPath, filePath);
    const content = await fs.readFile(fullPath, 'utf8');
    const rules = content
      .split('\n')
      .filter(line => line.trim())
      .map(line => {
        const parsedRule = parseRule(line);
        if (parsedRule?.options.sid === rule.options.sid) {
          return formatRule(rule);
        }
        return line;
      });
    
    await fs.writeFile(fullPath, rules.join('\n'));
  }

  async deleteRule(filePath: string, sid: string): Promise<void> {
    const fullPath = path.join(this.rulesPath, filePath);
    const content = await fs.readFile(fullPath, 'utf8');
    const rules = content
      .split('\n')
      .filter(line => line.trim())
      .filter(line => {
        const rule = parseRule(line);
        return rule?.options.sid !== sid;
      });
    
    await fs.writeFile(fullPath, rules.join('\n'));
  }

  async getRuleStats(): Promise<any> {
    const [query] = this.queryBuilder
      .select(['alert_category', 'COUNT(*) as count'])
      .from('alert_logs')
      .build();
    
    return this.executeQuery(query);
  }
}