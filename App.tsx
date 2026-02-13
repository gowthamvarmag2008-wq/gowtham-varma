
import React, { useState, useEffect } from 'react';
import { TripDetails, TripType, TripMood } from './types';
import { Icons } from './constants';
import Step1Welcome from './components/Step1Welcome';
import Step2Dashboard from './components/Step2Dashboard';
import Step3Actions from './components/Step3Actions';
import Step4Navigation from './components/Step4Navigation';
import Step5AI from './components/Step5AI';
import SplashScreen from './components/SplashScreen';
import Logo from './components/Logo';

const App: React.FC = () => {
  const [showSplash, setShowSplash] = useState(true);
  const [step, setStep] = useState(1);
  const [trip, setTrip] = useState<TripDetails>({
    userName: '',
    age: '',
    placeVisited: 'Bali, Indonesia',
    dateOfVisit: new Date().toISOString().split('T')[0],
    tripType: TripType.SOLO,
    tripMood: TripMood.RELAXED
  });

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [step]);

  if (showSplash) {
    return <SplashScreen onFinish={() => setShowSplash(false)} />;
  }

  const renderStep = () => {
    switch (step) {
      case 1:
        return <Step1Welcome trip={trip} setTrip={setTrip} onNext={() => setStep(2)} />;
      case 2:
        return <Step2Dashboard trip={trip} onNext={() => setStep(3)} onBack={() => setStep(1)} />;
      case 3:
        return <Step3Actions trip={trip} onNext={(nextStep) => setStep(nextStep || 4)} onBack={() => setStep(2)} />;
      case 4:
        return <Step4Navigation trip={trip} onBack={() => setStep(3)} onNext={() => setStep(5)} />;
      case 5:
        return <Step5AI trip={trip} onBack={() => setStep(4)} />;
      default:
        return <Step1Welcome trip={trip} setTrip={setTrip} onNext={() => setStep(2)} />;
    }
  };

  return (
    <div className="min-h-screen max-w-md mx-auto bg-[#f9fafb] relative pb-20 overflow-x-hidden">
      {/* Premium Sticky Header */}
      <header className="sticky top-0 z-50 glass-morphism p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Logo size={36} />
          <div>
            <h1 className="text-lg font-poppins font-bold text-slate-900 leading-none">Smart Trip</h1>
            <p className="text-[10px] text-slate-500 font-bold tracking-widest uppercase mt-0.5">Guide</p>
          </div>
        </div>
        <div className="flex items-center gap-1 bg-blue-50 px-3 py-1.5 rounded-2xl border border-blue-100 shadow-sm">
          <span className="text-[10px] font-black text-blue-600 uppercase">Step {step} of 5</span>
        </div>
      </header>

      {/* Main Content Area with Page Transitions */}
      <main className="p-4 page-transition-enter" key={step}>
        {renderStep()}
      </main>

      {/* Modern Progress Track */}
      <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto h-1.5 bg-slate-100 z-[60]">
        <div 
          className="h-full bg-[#2563EB] shadow-[0_0_10px_rgba(37,99,235,0.4)] transition-all duration-700 ease-in-out" 
          style={{ width: `${(step / 5) * 100}%` }}
        />
      </div>
    </div>
  );
};

export default App;
