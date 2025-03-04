import { Rule } from '../utils/ruleParser';

export const readRuleFile = async (filePath: string): Promise<string> => {
  try {
    const response = await fetch(`/api/rules/read?path=${encodeURIComponent(filePath)}`);
    if (!response.ok) {
      throw new Error('Failed to read rule file');
    }
    return response.text();
  } catch (error) {
    console.error('Error reading rule file:', error);
    throw error;
  }
};

export const writeRuleFile = async (filePath: string, content: string): Promise<void> => {
  try {
    const response = await fetch('/api/rules/write', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ path: filePath, content }),
    });
    if (!response.ok) {
      throw new Error('Failed to write rule file');
    }
  } catch (error) {
    console.error('Error writing rule file:', error);
    throw error;
  }
};

export const updateRuleInFile = async (filePath: string, rule: Rule): Promise<void> => {
  try {
    // Read the current content of the file
    const content = await readRuleFile(filePath);
    const lines = content.split('\n');
    
    // Find the rule by SID
    const ruleIndex = lines.findIndex(line => {
      const sidMatch = line.match(/sid\s*:\s*(\d+)/);
      return sidMatch && sidMatch[1] === rule.options.sid;
    });

    if (ruleIndex === -1) {
      throw new Error(`Rule with SID ${rule.options.sid} not found`);
    }

    // Replace the rule
    lines[ruleIndex] = rule.raw;

    // Write back to file
    await writeRuleFile(filePath, lines.join('\n'));
  } catch (error) {
    console.error('Error updating rule:', error);
    throw error;
  }
};

export const toggleRuleInFile = async (filePath: string, rule: Rule): Promise<void> => {
  try {
    const content = await readRuleFile(filePath);
    const lines = content.split('\n');
    
    const ruleIndex = lines.findIndex(line => {
      const sidMatch = line.match(/sid\s*:\s*(\d+)/);
      return sidMatch && sidMatch[1] === rule.options.sid;
    });

    if (ruleIndex === -1) {
      throw new Error(`Rule with SID ${rule.options.sid} not found`);
    }

    // Toggle the rule by adding or removing the comment character
    lines[ruleIndex] = rule.enabled ? 
      lines[ruleIndex].replace(/^#\s*/, '') : 
      `# ${lines[ruleIndex].replace(/^#\s*/, '')}`;

    await writeRuleFile(filePath, lines.join('\n'));
  } catch (error) {
    console.error('Error toggling rule:', error);
    throw error;
  }
};

export const addRuleToFile = async (filePath: string, rule: Rule): Promise<void> => {
  try {
    const content = await readRuleFile(filePath);
    const newContent = `${content}\n${rule.raw}`;
    await writeRuleFile(filePath, newContent);
  } catch (error) {
    console.error('Error adding rule:', error);
    throw error;
  }
};

export const deleteRuleFromFile = async (filePath: string, sid: string): Promise<void> => {
  try {
    const content = await readRuleFile(filePath);
    const lines = content.split('\n');
    
    const ruleIndex = lines.findIndex(line => {
      const sidMatch = line.match(/sid\s*:\s*(\d+)/);
      return sidMatch && sidMatch[1] === sid;
    });

    if (ruleIndex === -1) {
      throw new Error(`Rule with SID ${sid} not found`);
    }

    lines.splice(ruleIndex, 1);
    await writeRuleFile(filePath, lines.join('\n'));
  } catch (error) {
    console.error('Error deleting rule:', error);
    throw error;
  }
};