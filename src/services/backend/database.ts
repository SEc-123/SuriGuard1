import { openDB, DBSchema } from 'idb';

interface SuriguardDB extends DBSchema {
  preset_filters: {
    key: string;
    value: {
      id?: string;
      name: string;
      description?: string;
      conditions: any[];
      isSystem?: boolean;
      createdAt: string;
      updatedAt: string;
    };
  };
  preset_analytics: {
    key: string;
    value: {
      id?: string;
      name: string;
      filterId: string;
      chartType: 'bar' | 'line' | 'pie';
      aggregation: 'count' | 'sum' | 'avg';
      groupBy: string;
      timeRange?: string;
    };
    indexes: { 'by-filter-id': string };
  };
}

const DB_NAME = 'suriguard-db';
const DB_VERSION = 1;

export async function initializeDb() {
  const db = await openDB<SuriguardDB>(DB_NAME, DB_VERSION, {
    upgrade(db) {
      // Create preset_filters store
      if (!db.objectStoreNames.contains('preset_filters')) {
        db.createObjectStore('preset_filters', { keyPath: 'id' });
      }

      // Create preset_analytics store
      if (!db.objectStoreNames.contains('preset_analytics')) {
        const store = db.createObjectStore('preset_analytics', { keyPath: 'id' });
        store.createIndex('by-filter-id', 'filterId');
      }
    }
  });

  return db;
}

let dbPromise: Promise<any> | null = null;

export function getDb() {
  if (!dbPromise) {
    dbPromise = initializeDb();
  }
  return dbPromise;
}