/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from "react";
import { Snowflake, Sparkles, RefreshCw, Layers, ArrowUp, Calendar, Zap } from "lucide-react";
import SnowflakeEffect from "./components/SnowflakeEffect";
import BalloonEffect from "./components/BalloonEffect";

export default function App() {
  const [snowTimer, setSnowTimer] = useState<number>(0);
  const [balloonTimer, setBalloonTimer] = useState<number>(0);

  // Precision countdown timer running at 100ms interval (10Hz)
  useEffect(() => {
    const interval = setInterval(() => {
      setSnowTimer((prev) => {
        if (prev <= 0) return 0;
        const next = Number((prev - 0.1).toFixed(1));
        return next <= 0 ? 0 : next;
      });

      setBalloonTimer((prev) => {
        if (prev <= 0) return 0;
        const next = Number((prev - 0.1).toFixed(1));
        return next <= 0 ? 0 : next;
      });
    }, 100);

    return () => clearInterval(interval);
  }, []);

  const triggerSnowflakes = () => {
    setSnowTimer(5.0);
  };

  const triggerBalloons = () => {
    setBalloonTimer(5.0);
  };

  const triggerBoth = () => {
    setSnowTimer(5.0);
    setBalloonTimer(5.0);
  };

  const hasAnyActive = snowTimer > 0 || balloonTimer > 0;

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans overflow-x-hidden justify-between">
      
      {/* Top Navigation Bar from Professional Polish Theme */}
      <nav className="bg-white border-b border-slate-200 px-6 md:px-8 h-16 flex items-center justify-between shadow-sm z-10 sticky top-0">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-slate-800 rounded flex items-center justify-center">
            <div className="w-4 h-4 border-2 border-white rotate-45"></div>
          </div>
          <span className="font-semibold text-slate-800 text-lg tracking-tight">AERO|DYNAMICS™</span>
        </div>
        <div className="flex items-center gap-6">
          <div className="hidden md:flex gap-4 text-[10px] font-medium text-slate-400 uppercase tracking-widest font-mono">
            <span>Status: Optimal</span>
            <span>Uptime: 99.9%</span>
          </div>
          <div className="hidden md:block h-8 w-px bg-slate-200"></div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider">
              {hasAnyActive ? "EXECUTE ACTIVE" : "SYS STANDBY"}
            </span>
            <div className={`w-2.5 h-2.5 rounded-full ${hasAnyActive ? "bg-indigo-500 animate-pulse" : "bg-emerald-500"}`} />
          </div>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="flex-1 p-6 md:p-12 lg:p-16 flex flex-col items-center justify-center relative max-w-5xl mx-auto w-full">
        
        {/* Background Decorative Elements (Static hints of UI) */}
        <div className="absolute top-10 left-10 md:top-20 md:left-20 opacity-[0.03] select-none pointer-events-none text-slate-800">
          <svg width="140" height="140" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
            <path d="M12 2v20M17 5l-10 14M22 12H2M17 19L7 5"/>
          </svg>
        </div>
        <div className="absolute bottom-10 right-10 md:bottom-20 md:right-20 opacity-[0.03] select-none pointer-events-none text-slate-800">
          <svg width="140" height="140" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
            <circle cx="12" cy="10" r="8"/>
            <path d="M12 18v4"/>
          </svg>
        </div>

        {/* Central Editorial Header from Theme */}
        <div className="text-center mb-10 md:mb-14 space-y-3">
          <h1 className="text-2xl md:text-3.5xl font-light text-slate-900 tracking-tight">
            Simulation Control Interface
          </h1>
          <p className="text-slate-500 text-sm md:text-base max-w-lg mx-auto">
            Select an atmospheric sequence to initialize. Each protocol executes a 5.0 second simulation cycle across the primary viewport.
          </p>
        </div>

        {/* Control Cards Grid */}
        <div className="grid md:grid-cols-2 gap-8 w-full max-w-3xl">
          
          {/* Card 1: Atmospheric Descent (Snowflakes) */}
          <div className="bg-white border border-slate-200 rounded-xl p-8 shadow-md hover:shadow-lg transition-all duration-300 flex flex-col justify-between relative group">
            {/* Visual indicator bar at the top */}
            <div className={`absolute top-0 left-0 right-0 h-1 rounded-t-xl transition-all ${snowTimer > 0 ? "bg-sky-500" : "bg-transparent group-hover:bg-slate-200"}`} />
            
            <div className="flex flex-col items-center flex-grow">
              <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mb-6 shadow-sm">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M2 12h20M12 2v20M17 5l-10 14M22 12H2M17 19L7 5"/>
                </svg>
              </div>
              <h2 className="text-xl font-semibold text-slate-800 mb-2">Atmospheric Descent</h2>
              <p className="text-xs text-slate-400 text-center mb-6 px-4 leading-relaxed">
                Initiates a medium-density crystalline precipitation sequence from the upper strata.
              </p>

              {/* Progress and status */}
              <div className="w-full h-8 flex items-center justify-center mb-8">
                {snowTimer > 0 ? (
                  <div className="w-full max-w-[200px] text-center space-y-1.5 animate-pulse">
                    <span className="text-[10px] uppercase tracking-wider font-semibold font-mono text-sky-600">
                      Precipitating: {snowTimer}s
                    </span>
                    <div className="w-full bg-slate-100 h-1 rounded-full overflow-hidden">
                      <div className="h-full bg-sky-500 rounded-full" style={{ width: `${(snowTimer / 5.0) * 100}%` }} />
                    </div>
                  </div>
                ) : (
                  <span className="text-[10px] uppercase tracking-wider text-slate-400 font-mono flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 bg-slate-300 rounded-full"></span>
                    Ready for deploy
                  </span>
                )}
              </div>
            </div>

            <button
              id="action-trigger-snowflakes"
              onClick={triggerSnowflakes}
              className="w-full py-3 bg-slate-800 text-white rounded-lg font-medium hover:bg-slate-700 active:scale-95 transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer"
            >
              <Snowflake className={`w-4 h-4 ${snowTimer > 0 ? "animate-spin" : ""}`} />
              <span>{snowTimer > 0 ? "Reset Snowflakes" : "Snowflakes"}</span>
            </button>
          </div>

          {/* Card 2: Thermal Ascent (Balloons) */}
          <div className="bg-white border border-slate-200 rounded-xl p-8 shadow-md hover:shadow-lg transition-all duration-300 flex flex-col justify-between relative group">
            {/* Visual indicator bar at the top */}
            <div className={`absolute top-0 left-0 right-0 h-1 rounded-t-xl transition-all ${balloonTimer > 0 ? "bg-orange-500" : "bg-transparent group-hover:bg-slate-200"}`} />
            
            <div className="flex flex-col items-center flex-grow">
              <div className="w-16 h-16 bg-orange-50 text-orange-600 rounded-full flex items-center justify-center mb-6 shadow-sm pointer-events-none">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="10" r="8"/>
                  <path d="M12 18v4"/>
                </svg>
              </div>
              <h2 className="text-xl font-semibold text-slate-800 mb-2">Thermal Ascent</h2>
              <p className="text-xs text-slate-400 text-center mb-6 px-4 leading-relaxed">
                Launches a medium-buoyancy pressurized containment sequence from the ground plane.
              </p>

              {/* Progress and status */}
              <div className="w-full h-8 flex items-center justify-center mb-8">
                {balloonTimer > 0 ? (
                  <div className="w-full max-w-[200px] text-center space-y-1.5 animate-pulse">
                    <span className="text-[10px] uppercase tracking-wider font-semibold font-mono text-orange-600">
                      Ascending: {balloonTimer}s
                    </span>
                    <div className="w-full bg-slate-100 h-1 rounded-full overflow-hidden">
                      <div className="h-full bg-orange-500 rounded-full" style={{ width: `${(balloonTimer / 5.0) * 100}%` }} />
                    </div>
                  </div>
                ) : (
                  <span className="text-[10px] uppercase tracking-wider text-slate-400 font-mono flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 bg-slate-300 rounded-full"></span>
                    Ready for deploy
                  </span>
                )}
              </div>
            </div>

            <button
              id="action-trigger-balloons"
              onClick={triggerBalloons}
              className="w-full py-3 bg-slate-800 text-white rounded-lg font-medium hover:bg-slate-700 active:scale-95 transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer"
            >
              <ArrowUp className={`w-4 h-4 ${balloonTimer > 0 ? "animate-bounce" : ""}`} />
              <span>{balloonTimer > 0 ? "Reset Balloons" : "Balloons"}</span>
            </button>
          </div>

        </div>

        {/* Dual Symphony Combined Option */}
        <div className="mt-8 w-full max-w-3xl bg-slate-100/50 border border-slate-200/40 rounded-lg p-3 px-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-slate-500" />
            <span className="text-xs font-semibold text-slate-600">Simultaneous Hybrid Trigger</span>
          </div>
          <button
            id="action-trigger-both"
            onClick={triggerBoth}
            className="text-[11px] font-mono tracking-wider font-semibold uppercase text-slate-700 hover:text-slate-900 bg-white border border-slate-200 px-3 py-1 rounded shadow-sm hover:shadow active:scale-98 transition-all shrink-0 cursor-pointer"
          >
            Deploy Dual Symphony →
          </button>
        </div>

        {/* System Logs Footer */}
        <div className="mt-14 w-full max-w-3xl border-t border-slate-200 pt-6 flex flex-col sm:flex-row justify-between items-center text-[10px] uppercase tracking-widest text-slate-400 gap-3">
          <div className="flex gap-4 font-mono">
            <span>LAT: 40.7128° N</span>
            <span>LON: 74.0060° W</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-ping"></div>
            <span>System State: Operational</span>
          </div>
          <div className="font-mono">Ref: SIM-2026-X9</div>
        </div>

      </main>

      {/* Dynamic Rain Overlays */}
      {snowTimer > 0 && <SnowflakeEffect />}
      {balloonTimer > 0 && <BalloonEffect />}

      {/* Bottom Branding Bar */}
      <footer className="bg-slate-900 min-h-12 md:h-10 flex flex-col sm:flex-row items-center px-6 md:px-8 justify-between py-3 sm:py-0 gap-2 z-10 font-mono text-[9px] md:text-[10px]">
        <span className="text-slate-500 text-center sm:text-left">
          © 2026 AERO DYNAMICS LABORATORY. ALL RIGHTS RESERVED.
        </span>
        <div className="flex gap-4">
          <span className="text-slate-500 hover:text-slate-300 cursor-pointer transition-colors">Privacy Policy</span>
          <span className="text-slate-500 hover:text-slate-300 cursor-pointer transition-colors">System Documentation</span>
        </div>
      </footer>

    </div>
  );
}
