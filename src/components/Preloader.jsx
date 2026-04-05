import { useState, useEffect } from 'react';

export const Preloader = ({ onComplete, onExitStart }) => {
  const [percent, setPercent] = useState(0);
  const [showShutter, setShowShutter] = useState(true);
  const [shutterExit, setShutterExit] = useState(false);

  useEffect(() => {
    let current = 0;
    const interval = setInterval(() => {
      current += Math.floor(Math.random() * 5) + 1;
      if (current >= 100) {
        current = 100;
        clearInterval(interval);
        
        // When counting is 100%, start shutter exit
        setTimeout(() => {
          setShutterExit(true);
          if (onExitStart) onExitStart();
        }, 300);

        // After shutter animation finishes (1000ms), unmount
        setTimeout(() => {
          if (onComplete) onComplete();
          setShowShutter(false);
        }, 1300);
      }
      setPercent(current);
    }, 40);

    return () => clearInterval(interval);
  }, []);

  if (!showShutter) return null;

  return (
    <div className="fixed inset-0 z-[60] bg-transparent pointer-events-none">
      {/* Background layer during counting */}
      <div className={`absolute inset-0 bg-[#020617] flex flex-col items-center justify-center pointer-events-auto transition-opacity duration-500 ${shutterExit ? 'opacity-0' : 'opacity-100'}`}>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />
        
        <div className="relative z-10 flex flex-col items-center">
          <span className="text-7xl md:text-9xl font-bold text-white tracking-tighter mb-4 opacity-80">
            {percent}<span className="text-cyan-400 text-3xl md:text-5xl">%</span>
          </span>
          <div className="w-48 md:w-64 h-1 bg-white/5 rounded-full overflow-hidden relative">
            <div 
              className="absolute left-0 top-0 h-full bg-cyan-400 shadow-[0_0_15px_rgba(103,232,249,0.5)] transition-all duration-100 ease-out" 
              style={{ width: `${percent}%` }}
            />
          </div>
          <p className="mt-8 text-white/30 text-xs font-semibold tracking-[0.3em] uppercase">
            Initializing Portfolio
          </p>
        </div>
      </div>

      {/* Shutter layers for exit animation */}
      <div 
        className={`absolute inset-0 bg-[#020617] pointer-events-auto transition-transform duration-1000 ease-[cubic-bezier(0.85,0,0.15,1)] origin-top ${
          shutterExit ? 'scale-y-0' : 'scale-y-100'
        }`} 
      />
    </div>
  );
};
