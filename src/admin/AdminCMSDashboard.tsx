import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
  CMSContentStore,
  CMSContentSchema,
  DEFAULT_CMS_CONTENT,
  PageSEOMetadata,
  TrackingIntegrations,
} from './cmsContentStore';
import { AdminAuthModal } from './components/AdminAuthModal';
import { AdminHeader } from './components/AdminHeader';
import { AdminSidebar } from './components/AdminSidebar';
import { LiveSplitPreview } from './components/LiveSplitPreview';
import { HeroEditor } from './sections/HeroEditor';
import { AProposEditor } from './sections/AProposEditor';
import { ExpertisesEditor } from './sections/ExpertisesEditor';
import { ReferencesEditor } from './sections/ReferencesEditor';
import { ActualitesEditor } from './sections/ActualitesEditor';
import { NousRejoindreEditor } from './sections/NousRejoindreEditor';
import { ContactEditor } from './sections/ContactEditor';
import { GlobalSettingsEditor } from './sections/GlobalSettingsEditor';
import { MediaLibraryView } from './sections/MediaLibraryView';
import { SocialIntegrationsEditor } from './sections/SocialIntegrationsEditor';
import { VisualSectionBuilder } from './components/VisualSectionBuilder';
import { GripVertical, Minimize2 } from 'lucide-react';

