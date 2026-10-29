# Implementation Plan: Deep Charcoal Slate Dark Tone & Bold Header Styling

## Overview
Shift the application styling from the light parchment ivory palette to a distinguished, academic deep charcoal and slate black dark aesthetic, and make both the top navigation bar elements and the primary Times New Roman hero headline prominently bold. All strict design constraints remain strictly enforced (zero gradients, zero em dashes, no bento boxes, no website live pill).

---

## Proposed Changes

### 1. Global Styling & Dark Color Tokens (`src/index.css`)
- Update `:root` and `body` canvas colors from `#fcfbf9` to `#0c0f14` (deep charcoal / slate black) with body text in `#f1f5f9` (high-contrast slate-100).
- Update range slider track and thumb styles for dark mode:
  - Track: solid `#334155` (slate-700) with `#1e293b` (slate-800) base.
  - Thumb: solid `#f8fafc` (pure slate white) with dark outline, active state `#60a5fa` (solid crisp blue) without any gradients.
- Ensure `font-times` supports high-impact bold serif weights (font-weight 800/900).

### 2. Header Component (`src/components/Header.tsx`)
- Background: Solid dark charcoal `bg-[#0c0f14]/95` with `border-slate-800`.
- Typography & Badges:
  - Brand mark "IIM": bold badge in `#ffffff` with solid `#1e293b` container.
  - Subtitle: `font-bold uppercase tracking-wider text-slate-400`.
  - Brand heading: `font-extrabold text-white text-base tracking-tight font-serif`.
  - Navigation actions: `font-bold text-slate-200 hover:text-white border-slate-700 hover:border-slate-500`.

### 3. Hero Section (`src/components/Hero.tsx`)
- Headline: `"Where does your IIM rank among IIM's"` styled in bold Times New Roman (`font-times font-black text-white text-5xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight leading-[1.05]`).
- Subtitle: `text-slate-300 font-normal` with high legibility.
- Primary CTA: High-contrast button `"Answer a few questions and find out"` in solid `#ffffff` text `#090d16` with hover state `#e2e8f0`.
- Audit summary strip: `bg-slate-900/90 border-slate-800 text-slate-100`.

### 4. Questionnaire Component (`src/components/Questionnaire.tsx`)
- IIM Dropdown Selector: `bg-slate-900 border-slate-700 text-white font-bold` with dark chevron.
- Metadata Strip: `text-slate-400 border-slate-800` with emerald audit indicator.
- Question Cards: `bg-slate-900 border-slate-800 text-slate-100` with crisp headers.
- Sliders & Numeric Quick-Select Buttons:
  - Unselected buttons: `bg-slate-800 hover:bg-slate-700 text-slate-300 border-slate-700`.
  - Selected button: `bg-white text-slate-950 font-extrabold border-white`.
- Descriptors: `text-slate-400` with bold white labels.
- Calculate Button: Crisp solid white on dark button.

### 5. Results Dossier (`src/components/ResultsView.tsx`)
- Master Rank Banner: `bg-slate-950 border-slate-800 text-white`.
- Rank Number: `text-white font-extrabold font-times`.
- Metric Breakdown Cards: `bg-slate-900 border-slate-800 text-slate-100`.
- Peer Comparison Grid: `bg-slate-900/60 border-slate-800`.

### 6. Comparative Ledger & Raw Data Inspector (`src/components/ComparativeLedger.tsx` & `src/components/RawDataInspector.tsx`)
- Ledger Table: `bg-slate-900 border-slate-800 text-slate-200`. Table Header: `bg-slate-950 text-slate-300 font-bold`.
- Dimension Tabs: `bg-slate-950 border-slate-800 text-slate-200` with active state `bg-white text-slate-950 font-bold`.
- Standout Callout Cards: `bg-slate-900 border-slate-800 text-slate-300`.
- Raw Excel Viewer: Solid dark spreadsheet view with sticky header.

### 7. App Root & Footer (`src/App.tsx`)
- Canvas container: `bg-[#0c0f14] text-slate-100`.
- Footer: `bg-slate-950 border-slate-800 text-slate-400`.

---

## Verification Plan
1. **Compilation Check**: Run `compile_applet` to confirm zero TypeScript or build errors.
2. **Lint Validation**: Run `lint_applet` to ensure code hygiene.
3. **Design Verification**: Confirm:
   - Dark tone is authentic deep charcoal / slate black (`#0c0f14` / `#0f172a`).
   - Both the navigation bar and Times New Roman hero headline are prominently bold.
   - Zero gradients anywhere on the site.
   - Zero em dashes anywhere in content or code.
   - No bento boxes and no "website live" pill.
