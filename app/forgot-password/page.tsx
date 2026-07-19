"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { motion } from "framer-motion";
import { Video, ArrowLeft, Mail, KeyRound, Lock } from "lucide-react";

export default function ForgotPasswordPage() {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const handleSendCode = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "send_code", email }),
      });
      
      const data = await res.json();
      
      if (res.ok) {
        // In a real app, this goes to their email. For this demo, we simulate it via toast so it's fully testable.
        toast({ 
          title: "Email Sent!", 
          description: `Simulated Email: Your verification code is ${data.code}`,
          duration: 10000 
        });
        setStep(2);
      } else {
        toast({ title: "Error", description: data.error, variant: "destructive" });
      }
    } catch (error) {
      toast({ title: "Error", description: "Something went wrong.", variant: "destructive" });
    }
    setIsLoading(false);
  };

  const handleVerifyCode = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "verify_code", email, code }),
      });
      
      if (res.ok) {
        toast({ title: "Verified", description: "Code accepted. Please enter your new password." });
        setStep(3);
      } else {
        const data = await res.json();
        toast({ title: "Error", description: data.error || "Invalid code", variant: "destructive" });
      }
    } catch (error) {
      toast({ title: "Error", description: "Something went wrong.", variant: "destructive" });
    }
    setIsLoading(false);
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "reset_password", email, code, newPassword }),
      });
      
      if (res.ok) {
        toast({ title: "Success!", description: "Your password has been successfully reset. You can now login." });
        router.push("/login");
      } else {
        const data = await res.json();
        toast({ title: "Error", description: data.error || "Failed to reset password", variant: "destructive" });
      }
    } catch (error) {
      toast({ title: "Error", description: "Something went wrong.", variant: "destructive" });
    }
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex bg-[#050505] selection:bg-primary/30 relative overflow-hidden">
      {/* Background Grid */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{ backgroundImage: 'linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)', backgroundSize: '40px 40px' }}
      />

      <div className="w-full flex flex-col relative z-10">
        <div className="p-8">
          <Link href="/login" className="inline-flex items-center text-sm font-medium text-white/50 hover:text-white transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to login
          </Link>
        </div>
        
        <div className="flex-1 flex flex-col justify-center items-center px-8 sm:px-16">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-sm space-y-8 bg-white/[0.02] p-8 rounded-3xl border border-white/5 backdrop-blur-xl shadow-2xl"
          >
            <div className="text-center space-y-2">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center mx-auto mb-6 shadow-lg shadow-primary/20">
                {step === 1 && <Mail className="w-6 h-6 text-white" />}
                {step === 2 && <KeyRound className="w-6 h-6 text-white" />}
                {step === 3 && <Lock className="w-6 h-6 text-white" />}
              </div>
              <h1 className="text-2xl font-bold tracking-tight text-white">
                {step === 1 && "Forgot Password"}
                {step === 2 && "Enter Verification Code"}
                {step === 3 && "Create New Password"}
              </h1>
              <p className="text-white/50 text-sm">
                {step === 1 && "Enter your email address and we'll send you a 6-digit verification code."}
                {step === 2 && `We sent a code to ${email}.`}
                {step === 3 && "Please enter a strong new password."}
              </p>
            </div>

            {step === 1 && (
              <form onSubmit={handleSendCode} className="space-y-5">
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
                <Button type="submit" className="w-full h-12 bg-white text-black hover:bg-white/90 font-semibold" disabled={isLoading}>
                  {isLoading ? "Sending..." : "Send Verification Code"}
                </Button>
              </form>
            )}

            {step === 2 && (
              <form onSubmit={handleVerifyCode} className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="code">6-Digit Code</Label>
                  <Input 
                    id="code" 
                    type="text" 
                    required 
                    maxLength={6}
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    className="bg-white/5 border-white/10 text-white text-center tracking-[0.5em] font-mono text-xl h-12"
                    placeholder="------"
                  />
                </div>
                <Button type="submit" className="w-full h-12 bg-white text-black hover:bg-white/90 font-semibold" disabled={isLoading || code.length !== 6}>
                  {isLoading ? "Verifying..." : "Verify Code"}
                </Button>
                <button type="button" onClick={() => setStep(1)} className="w-full text-sm text-primary hover:underline mt-2">
                  Use a different email
                </button>
              </form>
            )}

            {step === 3 && (
              <form onSubmit={handleResetPassword} className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="newPassword">New Password</Label>
                  <Input 
                    id="newPassword" 
                    type="password" 
                    required 
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="bg-white/5 border-white/10 text-white h-12"
                    placeholder="••••••••"
                  />
                </div>
                <Button type="submit" className="w-full h-12 bg-primary hover:bg-primary/90 text-white font-semibold" disabled={isLoading}>
                  {isLoading ? "Resetting..." : "Reset Password"}
                </Button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
