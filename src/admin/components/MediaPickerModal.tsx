import React, { useState } from 'react';
import {
  X,
  Upload,
  Image as ImageIcon,
  Link as LinkIcon,
  Trash2,
  Check,
  CheckCircle2,
  FileImage,
} from 'lucide-react';
import { CMSContentStore, MediaAsset } from '../cmsContentStore';

interface MediaPickerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (url: string) => void;
  currentUrl?: string;
  title?: string;
}

export const MediaPickerModal: React.FC<MediaPickerModalProps> = ({
  isOpen,
  onClose,
  onSelect,
  currentUrl,
  title = 'Select Media Asset',
}) => {
  const [activeTab, setActiveTab] = useState<'library' | 'upload' | 'url'>('library');
  const [mediaList, setMediaList] = useState<MediaAsset[]>(() => CMSContentStore.getMediaAssets());
  const [selectedUrl, setSelectedUrl] = useState<string>(currentUrl || '');
  const [customUrlInput, setCustomUrlInput] = useState<string>(currentUrl || '');
  const [uploadPreview, setUploadPreview] = useState<{ url: string; name: string; size: string } | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  if (!isOpen) return null;

  const refreshList = () => {
    setMediaList(CMSContentStore.getMediaAssets());
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/') && !file.type.includes('svg')) {
      alert('Please upload an image file (PNG, JPG, SVG, WebP, GIF).');
      return;
    }

    const sizeKB = Math.round(file.size / 1024);
    const sizeStr = sizeKB > 1024 ? `${(sizeKB / 1024).toFixed(1)} MB` : `${sizeKB} KB`;

    const reader = new FileReader();
    reader.onload = (evt) => {
      const dataUrl = evt.target?.result as string;
      setUploadPreview({
        url: dataUrl,
        name: file.name,
        size: sizeStr,
      });
    };
    reader.readAsDataURL(file);
  };

  const handleSaveUpload = () => {
    if (!uploadPreview) return;
    setIsUploading(true);

    const asset = CMSContentStore.addMediaAsset({
      name: uploadPreview.name,
      url: uploadPreview.url,
      type: uploadPreview.name.endsWith('.svg') ? 'svg' : 'image',
      size: uploadPreview.size,
    });

    refreshList();
    setSelectedUrl(asset.url);
    setIsUploading(false);
    setActiveTab('library');
  };

  const handleDeleteCustom = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    if (window.confirm('Delete this uploaded asset from library?')) {
      CMSContentStore.deleteMediaAsset(id);
      refreshList();
      if (selectedUrl && !mediaList.find((m) => m.id === id && m.url === selectedUrl)) {
        // still selected or keep
      }
    }
  };

  const handleConfirmSelection = () => {
    let finalUrl = selectedUrl;
    if (activeTab === 'url') {
      finalUrl = customUrlInput.trim();
    }
    if (finalUrl) {
      onSelect(finalUrl);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/85 backdrop-blur-sm p-4 animate-in fade-in duration-150">
      <div className="w-full max-w-3xl bg-[#181818] border border-gray-800 rounded-2xl flex flex-col max-h-[85vh] shadow-2xl shadow-black overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-800 bg-[#1e1e1e]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-400/10 border border-amber-400/30 flex items-center justify-center text-amber-400">
              <ImageIcon className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-white">{title}</h3>
              <p className="text-[11px] text-gray-400">Choose from library, upload from disk, or enter an external URL.</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg hover:bg-gray-800 text-gray-400 hover:text-white flex items-center justify-center transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-gray-800 px-6 bg-[#161616]">
          <button
            onClick={() => setActiveTab('library')}
            className={`flex items-center gap-2 py-3 px-4 text-xs font-medium border-b-2 transition ${
              activeTab === 'library'
                ? 'border-amber-400 text-amber-300'
                : 'border-transparent text-gray-400 hover:text-gray-200'
            }`}
          >
            <ImageIcon className="w-3.5 h-3.5" /> Media Library ({mediaList.length})
          </button>
          <button
            onClick={() => setActiveTab('upload')}
            className={`flex items-center gap-2 py-3 px-4 text-xs font-medium border-b-2 transition ${
              activeTab === 'upload'
                ? 'border-amber-400 text-amber-300'
                : 'border-transparent text-gray-400 hover:text-gray-200'
            }`}
          >
            <Upload className="w-3.5 h-3.5" /> Upload File
          </button>
          <button
            onClick={() => setActiveTab('url')}
            className={`flex items-center gap-2 py-3 px-4 text-xs font-medium border-b-2 transition ${
              activeTab === 'url'
                ? 'border-amber-400 text-amber-300'
                : 'border-transparent text-gray-400 hover:text-gray-200'
            }`}
          >
            <LinkIcon className="w-3.5 h-3.5" /> External URL
          </button>
        </div>

        {/* Tab Content Body */}
        <div className="flex-1 overflow-y-auto p-6 min-h-[340px]">
          {/* 1. Media Library Grid */}
          {activeTab === 'library' && (
            <div>
              {mediaList.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 text-gray-500">
                  <FileImage className="w-12 h-12 stroke-[1.5] mb-2 opacity-50" />
                  <p className="text-sm">No media assets found.</p>
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3.5">
                  {mediaList.map((asset) => {
                    const isSelected = selectedUrl === asset.url;
                    return (
                      <div
                        key={asset.id}
                        onClick={() => setSelectedUrl(asset.url)}
                        className={`group relative bg-[#131313] border rounded-xl overflow-hidden cursor-pointer transition flex flex-col ${
                          isSelected
                            ? 'border-amber-400 ring-2 ring-amber-400/20 bg-amber-400/5'
                            : 'border-gray-800 hover:border-gray-700'
                        }`}
                      >
                        {/* Thumbnail Container */}
                        <div className="aspect-video bg-[#0c0c0c] flex items-center justify-center p-2 relative overflow-hidden">
                          <img
                            src={asset.url}
                            alt={asset.name}
                            className="max-h-full max-w-full object-contain filter drop-shadow group-hover:scale-105 transition duration-200"
                            onError={(e) => {
                              (e.target as HTMLElement).style.display = 'none';
                            }}
                          />
                          {isSelected && (
                            <div className="absolute top-2 right-2 w-5 h-5 bg-amber-400 text-black rounded-full flex items-center justify-center shadow">
                              <Check className="w-3 h-3 stroke-[3]" />
                            </div>
                          )}
                          {asset.isCustom && (
                            <button
                              onClick={(e) => handleDeleteCustom(e, asset.id)}
                              title="Delete custom asset"
                              className="absolute top-2 left-2 w-6 h-6 bg-red-900/80 hover:bg-red-700 text-red-200 rounded-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition shadow"
                            >
                              <Trash2 className="w-3 h-3" />
                            </button>
                          )}
                        </div>

                        {/* Metadata Details */}
                        <div className="p-2.5 bg-[#181818] border-t border-gray-800/80 flex flex-col gap-0.5">
                          <p className="text-xs font-medium text-gray-200 truncate" title={asset.name}>
                            {asset.name}
                          </p>
                          <div className="flex items-center justify-between text-[10px] text-gray-500">
                            <span>{asset.size || 'Local'}</span>
                            <span className="uppercase">{asset.type}</span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {/* 2. Upload File Tab */}
          {activeTab === 'upload' && (
            <div className="space-y-4">
              <label className="border-2 border-dashed border-gray-700 hover:border-amber-400/80 rounded-2xl p-8 flex flex-col items-center justify-center text-center cursor-pointer transition bg-[#131313] hover:bg-[#1c1c1c]">
                <Upload className="w-10 h-10 text-amber-400/80 mb-3" />
                <p className="text-sm font-semibold text-gray-200">Click or drag image to upload</p>
                <p className="text-xs text-gray-500 mt-1">Supports PNG, JPG, SVG, WebP up to 5MB</p>
                <input type="file" accept="image/*,.svg" onChange={handleFileChange} className="hidden" />
              </label>

              {uploadPreview && (
                <div className="bg-[#202020] border border-gray-700 rounded-xl p-4 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3.5 min-w-0">
                    <div className="w-14 h-14 bg-black/60 rounded-lg overflow-hidden flex items-center justify-center shrink-0 border border-gray-800">
                      <img src={uploadPreview.url} alt="Preview" className="max-w-full max-h-full object-contain" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-semibold text-white truncate">{uploadPreview.name}</p>
                      <p className="text-[11px] text-gray-400">{uploadPreview.size}</p>
                    </div>
                  </div>
                  <button
                    onClick={handleSaveUpload}
                    disabled={isUploading}
                    className="bg-amber-400 hover:bg-amber-300 text-black px-4 py-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 shrink-0 transition shadow-lg shadow-amber-400/10"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Save & Use Image
                  </button>
                </div>
              )}
            </div>
          )}

          {/* 3. External URL Tab */}
          {activeTab === 'url' && (
            <div className="space-y-4 max-w-lg">
              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1.5">Direct Image or Icon URL</label>
                <input
                  type="text"
                  placeholder="https://example.com/image.png or /wp-content/..."
                  value={customUrlInput}
                  onChange={(e) => setCustomUrlInput(e.target.value)}
                  className="w-full bg-[#111111] border border-gray-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              {customUrlInput && (
                <div className="bg-[#141414] border border-gray-800 rounded-xl p-4">
                  <p className="text-xs text-gray-400 mb-2">Image Preview:</p>
                  <div className="h-32 bg-black/50 rounded-lg flex items-center justify-center overflow-hidden border border-gray-800">
                    <img
                      src={customUrlInput}
                      alt="URL Preview"
                      className="max-h-full max-w-full object-contain"
                      onError={(e) => {
                        (e.target as HTMLElement).style.display = 'none';
                      }}
                    />
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer Action Controls */}
        <div className="px-6 py-3.5 bg-[#141414] border-t border-gray-800 flex items-center justify-between">
          <div className="text-xs text-gray-400 truncate max-w-md">
            {activeTab === 'url' ? customUrlInput : selectedUrl ? `Selected: ${selectedUrl}` : 'No asset selected'}
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-lg text-xs font-medium text-gray-400 hover:text-white hover:bg-gray-800 transition"
            >
              Cancel
            </button>
            <button
              onClick={handleConfirmSelection}
              disabled={activeTab === 'url' ? !customUrlInput.trim() : !selectedUrl}
              className="px-5 py-2 rounded-lg text-xs font-semibold bg-amber-400 hover:bg-amber-300 text-black transition shadow-md shadow-amber-400/20 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Apply Asset
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
