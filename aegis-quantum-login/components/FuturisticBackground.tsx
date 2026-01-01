
import React from 'react';

const FuturisticBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 -z-10 bg-slate-950 overflow-hidden">
      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20"></div>
      
      {/* Floating Orbs */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-cyan-500/10 rounded-full blur-[120px] animate-pulse"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-500/10 rounded-full blur-[120px] animate-pulse delay-1000"></div>
      
      {/* Digital "Rain" / Bits effect (Simplified) */}
      <div className="absolute inset-0 flex justify-around pointer-events-none opacity-10">
        {[...Array(10)].map((_, i) => (
          <div 
            key={i} 
            className="w-px h-full bg-gradient-to-b from-transparent via-cyan-400 to-transparent"
            style={{ 
              animation: `scan ${3 + Math.random() * 5}s linear infinite`,
              animationDelay: `${Math.random() * 5}s`
            }}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default FuturisticBackground;
