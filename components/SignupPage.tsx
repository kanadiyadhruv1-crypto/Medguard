
import React, { useState } from 'react';
import { User } from '../types';

interface SignupPageProps {
  onSignup: (user: User) => void;
  onNavigateLogin: () => void;
}

const SignupPage: React.FC<SignupPageProps> = ({ onSignup, onNavigateLogin }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    medicalId: '',
    specialty: 'General Practice',
    password: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);

  const specialties = [
    'General Practice',
    'Emergency Medicine',
    'Psychiatry',
    'Surgery',
    'Pediatrics',
    'Nursing',
    'Administration',
    'Other'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate complex verification API call
    setTimeout(() => {
      onSignup({
        name: `Dr. ${formData.firstName} ${formData.lastName}`,
        role: formData.specialty,
        medicalId: formData.medicalId,
        isAuthenticated: true
      });
      setLoading(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-indigo-50 p-6">
      <div className="max-w-4xl w-full bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row">
        {/* Left Side: Branding & Info */}
        <div className="md:w-1/3 bg-indigo-700 p-10 text-white flex flex-col justify-between relative overflow-hidden">
          <div className="relative z-10">
            <div className="inline-block bg-white p-2 rounded-xl mb-6">
              <svg className="w-8 h-8 text-indigo-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h2 className="text-3xl font-bold leading-tight">Join the Shield.</h2>
            <p className="text-indigo-100 mt-4 text-sm leading-relaxed">
              Become part of a vetted network of 4,000+ healthcare professionals committed to workplace safety.
            </p>
            
            <ul className="mt-8 space-y-4">
              {['Vetted Professionals Only', 'Encrypted Incident Logs', 'Real-time Safety Alerts'].map((text, i) => (
                <li key={i} className="flex items-center space-x-3 text-sm font-medium">
                  <svg className="w-5 h-5 text-indigo-300" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                  <span>{text}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="relative z-10 mt-12 pt-8 border-t border-indigo-600/50">
            <p className="text-xs text-indigo-200 uppercase tracking-widest font-bold">Identity Protection</p>
            <p className="text-[10px] text-indigo-300 mt-1">Your license data is verified against national registries and never shared with third parties.</p>
          </div>

          {/* Decorative Circles */}
          <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-indigo-600 rounded-full opacity-50"></div>
          <div className="absolute top-20 -right-20 w-60 h-60 bg-indigo-800 rounded-full opacity-30"></div>
        </div>

        {/* Right Side: Form */}
        <div className="md:w-2/3 p-10">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-2xl font-black text-gray-900">Create Account</h1>
            <button onClick={onNavigateLogin} className="text-sm font-bold text-indigo-600 hover:text-indigo-800 transition-colors">
              Already a member? Sign In
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">First Name</label>
                <input 
                  required
                  type="text" 
                  value={formData.firstName}
                  onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Last Name</label>
                <input 
                  required
                  type="text" 
                  value={formData.lastName}
                  onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Work Email</label>
                <input 
                  required
                  type="email" 
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Specialty</label>
                <select 
                  value={formData.specialty}
                  onChange={(e) => setFormData({...formData, specialty: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 outline-none transition-all appearance-none bg-no-repeat bg-[right_1rem_center]"
                  style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' fill=\'none\' viewBox=\'0 0 24 24\' stroke=\'currentColor\'%3E%3Cpath stroke-linecap=\'round\' stroke-linejoin=\'round\' stroke-width=\'2\' d=\'M19 9l-7 7-7-7\' /%3E%3C/svg%3E")' }}
                >
                  {specialties.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Medical License ID / NPI</label>
              <div className="relative">
                <input 
                  required
                  type="text" 
                  value={formData.medicalId}
                  onChange={(e) => setFormData({...formData, medicalId: e.target.value})}
                  placeholder="e.g. MD-12345678"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                />
                <span className="absolute right-4 inset-y-0 flex items-center">
                  <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Password</label>
                <input 
                  required
                  type="password" 
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Confirm</label>
                <input 
                  required
                  type="password" 
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                />
              </div>
            </div>

            <div className="pt-4">
              <button 
                type="submit" 
                disabled={loading}
                className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-black uppercase tracking-widest rounded-2xl shadow-xl transition-all hover:scale-[1.01] active:scale-95 disabled:opacity-50"
              >
                {loading ? 'Submitting Credentials...' : 'Create Secure Account'}
              </button>
            </div>

            <p className="text-[10px] text-gray-400 text-center px-4 leading-relaxed">
              By creating an account, you agree to our <a href="#" className="underline">Safety Reporting Standards</a> and <a href="#" className="underline">HIPAA Compliance Data Policy</a>.
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
