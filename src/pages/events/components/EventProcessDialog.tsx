import React, { useState } from 'react';
import { X } from 'lucide-react';
import { updateEventPhase } from '../../../services/eventService';

interface EventProcessDialogProps {
  event: any;
  onClose: () => void;
}

export default function EventProcessDialog({ event, onClose }: EventProcessDialogProps) {
  const [result, setResult] = useState('');
  const [reason, setReason] = useState('');
  const [error, setError] = useState('');

  const getCurrentPhase = () => {
    switch (event.current_phase) {
      case '未处理':
        return {
          title: '确认处理',
          options: ['真实告警', '误报']
        };
      case '事件调查':
        return {
          title: '调查结果',
          options: ['真实告警', '误报', '其他']
        };
      case '完结':
        return {
          title: '完结处理',
          options: ['真实告警', '误报', '其他']
        };
      default:
        return {
          title: '',
          options: []
        };
    }
  };

  const handleSubmit = async () => {
    if (!result || !reason) {
      setError('请填写完整信息');
      return;
    }

    try {
      const phaseData = {
        status: '已处理',
        result,
        reason,
        action: `${getCurrentPhase().title}完成`
      };

      await updateEventPhase(
        event.id,
        event.current_phase,
        '已处理',
        phaseData,
        'current_user' // TODO: Get from auth context
      );

      onClose();
    } catch (error) {
      console.error('Failed to update event:', error);
      setError('处理失败，请重试');
    }
  };

  const phase = getCurrentPhase();

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg w-full max-w-md p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">{phase.title}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={24} />
          </button>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-md text-sm">
            {error}
          </div>
        )}

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              处理结果
            </label>
            <select
              value={result}
              onChange={(e) => setResult(e.target.value)}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            >
              <option value="">请选择</option>
              {phase.options.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              处理理由
            </label>
            <textarea
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
              rows={4}
              placeholder="请详细说明处理理由..."
            />
          </div>

          <div className="flex justify-end space-x-4 mt-6">
            <button
              onClick={onClose}
              className="px-4 py-2 border rounded-md text-gray-700 hover:bg-gray-50"
            >
              取消
            </button>
            <button
              onClick={handleSubmit}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              确认
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}