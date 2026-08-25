/**
 * Catzt Landing Page Hydrator & Internationalization Engine
 * Features:
 * - Real-time CMS State Hydration
 * - Automatic Geo / Browser Language Detection (ID / EN) & Instant Switcher
 * - Adaptive Light / Dark SVG Favicon management
 * - Compact Floating Cookie Consent Banner
 */

import { CMSContentStore, CMSContentSchema, DEFAULT_CMS_CONTENT } from '../admin/cmsContentStore';

export type LanguageCode = 'id' | 'en';

const TRANSLATIONS = {
  id: {
    menu: {
      about: 'Tentang Kami',
      expertises: 'Solusi & Layanan',
      references: 'Klien & Partner',
      news: 'Berita & Wawasan',
      careers: 'Karir',
      contact: 'Hubungi Kami',
      privacy: 'Kebijakan Privasi & Legal',
    },
    cookie: {
      text: 'Kami menggunakan cookie penting untuk memastikan fungsionalitas dan kenyamanan navigasi Anda.',
      accept: 'Setuju',
      refuse: 'Tolak',
      more: 'Pelajari Lebih Lanjut',
    },
    footer: {
      offices: 'Kantor Pusat',
      contact: 'Kontak',
      rights: '© 2026 Catzt OS. Hak cipta dilindungi undang-undang.',
    },
  },
  en: {
    menu: {
      about: 'About Us',
      expertises: 'Solutions & Services',
      references: 'Clients & Partners',
      news: 'News & Insights',
      careers: 'Careers',
      contact: 'Contact Us',
      privacy: 'Legal & Privacy Policy',
    },
    cookie: {
      text: 'We use essential cookies to ensure optimal functionality and navigation performance.',
      accept: 'Accept',
      refuse: 'Decline',
      more: 'Learn More',
    },
    footer: {
      offices: 'Headquarters',
      contact: 'Contact',
      rights: '© 2026 Catzt OS. All rights reserved.',
    },
  },
};

export class LandingHydrator {
  private static content: CMSContentSchema = DEFAULT_CMS_CONTENT;
  public static currentLang: LanguageCode = 'id';

  static init() {
    this.content = CMSContentStore.getPublishedContent();
    this.currentLang = this.detectLanguage();
    this.applyHydration();
    this.applyLanguage(this.currentLang);
    this.injectCompactCookieBannerStyles();

    // Listen for real-time publish events within the same window
    window.addEventListener('catzt-cms-published', ((e: CustomEvent<CMSContentSchema>) => {
      this.content = e.detail;
      this.applyHydration();
    }) as EventListener);

    // Cross-tab synchronization via storage event
    window.addEventListener('storage', (e) => {
      if (e.key === 'catzt_cms_published_v1' && e.newValue) {
        try {
          this.content = JSON.parse(e.newValue);
          this.applyHydration();
        } catch {
          // ignore
        }
      }
      if (e.key === 'catzt_lang') {
        const lang = (e.newValue === 'en' ? 'en' : 'id') as LanguageCode;
        this.currentLang = lang;
        this.applyLanguage(lang);
      }
    });

    // Bi-directional live split-preview communication from parent iframe
    window.addEventListener('message', (event) => {
      if (event.data && (event.data.type === 'CATZT_CMS_DRAFT_UPDATE' || event.data.type === 'CATZT_CMS_PUBLISH')) {
        if (event.data.payload) {
          this.content = event.data.payload;
          this.applyHydration();
        }
      }
    });

    // Attach click listeners to language switchers
    document.addEventListener('click', (e) => {
      const target = (e.target as HTMLElement).closest('.catzt-lang-toggle') as HTMLElement;
      if (target) {
        e.preventDefault();
        const lang = (target.dataset.lang || 'id') as LanguageCode;
        this.setLanguage(lang);
      }
    });

    console.log(`⚡ Catzt Landing Hydrator active: Lang=${this.currentLang}`);
  }

  static detectLanguage(): LanguageCode {
    try {
      const saved = localStorage.getItem('catzt_lang');
      if (saved === 'id' || saved === 'en') return saved;

      const navLangs = navigator.languages || [navigator.language || ''];
      const isIndonesian = navLangs.some((l) => l.toLowerCase().startsWith('id'));
      return isIndonesian ? 'id' : 'en';
    } catch {
      return 'id';
    }
  }

  static setLanguage(lang: LanguageCode) {
    this.currentLang = lang;
    try {
      localStorage.setItem('catzt_lang', lang);
    } catch {
      // ignore
    }
    this.applyLanguage(lang);
  }

