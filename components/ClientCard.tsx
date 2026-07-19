"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { motion } from "framer-motion";
import Link from "next/link";
import { Building2, User, ChevronRight, Activity } from "lucide-react";

export default function ClientCard({ client }: { client: any }) {
  const completedTasks = client.tasks.filter((t: any) => t.status === "completed").length;
  const totalTasks = client.tasks.length || 15;
  const progress = (completedTasks / totalTasks) * 100;
  
  let progressColor = "bg-red-500";
  let glowColor = "group-hover:shadow-[0_0_30px_rgba(239,68,68,0.2)] border-red-500/20";
  let bgGlow = "bg-red-500/5";
  if (progress > 30) {
    progressColor = "bg-amber-500";
    glowColor = "group-hover:shadow-[0_0_30px_rgba(245,158,11,0.2)] border-amber-500/20";
    bgGlow = "bg-amber-500/5";
  }
  if (progress === 100) {
    progressColor = "bg-green-500";
    glowColor = "group-hover:shadow-[0_0_30px_rgba(34,197,94,0.3)] border-green-500/30";
    bgGlow = "bg-green-500/5";
  }

  return (
    <Link href={`/dashboard/packages/${client.packageId?.slug || ''}#client-${client._id}`}>
      <motion.div 
        whileHover={{ y: -8, scale: 1.02 }} 
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
        className="h-full"
      >
        <Card className={`h-full ${bgGlow} backdrop-blur-xl transition-all duration-300 cursor-pointer group border ${glowColor} overflow-hidden relative shadow-lg`}>
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="absolute -top-24 -right-24 w-48 h-48 bg-white/5 rounded-full blur-[40px] group-hover:scale-150 transition-transform duration-700 pointer-events-none" />
          
          <CardHeader className="pb-4 relative z-10">
            <div className="flex justify-between items-start mb-5">
              <span className="text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-full bg-black/50 text-white/80 border border-white/10 backdrop-blur-md shadow-inner">
                {client.packageId?.name || 'Unknown Package'}
              </span>
              <div className={`w-2 h-2 rounded-full ${progressColor} animate-pulse shadow-[0_0_10px_currentColor]`} />
            </div>
            <CardTitle className="text-2xl font-bold flex items-start gap-3 text-white tracking-tight">
              <div className="p-2.5 rounded-xl bg-white/10 border border-white/10 text-primary shadow-inner mt-1">
                <Building2 className="w-5 h-5" />
              </div>
              <span className="leading-tight">{client.enterpriseName}</span>
            </CardTitle>
            <CardDescription className="flex items-center gap-2 mt-3 ml-1 text-sm font-medium text-white/50">
              <User className="w-4 h-4 text-white/30" />
              {client.customerName}
            </CardDescription>
          </CardHeader>
          
          <CardContent className="relative z-10 pb-6">
            <div className="space-y-3 bg-black/40 p-5 rounded-2xl border border-white/5 backdrop-blur-md">
              <div className="flex justify-between items-end">
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-white/40 mb-1">
                  <Activity className="w-3 h-3" />
                  Status
                </div>
                <div className="text-white font-black text-xl">
                  {Math.round(progress)}<span className="text-white/30 text-sm ml-1">%</span>
                </div>
              </div>
              <Progress value={progress} indicatorColor={progressColor} className="h-2 bg-white/5 shadow-inner" />
            </div>
            
            <div className="mt-6 flex items-center justify-end text-sm font-bold text-white/30 group-hover:text-white transition-colors duration-300">
              OPEN PIPELINE <ChevronRight className="w-4 h-4 ml-1 transform group-hover:translate-x-1.5 transition-transform duration-300" />
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </Link>
  );
}
