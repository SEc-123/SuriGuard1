import { Visualization } from '../types/visualization';

export const getVisualizations = async (): Promise<Visualization[]> => {
  try {
    const response = await fetch('/api/visualizations');
    if (!response.ok) throw new Error('Failed to fetch visualizations');
    return await response.json();
  } catch (error) {
    console.error('Failed to fetch visualizations:', error);
    throw error;
  }
};

export const createVisualization = async (data: Partial<Visualization>): Promise<Visualization> => {
  try {
    const response = await fetch('/api/visualizations', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Failed to create visualization');
    return await response.json();
  } catch (error) {
    console.error('Failed to create visualization:', error);
    throw error;
  }
};

export const deleteVisualization = async (id: string): Promise<void> => {
  try {
    const response = await fetch(`/api/visualizations/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Failed to delete visualization');
  } catch (error) {
    console.error('Failed to delete visualization:', error);
    throw error;
  }
};

export const updateVisualization = async (id: string, data: Partial<Visualization>): Promise<Visualization> => {
  try {
    const response = await fetch(`/api/visualizations/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Failed to update visualization');
    return await response.json();
  } catch (error) {
    console.error('Failed to update visualization:', error);
    throw error;
  }
};