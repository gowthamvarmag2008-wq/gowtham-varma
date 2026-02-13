
import React from 'react';
import { TripDetails } from '../types';
import { Icons } from '../constants';

interface Props {
  trip: TripDetails;
  onNext: (step?: number) => void;
  onBack: () => void;
}

const ActionButton: React.FC<{
  title: string;
  icon: React.ReactNode;
  subtitle: string;
  onClick: () => void;
  variant?: 'danger' | 'primary' | 'secondary' | 'accent';
}> = ({ title, icon, subtitle, onClick, variant = 'secondary' }) => {
  const styles = {
    danger: 'bg-white border-red-100 text-red-600 ring-1 ring-red-50 shadow-red-100/20 animate-emergency',
    primary: 'bg-white border-blue-100 text-blue-600 ring-1 ring-blue-50 shadow-blue-100/20',
    secondary: 'bg-white border-slate-100 text-slate-900',
    accent: 'bg-white border-yellow-200 text-yellow-700 ring-1 ring-yellow-50 shadow-yellow-100/20'
  };

  return (
    <button 
      onClick={onClick}
      className={`p-6 rounded-[32px] border shadow-sm flex flex-col items-center text-center gap-3 transition-all active:scale-[0.92] hover:shadow-lg ${styles[variant]}`}
    >
      <div className={`p-4 rounded-2xl ${
        variant === 'danger' ? 'bg-red-50' : 
        variant === 'primary' ? 'bg-blue-50' : 
        variant === 'accent' ? 'bg-yellow-50' : 'bg-slate-50'
      }`}>
        {icon}
      </div>
      <div>
        <h4 className="font-poppins font-bold text-sm tracking-tight">{title}</h4>
        <p className="text-[9px] uppercase tracking-widest font-black opacity-40 mt-1">{subtitle}</p>
      </div>
    </button>
  );
};

const Step3Actions: React.FC<Props> = ({ trip, onNext, onBack }) => {
  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h2 className="text-3xl font-poppins font-black text-slate-900 leading-tight">
          What do you need, <span className="text-blue-600">{trip.userName}</span>?
        </h2>
        <p className="text-slate-500 font-medium">Instant help based on your trip mood.</p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <ActionButton 
          title="Emergency" 
          subtitle="Medical/Safety"
          icon={<Icons.Emergency className="w-8 h-8" />} 
          variant="danger"
          onClick={() => onNext(4)}
        />
        <ActionButton 
          title="Plan Day" 
          subtitle="AI Optimized"
          icon={<Icons.Sparkles className="w-8 h-8" />} 
          variant="primary"
          onClick={() => onNext(5)}
        />
        <ActionButton 
          title="Special Food" 
          subtitle="Local tastes"
          icon={<Icons.Food className="w-8 h-8" />} 
          variant="accent"
          onClick={() => {}}
        />
        <ActionButton 
          title="Explore" 
          subtitle="Hidden Gems"
          icon={<Icons.Compass className="w-8 h-8" />} 
          onClick={() => onNext(4)}
        />
        <ActionButton 
          title="Devotional" 
          subtitle="Peaceful places"
          icon={<Icons.Temple className="w-8 h-8" />} 
          onClick={() => {}}
        />
        <ActionButton 
          title="Budget" 
          subtitle="Manage Funds"
          icon={<Icons.Wallet className="w-8 h-8" />} 
          onClick={() => {}}
        />
      </div>

      <div className="pt-4">
        <button 
          onClick={() => onNext()}
          className="w-full bg-[#14B8A6] text-white font-bold py-5 rounded-[24px] shadow-lg shadow-teal-500/20 flex items-center justify-center gap-3 hover:bg-teal-600 transition-all active:scale-[0.98]"
        >
          <span className="font-poppins">Go to Navigation</span>
          <Icons.ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default Step3Actions;
