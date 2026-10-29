import React from 'react';
import { ArrowRight, BookOpen } from 'lucide-react';

interface HeroProps {
  onStartAssessment: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onStartAssessment }) => {
  return (
    <section className="pt-20 pb-24 px-4 sm:px-6 lg:px-8 border-b border-slate-800 bg-[#0c0f14]">
      <div className="max-w-4xl mx-auto text-center">
        {/* Subtle academic label */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-slate-900 border border-slate-700 text-slate-300 text-xs tracking-wider uppercase font-bold rounded-sm mb-8 shadow-sm">
          <BookOpen className="w-3.5 h-3.5 text-slate-400" />
          <span>Longitudinal Study: 2021 to 2026 Audit</span>
        </div>

        {/* The cool, bold Times New Roman heading required by the user */}
        <h1 
          className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-white tracking-tight leading-[1.04] mb-8 font-times"
          style={{
            fontFamily: '"Times New Roman", Times, "Baskerville", Georgia, serif',
            fontWeight: 900
          }}
        >
          Where does your IIM rank among IIM's
        </h1>

        {/* High-legibility subtitle without em dashes */}
        <p className="text-base sm:text-lg md:text-xl text-slate-300 font-normal max-w-2xl mx-auto mb-11 leading-relaxed">
          An empirical institutional ranking platform evaluating India's 21 management institutes across audited compensation trajectories, tuition ROI payback velocity, terminal doctoral faculty density, scholarly research, and cohort demographic parity.
        </p>

        {/* The exact button required underneath */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={onStartAssessment}
            className="w-full sm:w-auto px-9 py-4 bg-white hover:bg-slate-100 text-slate-950 font-bold text-base rounded-sm shadow-md transition-all duration-150 flex items-center justify-center gap-2.5 group cursor-pointer border border-white"
          >
            <span>Answer a few questions and find out</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform text-slate-950" />
          </button>
        </div>

        {/* Academic context summary strip without bento boxes and without gradients */}
        <div className="mt-16 pt-10 border-t border-slate-800 grid grid-cols-2 sm:grid-cols-4 gap-4 text-left">
          <div className="p-4 bg-slate-900/90 border border-slate-800 rounded-sm">
            <div className="text-[11px] uppercase text-slate-400 font-bold tracking-wider">Coverage</div>
            <div className="text-base font-bold text-white mt-1">All 21 IIMs</div>
            <div className="text-xs text-slate-400 mt-1">Heritage, New, and Baby cohorts</div>
          </div>
          <div className="p-4 bg-slate-900/90 border border-slate-800 rounded-sm">
            <div className="text-[11px] uppercase text-slate-400 font-bold tracking-wider">Audit Window</div>
            <div className="text-base font-bold text-white mt-1">2021 to 2026</div>
            <div className="text-xs text-slate-400 mt-1">6-year longitudinal verified data</div>
          </div>
          <div className="p-4 bg-slate-900/90 border border-slate-800 rounded-sm">
            <div className="text-[11px] uppercase text-slate-400 font-bold tracking-wider">Core Dimensions</div>
            <div className="text-base font-bold text-white mt-1">5 Key Metrics</div>
            <div className="text-xs text-slate-400 mt-1">FT & QS accredited standards</div>
          </div>
          <div className="p-4 bg-slate-900/90 border border-slate-800 rounded-sm">
            <div className="text-[11px] uppercase text-slate-400 font-bold tracking-wider">Methodology</div>
            <div className="text-base font-bold text-white mt-1">Weighted Model</div>
            <div className="text-xs text-slate-400 mt-1">Audited NIRF & IPRS baselines</div>
          </div>
        </div>
      </div>
    </section>
  );
};
