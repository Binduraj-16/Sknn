import { useState } from 'react';
import { Plus, X } from 'lucide-react';

interface AddRoutineDialogProps {
  onAdd: (name: string, time: string) => void;
}

export function AddRoutineDialog({ onAdd }: AddRoutineDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState('');
  const [time, setTime] = useState('Morning');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onAdd(name.trim(), time);
      setName('');
      setTime('Morning');
      setIsOpen(false);
    }
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="w-full p-4 rounded-2xl bg-gradient-to-br from-pink-400 to-purple-400 text-white font-medium hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2"
      >
        <Plus className="size-5" />
        Add Routine Step
      </button>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-800">Add New Step</h2>
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="size-5 text-gray-500" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Product/Step Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g., Cleanser, Toner, Moisturizer"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-pink-300 transition-all"
              autoFocus
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Time of Day
            </label>
            <div className="grid grid-cols-2 gap-2">
              {['Morning', 'Night', 'Both', 'Weekly'].map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => setTime(option)}
                  className={`px-4 py-2 rounded-xl font-medium transition-all ${
                    time === option
                      ? 'bg-gradient-to-br from-pink-400 to-purple-400 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
          
          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-gradient-to-br from-pink-400 to-purple-400 text-white font-medium hover:shadow-lg transition-all duration-200"
          >
            Add to Routine
          </button>
        </form>
      </div>
    </div>
  );
}
