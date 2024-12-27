import { SavedFilter } from '../types/visualization';
import { getDb } from './backend/database';

export const getSavedFilters = async (): Promise<SavedFilter[]> => {
  try {
    const db = await getDb();
    return await db.getAll('saved_filters');
  } catch (error) {
    console.error('Failed to fetch saved filters:', error);
    throw error;
  }
};

export const createSavedFilter = async (data: Partial<SavedFilter>): Promise<SavedFilter> => {
  try {
    const db = await getDb();
    const timestamp = new Date().toISOString();
    const filter = {
      ...data,
      created_at: timestamp,
      updated_at: timestamp
    };
    const id = await db.add('saved_filters', filter);
    return { ...filter, id };
  } catch (error) {
    console.error('Failed to create saved filter:', error);
    throw error;
  }
};

export const deleteSavedFilter = async (id: number): Promise<void> => {
  try {
    const db = await getDb();
    await db.delete('saved_filters', id);
  } catch (error) {
    console.error('Failed to delete saved filter:', error);
    throw error;
  }
};