  static applyLanguage(lang: LanguageCode) {
    const t = TRANSLATIONS[lang] || TRANSLATIONS.id;

    // 1. Menu Main Links
    this.setText('.wp-block-omnicom-site-menu .main-links li:nth-child(1) .caption', t.menu.about);
    this.setText('.wp-block-omnicom-site-menu .main-links li:nth-child(2) .caption', t.menu.expertises);
    this.setText('.wp-block-omnicom-site-menu .main-links li:nth-child(3) .caption', t.menu.references);
    this.setText('.wp-block-omnicom-site-menu .main-links li:nth-child(4) .caption', t.menu.news);
    this.setText('.wp-block-omnicom-site-menu .main-links li:nth-child(5) .caption', t.menu.careers);
    this.setText('.wp-block-omnicom-site-menu .main-links li:nth-child(6) .caption', t.menu.contact);

    // 2. Menu Sub Links
    this.setText('.wp-block-omnicom-site-menu .sub-links li:first-child .caption', t.menu.privacy);

    // 3. Footer nav links
    this.setText('footer .nav-links li:nth-child(1) .caption', t.menu.about);
    this.setText('footer .nav-links li:nth-child(2) .caption', t.menu.expertises);
    this.setText('footer .nav-links li:nth-child(3) .caption', t.menu.references);
    this.setText('footer .nav-links li:nth-child(4) .caption', t.menu.contact);
    this.setText('footer .nav-links li:nth-child(5) .caption', t.menu.news);
    this.setText('footer .nav-links li:nth-child(6) .caption', t.menu.privacy);
    this.setText('footer .nav-links li:nth-child(7) .caption', t.menu.careers);

    // 4. Cookie Banner
    this.setText('.wp-block-omnicom-site-cookie-banner .description', t.cookie.text);
    this.setText('.wp-block-omnicom-site-cookie-banner .controls .accept', t.cookie.accept);
    this.setText('.wp-block-omnicom-site-cookie-banner .controls .refuse', t.cookie.refuse);
    this.setText('.wp-block-omnicom-site-cookie-banner .controls .link', t.cookie.more);

    // 5. Ghost Links & Copyright
    this.setText('.wp-block-omnicom-site-menu .copyright .caption', t.footer.rights);
    document.querySelectorAll('.catzt-lang-toggle').forEach((el) => {
      const elLang = el.getAttribute('data-lang');
      if (elLang === lang) {
        el.classList.add('font-bold', 'text-white');
        el.classList.remove('opacity-60');
      } else {
        el.classList.remove('font-bold', 'text-white');
        el.classList.add('opacity-60');
      }
    });
  }

  static applyHydration() {
    const c = this.content;
    if (!c) return;

    document.title = c.global?.siteTitle || 'Catzt OS';
    this.updateFaviconTheme();

    this.setText('[data-cms-key="hero.subtitle"], .wp-block-omnicom-portal .subtitle', c.hero?.subtitle);
    this.setText('[data-cms-key="hero.headline"], .wp-block-omnicom-portal h2', c.hero?.headline);
    this.setText('[data-cms-key="about.headline"]', c.aPropos?.headline);
    this.setText('[data-cms-key="about.intro"]', c.aPropos?.introParagraph);
    this.setText('[data-cms-key="expertises.title"]', c.expertises?.mainTitle);
    this.setText('[data-cms-key="references.title"]', c.references?.mainTitle);
    this.setText('[data-cms-key="actualites.title"]', c.actualites?.mainTitle);

    if (c.actualites?.items && c.actualites.items.length > 0) {
      const firstNews = c.actualites.items[0];
      this.setText('.wp-block-omnicom-news-list .case-study-item .details h3', firstNews.title);
      this.setText('.wp-block-omnicom-news-list .controls .label', firstNews.category || 'News');
    }

    this.setText('[data-cms-key="rejoindre.headline"]', c.nousRejoindre?.headline);
    this.setText('[data-cms-key="contact.headline"]', c.contact?.headline);
    this.setHTML('.wp-block-template-part footer .infos p:nth-child(1)', `<b>${this.currentLang === 'id' ? 'Kantor' : 'Offices'}</b><br/>${c.global?.officeAddress || '73-75 rue la Condamine<br>75017 Paris'}`);
    this.setHTML('.wp-block-template-part footer .infos p:nth-child(2)', `<b>${this.currentLang === 'id' ? 'Kontak' : 'Contact'}</b><br/>Tel : ${c.global?.contactPhone || '+33 (0)1 53 32 60 00'}`);
  }

