import React, { useState, useRef } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Questionnaire } from './components/Questionnaire';
import { ResultsView } from './components/ResultsView';
import { ComparativeLedger } from './components/ComparativeLedger';
import { calculateRanking, RankingResult } from './utils/rankingEngine';

export default function App() {
  const [selectedIimId, setSelectedIimId] = useState<string>('ahmedabad');
  
  // Track user ratings: questionId -> score 1..10 or null
  const [ratings, setRatings] = useState<Record<string, number | null>>({
    salary_compensation: null,
    roi_payback: null,
    faculty_doctorate: null,
    research_impact: null,
    diversity_parity: null,
    recruiter_depth: null
  });

  const [hasCalculated, setHasCalculated] = useState<boolean>(false);
  const [rankingResult, setRankingResult] = useState<RankingResult | null>(null);

  const handleStartAssessment = () => {
    const el = document.getElementById('assessment-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleRatingChange = (qId: string, val: number) => {
    setRatings(prev => ({
      ...prev,
      [qId]: val
    }));
  };

  const handleCalculate = () => {
    const res = calculateRanking({
      selectedIimId,
      ratings
    });
    setRankingResult(res);
    setHasCalculated(true);

    setTimeout(() => {
      const el = document.getElementById('results-section');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  };

  const handleRecalculate = () => {
    const el = document.getElementById('assessment-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleViewLedger = () => {
    const el = document.getElementById('comparative-ledger');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="min-h-screen bg-[#0c0f14] text-slate-100 flex flex-col font-sans selection:bg-slate-700 selection:text-white">
      {/* Institutional Header with Bold Branding and Nav */}
      <Header
        onScrollToQuestions={handleStartAssessment}
        onViewLedger={handleViewLedger}
      />

      <main className="flex-1">
        {/* Landing Page Hero with Bold Times New Roman Headline and exact CTA button */}
        <Hero onStartAssessment={handleStartAssessment} />

        {/* Assessment Questionnaire in Deep Charcoal Theme */}
        <Questionnaire
          selectedIimId={selectedIimId}
          onSelectIim={(id) => {
            setSelectedIimId(id);
            if (hasCalculated) {
              const res = calculateRanking({
                selectedIimId: id,
                ratings
              });
              setRankingResult(res);
            }
          }}
          ratings={ratings}
          onRatingChange={handleRatingChange}
          onCalculate={handleCalculate}
        />

        {/* Results Section (Active once calculated) */}
        {hasCalculated && rankingResult && (
          <ResultsView
            result={rankingResult}
            onRecalculate={handleRecalculate}
            onViewLedger={handleViewLedger}
          />
        )}

        {/* 2021-2026 Comparative Longitudinal Ledger across all IIMs */}
        <ComparativeLedger selectedIimId={selectedIimId} />
      </main>

      {/* Academic Institutional Footer without em dashes and without gradients */}
      <footer className="border-t border-slate-800 bg-slate-950 py-14 px-4 sm:px-6 lg:px-8 text-xs text-slate-400">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="text-center sm:text-left">
            <div className="font-serif font-black text-white text-base">
              Indian Institutes of Management Benchmarking Study
            </div>
            <div className="mt-1.5 text-slate-400">
              College Project Research Initiative &bull; Compiled from certified NIRF, IPRS audited reports, and public filings (2021 to 2026).
            </div>
          </div>
          <div className="text-center sm:text-right text-slate-400">
            <div>All calculations executed client-side. Zero external backend dependencies.</div>
            <div className="mt-1">Financial Times (FT) and QS benchmark methodology framework.</div>
          </div>
        </div>
      </footer>
    </div>
  );
}
