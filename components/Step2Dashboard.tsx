
import React, { useEffect, useState } from 'react';
import { TripDetails } from '../types';
import { Icons } from '../constants';
import { PlaceService, StorageService } from '../services/api';

interface Props {
  trip: TripDetails;
  onNext: () => void;
  onBack: () => void;
}

const InfoCard: React.FC<{ 
  title: string; 
  icon: React.ReactNode; 
  desc: string; 
  color: string;
  loading?: boolean;
}> = ({ title, icon, desc, color, loading }) => (
  <div className="bg-white rounded-[32px] p-6 shadow-sm border border-slate-50 flex flex-col items-start gap-4 active:scale-[0.95] transition-transform h-full">
    <div className={`p-4 rounded-2xl ${color} bg-opacity-10 text-${color.split('-')[1]}-600`}>
      {icon}
    </div>
    <div className="space-y-1.5 flex-1">
      <h3 className="font-poppins font-bold text-slate-900 text-sm tracking-tight">{title}</h3>
      {loading ? (
        <div className="space-y-2">
          <div className="h-3 bg-slate-100 rounded-full w-full animate-pulse" />
          <div className="h-3 bg-slate-100 rounded-full w-2/3 animate-pulse" />
        </div>
      ) : (
        <p className="text-xs text-slate-500 leading-relaxed font-medium line-clamp-3">{desc}</p>
      )}
    </div>
    <button className="text-[10px] font-black uppercase tracking-widest text-blue-600 mt-1 hover:opacity-70">
      Details
    </button>
  </div>
);

const Step2Dashboard: React.FC<Props> = ({ trip, onNext, onBack }) => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const res = await PlaceService.getInfo(trip.placeVisited);
      setData(res);
      setLoading(false);
      StorageService.logAction('view_dashboard');
    };
    fetchData();
  }, [trip.placeVisited]);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <button onClick={onBack} className="p-3 bg-white shadow-sm border border-slate-100 rounded-2xl active:scale-90 transition-all">
          <Icons.ChevronLeft className="w-5 h-5" />
        </button>
        <h2 className="text-2xl font-poppins font-black text-slate-900 truncate">Explore {trip.placeVisited}</h2>
      </div>

      <div className="grid grid-cols-1 gap-4">
        <div className="bg-gradient-to-br from-[#2563EB] to-[#1D4ED8] rounded-[32px] p-7 text-white shadow-2xl shadow-blue-500/30 relative overflow-hidden min-h-[160px]">
          <div className="relative z-10 space-y-3">
            <h3 className="text-lg font-poppins font-bold flex items-center gap-2">
              <Icons.Compass className="w-5 h-5" /> About the Place
            </h3>
            {loading ? (
              <div className="space-y-2 opacity-50">
                <div className="h-4 bg-white/20 rounded-full w-full animate-pulse" />
                <div className="h-4 bg-white/20 rounded-full w-3/4 animate-pulse" />
              </div>
            ) : (
              <p className="text-blue-50 text-sm leading-relaxed font-medium">
                {data?.description || `${trip.placeVisited} is waiting for you!`}
              </p>
            )}
          </div>
          <Icons.Sparkles className="absolute -right-6 -bottom-6 w-36 h-36 text-white/10 rotate-12" />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <InfoCard 
            title="Local Flavors" 
            icon={<Icons.Food className="w-6 h-6" />} 
            desc={data?.foods?.join(', ') || "Searching foods..."} 
            color="bg-orange-500"
            loading={loading}
          />
          <InfoCard 
            title="Top Sights" 
            icon={<Icons.Temple className="w-6 h-6" />} 
            desc={data?.attractions?.join(', ') || "Finding spots..."} 
            color="bg-purple-500" 
            loading={loading}
          />
          <InfoCard 
            title="Emergency" 
            icon={<Icons.Hospital className="w-6 h-6" />} 
            desc={data?.hospitals?.join(', ') || "Nearby aid..."} 
            color="bg-[#EF4444]" 
            loading={loading}
          />
          <InfoCard 
            title="Getting Around" 
            icon={<Icons.Transport className="w-6 h-6" />} 
            desc={data?.transport || "Transit info..."} 
            color="bg-[#14B8A6]" 
            loading={loading}
          />
        </div>

        <div className="bg-slate-900 rounded-[32px] p-7 text-white flex items-center justify-between shadow-xl">
          <div className="space-y-1">
            <h4 className="text-slate-500 text-[10px] font-black uppercase tracking-[3px]">Budget Estimate</h4>
            <p className="text-2xl font-poppins font-bold text-[#FACC15]">{data?.budgetEstimate || "Calculating..."}</p>
          </div>
          <div className="p-4 bg-white/5 rounded-2xl ring-1 ring-white/10">
            <Icons.Wallet className="w-7 h-7 text-blue-400" />
          </div>
        </div>
      </div>

      <button 
        onClick={onNext}
        className="w-full bg-[#2563EB] text-white font-poppins font-bold py-5 rounded-[24px] shadow-xl shadow-blue-600/30 flex items-center justify-center gap-3 hover:bg-blue-700 transition-all active:scale-[0.98]"
      >
        View Smart Actions
        <Icons.ArrowRight className="w-5 h-5" />
      </button>
    </div>
  );
};

export default Step2Dashboard;
