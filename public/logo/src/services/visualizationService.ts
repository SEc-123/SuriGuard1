import { getDb } from './backend/database';
import { Visualization } from '../types/visualization';

export const getVisualizations = async (): Promise<Visualization[]> => {
  try {
    const db = await getDb();
    return await db.getAll('visualizations');
  } catch (error) {
    console.error('Failed to fetch visualizations:', error);
    throw error;
  }
};

export const createVisualization = async (data: Partial<Visualization>): Promise<Visualization> => {
  try {
    const db = await getDb();
    const timestamp = new Date().toISOString();
    const visualization = {
      ...data,
      created_at: timestamp,
      updated_at: timestamp
    };
    const id = await db.add('visualizations', visualization);
    return { ...visualization, id };
  } catch (error) {
    console.error('Failed to create visualization:', error);
    throw error;
  }
};

export const deleteVisualization = async (id: number): Promise<void> => {
  try {
    const db = await getDb();
    await db.delete('visualizations', id);
  } catch (error) {
    console.error('Failed to delete visualization:', error);
    throw error;
  }
};

export const updateVisualization = async (id: number, data: Partial<Visualization>): Promise<Visualization> => {
  try {
    const db = await getDb();
    const existing = await db.get('visualizations', id);
    const updated = {
      ...existing,
      ...data,
      updated_at: new Date().toISOString()
    };
    await db.put('visualizations', updated);
    return updated;
  } catch (error) {
    console.error('Failed to update visualization:', error);
    throw error;
  }
};