"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Info, Calculator, Table, ChevronRight, TrendingUp } from "lucide-react";
import { Button } from "./ui/Button";

const machineData = [
  {
    model: "PM-24 Ultra",
    category: "Full Automatic",
    pressure: "140-160 Tons",
    cycle: "15-20 Sec",
    capacity: "24,000 / Day",
    power: "45 HP",
    bestFor: "High-Volume Infrastructure",
  },
  {
    model: "PM-12 Pro",
    category: "Semi-Automatic",
    pressure: "80-100 Tons",
    cycle: "25-30 Sec",
    capacity: "12,000 / Day",
    power: "25 HP",
    bestFor: "Medium Enterprise",
  },
  {
    model: "PM-Eco 6",
    category: "Manual / Hydraulic",
    pressure: "40-60 Tons",
    cycle: "40-50 Sec",
    capacity: "6,000 / Day",
    power: "12 HP",
    bestFor: "Small Scale Startup",
  },
];

export function AdvancedSpecs({ onQuote }: { onQuote: () => void }) {
  const [activeTab, setActiveTab] = useState<"compare" | "roi">("compare");
  const [hours, setHours] = useState(8);
  const [machineIndex, setMachineIndex] = useState(0);

  const calculateROI = () => {
    const selected = machineData[machineIndex];
    const dailyCapacity = parseInt(selected.capacity.replace(",", "")) * (hours / 8);
    const estProfitPerUnit = 0.50; // Mock profit in INR
    return (dailyCapacity * estProfitPerUnit).toLocaleString();
  };

  return (
    <section className="py-20 md:py-32 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div className="max-w-2xl">
            <span className="text-pm-lime font-black tracking-[0.3em] uppercase text-[10px] mb-4 block">Business Intelligence</span>
            <h2 className="text-4xl md:text-6xl font-black text-pm-dark mb-6 leading-tight">Scale Your <span className="text-pm-lime">Operation.</span></h2>
            <p className="text-lg text-pm-fg-muted font-medium">Use our technical analysis tools to choose the right machinery for your production goals.</p>
          </div>

          <div className="flex bg-pm-dark/5 p-1 rounded-2xl">
             <button 
              onClick={() => setActiveTab("compare")} 
              className={`px-6 py-3 rounded-xl text-sm font-bold flex items-center gap-2 transition-all ${activeTab === "compare" ? "bg-white text-pm-dark shadow-lg ring-1 ring-pm-dark/5" : "text-pm-dark/40"}`}
             >
               <Table size={16} /> Comparison
             </button>
             <button 
              onClick={() => setActiveTab("roi")} 
              className={`px-6 py-3 rounded-xl text-sm font-bold flex items-center gap-2 transition-all ${activeTab === "roi" ? "bg-white text-pm-dark shadow-lg ring-1 ring-pm-dark/5" : "text-pm-dark/40"}`}
             >
               <Calculator size={16} /> ROI Calculator
             </button>
          </div>
        </div>

        <div className="glass-card rounded-[50px] overflow-hidden border border-pm-dark/5 shadow-2xl">
          <AnimatePresence mode="wait">
            {activeTab === "compare" ? (
              <motion.div 
                key="compare"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="overflow-x-auto p-8 md:p-12"
              >
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-pm-dark/5">
                      <th className="py-6 px-4 text-xs font-black uppercase tracking-widest text-pm-dark/30">Feature</th>
                      {machineData.map(m => (
                        <th key={m.model} className="py-6 px-4 text-lg font-black text-pm-dark">{m.model}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { l: "Pressure Capacity", k: "pressure" },
                      { l: "Cycle Time", k: "cycle" },
                      { l: "Daily Output", k: "capacity" },
                      { l: "Motor Strength", k: "power" },
                      { l: "Primary Use", k: "bestFor" },
                    ].map((row, i) => (
                      <tr key={row.l} className={`border-b border-pm-dark/5 ${i % 2 === 0 ? "bg-pm-dark/[0.01]" : ""}`}>
                        <td className="py-6 px-4 text-sm font-bold text-pm-dark/60">{row.l}</td>
                        {machineData.map(m => (
                           <td key={m.model} className="py-6 px-4 text-sm font-bold text-pm-dark">
                             {m[row.k as keyof typeof m]}
                           </td>
                        ))}
                      </tr>
                    ))}
                    <tr>
                       <td className="py-8 px-4"></td>
                       {machineData.map((m, i) => (
                         <td key={i} className="py-8 px-4">
                            <Button 
                              onClick={onQuote}
                              className="w-full bg-pm-dark text-white rounded-xl h-12 text-xs font-black hover:bg-pm-lime hover:text-pm-dark transition-all"
                            >
                              Select Model
                            </Button>
                         </td>
                       ))}
                    </tr>
                  </tbody>
                </table>
              </motion.div>
            ) : (
              <motion.div 
                key="roi"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="p-8 md:p-16 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
              >
                <div className="space-y-10">
                   <div>
                      <h4 className="text-2xl font-black text-pm-dark mb-4 flex items-center gap-3">
                         <TrendingUp className="text-pm-lime" /> Predict Your Profit
                      </h4>
                      <p className="text-pm-fg-muted font-medium">Estimate your potential daily revenue based on machine capacity and operating hours.</p>
                   </div>

                   <div className="space-y-8">
                      <div className="space-y-4">
                        <label className="text-xs font-black uppercase tracking-widest text-pm-dark/40 flex justify-between">
                          Select Machine Model <span>{machineData[machineIndex].model}</span>
                        </label>
                        <div className="grid grid-cols-3 gap-3">
                           {machineData.map((m, i) => (
                             <button
                               key={i}
                               onClick={() => setMachineIndex(i)}
                               className={`py-4 rounded-2xl text-[10px] font-black border-2 transition-all ${machineIndex === i ? "bg-pm-dark text-white border-pm-dark" : "border-pm-dark/5 hover:border-pm-dark/20"}`}
                             >
                               {m.model.split(" ")[1]}
                             </button>
                           ))}
                        </div>
                      </div>

                      <div className="space-y-4">
                        <label className="text-xs font-black uppercase tracking-widest text-pm-dark/40 flex justify-between">
                          Daily Operating Hours <span>{hours}h</span>
                        </label>
                        <input 
                          type="range" min={4} max={16} value={hours} 
                          onChange={(e) => setHours(parseInt(e.target.value))}
                          className="w-full h-2 bg-pm-dark/10 rounded-lg appearance-none cursor-pointer accent-pm-lime"
                        />
                      </div>
                   </div>
                </div>

                <div className="bg-pm-dark rounded-[40px] p-10 text-white relative overflow-hidden">
                   <div className="absolute top-0 right-0 w-32 h-32 bg-pm-lime/20 blur-[60px] rounded-full" />
                   <div className="relative z-10">
                      <span className="text-[10px] font-black tracking-widest uppercase text-pm-lime/60 block mb-6">Est. Daily Gross Profit (INR)</span>
                      <div className="text-6xl md:text-7xl font-heading font-black mb-8 leading-none">
                        <span className="text-pm-lime">₹</span>{calculateROI()}
                      </div>
                      
                      <div className="space-y-4 mb-10 text-sm font-medium text-white/50">
                         <div className="flex items-center gap-3"><Check size={16} className="text-pm-lime" /> Daily Production: { (parseInt(machineData[machineIndex].capacity.replace(",", "")) * (hours / 8)).toLocaleString() } Bricks</div>
                         <div className="flex items-center gap-3"><Check size={16} className="text-pm-lime" /> Automated Efficiency: 98.4%</div>
                         <div className="flex items-center gap-3"><Check size={16} className="text-pm-lime" /> Based on active cycle time</div>
                      </div>

                      <Button 
                        onClick={onQuote}
                        className="w-full h-16 bg-white text-pm-dark font-black rounded-2xl hover:bg-pm-lime transition-all text-lg"
                      >
                        Get Full Business Case <ChevronRight className="ml-2 w-5 h-5" />
                      </Button>
                   </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
