import React, { useState, useEffect } from 'react';
import { Search, Plus, Edit2, Trash2, ToggleLeft, ToggleRight } from 'lucide-react';
import { getRuleFiles, getRuleFileContent, toggleRuleStatus, deleteRule } from '../../services/rulesService';
import { Rule } from '../../utils/ruleParser';
import RuleEditor from './components/RuleEditor';

export default function RulesList() {
  const [ruleFiles, setRuleFiles] = useState<string[]>([]);
  const [selectedFile, setSelectedFile] = useState<string>('');
  const [rules, setRules] = useState<Rule[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingRule, setEditingRule] = useState<Rule | null>(null);
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    loadRuleFiles();
  }, []);

  useEffect(() => {
    if (selectedFile) {
      loadRules(selectedFile);
    }
  }, [selectedFile]);

  const loadRuleFiles = async () => {
    try {
      const files = await getRuleFiles();
      setRuleFiles(files);
      if (files.length > 0) {
        setSelectedFile(files[0]);
      }
    } catch (error) {
      console.error('Failed to load rule files:', error);
    }
  };

  const loadRules = async (filePath: string) => {
    try {
      setIsLoading(true);
      const fileRules = await getRuleFileContent(filePath);
      setRules(fileRules);
    } catch (error) {
      console.error('Failed to load rules:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggleRule = async (rule: Rule) => {
    try {
      setIsLoading(true);
      // Optimistically update the UI
      setRules(prevRules => 
        prevRules.map(r => 
          r.options.sid === rule.options.sid 
            ? { ...r, enabled: !r.enabled }
            : r
        )
      );
      
      await toggleRuleStatus(selectedFile, rule);
    } catch (error) {
      console.error('Failed to toggle rule:', error);
      // Revert the optimistic update on error
      setRules(prevRules => 
        prevRules.map(r => 
          r.options.sid === rule.options.sid 
            ? { ...r, enabled: rule.enabled }
            : r
        )
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteRule = async (rule: Rule) => {
    if (!rule.options.sid) return;
    if (window.confirm('Are you sure you want to delete this rule?')) {
      try {
        setIsLoading(true);
        await deleteRule(selectedFile, rule.options.sid);
        await loadRules(selectedFile);
      } catch (error) {
        console.error('Failed to delete rule:', error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const filteredRules = rules.filter(rule => 
    rule.options.sid?.includes(searchTerm) ||
    rule.options.msg?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Rules Management</h1>
        <button
          onClick={() => {
            setEditingRule(null);
            setIsEditorOpen(true);
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center"
          disabled={isLoading}
        >
          <Plus size={20} className="mr-2" />
          Add Rule
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-sm">
        <div className="p-4 border-b">
          <div className="flex items-center space-x-4">
            <select
              value={selectedFile}
              onChange={(e) => setSelectedFile(e.target.value)}
              className="border rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500"
              disabled={isLoading}
            >
              {ruleFiles.map(file => (
                <option key={file} value={file}>{file}</option>
              ))}
            </select>
            
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="Search by SID or message..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-lg border focus:outline-none focus:border-blue-500"
              />
              <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">SID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Message</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Protocol</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Source</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Destination</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredRules.map((rule, index) => (
                <tr key={rule.options.sid || index}>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => handleToggleRule(rule)}
                      className={`text-${rule.enabled ? 'green' : 'gray'}-600`}
                      disabled={isLoading}
                    >
                      {rule.enabled ? <ToggleRight size={20} /> : <ToggleLeft size={20} />}
                    </button>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    {rule.options.sid}
                  </td>
                  <td className="px-6 py-4 text-sm">
                    {rule.options.msg}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    {rule.protocol}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    {`${rule.sourceIP}:${rule.sourcePort}`}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    {`${rule.destIP}:${rule.destPort}`}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end space-x-2">
                      <button
                        onClick={() => {
                          setEditingRule(rule);
                          setIsEditorOpen(true);
                        }}
                        className="text-blue-600 hover:text-blue-900"
                        disabled={isLoading}
                      >
                        <Edit2 size={18} />
                      </button>
                      <button
                        onClick={() => handleDeleteRule(rule)}
                        className="text-red-600 hover:text-red-900"
                        disabled={isLoading}
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {isEditorOpen && (
        <RuleEditor
          rule={editingRule}
          filePath={selectedFile}
          onClose={() => {
            setIsEditorOpen(false);
            setEditingRule(null);
            loadRules(selectedFile);
          }}
        />
      )}
    </div>
  );
}