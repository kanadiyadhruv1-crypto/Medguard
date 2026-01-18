
import React, { useState } from 'react';
import { User } from '../types';

interface ProfileProps {
  user: User;
  reportCount: number;
}

const Profile: React.FC<ProfileProps> = ({ user, reportCount }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [profilePhoto, setProfilePhoto] = useState<string>("https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=200&h=200");

  const handlePhotoChange = () => {
    // Simulating a photo picker
    const newPhoto = prompt("Enter a new photo URL (or leave blank for default):");
    if (newPhoto) setProfilePhoto(newPhoto);
  };

  return (
    <div className="max-w-2xl mx-auto pb-24 animate-fadeIn">
      {/* Profile Header Card */}
      <div className="bg-white rounded-[32px] shadow-sm border border-slate-100 overflow-hidden mb-6">
        <div className="h-32 bg-gradient-to-r from-indigo-600 to-indigo-800 relative">
          <div className="absolute -bottom-12 left-8">
            <div className="relative group">
              <img 
                src={profilePhoto} 
                alt="Profile" 
                className="h-24 w-24 rounded-3xl border-4 border-white object-cover shadow-xl"
              />
              <button 
                onClick={handlePhotoChange}
                className="absolute inset-0 bg-black/40 rounded-3xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
              </button>
            </div>
          </div>
        </div>
        
        <div className="pt-16 px-8 pb-8">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-2xl font-black text-slate-900 tracking-tight">{user.name}</h1>
              <p className="text-sm font-bold text-indigo-600">{user.role}</p>
            </div>
            <div className="flex items-center gap-1.5 bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-100">
              <svg className="w-4 h-4 text-emerald-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
              <span className="text-[10px] font-black text-emerald-600 uppercase tracking-widest">Verified Practitioner</span>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-white p-6 rounded-[28px] border border-slate-100 shadow-sm text-center">
          <p className="text-2xl font-black text-slate-900">{reportCount}</p>
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Safety Contributions</p>
        </div>
        <div className="bg-white p-6 rounded-[28px] border border-slate-100 shadow-sm text-center">
          <p className="text-2xl font-black text-slate-900">98%</p>
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Trust Score</p>
        </div>
      </div>

      {/* Vetted Credentials Section */}
      <div className="bg-white rounded-[32px] shadow-sm border border-slate-100 p-8 space-y-6">
        <div className="flex justify-between items-center">
          <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest">Professional Identity</h3>
          <button onClick={() => setIsEditing(!isEditing)} className="text-xs font-black text-indigo-600 hover:text-indigo-800">
            {isEditing ? 'Save Changes' : 'Update Details'}
          </button>
        </div>

        <div className="space-y-4">
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Medical License ID</p>
            <p className="text-sm font-bold text-slate-700">{user.medicalId}</p>
          </div>
          
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Clinic Affiliation</p>
            <p className="text-sm font-bold text-slate-700">Downtown Medical Center (DMC-09)</p>
          </div>

          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Contact for Verified Alerts</p>
            <p className="text-sm font-bold text-slate-700">john.doe@hospital.edu</p>
          </div>
        </div>

        <div className="pt-4 border-t border-slate-100">
          <div className="flex items-center gap-3 text-slate-400">
             <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
             <p className="text-xs font-medium">Your credentials are encrypted and stored in compliance with Federal Safety Protocols.</p>
          </div>
        </div>
      </div>

      <button className="w-full mt-6 py-4 bg-rose-50 text-rose-600 rounded-2xl font-black text-xs uppercase tracking-widest border border-rose-100 active:bg-rose-100 transition-colors">
        Report Identity Discrepancy
      </button>
    </div>
  );
};

export default Profile;
