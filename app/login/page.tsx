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
import { Video, ArrowLeft } from "lucide-react";

export default function LoginPage() {
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
        <div className="p-8">
          <Link href="/" className="inline-flex items-center text-sm font-medium text-white/50 hover:text-white transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to home
          </Link>
        </div>
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
              <h1 className="text-3xl font-bold tracking-tight text-white">Welcome back</h1>
              <p className="text-white/60">Enter your credentials to access the studio.</p>
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

            <p className="text-center text-sm text-white/50">
              Don't have an account? <Link href="/signup" className="text-primary font-medium hover:underline">Request access</Link>
            </p>
          </motion.div>
        </div>
      </div>

      {/* Right Image Side */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-zinc-900 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-purple-900/40 mix-blend-overlay z-10" />
        <img 
          src="https://images.unsplash.com/photo-1590608897129-79da98d15969?q=80&w=2070&auto=format&fit=crop" 
          alt="Cinematic camera setup" 
          className="absolute inset-0 w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent z-10" />
        
        <div className="absolute bottom-12 left-12 right-12 z-20">
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="p-8 rounded-2xl bg-black/40 backdrop-blur-xl border border-white/10"
          >
            <p className="text-xl font-medium text-white mb-4 leading-relaxed italic">
              "Where the most meaningful moments of your life become timeless films."
            </p>
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center shadow-lg shadow-primary/20">
                <span className="text-white font-bold">J</span>
              </div>
              <div>
                <p className="text-white font-semibold">Jeeva</p>
                <p className="text-white/50 text-sm">Founder & CEO, JengFilm Studio</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
