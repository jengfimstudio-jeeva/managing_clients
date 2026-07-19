"use client";

import { useState, useEffect } from "react";
import CreateClientModal from "@/components/CreateClientModal";
import ClientCard from "@/components/ClientCard";
import { useSession } from "next-auth/react";
import { motion } from "framer-motion";
import { FolderPlus, Users, Activity, CheckCircle2, TrendingUp } from "lucide-react";

export default function DashboardPage() {
  const { data: session } = useSession();
  const [clients, setClients] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchClients = () => {
    setLoading(true);
    fetch("/api/clients")
      .then(res => res.json())
      .then(data => {
        setClients(data.clients || []);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchClients();
  }, []);

  const totalClients = clients.length;
  const completedClients = clients.filter(c => {
    const total = c.tasks.length || 15;
    const completed = c.tasks.filter((t:any) => t.status === "completed").length;
    return completed === total;
  }).length;
  const activeClients = totalClients - completedClients;
  
  // Calculate total pipeline progress across all clients
  const overallProgress = totalClients === 0 ? 0 : Math.round(
    clients.reduce((acc, c) => {
      const total = c.tasks.length || 15;
      const completed = c.tasks.filter((t:any) => t.status === "completed").length;
      return acc + (completed / total);
    }, 0) / totalClients * 100
  );

  // Group clients by month
  const groupedClients = clients.reduce((acc: any, client) => {
    const date = new Date(client.createdAt || Date.now());
    const monthYear = date.toLocaleString('default', { month: 'long', year: 'numeric' });
    if (!acc[monthYear]) {
      acc[monthYear] = [];
    }
    acc[monthYear].push(client);
    return acc;
  }, {});

  // Sort months in descending order (newest month first) so August automatically appears above July
  const sortedMonths = Object.entries(groupedClients).sort(([monthA]: [string, any], [monthB]: [string, any]) => {
    return new Date(monthB).getTime() - new Date(monthA).getTime();
  });

  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.4 } }
  };

  return (
    <div className="space-y-10 max-w-7xl mx-auto pb-20">
      
      {/* Cinematic Hero Section */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="relative overflow-hidden rounded-3xl border border-white/10 bg-black/40 backdrop-blur-xl p-10 md:p-14 shadow-2xl"
      >
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/20 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-purple-600/20 rounded-full blur-[100px] translate-y-1/3 -translate-x-1/4 pointer-events-none" />
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1601506521937-0121a7fc2a6b?q=80&w=2071&auto=format&fit=crop')] bg-cover bg-center opacity-[0.03] mix-blend-overlay" />
        
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-white/70 text-sm font-medium mb-6 backdrop-blur-md">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              System Online & Secure
            </div>
            <h1 className="text-5xl md:text-6xl font-black tracking-tight text-white mb-4 leading-tight">
              Welcome back, <br className="hidden md:block"/><span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-400">{session?.user?.name || "Jeeva"}</span>
            </h1>
            <p className="text-white/60 text-lg md:text-xl leading-relaxed">
              Your cinematic production hub. Manage enterprise clients, track master pipelines, and deliver timeless films at scale.
            </p>
          </div>
          <div className="shrink-0">
            <CreateClientModal onCreated={fetchClients} />
          </div>
        </div>
      </motion.div>

      {/* Analytics Overview */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {[
          { title: "Total Clients", value: totalClients, icon: Users, color: "text-blue-400", bg: "bg-blue-400/10" },
          { title: "Active Pipelines", value: activeClients, icon: Activity, color: "text-amber-400", bg: "bg-amber-400/10" },
          { title: "Completed Projects", value: completedClients, icon: CheckCircle2, color: "text-green-400", bg: "bg-green-400/10" },
          { title: "Studio Velocity", value: `${overallProgress}%`, icon: TrendingUp, color: "text-purple-400", bg: "bg-purple-400/10" },
        ].map((stat, i) => (
          <div key={i} className="bg-white/[0.02] border border-white/5 backdrop-blur-md rounded-2xl p-6 hover:bg-white/[0.04] transition-colors group relative overflow-hidden">
            <div className={`absolute top-0 right-0 w-32 h-32 ${stat.bg} blur-[50px] rounded-full -translate-y-1/2 translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
            <div className="relative z-10 flex items-center justify-between mb-4">
              <span className="text-white/50 font-medium">{stat.title}</span>
              <div className={`w-10 h-10 rounded-xl ${stat.bg} ${stat.color} flex items-center justify-center`}>
                <stat.icon className="w-5 h-5" />
              </div>
            </div>
            <div className="relative z-10 text-4xl font-black text-white">{loading ? "-" : stat.value}</div>
          </div>
        ))}
      </motion.div>

      {/* Client Roster */}
      <div className="pt-6">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-1.5 h-8 bg-primary rounded-full shadow-[0_0_15px_rgba(var(--primary),0.5)]" />
          <h2 className="text-2xl font-bold text-white">Active Roster</h2>
        </div>

        {loading ? (
          <div className="flex justify-center py-24">
            <div className="relative w-16 h-16">
              <div className="absolute inset-0 rounded-full border-t-2 border-primary animate-spin"></div>
              <div className="absolute inset-2 rounded-full border-r-2 border-purple-500 animate-spin flex-reverse"></div>
            </div>
          </div>
        ) : clients.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-32 rounded-3xl bg-white/[0.02] border border-white/5 backdrop-blur-sm relative overflow-hidden"
          >
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-primary/10 blur-[80px] rounded-full" />
            <div className="relative z-10 flex flex-col items-center">
              <div className="w-20 h-20 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-6 shadow-inner">
                <FolderPlus className="w-10 h-10 text-white/30" />
              </div>
              <h3 className="text-3xl font-bold mb-3 text-white">Your studio is empty</h3>
              <p className="text-white/50 mb-8 max-w-md mx-auto text-lg">You haven't added any enterprise clients yet. Click the button above to onboard your first client.</p>
              <CreateClientModal onCreated={fetchClients} />
            </div>
          </motion.div>
        ) : (
          <div className="space-y-12">
            {sortedMonths.map(([month, monthClients]: [string, any]) => (
              <div key={month} className="space-y-6">
                <div className="flex items-center gap-4">
                  <h3 className="text-xl font-bold text-white/70">{month}</h3>
                  <div className="h-px bg-white/10 flex-1" />
                  <span className="text-sm font-medium text-white/40">{monthClients.length} {monthClients.length === 1 ? 'Client' : 'Clients'}</span>
                </div>
                <motion.div 
                  variants={container}
                  initial="hidden"
                  animate="show"
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                >
                  {monthClients.map((client: any) => (
                    <motion.div key={client._id} variants={item}>
                      <ClientCard client={client} />
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
