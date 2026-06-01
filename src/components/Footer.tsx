/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { Activity, ShieldCheck, Heart, Facebook, Linkedin, Mail, Phone, MapPin } from "lucide-react";

interface FooterProps {
  setActiveTab: (tab: string) => void;
}

export default function Footer({ setActiveTab }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-neutral-900 text-zinc-400 border-t border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 py-12 md:py-16">
        
        {/* Main Grid content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-12 text-left">
          
          {/* Logo & coordinates column */}
          <div className="lg:col-span-5 space-y-5">
            <div className="flex items-center gap-2.5">
              <div className="bg-teal-600 text-white rounded-lg p-2.5 flex items-center justify-center shadow-md">
                <Activity className="w-5 h-5 text-white" />
              </div>
              <div>
                <span className="font-sans font-extrabold text-base tracking-tight text-white block">
                  EmoEma Biomedical
                </span>
                <span className="text-[10px] text-teal-400 font-semibold uppercase tracking-widest block font-mono">
                  Healthcare engineering excellence
                </span>
              </div>
            </div>

            <p className="text-xs text-zinc-400 max-w-sm leading-relaxed font-sans">
              EmoEma Biomedical Services is a professional engineering enterprise based in Kireka – Kamuli Road, Kampala, Uganda. We supply calibration, installation, board repairs, preventive care, and diesel generator sizing layouts.
            </p>

            <div className="space-y-2.5 pt-2">
              <div className="flex items-center gap-2 text-xs text-zinc-450">
                <MapPin className="w-4 h-4 text-teal-600 flex-shrink-0" />
                <span>Kireka – Kamuli Road, Kampala, Uganda</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-zinc-450">
                <Phone className="w-4 h-4 text-teal-600 flex-shrink-0" />
                <a href="tel:+256764249992" className="hover:text-white transition-colors font-semibold">+256 764 249992</a>
              </div>
              <div className="flex items-center gap-2 text-xs text-zinc-450">
                <Mail className="w-4 h-4 text-teal-600 flex-shrink-0" />
                <a href="mailto:emoemaenterprisesltd@gmail.com" className="hover:text-white transition-colors break-all font-semibold">emoemaenterprisesltd@gmail.com</a>
              </div>
            </div>

            {/* Social Media handles */}
            <div className="pt-2">
              <h5 className="text-[10px] text-zinc-450 font-mono font-bold uppercase tracking-widest mb-2">Connect With EmoEma</h5>
              <div className="flex items-center gap-2.5">
                <a 
                  href="https://facebook.com/share/g/EmoEmaBiomedical/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="p-2 bg-neutral-800 hover:bg-teal-600 hover:text-white rounded-lg transition-all duration-150 text-zinc-300"
                  aria-label="Facebook Page"
                >
                  <Facebook className="w-4 h-4" />
                </a>
                <a 
                  href="https://linkedin.com/company/emoema-biomedical" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="p-2 bg-neutral-800 hover:bg-teal-600 hover:text-white rounded-lg transition-all duration-150 text-zinc-300"
                  aria-label="LinkedIn Profile"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
                <a 
                  href="https://wa.me/256764249992" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="p-2 bg-neutral-800 hover:bg-teal-600 hover:text-white rounded-lg transition-all duration-150 text-zinc-300 shadow-sm"
                  aria-label="WhatsApp Dispatcher"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M12.031 6.172c-2.32 0-4.207 1.887-4.207 4.207 0 .584.119 1.14.331 1.642L7.307 15l3.123-.815c.48.2 1.009.309 1.601.309 2.32 0 4.207-1.887 4.207-4.207 0-2.32-1.887-4.207-4.207-4.207zm2.525 5.92c-.104.168-.415.244-.664.135-.145-.064-.616-.215-1.173-.711-.433-.386-.725-.863-.811-1.01-.086-.147-.009-.226.064-.299.066-.066.147-.171.221-.257.073-.086.098-.147.147-.245.049-.098.024-.184-.012-.257-.037-.073-.331-.796-.453-1.09-.119-.288-.242-.248-.331-.253-.086-.005-.184-.005-.282-.005-.098 0-.257.037-.392.184-.135.147-.514.502-.514 1.224 0 .722.526 1.419.599 1.517.073.098 1.034 1.579 2.507 2.214.351.151.624.242.837.31.352.112.673.096.927.058.283-.042.871-.356.994-.7.123-.344.123-.639.086-.7-.037-.061-.135-.098-.239-.147zM12 0c-6.627 0-12 5.373-12 12 0 2.112.547 4.095 1.507 5.827L0 24l6.33-1.661C7.994 23.298 9.927 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm.014 21.84c-1.854 0-3.673-.491-5.263-1.422l-.377-.223-3.906 1.025 1.042-3.806-.245-.391c-1.021-1.623-1.562-3.498-1.561-5.42C1.708 6.335 6.33 1.71 12.016 1.71c2.753 0 5.342 1.072 7.29 3.024 1.948 1.951 3.019 4.544 3.016 7.298-.006 5.679-4.629 10.302-10.308 10.3025z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Quick links columns */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-bold text-zinc-200 uppercase tracking-wider font-mono">Quick Navigation</h4>
            <div className="flex flex-col gap-2 text-xs">
              <button onClick={() => setActiveTab("hero")} className="text-left hover:text-white transition-colors cursor-pointer">
                Home Entryway
              </button>
              <button onClick={() => setActiveTab("services")} className="text-left hover:text-white transition-colors cursor-pointer">
                Specialty Engineering
              </button>
              <button onClick={() => setActiveTab("calculator")} className="text-left hover:text-white transition-colors cursor-pointer">
                Interactive Power Sizer
              </button>
              <button onClick={() => setActiveTab("catalog")} className="text-left hover:text-white transition-colors cursor-pointer">
                Equipment Supply Catalog
              </button>
            </div>
          </div>

          {/* Technical Compliance columns */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-xs font-bold text-zinc-200 uppercase tracking-wider font-mono bg-neutral-800 py-1 px-2.5 rounded border border-neutral-700 flex items-center gap-1.5 justify-start">
              <ShieldCheck className="w-3.5 h-3.5 text-teal-400" />
              <span>Sourcing Standardizations</span>
            </h4>
            <p className="text-xs text-zinc-500 leading-relaxed font-sans">
              All tools, calibrations, and spare kits utilized by EmoEma Biomedical are verified compliant with International Medical Standards (ISO 13485) and local Uganda National Bureau of Standards frameworks.
            </p>
            <p className="text-[10px] text-zinc-500 italic">
              Registered Registration No. 800200045231
            </p>
          </div>

        </div>

        {/* Divider bar */}
        <div className="border-t border-neutral-800 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-center text-xs text-zinc-500">
          <div>
            <p>© {currentYear} EmoEma Biomedical Services. All Rights Reserved.</p>
          </div>
          <div className="flex items-center gap-1 justify-center">
            <span>Delighting clients across Uganda with professional</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
            <span>integrity</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
