import React, { useState } from 'react';

interface HeaderProps {
  onNavigate?: (id: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ onNavigate }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleNav = (id: string) => {
    setMenuOpen(false);
    if (onNavigate) {
      onNavigate(id);
    } else {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Header Bar */}
      <header className="fixed top-0 left-0 w-full z-50 py-8 px-8 md:px-16 flex justify-between items-center bg-gradient-to-b from-black/90 via-black/40 to-transparent">
        <a href="#" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="flex items-center text-xl md:text-2xl font-normal tracking-tight">
          <span className="font-bold text-white">Omnicom</span><span className="font-normal text-white">ReputationGroup</span>
        </a>

        <button 
          onClick={() => setMenuOpen(!menuOpen)} 
          className="flex flex-col gap-1.5 p-2 focus:outline-none group"
          aria-label="Toggle menu"
        >
          <span className="w-7 h-[2px] bg-white group-hover:w-8 transition-all"></span>
          <span className="w-7 h-[2px] bg-white transition-all"></span>
          <span className="w-7 h-[2px] bg-white group-hover:w-6 transition-all"></span>
        </button>
      </header>

      {/* Fullscreen Overlay Drawer */}
      <div className={`fixed inset-0 z-40 bg-black/95 backdrop-blur-2xl flex flex-col justify-between p-12 md:p-20 transition-opacity duration-400 ${menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
        <div className="flex justify-between items-center border-b border-white/10 pb-6">
          <span className="text-sm font-light text-gray-400 uppercase tracking-widest">Navigation Menu</span>
          <button onClick={() => setMenuOpen(false)} className="text-white hover:text-gray-400 text-sm tracking-wider uppercase font-medium">Fermer ✕</button>
        </div>

        <nav className="flex flex-col gap-6 text-3xl md:text-5xl font-light text-white my-auto">
          <button onClick={() => handleNav('hero')} className="text-left hover:text-blue-400 transition-colors">Accueil</button>
          <button onClick={() => handleNav('expertises')} className="text-left hover:text-blue-400 transition-colors">Expertises</button>
          <button onClick={() => handleNav('references')} className="text-left hover:text-blue-400 transition-colors">Références</button>
          <button onClick={() => handleNav('actualites')} className="text-left hover:text-blue-400 transition-colors">Actualités</button>
          <button onClick={() => handleNav('contact')} className="text-left hover:text-blue-400 transition-colors">Contact</button>
        </nav>

        <div className="flex justify-between items-center text-xs text-gray-400 border-t border-white/10 pt-6">
          <p>73-75 rue la Condamine, 75017 Paris</p>
          <div className="flex gap-4">
            <span className="text-white font-bold">FR</span>
            <span>EN</span>
          </div>
        </div>
      </div>
    </>
  );
};
