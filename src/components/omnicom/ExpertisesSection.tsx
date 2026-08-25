import React, { useState } from 'react';

const EXPERTISES = [
  { id: '1', title: '1. Intelligence stratégique', desc: 'Veille sensible et cartographie des risques.', img: 'https://omnicomreputationgroup.fr/wp-content/uploads/2025/07/image6.jpg' },
  { id: '2', title: '2. Corporate & Engagement', desc: 'Positionnement d\'entreprise et marque employeur.', img: 'https://omnicomreputationgroup.fr/wp-content/uploads/2025/07/image4.jpg' },
  { id: '3', title: '3. Crise & Enjeux sensibles', desc: 'Cellule de crise 24/7 et e-réputation.', img: 'https://omnicomreputationgroup.fr/wp-content/uploads/2025/07/image3.jpg' },
  { id: '4', title: '4. Affaires publiques', desc: 'Relations institutionnelles et lobbying éthique.', img: 'https://omnicomreputationgroup.fr/wp-content/uploads/2025/07/image2.jpg' },
  { id: '5', title: '5. Communication de marque', desc: 'Relations presse et événements d\'influence.', img: 'https://omnicomreputationgroup.fr/wp-content/uploads/2025/07/image5.jpg' },
  { id: '6', title: '6. Influence & Social Media', desc: 'Stratégie advocacy et analytique social media.', img: 'https://omnicomreputationgroup.fr/wp-content/uploads/2025/07/image7.jpg' },
  { id: '7', title: '7. Coordination internationale', desc: 'Réseau mondial dans plus de 70 pays.', img: 'https://omnicomreputationgroup.fr/wp-content/uploads/2025/07/image8.jpg' },
  { id: '8', title: '8. Communication financière', desc: 'Accompagnement IPO, M&A et investisseurs.', img: 'https://omnicomreputationgroup.fr/wp-content/uploads/2025/07/image.jpg' },
];

export const ExpertisesSection: React.FC = () => {
  const [hoverImg, setHoverImg] = useState<string | null>(null);
  const [coords, setCoords] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent, img: string) => {
    setHoverImg(img);
    setCoords({ x: e.clientX, y: e.clientY });
  };

  return (
    <section id="expertises" className="py-24 px-8 md:px-16 border-t border-white/10 max-w-7xl mx-auto relative">
      {/* Floating Image Tooltip */}
      {hoverImg && (
        <div 
          className="fixed pointer-events-none w-72 h-96 rounded-xl overflow-hidden z-30 shadow-2xl border border-white/20 transition-opacity duration-200"
          style={{
            left: `${coords.x}px`,
            top: `${coords.y}px`,
            transform: 'translate(-50%, -50%)',
          }}
        >
          <img src={hoverImg} alt="Preview" className="w-full h-full object-cover" />
        </div>
      )}

      <div className="mb-16">
        <span className="text-xs uppercase tracking-widest text-gray-400 font-semibold mb-3 block">Nos Expertises</span>
        <h2 className="text-3xl md:text-5xl font-light text-white leading-tight">
          8 expertises clefs au service de votre réputation
        </h2>
      </div>

      <div className="flex flex-col">
        {EXPERTISES.map((item) => (
          <div
            key={item.id}
            onMouseMove={(e) => handleMouseMove(e, item.img)}
            onMouseLeave={() => setHoverImg(null)}
            className="py-8 px-4 border-b border-white/10 flex justify-between items-center cursor-pointer group hover:border-white/40 hover:bg-white/[0.02] transition-colors"
          >
            <h3 className="text-2xl md:text-3xl font-light text-white group-hover:translate-x-3 transition-transform">
              {item.title}
            </h3>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-gray-500 group-hover:text-white transition-colors">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </div>
        ))}
      </div>
    </section>
  );
};