  private static injectCompactCookieBannerStyles() {
    if (document.getElementById('catzt-compact-cookie-style')) return;
    const style = document.createElement('style');
    style.id = 'catzt-compact-cookie-style';
    style.textContent = `
      .wp-block-omnicom-site-cookie-banner {
        position: fixed !important;
        z-index: 9999 !important;
        inset: auto 20px 20px auto !important;
        padding: 0 !important;
        display: flex !important;
        align-items: flex-end !important;
        pointer-events: none !important;
      }
      .wp-block-omnicom-site-cookie-banner .shadow {
        display: none !important;
      }
      .wp-block-omnicom-site-cookie-banner .card {
        pointer-events: all !important;
        position: relative !important;
        z-index: 1 !important;
        color: #ffffff !important;
        background-color: rgba(22, 22, 22, 0.95) !important;
        border: 1px solid rgba(255, 255, 255, 0.12) !important;
        box-shadow: 0 16px 36px rgba(0, 0, 0, 0.6) !important;
        backdrop-filter: blur(12px) !important;
        font-weight: 400 !important;
        padding: 18px 22px !important;
        border-radius: 14px !important;
        max-width: 360px !important;
        width: auto !important;
        display: flex !important;
        flex-direction: column !important;
        gap: 12px !important;
      }
      .wp-block-omnicom-site-cookie-banner .description {
        font-size: 12px !important;
        line-height: 1.4 !important;
        color: #d1d5db !important;
      }
      .wp-block-omnicom-site-cookie-banner .controls {
        display: flex !important;
        align-items: center !important;
        gap: 10px !important;
      }
      .wp-block-omnicom-site-cookie-banner .controls button.accept {
        background-color: #FFEE58 !important;
        color: #000000 !important;
        font-weight: 700 !important;
        font-size: 11px !important;
        padding: 6px 14px !important;
        border-radius: 6px !important;
        border: none !important;
        cursor: pointer !important;
        transition: transform 0.2s, opacity 0.2s !important;
      }
      .wp-block-omnicom-site-cookie-banner .controls button.accept:hover {
        opacity: 0.9 !important;
        transform: scale(1.03) !important;
      }
      .wp-block-omnicom-site-cookie-banner .controls button.refuse {
        background-color: rgba(255, 255, 255, 0.08) !important;
        color: #9ca3af !important;
        font-size: 11px !important;
        padding: 6px 12px !important;
        border-radius: 6px !important;
        border: 1px solid rgba(255, 255, 255, 0.1) !important;
        cursor: pointer !important;
      }
      .wp-block-omnicom-site-cookie-banner .controls a.link {
        font-size: 11px !important;
        color: #6b7280 !important;
        text-decoration: underline !important;
        margin-left: auto !important;
      }
      .wp-block-omnicom-site-cookie-banner .close {
        width: 24px !important;
        height: 24px !important;
        top: 12px !important;
        right: 12px !important;
      }
    `;
    document.head.appendChild(style);
  }

  private static setText(selector: string, value?: string) {
    if (!value) return;
    const elements = document.querySelectorAll(selector);
    elements.forEach((el) => {
      if (el && el.textContent !== value) {
        el.textContent = value;
      }
    });
  }

  private static setHTML(selector: string, htmlValue?: string) {
    if (!htmlValue) return;
    const elements = document.querySelectorAll(selector);
    elements.forEach((el) => {
      if (el && el.innerHTML !== htmlValue) {
        el.innerHTML = htmlValue;
      }
    });
  }

  private static updateFaviconTheme() {
    if (typeof window === 'undefined') return;
    const isDark = !window.matchMedia || window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    document.querySelectorAll('link[rel*="icon"]').forEach((el) => el.remove());

    const linkSvg = document.createElement('link');
    linkSvg.rel = 'icon';
    linkSvg.type = 'image/svg+xml';
    linkSvg.href = `/favicon.svg?t=${Date.now()}`;
    document.head.appendChild(linkSvg);

    const linkPng = document.createElement('link');
    linkPng.rel = 'alternate icon';
    linkPng.type = 'image/png';
    linkPng.href = isDark ? `/favicon-dark.png?t=${Date.now()}` : `/favicon-light.png?t=${Date.now()}`;
    document.head.appendChild(linkPng);
  }
}

if (typeof window !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => LandingHydrator.init());
  } else {
    LandingHydrator.init();
  }
}

export default LandingHydrator;
