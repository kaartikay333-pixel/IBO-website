import React, { useState, useRef } from 'react';
import { ALL_IIMS, BENCHMARK_QUESTIONS } from '../data/iimData';
import { AlertCircle, CheckCircle2, ChevronDown, Building2, MapPin, Calendar, ArrowRight } from 'lucide-react';

interface QuestionnaireProps {
  selectedIimId: string;
  onSelectIim: (id: string) => void;
  ratings: Record<string, number | null>;
  onRatingChange: (questionId: string, value: number) => void;
  onCalculate: () => void;
}

export const Questionnaire: React.FC<QuestionnaireProps> = ({
  selectedIimId,
  onSelectIim,
  ratings,
  onRatingChange,
  onCalculate
}) => {
  const [validationAttempted, setValidationAttempted] = useState(false);
  const questionRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const selectedIim = ALL_IIMS.find(i => i.id === selectedIimId) || ALL_IIMS[0];

  // Identify unanswered questions
  const unansweredQuestions = BENCHMARK_QUESTIONS.filter(
    q => ratings[q.id] === null || ratings[q.id] === undefined
  );

  const isFormComplete = unansweredQuestions.length === 0;

  const handleCalculateClick = () => {
    setValidationAttempted(true);
    if (isFormComplete) {
      onCalculate();
    } else {
      const firstUnanswered = unansweredQuestions[0];
      if (firstUnanswered && questionRefs.current[firstUnanswered.id]) {
        questionRefs.current[firstUnanswered.id]?.scrollIntoView({
          behavior: 'smooth',
          block: 'center'
        });
      }
    }
  };

  const handleQuickScroll = (qId: string) => {
    if (questionRefs.current[qId]) {
      questionRefs.current[qId]?.scrollIntoView({
        behavior: 'smooth',
        block: 'center'
      });
    }
  };

  return (
    <section id="assessment-section" className="py-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      {/* Section Header */}
      <div className="mb-12 text-center sm:text-left border-b border-slate-800 pb-8">
        <div className="text-xs uppercase tracking-widest text-slate-400 font-bold mb-2">
          Institutional Assessment
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-times">
          Evaluation Matrix & Institutional Profile
        </h2>
        <p className="text-sm sm:text-base text-slate-300 mt-3 leading-relaxed">
          Select your institution from all 21 Indian Institutes of Management, then rate the six benchmark metrics on a 1-10 scale.
        </p>
      </div>

      {/* Top Dropdown: Names of ALL IIMs of India */}
      <div className="mb-12 bg-slate-900 border border-slate-700 rounded-sm p-6 sm:p-8 shadow-sm">
        <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-3">
          Select Your IIM (All 21 Institutes of India)
        </label>
        <div className="relative">
          <select
            value={selectedIimId}
            onChange={(e) => onSelectIim(e.target.value)}
            className="w-full bg-slate-950 border border-slate-700 text-white text-base sm:text-lg rounded-sm py-3.5 px-4 pr-11 focus:ring-1 focus:ring-white focus:border-white font-bold appearance-none cursor-pointer"
          >
            <optgroup label="Generation 1: Heritage IIMs (1961 - 1996, 2023)" className="bg-slate-950 text-slate-200">
              {ALL_IIMS.filter(i => i.generation === 'Gen 1 (Heritage)').map(iim => (
                <option key={iim.id} value={iim.id}>
                  {iim.name}
                </option>
              ))}
            </optgroup>
            <optgroup label="Generation 2: New IIMs (2007 - 2011)" className="bg-slate-950 text-slate-200">
              {ALL_IIMS.filter(i => i.generation === 'Gen 2 (New)').map(iim => (
                <option key={iim.id} value={iim.id}>
                  {iim.name}
                </option>
              ))}
            </optgroup>
            <optgroup label="Generation 3: Baby IIMs (2015 - 2016)" className="bg-slate-950 text-slate-200">
              {ALL_IIMS.filter(i => i.generation === 'Gen 3 (Baby)').map(iim => (
                <option key={iim.id} value={iim.id}>
                  {iim.name}
                </option>
              ))}
            </optgroup>
          </select>
          <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
        </div>

        {/* Selected IIM Summary Badge Strip */}
        <div className="mt-5 pt-4 border-t border-slate-800 flex flex-wrap items-center gap-y-2 gap-x-6 text-xs text-slate-300">
          <span className="flex items-center gap-1.5 font-bold text-white">
            <Building2 className="w-4 h-4 text-slate-400" />
            <span>{selectedIim.generation}</span>
          </span>
          <span className="flex items-center gap-1.5 font-medium text-slate-300">
            <Calendar className="w-4 h-4 text-slate-400" />
            <span>Founded {selectedIim.established}</span>
          </span>
          <span className="flex items-center gap-1.5 font-medium text-slate-300">
            <MapPin className="w-4 h-4 text-slate-400" />
            <span>{selectedIim.campusCity}, {selectedIim.state}</span>
          </span>
        </div>
      </div>

      {/* Unanswered Questions Warning Banner if user clicked Calculate prematurely */}
      {validationAttempted && !isFormComplete && (
        <div className="mb-10 p-5 bg-amber-950/40 border border-amber-600/70 rounded-sm text-amber-200 shadow-sm">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <div className="font-bold text-sm text-amber-300">
                Incomplete Evaluation: {unansweredQuestions.length} remaining question{unansweredQuestions.length > 1 ? 's' : ''} require an answer
              </div>
              <p className="text-xs text-amber-200 mt-1">
                Please set a 1-10 score for all questions below before calculating your score:
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {unansweredQuestions.map(q => (
                  <button
                    key={q.id}
                    onClick={() => handleQuickScroll(q.id)}
                    className="text-xs bg-amber-900/60 hover:bg-amber-900 text-amber-100 px-3 py-1.5 rounded-sm border border-amber-500/60 font-bold cursor-pointer transition-colors"
                  >
                    Question {q.metricNumber}: {q.title} &rarr;
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Progress tracker */}
      <div className="mb-10 flex items-center justify-between text-xs text-slate-400 border-b border-slate-800 pb-3 font-semibold">
        <span>Completion: {BENCHMARK_QUESTIONS.length - unansweredQuestions.length} of {BENCHMARK_QUESTIONS.length} Questions Answered</span>
        <span className="font-bold text-white">
          {Math.round(((BENCHMARK_QUESTIONS.length - unansweredQuestions.length) / BENCHMARK_QUESTIONS.length) * 100)}% Complete
        </span>
      </div>

      {/* The 6 Niche Slider Questions */}
      <div className="space-y-9">
        {BENCHMARK_QUESTIONS.map((q) => {
          const currentRating = ratings[q.id];
          const isAnswered = currentRating !== null && currentRating !== undefined;
          const isMissing = validationAttempted && !isAnswered;

          return (
            <div
              key={q.id}
              ref={(el) => { questionRefs.current[q.id] = el; }}
              className={`p-6 sm:p-8 rounded-sm border transition-colors ${
                isMissing
                  ? 'bg-amber-950/25 border-amber-500/80'
                  : isAnswered
                  ? 'bg-slate-900 border-slate-700'
                  : 'bg-slate-900/60 border-slate-800'
              }`}
            >
              {/* Question Header & Ranking Mapping */}
              <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Metric {q.metricNumber} of 6 &bull; {q.metricCategory}
                </span>
                <span className="text-xs font-mono px-2.5 py-1 rounded-sm bg-slate-950 border border-slate-700 text-slate-300 font-semibold">
                  Used by: {q.whichRankingUsesIt}
                </span>
              </div>

              {/* Title & Niche Question */}
              <h3 className="text-xl sm:text-2xl font-bold font-times text-white tracking-tight">
                {q.title}
              </h3>
              <p className="text-slate-200 text-sm sm:text-base font-normal mt-2.5 leading-relaxed">
                {q.nicheQuestion}
              </p>
              <p className="text-xs text-slate-400 italic mt-2">
                Benchmark source: {q.whereDataOriginates}
              </p>

              {/* Slider Interface */}
              <div className="mt-7 pt-6 border-t border-slate-800">
                <div className="flex items-center justify-between mb-2.5">
                  <span className="text-xs font-bold uppercase tracking-wide text-slate-300">
                    Institutional Rating (1 to 10 scale)
                  </span>
                  <div className="flex items-center gap-2">
                    {isAnswered ? (
                      <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-300 bg-emerald-950/70 px-2.5 py-1 rounded-sm border border-emerald-600/70">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Score: {currentRating} / 10</span>
                      </span>
                    ) : (
                      <span className="text-xs text-slate-400 bg-slate-950 px-2.5 py-1 rounded-sm border border-slate-800 font-semibold">
                        Slide or click a number to rate
                      </span>
                    )}
                  </div>
                </div>

                {/* Range Slider */}
                <input
                  type="range"
                  min="1"
                  max="10"
                  step="1"
                  value={currentRating ?? 5}
                  onChange={(e) => onRatingChange(q.id, parseInt(e.target.value, 10))}
                  className="w-full my-3"
                />

                {/* Quick Touch/Click Number Steps */}
                <div className="grid grid-cols-10 gap-1 sm:gap-1.5 mt-2">
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => {
                    const isSelected = currentRating === num;
                    return (
                      <button
                        key={num}
                        type="button"
                        onClick={() => onRatingChange(q.id, num)}
                        className={`py-2 text-xs font-extrabold rounded-sm transition-all cursor-pointer border ${
                          isSelected
                            ? 'bg-white text-slate-950 border-white shadow-sm'
                            : 'bg-slate-950 hover:bg-slate-800 text-slate-200 border-slate-700'
                        }`}
                      >
                        {num}
                      </button>
                    );
                  })}
                </div>

                {/* Min / Mid / Max Descriptors */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-5 pt-4 border-t border-slate-800 text-xs text-slate-400 leading-snug">
                  <div>
                    <span className="font-bold text-white block mb-0.5">1: Lower Decile</span>
                    <span>{q.minDescriptor}</span>
                  </div>
                  <div className="sm:text-center">
                    <span className="font-bold text-white block mb-0.5">5: National Average</span>
                    <span>{q.midDescriptor}</span>
                  </div>
                  <div className="sm:text-right">
                    <span className="font-bold text-white block mb-0.5">10: Frontier Leader</span>
                    <span>{q.maxDescriptor}</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Calculate Button */}
      <div className="mt-14 p-8 bg-slate-900 border border-slate-700 rounded-sm text-center">
        <div className="max-w-md mx-auto mb-5">
          <div className="text-xs uppercase text-slate-400 font-bold tracking-wider">
            Ready to compare
          </div>
          <div className="text-sm text-slate-300 mt-1 font-medium">
            We will cross-reference your answers with the 2021-2026 audited excel files across all 21 IIMs.
          </div>
        </div>

        <button
          type="button"
          onClick={handleCalculateClick}
          className="w-full sm:w-auto px-11 py-4 bg-white hover:bg-slate-100 text-slate-950 font-bold text-base rounded-sm shadow-md transition-all flex items-center justify-center gap-2.5 mx-auto cursor-pointer border border-white"
        >
          <span>Calculate my score</span>
          <ArrowRight className="w-4 h-4 text-slate-950" />
        </button>

        {validationAttempted && !isFormComplete && (
          <p className="text-xs text-amber-300 mt-3 font-semibold">
            Please answer all {BENCHMARK_QUESTIONS.length} questions above to generate your institutional ranking.
          </p>
        )}
      </div>
    </section>
  );
};
