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
import { GripVertical } from 'lucide-react';

export const AdminCMSDashboard: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() =>
    CMSContentStore.isAuthenticated()
  );
  const [activeTab, setActiveTab] = useState<string>('hero');
  const [formData, setFormData] = useState<CMSContentSchema>(DEFAULT_CMS_CONTENT);
  const [saveStatus, setSaveStatus] = useState<string>('');
  const [lastPublished, setLastPublished] = useState<string>('');
  const [viewMode, setViewMode] = useState<'editor' | 'split' | 'preview'>('split');

  // Draggable Split Pane Width (persisted in localStorage)
  const [splitRatio, setSplitRatio] = useState<number>(() => {
    const saved = localStorage.getItem('catzt_cms_split_ratio');
    return saved ? Math.min(75, Math.max(25, parseFloat(saved))) : 48;
  });
  const [isResizing, setIsResizing] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const draft = CMSContentStore.getDraftContent();
    setFormData(draft);
    setLastPublished(draft.meta?.lastPublished || '');
  }, []);

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
        if (newRatio >= 20 && newRatio <= 80) {
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

  if (!isAuthenticated) {
    return <AdminAuthModal onSuccess={() => setIsAuthenticated(true)} />;
  }

  return (
    <div className="min-h-screen bg-[#0a0a0c] text-zinc-100 flex flex-col font-sans h-screen overflow-hidden">
      {/* Top Header */}
      <AdminHeader
        lastPublished={lastPublished}
        saveStatus={saveStatus}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        onSaveDraft={handleSaveDraft}
        onPublish={handlePublish}
        onLogout={handleLogout}
      />

      {/* Main App Body */}
      <div ref={containerRef} className="flex flex-1 overflow-hidden relative">
        {/* Left Sidebar */}
        {viewMode !== 'preview' && (
          <AdminSidebar
            activeTab={activeTab}
            onSelectTab={setActiveTab}
            onExport={handleExport}
            onImport={handleImport}
            onReset={handleReset}
          />
        )}

        {/* Center Editor Panel */}
        {viewMode !== 'preview' && (
          <main
            style={{
              width: viewMode === 'split' ? `${splitRatio}%` : '100%',
            }}
            className={`overflow-y-auto p-6 md:p-8 bg-[#0e0e11] shrink-0 transition-[width] duration-75 ${
              viewMode === 'split' ? '' : 'flex-1 max-w-5xl mx-auto'
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
        {viewMode === 'split' && (
          <div
            onMouseDown={startResizing}
            className={`w-2 hover:w-2.5 bg-[#17171b] hover:bg-amber-400 cursor-col-resize select-none flex items-center justify-center transition-colors z-20 shrink-0 border-l border-r border-zinc-800 ${
              isResizing ? 'bg-amber-400 w-2.5 shadow-lg shadow-amber-400/40' : ''
            }`}
            title="Drag left or right to resize editor & live preview"
          >
            <div className="w-1 h-8 rounded-full bg-zinc-600 hover:bg-black transition" />
          </div>
        )}

        {/* Right Live Split Preview */}
        {viewMode !== 'editor' && (
          <LiveSplitPreview formData={formData} currentTab={activeTab} />
        )}
      </div>
    </div>
  );
};

export default AdminCMSDashboard;
