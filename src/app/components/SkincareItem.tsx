import { useState } from 'react';
import { Check, Trash2 } from 'lucide-react';

interface SkincareItemProps {
  id: string;
  name: string;
  time: string;
  completed: boolean;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export function SkincareItem({ id, name, time, completed, onToggle, onDelete }: SkincareItemProps) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = () => {
    setIsDeleting(true);
    setTimeout(() => {
      onDelete(id);
    }, 300);
  };

  return (
    <div 
      className={`group flex items-center gap-4 p-4 rounded-2xl bg-white/80 backdrop-blur-sm border border-pink-100 transition-all duration-300 ${
        isDeleting ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
      } hover:shadow-lg hover:border-pink-200`}
    >
      <button
        onClick={() => onToggle(id)}
        className={`flex items-center justify-center size-6 rounded-full border-2 transition-all duration-200 ${
          completed
            ? 'bg-gradient-to-br from-pink-400 to-purple-400 border-pink-400'
            : 'border-pink-300 hover:border-pink-400'
        }`}
      >
        {completed && <Check className="size-4 text-white" strokeWidth={3} />}
      </button>
      
      <div className="flex-1">
        <h3 className={`font-medium transition-all duration-200 ${
          completed ? 'text-gray-400 line-through' : 'text-gray-800'
        }`}>
          {name}
        </h3>
        <p className="text-sm text-gray-500">{time}</p>
      </div>
      
      <button
        onClick={handleDelete}
        className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 p-2 hover:bg-red-50 rounded-lg"
      >
        <Trash2 className="size-4 text-red-400" />
      </button>
    </div>
  );
}
