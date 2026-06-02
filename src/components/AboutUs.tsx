/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { ShieldCheck, HeartPulse, Building2, MapPin, Phone, Mail, Award, Users } from "lucide-react";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      [elemName: string]: any;
    }
  }
}

export default function AboutUs() {
  const aboutBgSrc = "/src/assets/images/calibration_details_1780057964615.png";
  const values = [
    {
      icon: <Award className="w-6 h-6 text-orange-500" />,
      title: "Technical Excellence",
      description: "Our engineers stay at the cutting edge of biological and electrical technology. We undergo regular training on medical electronics, pneumatics, radiology signals, and microfluidics."
    },
    {
      icon: <Users className="w-6 h-6 text-teal-500" />,
      title: "Long-Term Partnerships",
      description: "We do not believe in one-off fixes. We support clinics and general hospitals over decades to audit inventories, plan capital acquisitions, and verify regulatory clinical compliance."
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-teal-500" />,
      title: "Strict Professional Ethics",
      description: "Patient diagnostic safety rests directly on our calibration tolerances. Our team guarantees absolute transparency, honest servicing estimates, and meticulous calibration certification protocols."
    },
    {
      icon: <HeartPulse className="w-6 h-6 text-orange-500" />,
      title: "Fast Response Dispatch",
      description: "An electrical power outage or an ICU monitor crash demands immediate action. Our rapid response system offers specialized emergency support across Kampala and Central Uganda."
    }
  ];

  return (
    <section className="py-20 bg-slate-50 relative overflow-hidden" id="about-us">
      {/* Decorative Accent Background Circles */}
      <div className="absolute top-2/3 right-1/4 w-72 h-72 bg-teal-200/20 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        
        {/* Modern Section Header */}
        <div className="max-w-3xl text-left mb-16">
          <span className="text-xs font-bold tracking-widest text-teal-600 uppercase block mb-2 font-mono">
            // Who We Are
          </span>
          <h2 className="font-sans font-extrabold text-3xl md:text-4xl text-slate-900 tracking-tight">
            Supporting Uganda's Healthcare Institutions with Professional Technical Integrity
          </h2>
          <div className="h-1.5 w-20 bg-orange-500 mt-4 rounded-full"></div>
        </div>

        {/* Big Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch mb-20">
          
          {/* Main Story Column */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
            <div className="prose prose-slate max-w-none text-slate-600 space-y-5 text-sm sm:text-base leading-relaxed">
              <p className="text-slate-800 font-medium">
                EmoEma Biomedical Services is a premier healthcare technology solutions and professional medical engineering company based on <strong className="text-slate-950">Kireka – Kamuli Road, Kampala, Uganda</strong>.
              </p>
              <p>
                Our core mandate is simple yet crucial: to bridge the gap between complex technological specifications and direct patient outcome safety. We recognize that medical instruments are only as reliable as their last calibration. We deliver complete, robust preventive care packages, multi-parameter testing, component repair, and electrical power solutions.
              </p>
              <p>
                In addition to medical devices, EmoEma is highly specialized in planning and implementing medical and industrial diesel generator frameworks. This safeguards laboratories, vaccine storage centers, and surgical suites from grid instability, supporting uninterrupted clinical excellence.
              </p>
            </div>

            {/* Quick Stat Blocks Row */}
            <div className="grid grid-cols-2 xs:grid-cols-3 gap-4 pt-4">
              <div className="p-4 bg-white rounded-xl border border-slate-100 shadow-sm text-left">
                <span className="block text-2xl font-extrabold text-teal-600 font-mono">24/7</span>
                <span className="text-[11px] text-slate-500 font-bold uppercase tracking-wider block mt-1">
                  On-Call Support
                </span>
              </div>
              <div className="p-4 bg-white rounded-xl border border-slate-100 shadow-sm text-left">
                <span className="block text-2xl font-extrabold text-orange-500 font-mono">4-Hour</span>
                <span className="text-[11px] text-slate-500 font-bold uppercase tracking-wider block mt-1">
                  Local Dispatch limit
                </span>
              </div>
              <div className="p-4 bg-white rounded-xl border border-slate-100 shadow-sm text-left col-span-2 xs:col-span-1">
                <span className="block text-2xl font-extrabold text-teal-600 font-mono">100%</span>
                <span className="text-[11px] text-slate-500 font-bold uppercase tracking-wider block mt-1">
                  Traceable Calibration
                </span>
              </div>
            </div>

          </div>

          {/* Location & Quick Contact card */}
         <div
  className="lg:col-span-5 rounded-2xl p-6 md:p-8 flex flex-col justify-between shadow-lg relative border border-teal-200/50 overflow-hidden text-slate-800"
  style={{
    backgroundImage: `
      linear-gradient(to bottom, rgba(222, 154, 154, 0.94), rgba(179, 249, 233, 0.96)),
      url('/images/hero_bg_light_1780057927875.png')
    `,
    backgroundSize: "cover",
    backgroundPosition: "center"
  }}
>
            <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/5 rounded-full blur-2xl pointer-events-none"></div>
            
            <div className="relative z-10 space-y-6">
              <div className="flex items-center gap-2">
                <Building2 className="w-5 h-5 text-teal-600" />
                <h3 className="font-sans font-extrabold text-lg tracking-tight text-slate-900 font-sans">EmoEma Corporate Headquarters</h3>
              </div>
              
              <p className="text-xs text-slate-600 leading-relaxed font-sans">
                Our main offices and diagnostic calibration labs are centrally positioned in Kampala, allowing our engineers to quickly dispatch parts and personnel across major highways.
              </p>

              <div className="space-y-4 pt-4 border-t border-teal-100">
                <div className="flex items-start gap-3">
                  <div className="p-1.5 bg-teal-50 text-teal-600 rounded mt-0.5 shadow-sm">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-slate-500">Physical Address</h5>
                    <p className="text-xs text-slate-800 font-bold mt-0.5">Kireka – Kamuli Road, Kampala, Uganda</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-1.5 bg-teal-50 text-teal-600 rounded mt-0.5 shadow-sm">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-slate-500">24/7 Hotline Support</h5>
                    <a href="tel:+256764249992" className="text-xs text-slate-800 font-bold hover:text-teal-600 transition-colors mt-0.5 block">
                      +256 764 249992
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-1.5 bg-teal-50 text-teal-600 rounded mt-0.5 shadow-sm">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-slate-500">Email Correspondence</h5>
                    <a href="mailto:emoemaenterprisesltd@gmail.com" className="text-xs text-slate-800 font-extrabold hover:text-teal-600 transition-colors mt-0.5 block break-all">
                      emoemaenterprisesltd@gmail.com
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative z-10 mt-8 pt-6 border-t border-teal-150">
              <div className="bg-white/80 backdrop-blur-sm p-4 rounded-xl border border-teal-100">
                <p className="text-[11px] text-teal-700 font-extrabold tracking-wider uppercase">Executive Commitment</p>
                <p className="text-[11px] italic text-slate-600 mt-1 leading-normal">
                  "At EmoEma Biomedical, we are dedicated to professionalism, fast response, technical excellence, and long-term client relationships that support efficient healthcare delivery across East Africa."
                </p>
              </div>
            </div>

          </div>

        </div>

        {/* Grid of Values */}
        <div>
          <h3 className="font-sans font-extrabold text-xl text-slate-900 tracking-tight text-center mb-10">Our Core Principles</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {values.map((v, idx) => (
              <div
                key={idx}
                className="bg-white rounded-xl border border-slate-100 p-6 flex flex-col sm:flex-row gap-4 items-start shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
              >
                <div className="p-2.5 bg-slate-50 rounded-lg flex-shrink-0">
                  {v.icon}
                </div>
                <div className="text-left space-y-1">
                  <h4 className="font-sans font-extrabold text-sm text-slate-900 leading-snug">{v.title}</h4>
                  <p className="text-xs text-slate-500 leading-relaxed">{v.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
