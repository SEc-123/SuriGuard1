import { Event, EventStage, EventStatus } from '../types/events';

export const getEvents = async (filters: Record<string, any> = {}) => {
  try {
    const queryParams = new URLSearchParams(filters);
    const response = await fetch(`/api/events?${queryParams}`);
    if (!response.ok) throw new Error('Failed to fetch events');
    return await response.json();
  } catch (error) {
    console.error('Failed to fetch events:', error);
    throw error;
  }
};

export const updateEventStage = async (eventId: number, data: {
  stage: EventStage;
  status: EventStatus;
  result?: string;
  reason: string;
  handler: string;
}) => {
  try {
    const response = await fetch(`/api/events/${eventId}/stage`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    if (!response.ok) throw new Error('Failed to update event stage');
    return await response.json();
  } catch (error) {
    console.error('Failed to update event stage:', error);
    throw error;
  }
};

export const getEventDetails = async (eventId: number) => {
  try {
    const response = await fetch(`/api/events/${eventId}`);
    if (!response.ok) throw new Error('Failed to fetch event details');
    return await response.json();
  } catch (error) {
    console.error('Failed to fetch event details:', error);
    throw error;
  }
};