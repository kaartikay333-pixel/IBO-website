import React from 'react';
import { Database } from 'lucide-react';

interface HeaderProps {
  onScrollToQuestions?: () => void;
  onViewLedger?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onScrollToQuestions, onViewLedger }) => {
  return (
    <header className="border-b border-slate-800 bg-[#0c0f14]/95 sticky top-0 z-40 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        <div className="flex items-center space-x-3.5">
          <div className="w-10 h-10 bg-white text-slate-950 flex items-center justify-center rounded-sm font-serif font-black text-xl tracking-tighter border border-slate-300 shadow-sm">
            IIM
          </div>
          <div>
            <div className="text-[11px] uppercase tracking-widest text-slate-400 font-bold">
              National Benchmark Index
            </div>
            <div className="text-base font-serif font-black text-white tracking-tight leading-none mt-0.5">
              2021-2026 Institutional Audit Project
            </div>
          </div>
        </div>

        <nav className="flex items-center space-x-2 sm:space-x-3 text-xs sm:text-sm font-bold text-slate-200">
          <button
            onClick={onScrollToQuestions}
            className="px-3.5 py-2 text-slate-200 hover:text-white bg-slate-900 hover:bg-slate-850 transition-colors border border-slate-700 hover:border-slate-500 rounded-sm cursor-pointer font-bold tracking-tight"
          >
            Assessment
          </button>
          <button
            onClick={onViewLedger}
            className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-white border border-slate-600 rounded-sm transition-colors cursor-pointer flex items-center gap-1.5 font-bold tracking-tight"
          >
            <Database className="w-4 h-4 text-slate-300" />
            <span>Comparative Ledger</span>
          </button>
        </nav>
      </div>
    </header>
  );
};
