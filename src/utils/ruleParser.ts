interface Rule {
  action: string;
  protocol: string;
  sourceIP: string;
  sourcePort: string;
  direction: string;
  destIP: string;
  destPort: string;
  options: {
    msg?: string;
    flow?: string;
    content?: string;
    nocase?: boolean;
    http_uri?: boolean;
    classtype?: string;
    sid?: string;
    rev?: string;
    priority?: string;
    metadata?: {
      service?: string;
      attack_category?: string;
      created_at?: string;
      [key: string]: string | undefined;
    };
    [key: string]: any;
  };
  enabled: boolean;
  raw: string;
}

export const parseRule = (ruleText: string): Rule | null => {
  // Remove comments and trim
  const text = ruleText.trim();
  if (text.startsWith('#')) {
    return parseRule(text.substring(1).trim());
  }

  // Basic rule pattern
  const basicPattern = /^(\w+)\s+(\w+)\s+(\S+)\s+(\S+)\s*(->\s*|\<\>)\s*(\S+)\s+(\S+)\s*\((.*)\)/s;
  const match = text.match(basicPattern);

  if (!match) return null;

  const [_, action, protocol, sourceIP, sourcePort, direction, destIP, destPort, optionsStr] = match;

  // Parse options
  const options: Rule['options'] = {};
  const optionPattern = /(\w+)(?::(?:"([^"]+)"|([^;]+)))?\s*;?\s*/g;
  let optionMatch;

  while ((optionMatch = optionPattern.exec(optionsStr)) !== null) {
    const [_, key, quotedValue, unquotedValue] = optionMatch;
    const value = quotedValue || unquotedValue || true;

    if (key === 'metadata') {
      options.metadata = {};
      const metadataPairs = value.toString().split(',');
      metadataPairs.forEach(pair => {
        const [k, v] = pair.trim().split(' ');
        if (k && v) {
          options.metadata[k] = v;
        }
      });
    } else {
      options[key] = value;
    }
  }

  return {
    action,
    protocol,
    sourceIP,
    sourcePort,
    direction: direction.trim(),
    destIP,
    destPort,
    options,
    enabled: !text.startsWith('#'),
    raw: text
  };
};

export const formatRule = (rule: Rule): string => {
  const header = `${rule.action} ${rule.protocol} ${rule.sourceIP} ${rule.sourcePort} ${rule.direction} ${rule.destIP} ${rule.destPort}`;
  
  const formatOptions = (options: Rule['options']): string => {
    return Object.entries(options)
      .map(([key, value]) => {
        if (key === 'metadata') {
          const metadata = Object.entries(value as object)
            .map(([k, v]) => `${k} ${v}`)
            .join(', ');
          return `metadata:${metadata};`;
        }
        if (value === true) return `${key};`;
        if (typeof value === 'string') {
          return `${key}:"${value}";`;
        }
        return `${key}:${value};`;
      })
      .join(' \\\n    ');
  };

  const rule_text = `${header} (\\\n    ${formatOptions(rule.options)}\n)`;
  return rule.enabled ? rule_text : `# ${rule_text}`;
};

export const toggleRule = (rule: Rule): Rule => {
  return { ...rule, enabled: !rule.enabled };
};