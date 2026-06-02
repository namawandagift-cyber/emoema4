/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from "react";
import { MEDICAL_EQUIPMENT_CATALOG } from "../data/companyData";
import { EquipmentItem } from "../types";
import { Search, SlidersHorizontal, Eye, ShoppingCart, CheckCircle, Trash2, ArrowRight } from "lucide-react";

interface EquipmentCatalogProps {
  onQuoteRequested: (equipmentHeadline: string) => void;
  cartItems: string[];
  setCartItems: React.Dispatch<React.SetStateAction<string[]>>;
}

export default function EquipmentCatalog({ onQuoteRequested, cartItems, setCartItems }: EquipmentCatalogProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [viewingSpecsId, setViewingSpecsId] = useState<string | null>(null);

  // Filter list
  const categories = [
    { id: "all", label: "All Items" },
    { id: "patient-care", label: "Patient Care" },
    { id: "diagnostics", label: "Diagnostic Imaging" },
    { id: "laboratory", label: "Laboratory Testing" },
    { id: "power-solutions", label: "Generator & Power" }
  ];

  const filteredItems = useMemo(() => {
    return MEDICAL_EQUIPMENT_CATALOG.filter((item) => {
      const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            item.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === "all" || item.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory]);

  // Cart operations
  const addToCart = (itemName: string) => {
    if (!cartItems.includes(itemName)) {
      setCartItems((prev) => [...prev, itemName]);
    }
  };

  const removeFromCart = (itemName: string) => {
    setCartItems((prev) => prev.filter((name) => name !== itemName));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const submitCartQuote = () => {
    if (cartItems.length === 0) return;
    const headline = `Inquiry for Medical/Power Procurement of typical products: ${cartItems.join(", ")}`;
    onQuoteRequested(headline);
  };

  return (
    <section className="py-20 bg-slate-50 relative overflow-hidden text-slate-800" id="equipment-catalog">
      <div className="max-w-7xl mx-auto px-4">
        
        {/* Section Header */}
        <div className="max-w-3xl text-left mb-12">
          <span className="text-xs font-bold tracking-widest text-teal-600 uppercase block mb-2 font-mono">
            // Procurement & Sourced Inventories
          </span>
          <h2 className="font-sans font-extrabold text-3xl md:text-4xl text-slate-900 tracking-tight">
            Original Medical Equipment Supply & Accessories
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-2 leading-relaxed">
            EmoEma Biomedical supplies standard-certified diagnostic monitors, neonatal supports, laboratory centrifuges, and critical care power generators. Our supplied devices come with 1 year of professional preventive maintenance support managed locally.
          </p>
        </div>

        {/* Search, Filter & Cart Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Main Catalog View Panel */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Control Panel: Search & Categories */}
            <div className="bg-white border border-slate-100 rounded-2xl p-4 shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between">
              
              {/* Search Bar */}
              <div className="relative w-full md:max-w-xs">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search equipment catalog..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-slate-50 text-xs text-slate-800 border border-slate-200/80 rounded-xl focus:outline-none focus:border-teal-500 transition-colors"
                />
              </div>

              {/* Categories filters */}
              <div className="flex flex-wrap gap-1.5 justify-start w-full md:w-auto">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => {
                      setSelectedCategory(cat.id);
                      setViewingSpecsId(null);
                    }}
                    className={`px-3 py-1.5 rounded-lg text-[11px] font-bold cursor-pointer transition-colors ${
                      selectedCategory === cat.id
                        ? "bg-slate-900 text-white"
                        : "bg-slate-50 text-slate-600 hover:bg-slate-100"
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>

            </div>

            {/* Catalog Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {filteredItems.length === 0 ? (
                <div className="col-span-full py-16 bg-white border border-dashed border-slate-200 rounded-2xl flex flex-col items-center justify-center text-center">
                  <p className="text-sm font-semibold text-slate-400">No equipment found matching criteria</p>
                  <button
                    onClick={() => {
                      setSearchTerm("");
                      setSelectedCategory("all");
                    }}
                    className="mt-3 text-xs font-bold text-teal-600 hover:underline cursor-pointer"
                  >
                    Reset filters
                  </button>
                </div>
              ) : (
                filteredItems.map((item) => {
                  const hasSpecsExpanded = viewingSpecsId === item.id;
                  const isInCart = cartItems.includes(item.name);

                  return (
                    <div
                      key={item.id}
                      className="bg-white border border-slate-100 rounded-2xl shadow-sm hover:shadow-md hover:border-slate-200/80 transition-all duration-300 flex flex-col justify-between overflow-hidden text-left"
                    >
                      {/* Equipment Image Header */}
                      {item.image && (
                        <div className="h-44 w-full overflow-hidden bg-slate-100 relative group">
                          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/20 via-transparent to-transparent opacity-70 z-10" />
                          <img
                            src={item.image}
                            alt={item.name}
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        </div>
                      )}

                      {/* Technical specifications overlay card */}
                      <div className="p-5 flex-grow space-y-4">
                        
                        <div className="flex justify-between items-start gap-3">
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-teal-50 text-teal-800 font-mono font-bold tracking-wider uppercase">
                            {item.category.replace("-", " ")}
                          </span>
                        </div>

                        <div>
                          <h4 className="font-sans font-extrabold text-sm text-slate-900 leading-snug">
                            {item.name}
                          </h4>
                          <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                            {item.description}
                          </p>
                        </div>

                        {/* Specs expand details */}
                        {hasSpecsExpanded && (
                          <div className="pt-4 border-t border-slate-50 space-y-3 animate-in fade-in slide-in-from-top-2 duration-300">
                            <div>
                              <h5 className="text-[10px] font-extrabold text-slate-800 uppercase tracking-wider mb-1.5 font-mono">
                                Technical Specifications
                              </h5>
                              <ul className="space-y-1 bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                                {item.specs.map((spec, sIdx) => (
                                  <li key={sIdx} className="text-[10px] font-mono text-slate-600 flex items-start gap-1">
                                    <span className="text-teal-600">•</span>
                                    <span>{spec}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>

                            <div>
                              <h5 className="text-[10px] font-extrabold text-slate-800 uppercase tracking-wider mb-1.5 font-mono">
                                Key Operations Features
                              </h5>
                              <ul className="space-y-1">
                                {item.features.map((feat, fIdx) => (
                                  <li key={fIdx} className="text-xs text-slate-600 flex items-start gap-1.5 leading-normal">
                                    <CheckCircle className="w-3 h-3 text-teal-600 mt-0.5 flex-shrink-0" />
                                    <span>{feat}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        )}

                      </div>

                      {/* Item operational bottom action ribbon */}
                      <div className="bg-slate-50/50 px-5 py-3 border-t border-slate-100 flex items-center justify-between gap-2.5">
                        <button
                          onClick={() => setViewingSpecsId(hasSpecsExpanded ? null : item.id)}
                          className="text-[11px] font-bold text-slate-800 hover:text-teal-600 transition-colors flex items-center gap-1 cursor-pointer"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>{hasSpecsExpanded ? "Hide specs" : "Show specs"}</span>
                        </button>

                        <button
                          onClick={() => addToCart(item.name)}
                          className={`px-3 py-1.5 rounded-lg text-[10px] font-extrabold flex items-center gap-1.5 transition-colors cursor-pointer ${
                            isInCart
                              ? "bg-teal-100 text-teal-900 border border-teal-200"
                              : "bg-slate-900 hover:bg-slate-800 text-white"
                          }`}
                        >
                          <ShoppingCart className="w-3 h-3" />
                          <span>{isInCart ? "Added" : "Add to quote"}</span>
                        </button>
                      </div>

                    </div>
                  );
                })
              )}

            </div>

          </div>

          {/* Right Panel: Quotation Inquiry Cart list */}
          <div className="lg:col-span-4 bg-white border border-slate-200/90 rounded-2xl p-5 md:p-6 shadow-md relative sticky top-6">
            <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-teal-500 to-orange-500 rounded-t-2xl"></div>

            <div className="flex justify-between items-center pb-4 border-b border-slate-100 text-left">
              <div>
                <h3 className="font-sans font-extrabold text-sm text-slate-950">Inquiry Cart</h3>
                <p className="text-[10px] text-slate-500">Collect equipment to bundle your medical quote estimate</p>
              </div>
              <ShoppingCart className="w-4 h-4 text-slate-400" />
            </div>

            {/* Cart Items List stack */}
            <div className="py-4 space-y-3 min-h-[140px] max-h-[300px] overflow-y-auto pr-1">
              {cartItems.length === 0 ? (
                <div className="py-8 text-center flex flex-col items-center justify-center text-slate-400">
                  <div className="p-3 bg-slate-50 rounded-full mb-2">
                    <ShoppingCart className="w-5 h-5 text-slate-300" />
                  </div>
                  <p className="text-xs font-semibold">Your cart is empty</p>
                  <p className="text-[10px] text-slate-500 mt-1 max-w-[160px] leading-normal">
                    Add Patient Monitors, Incubators or Diesel Generators to begin.
                  </p>
                </div>
              ) : (
                cartItems.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-2.5 bg-slate-50 rounded-xl border border-slate-150 flex justify-between items-center gap-3 animate-in fade-in zoom-in-95 duration-150 text-left text-xs"
                  >
                    <span className="font-sans font-medium text-slate-900 line-clamp-1 flex-grow">
                      {item}
                    </span>
                    <button
                      onClick={() => removeFromCart(item)}
                      className="p-1.5 rounded text-rose-500 hover:bg-rose-50 transition-colors cursor-pointer"
                      aria-label={`Remove ${item} from cart`}
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))
              )}
            </div>

            {/* Cart Footer Checkout Actions */}
            {cartItems.length > 0 && (
              <div className="pt-4 border-t border-slate-100 space-y-3 text-left">
                <div className="flex justify-between text-xs font-semibold text-slate-700">
                  <span>Selected items count:</span>
                  <span className="font-mono">{cartItems.length}</span>
                </div>
                
                <button
                  onClick={submitCartQuote}
                  className="w-full py-3 bg-teal-600 hover:bg-teal-700 active:scale-98 text-white rounded-xl text-xs font-extrabold shadow-lg shadow-teal-100 transition-all duration-200 flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <span>Build Consolidated Proposal</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={clearCart}
                  className="w-full text-center py-2 text-[10px] text-slate-400 font-bold hover:text-rose-500 transition-colors cursor-pointer"
                >
                  Clear all selected items
                </button>
              </div>
            )}

            {/* Procurement Trust indicator */}
            <div className="mt-6 pt-5 border-t border-slate-100 text-left text-[11px] text-slate-500 space-y-2">
              <p className="font-semibold text-slate-800">Sourcing Compliance assurances:</p>
              <ul className="space-y-1.5">
                <li className="flex gap-1.5 items-start">
                  <span className="text-teal-600">•</span>
                  <span>100% genuine medical appliances from ISO9001 certified manufacturers.</span>
                </li>
                <li className="flex gap-1.5 items-start">
                  <span className="text-teal-600">•</span>
                  <span>Compliant with Uganda National Bureau of Standards (UNBS) rules.</span>
                </li>
              </ul>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
