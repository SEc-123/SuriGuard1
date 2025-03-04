import React, { useState, useEffect } from 'react';
import { getPresetFilters } from '../../services/presetFilterService';
import { PresetFilter } from '../../types/presetFilter';

interface PresetFilterListProps {
  onApplyFilter: (filter: PresetFilter) => void;
}

export default function PresetFilterList({ onApplyFilter }: PresetFilterListProps) {
  const [filters, setFilters] = useState<PresetFilter[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadFilters();
  }, []);

  const loadFilters = async () => {
    try {
      setLoading(true);
      const data = await getPresetFilters();
      setFilters(data || []);
    } catch (error) {
      console.error('Failed to load preset filters:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="text-center py-4">Loading filters...</div>;
  }

  return (
    <div>
      <h3 className="text-lg font-medium mb-4">Saved Filters</h3>
      
      {filters && filters.length > 0 ? (
        <div className="space-y-2">
          {filters.map((filter) => (
            <div
              key={filter.id}
              className="p-3 border rounded-lg hover:bg-gray-50 cursor-pointer"
              onClick={() => onApplyFilter(filter)}
            >
              <h4 className="font-medium">{filter.name}</h4>
              {filter.description && (
                <p className="text-sm text-gray-500">{filter.description}</p>
              )}
              <div className="mt-1 text-xs text-gray-400">
                {filter.conditions.length} condition(s)
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-sm text-gray-500 p-4 border border-dashed rounded-md text-center">
          No saved filters yet
        </div>
      )}
    </div>
  );
}