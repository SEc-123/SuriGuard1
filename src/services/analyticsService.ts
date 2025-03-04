import { PresetAnalytics } from '../types/presetFilter';
import { getPresetFilters } from './presetFilterService';
import { applyLogFilters } from '../utils/logFilters';
import { getLogsByType } from './logService';

export const executeAnalytics = async (analytics: PresetAnalytics) => {
  try {
    // Get the associated preset filter
    const filters = await getPresetFilters();
    const filter = filters.find(f => f.id === analytics.filterId);
    if (!filter) throw new Error('Filter not found');

    // Get log data
    const logs = await getLogsByType('all', {
      advanced: filter.conditions
    });

    // Apply filter conditions
    const filteredLogs = applyLogFilters(logs.data || [], {
      advanced: filter.conditions
    });

    // Filter by time range
    const timeFilteredLogs = filterByTimeRange(filteredLogs, analytics.timeRange);

    // Perform aggregation
    return aggregateData(timeFilteredLogs, analytics);
  } catch (error) {
    console.error('Failed to execute analytics:', error);
    throw error;
  }
};

const filterByTimeRange = (logs: any[], timeRange?: string) => {
  if (!timeRange) return logs;

  const now = new Date();
  const ranges: Record<string, number> = {
    '1h': 60 * 60 * 1000,
    '24h': 24 * 60 * 60 * 1000,
    '7d': 7 * 24 * 60 * 60 * 1000,
    '30d': 30 * 24 * 60 * 60 * 1000
  };

  const msAgo = ranges[timeRange];
  if (!msAgo) return logs;

  const cutoff = new Date(now.getTime() - msAgo);
  return logs.filter(log => new Date(log.timestamp) >= cutoff);
};

const aggregateData = (logs: any[], analytics: PresetAnalytics) => {
  const groups = new Map<string, number>();

  logs.forEach(log => {
    const key = log[analytics.groupBy]?.toString() || 'unknown';
    const value = getValue(log, analytics.aggregation);
    groups.set(key, (groups.get(key) || 0) + value);
  });

  return Array.from(groups.entries()).map(([key, value]) => ({
    [analytics.groupBy]: key,
    value
  }));
};

const getValue = (log: any, aggregation: string): number => {
  switch (aggregation) {
    case 'count':
      return 1;
    case 'sum':
      return parseFloat(log.value) || 0;
    case 'avg':
      return parseFloat(log.value) || 0;
    default:
      return 0;
  }
};