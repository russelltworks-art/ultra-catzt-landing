import React, { useState, useEffect } from 'react';
import {
  CMSContentStore,
  CMSContentSchema,
  DEFAULT_CMS_CONTENT,
  PageSEOMetadata,
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

export const AdminCMSDashboard: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() =>
    CMSContentStore.isAuthenticated()
  );
  const [activeTab, setActiveTab] = useState<string>('hero');
  const [formData, setFormData] = useState<CMSContentSchema>(DEFAULT_CMS_CONTENT);
  const [saveStatus, setSaveStatus] = useState<string>('');
  const [lastPublished, setLastPublished] = useState<string>('');
  const [viewMode, setViewMode] = useState<'editor' | 'split' | 'preview'>('split');

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

  const handleSEOChange = (pageKey: keyof CMSContentSchema['pagesSEO'], updatedSEO: PageSEOMetadata) => {
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

  if (!isAuthenticated) {
    return <AdminAuthModal onSuccess={() => setIsAuthenticated(true)} />;
  }

  return (
    <div className="min-h-screen bg-[#111111] text-gray-100 flex flex-col font-sans h-screen overflow-hidden">
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
      <div className="flex flex-1 overflow-hidden">
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
            className={`overflow-y-auto p-6 md:p-8 bg-[#141414] ${
              viewMode === 'split' ? 'w-1/2 flex-none max-w-2xl border-r border-gray-800' : 'flex-1 max-w-4xl mx-auto'
            }`}
          >
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

            {activeTab === 'global' && (
              <GlobalSettingsEditor
                formData={formData}
                onChange={(f, val) => handleFieldChange('global', f, val)}
              />
            )}

            {activeTab === 'media' && <MediaLibraryView />}
          </main>
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
