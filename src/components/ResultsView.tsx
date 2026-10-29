import React from 'react';
import { RankingResult } from '../utils/rankingEngine';
import { RotateCcw, Database } from 'lucide-react';

interface ResultsViewProps {
  result: RankingResult;
  onRecalculate: () => void;
  onViewLedger: () => void;
}

export const ResultsView: React.FC<ResultsViewProps> = ({
  result,
  onRecalculate,
  onViewLedger
}) => {
  const { selectedIim, compositeScore, nationalRank, generationRank, totalInGeneration, percentile, metricBreakdown, growthHighlights, strategicAssessment, peerComparisons } = result;

  return (
    <section id="results-section" className="py-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto border-t border-slate-800">
      {/* Primary Institutional Ranking Dossier Header */}
      <div className="bg-slate-950 text-white rounded-sm p-7 sm:p-11 border border-slate-800 shadow-lg mb-12">
        <div className="flex flex-wrap items-center justify-between gap-3 text-xs uppercase tracking-wider text-slate-400 border-b border-slate-800 pb-5 mb-7">
          <span className="font-bold">National Benchmark Determination</span>
          <span className="font-mono bg-slate-900 px-3 py-1 rounded-sm text-slate-200 border border-slate-700 font-semibold">
            {selectedIim.generation} &bull; Est. {selectedIim.established}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-8">
            <h2 className="text-3xl sm:text-5xl font-extrabold font-times tracking-tight text-white leading-tight">
              {selectedIim.name}
            </h2>
            <p className="text-slate-300 text-base sm:text-lg mt-3.5 font-normal leading-relaxed">
              {selectedIim.coreStrength}
            </p>

            {/* Strategic Standing Badges */}
            <div className="flex flex-wrap items-center gap-2.5 mt-6 text-xs">
              <span className="px-3 py-1.5 bg-slate-900 border border-slate-700 text-slate-200 font-bold rounded-sm">
                National Percentile: Top {100 - percentile <= 5 ? '5%' : `${100 - percentile}%`}
              </span>
              <span className="px-3 py-1.5 bg-slate-900 border border-slate-700 text-slate-200 font-bold rounded-sm">
                Category Standing: #{generationRank} of {totalInGeneration} ({selectedIim.generation})
              </span>
            </div>
          </div>

          {/* Prominent Rank Number Block */}
          <div className="md:col-span-4 bg-slate-900 border border-slate-700 p-7 rounded-sm text-center shadow-inner">
            <div className="text-xs uppercase tracking-widest text-slate-400 font-bold">
              National IIM Rank
            </div>
            <div className="text-6xl sm:text-8xl font-black font-times text-white my-1">
              #{nationalRank}
            </div>
            <div className="text-xs text-slate-300 font-medium">
              out of 21 IIMs in India
            </div>
            <div className="mt-5 pt-3.5 border-t border-slate-800 text-xs flex justify-between text-slate-300">
              <span className="font-medium">Composite Score:</span>
              <span className="font-extrabold text-white text-sm">{compositeScore} / 100</span>
            </div>
          </div>
        </div>
      </div>

      {/* Strategic Analytical Synthesis */}
      <div className="mb-12 bg-slate-900 border border-slate-800 p-7 sm:p-9 rounded-sm">
        <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
          Executive Analytical Synthesis
        </div>
        <h3 className="text-2xl sm:text-3xl font-extrabold font-times text-white tracking-tight">
          How {selectedIim.name} Compares Across National Benchmarks
        </h3>
        <p className="text-slate-200 text-sm sm:text-base mt-4 leading-relaxed">
          {strategicAssessment}
        </p>
        <p className="text-slate-300 text-xs sm:text-sm mt-3 pt-3 border-t border-slate-800 leading-relaxed font-medium">
          {selectedIim.strategicInsight}
        </p>

        {/* Growth Highlights Bullet Points */}
        <div className="mt-7 pt-6 border-t border-slate-800">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3.5">
            Longitudinal Growth Trajectory (2021 to 2026 Audit)
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {growthHighlights.map((hl, idx) => (
              <div key={idx} className="p-4 bg-slate-950 border border-slate-800 rounded-sm text-xs sm:text-sm text-slate-200 leading-relaxed">
                <span className="font-bold text-white block mb-1 text-xs">Observation {idx + 1}</span>
                {hl}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Detailed Metric-by-Metric Breakdown Cards */}
      <div className="mb-12">
        <div className="border-b border-slate-800 pb-4 mb-7 flex items-center justify-between">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Metric Assessment
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold font-times text-white tracking-tight">
              Individual Metric Standing & Comparative Benchmarks
            </h3>
          </div>
          <div className="text-xs text-slate-400 hidden sm:block font-medium">
            Based on FT & QS Criteria
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {metricBreakdown.map((m) => (
            <div
              key={m.questionId}
              className="bg-slate-900 border border-slate-800 p-6 rounded-sm hover:border-slate-700 transition-colors"
            >
              <div className="flex items-center justify-between text-xs text-slate-400 border-b border-slate-800 pb-2.5 mb-3.5">
                <span className="font-bold uppercase tracking-wide text-slate-300">
                  {m.category}
                </span>
                <span className="font-mono font-bold text-white bg-slate-950 px-2.5 py-1 rounded-sm border border-slate-800">
                  Metric Rank: #{m.metricRank} of 21
                </span>
              </div>

              <h4 className="text-base sm:text-lg font-bold font-times text-white tracking-tight">
                {m.metricTitle}
              </h4>

              <div className="mt-4 grid grid-cols-3 gap-2 text-center py-2.5 bg-slate-950 border border-slate-800 rounded-sm">
                <div className="border-r border-slate-800 px-2">
                  <div className="text-[10px] uppercase text-slate-400 font-bold">Your Score</div>
                  <div className="text-lg font-extrabold text-white mt-0.5">{m.userRating} / 10</div>
                </div>
                <div className="border-r border-slate-800 px-2">
                  <div className="text-[10px] uppercase text-slate-400 font-bold">2026 Audit</div>
                  <div className="text-sm font-bold text-slate-200 mt-1 truncate">{m.actual2026Value}</div>
                </div>
                <div className="px-2">
                  <div className="text-[10px] uppercase text-slate-400 font-bold">National Med.</div>
                  <div className="text-sm font-bold text-slate-300 mt-1 truncate">{m.nationalMedianValue}</div>
                </div>
              </div>

              <div className="mt-3.5 flex items-center justify-between text-xs pt-2.5 border-t border-slate-800 text-slate-300 font-medium">
                <span className="font-bold text-white">{m.standing}</span>
                <span className="text-slate-400">{m.growthSummary}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Peer Group Competitive Landscape */}
      <div className="mb-12 bg-slate-900 border border-slate-800 p-7 rounded-sm">
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-5">
          Competitive Positioning in National Ecosystem
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 bg-slate-950 border border-slate-800 rounded-sm">
            <span className="text-xs uppercase font-bold text-slate-400 block">Institutions Ranked Higher</span>
            <div className="mt-2.5 space-y-1.5">
              {peerComparisons.higherPeers.length > 0 ? (
                peerComparisons.higherPeers.map(p => (
                  <div key={p.id} className="text-sm font-semibold text-white">
                    &bull; {p.name} (#{p.nationalBaselineRank})
                  </div>
                ))
              ) : (
                <div className="text-xs text-slate-400 italic">None (Apex Institution)</div>
              )}
            </div>
          </div>

          <div className="p-4 bg-slate-950 border border-slate-800 rounded-sm">
            <span className="text-xs uppercase font-bold text-slate-400 block">Close Peers & Direct Rivals</span>
            <div className="mt-2.5 space-y-1.5">
              {peerComparisons.closeCompetitors.length > 0 ? (
                peerComparisons.closeCompetitors.map(p => (
                  <div key={p.id} className="text-sm font-semibold text-white">
                    &bull; {p.name} (#{p.nationalBaselineRank})
                  </div>
                ))
              ) : (
                <div className="text-xs text-slate-400 italic">No peers in immediate range</div>
              )}
            </div>
          </div>

          <div className="p-4 bg-slate-950 border border-slate-800 rounded-sm">
            <span className="text-xs uppercase font-bold text-slate-400 block">Rising Growth Challengers</span>
            <div className="mt-2.5 space-y-1.5">
              {peerComparisons.growthChallengers.length > 0 ? (
                peerComparisons.growthChallengers.map(p => (
                  <div key={p.id} className="text-sm font-semibold text-white">
                    &bull; {p.name} (#{p.nationalBaselineRank})
                  </div>
                ))
              ) : (
                <div className="text-xs text-slate-400 italic">No challengers below</div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Action Strip */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-6 bg-slate-900 border border-slate-700 rounded-sm">
        <div>
          <div className="text-sm font-bold text-white">Explore Further Insights</div>
          <div className="text-xs text-slate-300 mt-0.5">Inspect how other IIMs grew across the 2021-2026 longitudinal dataset.</div>
        </div>
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <button
            onClick={onRecalculate}
            className="flex-1 sm:flex-none px-4 py-2.5 bg-slate-950 hover:bg-slate-800 text-white text-xs sm:text-sm font-bold border border-slate-700 rounded-sm transition-colors cursor-pointer flex items-center justify-center gap-1.5"
          >
            <RotateCcw className="w-3.5 h-3.5 text-slate-300" />
            <span>Adjust Scores</span>
          </button>
          <button
            onClick={onViewLedger}
            className="flex-1 sm:flex-none px-5 py-2.5 bg-white hover:bg-slate-100 text-slate-950 text-xs sm:text-sm font-bold rounded-sm transition-colors cursor-pointer flex items-center justify-center gap-1.5 border border-white"
          >
            <Database className="w-3.5 h-3.5 text-slate-950" />
            <span>View 2021-2026 Growth Ledger</span>
          </button>
        </div>
      </div>
    </section>
  );
};
