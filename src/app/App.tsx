import { useState, useEffect } from 'react';
import { Sparkles, RotateCcw } from 'lucide-react';
import { SkincareItem } from '@/app/components/SkincareItem';
import { AddRoutineDialog } from '@/app/components/AddRoutineDialog';

interface RoutineItem {
  id: string;
  name: string;
  time: string;
  completed: boolean;
  lastCompletedDate?: string;
}

export default function App() {
  const [routines, setRoutines] = useState<RoutineItem[]>([]);

  // Load routines from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem('sknn-routines');
    if (stored) {
      const parsedRoutines = JSON.parse(stored);
      
      // Reset completion status if it's a new day
      const today = new Date().toDateString();
      const updatedRoutines = parsedRoutines.map((routine: RoutineItem) => {
        if (routine.lastCompletedDate !== today && routine.completed) {
          return { ...routine, completed: false };
        }
        return routine;
      });
      
      setRoutines(updatedRoutines);
      localStorage.setItem('sknn-routines', JSON.stringify(updatedRoutines));
    } else {
      // Default routines for new users
      const defaultRoutines: RoutineItem[] = [
        { id: '1', name: 'Cleanser', time: 'Morning', completed: false },
        { id: '2', name: 'Vitamin C Serum', time: 'Morning', completed: false },
        { id: '3', name: 'Moisturizer', time: 'Morning', completed: false },
        { id: '4', name: 'Sunscreen', time: 'Morning', completed: false },
        { id: '5', name: 'Cleanser', time: 'Night', completed: false },
        { id: '6', name: 'Retinol', time: 'Night', completed: false },
        { id: '7', name: 'Night Cream', time: 'Night', completed: false },
      ];
      setRoutines(defaultRoutines);
      localStorage.setItem('sknn-routines', JSON.stringify(defaultRoutines));
    }
  }, []);

  // Save to localStorage whenever routines change
  useEffect(() => {
    if (routines.length > 0) {
      localStorage.setItem('sknn-routines', JSON.stringify(routines));
    }
  }, [routines]);

  const handleToggle = (id: string) => {
    const today = new Date().toDateString();
    setRoutines(routines.map(routine =>
      routine.id === id
        ? { ...routine, completed: !routine.completed, lastCompletedDate: !routine.completed ? today : undefined }
        : routine
    ));
  };

  const handleDelete = (id: string) => {
    setRoutines(routines.filter(routine => routine.id !== id));
  };

  const handleAdd = (name: string, time: string) => {
    const newRoutine: RoutineItem = {
      id: Date.now().toString(),
      name,
      time,
      completed: false,
    };
    setRoutines([...routines, newRoutine]);
  };

  const handleResetAll = () => {
    setRoutines(routines.map(routine => ({ ...routine, completed: false, lastCompletedDate: undefined })));
  };

  const completedCount = routines.filter(r => r.completed).length;
  const totalCount = routines.length;
  const progress = totalCount > 0 ? (completedCount / totalCount) * 100 : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 p-4 md:p-8">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-2">
            <Sparkles className="size-8 text-pink-400" />
            <h1 className="text-5xl font-bold bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
              Sknn
            </h1>
          </div>
          <p className="text-gray-600">Your daily skincare routine tracker</p>
        </div>

        {/* Progress Card */}
        <div className="mb-6 p-6 rounded-3xl bg-white/80 backdrop-blur-sm border border-pink-100 shadow-lg">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h2 className="text-lg font-semibold text-gray-800">Today's Progress</h2>
              <p className="text-sm text-gray-500">
                {completedCount} of {totalCount} completed
              </p>
            </div>
            <button
              onClick={handleResetAll}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              title="Reset all"
            >
              <RotateCcw className="size-5 text-gray-500" />
            </button>
          </div>
          <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-pink-400 to-purple-400 transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Routine List */}
        <div className="space-y-3 mb-6">
          {routines.length === 0 ? (
            <div className="text-center py-12 text-gray-400">
              <Sparkles className="size-12 mx-auto mb-3 opacity-50" />
              <p>No routines yet. Add your first step!</p>
            </div>
          ) : (
            routines.map((routine) => (
              <SkincareItem
                key={routine.id}
                {...routine}
                onToggle={handleToggle}
                onDelete={handleDelete}
              />
            ))
          )}
        </div>

        {/* Add Button */}
        <AddRoutineDialog onAdd={handleAdd} />

        {/* Footer */}
        <div className="text-center mt-8 text-sm text-gray-400">
          Made with ✨ for your skin
        </div>
      </div>
    </div>
  );
}
