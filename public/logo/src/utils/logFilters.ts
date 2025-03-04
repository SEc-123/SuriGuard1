import { LogFilters, FilterCondition } from '../types/logs';

export const applyLogFilters = (logs: any[], filters: LogFilters) => {
  return logs.filter(log => {
    // Apply search filter
    if (filters.search && !matchesSearch(log, filters.search)) {
      return false;
    }

    // Apply type filter
    if (filters.type && filters.type !== 'all' && log.type !== filters.type) {
      return false;
    }

    // Apply severity filter
    if (filters.severity && filters.severity !== 'all' && log.severity !== filters.severity) {
      return false;
    }

    // Apply advanced filters
    if (filters.advanced && filters.advanced.length > 0) {
      return filters.advanced.every(condition => matchesCondition(log, condition));
    }

    return true;
  });
};

const matchesSearch = (log: any, search: string): boolean => {
  const searchLower = search.toLowerCase();
  
  // Check common fields
  if (
    (log.src_ip && log.src_ip.toLowerCase().includes(searchLower)) ||
    (log.dest_ip && log.dest_ip.toLowerCase().includes(searchLower)) ||
    (log.protocol && log.protocol.toLowerCase().includes(searchLower))
  ) {
    return true;
  }
  
  // Check type-specific fields
  if (log.type === 'alert' && log.signature && log.signature.toLowerCase().includes(searchLower)) {
    return true;
  }
  
  if (log.type === 'dns' && log.query && log.query.toLowerCase().includes(searchLower)) {
    return true;
  }
  
  if (log.type === 'http' && (
    (log.url && log.url.toLowerCase().includes(searchLower)) ||
    (log.user_agent && log.user_agent.toLowerCase().includes(searchLower))
  )) {
    return true;
  }
  
  if (log.type === 'file' && log.filename && log.filename.toLowerCase().includes(searchLower)) {
    return true;
  }
  
  return false;
};

const matchesCondition = (log: any, condition: FilterCondition): boolean => {
  const { field, operator, value } = condition;
  const fieldValue = log[field];
  
  if (fieldValue === undefined || fieldValue === null) {
    return false;
  }
  
  const stringFieldValue = String(fieldValue).toLowerCase();
  const stringValue = String(value).toLowerCase();
  
  switch (operator) {
    case 'equals':
      return stringFieldValue === stringValue;
      
    case 'contains':
      return stringFieldValue.includes(stringValue);
      
    case 'startsWith':
      return stringFieldValue.startsWith(stringValue);
      
    case 'endsWith':
      return stringFieldValue.endsWith(stringValue);
      
    case 'greaterThan':
      return Number(fieldValue) > Number(value);
      
    case 'lessThan':
      return Number(fieldValue) < Number(value);
      
    default:
      return false;
  }
};