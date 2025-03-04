import React, { useState } from 'react';
import { X } from 'lucide-react';
import { Event, EventStage, EventResult } from '../../../types/events';
import { updateEventStage } from '../../../services/eventService';
import { getCurrentUser } from '../../../utils/auth';

interface EventStageModalProps {
  isOpen: boolean;
  onClose: () => void;
  event: Event;
}

export default function EventStageModal({ isOpen, onClose, event }: EventStageModalProps) {
  const [result, setResult] = useState<EventResult>('Real Alert');
  const [reason, setReason] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const user = getCurrentUser();
  const currentStage = event.current_stage;

  const handleSubmit = async () => {
    if (!reason.trim()) {
      alert('Please provide a reason');
      return;
    }

    try {
      setIsSubmitting(true);
      let nextStage: EventStage = 'Completed';
      
      if (currentStage === 'Pending') {
        nextStage = result === 'Real Alert' ? 'Investigation' : 'Completed';
      }

      await updateEventStage(event.id, {
        stage: nextStage,
        status: 'Processed',
        result,
        reason,
        handler: user?.username || 'unknown'
      });

      onClose();
    } catch (error) {
      console.error('Failed to update event stage:', error);
      alert('Processing failed, please try again');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">
            Process Event - {currentStage}
          </h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={24} />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Result
            </label>
            <select
              value={result}
              onChange={(e) => setResult(e.target.value as EventResult)}
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500"
            >
              <option value="Real Alert">Real Alert</option>
              <option value="False Positive">False Positive</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Reason
            </label>
            <textarea
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="w-full h-32 border rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500"
              placeholder="Please provide detailed reason..."
            />
          </div>
        </div>

        <div className="mt-6 flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="px-4 py-2 border rounded-lg hover:bg-gray-50"
            disabled={isSubmitting}
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
          >
            {isSubmitting ? 'Processing...' : 'Confirm'}
          </button>
        </div>
      </div>
    </div>
  );
}