import React, { useState } from 'react';
import { CMSContentSchema } from '../cmsContentStore';
import { RichTextHelper } from '../components/RichTextHelper';
import { Layout, KeyRound, Shield, Check } from 'lucide-react';

interface GlobalSettingsEditorProps {
  formData: CMSContentSchema;
  onChange: (field: keyof CMSContentSchema['global'], value: any) => void;
}

export const GlobalSettingsEditor: React.FC<GlobalSettingsEditorProps> = ({
  formData,
  onChange,
}) => {
  const [newPassword, setNewPassword] = useState(formData.global.adminPassword || 'catzt2026');
  const [pwSaved, setPwSaved] = useState(false);

  const handleSavePassword = () => {
    onChange('adminPassword', newPassword);
    setPwSaved(true);
    setTimeout(() => setPwSaved(false), 2500);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <div className="border-b border-gray-800 pb-4">
        <h2 className="text-lg font-bold text-white flex items-center gap-2">
          Global Settings & Security <Layout className="w-4 h-4 text-amber-400" />
        </h2>
        <p className="text-xs text-gray-400 mt-0.5">
          Configure site metadata, GDPR cookie banner, branding, and CMS administrator access password.
        </p>
      </div>

      <div className="space-y-5">
        {/* Brand & Meta */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-gray-300 mb-1">
              Global Site Title (SEO Meta)
            </label>
            <input
              type="text"
              value={formData.global.siteTitle}
              onChange={(e) => onChange('siteTitle', e.target.value)}
              className="w-full bg-[#1c1c1c] border border-gray-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-amber-400"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-300 mb-1">
              Brand Display Name
            </label>
            <input
              type="text"
              value={formData.global.brandName}
              onChange={(e) => onChange('brandName', e.target.value)}
              className="w-full bg-[#1c1c1c] border border-gray-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-amber-400"
            />
          </div>
        </div>

        {/* Cookie Banner */}
        <div>
          <label className="block text-xs font-semibold text-gray-300 mb-1">
            GDPR Cookie Consent Banner Notice
          </label>
          <RichTextHelper
            value={formData.global.cookieBannerText}
            onChange={(val) => onChange('cookieBannerText', val)}
          />
          <textarea
            rows={3}
            value={formData.global.cookieBannerText}
            onChange={(e) => onChange('cookieBannerText', e.target.value)}
            className="w-full bg-[#1c1c1c] border border-gray-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-amber-400"
          />
        </div>

        {/* Admin Password & Auth */}
        <div className="bg-[#171717] p-5 rounded-2xl border border-gray-800 space-y-3">
          <div className="flex items-center gap-2 text-white font-semibold text-sm">
            <Shield className="w-4 h-4 text-amber-400" />
            <span>Administrator Password Protection</span>
          </div>
          <p className="text-xs text-gray-400">
            Set the master PIN / password used to unlock this `/admin/` Visual CMS dashboard.
          </p>

          <div className="flex items-center gap-3 max-w-md">
            <div className="relative flex-1">
              <input
                type="text"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="New password..."
                className="w-full bg-[#202020] border border-gray-700 rounded-xl px-3.5 py-2.5 pl-9 text-sm text-white focus:outline-none focus:border-amber-400 font-mono"
              />
              <KeyRound className="w-4 h-4 text-gray-500 absolute left-3 top-3" />
            </div>
            <button
              type="button"
              onClick={handleSavePassword}
              className="bg-amber-400 hover:bg-amber-300 text-black text-xs font-semibold px-4 py-2.5 rounded-xl transition flex items-center gap-1.5 shrink-0 shadow-md shadow-amber-400/10"
            >
              {pwSaved ? <Check className="w-3.5 h-3.5" /> : null}
              {pwSaved ? 'Password Saved!' : 'Update Password'}
            </button>
          </div>
        </div>

        {/* System Meta */}
        <div className="bg-[#141414] p-4 rounded-xl border border-gray-800/80 text-xs text-gray-500 space-y-1 font-mono">
          <p>CMS Schema Version: {formData.meta?.version || '1.0.0'}</p>
          <p>Published By: {formData.meta?.publishedBy || 'Catzt Admin'}</p>
          <p>Last Published: {formData.meta?.lastPublished || 'Never'}</p>
        </div>
      </div>
    </div>
  );
};
