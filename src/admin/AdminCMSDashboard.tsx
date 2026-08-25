import React, { useState, useEffect } from 'react';
import {
  CMSContentStore,
  CMSContentSchema,
  DEFAULT_CMS_CONTENT,
} from './cmsContentStore';
import {
  Layout,
  Home,
  Info,
  Layers,
  Award,
  Newspaper,
  Users,
  Mail,
  Save,
  Send,
  RotateCcw,
  ExternalLink,
  Download,
  Upload,
  CheckCircle,
  Sparkles,
} from 'lucide-react';

export const AdminCMSDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('hero');
  const [formData, setFormData] = useState<CMSContentSchema>(DEFAULT_CMS_CONTENT);
  const [saveStatus, setSaveStatus] = useState<string>('');
  const [lastPublished, setLastPublished] = useState<string>('');

  useEffect(() => {
    const draft = CMSContentStore.getDraftContent();
    setFormData(draft);
    setLastPublished(draft.meta?.lastPublished || '');
  }, []);

  const handleFieldChange = (section: keyof CMSContentSchema, field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [section]: {
        ...(prev[section] as any),
        [field]: value,
      },
    }));
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
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(formData, null, 2));
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
        setSaveStatus('Backup imported and published successfully!');
        setTimeout(() => setSaveStatus(''), 3000);
      } else {
        alert('Invalid JSON file format.');
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="min-h-screen bg-[#111111] text-gray-100 flex flex-col font-sans">
      {/* Top Header Bar */}
      <header className="bg-[#1b1b1b] border-b border-gray-800 px-6 py-4 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-amber-400/10 border border-amber-400/30 flex items-center justify-center text-amber-400">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-lg font-semibold tracking-tight text-white flex items-center gap-2">
              Catzt Kinetic CMS <span className="text-xs bg-amber-400/20 text-amber-300 px-2 py-0.5 rounded border border-amber-400/30">Live Visual Editor</span>
            </h1>
            <p className="text-xs text-gray-400">
              {lastPublished ? `Last published: ${new Date(lastPublished).toLocaleTimeString()} (${new Date(lastPublished).toLocaleDateString()})` : 'Draft Mode'}
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          {saveStatus && (
            <div className="flex items-center gap-1.5 text-xs text-emerald-400 bg-emerald-950/60 px-3 py-1.5 rounded-md border border-emerald-800 animate-pulse">
              <CheckCircle className="w-3.5 h-3.5" />
              {saveStatus}
            </div>
          )}

          <a
            href="/"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 text-xs bg-gray-800 hover:bg-gray-700 text-gray-200 px-3 py-2 rounded-md transition"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            Preview Landing Page
          </a>

          <button
            onClick={handleSaveDraft}
            className="flex items-center gap-1.5 text-xs bg-gray-700 hover:bg-gray-600 text-white px-3.5 py-2 rounded-md font-medium transition"
          >
            <Save className="w-3.5 h-3.5" />
            Save Draft
          </button>

          <button
            onClick={handlePublish}
            className="flex items-center gap-1.5 text-xs bg-amber-400 hover:bg-amber-300 text-black px-4 py-2 rounded-md font-semibold shadow-lg shadow-amber-400/20 transition"
          >
            <Send className="w-3.5 h-3.5" />
            Publish Live
          </button>
        </div>
      </header>

      {/* Main Layout Container */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar Nav */}
        <aside className="w-64 bg-[#161616] border-r border-gray-800 p-4 flex flex-col gap-1 overflow-y-auto">
          <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider px-3 py-2">Pages & Sections</p>
          
          <button
            onClick={() => setActiveTab('hero')}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition ${
              activeTab === 'hero' ? 'bg-amber-400/15 text-amber-300 font-medium' : 'text-gray-400 hover:bg-gray-800 hover:text-gray-200'
            }`}
          >
            <Home className="w-4 h-4" /> Homepage & Hero
          </button>

          <button
            onClick={() => setActiveTab('aPropos')}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition ${
              activeTab === 'aPropos' ? 'bg-amber-400/15 text-amber-300 font-medium' : 'text-gray-400 hover:bg-gray-800 hover:text-gray-200'
            }`}
          >
            <Info className="w-4 h-4" /> A Propos
          </button>

          <button
            onClick={() => setActiveTab('expertises')}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition ${
              activeTab === 'expertises' ? 'bg-amber-400/15 text-amber-300 font-medium' : 'text-gray-400 hover:bg-gray-800 hover:text-gray-200'
            }`}
          >
            <Layers className="w-4 h-4" /> 8 Expertises
          </button>

          <button
            onClick={() => setActiveTab('references')}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition ${
              activeTab === 'references' ? 'bg-amber-400/15 text-amber-300 font-medium' : 'text-gray-400 hover:bg-gray-800 hover:text-gray-200'
            }`}
          >
            <Award className="w-4 h-4" /> Références & Clients
          </button>

          <button
            onClick={() => setActiveTab('actualites')}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition ${
              activeTab === 'actualites' ? 'bg-amber-400/15 text-amber-300 font-medium' : 'text-gray-400 hover:bg-gray-800 hover:text-gray-200'
            }`}
          >
            <Newspaper className="w-4 h-4" /> Actualités (News)
          </button>

          <button
            onClick={() => setActiveTab('nousRejoindre')}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition ${
              activeTab === 'nousRejoindre' ? 'bg-amber-400/15 text-amber-300 font-medium' : 'text-gray-400 hover:bg-gray-800 hover:text-gray-200'
            }`}
          >
            <Users className="w-4 h-4" /> Nous Rejoindre
          </button>

          <button
            onClick={() => setActiveTab('contact')}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition ${
              activeTab === 'contact' ? 'bg-amber-400/15 text-amber-300 font-medium' : 'text-gray-400 hover:bg-gray-800 hover:text-gray-200'
            }`}
          >
            <Mail className="w-4 h-4" /> Contact & Offices
          </button>

          <button
            onClick={() => setActiveTab('global')}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition ${
              activeTab === 'global' ? 'bg-amber-400/15 text-amber-300 font-medium' : 'text-gray-400 hover:bg-gray-800 hover:text-gray-200'
            }`}
          >
            <Layout className="w-4 h-4" /> Global Settings & Footer
          </button>

          <div className="mt-auto pt-6 border-t border-gray-800 flex flex-col gap-2">
            <button
              onClick={handleExport}
              className="flex items-center gap-2 text-xs text-gray-400 hover:text-gray-200 px-3 py-1.5 rounded hover:bg-gray-800 transition"
            >
              <Download className="w-3.5 h-3.5" /> Export JSON Backup
            </button>
            <label className="flex items-center gap-2 text-xs text-gray-400 hover:text-gray-200 px-3 py-1.5 rounded hover:bg-gray-800 cursor-pointer transition">
              <Upload className="w-3.5 h-3.5" /> Import Backup
              <input type="file" accept=".json" onChange={handleImport} className="hidden" />
            </label>
            <button
              onClick={handleReset}
              className="flex items-center gap-2 text-xs text-red-400/80 hover:text-red-300 px-3 py-1.5 rounded hover:bg-red-950/40 transition"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Reset Defaults
            </button>
          </div>
        </aside>

        {/* Content Editor Panel */}
        <main className="flex-1 overflow-y-auto p-8 max-w-4xl">
          {/* Tab: Hero */}
          {activeTab === 'hero' && (
            <div className="space-y-6">
              <div className="border-b border-gray-800 pb-4">
                <h2 className="text-xl font-bold text-white">Homepage & 3D Hero Portal</h2>
                <p className="text-sm text-gray-400">Edit the top cinematic 3D portal, typography, and primary CTA buttons.</p>
              </div>

              <div className="grid grid-cols-1 gap-5">
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">Subtitle / Badge</label>
                  <input
                    type="text"
                    value={formData.hero.subtitle}
                    onChange={(e) => handleFieldChange('hero', 'subtitle', e.target.value)}
                    className="w-full bg-[#202020] border border-gray-700 rounded-lg px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">Main Headline</label>
                  <textarea
                    rows={2}
                    value={formData.hero.headline}
                    onChange={(e) => handleFieldChange('hero', 'headline', e.target.value)}
                    className="w-full bg-[#202020] border border-gray-700 rounded-lg px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-300 mb-1">CTA Primary Button Text</label>
                    <input
                      type="text"
                      value={formData.hero.ctaPrimaryText}
                      onChange={(e) => handleFieldChange('hero', 'ctaPrimaryText', e.target.value)}
                      className="w-full bg-[#202020] border border-gray-700 rounded-lg px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-amber-400"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-300 mb-1">CTA Primary URL</label>
                    <input
                      type="text"
                      value={formData.hero.ctaPrimaryLink}
                      onChange={(e) => handleFieldChange('hero', 'ctaPrimaryLink', e.target.value)}
                      className="w-full bg-[#202020] border border-gray-700 rounded-lg px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-amber-400"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Tab: A Propos */}
          {activeTab === 'aPropos' && (
            <div className="space-y-6">
              <div className="border-b border-gray-800 pb-4">
                <h2 className="text-xl font-bold text-white">A Propos (About Page)</h2>
                <p className="text-sm text-gray-400">Edit agency positioning, introductory paragraphs, and key metrics.</p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">Headline Statement</label>
                  <textarea
                    rows={2}
                    value={formData.aPropos.headline}
                    onChange={(e) => handleFieldChange('aPropos', 'headline', e.target.value)}
                    className="w-full bg-[#202020] border border-gray-700 rounded-lg px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">Introductory Paragraph</label>
                  <textarea
                    rows={3}
                    value={formData.aPropos.introParagraph}
                    onChange={(e) => handleFieldChange('aPropos', 'introParagraph', e.target.value)}
                    className="w-full bg-[#202020] border border-gray-700 rounded-lg px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-2">Key Metrics Numbers</label>
                  <div className="grid grid-cols-3 gap-3">
                    {formData.aPropos.stats.map((s, idx) => (
                      <div key={idx} className="bg-[#1c1c1c] p-3 rounded-lg border border-gray-800">
                        <input
                          type="text"
                          value={s.value}
                          onChange={(e) => {
                            const newStats = [...formData.aPropos.stats];
                            newStats[idx].value = e.target.value;
                            handleFieldChange('aPropos', 'stats', newStats);
                          }}
                          className="w-full bg-[#262626] text-amber-300 font-bold px-2 py-1 rounded text-sm mb-1"
                        />
                        <input
                          type="text"
                          value={s.label}
                          onChange={(e) => {
                            const newStats = [...formData.aPropos.stats];
                            newStats[idx].label = e.target.value;
                            handleFieldChange('aPropos', 'stats', newStats);
                          }}
                          className="w-full bg-[#262626] text-gray-300 px-2 py-1 rounded text-xs"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Tab: Expertises */}
          {activeTab === 'expertises' && (
            <div className="space-y-6">
              <div className="border-b border-gray-800 pb-4">
                <h2 className="text-xl font-bold text-white">8 Core Expertises</h2>
                <p className="text-sm text-gray-400">Manage all 8 service practices, descriptions, and preview images.</p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">Section Main Headline</label>
                  <input
                    type="text"
                    value={formData.expertises.mainTitle}
                    onChange={(e) => handleFieldChange('expertises', 'mainTitle', e.target.value)}
                    className="w-full bg-[#202020] border border-gray-700 rounded-lg px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {formData.expertises.items.map((item, idx) => (
                    <div key={item.id} className="bg-[#1c1c1c] p-4 rounded-xl border border-gray-800 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-amber-400 font-semibold">#{idx + 1}</span>
                        <span className="text-[11px] text-gray-400 font-mono">/{item.slug}/</span>
                      </div>
                      <input
                        type="text"
                        value={item.title}
                        onChange={(e) => {
                          const newItems = [...formData.expertises.items];
                          newItems[idx].title = e.target.value;
                          handleFieldChange('expertises', 'items', newItems);
                        }}
                        className="w-full bg-[#262626] text-white font-medium px-2.5 py-1.5 rounded text-sm"
                      />
                      <textarea
                        rows={2}
                        value={item.shortDesc}
                        onChange={(e) => {
                          const newItems = [...formData.expertises.items];
                          newItems[idx].shortDesc = e.target.value;
                          handleFieldChange('expertises', 'items', newItems);
                        }}
                        className="w-full bg-[#262626] text-gray-300 text-xs px-2.5 py-1.5 rounded"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Tab: References */}
          {activeTab === 'references' && (
            <div className="space-y-6">
              <div className="border-b border-gray-800 pb-4">
                <h2 className="text-xl font-bold text-white">Références & Clients</h2>
                <p className="text-sm text-gray-400">Configure references headline and client showcase logos.</p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">Headline Statement</label>
                  <textarea
                    rows={2}
                    value={formData.references.mainTitle}
                    onChange={(e) => handleFieldChange('references', 'mainTitle', e.target.value)}
                    className="w-full bg-[#202020] border border-gray-700 rounded-lg px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-2">Featured Client Logos</label>
                  <div className="grid grid-cols-3 gap-3">
                    {formData.references.featuredClients.map((client, idx) => (
                      <div key={idx} className="bg-[#1c1c1c] p-3 rounded-lg border border-gray-800 flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-200">{client.name}</span>
                        <span className="text-[10px] text-gray-400 font-mono truncate max-w-[120px]">{client.logoUrl}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Tab: Actualites */}
          {activeTab === 'actualites' && (
            <div className="space-y-6">
              <div className="border-b border-gray-800 pb-4">
                <h2 className="text-xl font-bold text-white">Actualités (News & Publications)</h2>
                <p className="text-sm text-gray-400">Manage news articles, featured case studies, and thumbnail images.</p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">Section Headline</label>
                  <input
                    type="text"
                    value={formData.actualites.mainTitle}
                    onChange={(e) => handleFieldChange('actualites', 'mainTitle', e.target.value)}
                    className="w-full bg-[#202020] border border-gray-700 rounded-lg px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-amber-400"
                  />
                </div>

                {formData.actualites.items.map((news, idx) => (
                  <div key={news.id} className="bg-[#1c1c1c] p-5 rounded-xl border border-gray-800 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs bg-amber-400/20 text-amber-300 px-2 py-0.5 rounded font-semibold">{news.category}</span>
                      <span className="text-xs text-gray-400">Featured Article</span>
                    </div>

                    <div>
                      <label className="block text-xs text-gray-400 mb-1">Article Title</label>
                      <input
                        type="text"
                        value={news.title}
                        onChange={(e) => {
                          const newItems = [...formData.actualites.items];
                          newItems[idx].title = e.target.value;
                          handleFieldChange('actualites', 'items', newItems);
                        }}
                        className="w-full bg-[#262626] text-white font-medium px-3 py-2 rounded text-sm"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs text-gray-400 mb-1">Category Tag</label>
                        <input
                          type="text"
                          value={news.category}
                          onChange={(e) => {
                            const newItems = [...formData.actualites.items];
                            newItems[idx].category = e.target.value;
                            handleFieldChange('actualites', 'items', newItems);
                          }}
                          className="w-full bg-[#262626] text-gray-200 px-3 py-1.5 rounded text-xs"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-gray-400 mb-1">Image Thumbnail Path</label>
                        <input
                          type="text"
                          value={news.imageUrl}
                          onChange={(e) => {
                            const newItems = [...formData.actualites.items];
                            newItems[idx].imageUrl = e.target.value;
                            handleFieldChange('actualites', 'items', newItems);
                          }}
                          className="w-full bg-[#262626] text-gray-200 px-3 py-1.5 rounded text-xs"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tab: Nous Rejoindre */}
          {activeTab === 'nousRejoindre' && (
            <div className="space-y-6">
              <div className="border-b border-gray-800 pb-4">
                <h2 className="text-xl font-bold text-white">Nous Rejoindre (Careers)</h2>
                <p className="text-sm text-gray-400">Edit recruitment headlines, collective size, and talent copy.</p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">Main Headline</label>
                  <textarea
                    rows={2}
                    value={formData.nousRejoindre.headline}
                    onChange={(e) => handleFieldChange('nousRejoindre', 'headline', e.target.value)}
                    className="w-full bg-[#202020] border border-gray-700 rounded-lg px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">Sub-headline</label>
                  <input
                    type="text"
                    value={formData.nousRejoindre.subheadline}
                    onChange={(e) => handleFieldChange('nousRejoindre', 'subheadline', e.target.value)}
                    className="w-full bg-[#202020] border border-gray-700 rounded-lg px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Tab: Contact */}
          {activeTab === 'contact' && (
            <div className="space-y-6">
              <div className="border-b border-gray-800 pb-4">
                <h2 className="text-xl font-bold text-white">Contact & Paris Offices</h2>
                <p className="text-sm text-gray-400">Manage address, telephone, and header contact copy.</p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">Contact Page Headline</label>
                  <textarea
                    rows={2}
                    value={formData.contact.headline}
                    onChange={(e) => handleFieldChange('contact', 'headline', e.target.value)}
                    className="w-full bg-[#202020] border border-gray-700 rounded-lg px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-300 mb-1">Office Address</label>
                    <input
                      type="text"
                      value={formData.global.officeAddress}
                      onChange={(e) => handleFieldChange('global', 'officeAddress', e.target.value)}
                      className="w-full bg-[#202020] border border-gray-700 rounded-lg px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-amber-400"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-300 mb-1">Telephone</label>
                    <input
                      type="text"
                      value={formData.global.contactPhone}
                      onChange={(e) => handleFieldChange('global', 'contactPhone', e.target.value)}
                      className="w-full bg-[#202020] border border-gray-700 rounded-lg px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-amber-400"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Tab: Global */}
          {activeTab === 'global' && (
            <div className="space-y-6">
              <div className="border-b border-gray-800 pb-4">
                <h2 className="text-xl font-bold text-white">Global Settings & Privacy Banner</h2>
                <p className="text-sm text-gray-400">Configure global metadata, brand titles, and GDPR cookie consent.</p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">Default Site Title</label>
                  <input
                    type="text"
                    value={formData.global.siteTitle}
                    onChange={(e) => handleFieldChange('global', 'siteTitle', e.target.value)}
                    className="w-full bg-[#202020] border border-gray-700 rounded-lg px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">Cookie Consent Banner Notice</label>
                  <textarea
                    rows={2}
                    value={formData.global.cookieBannerText}
                    onChange={(e) => handleFieldChange('global', 'cookieBannerText', e.target.value)}
                    className="w-full bg-[#202020] border border-gray-700 rounded-lg px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default AdminCMSDashboard;
