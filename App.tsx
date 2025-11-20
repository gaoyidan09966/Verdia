import React, { useState } from 'react';
import PlantAnalyzer from './components/PlantAnalyzer';
import ChatAssistant from './components/ChatAssistant';
import { LeafIcon, CameraIcon, MessageSquareIcon } from './components/Icons';
import { ViewState } from './types';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewState>('home');

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-white text-slate-800 font-sans">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-emerald-100 shadow-sm">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div 
            className="flex items-center space-x-2 cursor-pointer" 
            onClick={() => setCurrentView('home')}
          >
            <LeafIcon className="w-6 h-6 text-emerald-600" />
            <h1 className="text-xl font-bold text-emerald-900 tracking-tight">Verdia</h1>
          </div>
          
          <nav className="flex items-center space-x-1 bg-slate-100 p-1 rounded-xl">
            <button
              onClick={() => setCurrentView('analyze')}
              className={`flex items-center space-x-1.5 px-4 py-1.5 rounded-lg text-sm font-medium transition-all ${
                currentView === 'analyze' 
                  ? 'bg-white text-emerald-700 shadow-sm' 
                  : 'text-slate-600 hover:text-emerald-600'
              }`}
            >
              <CameraIcon className="w-4 h-4" />
              <span className="hidden sm:inline">Identify</span>
            </button>
            <button
              onClick={() => setCurrentView('chat')}
              className={`flex items-center space-x-1.5 px-4 py-1.5 rounded-lg text-sm font-medium transition-all ${
                currentView === 'chat' 
                  ? 'bg-white text-emerald-700 shadow-sm' 
                  : 'text-slate-600 hover:text-emerald-600'
              }`}
            >
              <MessageSquareIcon className="w-4 h-4" />
              <span className="hidden sm:inline">Chat Expert</span>
            </button>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-8 md:py-12">
        {currentView === 'home' && (
          <div className="animate-fade-in flex flex-col items-center text-center py-12 md:py-20">
            <div className="bg-emerald-100 p-4 rounded-full mb-8 shadow-inner">
              <LeafIcon className="w-16 h-16 text-emerald-600" />
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold text-emerald-950 mb-6 tracking-tight">
              Your Personal <br className="hidden md:block" />
              <span className="text-emerald-600">AI Gardening Expert</span>
            </h1>
            <p className="text-lg md:text-xl text-slate-600 max-w-2xl mb-10 leading-relaxed">
              Verdia uses advanced AI to identify plants instantly and provide personalized care advice to help your garden thrive.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md">
              <button 
                onClick={() => setCurrentView('analyze')}
                className="flex-1 flex items-center justify-center space-x-2 bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-lg shadow-emerald-600/20 hover:shadow-emerald-600/30 transition-all hover:-translate-y-1"
              >
                <CameraIcon className="w-6 h-6" />
                <span>Identify Plant</span>
              </button>
              <button 
                onClick={() => setCurrentView('chat')}
                className="flex-1 flex items-center justify-center space-x-2 bg-white border-2 border-emerald-100 hover:border-emerald-300 text-emerald-800 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-emerald-50 transition-all"
              >
                <MessageSquareIcon className="w-6 h-6" />
                <span>Ask Question</span>
              </button>
            </div>

            <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl w-full">
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-emerald-50/50">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mb-4 text-blue-600 mx-auto md:mx-0">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">Care Guides</h3>
                <p className="text-slate-600">Get detailed watering, sunlight, and soil requirements.</p>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-emerald-50/50">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mb-4 text-purple-600 mx-auto md:mx-0">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">Fast ID</h3>
                <p className="text-slate-600">Instantly recognize thousands of plant species from a single photo.</p>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-emerald-50/50">
                <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center mb-4 text-orange-600 mx-auto md:mx-0">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" /></svg>
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">Diagnosis</h3>
                <p className="text-slate-600">Identify pests and diseases early to save your plants.</p>
              </div>
            </div>
          </div>
        )}

        {currentView === 'analyze' && <PlantAnalyzer />}
        {currentView === 'chat' && <ChatAssistant />}
      </main>
    </div>
  );
};

export default App;
