
import React, { useState, useEffect, useCallback } from 'react';
import LoginForm from './components/LoginForm';
import FuturisticBackground from './components/FuturisticBackground';
import ScannerOverlay from './components/ScannerOverlay';
import { AuthState, UserSession, SecurityReport } from './types';
import { getSecurityAssessment, getWelcomeMessage } from './services/geminiService';

const App: React.FC = () => {
  const [authState, setAuthState] = useState<AuthState>(AuthState.IDLE);
  const [session, setSession] = useState<UserSession | null>(null);
  const [report, setReport] = useState<SecurityReport | null>(null);
  const [welcomeMsg, setWelcomeMsg] = useState('');

  const handleLogin = async (username: string) => {
    setAuthState(AuthState.SCANNING);
    
    // Simulate biometric scanning delay
    setTimeout(async () => {
      setAuthState(AuthState.VERIFYING);
      
      try {
        // Fetch AI security report and welcome message in parallel
        const [securityData, msg] = await Promise.all([
          getSecurityAssessment(username),
          getWelcomeMessage(username)
        ]);

        setReport(securityData);
        setWelcomeMsg(msg);
        
        // Final verification delay
        setTimeout(() => {
          setSession({
            username,
            accessLevel: securityData.threatLevel === 'LOW' ? 'OMEGA' : 'ALPHA-RESTRICTED',
            signature: Math.random().toString(36).substring(7).toUpperCase()
          });
          setAuthState(AuthState.SUCCESS);
        }, 1500);
      } catch (err) {
        setAuthState(AuthState.ERROR);
        setTimeout(() => setAuthState(AuthState.IDLE), 3000);
      }
    }, 2500);
  };

  const logout = () => {
    setAuthState(AuthState.IDLE);
    setSession(null);
    setReport(null);
    setWelcomeMsg('');
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 relative text-slate-200 selection:bg-cyan-500 selection:text-white">
      <FuturisticBackground />
      <ScannerOverlay isActive={authState === AuthState.SCANNING} />

      {authState === AuthState.SUCCESS && session ? (
        <div className="w-full max-w-2xl animate-in fade-in zoom-in duration-700">
          <div className="glass-panel p-8 rounded-2xl relative border-cyan-500/30">
            <div className="absolute top-4 right-4 text-[10px] text-cyan-400/50 font-mono">
              STATION_ID: NODE-0492 // SEC_PROTO: ACTIVE
            </div>
            
            <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
              {/* User Avatar Simulation */}
              <div className="relative">
                <div className="w-24 h-24 rounded-full border-2 border-cyan-500/50 flex items-center justify-center bg-slate-900 relative overflow-hidden group">
                  <img 
                    src={`https://picsum.photos/seed/${session.username}/200`} 
                    alt="avatar" 
                    className="w-full h-full object-cover grayscale brightness-75 group-hover:grayscale-0 transition-all duration-500"
                  />
                  <div className="absolute inset-0 border-4 border-cyan-400/20 rounded-full animate-ping pointer-events-none"></div>
                </div>
                <div className="absolute -bottom-1 -right-1 bg-cyan-500 w-4 h-4 rounded-full border-2 border-slate-950 animate-pulse"></div>
              </div>

              <div className="flex-1 space-y-4 text-center md:text-left">
                <div>
                  <h2 className="text-2xl font-orbitron font-bold text-white mb-1">
                    ACCESS GRANTED
                  </h2>
                  <p className="text-cyan-400 font-mono text-sm">
                    {welcomeMsg}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4 mt-6">
                  <div className="bg-slate-900/40 p-3 rounded border border-slate-800">
                    <div className="text-[9px] text-slate-500 uppercase tracking-widest font-bold">Access Level</div>
                    <div className="text-sm font-orbitron text-cyan-300">{session.accessLevel}</div>
                  </div>
                  <div className="bg-slate-900/40 p-3 rounded border border-slate-800">
                    <div className="text-[9px] text-slate-500 uppercase tracking-widest font-bold">Signal Hash</div>
                    <div className="text-sm font-mono text-cyan-300">#{session.signature}</div>
                  </div>
                </div>

                {report && (
                  <div className="bg-cyan-500/5 border border-cyan-500/20 p-4 rounded-lg mt-4">
                    <h3 className="text-[10px] font-orbitron text-cyan-500 mb-2 uppercase tracking-widest">
                      Security Analysis Report
                    </h3>
                    <p className="text-xs text-slate-400 italic mb-2">
                      &quot;{report.aiComment}&quot;
                    </p>
                    <div className="flex gap-4 text-[10px]">
                      <span className="flex items-center gap-1">
                        <span className="w-2 h-2 rounded-full bg-green-500"></span> 
                        ENC: {report.encryptionStatus}
                      </span>
                      <span className="flex items-center gap-1">
                        <span className={`w-2 h-2 rounded-full ${report.threatLevel === 'LOW' ? 'bg-green-500' : 'bg-red-500'}`}></span>
                        THREAT: {report.threatLevel}
                      </span>
                    </div>
                  </div>
                )}

                <button 
                  onClick={logout}
                  className="mt-4 px-6 py-2 border border-slate-700 hover:border-red-500 hover:text-red-400 rounded text-xs uppercase tracking-widest font-bold transition-all"
                >
                  Terminate Connection
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <LoginForm 
          onLogin={handleLogin} 
          isLoading={authState === AuthState.SCANNING || authState === AuthState.VERIFYING} 
        />
      )}

      {/* Error state Toast */}
      {authState === AuthState.ERROR && (
        <div className="fixed top-8 right-8 bg-red-500/20 border border-red-500 text-red-200 px-6 py-3 rounded-lg backdrop-blur-md animate-bounce">
          <div className="font-bold text-sm">SECURITY BREACH DETECTED</div>
          <div className="text-xs opacity-80">Invalid credentials. Node lockdown engaged.</div>
        </div>
      )}

      {/* Floating Status Bar */}
      <div className="fixed bottom-4 left-4 flex gap-4 text-[10px] font-mono text-slate-600">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse"></span>
          NETWORK: STABLE
        </div>
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-slate-700"></span>
          NODE: 0x4F2A
        </div>
      </div>
    </div>
  );
};

export default App;
