import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { getEventHistory } from '../../../services/eventService';
import { format } from 'date-fns';

interface EventHistoryDialogProps {
  event: any;
  onClose: () => void;
}

export default function EventHistoryDialog({ event, onClose }: EventHistoryDialogProps) {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = async () => {
    try {
      const data = await getEventHistory(event.id);
      setHistory(data);
    } catch (error) {
      console.error('Failed to load event history:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg w-full max-w-2xl p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">事件处理历史</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={24} />
          </button>
        </div>

        {loading ? (
          <div className="flex items-center justify-center h-48">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>
        ) : (
          <div className="space-y-4">
            {history.map((record: any) => (
              <div
                key={record.id}
                className="border rounded-lg p-4 space-y-2"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <span className="font-medium">{record.action}</span>
                    <span className="text-sm text-gray-500 ml-2">
                      by {record.user}
                    </span>
                  </div>
                  <span className="text-sm text-gray-500">
                    {format(new Date(record.created_at), 'yyyy-MM-dd HH:mm:ss')}
                  </span>
                </div>
                
                <div className="flex space-x-4 text-sm">
                  <span className="text-gray-500">阶段: {record.phase}</span>
                  <span className="text-gray-500">状态: {record.status}</span>
                  {record.result && (
                    <span className="text-gray-500">结果: {record.result}</span>
                  )}
                </div>
                
                {record.reason && (
                  <p className="text-sm text-gray-600 bg-gray-50 p-2 rounded">
                    {record.reason}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}

        <div className="flex justify-end mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 border rounded-md text-gray-700 hover:bg-gray-50"
          >
            关闭
          </button>
        </div>
      </div>
    </div>
  );
}