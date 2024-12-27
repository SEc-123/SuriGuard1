import { LogFilters } from '../types/logs';

export const applyLogFilters = (logs: any[], filters: LogFilters) => {
  return logs.filter(log => {
    // 应用搜索过滤
    if (filters.search && !matchesSearch(log, filters.search)) {
      return false;
    }

    // 应用类型过滤
    if (filters.type && filters.type !== 'all' && log.type !== filters.type) {
      return false;
    }

    // 应用严重程度过滤
    if (filters.severity && filters.severity !== 'all' && log.severity !== filters.severity) {
      return false;
    }

    // 应用高级过滤条件
    if (filters.advanced?.length) {
      return filters.advanced.every(condition => matchesCondition(log, condition));
    }

    return true;
  });
};

const matchesSearch = (log: any, search: string) => {
  const searchLower = search.toLowerCase();
  return (
    log.src_ip?.toLowerCase().includes(searchLower) ||
    log.dest_ip?.toLowerCase().includes(searchLower) ||
    log.protocol?.toLowerCase().includes(searchLower)
  );
};

const matchesCondition = (log: any, condition: any) => {
  const value = log[condition.field];
  switch (condition.operator) {
    case 'equals':
      return value === condition.value;
    case 'contains':
      return value?.toLowerCase().includes(condition.value.toLowerCase());
    case 'startsWith':
      return value?.toLowerCase().startsWith(condition.value.toLowerCase());
    case 'endsWith':
      return value?.toLowerCase().endsWith(condition.value.toLowerCase());
    case 'greaterThan':
      return value > condition.value;
    case 'lessThan':
      return value < condition.value;
    default:
      return true;
  }
};