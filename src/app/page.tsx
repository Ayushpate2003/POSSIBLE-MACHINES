"use client";

import React, { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import {
  ChevronRight,
  Menu,
  X,
  Phone,
  MessageCircle,
  Play,
  Star,
  CheckCircle2,
  ArrowUpRight,
  ShieldCheck,
  Globe,
  Settings,
  History,
  Truck,
  Zap,
  Mail,
  Share2,
  ExternalLink,
  Link2,
} from "lucide-react";
import { products, categories, automationFilters, type Product } from "@/data/products";
import { Button } from "@/components/ui/Button";

// --- Animation Constants ---
const EASE_EXPO = [0.16, 1, 0.3, 1] as const;

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: EASE_EXPO },
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

// --- Components ---

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${
          isScrolled ? "py-3 bg-white/95 backdrop-blur-xl border-b border-pm-dark/10 shadow-sm" : "py-4 md:py-6 bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 md:w-10 md:h-10 bg-white rounded-xl flex items-center justify-center p-1 shadow-lg shadow-pm-dark/10 transition-transform hover:rotate-12">
              <img src="/logo.png" alt="Logo" className="w-full h-full object-contain" />
            </div>
            <div className="flex flex-col">
              <span className={`font-heading font-extrabold text-base md:text-lg leading-none tracking-tight text-pm-dark`}>
                POSSIBLE
              </span>
              <span className={`font-heading text-[10px] md:text-xs font-medium tracking-[0.2em] text-pm-mid`}>
                MACHINES
              </span>
            </div>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {["Home", "Machines", "Technology", "About", "Reviews"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="font-body text-sm font-medium text-pm-dark/80 hover:text-pm-lime transition-colors relative group"
              >
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-pm-lime transition-all group-hover:w-full" />
              </a>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-4">
            <Button variant="secondary" size="sm" className="bg-pm-dark text-white hover:bg-pm-mid border-none shadow-lg">
              Get Quote
            </Button>
            <a
              href="https://wa.me/918047549587"
              target="_blank"
              className="w-10 h-10 rounded-full bg-pm-lime flex items-center justify-center text-pm-dark shadow-lg shadow-pm-lime/20 hover:scale-110 transition-transform"
            >
              <MessageCircle className="w-5 h-5" />
            </a>
          </div>

          {/* Mobile Toggle */}
          <motion.button 
            whileTap={{ scale: 0.9 }}
            className="md:hidden w-10 h-10 flex items-center justify-center text-pm-dark bg-white/50 backdrop-blur-md rounded-lg" 
            onClick={() => setIsOpen(true)}
          >
            <Menu className="w-6 h-6" />
          </motion.button>
        </div>
      </nav>

      {/* Full Screen Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[110] bg-white flex flex-col md:hidden"
          >
            <div className="p-6 flex items-center justify-between border-b border-pm-dark/5">
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 bg-white rounded-xl flex items-center justify-center p-1 shadow-lg border border-pm-dark/5">
                  <img src="/logo.png" alt="Logo" className="w-full h-full object-contain" />
                </div>
                <span className="font-heading font-black text-pm-dark">POSSIBLE</span>
              </div>
              <button onClick={() => setIsOpen(false)} className="w-10 h-10 flex items-center justify-center rounded-full bg-pm-dark/5">
                <X className="w-6 h-6 text-pm-dark" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-10 flex flex-col gap-8">
              {["Home", "Machines", "Technology", "About", "Reviews"].map((item, i) => (
                <motion.a
                  key={item}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + i * 0.05 }}
                  href={`#${item.toLowerCase()}`}
                  className="font-heading text-4xl font-black text-pm-dark/90 hover:text-pm-lime transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  {item}
                </motion.a>
              ))}
            </div>

            <div className="p-6 border-t border-pm-dark/5 bg-pm-dark/5 flex flex-col gap-4">
              <Button className="w-full h-14 bg-pm-dark text-white rounded-2xl text-lg font-bold">Request Priority Quote</Button>
              <div className="flex gap-4">
                <a href="tel:08047549587" className="flex-1 h-14 bg-white border border-pm-dark/10 rounded-2xl flex items-center justify-center gap-2 font-bold text-pm-dark">
                  <Phone className="w-5 h-5 text-pm-lime" /> Call
                </a>
                <a href="https://wa.me/918047549587" className="flex-1 h-14 bg-pm-lime text-pm-dark rounded-2xl flex items-center justify-center gap-2 font-bold">
                  <MessageCircle className="w-5 h-5" /> WhatsApp
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

const Hero = () => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);

  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden py-24 md:py-0">
      {/* Background with 3D-like industrial render placeholder */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/80 to-transparent z-10" />
        <motion.div style={{ y: y1 }} className="absolute inset-0 w-full h-[120%]">
          <img
            src="https://images.unsplash.com/photo-1541933540445-5d9f000c0aa4?q=80&w=2000&auto=format&fit=crop"
            alt="Factory"
            className="w-full h-full object-cover grayscale-[0.2] brightness-[0.9]"
          />
        </motion.div>
        {/* Animated accent blobs */}
        <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-pm-lime/20 blur-[120px] rounded-full animate-blob-1" />
        <div className="absolute bottom-1/4 left-1/3 w-[400px] h-[400px] bg-pm-dark/5 blur-[100px] rounded-full animate-blob-2" />
      </div>

      <div className="max-w-7xl mx-auto px-6 w-full relative z-20 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: EASE_EXPO }}
          className="max-w-3xl"
        >
          <h1 className="font-heading text-4xl sm:text-6xl md:text-8xl font-black text-pm-dark leading-[0.95] mb-6 md:mb-8 tracking-tighter">
            Precision Block <br />
            <span className="text-gradient-green">Making Machinery.</span>
          </h1>

          <p className="font-body text-lg md:text-xl text-pm-fg-muted max-w-xl leading-relaxed mb-10 md:mb-12">
            Engineered for high-performance durability and maximum output. We manufacture & export world-class automated construction machinery globally.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-12 lg:mb-0">
            <Button className="h-14 md:h-16 px-10 bg-pm-dark text-white text-base md:text-lg font-bold rounded-2xl group shadow-lg md:shadow-2xl shadow-pm-dark/20 hover:bg-pm-mid transition-all">
              Get Instant Quote
              <ArrowUpRight className="ml-2 w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </Button>
            <Button
              variant="secondary"
              className="h-14 md:h-16 px-10 border-2 border-pm-dark/10 text-pm-dark text-base md:text-lg font-bold rounded-2xl bg-white/50 backdrop-blur-sm hover:bg-white transition-all shadow-md md:shadow-xl"
            >
              Explore Products
            </Button>
          </div>

          {/* Mobile Metrics Dashboard */}
          <div className="md:hidden">
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: "ISO CERTIFIED", value: "9001:2015" },
                { label: "GLOBAL EXPORT", value: "15+ Countries" },
                { label: "TEAM STRENGTH", value: "50+ Experts" },
                { label: "BATTLE TESTED", value: "12+ Years" },
              ].map((metric) => (
                <div key={metric.label} className="bg-white/40 backdrop-blur-md border border-white/20 p-5 rounded-2xl">
                  <span className="text-[8px] font-black tracking-widest text-pm-dark/40 uppercase mb-1 block">{metric.label}</span>
                  <span className="text-lg font-heading font-black text-pm-dark leading-none">{metric.value}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Industrial Render - Now visible on all devices with responsive order */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8, x: 50 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: EASE_EXPO }}
          className="relative block mt-12 lg:mt-0"
        >
          <div className="relative z-10 animate-blob-1">
             <img 
               src="/hero-industrial.png" 
               alt="Industrial Plant" 
               className="w-full h-auto drop-shadow-[0_20px_40px_rgba(26,61,47,0.2)] md:drop-shadow-[0_35px_60px_rgba(26,61,47,0.3)] transition-transform hover:scale-105 duration-700"
             />
          </div>
          {/* Decorative halo */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-pm-lime/10 blur-[60px] md:blur-[100px] rounded-full -z-10" />
        </motion.div>
      </div>

      {/* Desktop Trust metric summary - hidden on mobile to prevent overlap */}
      <div className="absolute bottom-12 right-0 left-0 hidden md:block">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="flex flex-wrap gap-8 items-center bg-white/40 backdrop-blur-md border border-white/20 p-8 rounded-3xl w-fit shadow-2xl"
          >
            {[
              { label: "ISO CERTIFIED", value: "9001:2015" },
              { label: "GLOBAL EXPORT", value: "15+ Countries" },
              { label: "TEAM STRENGTH", value: "50+ Experts" },
            ].map((metric) => (
              <div key={metric.label} className="flex flex-col">
                <span className="text-[10px] font-black tracking-widest text-pm-dark/40 uppercase mb-1">
                  {metric.label}
                </span>
                <span className="text-2xl font-heading font-black text-pm-dark">{metric.value}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const TrustBar = () => {
  return (
    <div className="bg-white border-y border-pm-dark/5 py-8 md:py-12 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-wrap justify-center md:justify-between items-center gap-8 md:gap-12 text-pm-dark/30">
          <div className="flex items-center gap-3 grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all cursor-default">
            <ShieldCheck className="w-12 h-12" />
            <div className="flex flex-col uppercase">
              <span className="text-[10px] font-bold tracking-tighter">Precision</span>
              <span className="text-xl font-heading font-black">Quality Assurance</span>
            </div>
          </div>
          <div className="flex items-center gap-3 grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all cursor-default text-pm-lime">
             <Globe className="w-12 h-12" />
             <div className="flex flex-col uppercase text-pm-dark/30">
               <span className="text-[10px] font-bold tracking-tighter">Export</span>
               <span className="text-xl font-heading font-black">Global Standards</span>
             </div>
          </div>
          <div className="text-center">
            <span className="block text-4xl font-extrabold text-pm-dark">12+</span>
            <span className="text-[10px] font-bold uppercase tracking-widest">Years of Trust</span>
          </div>
          <div className="text-center">
            <span className="block text-4xl font-extrabold text-pm-dark">1000+</span>
            <span className="text-[10px] font-bold uppercase tracking-widest">Machinery Installed</span>
          </div>
          <div className="text-center">
            <span className="block text-4xl font-extrabold text-pm-dark">₹1.5Cr+</span>
            <span className="text-[10px] font-bold uppercase tracking-widest">Turnover Growth</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const About = () => {
  return (
    <section id="about" className="py-20 md:py-32 relative overflow-hidden bg-canvas-soft">
       <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-20 items-center">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="relative"
          >
             <div className="relative z-10 rounded-[40px] overflow-hidden shadow-2xl border-8 border-white bg-white">
                <img 
                  src="/machine-render.png" 
                  alt="Possible Machine Engineering" 
                  className="w-full h-full object-contain p-8"
                />
             </div>
             {/* Float badge */}
             <div className="absolute -bottom-10 -right-10 bg-pm-lime p-8 rounded-[30px] shadow-2xl z-20 max-w-[200px] animate-blob-3">
                <span className="text-5xl font-black text-pm-dark mb-2 block">100%</span>
                <p className="text-xs font-bold uppercase leading-tight text-pm-dark/70">Engineered Perfection In Igatpuri Plant</p>
             </div>
             {/* Graphic element */}
             <div className="absolute -top-12 -left-12 w-64 h-64 border-[40px] border-pm-dark/5 rounded-full z-0" />
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
             <span className="text-pm-lime font-black tracking-[0.3em] uppercase text-xs mb-4 block">Our Engineering DNA</span>
             <h2 className="text-4xl md:text-5xl font-black text-pm-dark mb-6 md:mb-8 leading-tight">We Build Machines that <span className="text-pm-lime">Build Cities.</span></h2>
             
             <p className="text-lg text-pm-fg-muted leading-relaxed mb-10">
                Possible Machines Private Limited is a premier manufacturer and exporter specializing in high-performance block making systems. Based in Nashik, we bridge the gap between traditional reliability and modern automation.
             </p>

             <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
                {[
                  { icon: History, title: "Trusted Since 2012", desc: "A decade of legacy." },
                  { icon: Settings, title: "Precision Design", desc: "Bespoke engineering." },
                  { icon: Globe, title: "Global Export", value: "Pan-India & Abroad." },
                  { icon: ShieldCheck, title: "ISO Certified", desc: "9001:2015 Approved." },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-4 group">
                     <div className="w-12 h-12 rounded-xl bg-pm-lime/10 text-pm-lime flex items-center justify-center transition-colors group-hover:bg-pm-lime group-hover:text-pm-dark">
                        <item.icon size={24} />
                     </div>
                     <div>
                        <h4 className="font-bold text-pm-dark text-sm mb-1">{item.title}</h4>
                        <p className="text-xs text-pm-fg-subtle">{item.desc || item.value}</p>
                     </div>
                  </div>
                ))}
             </div>

             <Button className="h-14 px-8 bg-white border-2 border-pm-dark rounded-2xl text-pm-dark font-black hover:bg-pm-dark hover:text-white transition-all">
                Learn Corporate Profile
             </Button>
          </motion.div>
       </div>
    </section>
  );
};

const ProductShowcase = () => {
  const [activeTab, setActiveTab] = useState<typeof categories[number]["id"]>("all");
  const [activeAutomation, setActiveAutomation] = useState<typeof automationFilters[number]["id"]>("all");

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const catMatch = activeTab === "all" || p.category === activeTab;
      const autoMatch = activeAutomation === "all" || p.automation === activeAutomation;
      return catMatch && autoMatch;
    });
  }, [activeTab, activeAutomation]);

  return (
    <section id="machines" className="py-20 md:py-32 section-gradient">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12 md:mb-16">
          <div className="max-w-xl">
            <span className="text-pm-lime font-black tracking-[0.3em] uppercase text-xs mb-4 block">Catalog 2024</span>
            <h2 className="text-4xl md:text-5xl font-black text-pm-dark mb-4">Precision Machines.</h2>
            <p className="text-pm-fg-muted text-sm md:text-base">Choose your high-output solution based on automation and capacity requirements.</p>
          </div>
          
          <div className="flex flex-col gap-4">
            {/* Automation Filter */}
            <div className="flex bg-pm-dark/5 p-1 rounded-xl w-fit">
               {automationFilters.map(f => (
                 <button 
                  key={f.id} 
                  onClick={() => setActiveAutomation(f.id)}
                  className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${activeAutomation === f.id ? "bg-pm-dark text-white shadow-lg" : "text-pm-dark/60"}`}
                 >
                   {f.label}
                 </button>
               ))}
            </div>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex overflow-x-auto pb-4 mb-8 md:mb-12 no-scrollbar -mx-6 px-6 gap-3">
          {categories.map(c => (
            <button
              key={c.id}
              onClick={() => setActiveTab(c.id)}
              className={`px-6 py-3 rounded-2xl text-sm font-bold border-2 transition-all whitespace-nowrap ${activeTab === c.id ? "filter-tab-active border-pm-lime" : "bg-white border-pm-dark/5 text-pm-dark/60 hover:border-pm-dark/20"}`}
            >
              {c.label}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredProducts.map((p) => (
              <motion.div
                layout
                key={p.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
              >
                <div className="glass-card group flex flex-col h-full rounded-[30px] overflow-hidden hover:shadow-hover transition-all duration-500">
                  <div className="relative h-60 overflow-hidden">
                    <img 
                      src={p.image} 
                      alt={p.title} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-pm-dark/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    {p.badge && (
                      <div className="absolute top-4 left-4 py-1 px-3 bg-pm-lime text-pm-dark font-black text-[10px] rounded-full uppercase">
                        {p.badge}
                      </div>
                    )}
                    <div className="absolute bottom-4 left-4 right-4 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all">
                       <Button size="sm" className="w-full bg-white text-pm-dark font-black py-5">View Detail Specs</Button>
                    </div>
                  </div>
                  
                  <div className="p-6 flex flex-col flex-1">
                    <span className="text-[10px] font-black tracking-widest text-pm-lime uppercase mb-1">{p.automation}</span>
                    <h3 className="text-xl font-heading font-black text-pm-dark mb-4 leading-tight">{p.title}</h3>
                    
                    <div className="space-y-3 mb-6 flex-1">
                       {p.features.map(f => (
                         <div key={f} className="flex items-center gap-2 text-pm-fg-muted text-xs font-medium">
                            <CheckCircle2 className="w-3.5 h-3.5 text-pm-lime" /> {f}
                         </div>
                       ))}
                    </div>

                    <div className="pt-6 border-t border-pm-dark/5 flex items-center justify-between">
                       <span className="font-heading font-black text-pm-dark">{p.price}</span>
                       <Button variant="secondary" size="sm" className="bg-pm-dark text-white text-[10px] font-bold h-9">Get Quote</Button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredProducts.length === 0 && (
          <div className="py-20 text-center col-span-full">
             <p className="text-pm-fg-subtle italic">No machinery found matching these filters.</p>
          </div>
        )}
      </div>
    </section>
  );
};

const WhyChooseUs = () => {
  return (
    <section className="py-20 md:py-32 bg-pm-dark relative overflow-hidden">
       {/* Background graphic */}
       <div className="absolute top-0 right-0 w-1/2 h-full opacity-10 pointer-events-none">
          <svg viewBox="0 0 500 500" className="w-full h-full">
            <path d="M50,50 L450,50 L450,450 L50,450 Z" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="10" />
            <circle cx="250" cy="250" r="150" fill="none" stroke="currentColor" strokeWidth="1" />
          </svg>
       </div>

       <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
             <span className="text-pm-lime font-black tracking-[0.3em] uppercase text-xs mb-4 block">Core Values</span>
             <h2 className="text-4xl md:text-5xl font-black text-white mb-6 md:mb-8 tracking-tight">Built for <span className="text-pm-lime">Extreme Performance.</span></h2>
             <p className="text-white/60 text-sm md:text-base">Our focus is on durability, throughput, and lowering the operational cost for your factory lines.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
             {[
               { icon: ShieldCheck, title: "High Durability", desc: "Constructed with heavy-duty MS steel plates for 24/7 industrial loads." },
               { icon: Zap, title: "Low Maintenance", desc: "Minimal moving parts and simplified hydraulic access for self-service." },
               { icon: Settings, title: "Automation Ready", desc: "Intelligent PLC handling for consistency without human error." },
               { icon: Truck, title: "Pan-India Support", desc: "On-site installation and pan-India maintenance network." },
             ].map((feature, i) => (
                <div key={i} className="glass-dark p-8 rounded-[40px] hover:border-pm-lime/40 transition-colors group">
                   <div className="w-16 h-16 rounded-2xl bg-pm-lime/10 text-pm-lime flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                      <feature.icon size={32} />
                   </div>
                   <h4 className="text-xl font-heading font-black text-white mb-3">{feature.title}</h4>
                   <p className="text-sm text-white/50 leading-relaxed">{feature.desc}</p>
                </div>
             ))}
          </div>
       </div>
    </section>
  );
};

const VideoSection = () => {
  const videoRef = React.useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [isMuted, setIsMuted] = React.useState(true);
  const [showOverlay, setShowOverlay] = React.useState(true);

  const handlePlay = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      v.play();
      setIsPlaying(true);
      setShowOverlay(false);
    } else {
      v.pause();
      setIsPlaying(false);
      setShowOverlay(true);
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    setIsMuted(v.muted);
  };

  return (
    <section className="py-32 section-gradient">
       <div className="max-w-7xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: EASE_EXPO }}
          >
            <span className="text-pm-lime font-black tracking-[0.3em] uppercase text-xs mb-4 block">Machine Demo</span>
            <h2 className="text-4xl md:text-5xl font-black text-pm-dark mb-12 md:mb-16">
              See the <span className="text-pm-lime">Intensity.</span>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1, ease: EASE_EXPO }}
            className="relative max-w-5xl mx-auto rounded-[40px] overflow-hidden shadow-2xl shadow-pm-dark/20 border-[12px] border-white cursor-pointer"
            onClick={handlePlay}
          >
            {/* Actual video */}
            <video
              ref={videoRef}
              src="/3d-video.mp4"
              className="w-full aspect-video object-cover"
              loop
              muted
              playsInline
              preload="metadata"
            />

            {/* Overlay — shown when paused */}
            <AnimatePresence>
              {showOverlay && (
                <motion.div
                  key="overlay"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-0 bg-pm-dark/50 flex items-center justify-center"
                >
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-24 h-24 bg-pm-lime rounded-full flex items-center justify-center shadow-2xl shadow-pm-lime/50"
                  >
                    <Play className="w-10 h-10 text-pm-dark fill-current ml-1" />
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Controls bar — bottom of video */}
            <div className="absolute bottom-0 left-0 right-0 px-8 py-5 flex items-center justify-between bg-gradient-to-t from-pm-dark/80 to-transparent">
              <div className="text-left">
                <span className="text-[10px] font-black tracking-widest text-pm-lime uppercase block">Demo Reel</span>
                <h4 className="text-xl font-heading font-black text-white">Possible Machines — Full Line Operation</h4>
              </div>

              <div className="flex items-center gap-3">
                {/* Mute toggle */}
                <button
                  onClick={toggleMute}
                  className="w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white hover:bg-pm-lime hover:text-pm-dark transition-all"
                  title={isMuted ? "Unmute" : "Mute"}
                >
                  {isMuted ? (
                    <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current"><path d="M16.5 12A4.5 4.5 0 0 0 14 7.97v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06a8.99 8.99 0 0 0 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/></svg>
                  ) : (
                    <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3A4.5 4.5 0 0 0 14 7.97v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/></svg>
                  )}
                </button>

                {/* Play / Pause */}
                <button
                  onClick={handlePlay}
                  className="w-12 h-12 rounded-full bg-pm-lime flex items-center justify-center text-pm-dark shadow-xl hover:scale-110 transition-transform"
                >
                  {isPlaying ? (
                    <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>
                  ) : (
                    <Play className="w-5 h-5 fill-current ml-0.5" />
                  )}
                </button>
              </div>
            </div>
          </motion.div>
       </div>
    </section>
  );
};


const Testimonials = () => {
  return (
    <section className="py-32 bg-white">
       <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-8">
             <div className="max-w-lg">
                <h2 className="text-5xl font-black text-pm-dark mb-4 tracking-tighter">Client Success.</h2>
                <div className="flex items-center gap-2">
                   <div className="flex text-pm-lime">
                      <Star className="w-5 h-5 fill-current" />
                      <Star className="w-5 h-5 fill-current" />
                      <Star className="w-5 h-5 fill-current" />
                      <Star className="w-5 h-5 fill-current" />
                      <Star className="w-5 h-5 fill-current" />
                   </div>
                   <span className="text-sm font-bold text-pm-dark">4.3/5 Overall Trust Score</span>
                </div>
             </div>
             <Button variant="ghost" className="text-pm-dark font-black">View All 20+ Reviews <ChevronRight /></Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
             {[
               { name: "Sachin G.", role: "CEO, infrastructure Co", quote: "The PM24 fly ash machine has significantly lowered our labor costs with its full automation." },
               { name: "Rahul M.", role: "Builder", quote: "Unparalleled durability. We've been running their interlocking paver machines for 5 years without major downtime." },
               { name: "Ajay K.", role: "Distributor", quote: "Best post-sales support in the Nashik region. They really understand industrial needs." },
             ].map((rev, i) => (
               <div key={i} className="p-8 rounded-[40px] bg-pm-sand-light/30 border border-pm-dark/5 flex flex-col justify-between h-full group hover:bg-pm-lime/5 transition-colors">
                  <p className="text-pm-dark font-medium leading-relaxed italic mb-8">"{rev.quote}"</p>
                  <div className="flex items-center gap-4">
                     <div className="w-12 h-12 rounded-full bg-pm-dark text-pm-lime flex items-center justify-center font-black">
                        {rev.name.split(" ")[0][0]}
                     </div>
                     <div>
                        <h4 className="font-bold text-pm-dark text-sm">{rev.name}</h4>
                        <p className="text-[10px] font-bold text-pm-fg-subtle uppercase">{rev.role}</p>
                     </div>
                  </div>
               </div>
             ))}
          </div>
       </div>
    </section>
  );
};

const ContactForm = () => {
  return (
    <section id="contact" className="py-20 md:py-32 relative overflow-hidden">
       <div className="absolute inset-0 z-0 bg-gradient-to-b from-transparent via-white to-transparent opacity-50" />


       <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
             <div>
                <span className="text-pm-lime font-black tracking-[0.3em] uppercase text-xs mb-4 block">Get Quotation</span>
                <h2 className="text-4xl md:text-6xl font-black text-pm-dark mb-6 md:mb-8 leading-none">Ready to <span className="text-pm-lime">Automate?</span></h2>
                <p className="text-lg text-pm-fg-muted max-w-md mb-12">
                   Fill out the form below or contact us via WhatsApp for a priority quote within 24 hours.
                </p>

                <div className="space-y-6">
                   <div className="flex items-center gap-6">
                      <div className="w-14 h-14 rounded-2xl bg-pm-dark text-white flex items-center justify-center shadow-xl">
                         <Phone size={24} />
                      </div>
                      <div>
                         <span className="block text-[10px] font-black uppercase text-pm-fg-subtle tracking-widest">Phone</span>
                         <span className="text-xl font-heading font-black text-pm-dark">+91-8047549587</span>
                      </div>
                   </div>
                   <div className="flex items-center gap-6">
                      <div className="w-14 h-14 rounded-2xl bg-pm-lime text-pm-dark flex items-center justify-center shadow-xl">
                         <Mail size={24} />
                      </div>
                      <div>
                         <span className="block text-[10px] font-black uppercase text-pm-fg-subtle tracking-widest">Email</span>
                         <span className="text-xl font-heading font-black text-pm-dark">sales@possiblemachines.in</span>
                      </div>
                   </div>
                </div>
             </div>

             <div className="glass-card p-10 rounded-[50px] relative">
                <div className="absolute -top-6 -right-6 bg-pm-lime px-4 py-2 rounded-xl text-pm-dark text-[10px] font-black shadow-xl">
                   FAST INQUIRY
                </div>
                <form className="space-y-6">
                   <div className="space-y-2">
                      <label className="text-xs font-black uppercase tracking-widest text-pm-dark/50">Full Name</label>
                      <input type="text" placeholder="John Doe" className="w-full bg-pm-dark/5 border-none rounded-2xl p-4 focus:ring-2 focus:ring-pm-lime transition-all outline-none" />
                   </div>
                   <div className="space-y-2">
                      <label className="text-xs font-black uppercase tracking-widest text-pm-dark/50">Phone Number</label>
                      <input type="tel" placeholder="+91-0000000000" className="w-full bg-pm-dark/5 border-none rounded-2xl p-4 focus:ring-2 focus:ring-pm-lime transition-all outline-none" />
                   </div>
                   <div className="space-y-2">
                      <label className="text-xs font-black uppercase tracking-widest text-pm-dark/50">Requirement Details</label>
                      <textarea placeholder="Describe your daily production needs..." rows={4} className="w-full bg-pm-dark/5 border-none rounded-2xl p-4 focus:ring-2 focus:ring-pm-lime transition-all outline-none resize-none" />
                   </div>
                   <Button className="w-full h-16 bg-pm-dark text-white font-black text-lg rounded-2xl hover:bg-pm-mid shadow-2xl transition-all">
                      Request Priority Quote
                   </Button>
                   <p className="text-center text-[10px] font-bold text-pm-fg-subtle">Average response time: 4 hours</p>
                </form>
             </div>
          </div>
       </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="bg-pm-dark pt-20 md:pt-32 pb-12 relative overflow-hidden">
       {/* Background accent */}
       <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-pm-lime/5 blur-[120px] rounded-full" />
       
       <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-16 mb-24">
             <div className="lg:col-span-2">
                <div className="flex items-center gap-2 mb-8">
                   <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center p-1 shadow-xl">
                     <img src="/logo.png" alt="Logo" className="w-full h-full object-contain" />
                   </div>
                   <span className="font-heading font-black text-xl text-white tracking-tight">PossibleMachines</span>
                </div>
                <p className="text-white/40 text-sm max-w-sm mb-12">
                   World-class block making technology manufactured in Nashik, India. We are committed to the engineering of high-capacity automated systems for global infrastructure.
                </p>
                <div className="flex gap-4">
                   {[Share2, ExternalLink, Link2].map((Icon, i) => (
                     <a key={i} href="#" className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-white/50 hover:bg-pm-lime hover:text-pm-dark transition-all">
                        <Icon size={18} />
                     </a>
                   ))}
                </div>
             </div>

             <div>
                <h5 className="text-white font-black text-xs uppercase tracking-widest mb-8">Navigation</h5>
                <ul className="space-y-4 text-white/50 text-sm font-medium">
                   {["Home", "Machines", "Technology", "About", "Reviews", "Blogs"].map(l => (
                     <li key={l}><a href="#" className="hover:text-pm-lime transition-colors">{l}</a></li>
                   ))}
                </ul>
             </div>

             <div>
                <h5 className="text-white font-black text-xs uppercase tracking-widest mb-8">Machinery</h5>
                <ul className="space-y-4 text-white/50 text-sm font-medium">
                   {["Fly Ash Bricks Machine", "Paver Block Machine", "AAC Block Plant", "Mixer Equipment", "Interlocking Systems"].map(l => (
                     <li key={l}><a href="#" className="hover:text-pm-lime transition-colors">{l}</a></li>
                   ))}
                </ul>
             </div>

             <div>
                <h5 className="text-white font-black text-xs uppercase tracking-widest mb-8">Corporate</h5>
                <p className="text-white/40 text-[10px] font-bold uppercase leading-relaxed">
                   Gut No 115, Wadivarhe Dam, Igatpuri<br />Nashik-422403, Maharashtra, India
                </p>
                <p className="text-pm-lime text-xs font-bold mt-4">+91-8047549587</p>
                <p className="text-white/40 text-[10px] font-bold uppercase mt-6">GST: 27AALCP3904E1ZH</p>
             </div>
          </div>

          <div className="border-t border-white/5 pt-12 flex flex-col md:flex-row justify-between items-center gap-6">
             <p className="text-white/20 text-[10px] font-bold uppercase tracking-widest">
                © 2024 Possible Machines Private Limited. All Rights Reserved
             </p>
             <div className="flex gap-8 text-white/20 text-[10px] font-bold uppercase tracking-widest">
                <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                <a href="#" className="hover:text-white transition-colors">Terms of Use</a>
                <a href="#" className="hover:text-white transition-colors">Cookie Policy</a>
             </div>
          </div>
       </div>
    </footer>
  );
};

// --- Main Page Assembly ---
export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <TrustBar />
      <About />
      <ProductShowcase />
      <WhyChooseUs />
      <VideoSection />
      <Testimonials />
      <ContactForm />
      <Footer />

      {/* Floating WhatsApp with Pulse */}
      <a href="https://wa.me/918047549587" target="_blank" className="whatsapp-float group">
         <div className="ring" />
         <div className="relative w-16 h-16 bg-pm-lime rounded-full shadow-2xl flex items-center justify-center text-pm-dark group-hover:scale-110 transition-transform cursor-pointer">
            <MessageCircle size={32} />
         </div>
      </a>
    </main>
  );
}
