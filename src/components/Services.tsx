/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { EMOEMA_SERVICES } from "../data/companyData";
import { ServiceCategory, ServiceItem } from "../types";
import { Wrench, CalendarRange, Activity, Compass, ShoppingBag, Zap, ArrowRight, CheckCircle2, AlertTriangle, ShieldCheck } from "lucide-react";

interface ServicesProps {
  onBookService: (serviceName: string) => void;
}

export default function Services({ onBookService }: ServicesProps) {
  const [selectedCategory, setSelectedCategory] = useState<ServiceCategory>(ServiceCategory.BIOMEDICAL);
  const [expandedServiceId, setExpandedServiceId] = useState<string | null>(null);

  // Icon chooser helper
  const renderIcon = (iconName: string, css: string) => {
    switch (iconName) {
      case "Wrench":
        return <Wrench className={css} />;
      case "CalendarRange":
        return <CalendarRange className={css} />;
      case "Activity":
        return <Activity className={css} />;
      case "Compass":
        return <Compass className={css} />;
      case "ShoppingBag":
        return <ShoppingBag className={css} />;
      case "Zap":
        return <Zap className={css} />;
      default:
        return <Activity className={css} />;
    }
  };

  const filteredServices = EMOEMA_SERVICES.filter(
    (s) => s.category === selectedCategory
  );

  return (
    <section className="py-20 bg-white" id="services">
      <div className="max-w-7xl mx-auto px-4">
        
        {/* Header Block */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
          <div className="text-left max-w-2xl">
            <span className="text-xs font-bold tracking-widest text-teal-600 uppercase block mb-2 font-mono">
              // Engineering Specialties
            </span>
            <h2 className="font-sans font-extrabold text-3xl md:text-4xl text-slate-900 tracking-tight">
              Biomedical Excellence & Resilient Site Backup
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-2">
              From continuous diagnostics recalibrations to heavy hospital power grid automated transfers, our certified team keeps life-saving equipment ticking.
            </p>
          </div>

          {/* Toggle Tabs */}
          <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200">
            <button
              onClick={() => {
                setSelectedCategory(ServiceCategory.BIOMEDICAL);
                setExpandedServiceId(null);
              }}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all duration-200 flex items-center gap-2 cursor-pointer ${
                selectedCategory === ServiceCategory.BIOMEDICAL
                  ? "bg-slate-900 text-white shadow-sm"
                  : "text-slate-600 hover:text-slate-950"
              }`}
            >
              <Activity className="w-3.5 h-3.5" />
              <span>Biomedical Engineering</span>
            </button>
            <button
              onClick={() => {
                setSelectedCategory(ServiceCategory.POWER);
                setExpandedServiceId(null);
              }}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all duration-200 flex items-center gap-2 cursor-pointer ${
                selectedCategory === ServiceCategory.POWER
                  ? "bg-slate-900 text-white shadow-sm"
                  : "text-slate-600 hover:text-slate-950"
              }`}
            >
              <Zap className="w-3.5 h-3.5" />
              <span>Power Solutions</span>
            </button>
          </div>
        </div>

        {/* Services Cards List layout (Grid) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-start">
          {filteredServices.map((service) => {
            const isExpanded = expandedServiceId === service.id;
            return (
              <div
                key={service.id}
                className={`bg-white rounded-2xl border transition-all duration-300 overflow-hidden text-left ${
                  isExpanded
                    ? "border-teal-500 shadow-lg shadow-teal-5 fly-scale"
                    : "border-slate-100 shadow-sm hover:shadow-md hover:border-slate-200"
                }`}
              >
                {/* Header info of service */}
                <div className="p-6">
                  <div className="flex justify-between items-start gap-4">
                    <div className={`p-3 rounded-xl ${isExpanded ? "bg-teal-500 text-slate-900" : "bg-slate-100 text-slate-800"}`}>
                      {renderIcon(service.iconName, "w-6 h-6")}
                    </div>
                  </div>

                  <h3 className="font-sans font-extrabold text-base text-slate-900 tracking-tight mt-5">
                    {service.title}
                  </h3>

                  <p className="text-xs text-slate-500 mt-2.5 leading-relaxed">
                    {service.description}
                  </p>

                  {/* Expansion Area */}
                  {isExpanded ? (
                    <div className="mt-6 pt-6 border-t border-slate-100 space-y-4 animate-in fade-in slide-in-from-top-2 duration-300">
                      <div>
                        <h4 className="text-xs font-extrabold text-slate-800 uppercase tracking-wider mb-2 font-mono">
                          Detailed Scope:
                        </h4>
                        <p className="text-xs text-slate-600 leading-relaxed">
                          {service.longDescription}
                        </p>
                      </div>

                      <div>
                        <h4 className="text-xs font-extrabold text-slate-800 uppercase tracking-wider mb-2 font-mono">
                          Key Advantages:
                        </h4>
                        <ul className="space-y-2">
                          {service.benefits.map((b, bIdx) => (
                            <li key={bIdx} className="flex gap-2 items-start text-xs text-slate-600 leading-relaxed">
                              <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 mt-0.5 flex-shrink-0" />
                              <span>{b}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ) : null}

                  {/* Operational Footer action bar */}
                  <div className="mt-6 pt-5 border-t border-slate-50 flex items-center justify-between gap-2">
                    <button
                      onClick={() => setExpandedServiceId(isExpanded ? null : service.id)}
                      className="text-xs font-bold text-slate-800 hover:text-teal-600 transition-colors flex items-center gap-1 cursor-pointer"
                    >
                      <span>{isExpanded ? "Show overview" : "View technical details"}</span>
                      <ArrowRight className={`w-3.5 h-3.5 transition-transform ${isExpanded ? "-rotate-90 text-teal-600" : ""}`} />
                    </button>

                    <button
                      onClick={() => onBookService(service.title)}
                      className="px-3 py-1.5 rounded-lg bg-teal-50 hover:bg-teal-100 text-teal-900 text-xs font-bold transition-colors cursor-pointer"
                    >
                      Book Now
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Dynamic support warning box banner */}
        <div className="mt-12 bg-orange-50 border border-orange-100 rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-4 text-left">
          <div className="flex items-start gap-3.5">
            <div className="p-2 bg-orange-100 rounded-xl text-orange-600 flex-shrink-0">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-extrabold text-slate-900">Are you encountering an urgent medical device failure?</h4>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                If life support machinery, diagnostics boards, or blood bank coolers are offline, call the EmoEma priority hotline immediately at <a href="tel:+256764249992" className="text-orange-700 font-extrabold underline hover:text-orange-800">+256 764 249992</a>. Our on-duty Kampala biomedical dispatcher responds across Kampala.
              </p>
            </div>
          </div>
          <div className="flex gap-2 flex-shrink-0 w-full md:w-auto mt-2 md:mt-0 justify-end">
            <a
              href="tel:+256764249992"
              className="w-full md:w-auto text-center px-4 py-2.5 rounded-xl bg-orange-600 hover:bg-orange-700 text-white text-xs font-bold shadow-md shadow-orange-100 transition-colors cursor-pointer"
            >
              Call Hotline
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
