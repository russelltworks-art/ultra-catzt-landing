import React, { useState } from 'react';
import { ArrowUpRight, MapPin, Shield, Zap, ChevronRight, ChevronLeft, Flame, Globe } from 'lucide-react';

export const UnitsExactDuplicate: React.FC = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [lang, setLang] = useState<'el' | 'en'>('el');

  const livingSlides = [
    {
      title: 'Community living spaces',
      sub: 'Ελεύθερη πρόσβαση 24/7',
      list: ['Γυμναστήριο', 'Laundry room', 'Social areas'],
      img: 'https://units.gr/wp-content/uploads/2026/04/1__Community_Living_Spaces.jpg',
    },
    {
      title: 'Ασφάλεια',
      sub: 'Από το πρωί ως το βράδυ',
      list: ['Κλειστό κύκλωμα τηλεόρασης 24/7 (CCTV)', 'Νυχτερινός έλεγχος ασφαλείας 7/7', 'Πόρτα ασφαλείας με ηλεκτρονική κλειδαριά', 'Ασφαλής και έξυπνη πρόσβαση χώρων'],
      img: 'https://units.gr/wp-content/uploads/2026/01/2.-Security-e1777987828492.jpg',
    },
    {
      title: 'Υποστήριξη',
      sub: 'Σε ό,τι χρειάζεσαι',
      list: ['Εξυπηρέτηση 24/7', 'Check-in & onboarding υποστήριξη', 'Άμεση διαχείριση αιτημάτων', 'Άμεση συντήρηση'],
      img: 'https://units.gr/wp-content/uploads/2026/01/3.-Support-1-e1768497722592.jpg',
    },
    {
      title: 'Smart Living',
      sub: 'Για ευκολία στα καθημερινά',
      list: ['Ψηφιακό κλειδί στο κινητό', 'Κρατήσεις χώρων', 'Tickets συντήρησης', 'Laundry - Easy pay'],
      img: 'https://units.gr/wp-content/uploads/2026/01/Asset-1@2x-100.jpg',
    },
  ];

  return (
    <div style={{ backgroundColor: '#F5F0E8', color: '#000000', fontFamily: 'Inter, system-ui, sans-serif', width: '100%', minHeight: '100vh', display: 'flex', padding: 16, gap: 16, boxSizing: 'border-box' }}>
      {/* ── STYLES CSS INJECTED FOR UNITS.GR EXACT PARITY ── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Alexandria:wght@400;600;700;800;900&family=Plus+Jakarta+Sans:wght@400;600;700;800&display=swap');

        .units-font-display { font-family: 'Alexandria', 'Plus Jakarta Sans', sans-serif; }
        .units-bg-yellow { background-color: #FFDB08 !important; }
        .units-bg-red { background-color: #E6313A !important; }
        .units-bg-red-light { background-color: #FF666E !important; }
        .units-bg-blue { background-color: #3B52E8 !important; }
        .units-bg-purple { background-color: #AB54F7 !important; }
        .units-bg-orange { background-color: #FF8F00 !important; }

        /* Left Sidebar Nav Cards */
        .sidebar-card {
          border-radius: 16px;
          padding: 16px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          height: 105px;
          cursor: pointer;
          transition: transform 0.2s ease, filter 0.2s ease;
          text-decoration: none;
        }
        .sidebar-card:hover {
          transform: translateY(-2px) scale(1.02);
          filter: brightness(1.05);
        }

        .units-liquid-btn {
          position: relative;
          display: inline-flex;
          align-items: center;
          gap: 12px;
          padding: 14px 28px;
          border-radius: 999px;
          background: #000000;
          color: #ffffff;
          font-weight: 700;
          font-size: 15px;
          cursor: pointer;
          overflow: hidden;
          transition: transform 0.25s cubic-bezier(0.16, 1, 0.3, 1);
          border: none;
          outline: none;
          text-decoration: none;
        }
        .units-liquid-btn:hover {
          transform: scale(1.04);
        }
        .units-liquid-btn .wave-bg {
          position: absolute;
          inset: 0;
          display: flex;
          opacity: 0;
          transition: opacity 0.3s ease;
          pointer-events: none;
        }
        .units-liquid-btn:hover .wave-bg {
          opacity: 1;
        }
        .units-liquid-btn .wave-layer-1 { flex: 1; background: #FFB200; }
        .units-liquid-btn .wave-layer-2 { flex: 1; background: #E6313A; }
        .units-liquid-btn .wave-layer-3 { flex: 1; background: #267E6E; }

        @keyframes marqueeScroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          display: flex;
          white-space: nowrap;
          animation: marqueeScroll 20s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }

        @media (max-width: 900px) {
          body { overflow-x: hidden; }
          .desktop-sidebar { display: none !important; }
          .main-content-canvas { borderRadius: 24px !important; }
        }
      `}</style>

      {/* ── 1. LEFT SIDEBAR (EXACT MATCH FOR USER SCREENSHOT media_1787163109932.png) ── */}
      <aside className="desktop-sidebar" style={{ width: 230, flexShrink: 0, display: 'flex', flexDirection: 'column', gap: 10, position: 'sticky', top: 16, height: 'calc(100vh - 32px)', overflowY: 'auto' }}>
        {/* Brand Logo Header */}
        <div style={{ marginBottom: 4 }}>
          <h2 className="units-font-display" style={{ fontSize: 34, fontWeight: 900, color: '#000000', margin: 0, lineHeight: 1 }}>units.</h2>
          <span style={{ fontSize: 8.5, fontWeight: 800, letterSpacing: 1.2, textTransform: 'uppercase', color: '#000000', display: 'block', marginTop: 4 }}>UNIQUE STUDENT HOMES</span>
        </div>

        {/* 01 Card - Blue */}
        <a href="#" className="sidebar-card" style={{ backgroundColor: '#0066FF' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: 14, fontWeight: 900, color: '#000000' }}>01</span>
            <ArrowUpRight size={18} color="#000000" />
          </div>
          <span className="units-font-display" style={{ fontSize: 15, fontWeight: 900, color: '#000000' }}>Student Homes</span>
        </a>

        {/* 02 Card - Yellow */}
        <a href="#" className="sidebar-card" style={{ backgroundColor: '#FFBA00' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: 14, fontWeight: 900, color: '#000000' }}>02</span>
            <ArrowUpRight size={18} color="#000000" />
          </div>
          <span className="units-font-display" style={{ fontSize: 15, fontWeight: 900, color: '#000000' }}>Our way of living</span>
        </a>

        {/* 03 Card - Orange */}
        <a href="#" className="sidebar-card" style={{ backgroundColor: '#FF4E00' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: 14, fontWeight: 900, color: '#000000' }}>03</span>
            <ArrowUpRight size={18} color="#000000" />
          </div>
          <span className="units-font-display" style={{ fontSize: 15, fontWeight: 900, color: '#000000' }}>Community</span>
        </a>

        {/* 04 Card - Green */}
        <a href="#" className="sidebar-card" style={{ backgroundColor: '#00B140' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: 14, fontWeight: 900, color: '#000000' }}>04</span>
            <ArrowUpRight size={18} color="#000000" />
          </div>
          <span className="units-font-display" style={{ fontSize: 15, fontWeight: 900, color: '#000000' }}>Επικοινωνία</span>
        </a>

        {/* Purple Action Button: Book your Unit */}
        <button
          onClick={() => window.open('http://localhost:5173', '_blank')}
          style={{ width: '100%', padding: '14px 16px', borderRadius: 14, backgroundColor: '#AB54F7', color: '#000000', border: 'none', cursor: 'pointer', fontWeight: 900, fontSize: 15, fontFamily: 'Alexandria, sans-serif' }}
        >
          Book your Unit
        </button>

        {/* Language Selector Button */}
        <button
          onClick={() => setLang(lang === 'el' ? 'en' : 'el')}
          style={{ width: '100%', padding: '12px 16px', borderRadius: 14, backgroundColor: '#000000', color: '#ffffff', border: 'none', cursor: 'pointer', fontWeight: 800, fontSize: 14, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
        >
          <span>{lang === 'el' ? 'English' : 'Ελληνικά'}</span>
          <Globe size={16} color="#ffffff" />
        </button>

        {/* Social Icons Bar */}
        <div style={{ width: '100%', padding: '12px 16px', borderRadius: 14, backgroundColor: '#000000', display: 'flex', justifyContent: 'space-around', alignItems: 'center', marginTop: 'auto' }}>
          <a href="https://www.instagram.com/units.gr/" target="_blank" style={{ color: '#ffffff', textDecoration: 'none' }}>
            <img width="18" height="18" src="https://units.gr/wp-content/uploads/2026/01/insta.svg" alt="Instagram" />
          </a>
          <a href="https://www.facebook.com/units.gr" target="_blank" style={{ color: '#ffffff', textDecoration: 'none' }}>
            <img width="10" height="18" src="https://units.gr/wp-content/uploads/2026/01/facebook.svg" alt="Facebook" />
          </a>
          <a href="https://www.tiktok.com/@units.gr" target="_blank" style={{ color: '#ffffff', textDecoration: 'none' }}>
            <img width="15" height="17" src="https://units.gr/wp-content/uploads/2026/01/tiktok.svg" alt="TikTok" />
          </a>
        </div>
      </aside>

      {/* ── 2. RIGHT MAIN CONTENT CANVAS (ROUNDED MAIN WINDOW MATCHING SCREENSHOT) ── */}
      <main className="main-content-canvas" style={{ flex: 1, minWidth: 0, borderRadius: 36, overflow: 'hidden', backgroundColor: '#0c0c0c', color: '#ffffff', display: 'flex', flexDirection: 'column' }}>
        
        {/* ── HERO SECTION WITH ROUNDED MAIN CONTAINER & IMAGE ── */}
        <section style={{ position: 'relative', minHeight: '88vh', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
          <img
            src="https://units.gr/wp-content/uploads/2026/05/Lounge-Area.jpg"
            alt="Units Hero Lounge Area"
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.7)' }}
          />

          <div style={{ position: 'relative', zIndex: 10, textAlign: 'center', maxWidth: 900, padding: '0 32px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 24 }}>
            <h1 className="units-font-display" style={{ fontSize: 'clamp(44px, 5.5vw, 84px)', fontWeight: 900, color: '#ffffff', lineHeight: 1.02, letterSpacing: '-1.5px', textShadow: '0 4px 20px rgba(0,0,0,0.5)' }}>
              Home of the uniquely awesome.
            </h1>
            <p style={{ fontSize: 'clamp(18px, 1.8vw, 26px)', color: '#ffffff', fontWeight: 600, maxWidth: 720, lineHeight: 1.35, textShadow: '0 2px 10px rgba(0,0,0,0.5)' }}>
              All-inclusive φοιτητική διαμονή με όλα όσα χρειάζεσαι για να ζεις, να σπουδάζεις και να συνδέεσαι.
            </p>

            <button className="units-liquid-btn" style={{ padding: '16px 36px', fontSize: 16, marginTop: 8 }} onClick={() => window.open('http://localhost:5173', '_blank')}>
              <span style={{ position: 'relative', zIndex: 2 }}>Book your Unit</span>
              <ArrowUpRight size={20} style={{ position: 'relative', zIndex: 2 }} />
              <div className="wave-bg">
                <div className="wave-layer-1" />
                <div className="wave-layer-2" />
                <div className="wave-layer-3" />
              </div>
            </button>
          </div>
        </section>

        {/* ── LOCATIONS SECTION ── */}
        <section style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', backgroundColor: '#FFDB08', color: '#000000', minHeight: 440 }}>
          <div style={{ padding: '60px 48px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: 24 }}>
            <div>
              <span style={{ fontSize: 13, fontWeight: 800, textTransform: 'uppercase', letterSpacing: 2, backgroundColor: '#000000', color: '#ffffff', padding: '4px 12px', borderRadius: 999 }}>
                Τοποθεσία
              </span>
              <h2 className="units-font-display" style={{ fontSize: 42, fontWeight: 900, marginTop: 24, lineHeight: 1.1 }}>
                Σημεία που κάνουν τη ζωή σου εύκολη
              </h2>
              <p style={{ fontSize: 17, marginTop: 18, lineHeight: 1.6, fontWeight: 500, color: '#1a1a1a' }}>
                Ξυπνάς, βγαίνεις, φτάνεις. Από το σπίτι στο Πανεπιστήμιο, και από το μάθημα στη βόλτα – όλα χωρίς περιττές αποστάσεις.
              </p>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 14, flexWrap: 'wrap' }}>
              <span style={{ fontWeight: 800, fontSize: 15 }}>Εδώ βλέπεις ποια είναι:</span>
              <span style={{ backgroundColor: '#e2e8f0', color: '#000000', padding: '8px 16px', borderRadius: 999, fontWeight: 800, fontSize: 13 }}>Σύντομα κοντά σου</span>
              <span style={{ backgroundColor: '#FF8F00', color: '#000000', padding: '8px 16px', borderRadius: 999, fontWeight: 800, fontSize: 13 }}>Έτοιμα να μπεις!</span>
            </div>
          </div>

          <div style={{ backgroundColor: '#1a1a24', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 40 }}>
            <div style={{ textAlign: 'center', color: '#ffffff', gap: 16, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <MapPin size={48} color="#FFDB08" />
              <h3 className="units-font-display" style={{ fontSize: 26, fontWeight: 800 }}>Units Interactive Map</h3>
              <p style={{ color: '#94a3b8', fontSize: 14 }}>Units Parkside (Αθήνα) &bull; Units Theatro (Πειραιάς)</p>
            </div>
          </div>
        </section>

        {/* ── MARQUEE TICKER ── */}
        <div className="units-bg-red" style={{ overflow: 'hidden', padding: '16px 0', borderTop: '2px solid #000', borderBottom: '2px solid #000' }}>
          <div className="animate-marquee">
            {Array(4).fill(0).map((_, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 32, paddingRight: 32 }}>
                <span className="units-font-display" style={{ fontSize: 22, fontWeight: 900, color: '#FFDB08' }}>Social areas</span>
                <Flame size={20} color="#FFDB08" />
                <span className="units-font-display" style={{ fontSize: 22, fontWeight: 900, color: '#FFDB08' }}>Private kitchen & bathroom</span>
                <Zap size={20} color="#FFDB08" />
                <span className="units-font-display" style={{ fontSize: 22, fontWeight: 900, color: '#FFDB08' }}>24/7 Security</span>
                <Shield size={20} color="#FFDB08" />
                <span className="units-font-display" style={{ fontSize: 22, fontWeight: 900, color: '#FFDB08' }}>Smart living</span>
              </div>
            ))}
          </div>
        </div>

        {/* ── SLIDER SECTION ── */}
        <section style={{ padding: '70px 48px', backgroundColor: '#FF666E', color: '#000000' }}>
          <div style={{ maxWidth: 1280, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: 48, alignItems: 'center' }}>
            <div>
              <span style={{ fontSize: 12, fontWeight: 800, textTransform: 'uppercase', letterSpacing: 2, backgroundColor: '#000000', color: '#ffffff', padding: '4px 12px', borderRadius: 999 }}>
                All-Inclusive Living
              </span>
              <h2 className="units-font-display" style={{ fontSize: 44, fontWeight: 900, marginTop: 20, lineHeight: 1.05 }}>
                One Unit.{'\n'}An entire universe.
              </h2>
              <h4 style={{ fontSize: 20, fontWeight: 800, marginTop: 14 }}>Το ενοίκιό σου καλύπτει τα πάντα</h4>
              <p style={{ fontSize: 16, marginTop: 14, lineHeight: 1.6, fontWeight: 500 }}>
                Κάθε Unit ένα ολόκληρο σύμπαν από χώρους και υπηρεσίες, σχεδιασμένο να προσφέρει φοιτητική διαμονή all-inclusive.
              </p>

              <div style={{ display: 'flex', gap: 12, marginTop: 28 }}>
                <button
                  onClick={() => setActiveSlide((prev) => (prev > 0 ? prev - 1 : livingSlides.length - 1))}
                  style={{ width: 44, height: 44, borderRadius: '50%', backgroundColor: '#000000', color: '#ffffff', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                >
                  <ChevronLeft size={22} />
                </button>
                <button
                  onClick={() => setActiveSlide((prev) => (prev < livingSlides.length - 1 ? prev + 1 : 0))}
                  style={{ width: 44, height: 44, borderRadius: '50%', backgroundColor: '#000000', color: '#ffffff', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                >
                  <ChevronRight size={22} />
                </button>
              </div>
            </div>

            {/* Slide Card */}
            <div style={{ backgroundColor: '#ffffff', borderRadius: 24, overflow: 'hidden', boxShadow: '0 20px 40px rgba(0,0,0,0.15)' }}>
              <img src={livingSlides[activeSlide].img} alt={livingSlides[activeSlide].title} style={{ width: '100%', height: 300, objectFit: 'cover' }} />
              <div style={{ padding: 28, gap: 10, display: 'flex', flexDirection: 'column' }}>
                <h3 className="units-font-display" style={{ fontSize: 26, fontWeight: 900, color: '#000000' }}>{livingSlides[activeSlide].title}</h3>
                <p style={{ fontSize: 15, fontWeight: 700, color: '#e6313a' }}>{livingSlides[activeSlide].sub}</p>
                <ul style={{ paddingLeft: 20, gap: 6, display: 'flex', flexDirection: 'column', marginTop: 6 }}>
                  {livingSlides[activeSlide].list.map((item, idx) => (
                    <li key={idx} style={{ fontSize: 14, fontWeight: 600, color: '#334155' }}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ── FOOTER ── */}
        <footer style={{ backgroundColor: '#000000', color: '#ffffff', padding: '48px 48px 30px', marginTop: 'auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 24 }}>
            <div>
              <h4 className="units-font-display" style={{ fontSize: 22, fontWeight: 900 }}>UNITS &bull; Unique Student Homes</h4>
              <p style={{ color: '#94a3b8', fontSize: 13, marginTop: 6 }}>&copy; {new Date().getFullYear()} Units.gr Split Desktop Duplicate &bull; Catzt Platform</p>
            </div>
            <button className="units-liquid-btn" onClick={() => window.open('http://localhost:5173', '_blank')}>
              <span style={{ position: 'relative', zIndex: 2 }}>Book your Unit</span>
              <ArrowUpRight size={18} style={{ position: 'relative', zIndex: 2 }} />
              <div className="wave-bg">
                <div className="wave-layer-1" />
                <div className="wave-layer-2" />
                <div className="wave-layer-3" />
              </div>
            </button>
          </div>
        </footer>
      </main>
    </div>
  );
};
