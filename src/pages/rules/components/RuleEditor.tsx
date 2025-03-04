import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { Rule } from '../../../utils/ruleParser';
import { addRule, updateRule } from '../../../services/rulesService';

interface RuleEditorProps {
  rule: Rule | null;
  filePath: string;
  onClose: () => void;
}

export default function RuleEditor({ rule, filePath, onClose }: RuleEditorProps) {
  const [formData, setFormData] = useState<Partial<Rule>>({
    action: 'alert',
    protocol: 'http',
    sourceIP: 'any',
    sourcePort: 'any',
    direction: '->',
    destIP: 'any',
    destPort: 'any',
    options: {
      msg: '',
      flow: 'to_server,established',
      classtype: 'web-application-attack',
      priority: '1',
      sid: '',
      rev: '1',
    },
    enabled: true,
  });

  useEffect(() => {
    if (rule) {
      setFormData(rule);
    }
  }, [rule]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (rule) {
        await updateRule(filePath, formData as Rule);
      } else {
        await addRule(filePath, formData as Rule);
      }
      onClose();
    } catch (error) {
      console.error('Failed to save rule:', error);
    }
  };

  const handleChange = (field: string, value: any) => {
    if (field.includes('.')) {
      const [parent, child] = field.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent as keyof Rule],
          [child]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [field]: value
      }));
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg w-full max-w-3xl p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">
            {rule ? 'Edit Rule' : 'Add New Rule'}
          </h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Action</label>
              <select
                value={formData.action}
                onChange={(e) => handleChange('action', e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                <option value="alert">Alert</option>
                <option value="drop">Drop</option>
                <option value="pass">Pass</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Protocol</label>
              <select
                value={formData.protocol}
                onChange={(e) => handleChange('protocol', e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                <option value="http">HTTP</option>
                <option value="tcp">TCP</option>
                <option value="udp">UDP</option>
                <option value="icmp">ICMP</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Source IP</label>
              <input
                type="text"
                value={formData.sourceIP}
                onChange={(e) => handleChange('sourceIP', e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Source Port</label>
              <input
                type="text"
                value={formData.sourcePort}
                onChange={(e) => handleChange('sourcePort', e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Destination IP</label>
              <input
                type="text"
                value={formData.destIP}
                onChange={(e) => handleChange('destIP', e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Destination Port</label>
              <input
                type="text"
                value={formData.destPort}
                onChange={(e) => handleChange('destPort', e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Message</label>
              <input
                type="text"
                value={formData.options?.msg || ''}
                onChange={(e) => handleChange('options.msg', e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Flow</label>
              <input
                type="text"
                value={formData.options?.flow || ''}
                onChange={(e) => handleChange('options.flow', e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Class Type</label>
              <input
                type="text"
                value={formData.options?.classtype || ''}
                onChange={(e) => handleChange('options.classtype', e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">SID</label>
                <input
                  type="text"
                  value={formData.options?.sid || ''}
                  onChange={(e) => handleChange('options.sid', e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Revision</label>
                <input
                  type="text"
                  value={formData.options?.rev || ''}
                  onChange={(e) => handleChange('options.rev', e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Priority</label>
                <input
                  type="text"
                  value={formData.options?.priority || ''}
                  onChange={(e) => handleChange('options.priority', e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-4 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded-md text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              {rule ? 'Update Rule' : 'Add Rule'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}