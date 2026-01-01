
import React from 'react';

interface ScannerOverlayProps {
  isActive: boolean;
}

const ScannerOverlay: React.FC<ScannerOverlayProps> = ({ isActive }) => {
  if (!isActive) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50 flex items-center justify-center">
      {/* Viewfinder Corners */}
      <div className="absolute top-10 left-10 w-20 h-20 border-t-2 border-l-2 border-cyan-500"></div>
      <div className="absolute top-10 right-10 w-20 h-20 border-t-2 border-r-2 border-cyan-500"></div>
      <div className="absolute bottom-10 left-10 w-20 h-20 border-b-2 border-l-2 border-cyan-500"></div>
      <div className="absolute bottom-10 right-10 w-20 h-20 border-b-2 border-r-2 border-cyan-500"></div>

      {/* Horizontal Scan Bar */}
      <div className="w-full h-1 bg-cyan-400/30 shadow-[0_0_20px_rgba(34,211,238,0.8)] scan-line"></div>
      
      {/* Scanning Text */}
      <div className="absolute bottom-24 text-cyan-400 font-orbitron animate-pulse text-lg tracking-widest">
        INITIALIZING BIOMETRIC LINK...
      </div>
    </div>
  );
};

export default ScannerOverlay;
