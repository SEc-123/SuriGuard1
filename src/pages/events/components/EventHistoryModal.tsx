import React from 'react';
import { X } from 'lucide-react';
import { Event } from '../../../types/events';

interface EventHistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  event: Event;
}

export default function EventHistoryModal({ isOpen, onClose, event }: EventHistoryModalProps) {
  if (!isOpen) return null;

  const stages = [
    {
      title: 'Confirmation Stage',
      status: event.confirm_status,
      handler: event.confirm_handler,
      result: event.confirm_result,
      reason: event.confirm_reason,
      time: event.confirm_time
    },
    {
      title: 'Investigation Stage',
      status: event.investigation_status,
      handler: event.investigation_handler,
      result: event.investigation_result,
      reason: event.investigation_reason,
      time: event.investigation_time
    },
    {
      title: 'Completion Stage',
      result: event.completion_result,
      reason: event.completion_reason,
      time: event.completion_time
    }
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-2xl p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Event Processing History</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={24} />
          </button>
        </div>

        <div className="space-y-6">
          {stages.map((stage, index) => (
            <div key={index} className="border-b pb-4 last:border-0">
              <h3 className="text-lg font-medium mb-3">{stage.title}</h3>
              {stage.time ? (
                <div className="space-y-2">
                  <div className="grid grid-cols-2 gap-4">
                    {stage.status && (
                      <>
                        <div>
                          <p className="text-sm text-gray-500">Status</p>
                          <p>{stage.status}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Handler</p>
                          <p>{stage.handler}</p>
                        </div>
                      </>
                    )}
                    <div>
                      <p className="text-sm text-gray-500">Result</p>
                      <p>{stage.result}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Time</p>
                      <p>{stage.time}</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Reason</p>
                    <p className="mt-1">{stage.reason}</p>
                  </div>
                </div>
              ) : (
                <p className="text-gray-500">No records</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}