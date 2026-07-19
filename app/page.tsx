"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { motion } from "framer-motion";
import { Video } from "lucide-react";

export default function LoginPageAsLanding() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (res?.error) {
      toast({ title: "Authentication Failed", description: "Invalid email or password", variant: "destructive" });
      setIsLoading(false);
    } else {
      router.push("/dashboard");
    }
  };

  return (
    <div className="min-h-screen flex bg-background selection:bg-primary/30">
      {/* Left Form Side */}
      <div className="w-full lg:w-1/2 flex flex-col relative z-10 bg-background/50 backdrop-blur-xl">
        <div className="flex-1 flex flex-col justify-center items-center px-8 sm:px-16">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-sm space-y-8"
          >
            <div className="text-center space-y-2">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center mx-auto mb-6 shadow-lg shadow-primary/20">
                <Video className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-3xl font-bold tracking-tight text-white">jengFilm Access</h1>
              <p className="text-white/60">Enter your credentials to access the studio pipeline.</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input 
                  id="email" 
                  type="email" 
                  required 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-white/5 border-white/10 text-white placeholder:text-white/30 h-12"
                  placeholder="director@jengfilm.com"
                />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <Label htmlFor="password">Password</Label>
                  <Link href="/forgot-password" className="text-xs text-primary hover:underline">Forgot password?</Link>
                </div>
                <Input 
                  id="password" 
                  type="password" 
                  required 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-white/5 border-white/10 text-white h-12"
                  placeholder="••••••••"
                />
              </div>
              <Button type="submit" className="w-full h-12 bg-white text-black hover:bg-white/90 font-semibold shadow-[0_0_20px_rgba(255,255,255,0.1)]" disabled={isLoading}>
                {isLoading ? "Signing in..." : "Sign In"}
              </Button>
            </form>
          </motion.div>
        </div>
      </div>

      {/* Right Image Side */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-[#050505] overflow-hidden">
        {/* Animated Cinematic Elements */}
        <motion.div 
          animate={{ scale: [1, 1.05, 1], opacity: [0.4, 0.6, 0.4] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-0 z-0"
        >
          <img 
            src="https://images.unsplash.com/photo-1534972195531-d756b9bfa9f2?q=80&w=2070&auto=format&fit=crop" 
            alt="Cinematic Studio Background" 
            className="w-full h-full object-cover opacity-30"
          />
        </motion.div>

        {/* Floating Animated Glows */}
        <motion.div 
          animate={{ opacity: [0.2, 0.5, 0.2], x: [0, -30, 0], y: [0, 40, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/20 blur-[120px] rounded-full pointer-events-none z-10" 
        />
        <motion.div 
          animate={{ opacity: [0.1, 0.4, 0.1], x: [0, 40, 0], y: [0, -30, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-600/20 blur-[120px] rounded-full pointer-events-none z-10" 
        />
        
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/40 to-transparent z-10" />
        
        {/* Centered Welcome Overlay */}
        <div className="absolute inset-0 flex flex-col items-center justify-center z-20">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6 backdrop-blur-md">
              <span className="flex h-2 w-2 rounded-full bg-green-400 animate-pulse"></span>
              <span className="text-xs font-medium text-white/80 tracking-widest uppercase">System Online</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-black text-white tracking-tight drop-shadow-2xl">
              Welcome to <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-400">
                jengFilm Studio
              </span>
            </h1>
          </motion.div>
        </div>

        {/* CEO Quote at Bottom */}
        <div className="absolute bottom-12 left-12 right-12 z-20">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="p-8 rounded-3xl bg-black/40 backdrop-blur-2xl border border-white/5 shadow-2xl"
          >
            <p className="text-xl font-medium text-white mb-6 leading-relaxed italic">
              "Where the most meaningful moments of your life become timeless films."
            </p>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center shadow-[0_0_15px_rgba(147,51,234,0.3)]">
                <span className="text-white font-bold text-lg">J</span>
              </div>
              <div>
                <p className="text-white font-bold">Jeeva</p>
                <p className="text-white/50 text-sm font-medium">Founder & CEO, JengFilm Studio</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
