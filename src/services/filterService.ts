import { SavedFilter } from '../types/visualization';

export const getSavedFilters = async (): Promise<SavedFilter[]> => {
  try {
    const response = await fetch('/api/filters');
    if (!response.ok) throw new Error('Failed to fetch saved filters');
    return await response.json();
  } catch (error) {
    console.error('Failed to fetch saved filters:', error);
    throw error;
  }
};

export const createSavedFilter = async (data: Partial<SavedFilter>): Promise<SavedFilter> => {
  try {
    const response = await fetch('/api/filters', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Failed to create saved filter');
    return await response.json();
  } catch (error) {
    console.error('Failed to create saved filter:', error);
    throw error;
  }
};

export const deleteSavedFilter = async (id: string): Promise<void> => {
  try {
    const response = await fetch(`/api/filters/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Failed to delete saved filter');
  } catch (error) {
    console.error('Failed to delete saved filter:', error);
    throw error;
  }
};