
import React, { useState } from 'react';
import { User } from '../types';

interface LoginPageProps {
  onLogin: (user: User) => void;
  onNavigateSignup: () => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin, onNavigateSignup }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [medicalId, setMedicalId] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      onLogin({
        name: 'Dr. John Doe',
        role: 'Attending Physician',
        medicalId: medicalId || 'MD-8872-XP',
        isAuthenticated: true
      });
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-indigo-50 p-6">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-2xl overflow-hidden">
        <div className="bg-indigo-700 p-8 text-white text-center relative overflow-hidden">
          <div className="relative z-10">
            <div className="inline-block bg-white p-3 rounded-2xl mb-4">
               <svg className="w-10 h-10 text-indigo-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
               </svg>
            </div>
            <h1 className="text-3xl font-bold">MedGuard</h1>
            <p className="text-indigo-100 mt-2">Verified Doctor Safety Network</p>
          </div>
          {/* Decorative design */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-600 rounded-full -mr-16 -mt-16 opacity-50"></div>
        </div>
        
        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Medical License ID</label>
            <input 
              required
              type="text" 
              value={medicalId}
              onChange={(e) => setMedicalId(e.target.value)}
              placeholder="e.g. MD-12345"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 transition-all outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Secure Password</label>
            <input 
              required
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 transition-all outline-none"
            />
          </div>
          
          <button 
            type="submit" 
            disabled={loading}
            className={`w-full py-4 rounded-xl font-bold text-white transition-all shadow-lg ${loading ? 'bg-indigo-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700 hover:shadow-indigo-200'}`}
          >
            {loading ? 'Verifying Credentials...' : 'Secure Access'}
          </button>
          
          <div className="flex flex-col space-y-3 items-center">
            <button 
              type="button" 
              onClick={onNavigateSignup}
              className="text-sm font-bold text-indigo-600 hover:text-indigo-800 transition-colors"
            >
              New practitioner? Register here
            </button>
            <a href="#" className="text-xs text-gray-400 hover:underline">Forgot password?</a>
          </div>
        </form>
        
        <div className="bg-gray-50 p-4 text-center border-t">
          <p className="text-[10px] text-gray-400 px-8 uppercase tracking-widest font-bold">
            Federal Safety Verification Protocol Active
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