export const AdminCMSDashboard: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() =>
    CMSContentStore.isAuthenticated()
  );
  const [activeTab, setActiveTab] = useState<string>('builder');
  const [formData, setFormData] = useState<CMSContentSchema>(DEFAULT_CMS_CONTENT);
  const [saveStatus, setSaveStatus] = useState<string>('');
  const [lastPublished, setLastPublished] = useState<string>('');
  const [viewMode, setViewMode] = useState<'editor' | 'split' | 'preview'>('split');

  // Figma-Style Expansive Workspace States
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState<boolean>(() => {
    return localStorage.getItem('catzt_cms_sidebar_collapsed') === 'true';
  });
  const [isZenMode, setIsZenMode] = useState<boolean>(false);

  // Draggable Split Pane Width (15% to 85%)
  const [splitRatio, setSplitRatio] = useState<number>(() => {
    const saved = localStorage.getItem('catzt_cms_split_ratio');
    return saved ? Math.min(85, Math.max(15, parseFloat(saved))) : 46;
  });
  const [isResizing, setIsResizing] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const draft = CMSContentStore.getDraftContent();
    setFormData(draft);
    setLastPublished(draft.meta?.lastPublished || '');
  }, []);

  const handleToggleSidebar = () => {
    setIsSidebarCollapsed((prev) => {
      const next = !prev;
      localStorage.setItem('catzt_cms_sidebar_collapsed', next.toString());
      return next;
    });
  };

  const handleFieldChange = (section: keyof CMSContentSchema, field: string, value: any) => {
    setFormData((prev) => {
      const updated = {
        ...prev,
        [section]: {
          ...(prev[section] as any),
          [field]: value,
        },
      };
      CMSContentStore.saveDraft(updated);
      return updated;
    });
  };

  const handleSEOChange = (
    pageKey: keyof CMSContentSchema['pagesSEO'],
    updatedSEO: PageSEOMetadata
  ) => {
    setFormData((prev) => {
      const updated: CMSContentSchema = {
        ...prev,
        pagesSEO: {
          ...prev.pagesSEO,
          [pageKey]: updatedSEO,
        },
      };
      CMSContentStore.saveDraft(updated);
      return updated;
    });
  };

  const handleIntegrationsChange = (field: keyof TrackingIntegrations, value: any) => {
    setFormData((prev) => {
      const updated: CMSContentSchema = {
        ...prev,
        integrations: {
          ...prev.integrations,
          [field]: value,
        },
      };
      CMSContentStore.saveDraft(updated);
      return updated;
    });
  };

  const handleSaveDraft = () => {
    CMSContentStore.saveDraft(formData);
    setSaveStatus('Draft saved locally!');
    setTimeout(() => setSaveStatus(''), 3000);
  };

  const handlePublish = () => {
    const pub = CMSContentStore.publish(formData);
    setFormData(pub);
    setLastPublished(pub.meta.lastPublished);
    setSaveStatus('🚀 Content published live to landing page!');
    setTimeout(() => setSaveStatus(''), 4000);
  };

  const handleReset = () => {
    if (window.confirm('Reset all landing page content to defaults?')) {
      const def = CMSContentStore.resetToDefault();
      setFormData(def);
      setSaveStatus('Reset to default values.');
      setTimeout(() => setSaveStatus(''), 3000);
    }
  };

  const handleExport = () => {
    const dataStr =
      'data:text/json;charset=utf-8,' +
      encodeURIComponent(JSON.stringify(formData, null, 2));
    const a = document.createElement('a');
    a.href = dataStr;
    a.download = `catzt-cms-backup-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
  };

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (evt) => {
      const content = evt.target?.result as string;
      if (CMSContentStore.importJSON(content)) {
        setFormData(CMSContentStore.getPublishedContent());
        setSaveStatus('Backup imported successfully!');
        setTimeout(() => setSaveStatus(''), 3000);
      } else {
        alert('Invalid JSON file format.');
      }
    };
    reader.readAsText(file);
  };

  const handleLogout = () => {
    if (window.confirm('Log out from CMS dashboard?')) {
      CMSContentStore.logout();
      setIsAuthenticated(false);
    }
  };

  // Draggable Divider Handlers
  const startResizing = useCallback(() => {
    setIsResizing(true);
  }, []);

  const stopResizing = useCallback(() => {
    setIsResizing(false);
  }, []);

  const resize = useCallback(
    (e: MouseEvent) => {
      if (isResizing && containerRef.current) {
        const containerRect = containerRef.current.getBoundingClientRect();
        const mouseX = e.clientX - containerRect.left;
        const newRatio = (mouseX / containerRect.width) * 100;
        if (newRatio >= 15 && newRatio <= 85) {
          setSplitRatio(newRatio);
          localStorage.setItem('catzt_cms_split_ratio', newRatio.toString());
        }
      }
    },
    [isResizing]
  );

  useEffect(() => {
    if (isResizing) {
      window.addEventListener('mousemove', resize);
      window.addEventListener('mouseup', stopResizing);
    } else {
      window.removeEventListener('mousemove', resize);
      window.removeEventListener('mouseup', stopResizing);
    }
    return () => {
      window.removeEventListener('mousemove', resize);
      window.removeEventListener('mouseup', stopResizing);
    };
  }, [isResizing, resize, stopResizing]);

  // Keyboard shortcuts (Ctrl+\ for sidebar, Escape for Zen mode)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === '\\') {
        e.preventDefault();
        handleToggleSidebar();
      }
      if (e.key === 'Escape' && isZenMode) {
        setIsZenMode(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isZenMode]);

  if (!isAuthenticated) {
    return <AdminAuthModal onSuccess={() => setIsAuthenticated(true)} />;
  }

  return (
    <div className="min-h-screen bg-[#09090b] text-zinc-100 flex flex-col font-sans h-screen overflow-hidden">
      {/* Top Header (Hidden in Zen Mode) */}
      {!isZenMode && (
        <AdminHeader
          lastPublished={lastPublished}
          saveStatus={saveStatus}
          viewMode={viewMode}
          onViewModeChange={setViewMode}
          onSaveDraft={handleSaveDraft}
          onPublish={handlePublish}
          onLogout={handleLogout}
          isZenMode={isZenMode}
          onToggleZenMode={() => setIsZenMode(true)}
          isSidebarCollapsed={isSidebarCollapsed}
          onToggleSidebar={handleToggleSidebar}
        />
      )}

      {/* Main Expansive Workspace */}
      <div ref={containerRef} className="flex flex-1 overflow-hidden relative">
        {/* Left Sidebar (Hidden in Zen Mode or Preview Mode) */}
        {!isZenMode && viewMode !== 'preview' && (
          <AdminSidebar
            activeTab={activeTab}
            onSelectTab={setActiveTab}
            onExport={handleExport}
            onImport={handleImport}
            onReset={handleReset}
            isCollapsed={isSidebarCollapsed}
            onToggleCollapse={handleToggleSidebar}
          />
        )}

        {/* Center Editor Panel (Expansive, Fluid Resizable Width) */}
        {viewMode !== 'preview' && !isZenMode && (
          <main
            style={{
              width: viewMode === 'split' ? `${splitRatio}%` : '100%',
            }}
            className={`overflow-y-auto p-4 sm:p-6 md:p-8 bg-[#0d0d10] shrink-0 transition-[width] duration-75 ${
              viewMode === 'split' ? '' : 'flex-1 max-w-6xl mx-auto'
            }`}
          >
            {activeTab === 'builder' && (
              <VisualSectionBuilder
                formData={formData}
                onChange={setFormData}
                onNavigateTab={(tab) => setActiveTab(tab)}
              />
            )}

            {activeTab === 'hero' && (
              <HeroEditor
                formData={formData}
                onChange={(f, val) => handleFieldChange('hero', f, val)}
                onSEOChange={(seo) => handleSEOChange('hero', seo)}
              />
            )}

            {activeTab === 'aPropos' && (
              <AProposEditor
                formData={formData}
                onChange={(f, val) => handleFieldChange('aPropos', f, val)}
                onSEOChange={(seo) => handleSEOChange('aPropos', seo)}
              />
            )}

            {activeTab === 'expertises' && (
              <ExpertisesEditor
                formData={formData}
                onChange={(f, val) => handleFieldChange('expertises', f, val)}
                onSEOChange={(seo) => handleSEOChange('expertises', seo)}
              />
            )}

            {activeTab === 'references' && (
              <ReferencesEditor
                formData={formData}
                onChange={(f, val) => handleFieldChange('references', f, val)}
                onSEOChange={(seo) => handleSEOChange('references', seo)}
              />
            )}

            {activeTab === 'actualites' && (
              <ActualitesEditor
                formData={formData}
                onChange={(f, val) => handleFieldChange('actualites', f, val)}
                onSEOChange={(seo) => handleSEOChange('actualites', seo)}
              />
            )}

            {activeTab === 'nousRejoindre' && (
              <NousRejoindreEditor
                formData={formData}
                onChange={(f, val) => handleFieldChange('nousRejoindre', f, val)}
                onSEOChange={(seo) => handleSEOChange('nousRejoindre', seo)}
              />
            )}

            {activeTab === 'contact' && (
              <ContactEditor
                formData={formData}
                onChange={(f, val) => handleFieldChange('contact', f, val)}
                onGlobalChange={(f, val) => handleFieldChange('global', f, val)}
                onSEOChange={(seo) => handleSEOChange('contact', seo)}
              />
            )}

            {activeTab === 'seo-hub' && (
              <SocialIntegrationsEditor
                formData={formData}
                onChange={handleIntegrationsChange}
              />
            )}

            {activeTab === 'global' && (
              <GlobalSettingsEditor
                formData={formData}
                onChange={(f, val) => handleFieldChange('global', f, val)}
              />
            )}

            {activeTab === 'media' && <MediaLibraryView />}
          </main>
        )}

        {/* DRAGGABLE RESIZER DIVIDER */}
        {!isZenMode && viewMode === 'split' && (
          <div
            onMouseDown={startResizing}
            className={`w-2 hover:w-2.5 bg-[#141418] hover:bg-amber-400 cursor-col-resize select-none flex items-center justify-center transition-colors z-20 shrink-0 border-l border-r border-zinc-800 ${
              isResizing ? 'bg-amber-400 w-2.5 shadow-xl shadow-amber-400/50' : ''
            }`}
            title="Drag left or right (15% - 85%) to resize editor & live canvas"
          >
            <div className="w-0.5 h-8 rounded-full bg-zinc-600 hover:bg-black transition" />
          </div>
        )}

        {/* Right Live Split Preview / Full Canvas */}
        {(viewMode !== 'editor' || isZenMode) && (
          <div className="flex-1 flex flex-col h-full overflow-hidden relative">
            {/* Zen Mode Floating Exit Button */}
            {isZenMode && (
              <div className="absolute top-4 right-4 z-50 flex items-center gap-2 bg-[#121215]/90 backdrop-blur-md p-2 rounded-2xl border border-zinc-800 shadow-2xl">
                <span className="text-[11px] font-bold text-amber-300 px-2 font-mono">
                  Figma Zen Canvas (Press Esc to Exit)
                </span>
                <button
                  type="button"
                  onClick={() => setIsZenMode(false)}
                  className="bg-amber-400 hover:bg-amber-300 text-black text-xs font-bold px-3 py-1.5 rounded-xl shadow transition flex items-center gap-1"
                >
                  <Minimize2 className="w-3.5 h-3.5" /> Exit Zen Mode
                </button>
              </div>
            )}

            <LiveSplitPreview formData={formData} currentTab={activeTab} />
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminCMSDashboard;
