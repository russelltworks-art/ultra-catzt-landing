import React from 'react';
import { Bold, Italic, Link as LinkIcon, CornerDownLeft } from 'lucide-react';

interface RichTextHelperProps {
  value: string;
  onChange: (val: string) => void;
  targetRef?: React.RefObject<HTMLTextAreaElement | null>;
}

export const RichTextHelper: React.FC<RichTextHelperProps> = ({ value, onChange }) => {
  const insertTag = (openTag: string, closeTag: string) => {
    onChange(`${value}${openTag}${closeTag}`);
  };

  return (
    <div className="flex items-center gap-1.5 mb-1.5">
      <span className="text-[10px] uppercase font-bold text-gray-500 tracking-wider mr-1">Format:</span>
      <button
        type="button"
        onClick={() => insertTag('<b>', '</b>')}
        title="Insert Bold tag"
        className="flex items-center gap-1 text-[11px] bg-[#222222] hover:bg-[#2e2e2e] text-gray-300 px-2 py-0.5 rounded border border-gray-700 transition font-bold"
      >
        <Bold className="w-3 h-3" /> B
      </button>
      <button
        type="button"
        onClick={() => insertTag('<i>', '</i>')}
        title="Insert Italic tag"
        className="flex items-center gap-1 text-[11px] bg-[#222222] hover:bg-[#2e2e2e] text-gray-300 px-2 py-0.5 rounded border border-gray-700 transition italic"
      >
        <Italic className="w-3 h-3" /> I
      </button>
      <button
        type="button"
        onClick={() => insertTag('<a href="/your-link/">', '</a>')}
        title="Insert Link tag"
        className="flex items-center gap-1 text-[11px] bg-[#222222] hover:bg-[#2e2e2e] text-gray-300 px-2 py-0.5 rounded border border-gray-700 transition"
      >
        <LinkIcon className="w-3 h-3" /> Link
      </button>
      <button
        type="button"
        onClick={() => onChange(`${value}<br/>`)}
        title="Insert Line Break"
        className="flex items-center gap-1 text-[11px] bg-[#222222] hover:bg-[#2e2e2e] text-gray-300 px-2 py-0.5 rounded border border-gray-700 transition"
      >
        <CornerDownLeft className="w-3 h-3" /> Break
      </button>
    </div>
  );
};
