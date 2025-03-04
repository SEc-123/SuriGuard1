export interface PresetFilter {
  id: string;
  name: string;
  description?: string;
  conditions: FilterCondition[];
  isSystem?: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface FilterCondition {
  field: string;
  operator: string;
  value: string | number;
}

export interface PresetAnalytics {
  id: string;
  name: string;
  filterId: string;
  chartType: 'bar' | 'line' | 'pie';
  aggregation: 'count' | 'sum' | 'avg';
  groupBy: string;
  timeRange?: string;
}