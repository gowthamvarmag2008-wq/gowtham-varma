
import React from 'react';
import { TripDetails, TripType, TripMood } from '../types';
import { Icons } from '../constants';
import { StorageService } from '../services/api';

interface Props {
  trip: TripDetails;
  setTrip: (t: TripDetails) => void;
  onNext: () => void;
}

const Step1Welcome: React.FC<Props> = ({ trip, setTrip, onNext }) => {
  const handleNext = () => {
    StorageService.saveTrip(trip);
    StorageService.logAction('create_trip');
    onNext();
  };

  return (
    <div className="space-y-6">
      <div className="text-center py-4 space-y-4">
        <div className="relative group">
          <img 
            src={`https://picsum.photos/seed/${trip.placeVisited || 'travel'}/400/200`} 
            className="rounded-[32px] shadow-2xl mb-2 w-full object-cover h-48 border-4 border-white transition-transform group-hover:scale-[1.02] duration-500" 
            alt="Travel" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-[32px]" />
        </div>
        <div>
          <h2 className="text-3xl font-poppins font-black text-slate-900 leading-tight">Personalize Your Trip</h2>
          <p className="text-slate-500 font-medium mt-1">Tell us a bit about your journey.</p>
        </div>
      </div>

      <div className="bg-white rounded-[32px] p-7 shadow-xl shadow-slate-200/50 border border-slate-100 space-y-5">
        <div>
          <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">Your Name</label>
          <input 
            type="text" 
            placeholder="e.g. Alex"
            className="w-full bg-slate-50 border-none rounded-2xl px-5 py-4 focus:ring-2 focus:ring-blue-500/20 focus:bg-white transition-all font-medium"
            value={trip.userName}
            onChange={(e) => setTrip({...trip, userName: e.target.value})}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">Age</label>
            <input 
              type="number" 
              placeholder="25"
              className="w-full bg-slate-50 border-none rounded-2xl px-5 py-4 focus:ring-2 focus:ring-blue-500/20 focus:bg-white transition-all font-medium"
              value={trip.age}
              onChange={(e) => setTrip({...trip, age: e.target.value})}
            />
          </div>
          <div>
            <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">Visit Date</label>
            <input 
              type="date" 
              className="w-full bg-slate-50 border-none rounded-2xl px-5 py-4 focus:ring-2 focus:ring-blue-500/20 focus:bg-white transition-all font-medium"
              value={trip.dateOfVisit}
              onChange={(e) => setTrip({...trip, dateOfVisit: e.target.value})}
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">Destination</label>
          <div className="relative">
            <Icons.Location className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-blue-500" />
            <input 
              type="text" 
              placeholder="Paris, Tokyo..."
              className="w-full bg-slate-50 border-none rounded-2xl pl-14 pr-5 py-4 focus:ring-2 focus:ring-blue-500/20 focus:bg-white transition-all font-medium"
              value={trip.placeVisited}
              onChange={(e) => setTrip({...trip, placeVisited: e.target.value})}
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">Trip Mood</label>
          <div className="flex flex-wrap gap-2">
            {Object.values(TripMood).map(mood => (
              <button
                key={mood}
                onClick={() => setTrip({...trip, tripMood: mood})}
                className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all active:scale-90 ${
                  trip.tripMood === mood 
                  ? 'bg-[#2563EB] text-white shadow-lg shadow-blue-500/20' 
                  : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                }`}
              >
                {mood}
              </button>
            ))}
          </div>
        </div>
      </div>

      <button 
        onClick={handleNext}
        disabled={!trip.userName || !trip.placeVisited}
        className="w-full bg-[#2563EB] text-white font-poppins font-bold py-5 rounded-[24px] shadow-xl shadow-blue-600/30 flex items-center justify-center gap-3 hover:bg-blue-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.96] group"
      >
        Create Journey 
        <Icons.ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
      </button>
    </div>
  );
};

export default Step1Welcome;
