/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { Play, Sparkles, Shield, Clock, Flame, CheckCircle2 } from "lucide-react";

interface HeroProps {
  setActiveTab: (tab: string) => void;
  openBookingModal: () => void;
}

export default function Hero({ setActiveTab, openBookingModal }: HeroProps) {
  // Utilizing the actual path returned by the image generation tool
  const heroImageSrc = "/src/assets/images/biomedical_hero_1780057148827.png";
  const heroBgSrc = "/src/assets/images/hero_bg_light_1780057927875.png";

  return (
    <div className="relative overflow-hidden bg-slate-50 text-slate-800 min-h-[85vh] flex items-center">
      {/* Real Background Image with mask overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20 pointer-events-none"
        style={{ backgroundImage: `url(${heroBgSrc})` }} 
      />
      <div className="absolute inset-0 bg-gradient-to-r from-teal-50/90 via-white/80 to-teal-50/50 opacity-95 pointer-events-none" />

      {/* Abstract Grid background */}
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none bg-[radial-gradient(#0d9488_1px,transparent_1px)] [background-size:16px_16px]"></div>
      
      {/* Glow Circles decorative */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 py-16 lg:py-24 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column Text & CTAs */}
          <div className="lg:col-span-7 flex flex-col items-start text-left space-y-6">
            
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-teal-600/10 border border-teal-600/20 rounded-full text-teal-800 text-xs font-semibold uppercase tracking-wider backdrop-blur-sm">
              <Sparkles className="w-3.5 h-3.5 text-teal-600" />
              <span>Kampala's Certified Tech dispatchers</span>
            </div>

            <h1 className="font-sans font-extrabold text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl text-slate-900 tracking-tight leading-[1.1]">
              Ensuring <span className="text-teal-600">Precision</span> & <span className="text-orange-600">Up-time</span> for Healthcare Facilities
            </h1>

            <p className="text-sm sm:text-base text-slate-600 max-w-2xl leading-relaxed">
              EmoEma Biomedical Services provides premium biomedical engineering services, preventive maintenance, repair calibrations, and medical equipment supply. Based in <span className="text-slate-950 font-semibold">Kireka – Kamuli Road, Kampala, Uganda</span>, we are dedicated to supporting life-critical systems.
            </p>

            <div className="flex flex-col sm:flex-row w-full sm:w-auto gap-4 pt-2">
              <button
                onClick={openBookingModal}
                className="bg-teal-600 hover:bg-teal-700 active:scale-95 text-white px-8 py-3.5 rounded-lg text-sm font-extrabold shadow-lg shadow-teal-500/20 transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Request Technical Service</span>
                <span className="w-1.5 h-1.5 bg-white rounded-full animate-ping"></span>
              </button>
              <button
                onClick={() => setActiveTab("calculator")}
                className="bg-white hover:bg-slate-100 hover:text-slate-900 border border-slate-200 active:scale-95 text-slate-700 px-8 py-3.5 rounded-lg text-sm font-bold transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer shadow-sm"
              >
                <span>Size Your Backup Generator</span>
              </button>
            </div>

            {/* Quick Micro-Credentials List */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 pt-6 w-full border-t border-slate-200">
              <div className="flex gap-2.5 items-start">
                <div className="p-1.5 bg-teal-500/10 rounded text-teal-600 mt-0.5">
                  <Shield className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-sans text-xs font-bold text-slate-800">Total Calibration</h4>
                  <p className="text-[11px] text-slate-500">NIST traceable precision standards</p>
                </div>
              </div>
              <div className="flex gap-2.5 items-start">
                <div className="p-1.5 bg-orange-550/10 rounded text-orange-600 mt-0.5">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-sans text-xs font-bold text-slate-800">Rapid Response</h4>
                  <p className="text-[11px] text-slate-500">Emergency breakdown dispatches</p>
                </div>
              </div>
              <div className="flex gap-2.5 items-start col-span-2 md:col-span-1">
                <div className="p-1.5 bg-teal-550/10 rounded text-teal-600 mt-0.5">
                  <Flame className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-sans text-xs font-bold text-slate-800">Power Solutions</h4>
                  <p className="text-[11px] text-slate-500">Clinical soundproof generators</p>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column Frame Image Layout */}
          <div className="lg:col-span-5 relative flex justify-center items-center mt-8 lg:mt-0">
            <div className="relative group">
              {/* Outer decorative glowing ring container */}
              <div className="absolute -inset-1.5 bg-gradient-to-r from-teal-500 to-orange-500 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200 animate-pulse"></div>
              
              {/* Image Frame */}
              <div className="relative bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xl p-2 select-none">
                <img
                  src={heroImageSrc}
                  alt="EmoEma Biomedical Engineering Laboratory"
                  referrerPolicy="no-referrer"
                  className="rounded-xl w-full max-w-[480px] h-auto object-cover aspect-[4/3] transform transition duration-500 scale-100 hover:scale-[1.02]"
                  onError={(e) => {
                    // Fallback in case of absolute file path issues in dev env
                    e.currentTarget.src = "https://picsum.photos/seed/biomedical/800/600";
                  }}
                />
                
                {/* Embedded floating trust badges */}
                <div className="absolute bottom-5 left-5 bg-white/95 backdrop-blur-md rounded-xl p-3 border border-teal-200 flex items-center gap-2.5 shadow-lg max-w-[220px]">
                  <div className="w-9 h-9 rounded-full bg-teal-600 flex items-center justify-center text-white font-sans font-black text-xs shadow-sm">
                    99%
                  </div>
                  <div className="text-left">
                    <p className="text-[10px] uppercase font-bold text-teal-700 tracking-wider">Device Up-time</p>
                    <p className="text-[11px] text-slate-600">Guaranteed by continuous preventative care</p>
                  </div>
                </div>

                <div className="absolute top-5 right-5 bg-white/95 backdrop-blur-md rounded-xl p-3 border border-orange-200 flex items-center gap-2 shadow-lg">
                  <CheckCircle2 className="w-4 h-4 text-orange-600" />
                  <span className="text-[11px] font-bold text-slate-800">Certified Spare Hub</span>
                </div>

              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
