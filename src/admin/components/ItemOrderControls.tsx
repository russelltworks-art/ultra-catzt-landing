import React from 'react';
import { ArrowUp, ArrowDown, Trash2 } from 'lucide-react';

interface ItemOrderControlsProps {
  index: number;
  total: number;
  onMoveUp: () => void;
  onMoveDown: () => void;
  onDelete: () => void;
  label?: string;
}

export const ItemOrderControls: React.FC<ItemOrderControlsProps> = ({
  index,
  total,
  onMoveUp,
  onMoveDown,
  onDelete,
  label,
}) => {
  return (
    <div className="flex items-center gap-1">
      {label && <span className="text-[11px] font-semibold text-amber-400 mr-2">{label}</span>}
      <button
        type="button"
        disabled={index === 0}
        onClick={onMoveUp}
        title="Move item up"
        className="w-6 h-6 rounded bg-[#252525] hover:bg-[#333333] text-gray-300 disabled:opacity-30 disabled:hover:bg-[#252525] flex items-center justify-center transition"
      >
        <ArrowUp className="w-3.5 h-3.5" />
      </button>
      <button
        type="button"
        disabled={index === total - 1}
        onClick={onMoveDown}
        title="Move item down"
        className="w-6 h-6 rounded bg-[#252525] hover:bg-[#333333] text-gray-300 disabled:opacity-30 disabled:hover:bg-[#252525] flex items-center justify-center transition"
      >
        <ArrowDown className="w-3.5 h-3.5" />
      </button>
      <button
        type="button"
        onClick={onDelete}
        title="Delete item"
        className="w-6 h-6 rounded bg-red-950/40 hover:bg-red-900/80 text-red-400 hover:text-red-200 flex items-center justify-center transition ml-1"
      >
        <Trash2 className="w-3.5 h-3.5" />
      </button>
    </div>
  );
};
