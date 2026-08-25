/**
 * Catzt Landing Page Hydrator
 * Enterprise-grade DOM & SEO Hydration Engine.
 * Dynamically updates content, Google SERP metadata, OpenGraph cards, Twitter cards,
 * Schema.org JSON-LD, and verification tags in real-time.
 */

import { CMSContentStore, CMSContentSchema, DEFAULT_CMS_CONTENT, PageSEOMetadata } from '../admin/cmsContentStore';

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

    console.log('⚡ Catzt Landing Hydrator active: SEO & DOM synced');
  }

  static applyHydration() {
    const c = this.content;
    if (!c) return;

    // 1. Dynamic SEO, Social Cards, JSON-LD & Verification Tags
    this.applySEO(c);

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

  private static applySEO(c: CMSContentSchema) {
    if (typeof window === 'undefined' || typeof document === 'undefined') return;

    const path = window.location.pathname || '/';
    let currentSEO: PageSEOMetadata | undefined = c.pagesSEO?.hero;

    if (path.includes('a-propos')) currentSEO = c.pagesSEO?.aPropos;
    else if (path.includes('expertises')) currentSEO = c.pagesSEO?.expertises;
    else if (path.includes('references')) currentSEO = c.pagesSEO?.references;
    else if (path.includes('actualites')) currentSEO = c.pagesSEO?.actualites;
    else if (path.includes('nous-rejoindre')) currentSEO = c.pagesSEO?.nousRejoindre;
    else if (path.includes('contact')) currentSEO = c.pagesSEO?.contact;

    const finalTitle = currentSEO?.metaTitle || c.global?.siteTitle || 'Catzt Office';
    const finalDesc = currentSEO?.metaDescription || c.global?.siteTitle;
    const finalImage = currentSEO?.ogImage || '/images/Catzt-logo.png';
    const canonical = currentSEO?.canonicalUrl || `https://catzt.com${path}`;

    // 1. Document Title
    if (document.title !== finalTitle) {
      document.title = finalTitle;
    }

    // 2. Meta Description & Keywords
    if (finalDesc) {
      this.setMetaName('description', finalDesc);
    }
    if (currentSEO?.keywords) {
      this.setMetaName('keywords', currentSEO.keywords);
    }

    // 3. Canonical Tag
    let canEl = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!canEl) {
      canEl = document.createElement('link');
      canEl.setAttribute('rel', 'canonical');
      document.head.appendChild(canEl);
    }
    canEl.setAttribute('href', canonical);

    // 4. Open Graph Social Tags (Meta, Facebook, LinkedIn)
    this.setMetaProperty('og:title', finalTitle);
    this.setMetaProperty('og:site_name', c.global?.brandName || 'Catzt Office');
    this.setMetaProperty('og:url', canonical);
    this.setMetaProperty('og:type', path.includes('actualites') ? 'article' : 'website');
    if (finalDesc) this.setMetaProperty('og:description', finalDesc);
    if (finalImage) this.setMetaProperty('og:image', finalImage);

    // 5. Twitter / X Card Tags
    this.setMetaName('twitter:card', currentSEO?.twitterCardType || 'summary_large_image');
    this.setMetaName('twitter:title', finalTitle);
    if (finalDesc) this.setMetaName('twitter:description', finalDesc);
    if (finalImage) this.setMetaName('twitter:image', finalImage);
    this.setMetaName('twitter:site', '@catztoffice');

    // 6. Search Console & Meta Domain Verification Tags
    if (c.integrations?.googleSearchConsoleVerification) {
      this.setMetaName('google-site-verification', c.integrations.googleSearchConsoleVerification.replace(/^google-site-verification=/, ''));
    }
    if (c.integrations?.metaDomainVerification) {
      this.setMetaName('facebook-domain-verification', c.integrations.metaDomainVerification);
    }

    // 7. Dynamic Schema.org JSON-LD Injection
    this.injectJSONLD(c, currentSEO, canonical);
  }

  private static injectJSONLD(c: CMSContentSchema, seo?: PageSEOMetadata, canonicalUrl?: string) {
    const existing = document.getElementById('catzt-schema-jsonld');
    if (existing) existing.remove();

    const schemaData = {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'Organization',
          '@id': 'https://catzt.com/#organization',
          name: c.global?.brandName || 'Catzt Office',
          url: 'https://catzt.com',
          logo: 'https://catzt.com/images/Catzt-logo.png',
          sameAs: [
            'https://twitter.com/catztoffice',
            'https://linkedin.com/company/catzt',
            'https://tiktok.com/@catztoffice',
            'https://instagram.com/catztoffice',
          ],
          contactPoint: {
            '@type': 'ContactPoint',
            telephone: c.global?.contactPhone || '+33 1 53 32 60 00',
            contactType: 'customer service',
            email: c.global?.contactEmail || 'contact@catztoffice.com',
          },
        },
        {
          '@type': seo?.schemaType || 'WebSite',
          '@id': `${canonicalUrl || 'https://catzt.com'}#primary`,
          url: canonicalUrl || 'https://catzt.com',
          name: seo?.metaTitle || c.global?.siteTitle || 'Catzt Office',
          description: seo?.metaDescription || '',
          publisher: { '@id': 'https://catzt.com/#organization' },
        },
      ],
    };

    const script = document.createElement('script');
    script.id = 'catzt-schema-jsonld';
    script.type = 'application/ld+json';
    script.text = JSON.stringify(schemaData);
    document.head.appendChild(script);
  }

  private static setMetaProperty(prop: string, value: string) {
    let el = document.querySelector(`meta[property="${prop}"]`);
    if (!el) {
      el = document.createElement('meta');
      el.setAttribute('property', prop);
      document.head.appendChild(el);
    }
    el.setAttribute('content', value);
  }

  private static setMetaName(name: string, value: string) {
    let el = document.querySelector(`meta[name="${name}"]`);
    if (!el) {
      el = document.createElement('meta');
      el.setAttribute('name', name);
      document.head.appendChild(el);
    }
    el.setAttribute('content', value);
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
