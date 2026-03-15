'use client';

import React, { Suspense, lazy } from 'react';

const Spline = lazy(() => import('@splinetool/react-spline'));

interface SplineHeroProps {
  scene?: string;
  className?: string;
}

const SplineHero: React.FC<SplineHeroProps> = ({ 
  scene = 'https://prod.spline.design/Nmx4Vyeze9wJ-9zm/scene.splinecode', // Verified public scene
  className = '' 
}) => {
  const [error, setError] = React.useState<boolean>(false);

  if (error) {
    return (
      <div className={`flex items-center justify-center w-full h-full bg-slate-900/5 backdrop-blur-sm border border-dashed border-slate-200 rounded-xl ${className}`}>
        <div className="text-slate-400 text-center p-4">
          <div className="font-medium mb-1">Experiencia 3D no disponible</div>
          <div className="text-xs">Continuando con la experiencia simplificada</div>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative w-full h-full min-h-[500px] overflow-hidden ${className}`}>
      <Suspense fallback={
        <div className="flex items-center justify-center w-full h-full bg-slate-900/5 backdrop-blur-sm animate-pulse">
          <div className="text-slate-400 font-medium">Cargando experiencia 3D...</div>
        </div>
      }>
        <Spline 
          scene={scene} 
          onError={() => {
            console.error('Spline failed to load:', scene);
            setError(true);
          }}
        />
      </Suspense>
    </div>
  );
};

export default SplineHero;
