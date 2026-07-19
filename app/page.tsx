"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Video, Lock } from "lucide-react";
import { motion } from "framer-motion";

export default function InternalPortal() {
  return (
    <div className="min-h-screen bg-[#050505] text-foreground flex flex-col items-center justify-center relative overflow-hidden selection:bg-primary/30">
      
      {/* Animated Cinematic Background Imagery */}
      <div className="absolute inset-0 w-full h-full overflow-hidden -z-20">
        <motion.img 
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.3 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          src="https://images.unsplash.com/photo-1590608897129-79da98d15969?q=80&w=2070&auto=format&fit=crop" 
          alt="Cinematic background" 
          className="w-full h-full object-cover object-center blur-sm"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#050505]/40 via-[#050505]/80 to-[#050505]" />
      </div>

      {/* Ambient Animated Glows */}
      <motion.div 
        animate={{ opacity: [0.3, 0.5, 0.3], scale: [1, 1.05, 1] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[1000px] h-[500px] bg-primary/20 blur-[120px] rounded-full pointer-events-none -z-10" 
      />
      <motion.div 
        animate={{ opacity: [0.2, 0.4, 0.2], scale: [1, 1.1, 1] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute top-[20%] -left-[10%] w-[500px] h-[500px] bg-purple-600/20 blur-[120px] rounded-full pointer-events-none -z-10" 
      />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="w-full max-w-md p-8 md:p-10 rounded-3xl bg-white/[0.02] border border-white/10 backdrop-blur-2xl shadow-2xl text-center relative z-10"
      >
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center mx-auto mb-6 shadow-lg shadow-primary/20">
          <Video className="w-8 h-8 text-white" />
        </div>
        
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-bold uppercase tracking-wide mb-6 shadow-inner">
          <Lock className="w-3 h-3" /> Internal Portal
        </div>

        <h1 className="text-3xl font-bold text-white mb-2 tracking-tight">jengFilm Employee Access</h1>
        <p className="text-white/50 text-sm mb-10 leading-relaxed">
          Welcome to the master management system. Please sign in with your secure credentials to access the client roster and pipelines.
        </p>

        <div className="space-y-4">
          <Link href="/login" className="block">
            <Button className="w-full h-14 bg-white text-black hover:bg-white/90 font-bold text-lg rounded-xl shadow-[0_0_20px_rgba(255,255,255,0.1)]">
              Proceed to Login
            </Button>
          </Link>
          <p className="text-xs text-white/30 font-medium">
            Secure connection established.
          </p>
        </div>
      </motion.div>
      
      <motion.p 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="mt-12 text-sm text-white/30 relative z-10"
      >
        © {new Date().getFullYear()} jengFilm Studio. For internal use only.
      </motion.p>
    </div>
  );
}
