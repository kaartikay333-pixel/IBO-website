import { ALL_IIMS, IIMProfile, BENCHMARK_QUESTIONS } from '../data/iimData';

export interface UserResponses {
  selectedIimId: string;
  ratings: Record<string, number | null>; // questionId -> 1..10 or null
}

export interface MetricScoreComparison {
  questionId: string;
  metricTitle: string;
  category: string;
  userRating: number; // 1-10
  userWeightedScore: number; // out of 100
  actual2026Value: string;
  nationalMedianValue: string;
  growthSummary: string;
  standing: 'Dominant Leader' | 'Above National Peer Median' | 'Competitive Alignment' | 'Growth Phase';
  metricRank: number; // out of 21
}

export interface RankingResult {
  selectedIim: IIMProfile;
  compositeScore: number; // 0 - 100
  nationalRank: number; // 1 to 21
  generationRank: number; // 1 to N
  totalInGeneration: number;
  percentile: number; // e.g. 95%
  userAvgRating: number; // e.g. 8.2 / 10
  metricBreakdown: MetricScoreComparison[];
  growthHighlights: string[];
  strategicAssessment: string;
  peerComparisons: {
    higherPeers: IIMProfile[];
    closeCompetitors: IIMProfile[];
    growthChallengers: IIMProfile[];
  };
}

