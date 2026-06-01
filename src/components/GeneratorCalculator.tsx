/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from "react";
import { POWER_APPLIANCES } from "../data/companyData";
import { PowerAppliance, GeneratorResult } from "../types";
import { Calculator, Zap, Fuel, Activity, Table, ShieldAlert, Cpu, ArrowRight } from "lucide-react";

interface GeneratorCalculatorProps {
  onQuoteWithData: (messageText: string) => void;
}

export default function GeneratorCalculator({ onQuoteWithData }: GeneratorCalculatorProps) {
  const powerBgSrc = "/src/assets/images/power_bg_light_1780057945804.png";
  // Quantities state
  const [quantities, setQuantities] = useState<Record<string, number>>(() => {
    const initial: Record<string, number> = {};
    POWER_APPLIANCES.forEach((app) => {
      // Pre-select patient monitor and vaccine fridge to guide user interaction
      if (app.id === "app-5" || app.id === "app-6") {
        initial[app.id] = 1;
      } else {
        initial[app.id] = 0;
      }
    });
    return initial;
  });

  const [activeFilter, setActiveFilter] = useState<string>("all");

  const categories = [
    { id: "all", label: "All Equipment" },
    { id: "life-support", label: "Critical Care" },
    { id: "imaging", label: "Diagnostic Imaging" },
    { id: "laboratory", label: "Lab Stations" },
    { id: "cooling", label: "Clinical Cooling" },
  ];

  // Adjust quantity
  const handleQtyChange = (id: string, delta: number) => {
    setQuantities((prev) => {
      const current = prev[id] || 0;
      const next = Math.max(0, current + delta);
      return { ...prev, [id]: next };
    });
  };

  // Reset calculator
  const resetQuantities = () => {
    const resetState: Record<string, number> = {};
    POWER_APPLIANCES.forEach((app) => {
      resetState[app.id] = 0;
    });
    setQuantities(resetState);
  };

  // Calculation logic
  const results = useMemo((): GeneratorResult => {
    let totalRunningWatts = 0;
    let maxSurgeDifference = 0;
    let totalStartingWithHighestSurge = 0;

    POWER_APPLIANCES.forEach((app) => {
      const qty = quantities[app.id] || 0;
      if (qty > 0) {
        totalRunningWatts += app.runningWatts * qty;
        
        // Starting surge calculations represent a typical electrical sequence event:
        // When multiple motors are operational, we calculate for motor starting sequenced:
        // running power of all devices + starting surge of the single highest starting load.
        const surgeDiff = (app.startingWatts - app.runningWatts);
        if (surgeDiff > maxSurgeDifference) {
          maxSurgeDifference = surgeDiff;
        }
      }
    });

    totalStartingWithHighestSurge = totalRunningWatts + maxSurgeDifference;

    // Convert Watts to recommended Kilowatts (with a safety cushion coefficient of 1.25)
    // To handle transient electrical overhead and continuous operations safely.
    const safetyCushionFactor = 1.25;
    const requiredKw = (totalRunningWatts * safetyCushionFactor) / 1000;

    // Diesel generator power factor (PF) typically averages 0.8
    // Recommended kVA = Required continuous kW / 0.8 Power Factor
    let rawKva = requiredKw > 0 ? requiredKw / 0.8 : 0;
    
    // Also check starting surge requirements against raw kVA
    const surgeKva = (totalStartingWithHighestSurge) / 1000 / 0.8;
    if (surgeKva > rawKva) {
      rawKva = surgeKva;
    }

    // Map to standard Uganda-marketed diesel generator sizes
    // 5kVA, 10kVA, 15kVA, 20kVA, 30kVA, 45kVA, 60kVA, 80kVA, 100kVA, 150kVA, 200kVA, 250kVA, 500kVA
    const standardSizes = [10, 15, 20, 30, 45, 60, 80, 100, 150, 200, 250, 300, 500];
    let recommendedKva = 0;
    
    if (rawKva > 0) {
      recommendedKva = standardSizes.find((size) => size >= rawKva) || Math.ceil(rawKva / 50) * 50;
    }

    // Liter calculation base guide: ~0.26 liters of diesel per hour per kVA output at 75% loaded state
    const fuelConsumptionLitresPerHr = recommendedKva > 0 ? Number((recommendedKva * 0.22).toFixed(1)) : 0;

    // Recommended generator solutions mapping
    const recommendedGeneratorModels = [];
    if (recommendedKva > 0) {
      if (recommendedKva <= 20) {
        recommendedGeneratorModels.push(`EmoEma Compact-Silent ${recommendedKva}kVA Engine (Single-Phase Option)`);
      } else if (recommendedKva <= 60) {
        recommendedGeneratorModels.push(`EmoEma Prime-Silent ${recommendedKva}kVA Generator with Smart Control`);
        recommendedGeneratorModels.push(`Heavy-duty Soundproof ATS Package`);
      } else {
        recommendedGeneratorModels.push(`EmoEma Mega-Power Industrial ${recommendedKva}kVA Diesel Center`);
        recommendedGeneratorModels.push(`Smart Gen Dual AMF Network Module`);
      }
    }

    return {
      totalRunningWatts,
      totalStartingWatts: totalStartingWithHighestSurge,
      recommendedKva,
      fuelConsumptionLitresPerHr,
      recommendedGeneratorModels,
    };
  }, [quantities]);

  const selectedAppliancesList = useMemo(() => {
    return POWER_APPLIANCES.filter((app) => (quantities[app.id] || 0) > 0);
  }, [quantities]);

  const triggerQuoteRequest = () => {
    if (results.recommendedKva === 0) return;
    
    const itemsList = selectedAppliancesList
      .map((app) => `${app.name} (Qty: ${quantities[app.id]})`)
      .join(", ");

    const text = `Hello EmoEma Technical Team. I used your interactive Power Sizer tool and designed a system for my medical center. Here are the parameters:
- Total Running Load: ${(results.totalRunningWatts / 1000).toFixed(2)} kW
- Total Simulated Peak Surge: ${(results.totalStartingWatts / 1000).toFixed(2)} kW
- Computed minimum backup rating: ${results.recommendedKva} kVA
- Equipment details: ${itemsList}
Please send me a formal quotation for the recommended ${results.recommendedKva} kVA silent diesel generator system and automated transfer switch (ATS) installation.`;
    
    onQuoteWithData(text);
  };

  // Safe estimation for cable wires and breaker values
  const systemBreakerRating = useMemo(() => {
    if (results.recommendedKva === 0) return "N/A";
    // Amps three phase approximate = kVA * 1.44 (at 400V)
    // Amps single phase approximate = kVA * 4.35 (at 230V)
    const ampsThreePhase = Math.ceil(results.recommendedKva * 1.44);
    if (results.recommendedKva < 20) {
      return `${Math.ceil(results.recommendedKva * 4.35)}A Single-Phase Circuit Breaker`;
    }
    return `${ampsThreePhase}A Three-Phase MCCB Industrial Breaker`;
  }, [results]);

  const recommendedCableSize = useMemo(() => {
    if (results.recommendedKva === 0) return "N/A";
    if (results.recommendedKva < 15) return "4mm² 3-core copper armored cable";
    if (results.recommendedKva <= 30) return "10mm² 4-core copper armored cable";
    if (results.recommendedKva <= 60) return "25mm² 4-core copper armored cable";
    if (results.recommendedKva <= 100) return "50mm² 4-core copper armored cable";
    return "95mm² 4-core heavy copper cable layout";
  }, [results]);

  const filteredAppliances = activeFilter === "all"
    ? POWER_APPLIANCES
    : POWER_APPLIANCES.filter((app) => app.category === activeFilter);

  return (
    <section 
      className="py-20 text-slate-800 relative overflow-hidden bg-white" 
      id="power-calculator"
    >
      {/* Real Background Image with mask overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-[0.08]"
        style={{ backgroundImage: `url(${powerBgSrc})` }} 
      />
      {/* Warm-light medical gradient cover to keep look cohesive and very bright */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/95 via-teal-50/90 to-white/95 opacity-90 pointer-events-none" />

      {/* Grid lines */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-teal-600/30 to-transparent"></div>
      <div className="absolute -bottom-10 -left-10 w-80 h-80 bg-teal-500/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute top-10 right-10 w-80 h-80 bg-orange-500/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        
        {/* Header Block Section */}
        <div className="max-w-3xl text-left mb-12">
          <span className="text-xs font-bold tracking-widest text-teal-700 uppercase block mb-2 font-mono">
            // Interactive Power Auditor
          </span>
          <h2 className="font-sans font-extrabold text-3xl md:text-4xl text-slate-900 tracking-tight">
            Medical Facilities Generator Sizing & Sizer
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
            Standard generators fail under the massive localized starting surge of incubators or laboratory centrifuges. Use our technical tool to compute your cumulative electrical load and estimate recommended kVA capacity.
          </p>
        </div>

        {/* Workspace Dual Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Panel: Appliance selection list */}
          <div className="lg:col-span-12 xl:col-span-7 bg-white/95 border border-slate-200 rounded-2xl p-5 md:p-6 space-y-6 shadow-sm">
            
            <div className="flex flex-wrap items-center gap-2 pb-4 border-b border-slate-100 justify-start">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveFilter(cat.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold cursor-pointer transition-all duration-150 ${
                    activeFilter === cat.id
                      ? "bg-teal-600 text-white shadow-sm shadow-teal-500/10"
                      : "bg-slate-100 text-slate-600 hover:text-slate-800 hover:bg-slate-200"
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Grid of Appliance items */}
            <div className="space-y-3 max-h-[460px] overflow-y-auto pr-2 custom-scrollbar">
              {filteredAppliances.map((app) => {
                const qty = quantities[app.id] || 0;
                return (
                  <div
                    key={app.id}
                    className={`p-3.5 rounded-xl border transition-all duration-200 flex justify-between items-center gap-4 ${
                      qty > 0
                        ? "bg-teal-50/70 border-teal-200 text-teal-900 shadow-sm"
                        : "bg-white border-slate-200 text-slate-500 hover:border-slate-350"
                    }`}
                  >
                    <div className="text-left">
                      <div className="flex items-center gap-2">
                        <span className={`text-xs font-bold ${qty > 0 ? "text-teal-850" : "text-slate-800"}`}>
                          {app.name}
                        </span>
                        <span className={`text-[9px] px-1.5 py-0.5 rounded font-mono font-bold uppercase ${
                          qty > 0 ? "bg-teal-200/50 text-teal-800" : "bg-slate-100 text-slate-500"
                        }`}>
                          {app.category}
                        </span>
                      </div>
                      <div className="flex gap-4 mt-1 text-[11px] text-slate-500 font-mono">
                        <span>Running: <strong className="text-slate-700 font-semibold">{app.runningWatts}W</strong></span>
                        <span>Surge Peak: <strong className="text-slate-700 font-semibold">{app.startingWatts}W</strong></span>
                      </div>
                    </div>

                    {/* Quantity selectors */}
                    <div className="flex items-center gap-2.5 flex-shrink-0">
                      <button
                        onClick={() => handleQtyChange(app.id, -1)}
                        className="w-7 h-7 rounded-lg bg-teal-50 hover:bg-teal-100 text-teal-800 text-xs font-extrabold leading-none flex items-center justify-center transition-colors hover:scale-105 active:scale-95 cursor-pointer border border-teal-200/30"
                        disabled={qty === 0}
                      >
                        -
                      </button>
                      <span className="w-6 text-center text-xs font-bold font-mono text-slate-900">
                        {qty}
                      </span>
                      <button
                        onClick={() => handleQtyChange(app.id, 1)}
                        className="w-7 h-7 rounded-lg bg-teal-600 hover:bg-teal-700 text-white text-xs font-extrabold leading-none flex items-center justify-center transition-colors hover:scale-105 active:scale-95 cursor-pointer"
                      >
                        +
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Audit Status indicator */}
            <div className="flex justify-between items-center text-xs text-slate-500 pt-3 border-t border-slate-100">
              <span>Selected Appliance Types: <strong className="text-slate-800 font-mono font-bold">{selectedAppliancesList.length}</strong></span>
              <button
                onClick={resetQuantities}
                className="text-[11px] font-bold text-orange-600 hover:text-orange-700 transition-colors cursor-pointer"
              >
                Clear Selections
              </button>
            </div>

          </div>

          {/* Right Panel: Computation and Output feedback */}
          <div className="lg:col-span-12 xl:col-span-5 space-y-6">
            
            {/* Main kVA display Card */}
            <div className="bg-white border border-teal-200 rounded-2xl p-6 relative overflow-hidden shadow-xl">
              <div className="absolute top-0 right-0 w-24 h-24 bg-teal-500/10 rounded-full blur-xl pointer-events-none"></div>

              <div className="flex justify-between items-start mb-6">
                <div className="text-left">
                  <p className="text-[10px] text-teal-700 font-bold uppercase tracking-widest font-mono">
                    Estimated Generator Size
                  </p>
                  <h3 className="text-3xl font-sans font-extrabold text-slate-940 tracking-tight mt-1 text-teal-950">
                    {results.recommendedKva > 0 ? `${results.recommendedKva} kVA` : "0.0 kVA"}
                  </h3>
                </div>
                <div className="p-2.5 bg-teal-50 rounded-xl text-teal-600 border border-teal-100">
                  <Calculator className="w-6 h-6" />
                </div>
              </div>

              {/* Stack of loads detail */}
              <div className="space-y-3 pt-4 border-t border-teal-100">
                <div className="flex justify-between text-xs text-slate-600">
                  <span>Continuous Running Power:</span>
                  <span className="font-mono text-slate-900 font-bold">{(results.totalRunningWatts / 1000).toFixed(2)} kW</span>
                </div>
                <div className="flex justify-between text-xs text-slate-600">
                  <span>Calculated In-Rush Peak Surge:</span>
                  <span className="font-mono text-slate-900 font-bold">{(results.totalStartingWatts / 1000).toFixed(2)} kW</span>
                </div>
                <div className="flex justify-between text-xs text-slate-600">
                  <span>Estimated fuel consumption:</span>
                  <span className="font-mono text-teal-700 font-bold">{results.fuelConsumptionLitresPerHr} L / Hr</span>
                </div>
              </div>

              {/* Wire details secondary specs */}
              {results.recommendedKva > 0 && (
                <div className="mt-6 pt-5 border-t border-teal-100 text-left bg-teal-50/55 p-4 rounded-xl border border-teal-100 space-y-2.5">
                  <p className="text-[10px] text-orange-600 font-bold uppercase font-mono tracking-wider">
                    Required Electrical Safety Standards:
                  </p>
                  <div className="grid grid-cols-1 gap-2 text-[11px] text-slate-700 font-bold">
                    <span className="flex items-center gap-1.5">
                      <Cpu className="w-3.5 h-3.5 text-orange-500 flex-shrink-0" />
                      <span>Breaker: <strong className="text-slate-900 font-bold">{systemBreakerRating}</strong></span>
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Table className="w-3.5 h-3.5 text-teal-600 flex-shrink-0" />
                      <span>Copper Wire: <strong className="text-slate-900 font-bold">{recommendedCableSize}</strong></span>
                    </span>
                  </div>
                </div>
              )}

              {/* Request quotation dynamic CTA */}
              <button
                onClick={triggerQuoteRequest}
                disabled={results.recommendedKva === 0}
                className={`w-full mt-6 py-3 px-4 rounded-xl text-xs font-extrabold transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer ${
                  results.recommendedKva > 0
                    ? "bg-teal-600 text-white hover:bg-teal-700 shadow-md shadow-teal-600/10 active:scale-98"
                    : "bg-slate-150 text-slate-400 cursor-not-allowed"
                }`}
              >
                <span>Request Quotation with Sizer Data</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

            </div>

            {/* Quick Informational Guide callout */}
            <div className="p-5 bg-amber-50/80 border border-amber-200 rounded-2xl text-left space-y-3">
              <h4 className="text-xs font-bold text-amber-900 uppercase tracking-widest font-mono flex items-center gap-1.5">
                <ShieldAlert className="w-4 h-4 text-orange-600" />
                <span>Why Sequence Startup in Clinics?</span>
              </h4>
              <p className="text-xs text-amber-800 leading-relaxed font-sans">
                When grid power fails in Uganda, an automatic transfer switch (ATS) signals the generator. Starting all heavy clinical inductive motor pumps (like large sterilizers or diagnostics air conditioners) simultaneously is dangerous and will stall the generator engine.
              </p>
              <div className="h-px bg-amber-200"></div>
              <p className="text-xs text-amber-800 leading-relaxed font-sans">
                <strong className="text-teal-800 font-bold">EmoEma technical tip:</strong> Turn your heavy devices on in structured, sequenced order—from largest running watts down to smallest—to reduce in-rush load.
              </p>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
