'use client';

import React, { Suspense, lazy } from 'react';

const Spline = lazy(() => import('@splinetool/react-spline'));

interface SplineHeroProps {
  scene?: string;
  className?: string;
}

const SplineHero: React.FC<SplineHeroProps> = ({ 
  scene = 'https://prod.spline.design/i9Vbe-p8D9fX9N69/scene.splinecode', // Tech-themed abstract scene
  className = '' 
}) => {
  return (
    <div className={`relative w-full h-full min-h-[500px] overflow-hidden ${className}`}>
      <Suspense fallback={
        <div className="flex items-center justify-center w-full h-full bg-slate-900/5 backdrop-blur-sm animate-pulse">
          <div className="text-slate-400 font-medium">Cargando experiencia 3D...</div>
        </div>
      }>
        <Spline 
          scene={scene} 
        />
      </Suspense>
    </div>
  );
};

export default SplineHero;
