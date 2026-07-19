"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion, useScroll, useTransform } from "framer-motion";
import { Video, CalendarCheck, Clapperboard, ChevronRight, ArrowRight, CheckCircle2, Star, PlayCircle } from "lucide-react";
import { useRef } from "react";

export default function LandingPage() {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.3, 1, 0.3]);

  return (
    <div className="min-h-screen bg-[#050505] text-foreground flex flex-col overflow-hidden selection:bg-primary/30">
      
      {/* Navbar - Glassmorphic */}
      <header className="fixed top-0 w-full z-50 bg-black/40 backdrop-blur-xl border-b border-white/5 transition-all">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center shadow-lg shadow-primary/20">
              <Video className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-2xl tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-white to-white/70">
              jengFilm
            </span>
          </div>
          <nav className="hidden md:flex gap-8 text-sm font-medium text-white/60">
            <a href="#features" className="hover:text-white transition-colors">Services</a>
            <a href="#pipeline" className="hover:text-white transition-colors">Pipeline</a>
            <a href="#impact" className="hover:text-white transition-colors">Impact</a>
          </nav>
          <div className="flex gap-4">
            <Link href="/login">
              <Button variant="ghost" className="text-white/80 hover:text-white hover:bg-white/10 hidden sm:flex">Login</Button>
            </Link>
            <Link href="/signup">
              <Button className="bg-white text-black hover:bg-white/90 font-semibold shadow-[0_0_20px_rgba(255,255,255,0.2)] transition-all hover:shadow-[0_0_30px_rgba(255,255,255,0.4)]">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1 relative">
        {/* Background Imagery & Ambient Glows */}
        <div className="absolute top-0 left-0 w-full h-[800px] overflow-hidden -z-20">
          <img 
            src="https://images.unsplash.com/photo-1590608897129-79da98d15969?q=80&w=2070&auto=format&fit=crop" 
            alt="Cinematic background" 
            className="w-full h-full object-cover opacity-20 object-top"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#050505]/80 to-[#050505]" />
        </div>
        
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[1000px] h-[500px] bg-primary/20 blur-[120px] rounded-full pointer-events-none -z-10" />
        <div className="absolute top-[20%] -left-[10%] w-[500px] h-[500px] bg-purple-600/20 blur-[120px] rounded-full pointer-events-none -z-10" />

        {/* Hero Section */}
        <section className="relative pt-40 pb-20 md:pt-52 md:pb-32 px-6 flex flex-col items-center justify-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="flex flex-col items-center z-10"
          >
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 mb-8 backdrop-blur-md shadow-[0_0_20px_rgba(255,255,255,0.1)]"
            >
              <span className="flex h-2 w-2 rounded-full bg-green-400 animate-pulse"></span>
              <span className="text-sm font-medium text-white">JengFilm Studio CRM v2.0 is live</span>
            </motion.div>
            
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tighter max-w-5xl leading-[1.1] mb-8 text-white">
              Cinematic quality meets <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-purple-400 to-blue-500">
                enterprise scale.
              </span>
            </h1>
            
            <p className="max-w-2xl text-lg md:text-xl text-white/70 mb-12 font-light leading-relaxed">
              Manage your enterprise video production clients, track multi-stage projects in real-time, and deliver breathtaking experiences with our integrated AI-powered CRM.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
              <Link href="/signup">
                <Button size="lg" className="w-full sm:w-auto h-14 px-8 text-base bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 text-white shadow-xl shadow-primary/30 border-0">
                  Start Your Studio
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link href="/login">
                <Button size="lg" variant="outline" className="w-full sm:w-auto h-14 px-8 text-base border-white/20 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white">
                  <PlayCircle className="mr-2 w-5 h-5" />
                  View Dashboard
                </Button>
              </Link>
            </div>
          </motion.div>

          {/* Hero Imagery Grid */}
          <motion.div 
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.3, ease: "easeOut" }}
            className="mt-24 w-full max-w-7xl relative grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent z-10 bottom-[-2px] h-[120%]" />
            
            <div className="md:col-span-2 h-64 md:h-[400px] rounded-2xl overflow-hidden relative border border-white/10 group">
              <img src="https://images.unsplash.com/photo-1601506521937-0121a7fc2a6b?q=80&w=2071&auto=format&fit=crop" alt="Video editing timeline" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
              <div className="absolute bottom-6 left-6 text-left">
                <div className="px-3 py-1 bg-primary/80 backdrop-blur-md rounded text-xs font-bold text-white mb-2 inline-block">AI-Integrated</div>
                <h3 className="text-2xl font-bold text-white">Advanced Timeline Management</h3>
              </div>
            </div>
            
            <div className="h-64 md:h-[400px] rounded-2xl overflow-hidden relative border border-white/10 group">
              <img src="https://images.unsplash.com/photo-1534972195531-d756b9bfa9f2?q=80&w=2070&auto=format&fit=crop" alt="Studio lights" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
              <div className="absolute bottom-6 left-6 text-left">
                <div className="px-3 py-1 bg-purple-600/80 backdrop-blur-md rounded text-xs font-bold text-white mb-2 inline-block">Studio</div>
                <h3 className="text-2xl font-bold text-white">Full Production Pipeline</h3>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Services Section with Bento Box style images */}
        <section id="features" className="py-32 relative z-10" ref={targetRef}>
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-20">
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6 text-white">Built for production teams</h2>
              <p className="text-white/50 max-w-2xl mx-auto text-lg leading-relaxed">
                Streamline your workflow from client onboarding to final cut delivery with our specialized service packages tailored for modern video agencies.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {[
                { 
                  title: "AI-Integrated Editing", 
                  icon: Video, 
                  desc: "State-of-the-art AI workflows to deliver premium cuts in record time.",
                  img: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop",
                  color: "from-blue-600/60 to-cyan-600/60"
                },
                { 
                  title: "Monthly Retainers", 
                  icon: CalendarCheck, 
                  desc: "Enterprise video solutions for continuous content delivery and growth.",
                  img: "https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?q=80&w=2070&auto=format&fit=crop",
                  color: "from-purple-600/60 to-pink-600/60"
                },
                { 
                  title: "Video Handling", 
                  icon: Clapperboard, 
                  desc: "End-to-end post-production and digital asset management.",
                  img: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=2071&auto=format&fit=crop",
                  color: "from-amber-600/60 to-orange-600/60"
                }
              ].map((service, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ delay: i * 0.2, duration: 0.7 }}
                  whileHover={{ y: -10 }}
                  className="group relative h-[450px] rounded-3xl overflow-hidden border border-white/10 bg-white/5"
                >
                  <img src={service.img} alt={service.title} className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:opacity-60 transition-opacity duration-500 group-hover:scale-105" />
                  <div className={`absolute inset-0 bg-gradient-to-t ${service.color} opacity-80 mix-blend-multiply`} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                  
                  <div className="absolute inset-0 p-8 flex flex-col justify-end">
                    <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center mb-6 shadow-xl transform group-hover:-translate-y-2 transition-transform duration-500">
                      <service.icon className="w-7 h-7 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold mb-3 text-white">{service.title}</h3>
                    <p className="text-white/70 leading-relaxed font-medium">{service.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Detailed Feature Section with Parallax Image */}
        <section id="pipeline" className="py-32 bg-[#0a0a0a] border-y border-white/5 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 blur-[120px] rounded-full pointer-events-none" />
          <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center relative z-10">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight leading-tight text-white">
                The ultimate 15-step <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-400">client pipeline.</span>
              </h2>
              <p className="text-lg text-white/60">
                Stop guessing where a project is. Our built-in tracker forces a disciplined 15-step pipeline for every client, ensuring absolute quality control and transparent progress.
              </p>
              <ul className="space-y-5 mt-8">
                {["Automated workspace generation per client", "Color-coded micro-interactions for fast status updates", "One-click CSV exports for enterprise reporting", "Secure role-based dashboard access"].map((item, i) => (
                  <motion.li 
                    key={i} 
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 + 0.5 }}
                    className="flex items-center gap-4"
                  >
                    <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 border border-primary/30">
                      <CheckCircle2 className="w-5 h-5 text-primary" />
                    </div>
                    <span className="text-white/80 font-medium">{item}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
            
            {/* Visual Element - Image + Floating UI */}
            <motion.div 
              style={{ y, opacity }}
              className="relative aspect-[4/5] md:aspect-square rounded-3xl border border-white/10 overflow-hidden shadow-2xl"
            >
              <img 
                src="https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?q=80&w=2070&auto=format&fit=crop" 
                alt="Director looking at screen" 
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/40" />
              
              <div className="absolute inset-0 flex flex-col items-center justify-center p-8">
                <div className="w-full max-w-sm space-y-4">
                  {[
                    { id: 1, name: "Initial Brief", state: "done" },
                    { id: 2, name: "Script Approval", state: "done" },
                    { id: 3, name: "Rough Cut Review", state: "active" },
                  ].map((step, i) => (
                    <motion.div 
                      key={step.id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.2 + 0.5 }}
                      whileHover={{ scale: 1.05 }}
                      className={`p-5 rounded-2xl border flex items-center justify-between shadow-2xl backdrop-blur-xl transition-all ${
                        step.state === 'done' ? 'bg-green-500/20 border-green-500/40' : 
                        'bg-primary/30 border-primary/50'
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold shadow-inner ${
                          step.state === 'done' ? 'bg-green-500 text-white' : 
                          'bg-primary text-white'
                        }`}>
                          {step.id}
                        </div>
                        <div className="font-bold text-white text-lg">
                          {step.name}
                        </div>
                      </div>
                      {step.state === 'done' && <CheckCircle2 className="w-6 h-6 text-green-400 drop-shadow-[0_0_8px_rgba(74,222,128,0.8)]" />}
                      {step.state === 'active' && <div className="w-3 h-3 rounded-full bg-primary animate-pulse mr-2 shadow-[0_0_10px_rgba(147,51,234,0.8)]" />}
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Stats Section */}
        <section id="impact" className="py-32 relative overflow-hidden">
          <div className="absolute inset-0">
            <img src="https://images.unsplash.com/photo-1478720568477-152d9b164e26?q=80&w=2070&auto=format&fit=crop" alt="Cinema" className="w-full h-full object-cover opacity-10" />
            <div className="absolute inset-0 bg-[#050505]/90" />
          </div>
          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-0 md:divide-x divide-white/10">
              {[
                { number: "150+", label: "Enterprise Clients" },
                { number: "3,000+", label: "Videos Delivered" },
                { number: "4.9/5", label: "Average Rating" },
                { number: "99%", label: "Pipeline Efficiency" }
              ].map((stat, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, type: "spring" }}
                  className="text-center flex flex-col items-center justify-center p-6 hover:bg-white/5 transition-colors rounded-3xl"
                >
                  <h4 className="text-4xl md:text-5xl lg:text-7xl font-extrabold tracking-tighter text-white mb-4 drop-shadow-[0_0_30px_rgba(255,255,255,0.2)]">{stat.number}</h4>
                  <p className="text-primary font-bold uppercase tracking-widest text-xs md:text-sm">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-black pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-12">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center shadow-[0_0_20px_rgba(147,51,234,0.3)]">
                <Video className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-2xl tracking-tight text-white/90">jengFilm Studio</span>
            </div>
            <div className="flex flex-wrap justify-center gap-8 text-sm font-medium text-white/50">
              <a href="#" className="hover:text-white transition-colors">Platform</a>
              <a href="#" className="hover:text-white transition-colors">Pricing</a>
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            </div>
          </div>
          <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent mb-8" />
          <p className="text-center text-white/30 text-sm">
            © {new Date().getFullYear()} jengFilm Studio CRM. All rights reserved. Built for visionaries.
          </p>
        </div>
      </footer>
    </div>
  );
}
