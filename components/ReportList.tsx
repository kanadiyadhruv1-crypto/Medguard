
import React, { useState, useEffect, useRef } from 'react';
import { PatientReport, ReportSeverity } from '../types';
import { analyzeIncident } from '../services/geminiService';

interface ReportListProps {
  reports: PatientReport[];
  onAddReport: (report: PatientReport) => void;
}

const ReportList: React.FC<ReportListProps> = ({ reports, onAddReport }) => {
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showSubmitForm, setShowSubmitForm] = useState(false);
  const [expandedReportId, setExpandedReportId] = useState<string | null>(null);
  const [shareSuccess, setShareSuccess] = useState<string | null>(null);

  // AI State
  const [aiAnalysis, setAiAnalysis] = useState<{
    riskLevel: string;
    summary: string;
    recommendations: string[];
  } | null>(null);
  const [isAiLoading, setIsAiLoading] = useState(false);
  const analysisTimerRef = useRef<number | null>(null);

  const [formData, setFormData] = useState({
    patientName: '',
    patientAge: '',
    state: '',
    city: '',
    incidentDate: new Date().toISOString().split('T')[0],
    severity: ReportSeverity.LOW,
    description: '',
    doctorName: '',
    clinicId: '',
    contact: '+91-'
  });

  const states = ["Delhi", "Maharashtra", "Karnataka", "Tamil Nadu", "West Bengal", "Gujarat", "Other"];

  // Effect to trigger AI analysis with debounce
  useEffect(() => {
    if (formData.description.length > 20) {
      if (analysisTimerRef.current) window.clearTimeout(analysisTimerRef.current);
      
      setIsAiLoading(true);
      analysisTimerRef.current = window.setTimeout(async () => {
        const result = await analyzeIncident(formData.description);
        if (result) {
          setAiAnalysis(result);
        }
        setIsAiLoading(false);
      }, 1500);
    } else {
      setAiAnalysis(null);
    }
  }, [formData.description]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const initials = formData.patientName ? formData.patientName.split(' ').map(n => n[0]).join('') : 'XX';
    
    const newReport: PatientReport = {
      id: Math.random().toString(36).substr(2, 9),
      patientInitials: initials,
      incidentDate: formData.incidentDate,
      behaviorType: 'Patient Safety Incident',
      severity: formData.severity,
      description: formData.description,
      doctorName: isAnonymous ? 'Anonymous Practitioner' : formData.doctorName,
      clinicId: formData.clinicId,
      aiSummary: aiAnalysis?.summary || 'Report synced to network for verification.'
    };
    
    onAddReport(newReport);
    setLoading(false);
    setShowSubmitForm(false);
    setAiAnalysis(null);
  };

  const handleShare = (report: PatientReport) => {
    setShareSuccess(report.id);
    setTimeout(() => setShareSuccess(null), 3000);
  };

  if (showSubmitForm) {
    return (
      <div className="flex flex-col bg-[#F4F7F9] -mt-8 -mx-4 sm:mx-0 sm:mt-0 pb-32">
        <div className="bg-white px-6 py-5 border-b border-slate-200 sticky top-0 z-40 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <button onClick={() => setShowSubmitForm(false)} className="p-1 hover:bg-slate-100 rounded-lg">
              <svg className="w-6 h-6 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" /></svg>
            </button>
            <h1 className="text-lg font-bold text-slate-800">Submit Report</h1>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="bg-[#EBF1FF] p-5 rounded-3xl border border-blue-100 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="text-[#0047FF]">
                 <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
              </div>
              <div>
                <p className="text-sm font-black text-[#001D66]">Submit Anonymously</p>
                <p className="text-[11px] text-[#003BCC] opacity-70">Your identity will be protected</p>
              </div>
            </div>
            <button type="button" onClick={() => setIsAnonymous(!isAnonymous)} className={`w-12 h-6 rounded-full transition-colors relative flex items-center ${isAnonymous ? 'bg-indigo-600' : 'bg-slate-300'}`}>
              <div className={`absolute w-5 h-5 bg-white rounded-full shadow-sm transition-transform ${isAnonymous ? 'translate-x-6' : 'translate-x-1'}`}></div>
            </button>
          </div>

          <div className="bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm space-y-5">
             <h3 className="text-md font-black text-slate-800">Patient Information</h3>
             <input required type="text" placeholder="Patient's full name" className="w-full bg-[#F8FAFC] border border-slate-200 rounded-xl px-4 py-3 text-sm font-bold text-slate-900" value={formData.patientName} onChange={e => setFormData({...formData, patientName: e.target.value})} />
             <input required type="number" placeholder="Enter age" className="w-full bg-[#F8FAFC] border border-slate-200 rounded-xl px-4 py-3 text-sm font-bold text-slate-900" value={formData.patientAge} onChange={e => setFormData({...formData, patientAge: e.target.value})} />
             <div className="grid grid-cols-2 gap-4">
                <select className="w-full bg-[#F8FAFC] border border-slate-200 rounded-xl px-4 py-3 text-sm font-bold text-slate-900" value={formData.state} onChange={e => setFormData({...formData, state: e.target.value})} required>
                  <option value="">Select state</option>
                  {states.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
                <input required type="text" placeholder="Enter city" className="w-full bg-[#F8FAFC] border border-slate-200 rounded-xl px-4 py-3 text-sm font-bold text-slate-900" value={formData.city} onChange={e => setFormData({...formData, city: e.target.value})} />
             </div>
          </div>

          <div className="bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm space-y-5">
             <div className="flex justify-between items-center">
                <h3 className="text-md font-black text-slate-800">Incident Details</h3>
                {isAiLoading && (
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 bg-indigo-500 rounded-full animate-pulse"></div>
                    <span className="text-[10px] font-black text-indigo-500 uppercase tracking-widest">AI Analyzing...</span>
                  </div>
                )}
             </div>
             
             <div className="grid grid-cols-2 gap-4">
               <input required type="date" className="w-full bg-[#F8FAFC] border border-slate-200 rounded-xl px-4 py-3 text-sm font-bold text-slate-900" value={formData.incidentDate} onChange={e => setFormData({...formData, incidentDate: e.target.value})} />
               <select className="w-full bg-[#F8FAFC] border border-slate-200 rounded-xl px-4 py-3 text-sm font-bold text-slate-900" value={formData.severity} onChange={e => setFormData({...formData, severity: e.target.value as ReportSeverity})} required>
                 {Object.values(ReportSeverity).map(s => <option key={s} value={s}>{s}</option>)}
               </select>
             </div>
             
             <textarea required rows={4} placeholder="Provide detailed description..." className="w-full bg-[#F8FAFC] border border-slate-200 rounded-xl px-4 py-4 text-sm font-bold text-slate-900 resize-none" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} />

             {/* AI Analyzer Card during submission */}
             {aiAnalysis && (
               <div className="mt-4 bg-indigo-50/50 rounded-2xl p-4 border border-indigo-100 animate-slideUp">
                 <div className="flex items-center gap-2 mb-3">
                   <svg className="w-4 h-4 text-indigo-600" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 100-2 1 1 0 000 2zm7-1a1 1 0 11-2 0 1 1 0 012 0zm-7.535 5.01c-.227-.583.141-1.21.766-1.21h5.538c.625 0 .993.627.766 1.21a4.502 4.502 0 01-8.535 0z" clipRule="evenodd" /></svg>
                   <span className="text-[10px] font-black text-indigo-600 uppercase tracking-widest">MedGuard AI Analysis</span>
                 </div>
                 <p className="text-xs font-black text-slate-800 mb-3 leading-relaxed">
                   {aiAnalysis.summary}
                 </p>
                 <div className="space-y-2">
                   {aiAnalysis.recommendations.map((rec, i) => (
                     <div key={i} className="flex gap-2 items-start">
                       <div className="h-4 w-4 bg-white rounded-full border border-indigo-200 flex items-center justify-center shrink-0 mt-0.5">
                          <span className="text-[8px] font-black text-indigo-600">{i+1}</span>
                       </div>
                       <p className="text-[11px] text-slate-600 font-bold">{rec}</p>
                     </div>
                   ))}
                 </div>
               </div>
             )}
          </div>

          <div className="bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm space-y-5">
             <h3 className="text-md font-black text-slate-800">Your Information</h3>
             <input required type="text" placeholder="Dr. Your Name" className="w-full bg-[#F8FAFC] border border-slate-200 rounded-xl px-4 py-3 text-sm font-bold text-slate-900" value={formData.doctorName} onChange={e => setFormData({...formData, doctorName: e.target.value})} />
             <input required type="text" placeholder="Hospital name" className="w-full bg-[#F8FAFC] border border-slate-200 rounded-xl px-4 py-3 text-sm font-bold text-slate-900" value={formData.clinicId} onChange={e => setFormData({...formData, clinicId: e.target.value})} />
             <input type="tel" placeholder="+91-XXXXXXXXXX" className="w-full bg-[#F8FAFC] border border-slate-200 rounded-xl px-4 py-3 text-sm font-bold text-slate-900" value={formData.contact} onChange={e => setFormData({...formData, contact: e.target.value})} />
          </div>

          <button type="submit" disabled={loading} className="w-full py-5 bg-[#FF0000] text-white rounded-2xl font-black text-sm uppercase tracking-wider shadow-xl flex items-center justify-center gap-3 active:scale-95 transition-all">
            {loading ? <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div> : "Submit Report"}
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="flex flex-col bg-[#F4F7F9] -mt-8 -mx-4 sm:mx-0 sm:mt-0 pb-32">
      <div className="bg-white px-6 py-5 border-b border-slate-200 sticky top-0 z-40 flex justify-between items-center">
        <h1 className="text-lg font-black text-slate-800">Safety Network Logs</h1>
        <button onClick={() => setShowSubmitForm(true)} className="bg-[#0047FF] text-white px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest shadow-lg active:scale-95 transition-all">New Report</button>
      </div>

      <div className="p-4 space-y-4">
        {reports.map((report) => (
          <div key={report.id} className="bg-white rounded-[24px] overflow-hidden shadow-sm border border-slate-100 transition-all flex flex-col p-4 relative group animate-fadeIn">
            <div className={`absolute top-0 left-0 bottom-0 w-1.5 ${
              report.severity === ReportSeverity.CRITICAL ? 'bg-rose-500' :
              report.severity === ReportSeverity.HIGH ? 'bg-orange-500' : 'bg-indigo-500'
            }`}></div>
            
            <div className="flex justify-between items-start mb-3">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-700 font-black text-xs">
                  {report.patientInitials}
                </div>
                <div>
                  <h3 className="text-sm font-black text-slate-800 tracking-tight">{report.behaviorType}</h3>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{report.incidentDate}</p>
                </div>
              </div>
              <div className="px-2 py-1 rounded-lg text-[9px] font-black uppercase bg-slate-50 text-slate-500">
                {report.severity}
              </div>
            </div>

            <div className="bg-slate-50 rounded-xl p-3 border border-slate-100 mb-4">
              <p className="text-xs text-slate-700 font-bold italic line-clamp-2">
                {report.aiSummary || "Awaiting network synchronization..."}
              </p>
            </div>

            <div className={`transition-all overflow-hidden ${expandedReportId === report.id ? 'max-h-[1000px] pb-4' : 'max-h-0'}`}>
              <div className="border-t border-slate-100 pt-4 space-y-4">
                {/* AI Summary Section within details */}
                <div className="bg-indigo-600 rounded-2xl p-4 shadow-lg text-white">
                  <div className="flex items-center gap-2 mb-2">
                    <svg className="w-4 h-4 text-indigo-200" fill="currentColor" viewBox="0 0 20 20"><path d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 5.757a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM5.05 6.464A1 1 0 106.464 5.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zM5 10a1 1 0 01-1 1H3a1 1 0 110-2h1a1 1 0 011 1zM8 16v-1a1 1 0 112 0v1a1 1 0 11-2 0zM13.586 15.586a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414l.707.707zM16 18a1 1 0 100-2 1 1 0 000 2z" /></svg>
                    <span className="text-[9px] font-black uppercase tracking-widest">AI Safety Assessment</span>
                  </div>
                  <p className="text-xs font-bold leading-relaxed">
                    {report.aiSummary || "The MedGuard AI network is analyzing this incident for cross-clinic behavioral patterns."}
                  </p>
                </div>

                <div className="space-y-1">
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Incident Narrative</span>
                  <p className="text-sm text-slate-600 font-medium leading-relaxed px-1">
                    {report.description}
                  </p>
                </div>
                
                <div className="px-2 py-2 bg-slate-50 rounded-xl flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-emerald-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                    <p className="text-[10px] font-black text-slate-600 uppercase tracking-tight">Verified by {report.doctorName}</p>
                  </div>
                  <span className="text-[9px] font-bold text-slate-400">Ref: {report.id}</span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center justify-between mt-2 pt-3 border-t border-slate-50">
               <button 
                 onClick={() => setExpandedReportId(expandedReportId === report.id ? null : report.id)}
                 className="text-[10px] font-black text-slate-400 uppercase tracking-widest hover:text-indigo-600 transition-colors"
               >
                 {expandedReportId === report.id ? 'Collapse View' : 'See Analysis & Details'}
               </button>
               
               <div className="relative">
                {shareSuccess === report.id && (
                  <div className="absolute bottom-full mb-2 right-0 bg-emerald-600 text-white text-[9px] font-black py-1 px-3 rounded-full shadow-lg whitespace-nowrap animate-slideUp">
                    Broadcasting to Network...
                  </div>
                )}
                <button 
                  onClick={() => handleShare(report)}
                  className="flex items-center gap-2 bg-indigo-50 text-[#0047FF] px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-wider hover:bg-[#0047FF] hover:text-white transition-all active:scale-95 shadow-sm"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" /></svg>
                  Share
                </button>
               </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReportList;
