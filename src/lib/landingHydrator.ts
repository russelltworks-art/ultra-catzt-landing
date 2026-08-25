/**
 * Catzt Landing Page Hydrator
 * Connects CMS published and live draft state to DOM nodes dynamically in real-time
 * without disrupting WebGL Three.js canvas or GSAP animations.
 */

import { CMSContentStore, CMSContentSchema, DEFAULT_CMS_CONTENT } from '../admin/cmsContentStore';

export class LandingHydrator {
  private static content: CMSContentSchema = DEFAULT_CMS_CONTENT;

  static init() {
    this.content = CMSContentStore.getPublishedContent();
    this.applyHydration();

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

    console.log('⚡ Catzt Landing Hydrator active: content synced');
  }

  static applyHydration() {
    const c = this.content;
    if (!c) return;

    // 1. Global & Head
    document.title = c.global?.siteTitle || 'Catzt OS';

    // 2. Adaptive Favicon management
    this.updateFaviconTheme();

    // 2. Hero & Homepage
    this.setText('[data-cms-key="hero.subtitle"], .wp-block-omnicom-portal .subtitle', c.hero?.subtitle);
    this.setText('[data-cms-key="hero.headline"], .wp-block-omnicom-portal h2', c.hero?.headline);
    this.setText('[data-cms-key="hero.ctaPrimary"], .wp-block-omnicom-portal a.primary-btn', c.hero?.ctaPrimaryText);
    this.setText('[data-cms-key="hero.ctaSecondary"], .wp-block-omnicom-portal a.secondary-btn', c.hero?.ctaSecondaryText);

    // 3. A Propos
    this.setText('[data-cms-key="about.headline"]', c.aPropos?.headline);
    this.setText('[data-cms-key="about.intro"]', c.aPropos?.introParagraph);

    // Stats in A Propos
    if (c.aPropos?.stats) {
      c.aPropos.stats.forEach((stat, idx) => {
        this.setText(`[data-cms-key="about.stat.${idx}.value"]`, stat.value);
        this.setText(`[data-cms-key="about.stat.${idx}.label"]`, stat.label);
      });
    }

    // 4. Expertises
    this.setText('[data-cms-key="expertises.title"]', c.expertises?.mainTitle);
    if (c.expertises?.items) {
      c.expertises.items.forEach((item, idx) => {
        this.setText(`[data-cms-key="expertise.${item.slug || idx}.title"]`, item.title);
        this.setText(`[data-cms-key="expertise.${item.slug || idx}.desc"]`, item.shortDesc);
      });
    }

    // 5. References
    this.setText('[data-cms-key="references.title"]', c.references?.mainTitle);
    this.setText('[data-cms-key="references.subtitle"]', c.references?.clientCountHeadline);

    // 6. Actualités
    this.setText('[data-cms-key="actualites.title"]', c.actualites?.mainTitle);
    if (c.actualites?.items && c.actualites.items.length > 0) {
      const firstNews = c.actualites.items[0];
      this.setText('.wp-block-omnicom-news-list .case-study-item .details h3', firstNews.title);
      this.setText('.wp-block-omnicom-news-list .controls .label', firstNews.category || 'News');
    }

    // 7. Nous Rejoindre
    this.setText('[data-cms-key="rejoindre.headline"]', c.nousRejoindre?.headline);
    this.setText('[data-cms-key="rejoindre.subheadline"]', c.nousRejoindre?.subheadline);

    // 8. Contact & Footer
    this.setText('[data-cms-key="contact.headline"]', c.contact?.headline);
    this.setHTML('.wp-block-template-part footer .infos p:nth-child(1)', `<b>Nos bureaux</b><br/>${c.global?.officeAddress || '73-75 rue la Condamine<br>75017 Paris'}`);
    this.setHTML('.wp-block-template-part footer .infos p:nth-child(2)', `<b>Contact</b><br/>Tel : ${c.global?.contactPhone || '+33 (0)1 53 32 60 00'}`);
    this.setText('.wp-block-omnicom-site-cookie-banner .description', c.global?.cookieBannerText);
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
    const isDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    const faviconPng = document.querySelector('link[rel="icon"][type="image/png"]') as HTMLLinkElement;
    if (faviconPng) {
      faviconPng.href = isDark ? '/favicon-dark.png' : '/favicon-light.png';
    }
  }
}

// Auto-run on DOM ready
if (typeof window !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => LandingHydrator.init());
  } else {
    LandingHydrator.init();
  }
}

export default LandingHydrator;
