export type ChartType = 'bar' | 'line' | 'pie';

export interface ChartConfig {
  xAxis: string;
  yAxis?: string;
  aggregation: 'count' | 'sum' | 'avg';
  [key: string]: any;
}

export interface Visualization {
  id: string;
  title: string;
  description?: string;
  type: ChartType;
  filterId: string;
  config: ChartConfig;
  data?: any[];
  createdAt: string;
  updatedAt: string;
}

export interface SavedFilter {
  id: string;
  name: string;
  description?: string;
  conditions: FilterCondition[];
  createdAt: string;
  updatedAt: string;
}