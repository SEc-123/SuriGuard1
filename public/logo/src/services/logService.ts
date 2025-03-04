import { LogEvent, AlertEvent, DnsEvent, HttpEvent, TlsEvent, FileEvent } from '../types/logs';

interface FilterCondition {
  field: string;
  operator: string;
  value: string;
}

interface LogFilters {
  search?: string;
  type?: string;
  severity?: string;
  advanced?: FilterCondition[];
}

export const getLogStats = async () => {
  try {
    const response = await fetch('/api/logs/stats');
    if (!response.ok) throw new Error('Failed to fetch log statistics');
    return await response.json();
  } catch (error) {
    console.error('Failed to fetch log statistics:', error);
    throw error;
  }
};

export const getLogsByType = async (
  type: string,
  filters: LogFilters = {},
  page: number = 1,
  limit: number = 10
) => {
  try {
    // Convert advanced filters to query parameters
    const advancedParams = filters.advanced?.map((condition, index) => ({
      [`field${index}`]: condition.field,
      [`operator${index}`]: condition.operator,
      [`value${index}`]: condition.value,
    })) || [];

    const queryParams = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
      ...(filters.search && { search: filters.search }),
      ...(filters.type && { type: filters.type }),
      ...(filters.severity && { severity: filters.severity }),
      ...Object.assign({}, ...advancedParams),
    });

    const response = await fetch(`/api/logs/${type}?${queryParams}`);
    if (!response.ok) throw new Error('Failed to fetch logs');
    return await response.json();
  } catch (error) {
    console.error('Failed to fetch logs:', error);
    throw error;
  }
};

export const exportLogs = async (type: string, filters: LogFilters = {}) => {
  try {
    const queryParams = new URLSearchParams({
      ...(filters.search && { search: filters.search }),
      ...(filters.type && { type: filters.type }),
      ...(filters.severity && { severity: filters.severity }),
      ...(filters.advanced && { advanced: JSON.stringify(filters.advanced) }),
    });

    const response = await fetch(`/api/logs/${type}/export?${queryParams}`);
    if (!response.ok) throw new Error('Failed to export logs');
    
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${type}-logs-${new Date().toISOString()}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } catch (error) {
    console.error('Failed to export logs:', error);
    throw error;
  }
};