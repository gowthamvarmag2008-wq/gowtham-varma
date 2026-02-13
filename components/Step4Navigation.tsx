
import React from 'react';
import { TripDetails } from '../types';
import { Icons } from '../constants';

interface Props {
  trip: TripDetails;
  onBack: () => void;
  onNext: () => void;
}

const Step4Navigation: React.FC<Props> = ({ trip, onBack, onNext }) => {
  return (
    <div className="h-[calc(100vh-140px)] flex flex-col -m-4 animate-in fade-in duration-500">
      {/* Map Mockup */}
      <div className="flex-1 relative bg-slate-200 overflow-hidden">
        <img 
          src={`https://picsum.photos/seed/${trip.placeVisited}/800/1200`} 
          className="w-full h-full object-cover opacity-80" 
          alt="Map" 
        />
        
        {/* Map UI Overlay */}
        <div className="absolute inset-0 bg-blue-500/5" />
        
        {/* Floating Controls */}
        <div className="absolute top-8 right-4 flex flex-col gap-3">
          <button className="bg-white p-3 rounded-2xl shadow-lg text-slate-700">
            <Icons.Location className="w-6 h-6" />
          </button>
          <button className="bg-white p-3 rounded-2xl shadow-lg text-slate-700">
            <Icons.Compass className="w-6 h-6" />
          </button>
        </div>

        {/* Floating Back Button */}
        <button onClick={onBack} className="absolute top-8 left-4 bg-white p-3 rounded-2xl shadow-lg text-slate-700">
          <Icons.ChevronLeft className="w-6 h-6" />
        </button>

        {/* Dynamic Point on Map */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="relative">
            <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white border-4 border-white shadow-2xl animate-bounce">
              <Icons.Location className="w-6 h-6" />
            </div>
            <div className="absolute top-0 left-0 w-12 h-12 bg-blue-600 rounded-full animate-ping opacity-25" />
          </div>
        </div>
      </div>

      {/* Bottom Info Card */}
      <div className="bg-white rounded-t-[40px] p-8 shadow-[0_-10px_40px_rgba(0,0,0,0.1)] relative z-10 border-t border-slate-100">
        <div className="w-12 h-1.5 bg-slate-200 rounded-full mx-auto mb-6" />
        
        <div className="flex items-start justify-between mb-8">
          <div>
            <h3 className="text-2xl font-black text-slate-900">{trip.placeVisited} Center</h3>
            <div className="flex items-center gap-4 mt-2">
              <span className="flex items-center gap-1 text-slate-500 text-sm font-medium">
                <Icons.Transport className="w-4 h-4" /> 4.2 km
              </span>
              <span className="flex items-center gap-1 text-slate-500 text-sm font-medium">
                <Icons.Sparkles className="w-4 h-4 text-orange-400" /> 12 min
              </span>
            </div>
          </div>
          <div className="text-right">
            <div className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-[10px] font-bold uppercase tracking-wider mb-1">Fastest Route</div>
            <p className="text-xl font-bold text-slate-900">12:30 PM</p>
          </div>
        </div>

        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <button className="bg-blue-600 text-white font-bold py-4 rounded-2xl shadow-lg shadow-blue-500/20 active:scale-95 transition-all">
              Start Nav
            </button>
            <button className="bg-slate-100 text-slate-700 font-bold py-4 rounded-2xl active:scale-95 transition-all">
              View Route
            </button>
          </div>
          <button 
            className="w-full bg-red-600 text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-2 active:scale-95 transition-all"
            onClick={onNext}
          >
            <Icons.Emergency className="w-5 h-5" />
            Emergency Help
          </button>
        </div>
      </div>
    </div>
  );
};

export default Step4Navigation;
