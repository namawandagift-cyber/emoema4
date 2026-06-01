/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { Phone, Mail, MapPin, Menu, X, Activity, Wrench, ShieldCheck } from "lucide-react";

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  openBookingModal: () => void;
}

export default function Header({ activeTab, setActiveTab, openBookingModal }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { id: "hero", label: "Home" },
    { id: "services", label: "Specialty Services" },
    { id: "calculator", label: "Power Sizer" },
    { id: "catalog", label: "Equipment Supply" },
    { id: "about", label: "About EmoEma" },
    { id: "contact", label: "Contact & Support" }
  ];

  return (
    <header className="w-full relative z-50">
      {/* Top Banner Contact Bar */}
      <div className="bg-teal-950 text-teal-100/90 text-xs py-2 px-4 border-b border-teal-900 transition-all duration-300">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-2">
          <div className="flex flex-wrap justify-center md:justify-start items-center gap-4 text-[11px] sm:text-xs">
            <span className="flex items-center gap-1.5 hover:text-orange-400 transition-colors">
              <MapPin className="w-3.5 h-3.5 text-orange-500" />
              <span>Kireka – Kamuli Road, Kampala, Uganda</span>
            </span>
            <span className="hidden sm:inline text-teal-800">|</span>
            <a href="tel:+256764249992" className="flex items-center gap-1.5 hover:text-teal-400 transition-colors">
              <Phone className="w-3.5 h-3.5 text-teal-400" />
              <span>+256 764 249992</span>
            </a>
            <span className="hidden sm:inline text-teal-800">|</span>
            <a href="mailto:emoemaenterprisesltd@gmail.com" className="flex items-center gap-1.5 hover:text-teal-400 transition-colors">
              <Mail className="w-3.5 h-3.5 text-teal-400" />
              <span>emoemaenterprisesltd@gmail.com</span>
            </a>
          </div>
          <div className="flex items-center gap-3 text-[11px] text-slate-400">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-teal-400" />
              <span>Uganda Biomedical Association Affiliated</span>
            </span>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <nav
        className={`w-full transition-all duration-300 ${
          isScrolled
            ? "fixed top-0 left-0 bg-white shadow-md border-b border-slate-100 py-3"
            : "relative bg-white border-b border-slate-100 py-4"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
          {/* Brand Logo */}
          <div
            className="flex items-center gap-2.5 cursor-pointer selection:bg-transparent"
            onClick={() => setActiveTab("hero")}
          >
            <div className="bg-teal-500 text-white rounded-lg p-2 flex items-center justify-center shadow-md shadow-teal-100 transition-all duration-300 hover:scale-105">
              <Activity className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-1">
                <span className="font-sans font-extrabold text-lg tracking-tight text-slate-900 leading-none">
                  EmoEma
                </span>
                <span className="font-sans font-semibold text-xs py-0.5 px-1.5 rounded bg-orange-100 text-orange-700 font-mono scale-[0.85] tracking-wider uppercase">
                  Med
                </span>
              </div>
              <span className="font-sans text-[10px] text-slate-500 font-medium tracking-widest uppercase block mt-0.5">
                Biomedical Services
              </span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-8">
            <div className="flex items-center gap-1 bg-slate-50/80 p-1 rounded-full border border-slate-100">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all duration-200 cursor-pointer ${
                    activeTab === item.id
                      ? "bg-teal-600 text-white shadow-sm shadow-teal-500/10"
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            <button
              onClick={openBookingModal}
              className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg text-xs font-bold shadow-md shadow-teal-100 transition-all duration-200 flex items-center gap-2 cursor-pointer"
            >
              <Wrench className="w-3.5 h-3.5" />
              <span>Book Engineer</span>
            </button>
          </div>

          {/* Mobile Menu Trigger */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={openBookingModal}
              className="bg-teal-600 hover:bg-teal-700 text-white px-3 py-1.5 rounded-lg text-xs font-bold transition-all duration-200 flex items-center gap-1.5"
            >
              <Wrench className="w-3.5 h-3.5" />
              <span className="xs:inline hidden">Book Support</span>
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
              aria-label="Toggle navigation menu"
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Panel */}
        {isOpen && (
          <div className="lg:hidden absolute top-full left-0 w-full bg-white border-b border-slate-200 shadow-xl py-4 px-4 z-40 animate-in fade-in slide-in-from-top-3 duration-200">
            <div className="flex flex-col gap-2">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setIsOpen(false);
                  }}
                  className={`w-full text-left px-4 py-3 rounded-lg text-xs font-bold transition-all duration-200 ${
                    activeTab === item.id
                      ? "bg-teal-50 text-teal-800"
                      : "text-slate-700 hover:bg-slate-50"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
            <div className="border-t border-slate-100 mt-4 pt-4 flex flex-col gap-2">
              <div className="text-xs text-slate-500 px-4">
                <p className="font-semibold text-slate-800 mb-1">EmoEma Kampala Office</p>
                <p>Kireka – Kamuli Road</p>
                <p className="mt-1 font-mono text-teal-600 font-bold">+256 764 249992</p>
              </div>
            </div>
          </div>
        )}
      </nav>
      {/* Spacer when scrolled & sticky navigation element */}
      {isScrolled && <div className="h-[53px] lg:h-[61px]" />}
    </header>
  );
}
