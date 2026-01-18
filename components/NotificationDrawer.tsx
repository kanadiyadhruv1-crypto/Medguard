
import React from 'react';

export interface Notification {
  id: string;
  type: 'CRITICAL' | 'COMMUNITY' | 'SYSTEM';
  title: string;
  message: string;
  time: string;
  isRead: boolean;
}

interface NotificationDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  notifications: Notification[];
  onClearAll: () => void;
  onMarkRead: (id: string) => void;
}

const NotificationDrawer: React.FC<NotificationDrawerProps> = ({ 
  isOpen, 
  onClose, 
  notifications, 
  onClearAll,
  onMarkRead
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[200] flex justify-end animate-fadeIn">
      <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={onClose}></div>
      
      <div className="relative w-full max-w-sm bg-white h-full shadow-2xl flex flex-col animate-slideRight">
        <div className="p-6 border-b flex justify-between items-center bg-slate-50">
          <div>
            <h2 className="text-xl font-black text-slate-900">Alert Center</h2>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Real-time Safety Updates</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-slate-200 rounded-full transition-colors text-slate-500">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {notifications.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-8 opacity-40">
              <div className="bg-slate-100 p-6 rounded-full mb-4">
                <svg className="w-12 h-12 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
              </div>
              <p className="text-sm font-bold text-slate-500">All clear, Doctor.</p>
              <p className="text-xs font-medium">No new safety alerts in your network.</p>
            </div>
          ) : (
            notifications.map((n) => (
              <div 
                key={n.id} 
                onClick={() => onMarkRead(n.id)}
                className={`p-4 rounded-2xl border transition-all cursor-pointer relative overflow-hidden group ${
                  n.isRead ? 'bg-white border-slate-100 opacity-60' : 'bg-slate-50 border-indigo-100 shadow-sm'
                }`}
              >
                {!n.isRead && <div className="absolute top-0 left-0 bottom-0 w-1 bg-indigo-600"></div>}
                
                <div className="flex gap-3">
                  <div className={`h-10 w-10 rounded-xl flex items-center justify-center shrink-0 ${
                    n.type === 'CRITICAL' ? 'bg-rose-100 text-rose-600' :
                    n.type === 'COMMUNITY' ? 'bg-purple-100 text-purple-600' : 'bg-blue-100 text-blue-600'
                  }`}>
                    {n.type === 'CRITICAL' ? (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                    ) : n.type === 'COMMUNITY' ? (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                    ) : (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-0.5">
                      <h4 className="text-xs font-black text-slate-900 leading-tight pr-4">{n.title}</h4>
                      <span className="text-[9px] font-bold text-slate-400 whitespace-nowrap">{n.time}</span>
                    </div>
                    <p className="text-[11px] text-slate-600 font-medium leading-relaxed">{n.message}</p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {notifications.length > 0 && (
          <div className="p-6 border-t bg-slate-50">
            <button 
              onClick={onClearAll}
              className="w-full py-3 text-xs font-black text-slate-500 uppercase tracking-widest hover:text-rose-600 transition-colors"
            >
              Dismiss All Notifications
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationDrawer;
