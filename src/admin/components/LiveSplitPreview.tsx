import React, { useState, useRef } from 'react';
import { CMSContentSchema } from '../cmsContentStore';
import {
  Smartphone,
  Tablet,
  Monitor,
  RotateCcw,
  ExternalLink,
  Sparkles,
  Maximize2,
  ZoomIn,
  ZoomOut,
  Globe,
} from 'lucide-react';

interface LiveSplitPreviewProps {
  formData: CMSContentSchema;
  currentTab: string;
}

export const LiveSplitPreview: React.FC<LiveSplitPreviewProps> = ({
  formData,
  currentTab,
}) => {
  const [device, setDevice] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [zoomLevel, setZoomLevel] = useState<number>(100);
  const [refreshKey, setRefreshKey] = useState<number>(0);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // Send real-time updates directly into the iframe DOM
  React.useEffect(() => {
    if (iframeRef.current && iframeRef.current.contentWindow) {
      iframeRef.current.contentWindow.postMessage(
        {
          type: 'CATZT_CMS_DRAFT_UPDATE',
          payload: formData,
        },
        '*'
      );
    }
  }, [formData]);

  const handleRefresh = () => {
    setRefreshKey((k) => k + 1);
  };

  // Map active tab to sub-page route
  const getRouteForTab = () => {
    switch (currentTab) {
      case 'aPropos':
        return '/a-propos/';
      case 'expertises':
        return '/expertises/';
      case 'references':
        return '/references/';
      case 'actualites':
        return '/actualites/';
      case 'nousRejoindre':
        return '/nous-rejoindre/';
      case 'contact':
        return '/contact/';
      default:
        return '/';
    }
  };

  return (
    <div className="flex-1 bg-[#09090b] flex flex-col h-full border-l border-zinc-800/80 overflow-hidden select-none">
      {/* Top Device & Canvas Bar */}
      <div className="bg-[#111114] border-b border-zinc-800/80 px-4 py-2.5 flex items-center justify-between gap-3 text-xs shrink-0">
        {/* Device Switcher */}
        <div className="flex items-center gap-1 bg-[#18181c] p-1 rounded-xl border border-zinc-800">
          <button
            type="button"
            onClick={() => {
              setDevice('desktop');
              setZoomLevel(100);
            }}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-lg font-semibold transition ${
              device === 'desktop'
                ? 'bg-amber-400 text-black shadow-sm'
                : 'text-zinc-400 hover:text-white'
            }`}
            title="Desktop Canvas"
          >
            <Monitor className="w-3.5 h-3.5" /> Desktop
          </button>
          <button
            type="button"
            onClick={() => {
              setDevice('tablet');
              setZoomLevel(90);
            }}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-lg font-semibold transition ${
              device === 'tablet'
                ? 'bg-amber-400 text-black shadow-sm'
                : 'text-zinc-400 hover:text-white'
            }`}
            title="Tablet (768px)"
          >
            <Tablet className="w-3.5 h-3.5" /> Tablet
          </button>
          <button
            type="button"
            onClick={() => {
              setDevice('mobile');
              setZoomLevel(85);
            }}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-lg font-semibold transition ${
              device === 'mobile'
                ? 'bg-amber-400 text-black shadow-sm'
                : 'text-zinc-400 hover:text-white'
            }`}
            title="Mobile (375px iPhone)"
          >
            <Smartphone className="w-3.5 h-3.5" /> Mobile
          </button>
        </div>

        {/* URL Bar */}
        <div className="hidden sm:flex items-center gap-2 bg-[#18181c] border border-zinc-800/80 px-3 py-1 rounded-xl text-zinc-400 font-mono text-[11px] max-w-xs truncate flex-1 justify-center">
          <Globe className="w-3 h-3 text-amber-400 shrink-0" />
          <span className="truncate">https://catzt.com{getRouteForTab()}</span>
        </div>

        {/* Zoom & Canvas Actions */}
        <div className="flex items-center gap-2">
          <div className="hidden md:flex items-center gap-1 text-[11px] font-mono text-zinc-400 bg-[#18181c] px-2 py-1 rounded-lg border border-zinc-800">
            <button
              onClick={() => setZoomLevel((z) => Math.max(50, z - 10))}
              className="p-0.5 hover:text-white"
            >
              -
            </button>
            <span className="w-8 text-center">{zoomLevel}%</span>
            <button
              onClick={() => setZoomLevel((z) => Math.min(125, z + 10))}
              className="p-0.5 hover:text-white"
            >
              +
            </button>
          </div>

          <button
            type="button"
            onClick={handleRefresh}
            className="p-1.5 text-zinc-400 hover:text-white rounded-lg hover:bg-zinc-800 transition"
            title="Hard Reload Canvas"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>

          <a
            href={getRouteForTab()}
            target="_blank"
            rel="noopener noreferrer"
            className="p-1.5 text-zinc-400 hover:text-white rounded-lg hover:bg-zinc-800 transition"
            title="Open in Full Browser Tab"
          >
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* Main Canvas Area */}
      <div className="flex-1 bg-[#060608] flex items-center justify-center p-4 overflow-auto relative">
        <div
          style={{
            transform: `scale(${zoomLevel / 100})`,
            transformOrigin: 'center center',
            transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
          }}
          className={`h-full flex flex-col transition-all duration-300 shadow-2xl ${
            device === 'desktop'
              ? 'w-full rounded-xl border border-zinc-800/80 overflow-hidden'
              : device === 'tablet'
              ? 'w-[768px] h-[92%] rounded-[32px] border-[10px] border-zinc-800 shadow-2xl overflow-hidden'
              : 'w-[375px] h-[92%] rounded-[48px] border-[12px] border-zinc-800 shadow-2xl overflow-hidden'
          }`}
        >
          {/* Mobile Notch Bar */}
          {device === 'mobile' && (
            <div className="w-full bg-black h-6 flex items-center justify-center shrink-0">
              <div className="w-20 h-3.5 bg-zinc-900 rounded-full" />
            </div>
          )}

          {/* IFrame Screen */}
          <iframe
            key={refreshKey}
            ref={iframeRef}
            src={getRouteForTab()}
            title="Live Canvas Screen"
            className="w-full flex-1 border-0 bg-black"
          />
        </div>
      </div>
    </div>
  );
};
