import React, { useState, useEffect, useRef } from 'react';
import {
  Monitor,
  Tablet,
  Smartphone,
  RotateCw,
  ExternalLink,
  Radio,
  Maximize2,
  ChevronDown,
} from 'lucide-react';
import { CMSContentSchema } from '../cmsContentStore';

interface LiveSplitPreviewProps {
  formData: CMSContentSchema;
  currentTab: string;
}

const PAGE_ROUTES: Array<{ id: string; label: string; path: string }> = [
  { id: 'hero', label: 'Homepage', path: '/' },
  { id: 'aPropos', label: 'A Propos', path: '/a-propos/' },
  { id: 'expertises', label: 'Expertises', path: '/expertises/' },
  { id: 'references', label: 'Références', path: '/references/' },
  { id: 'actualites', label: 'Actualités', path: '/actualites/' },
  { id: 'nousRejoindre', label: 'Nous Rejoindre', path: '/nous-rejoindre/' },
  { id: 'contact', label: 'Contact', path: '/contact/' },
  { id: 'mentions', label: 'Mentions Légales', path: '/mentions-legales/' },
];

export const LiveSplitPreview: React.FC<LiveSplitPreviewProps> = ({ formData, currentTab }) => {
  const [device, setDevice] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [selectedRoute, setSelectedRoute] = useState<string>('/');
  const [key, setKey] = useState<number>(0);
  const iframeRef = useRef<HTMLIFrameElement | null>(null);

  // Automatically suggest page route when switching tabs
  useEffect(() => {
    const matched = PAGE_ROUTES.find((r) => r.id === currentTab);
    if (matched && selectedRoute !== matched.path) {
      setSelectedRoute(matched.path);
    }
  }, [currentTab]);

  // Broadcast draft changes to iframe in real time
  useEffect(() => {
    if (iframeRef.current && iframeRef.current.contentWindow) {
      try {
        iframeRef.current.contentWindow.postMessage(
          {
            type: 'CATZT_CMS_DRAFT_UPDATE',
            payload: formData,
          },
          '*'
        );
      } catch (err) {
        console.warn('Could not postMessage to preview iframe:', err);
      }
    }
  }, [formData]);

  const handleRefresh = () => {
    setKey((prev) => prev + 1);
  };

  const getContainerWidth = () => {
    switch (device) {
      case 'mobile':
        return 'w-[375px] h-[720px] rounded-3xl border-4 border-gray-700 shadow-2xl';
      case 'tablet':
        return 'w-[768px] h-[860px] rounded-2xl border-4 border-gray-700 shadow-2xl';
      case 'desktop':
      default:
        return 'w-full h-full rounded-lg border border-gray-800';
    }
  };

  return (
    <div className="flex-1 bg-[#0c0c0c] border-l border-gray-800 flex flex-col h-full overflow-hidden">
      {/* Top Preview Control Bar */}
      <div className="bg-[#171717] border-b border-gray-800 px-4 py-2.5 flex items-center justify-between gap-3 shrink-0">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-emerald-950/60 border border-emerald-800 text-emerald-400 text-[10px] font-semibold tracking-wide">
            <Radio className="w-3 h-3 animate-pulse" /> Live Preview
          </div>

          {/* Route Dropdown */}
          <div className="relative">
            <select
              value={selectedRoute}
              onChange={(e) => setSelectedRoute(e.target.value)}
              className="bg-[#222222] border border-gray-700 text-gray-200 text-xs rounded-lg px-2.5 py-1 pr-6 appearance-none focus:outline-none focus:border-amber-400 cursor-pointer font-medium"
            >
              {PAGE_ROUTES.map((r) => (
                <option key={r.path} value={r.path}>
                  {r.label} ({r.path})
                </option>
              ))}
            </select>
            <ChevronDown className="w-3 h-3 text-gray-400 absolute right-2 top-2 pointer-events-none" />
          </div>
        </div>

        {/* Viewport Selectors */}
        <div className="flex items-center gap-1 bg-[#101010] p-0.5 rounded-lg border border-gray-800">
          <button
            type="button"
            onClick={() => setDevice('desktop')}
            title="Desktop View (100%)"
            className={`p-1.5 rounded-md transition ${
              device === 'desktop' ? 'bg-amber-400/20 text-amber-300' : 'text-gray-400 hover:text-gray-200'
            }`}
          >
            <Monitor className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={() => setDevice('tablet')}
            title="Tablet View (768px)"
            className={`p-1.5 rounded-md transition ${
              device === 'tablet' ? 'bg-amber-400/20 text-amber-300' : 'text-gray-400 hover:text-gray-200'
            }`}
          >
            <Tablet className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={() => setDevice('mobile')}
            title="Mobile View (375px)"
            className={`p-1.5 rounded-md transition ${
              device === 'mobile' ? 'bg-amber-400/20 text-amber-300' : 'text-gray-400 hover:text-gray-200'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Utility Buttons */}
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={handleRefresh}
            title="Reload Preview Frame"
            className="p-1.5 rounded-md text-gray-400 hover:text-white hover:bg-gray-800 transition"
          >
            <RotateCw className="w-3.5 h-3.5" />
          </button>
          <a
            href={selectedRoute}
            target="_blank"
            rel="noreferrer"
            title="Open in new tab"
            className="p-1.5 rounded-md text-gray-400 hover:text-white hover:bg-gray-800 transition"
          >
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* Frame Container */}
      <div className="flex-1 p-3 flex items-center justify-center overflow-auto bg-[#0a0a0a]">
        <div className={`transition-all duration-300 overflow-hidden bg-black flex flex-col ${getContainerWidth()}`}>
          <iframe
            key={`${selectedRoute}-${key}`}
            ref={iframeRef}
            src={selectedRoute}
            title="Live Landing Preview"
            className="w-full h-full border-0 bg-black flex-1"
            onLoad={() => {
              // Send initial state on load
              if (iframeRef.current?.contentWindow) {
                iframeRef.current.contentWindow.postMessage(
                  {
                    type: 'CATZT_CMS_DRAFT_UPDATE',
                    payload: formData,
                  },
                  '*'
                );
              }
            }}
          />
        </div>
      </div>
    </div>
  );
};
