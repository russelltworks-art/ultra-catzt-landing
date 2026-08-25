import React, { useState } from 'react';
import { Image as ImageIcon, Upload, Trash2, CheckCircle2, RefreshCw } from 'lucide-react';
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

  const getAspectClass = () => {
    switch (aspectRatio) {
      case 'square':
        return 'aspect-square max-w-[140px]';
      case 'wide':
        return 'aspect-[21/9] w-full';
      case 'video':
      default:
        return 'aspect-video w-full max-w-sm';
    }
  };

  return (
    <div className="bg-[#181818] p-4 rounded-2xl border border-gray-800 space-y-3">
      <div className="flex items-center justify-between">
        <div>
          <label className="block text-xs font-semibold text-gray-200">{label}</label>
          {description && <p className="text-[11px] text-gray-400 mt-0.5">{description}</p>}
        </div>
        {imageUrl && (
          <button
            type="button"
            onClick={() => onChange('')}
            className="text-[11px] text-red-400 hover:text-red-300 flex items-center gap-1 transition"
          >
            <Trash2 className="w-3 h-3" /> Remove
          </button>
        )}
      </div>

      {imageUrl ? (
        /* Image Preview Box with Controls */
        <div className="flex flex-col sm:flex-row items-center gap-4 bg-[#121212] p-3 rounded-xl border border-gray-700/80">
          <div
            className={`bg-black/70 rounded-lg overflow-hidden flex items-center justify-center p-2 border border-gray-800 shrink-0 ${getAspectClass()}`}
          >
            <img
              src={imageUrl}
              alt={label}
              className="max-h-full max-w-full object-contain filter drop-shadow"
              onError={(e) => {
                (e.target as HTMLElement).style.display = 'none';
              }}
            />
          </div>

          <div className="flex-1 min-w-0 space-y-2 w-full">
            <p className="text-[11px] text-gray-300 font-mono truncate bg-[#1c1c1c] px-2.5 py-1.5 rounded-lg border border-gray-700/60">
              {imageUrl}
            </p>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setIsModalOpen(true)}
                className="flex items-center gap-1.5 bg-amber-400/20 hover:bg-amber-400/30 text-amber-300 border border-amber-400/40 text-xs px-3 py-1.5 rounded-lg font-medium transition"
              >
                <RefreshCw className="w-3 h-3" /> Change / Choose Asset
              </button>
              <label className="flex items-center gap-1.5 bg-gray-800 hover:bg-gray-700 text-gray-200 text-xs px-3 py-1.5 rounded-lg cursor-pointer transition">
                <Upload className="w-3 h-3" /> Upload File
                <input type="file" accept="image/*,.svg" onChange={handleFileInput} className="hidden" />
              </label>
            </div>
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
          className={`border-2 border-dashed rounded-xl p-6 flex flex-col items-center justify-center text-center transition cursor-pointer ${
            isDragging
              ? 'border-amber-400 bg-amber-400/10'
              : 'border-gray-700 hover:border-amber-400/60 bg-[#131313] hover:bg-[#1a1a1a]'
          }`}
        >
          <div className="w-10 h-10 rounded-full bg-amber-400/10 border border-amber-400/20 flex items-center justify-center text-amber-400 mb-2">
            <ImageIcon className="w-5 h-5" />
          </div>
          <p className="text-xs font-semibold text-gray-200">Drag & drop image here or click to browse</p>
          <p className="text-[10px] text-gray-500 mt-1">Supports PNG, JPG, SVG, WebP (auto-optimized)</p>

          <div className="flex items-center gap-2 mt-3.5">
            <label className="flex items-center gap-1.5 bg-amber-400 hover:bg-amber-300 text-black text-xs font-semibold px-3.5 py-1.5 rounded-lg cursor-pointer transition shadow">
              <Upload className="w-3 h-3" /> Upload Image
              <input type="file" accept="image/*,.svg" onChange={handleFileInput} className="hidden" />
            </label>
            <button
              type="button"
              onClick={() => setIsModalOpen(true)}
              className="bg-gray-800 hover:bg-gray-700 text-gray-200 text-xs px-3.5 py-1.5 rounded-lg font-medium transition"
            >
              Choose from Library
            </button>
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
