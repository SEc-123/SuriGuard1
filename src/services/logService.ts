import { LogEvent, AlertEvent, DnsEvent, HttpEvent, TlsEvent, FileEvent } from '../types/logs';

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
  filters: Record<string, any> = {},
  page: number = 1,
  limit: number = 10
) => {
  try {
    const queryParams = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
      ...filters
    });

    const response = await fetch(`/api/logs/${type}?${queryParams}`);
    if (!response.ok) throw new Error('Failed to fetch logs');
    return await response.json();
  } catch (error) {
    console.error('Failed to fetch logs:', error);
    throw error;
  }
};

export const exportLogs = async (type: string, filters: Record<string, any> = {}) => {
  try {
    const queryParams = new URLSearchParams(filters);
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