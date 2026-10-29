import React, { useState } from 'react';
import { ALL_IIMS } from '../data/iimData';
import { ArrowUpDown, Search } from 'lucide-react';

export const ComparativeLedger: React.FC<{ selectedIimId?: string }> = ({ selectedIimId }) => {
  const [activeTab, setActiveTab] = useState<'all' | 'salary' | 'roi' | 'diversity' | 'faculty' | 'placement'>('all');
  const [filterGen, setFilterGen] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortField, setSortField] = useState<string>('nationalBaselineRank');
  const [sortAsc, setSortAsc] = useState<boolean>(true);

  // Filter & Search
  const filtered = ALL_IIMS.filter(iim => {
    if (filterGen !== 'all' && iim.generation !== filterGen) return false;
    if (searchQuery.trim() && !iim.name.toLowerCase().includes(searchQuery.toLowerCase()) && !iim.campusCity.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    return true;
  });

  // Sort
  const sorted = [...filtered].sort((a, b) => {
    let aVal: any = (a as any)[sortField];
    let bVal: any = (b as any)[sortField];
    if (aVal === null || aVal === undefined) aVal = -999;
    if (bVal === null || bVal === undefined) bVal = -999;
    if (typeof aVal === 'string') {
      return sortAsc ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal);
    }
    return sortAsc ? aVal - bVal : bVal - aVal;
  });

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortAsc(!sortAsc);
    } else {
      setSortField(field);
      setSortAsc(false);
    }
  };

  return (
    <section id="comparative-ledger" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-slate-800 bg-[#0c0f14]">
      <div className="mb-10">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-6">
          <div>
            <div className="text-xs uppercase tracking-wider text-slate-400 font-bold mb-1.5">
              Longitudinal Dataset
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold font-times text-white tracking-tight">
              2021 to 2026 Comparative Institutional Ledger
            </h2>
            <p className="text-sm text-slate-300 mt-2 max-w-2xl leading-relaxed">
              Cross-institutional growth analysis based on audited NIRF submissions, IPRS placement reports, and official disclosures across all 21 IIMs.
            </p>
          </div>

          {/* Quick Filters */}
          <div className="flex flex-wrap items-center gap-2.5">
            <div className="relative">
              <input
                type="text"
                placeholder="Search IIM or city..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-slate-900 border border-slate-700 text-xs rounded-sm py-2.5 px-3 pl-8 text-white focus:outline-none focus:border-white w-44 sm:w-56 font-medium placeholder-slate-500"
              />
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>

            <select
              value={filterGen}
              onChange={(e) => setFilterGen(e.target.value)}
              className="bg-slate-900 border border-slate-700 text-xs rounded-sm py-2.5 px-3 text-white focus:outline-none focus:border-white font-bold cursor-pointer"
            >
              <option value="all" className="bg-slate-950 text-white">All Generations (21 IIMs)</option>
              <option value="Gen 1 (Heritage)" className="bg-slate-950 text-white">Gen 1 (Heritage)</option>
              <option value="Gen 2 (New)" className="bg-slate-950 text-white">Gen 2 (New)</option>
              <option value="Gen 3 (Baby)" className="bg-slate-950 text-white">Gen 3 (Baby)</option>
            </select>
          </div>
        </div>

        {/* Dimension View Tabs */}
        <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto pt-5 pb-3 border-b border-slate-800 text-xs font-bold">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-3.5 py-2 rounded-sm whitespace-nowrap cursor-pointer transition-colors border ${
              activeTab === 'all'
                ? 'bg-white text-slate-950 border-white shadow-sm'
                : 'bg-slate-900 text-slate-300 hover:bg-slate-800 border-slate-800'
            }`}
          >
            Consolidated Ledger
          </button>
          <button
            onClick={() => setActiveTab('salary')}
            className={`px-3.5 py-2 rounded-sm whitespace-nowrap cursor-pointer transition-colors border ${
              activeTab === 'salary'
                ? 'bg-white text-slate-950 border-white shadow-sm'
                : 'bg-slate-900 text-slate-300 hover:bg-slate-800 border-slate-800'
            }`}
          >
            Salary Trajectory & CAGR
          </button>
          <button
            onClick={() => setActiveTab('roi')}
            className={`px-3.5 py-2 rounded-sm whitespace-nowrap cursor-pointer transition-colors border ${
              activeTab === 'roi'
                ? 'bg-white text-slate-950 border-white shadow-sm'
                : 'bg-slate-900 text-slate-300 hover:bg-slate-800 border-slate-800'
            }`}
          >
            Fees & Payback Months
          </button>
          <button
            onClick={() => setActiveTab('diversity')}
            className={`px-3.5 py-2 rounded-sm whitespace-nowrap cursor-pointer transition-colors border ${
              activeTab === 'diversity'
                ? 'bg-white text-slate-950 border-white shadow-sm'
                : 'bg-slate-900 text-slate-300 hover:bg-slate-800 border-slate-800'
            }`}
          >
            Cohort Diversity Surge
          </button>
          <button
            onClick={() => setActiveTab('faculty')}
            className={`px-3.5 py-2 rounded-sm whitespace-nowrap cursor-pointer transition-colors border ${
              activeTab === 'faculty'
                ? 'bg-white text-slate-950 border-white shadow-sm'
                : 'bg-slate-900 text-slate-300 hover:bg-slate-800 border-slate-800'
            }`}
          >
            PhD Faculty & Research
          </button>
          <button
            onClick={() => setActiveTab('placement')}
            className={`px-3.5 py-2 rounded-sm whitespace-nowrap cursor-pointer transition-colors border ${
              activeTab === 'placement'
                ? 'bg-white text-slate-950 border-white shadow-sm'
                : 'bg-slate-900 text-slate-300 hover:bg-slate-800 border-slate-800'
            }`}
          >
            Recruiter Diversification
          </button>
        </div>
      </div>

      {/* Main Ledger Table */}
      <div className="overflow-x-auto bg-slate-900 border border-slate-800 rounded-sm shadow-md">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="bg-slate-950 text-slate-300 font-bold border-b border-slate-800 uppercase tracking-wider text-[11px]">
              <th className="py-4 px-4 w-12 text-center">
                <button onClick={() => handleSort('nationalBaselineRank')} className="flex items-center gap-1 mx-auto cursor-pointer">
                  <span>#</span>
                  <ArrowUpDown className="w-3 h-3 text-slate-400" />
                </button>
              </th>
              <th className="py-4 px-4 min-w-[190px]">
                <button onClick={() => handleSort('name')} className="flex items-center gap-1 cursor-pointer">
                  <span>Institution</span>
                  <ArrowUpDown className="w-3 h-3 text-slate-400" />
                </button>
              </th>
              <th className="py-4 px-3 min-w-[110px]">Generation</th>

              {(activeTab === 'all' || activeTab === 'salary') && (
                <>
                  <th className="py-4 px-3 text-right min-w-[110px]">
                    <button onClick={() => handleSort('medianSalary2026')} className="flex items-center gap-1 ml-auto cursor-pointer">
                      <span>Median CTC</span>
                      <ArrowUpDown className="w-3 h-3 text-slate-400" />
                    </button>
                  </th>
                  <th className="py-4 px-3 text-right min-w-[100px]">
                    <button onClick={() => handleSort('salaryCAGR')} className="flex items-center gap-1 ml-auto cursor-pointer">
                      <span>5-Yr CAGR</span>
                      <ArrowUpDown className="w-3 h-3 text-slate-400" />
                    </button>
                  </th>
                </>
              )}

              {(activeTab === 'all' || activeTab === 'roi') && (
                <>
                  <th className="py-4 px-3 text-right min-w-[100px]">
                    <button onClick={() => handleSort('tuitionFeeLakhs')} className="flex items-center gap-1 ml-auto cursor-pointer">
                      <span>Total Fee</span>
                      <ArrowUpDown className="w-3 h-3 text-slate-400" />
                    </button>
                  </th>
                  <th className="py-4 px-3 text-right min-w-[110px]">
                    <button onClick={() => handleSort('paybackMonths')} className="flex items-center gap-1 ml-auto cursor-pointer">
                      <span>Payback</span>
                      <ArrowUpDown className="w-3 h-3 text-slate-400" />
                    </button>
                  </th>
                </>
              )}

              {(activeTab === 'all' || activeTab === 'faculty') && (
                <>
                  <th className="py-4 px-3 text-right min-w-[100px]">
                    <button onClick={() => handleSort('facultyPhdPct')} className="flex items-center gap-1 ml-auto cursor-pointer">
                      <span>PhD Faculty</span>
                      <ArrowUpDown className="w-3 h-3 text-slate-400" />
                    </button>
                  </th>
                  <th className="py-4 px-3 text-right min-w-[95px]">Stu / Fac</th>
                </>
              )}

              {(activeTab === 'all' || activeTab === 'diversity') && (
                <>
                  <th className="py-4 px-3 text-right min-w-[110px]">
                    <button onClick={() => handleSort('womenStudentsPct')} className="flex items-center gap-1 ml-auto cursor-pointer">
                      <span>Women %</span>
                      <ArrowUpDown className="w-3 h-3 text-slate-400" />
                    </button>
                  </th>
                  <th className="py-4 px-3 text-right min-w-[110px]">
                    <button onClick={() => handleSort('womenGrowthPp')} className="flex items-center gap-1 ml-auto cursor-pointer">
                      <span>2021-26 Shift</span>
                      <ArrowUpDown className="w-3 h-3 text-slate-400" />
                    </button>
                  </th>
                </>
              )}

              {(activeTab === 'all' || activeTab === 'placement') && (
                <>
                  <th className="py-4 px-3 text-right min-w-[90px]">
                    <button onClick={() => handleSort('recruiterFirms2026')} className="flex items-center gap-1 ml-auto cursor-pointer">
                      <span>Recruiters</span>
                      <ArrowUpDown className="w-3 h-3 text-slate-400" />
                    </button>
                  </th>
                  <th className="py-4 px-3 text-right min-w-[95px]">Offers/Stu</th>
                </>
              )}

              <th className="py-4 px-4 min-w-[210px]">Audited Growth Story</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800">
            {sorted.map((iim) => {
              const isSelected = selectedIimId === iim.id;

              return (
                <tr
                  key={iim.id}
                  className={`hover:bg-slate-800/80 transition-colors ${
                    isSelected ? 'bg-amber-950/40 font-bold border-l-2 border-amber-400' : ''
                  }`}
                >
                  <td className="py-3.5 px-4 text-center font-mono text-slate-400 font-bold">
                    {iim.nationalBaselineRank}
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="font-bold text-white flex items-center gap-2">
                      <span>{iim.name}</span>
                    </div>
                    <div className="text-[11px] text-slate-400">
                      {iim.campusCity}, {iim.state} &bull; Est. {iim.established}
                    </div>
                  </td>
                  <td className="py-3.5 px-3 text-slate-300 whitespace-nowrap">
                    <span className="px-2 py-0.5 rounded-sm bg-slate-950 border border-slate-800 text-[10px] text-slate-300 font-semibold">
                      {iim.generation.replace(' (Heritage)', '').replace(' (New)', '').replace(' (Baby)', '')}
                    </span>
                  </td>

                  {(activeTab === 'all' || activeTab === 'salary') && (
                    <>
                      <td className="py-3.5 px-3 text-right font-bold text-white font-mono whitespace-nowrap">
                        ₹{iim.medianSalary2026} LPA
                      </td>
                      <td className="py-3.5 px-3 text-right text-slate-300 font-mono whitespace-nowrap">
                        {iim.salaryCAGR ? (
                          <span className={iim.salaryCAGR >= 7 ? 'text-emerald-400 font-bold' : ''}>
                            +{iim.salaryCAGR}%
                          </span>
                        ) : 'n/a'}
                      </td>
                    </>
                  )}

                  {(activeTab === 'all' || activeTab === 'roi') && (
                    <>
                      <td className="py-3.5 px-3 text-right text-slate-300 font-mono whitespace-nowrap">
                        ₹{iim.tuitionFeeLakhs} L
                      </td>
                      <td className="py-3.5 px-3 text-right font-bold font-mono whitespace-nowrap text-white">
                        {iim.paybackMonths ? `${iim.paybackMonths} mo` : 'n/a'}
                      </td>
                    </>
                  )}

                  {(activeTab === 'all' || activeTab === 'faculty') && (
                    <>
                      <td className="py-3.5 px-3 text-right font-mono whitespace-nowrap text-slate-200 font-semibold">
                        {iim.facultyPhdPct}%
                      </td>
                      <td className="py-3.5 px-3 text-right font-mono whitespace-nowrap text-slate-400">
                        {iim.studentFacultyRatio}:1
                      </td>
                    </>
                  )}

                  {(activeTab === 'all' || activeTab === 'diversity') && (
                    <>
                      <td className="py-3.5 px-3 text-right font-mono font-bold whitespace-nowrap text-white">
                        {iim.womenStudentsPct}%
                      </td>
                      <td className="py-3.5 px-3 text-right font-mono whitespace-nowrap">
                        {iim.womenGrowthPp !== null ? (
                          <span className={iim.womenGrowthPp >= 15 ? 'text-emerald-400 font-bold' : iim.womenGrowthPp < 0 ? 'text-slate-400' : 'text-slate-200'}>
                            {iim.womenGrowthPp > 0 ? '+' : ''}{iim.womenGrowthPp} pp
                          </span>
                        ) : 'n/a'}
                      </td>
                    </>
                  )}

                  {(activeTab === 'all' || activeTab === 'placement') && (
                    <>
                      <td className="py-3.5 px-3 text-right font-mono font-bold text-white">
                        {iim.recruiterFirms2026}
                      </td>
                      <td className="py-3.5 px-3 text-right font-mono text-slate-400">
                        {iim.offersPerStudent}x
                      </td>
                    </>
                  )}

                  <td className="py-3.5 px-4 text-slate-300 text-[11px] leading-relaxed">
                    {iim.strategicInsight}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Standout Growth Highlights Callouts */}
      <div className="mt-9 pt-7 border-t border-slate-800 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 bg-slate-900 border border-slate-800 rounded-sm">
          <div className="text-xs uppercase font-bold text-slate-400 mb-1.5">
            Phenomenal Diversity Growth
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            <span className="font-bold text-white">IIM Sambalpur (+43.15 pp)</span> surged from 24.5% to 67.62% women students, while <span className="font-bold text-white">IIM Jammu (+35.7 pp)</span> achieved 57.73% female representation.
          </p>
        </div>

        <div className="p-4 bg-slate-900 border border-slate-800 rounded-sm">
          <div className="text-xs uppercase font-bold text-slate-400 mb-1.5">
            Fastest Salary Compounding
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            <span className="font-bold text-white">IIM Sirmaur (+9.17% CAGR)</span> and <span className="font-bold text-white">IIM Jammu (+8.45% CAGR)</span> led compensation compounding from 10 LPA bases, closely followed by <span className="font-bold text-white">IIM Shillong (+8.24% CAGR)</span> reaching 26 LPA.
          </p>
        </div>

        <div className="p-4 bg-slate-900 border border-slate-800 rounded-sm">
          <div className="text-xs uppercase font-bold text-slate-400 mb-1.5">
            Recruiter Network Doubling
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            <span className="font-bold text-white">IIM Trichy</span> and <span className="font-bold text-white">IIM Jammu</span> crossed 250 and 260 participating hiring companies, insulating cohorts against macroeconomic cycles.
          </p>
        </div>
      </div>
    </section>
  );
};
