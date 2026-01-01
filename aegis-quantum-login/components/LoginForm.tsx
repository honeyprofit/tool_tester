
import React, { useState } from 'react';
import { AuthState } from '../types';

interface LoginFormProps {
  onLogin: (username: string) => void;
  isLoading: boolean;
}

const LoginForm: React.FC<LoginFormProps> = ({ onLogin, isLoading }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username && password) {
      onLogin(username);
    }
  };

  return (
    <div className="w-full max-w-md p-8 glass-panel rounded-2xl shadow-2xl relative overflow-hidden group">
      {/* Decorative accent */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-500 to-transparent"></div>
      
      <div className="text-center mb-8">
        <h1 className="text-3xl font-orbitron font-bold text-white tracking-tighter mb-2">
          AEGIS <span className="text-cyan-400">CORE</span>
        </h1>
        <p className="text-slate-400 text-xs uppercase tracking-widest font-medium">
          Secure Identity Node Protocol v4.2
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-cyan-400/80 text-[10px] uppercase font-bold mb-2 tracking-widest ml-1">
            Operator Alias
          </label>
          <div className="relative">
            <input
              type="text"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full bg-slate-900/50 border border-slate-700/50 text-white px-4 py-3 rounded-lg focus:outline-none focus:border-cyan-500 transition-all duration-300 placeholder-slate-600 font-mono text-sm"
              placeholder="e.g. NEUROMANCER_7"
            />
            <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none opacity-50">
              <svg className="w-4 h-4 text-cyan-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
          </div>
        </div>

        <div>
          <label className="block text-cyan-400/80 text-[10px] uppercase font-bold mb-2 tracking-widest ml-1">
            Quantum Key
          </label>
          <div className="relative">
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-slate-900/50 border border-slate-700/50 text-white px-4 py-3 rounded-lg focus:outline-none focus:border-cyan-500 transition-all duration-300 placeholder-slate-600 font-mono text-sm"
              placeholder="••••••••••••"
            />
            <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none opacity-50">
              <svg className="w-4 h-4 text-cyan-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
          </div>
        </div>

        <button
          disabled={isLoading}
          className="w-full relative group overflow-hidden bg-cyan-600 hover:bg-cyan-500 text-white font-orbitron font-bold py-4 rounded-lg transition-all duration-500 disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_20px_rgba(8,145,178,0.3)]"
        >
          <span className="relative z-10 flex items-center justify-center gap-2">
            {isLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                SYNCING...
              </>
            ) : (
              'ESTABLISH UPLINK'
            )}
          </span>
          {/* Button Shine */}
          <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
        </button>

        <div className="flex justify-between items-center text-[10px] text-slate-500 font-bold uppercase tracking-widest">
          <a href="#" className="hover:text-cyan-400 transition-colors">Recover Key</a>
          <a href="#" className="hover:text-cyan-400 transition-colors">New Operator</a>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
