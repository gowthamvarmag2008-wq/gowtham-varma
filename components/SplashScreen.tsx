
import React, { useEffect, useState } from 'react';
import Logo from './Logo';

const SplashScreen: React.FC<{ onFinish: () => void }> = ({ onFinish }) => {
  useEffect(() => {
    const timer = setTimeout(onFinish, 2500);
    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <div className="fixed inset-0 z-[100] bg-white flex flex-col items-center justify-center p-6">
      <div className="animate-logo-reveal flex flex-col items-center gap-6">
        <div className="relative">
          <Logo size={100} />
          <div className="absolute inset-0 bg-blue-500/20 blur-2xl rounded-full -z-10 animate-pulse" />
        </div>
        <div className="text-center">
          <h1 className="text-3xl font-poppins font-black text-slate-900 tracking-tight">
            Smart Trip Guide
          </h1>
          <p className="text-slate-500 font-medium mt-2 tracking-wide">
            Your Smart Travel Companion
          </p>
        </div>
      </div>
      
      <div className="absolute bottom-12 flex flex-col items-center gap-4">
        <div className="flex gap-1.5">
          <div className="w-2 h-2 rounded-full bg-blue-600 animate-bounce" />
          <div className="w-2 h-2 rounded-full bg-blue-600 animate-bounce [animation-delay:0.2s]" />
          <div className="w-2 h-2 rounded-full bg-blue-600 animate-bounce [animation-delay:0.4s]" />
        </div>
      </div>
    </div>
  );
};

export default SplashScreen;
