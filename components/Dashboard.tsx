
import React from 'react';
import { User, PatientReport, ReportSeverity } from '../types';

interface DashboardProps {
  user: User;
  reports: PatientReport[];
  onNewReport: () => void;
  setActiveTab: (tab: string) => void;
  onOpenNotifications: () => void;
  hasUnreadNotifications: boolean;
}

const Dashboard: React.FC<DashboardProps> = ({ 
  user, 
  reports, 
  onNewReport, 
  setActiveTab, 
  onOpenNotifications, 
  hasUnreadNotifications 
}) => {
  const criticalReports = reports.filter(r => r.severity === ReportSeverity.CRITICAL);

  return (
    <div className="flex flex-col -mt-8 -mx-4 sm:mx-0 sm:mt-0 pb-20 bg-[#F4F7F9]">
      {/* Blue Hero Header */}
      <div className="bg-[#0047FF] px-6 pt-8 pb-12 rounded-b-[40px] text-white text-center shadow-xl">
        <div className="flex justify-between items-center mb-6">
           <div className="bg-white/20 p-2 rounded-xl backdrop-blur-md">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
           </div>
           <h1 className="text-lg font-bold tracking-tight">Doctor Safety India</h1>
           <button 
             onClick={onOpenNotifications}
             className="relative p-2 hover:bg-white/10 rounded-xl transition-colors active:scale-90"
            >
             <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
             {hasUnreadNotifications && (
               <div className="absolute top-1.5 right-1.5 h-2.5 w-2.5 bg-red-500 rounded-full border-2 border-[#0047FF] animate-pulse"></div>
             )}
           </button>
        </div>

        <h2 className="text-2xl font-black mb-2 px-4 leading-tight">Protecting Healthcare Professionals</h2>
        <p className="text-blue-100 text-sm mb-8 px-6 opacity-90">A secure platform for doctors to report and share information about patient safety concerns</p>
        
        <div className="space-y-3 px-4">
          <button onClick={onNewReport} className="w-full py-4 bg-[#FF0000] text-white rounded-2xl font-black text-sm uppercase tracking-wider shadow-lg flex items-center justify-center gap-2 active:scale-95 transition-all">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
            Submit Report
          </button>
          <button onClick={() => setActiveTab('reports')} className="w-full py-4 bg-white text-[#0047FF] rounded-2xl font-black text-sm uppercase tracking-wider shadow-sm flex items-center justify-center gap-2 active:scale-95 transition-all">
             <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
             View Dashboard
          </button>
        </div>
      </div>

      {/* Network Stats Bar */}
      <div className="flex justify-between px-6 -mt-6">
        {[
          { icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z', label: 'Reports', value: '156', color: 'blue' },
          { icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z', label: 'Doctors', value: '1.2K', color: 'blue' },
          { icon: 'M13 7h8m0 0v8m0-8l-8 8-4-4-6 6', label: 'Alerts', value: '89', color: 'green' }
        ].map((stat, i) => (
          <div key={i} className="bg-white rounded-2xl shadow-lg p-3 w-[30%] flex flex-col items-center border border-slate-100">
            <svg className={`w-6 h-6 text-${stat.color}-600 mb-1`} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d={stat.icon} /></svg>
            <p className="text-lg font-black text-slate-800">{stat.value}</p>
            <p className="text-[10px] font-bold text-slate-400 uppercase">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Quick Access Menu */}
      <div className="px-6 mt-8 space-y-4">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-lg font-black text-slate-900">Quick Access</h3>
          <span className="text-xs text-slate-400 font-bold">Essential tools</span>
        </div>

        {[
          { label: 'Submit Report', sub: 'Report patient safety concerns', color: '#FF0000', icon: 'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z', tab: 'reports' },
          { label: 'View Dashboard', sub: 'Browse all reported cases', color: '#0047FF', icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z', tab: 'reports' },
          { label: 'Community Forum', sub: 'Connect with fellow doctors', color: '#A855F7', icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z', tab: 'community' },
          { label: 'Safety Guidelines', sub: 'Learn best practices', color: '#22C55E', icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z', tab: 'reports' }
        ].map((item, i) => (
          <div 
            key={i} 
            onClick={() => setActiveTab(item.tab)}
            className="bg-white rounded-2xl p-4 flex items-center justify-between shadow-sm active:scale-[0.98] transition-all border border-slate-100 group relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 bottom-0 w-1" style={{ backgroundColor: item.color }}></div>
            <div className="flex items-center gap-4">
               <div className="p-3 rounded-xl" style={{ backgroundColor: `${item.color}15` }}>
                  <svg className="w-6 h-6" fill="none" stroke={item.color} viewBox="0 0 24 24" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d={item.icon} /></svg>
               </div>
               <div>
                 <p className="text-sm font-black text-slate-800">{item.label}</p>
                 <p className="text-[11px] text-slate-400 font-medium">{item.sub}</p>
               </div>
            </div>
            <svg className="w-5 h-5 text-slate-300 group-active:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" /></svg>
          </div>
        ))}
      </div>

      {/* Mission Section */}
      <div className="px-6 mt-8 mb-4">
        <div className="bg-[#EBF1FF] rounded-[32px] p-8 text-center border border-blue-100">
           <div className="flex justify-center mb-4">
              <svg className="w-12 h-12 text-[#0047FF]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
           </div>
           <h3 className="text-lg font-black text-[#001D66] mb-4">Our Mission</h3>
           <p className="text-sm text-[#003BCC] font-medium leading-relaxed opacity-80">
             We believe healthcare professionals deserve to work in a safe environment. By creating a platform for sharing patient safety concerns, we aim to protect doctors, nurses, and medical staff across India.
           </p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
