
import React from 'react';

interface LayoutProps {
  children: React.ReactNode;
  user: any;
  onLogout: () => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, user, onLogout, activeTab, setActiveTab }) => {
  return (
    <div className="min-h-screen flex flex-col bg-[#F4F7F9]">
      <nav className="bg-white border-b border-slate-200 sticky top-0 z-50 md:block hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setActiveTab('dashboard')}>
              <div className="bg-[#0047FF] p-1.5 rounded-lg shadow-sm">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <span className="text-xl font-black tracking-tighter text-slate-900">MEDGUARD</span>
            </div>
            
            <div className="flex space-x-2">
              {[
                { id: 'dashboard', label: 'Home' },
                { id: 'reports', label: 'Report' },
                { id: 'community', label: 'Community' },
                { id: 'profile', label: 'Safety' }
              ].map(tab => (
                <button 
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)} 
                  className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${activeTab === tab.id ? 'bg-indigo-50 text-indigo-700' : 'text-slate-500 hover:bg-slate-50'}`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="flex items-center space-x-4">
              <button onClick={onLogout} className="text-slate-400 hover:text-rose-600 px-3 py-2 rounded-xl text-xs font-bold transition-all">Logout</button>
            </div>
          </div>
        </div>
      </nav>

      <main className="flex-grow max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
        {children}
      </main>

      {/* Mobile Bottom Nav - Updated Labels and Icons */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-100 flex justify-around py-3 px-2 shadow-[0_-4px_20px_rgba(0,0,0,0.05)] z-50">
         <button onClick={() => setActiveTab('dashboard')} className={`flex flex-col items-center flex-1 transition-all ${activeTab === 'dashboard' ? 'text-[#0047FF]' : 'text-slate-400'}`}>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
            <span className="text-[10px] font-bold mt-1">Home</span>
         </button>
         <button onClick={() => setActiveTab('reports')} className={`flex flex-col items-center flex-1 transition-all ${activeTab === 'reports' ? 'text-[#0047FF]' : 'text-slate-400'}`}>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
            <span className="text-[10px] font-bold mt-1">Report</span>
         </button>
         <button onClick={() => setActiveTab('dashboard')} className={`flex flex-col items-center flex-1 transition-all text-slate-400`}>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
            <span className="text-[10px] font-bold mt-1">Dashboard</span>
         </button>
         <button onClick={() => setActiveTab('community')} className={`flex flex-col items-center flex-1 transition-all ${activeTab === 'community' ? 'text-[#0047FF]' : 'text-slate-400'}`}>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
            <span className="text-[10px] font-bold mt-1">Community</span>
         </button>
         <button onClick={() => setActiveTab('profile')} className={`flex flex-col items-center flex-1 transition-all ${activeTab === 'profile' ? 'text-[#0047FF]' : 'text-slate-400'}`}>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
            <span className="text-[10px] font-bold mt-1">Safety</span>
         </button>
      </div>
    </div>
  );
};

export default Layout;
