import React, { useState } from 'react';
import { Image as ImageIcon, Upload, Trash2, RefreshCw, Sparkles, FolderOpen } from 'lucide-react';
import { MediaPickerModal } from './MediaPickerModal';
import { CMSContentStore } from '../cmsContentStore';

interface VisualImageSlotProps {
  label: string;
  description?: string;
  imageUrl?: string;
  onChange: (url: string) => void;
  aspectRatio?: 'video' | 'square' | 'wide' | 'auto';
}

export const VisualImageSlot: React.FC<VisualImageSlotProps> = ({
  label,
  description,
  imageUrl,
  onChange,
  aspectRatio = 'video',
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (!file) return;
    uploadFile(file);
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    uploadFile(file);
  };

  const uploadFile = (file: File) => {
    if (!file.type.startsWith('image/') && !file.type.includes('svg')) {
      alert('Please upload an image file (PNG, JPG, SVG, WebP).');
      return;
    }

    const sizeKB = Math.round(file.size / 1024);
    const sizeStr = sizeKB > 1024 ? `${(sizeKB / 1024).toFixed(1)} MB` : `${sizeKB} KB`;

    const reader = new FileReader();
    reader.onload = (evt) => {
      const dataUrl = evt.target?.result as string;
      const asset = CMSContentStore.addMediaAsset({
        name: file.name,
        url: dataUrl,
        type: file.name.endsWith('.svg') ? 'svg' : 'image',
        size: sizeStr,
      });
      onChange(asset.url);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="bg-[#141418] p-4 rounded-2xl border border-zinc-800/80 space-y-3 shadow-sm flex flex-col justify-between">
      {/* Header */}
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0 flex-1">
          <label className="block text-xs font-bold text-zinc-200 truncate">{label}</label>
          {description && <p className="text-[11px] text-zinc-400 mt-0.5 line-clamp-2">{description}</p>}
        </div>
        {imageUrl && (
          <button
            type="button"
            onClick={() => onChange('')}
            className="text-[11px] text-red-400 hover:text-red-300 flex items-center gap-1 transition px-2 py-1 rounded-lg hover:bg-red-950/30 shrink-0"
            title="Remove Image"
          >
            <Trash2 className="w-3 h-3" /> Remove
          </button>
        )}
      </div>

      {imageUrl ? (
        /* Image Preview Box */
        <div className="space-y-2.5">
          <div className="relative w-full h-36 bg-black/60 rounded-xl overflow-hidden flex items-center justify-center p-2.5 border border-zinc-800/80 group">
            <img
              src={imageUrl}
              alt={label}
              className="max-h-full max-w-full object-contain filter drop-shadow transition group-hover:scale-105 duration-300"
              onError={(e) => {
                (e.target as HTMLElement).style.display = 'none';
              }}
            />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center gap-2 backdrop-blur-[2px]">
              <button
                type="button"
                onClick={() => setIsModalOpen(true)}
                className="bg-amber-400 hover:bg-amber-300 text-black text-xs font-bold px-3 py-1.5 rounded-lg shadow-lg transition flex items-center gap-1.5"
              >
                <FolderOpen className="w-3.5 h-3.5" /> Library
              </button>
            </div>
          </div>

          {/* Path caption */}
          <div className="flex items-center justify-between gap-2 text-[10px] text-zinc-400 bg-[#1a1a20] px-2.5 py-1.5 rounded-lg border border-zinc-800 font-mono">
            <span className="truncate">{imageUrl}</span>
          </div>

          {/* Action buttons */}
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => setIsModalOpen(true)}
              className="flex items-center justify-center gap-1.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs px-3 py-2 rounded-xl font-semibold border border-zinc-700/60 transition"
            >
              <FolderOpen className="w-3.5 h-3.5 text-amber-400" /> Choose
            </button>
            <label className="flex items-center justify-center gap-1.5 bg-amber-400/15 hover:bg-amber-400/25 text-amber-300 text-xs px-3 py-2 rounded-xl font-bold border border-amber-400/30 cursor-pointer transition shadow-sm">
              <Upload className="w-3.5 h-3.5" /> Upload
              <input type="file" accept="image/*,.svg" onChange={handleFileInput} className="hidden" />
            </label>
          </div>
        </div>
      ) : (
        /* Empty Visual Dropzone Slot */
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
          className={`border-2 border-dashed rounded-xl p-5 flex flex-col items-center justify-center text-center transition cursor-pointer ${
            isDragging
              ? 'border-amber-400 bg-amber-400/10'
              : 'border-zinc-800 hover:border-amber-400/60 bg-[#101013] hover:bg-[#16161a]'
          }`}
        >
          <div className="w-9 h-9 rounded-xl bg-amber-400/10 border border-amber-400/20 flex items-center justify-center text-amber-400 mb-2">
            <ImageIcon className="w-4 h-4" />
          </div>
          <p className="text-xs font-semibold text-zinc-200">Drag & drop image here</p>
          <p className="text-[10px] text-zinc-500 mt-0.5">PNG, JPG, SVG, WebP</p>

          <div className="grid grid-cols-2 gap-2 w-full mt-3">
            <button
              type="button"
              onClick={() => setIsModalOpen(true)}
              className="bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-[11px] py-1.5 rounded-lg font-semibold transition"
            >
              From Library
            </button>
            <label className="bg-amber-400 hover:bg-amber-300 text-black text-[11px] font-bold py-1.5 rounded-lg cursor-pointer transition flex items-center justify-center gap-1 shadow">
              <Upload className="w-3 h-3" /> Upload
              <input type="file" accept="image/*,.svg" onChange={handleFileInput} className="hidden" />
            </label>
          </div>
        </div>
      )}

      <MediaPickerModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        currentUrl={imageUrl}
        onSelect={(url) => {
          onChange(url);
          setIsModalOpen(false);
        }}
        title={`Select Image for ${label}`}
      />
    </div>
  );
};
