import React from 'react';
import { CMSContentSchema } from '../cmsContentStore';
import { RichTextHelper } from '../components/RichTextHelper';
import { PageSEOCard } from '../components/PageSEOCard';
import { Mail, MapPin, Phone } from 'lucide-react';

interface ContactEditorProps {
  formData: CMSContentSchema;
  onChange: (field: keyof CMSContentSchema['contact'], value: any) => void;
  onGlobalChange: (field: keyof CMSContentSchema['global'], value: any) => void;
  onSEOChange: (seo: CMSContentSchema['pagesSEO']['contact']) => void;
}

export const ContactEditor: React.FC<ContactEditorProps> = ({
  formData,
  onChange,
  onGlobalChange,
  onSEOChange,
}) => {
  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* 1. Page Name & SEO Header Card */}
      <PageSEOCard
        sectionTitle="Contact & Paris Offices"
        seoData={formData.pagesSEO.contact}
        onChange={onSEOChange}
      />

      <div className="border-b border-gray-800 pb-4">
        <h2 className="text-lg font-bold text-white flex items-center gap-2">
          Contact & Paris Headquarters <Mail className="w-4 h-4 text-amber-400" />
        </h2>
        <p className="text-xs text-gray-400 mt-0.5">
          Manage agency physical location, contact telephone, email desk, and call-to-action headlines.
        </p>
      </div>

      <div className="space-y-4">
        {/* Contact Page Headline */}
        <div>
          <label className="block text-xs font-semibold text-gray-300 mb-1">
            Contact Callout Headline
          </label>
          <RichTextHelper
            value={formData.contact.headline}
            onChange={(val) => onChange('headline', val)}
          />
          <textarea
            rows={2}
            value={formData.contact.headline}
            onChange={(e) => onChange('headline', e.target.value)}
            className="w-full bg-[#1c1c1c] border border-gray-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-amber-400"
          />
        </div>

        {/* Office Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-gray-300 mb-1 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-amber-400" /> City
            </label>
            <input
              type="text"
              value={formData.contact.officeCity}
              onChange={(e) => onChange('officeCity', e.target.value)}
              className="w-full bg-[#1c1c1c] border border-gray-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-amber-400"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-300 mb-1 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-amber-400" /> Complete Office Address
            </label>
            <input
              type="text"
              value={formData.global.officeAddress}
              onChange={(e) => {
                onChange('officeAddress', e.target.value);
                onGlobalChange('officeAddress', e.target.value);
              }}
              className="w-full bg-[#1c1c1c] border border-gray-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-amber-400"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-gray-300 mb-1 flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-amber-400" /> Office Telephone
            </label>
            <input
              type="text"
              value={formData.global.contactPhone}
              onChange={(e) => {
                onChange('telephone', e.target.value);
                onGlobalChange('contactPhone', e.target.value);
              }}
              className="w-full bg-[#1c1c1c] border border-gray-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-amber-400"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-300 mb-1 flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-amber-400" /> Contact Email
            </label>
            <input
              type="email"
              value={formData.global.contactEmail}
              onChange={(e) => {
                onChange('email', e.target.value);
                onGlobalChange('contactEmail', e.target.value);
              }}
              className="w-full bg-[#1c1c1c] border border-gray-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-amber-400"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
