"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { motion } from "framer-motion";
import { Video, ArrowLeft, ShieldCheck } from "lucide-react";

export default function SignupPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });

    if (res.ok) {
      toast({ title: "Account Created", description: "Welcome to the studio. Please log in." });
      router.push("/login");
    } else {
      const data = await res.json();
      toast({ title: "Signup Failed", description: data.error || "An error occurred", variant: "destructive" });
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-background selection:bg-primary/30">
      
      {/* Left Image Side */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-zinc-900 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-tr from-blue-900/40 to-primary/20 mix-blend-overlay z-10" />
        <img 
          src="https://images.unsplash.com/photo-1534972195531-d756b9bfa9f2?q=80&w=2070&auto=format&fit=crop" 
          alt="Studio lighting setup" 
          className="absolute inset-0 w-full h-full object-cover opacity-50"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent z-10" />
        
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 text-center w-full px-12">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            <ShieldCheck className="w-16 h-16 text-white/50 mx-auto mb-6" />
            <h2 className="text-4xl font-bold text-white mb-4">Enterprise-grade security</h2>
            <p className="text-lg text-white/70 max-w-md mx-auto">
              Your video assets and client data are protected with state-of-the-art encryption and role-based access.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Right Form Side */}
      <div className="w-full lg:w-1/2 flex flex-col relative z-10 bg-background/50 backdrop-blur-xl">
        <div className="p-8 flex justify-end">
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
              <h1 className="text-3xl font-bold tracking-tight text-white">Create an account</h1>
              <p className="text-white/60">Set up your studio workspace in seconds.</p>
            </div>

            <form onSubmit={handleSignup} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input 
                  id="name" 
                  type="text" 
                  required 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="bg-white/5 border-white/10 text-white placeholder:text-white/30 h-12"
                  placeholder="Jane Doe"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Work Email</Label>
                <Input 
                  id="email" 
                  type="email" 
                  required 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-white/5 border-white/10 text-white placeholder:text-white/30 h-12"
                  placeholder="jane@studio.com"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
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
              <Button type="submit" className="w-full h-12 bg-white text-black hover:bg-white/90 font-semibold shadow-[0_0_20px_rgba(255,255,255,0.1)] mt-4" disabled={isLoading}>
                {isLoading ? "Creating..." : "Create Account"}
              </Button>
            </form>

            <p className="text-center text-sm text-white/50">
              Already have an account? <Link href="/login" className="text-primary font-medium hover:underline">Log in</Link>
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
