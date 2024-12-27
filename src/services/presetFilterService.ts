import { PresetFilter, PresetAnalytics } from '../types/presetFilter';
import { getDb } from './backend/database';

export const getPresetFilters = async (): Promise<PresetFilter[]> => {
  const db = await getDb();
  return db.getAll('preset_filters');
};

export const savePresetFilter = async (filter: Omit<PresetFilter, 'id' | 'createdAt' | 'updatedAt'>): Promise<PresetFilter> => {
  const db = await getDb();
  const timestamp = new Date().toISOString();
  const newFilter = {
    ...filter,
    createdAt: timestamp,
    updatedAt: timestamp
  };
  const id = await db.add('preset_filters', newFilter);
  return { ...newFilter, id };
};

export const deletePresetFilter = async (id: string): Promise<void> => {
  const db = await getDb();
  await db.delete('preset_filters', id);
};

export const getPresetAnalytics = async (filterId: string): Promise<PresetAnalytics[]> => {
  const db = await getDb();
  return db.getAllFromIndex('preset_analytics', 'by-filter-id', filterId);
};

export const savePresetAnalytics = async (analytics: Omit<PresetAnalytics, 'id'>): Promise<PresetAnalytics> => {
  const db = await getDb();
  const id = await db.add('preset_analytics', analytics);
  return { ...analytics, id };
};