export function calculateRanking(responses: UserResponses): RankingResult {
  const selectedIim = ALL_IIMS.find(i => i.id === responses.selectedIimId) || ALL_IIMS[0];

  // Calculate user weighted score (0 to 100)
  let userWeightedSum = 0;
  let totalWeight = 0;
  let rawRatingSum = 0;
  let answeredCount = 0;

  BENCHMARK_QUESTIONS.forEach(q => {
    const val = responses.ratings[q.id];
    if (val !== null && val !== undefined) {
      userWeightedSum += (val * 10) * q.weight;
      totalWeight += q.weight;
      rawRatingSum += val;
      answeredCount++;
    }
  });

  const normalizedUserScore = totalWeight > 0 ? (userWeightedSum / totalWeight) : 50;
  const userAvgRating = answeredCount > 0 ? (rawRatingSum / answeredCount) : 5;

  // Composite score balances audited baseline data (60% weight) with user-perceived real-world traction (40% weight)
  const compositeScore = Math.round(((selectedIim.baseBenchmarkScore * 0.6) + (normalizedUserScore * 0.4)) * 10) / 10;

  // Compute all IIMs with their effective scores
  const allScores = ALL_IIMS.map(iim => {
    if (iim.id === selectedIim.id) {
      return { iim, score: compositeScore };
    }
    return { iim, score: iim.baseBenchmarkScore };
  });

  // Sort descending
  allScores.sort((a, b) => b.score - a.score);

  const nationalRank = allScores.findIndex(item => item.iim.id === selectedIim.id) + 1;

  // Generation rank
  const sameGen = allScores.filter(item => item.iim.generation === selectedIim.generation);
  const generationRank = sameGen.findIndex(item => item.iim.id === selectedIim.id) + 1;
  const totalInGeneration = sameGen.length;

  const percentile = Math.round(((ALL_IIMS.length - nationalRank) / (ALL_IIMS.length - 1)) * 100);

  // Metric-by-metric breakdown
  const metricBreakdown: MetricScoreComparison[] = BENCHMARK_QUESTIONS.map((q, idx) => {
    const userRating = responses.ratings[q.id] || 5;
    const userWeightedScore = userRating * 10;

    let actualVal = 'n/a';
    let natMedian = 'n/a';
    let growth = '';
    let metricRank = nationalRank;

    switch (q.id) {
      case 'salary_compensation':
        actualVal = selectedIim.medianSalary2026 ? `₹${selectedIim.medianSalary2026} LPA` : `₹${selectedIim.meanSalary2026} LPA (Mean)`;
        natMedian = '₹19.5 LPA';
        growth = selectedIim.salaryCAGR ? `+${selectedIim.salaryCAGR}% CAGR (2021-2026)` : 'Stable Trajectory';
        metricRank = getMetricRank(ALL_IIMS, i => i.medianSalary2026, selectedIim.id);
        break;

      case 'roi_payback':
        actualVal = selectedIim.paybackMonths ? `${selectedIim.paybackMonths} months` : `${Math.round(selectedIim.feeToSalaryRatio * 12)} months`;
        natMedian = '11.8 months';
        growth = selectedIim.feeToSalaryRatio ? `${selectedIim.feeToSalaryRatio}x fee multiplier` : 'Rapid capital turnaround';
        metricRank = getMetricRank(ALL_IIMS, i => -i.paybackMonths, selectedIim.id); // lower months is better
        break;

      case 'faculty_doctorate':
        actualVal = `${selectedIim.facultyPhdPct}% PhDs`;
        natMedian = '95.0% PhDs';
        growth = `${selectedIim.studentFacultyRatio}:1 student ratio`;
        metricRank = getMetricRank(ALL_IIMS, i => i.facultyPhdPct, selectedIim.id);
        break;

      case 'research_impact':
        actualVal = `${selectedIim.researchArticlesPerFaculty} articles/fac`;
        natMedian = '0.75 articles/fac';
        growth = selectedIim.hasAuditedDataset ? 'Audited ABDC / Scopus Index' : 'Peer-reviewed NIRF output';
        metricRank = getMetricRank(ALL_IIMS, i => i.researchArticlesPerFaculty, selectedIim.id);
        break;

      case 'diversity_parity':
        actualVal = `${selectedIim.womenStudentsPct}% female cohort`;
        natMedian = '32.0% female';
        growth = selectedIim.womenGrowthPp !== null
          ? `${selectedIim.womenGrowthPp > 0 ? '+' : ''}${selectedIim.womenGrowthPp} pp change (2021-2026)`
          : 'Demographic balance';
        metricRank = getMetricRank(ALL_IIMS, i => i.womenStudentsPct, selectedIim.id);
        break;

      case 'recruiter_depth':
        actualVal = `${selectedIim.recruiterFirms2026} firms`;
        natMedian = '150 firms';
        growth = `${selectedIim.offersPerStudent} offers/student buffer`;
        metricRank = getMetricRank(ALL_IIMS, i => i.recruiterFirms2026, selectedIim.id);
        break;
    }

    let standing: MetricScoreComparison['standing'] = 'Competitive Alignment';
    if (userRating >= 9) standing = 'Dominant Leader';
    else if (userRating >= 7) standing = 'Above National Peer Median';
    else if (userRating <= 4) standing = 'Growth Phase';

    return {
      questionId: q.id,
      metricTitle: q.title,
      category: q.metricCategory,
      userRating,
      userWeightedScore,
      actual2026Value: actualVal,
      nationalMedianValue: natMedian,
      growthSummary: growth,
      standing,
      metricRank
    };
  });

  // Growth Highlights from Excel data
  const growthHighlights: string[] = [];
  if (selectedIim.salaryCAGR && selectedIim.salaryCAGR > 6.0) {
    growthHighlights.push(`Robust Compensation Momentum: Compounding salary trajectory of +${selectedIim.salaryCAGR}% CAGR over the 2021-2026 audit window.`);
  }
  if (selectedIim.womenGrowthPp && selectedIim.womenGrowthPp > 10.0) {
    growthHighlights.push(`Trailblazing Diversity Surge: Exceptional +${selectedIim.womenGrowthPp} percentage points increase in female student representation since 2021.`);
  }
  if (selectedIim.paybackMonths && selectedIim.paybackMonths < 10.0) {
    growthHighlights.push(`Sub-10 Month Recoupment: Industry-leading capital velocity with gross fee recovery in approximately ${selectedIim.paybackMonths} months.`);
  }
  if (selectedIim.facultyPhdPct >= 98.0) {
    growthHighlights.push(`Academic Terminal Density: ${selectedIim.facultyPhdPct}% of faculty hold confirmed doctorates, ensuring rigorous instructional oversight.`);
  }
  if (selectedIim.recruiterFirms2026 >= 180) {
    growthHighlights.push(`Recruiter Fortress: Expansive network of ${selectedIim.recruiterFirms2026} corporate partners providing vital macroeconomic placement insulation.`);
  }

  // Provide general highlights if specific ones are short
  if (growthHighlights.length < 3) {
    growthHighlights.push(`Pedagogical Architecture: Maintains a healthy ${selectedIim.studentFacultyRatio}:1 student-to-faculty ratio across core academic chairs.`);
    growthHighlights.push(`Campus Velocity: Established in ${selectedIim.established}, positioned as a benchmark ${selectedIim.generation} institution.`);
  }

  // Strategic peer comparisons
  const higherPeers = allScores
    .filter(item => item.score > compositeScore && item.iim.id !== selectedIim.id)
    .slice(-2)
    .map(item => item.iim);

  const closeCompetitors = allScores
    .filter(item => Math.abs(item.score - compositeScore) <= 3.5 && item.iim.id !== selectedIim.id)
    .slice(0, 3)
    .map(item => item.iim);

  const growthChallengers = allScores
    .filter(item => item.score < compositeScore && item.iim.id !== selectedIim.id)
    .slice(0, 2)
    .map(item => item.iim);

  let strategicAssessment = '';
  if (nationalRank <= 3) {
    strategicAssessment = `${selectedIim.name} occupies the pinnacle of Indian management education. Its front-end compensation power, 100% or near-100% PhD faculty density, and sub-9 month payback velocity establish an insurmountable benchmark for newer institutions.`;
  } else if (nationalRank <= 8) {
    strategicAssessment = `${selectedIim.name} demonstrates formidable upper-tier national traction. It challenges the heritage triumvirate across recruiter diversification and rapid compensation compounding, offering outstanding value for money and academic rigor.`;
  } else if (nationalRank <= 15) {
    strategicAssessment = `${selectedIim.name} represents a high-velocity rising contender. Its rapid growth from 2021 to 2026 in recruiter breadth, female cohort enrollment, and doctoral faculty qualifications highlights aggressive institutional scaling.`;
  } else {
    strategicAssessment = `${selectedIim.name} is in an agile expansion phase. As its permanent campus infrastructure matures and corporate hiring relationships deepen, its return-on-investment payback and regional recruiter buffers show promising compound acceleration.`;
  }

  return {
    selectedIim,
    compositeScore,
    nationalRank,
    generationRank,
    totalInGeneration,
    percentile,
    userAvgRating: Math.round(userAvgRating * 10) / 10,
    metricBreakdown,
    growthHighlights,
    strategicAssessment,
    peerComparisons: {
      higherPeers,
      closeCompetitors,
      growthChallengers
    }
  };
}

function getMetricRank<T>(list: T[], extractor: (item: T) => number | null, targetId: string): number {
  const sorted = [...list]
    .map((item: any) => ({ id: item.id, val: extractor(item) ?? -999 }))
    .sort((a, b) => b.val - a.val);

  const idx = sorted.findIndex(s => s.id === targetId);
  return idx >= 0 ? idx + 1 : list.length;
}
