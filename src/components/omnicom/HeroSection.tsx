import React from 'react';

export const HeroSection: React.FC = () => {
  return (
    <section id="hero" className="min-h-screen flex flex-col items-center justify-center text-center px-6 relative">
      <h1 className="text-4xl sm:text-6xl md:text-7xl font-normal text-white leading-tight tracking-tight max-w-4xl mb-16">
        Agence conseil en réputation <br/>
        et influence
      </h1>

      {/* Scroll Down Circle Arrow */}
      <a href="#numbers" className="w-13 h-13 rounded-full border border-white/20 hover:border-white/80 flex items-center justify-center text-white transition-all hover:translate-y-1 p-3">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="12" y1="5" x2="12" y2="19"></line>
          <polyline points="19 12 12 19 5 12"></polyline>
        </svg>
      </a>
    </section>
  );
};
