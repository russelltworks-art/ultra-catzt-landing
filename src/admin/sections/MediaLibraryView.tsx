import React, { useState } from 'react';
import { CMSContentStore, MediaAsset } from '../cmsContentStore';
import {
  Image as ImageIcon,
  Upload,
  Copy,
  Trash2,
  Check,
  CheckCircle2,
  ExternalLink,
} from 'lucide-react';

export const MediaLibraryView: React.FC = () => {
  const [mediaList, setMediaList] = useState<MediaAsset[]>(() => CMSContentStore.getMediaAssets());
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [uploadPreview, setUploadPreview] = useState<{ url: string; name: string; size: string } | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const refreshList = () => {
    setMediaList(CMSContentStore.getMediaAssets());
  };

  const handleCopy = (id: string, url: string) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

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

    CMSContentStore.addMediaAsset({
      name: uploadPreview.name,
      url: uploadPreview.url,
      type: uploadPreview.name.endsWith('.svg') ? 'svg' : 'image',
      size: uploadPreview.size,
    });

    refreshList();
    setUploadPreview(null);
    setIsUploading(false);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Delete this uploaded image from the media library?')) {
      CMSContentStore.deleteMediaAsset(id);
      refreshList();
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <div className="border-b border-gray-800 pb-4 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            Media Asset Library <ImageIcon className="w-4 h-4 text-amber-400" />
          </h2>
          <p className="text-xs text-gray-400 mt-0.5">
            Upload, preview, and organize graphics, client partner logos, and practice photography.
          </p>
        </div>
        <span className="text-xs bg-gray-800 text-gray-300 px-3 py-1 rounded-lg border border-gray-700 font-mono">
          {mediaList.length} Assets Total
        </span>
      </div>

      {/* Upload Zone */}
      <div className="bg-[#181818] p-5 rounded-2xl border border-gray-800 space-y-4">
        <label className="border-2 border-dashed border-gray-700 hover:border-amber-400/80 rounded-xl p-6 flex flex-col items-center justify-center text-center cursor-pointer transition bg-[#131313] hover:bg-[#1c1c1c]">
          <Upload className="w-8 h-8 text-amber-400/80 mb-2" />
          <p className="text-sm font-semibold text-gray-200">Upload New Visual Asset</p>
          <p className="text-xs text-gray-500 mt-1">Drag and drop or click to browse (PNG, SVG, JPG, WebP)</p>
          <input type="file" accept="image/*,.svg" onChange={handleFileChange} className="hidden" />
        </label>

        {uploadPreview && (
          <div className="bg-[#222222] border border-gray-700 rounded-xl p-4 flex items-center justify-between gap-4 animate-in fade-in">
            <div className="flex items-center gap-3.5 min-w-0">
              <div className="w-14 h-14 bg-black/60 rounded-lg overflow-hidden flex items-center justify-center shrink-0 border border-gray-700">
                <img src={uploadPreview.url} alt="Upload preview" className="max-w-full max-h-full object-contain" />
              </div>
              <div className="min-w-0">
                <p className="text-xs font-semibold text-white truncate">{uploadPreview.name}</p>
                <p className="text-[11px] text-gray-400">{uploadPreview.size}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setUploadPreview(null)}
                className="px-3 py-1.5 rounded-lg text-xs text-gray-400 hover:text-white"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSaveUpload}
                disabled={isUploading}
                className="bg-amber-400 hover:bg-amber-300 text-black px-4 py-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition shadow-md shadow-amber-400/10"
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                Confirm & Add to Library
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Assets Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {mediaList.map((asset) => (
          <div
            key={asset.id}
            className="group bg-[#171717] border border-gray-800 rounded-xl overflow-hidden flex flex-col hover:border-gray-700 transition"
          >
            {/* Visual Container */}
            <div className="aspect-video bg-[#0c0c0c] flex items-center justify-center p-3 relative overflow-hidden">
              <img
                src={asset.url}
                alt={asset.name}
                className="max-h-full max-w-full object-contain group-hover:scale-105 transition duration-200"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
              <div className="absolute top-2 right-2 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition">
                <button
                  type="button"
                  onClick={() => handleCopy(asset.id, asset.url)}
                  title="Copy URL"
                  className="w-7 h-7 bg-black/80 hover:bg-black text-gray-200 rounded-md flex items-center justify-center shadow"
                >
                  {copiedId === asset.id ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
                {asset.isCustom && (
                  <button
                    type="button"
                    onClick={() => handleDelete(asset.id)}
                    title="Delete Asset"
                    className="w-7 h-7 bg-red-900/80 hover:bg-red-700 text-red-200 rounded-md flex items-center justify-center shadow"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>

            {/* Info */}
            <div className="p-3 bg-[#1a1a1a] border-t border-gray-800/80 flex flex-col gap-1">
              <p className="text-xs font-semibold text-white truncate" title={asset.name}>
                {asset.name}
              </p>
              <div className="flex items-center justify-between text-[10px] text-gray-400 font-mono">
                <span>{asset.size || 'Stock'}</span>
                <span className="uppercase bg-gray-800 px-1.5 py-0.5 rounded text-[9px] text-gray-300">
                  {asset.type}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
