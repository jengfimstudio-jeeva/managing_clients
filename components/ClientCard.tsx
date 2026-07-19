"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { motion } from "framer-motion";
import Link from "next/link";
import { Building2, User, ChevronRight } from "lucide-react";

export default function ClientCard({ client }: { client: any }) {
  const completedTasks = client.tasks.filter((t: any) => t.status === "completed").length;
  const totalTasks = client.tasks.length || 15;
  const progress = (completedTasks / totalTasks) * 100;
  
  let progressColor = "bg-red-500";
  let glowColor = "group-hover:shadow-red-500/10 border-red-500/20";
  if (progress > 30) {
    progressColor = "bg-amber-500";
    glowColor = "group-hover:shadow-amber-500/10 border-amber-500/20";
  }
  if (progress === 100) {
    progressColor = "bg-green-500";
    glowColor = "group-hover:shadow-green-500/20 border-green-500/30";
  }

  return (
    <Link href={`/dashboard/packages/${client.packageId?.slug || ''}#client-${client._id}`}>
      <motion.div 
        whileHover={{ y: -6 }} 
        transition={{ type: "spring", stiffness: 300 }}
        className="h-full"
      >
        <Card className={`h-full bg-white/5 backdrop-blur-sm transition-all duration-300 cursor-pointer group border ${glowColor} overflow-hidden relative`}>
          <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          
          <CardHeader className="pb-4 relative z-10">
            <div className="flex justify-between items-start mb-4">
              <span className="text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-full bg-black/40 text-white/70 border border-white/5">
                {client.packageId?.name || 'Unknown Package'}
              </span>
            </div>
            <CardTitle className="text-xl flex items-center gap-3 text-white/90">
              <div className="p-2 rounded-lg bg-white/5 border border-white/10 text-primary">
                <Building2 className="w-4 h-4" />
              </div>
              {client.enterpriseName}
            </CardTitle>
            <CardDescription className="flex items-center gap-2 mt-2 ml-1 text-sm text-white/50">
              <User className="w-4 h-4" />
              {client.customerName}
            </CardDescription>
          </CardHeader>
          <CardContent className="relative z-10 pb-6">
            <div className="space-y-3 bg-black/20 p-4 rounded-xl border border-white/5">
              <div className="flex justify-between text-sm font-medium">
                <span className="text-white/70">Pipeline Progress</span>
                <span className="text-white font-bold">{completedTasks} <span className="text-white/40">/ {totalTasks}</span></span>
              </div>
              <Progress value={progress} indicatorColor={progressColor} className="h-1.5 bg-white/10" />
            </div>
            
            <div className="mt-6 flex items-center justify-end text-sm font-medium text-white/40 group-hover:text-primary transition-colors">
              View Profile <ChevronRight className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" />
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </Link>
  );
}
