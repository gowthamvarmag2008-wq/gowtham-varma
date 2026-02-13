
import React, { useState, useEffect, useRef } from 'react';
import { TripDetails, ChatMessage, DayPlan } from '../types';
import { Icons } from '../constants';
import { AIService, StorageService } from '../services/api';

interface Props {
  trip: TripDetails;
  onBack: () => void;
}

const Step5AI: React.FC<Props> = ({ trip, onBack }) => {
  const [activeTab, setActiveTab] = useState<'assistant' | 'planner'>('assistant');
  const [aiData, setAIData] = useState<{summary: string, plan: DayPlan[]} | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchAI = async () => {
      setLoading(true);
      StorageService.logAction('fetch_ai_plan');
      const data = await AIService.getItinerary(trip);
      setAIData(data);
      setLoading(false);
      
      setMessages([
        { 
          id: '1', 
          role: 'model', 
          text: `Hi ${trip.userName}! I've prepared a custom ${trip.tripMood.toLowerCase()} itinerary for your trip to ${trip.placeVisited}. How can I help you explore today?` 
        }
      ]);
    };
    fetchAI();
  }, [trip]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async () => {
    if (!input.trim()) return;
    const userMsg: ChatMessage = { id: Date.now().toString(), role: 'user', text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);
    StorageService.logAction('ai_chat');

    try {
      const response = await AIService.chat(input, trip);
      setMessages(prev => [...prev, { id: (Date.now() + 1).toString(), role: 'model', text: response }]);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500 pb-10">
      {/* Premium Header */}
      <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl p-6 text-white shadow-xl shadow-blue-500/20">
        <div className="flex justify-between items-start mb-4">
          <div className="p-3 bg-white/20 rounded-2xl">
            <Icons.Sparkles className="w-8 h-8 text-white" />
          </div>
          <button onClick={onBack} className="p-2 hover:bg-white/10 rounded-xl">
            <Icons.ChevronLeft className="w-6 h-6" />
          </button>
        </div>
        <h2 className="text-2xl font-black">AI Smart Assistant</h2>
        <p className="text-blue-100 text-sm mt-1">Personalized advice powered by Gemini 3</p>
      </div>

      {/* Tabs */}
      <div className="flex bg-slate-100 p-1 rounded-2xl">
        <button 
          onClick={() => setActiveTab('assistant')}
          className={`flex-1 py-3 text-sm font-bold rounded-xl transition-all ${activeTab === 'assistant' ? 'bg-white shadow-sm text-blue-600' : 'text-slate-500'}`}
        >
          AI Chat
        </button>
        <button 
          onClick={() => setActiveTab('planner')}
          className={`flex-1 py-3 text-sm font-bold rounded-xl transition-all ${activeTab === 'planner' ? 'bg-white shadow-sm text-blue-600' : 'text-slate-500'}`}
        >
          Day Planner
        </button>
      </div>

      {activeTab === 'assistant' ? (
        <div className="flex flex-col h-[400px] bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="flex-1 overflow-y-auto p-4 space-y-4 hide-scrollbar">
            {messages.map((m) => (
              <div key={m.id} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-4 rounded-2xl text-sm leading-relaxed ${
                  m.role === 'user' 
                  ? 'bg-blue-600 text-white rounded-tr-none' 
                  : 'bg-slate-100 text-slate-800 rounded-tl-none'
                }`}>
                  {m.text}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-slate-100 p-4 rounded-2xl rounded-tl-none animate-pulse">
                  <div className="flex gap-1">
                    <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" />
                    <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:0.2s]" />
                    <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:0.4s]" />
                  </div>
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>
          <div className="p-4 border-t border-slate-100 flex gap-2">
            <input 
              className="flex-1 bg-slate-50 rounded-xl px-4 py-3 text-sm focus:outline-none" 
              placeholder="Ask anything..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            />
            <button 
              onClick={handleSendMessage}
              className="bg-blue-600 text-white p-3 rounded-xl hover:bg-blue-700 active:scale-95 transition-all"
            >
              <Icons.Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
            <h3 className="font-bold text-slate-900 mb-2 flex items-center gap-2">
              <Icons.Compass className="w-5 h-5 text-blue-500" /> Trip Insight
            </h3>
            {loading && !aiData ? (
              <div className="h-20 bg-slate-50 animate-pulse rounded-xl" />
            ) : (
              <p className="text-sm text-slate-600 leading-relaxed italic">
                "{aiData?.summary || 'Drafting your personalized travel summary...'}"
              </p>
            )}
          </div>

          <div className="space-y-4">
            <h3 className="font-bold text-slate-900 ml-1">Today's Timeline</h3>
            {loading && !aiData ? (
              <div className="space-y-3">
                {[1,2,3].map(i => <div key={i} className="h-24 bg-slate-100 animate-pulse rounded-3xl" />)}
              </div>
            ) : (
              aiData?.plan?.map((item, i) => (
                <div key={i} className="flex gap-4 group">
                  <div className="flex flex-col items-center">
                    <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-xs">
                      {item.time.split(' ')[0]}
                    </div>
                    {i !== aiData.plan.length - 1 && <div className="w-0.5 flex-1 bg-slate-200 my-1" />}
                  </div>
                  <div className="flex-1 bg-white rounded-3xl p-5 shadow-sm border border-slate-100 mb-4 hover:shadow-md transition-shadow">
                    <h4 className="font-bold text-slate-900">{item.activity}</h4>
                    <p className="text-xs text-slate-500 mt-1">{item.description}</p>
                    <div className="flex gap-2 mt-4">
                      <button className="text-[10px] font-bold text-blue-600 px-3 py-1 bg-blue-50 rounded-lg">Navigate</button>
                      <button className="text-[10px] font-bold text-slate-500 px-3 py-1 bg-slate-100 rounded-lg">Details</button>
                    </div>
                  </div>
                </div>
              )) || <p className="text-center py-10 text-slate-400">Unable to load plan. Check connection.</p>
            )}
          </div>
        </div>
      )}

      {/* Settings / Personalization Preview */}
      <div className="grid grid-cols-2 gap-4 pb-4">
        <div className="bg-white p-4 rounded-3xl border border-slate-100 flex items-center gap-3">
          <Icons.Globe className="w-5 h-5 text-slate-400" />
          <span className="text-sm font-bold">English</span>
        </div>
        <div className="bg-white p-4 rounded-3xl border border-slate-100 flex items-center gap-3">
          <Icons.Moon className="w-5 h-5 text-slate-400" />
          <span className="text-sm font-bold">Dark Mode</span>
        </div>
      </div>

      <div className="bg-slate-900 rounded-[40px] p-8 text-center space-y-4 overflow-hidden relative">
        <img 
          src="https://picsum.photos/seed/memories/600/400" 
          className="absolute inset-0 w-full h-full object-cover opacity-20" 
          alt="Memories"
        />
        <div className="relative z-10">
          <h3 className="text-2xl font-bold text-white">Capture Memories</h3>
          <p className="text-slate-400 text-sm">Save your best moments from {trip.placeVisited}.</p>
          <button className="bg-white text-slate-900 font-bold px-8 py-3 rounded-2xl mt-4 hover:scale-105 transition-transform active:scale-95">
            Create Trip Book
          </button>
        </div>
      </div>
    </div>
  );
};

export default Step5AI;
