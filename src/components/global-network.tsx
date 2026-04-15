"use client";
import React from "react";
import { Globe3D, GlobeMarker } from "@/components/ui/3d-globe";
import { Button } from "@/components/ui/Button";
import { ArrowRight, Globe } from "lucide-react";

const sampleMarkers: GlobeMarker[] = [
  {
    lat: 19.9975, // Nashik (HQ)
    lng: 73.7898,
    src: "https://assets.aceternity.com/avatars/6.webp",
    label: "Nashik (HQ)",
  },
  {
    lat: 25.2048, // Dubai
    lng: 55.2708,
    src: "https://assets.aceternity.com/avatars/10.webp",
    label: "Dubai",
  },
  {
    lat: 1.3521, // Singapore
    lng: 103.8198,
    src: "https://assets.aceternity.com/avatars/12.webp",
    label: "Singapore",
  },
  {
    lat: -33.8688, // Sydney
    lng: 151.2093,
    src: "https://assets.aceternity.com/avatars/4.webp",
    label: "Sydney",
  },
  {
    lat: 31.2304, // Shanghai
    lng: 121.4737,
    src: "https://assets.aceternity.com/avatars/9.webp",
    label: "Shanghai",
  },
  {
    lat: 51.5074, // London
    lng: -0.1278,
    src: "https://assets.aceternity.com/avatars/2.webp",
    label: "London",
  },
];

export default function GlobalNetwork() {
  return (
    <section className="relative w-full py-20 md:py-32 bg-pm-dark overflow-hidden">
      {/* Background radial gradient for depth */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(126,217,87,0.05),transparent_50%)]" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pm-lime/10 border border-pm-lime/20 text-pm-lime text-[10px] font-black tracking-widest uppercase mb-6">
              <Globe className="w-3 h-3" /> Worldwide Operations
            </div>
            
            <h2 className="text-4xl md:text-6xl font-black text-white mb-6 md:mb-8 leading-[0.95] tracking-tighter">
              Powering Global <br />
              <span className="text-pm-lime">Infrastructure.</span>
            </h2>
            
            <p className="text-lg text-white/60 leading-relaxed mb-10 max-w-lg">
              Based in Nashik, exporting to the world. We bridge the gap between traditional reliability and modern automation across 15+ countries and counting.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button className="h-14 px-8 bg-pm-lime text-pm-dark font-black rounded-2xl hover:scale-105 transition-transform">
                View Export Profile
              </Button>
              <Button variant="ghost" className="h-14 px-8 text-white hover:bg-white/5 font-bold rounded-2xl">
                Global Logistics <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </div>

            <div className="mt-12 grid grid-cols-2 sm:grid-cols-3 gap-8 border-t border-white/5 pt-8">
               <div>
                  <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest block mb-1">Export Reach</span>
                  <span className="text-2xl font-heading font-black text-white">15+ Nations</span>
               </div>
               <div>
                  <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest block mb-1">Support hubs</span>
                  <span className="text-2xl font-heading font-black text-white">Global</span>
               </div>
            </div>
          </div>

          {/* Globe Container */}
          <div className="relative order-1 lg:order-2 h-[400px] md:h-[600px] flex items-center justify-center lg:justify-end">
            <div className="w-full h-full lg:w-[120%] lg:-mr-[10%] cursor-grab active:cursor-grabbing">
              <Globe3D
                className="w-full h-full"
                markers={sampleMarkers}
                config={{
                  atmosphereColor: "#7ED957",
                  atmosphereIntensity: 0.4,
                  bumpScale: 5,
                  autoRotateSpeed: 0.5,
                  radius: 2.2,
                }}
              />
            </div>
            
            {/* Soft glow behind the globe */}
            <div className="absolute top-1/2 left-1/2 lg:left-3/4 -translate-x-1/2 -translate-y-1/2 w-[70%] h-[70%] bg-pm-lime/5 blur-[120px] rounded-full -z-10" />
          </div>
        </div>
      </div>
    </section>
  );
}
