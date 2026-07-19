"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import TaskChecklist from "@/components/TaskChecklist";
import { Download, Building2, MapPin, Phone, Mail, FolderOpen, Trash2, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import EditClientModal from "@/components/EditClientModal";

export default function PackagePage() {
  const { slug } = useParams();
  const [pkg, setPkg] = useState<any>(null);
  const [clients, setClients] = useState<any[]>([]);
  const [allPackages, setAllPackages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedClient, setExpandedClient] = useState<string | null>(null);

  const fetchData = async () => {
    setLoading(true);
    const pkgsRes = await fetch("/api/packages");
    const pkgsData = await pkgsRes.json();
    setAllPackages(pkgsData.packages || []);
    const currentPkg = pkgsData.packages?.find((p: any) => p.slug === (Array.isArray(slug) ? slug[0] : slug));
    
    if (currentPkg) {
      setPkg(currentPkg);
      const clientsRes = await fetch(`/api/clients?packageId=${currentPkg._id}`);
      const clientsData = await clientsRes.json();
      setClients(clientsData.clients || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, [slug]);

  const handleExport = () => {
    if (!clients.length) return;
    
    const headers = ["Enterprise Name", "Customer Name", "Email", "Phone", "Address", "Progress"];
    const csvContent = [
      headers.join(","),
      ...clients.map(c => {
        const completed = c.tasks.filter((t:any) => t.status === "completed").length;
        return `"${c.enterpriseName}","${c.customerName}","${c.email}","${c.phone}","${c.address}","${completed}/15"`;
      })
    ].join("\n");
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `${pkg?.name || 'clients'}_export.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleDeleteClient = async (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    if (!confirm("Are you sure you want to delete this client? This action cannot be undone.")) return;
    const res = await fetch(`/api/clients/${id}`, { method: "DELETE" });
    if (res.ok) {
      fetchData();
    }
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
  };

  if (loading) return (
    <div className="flex justify-center py-24">
      <div className="relative w-16 h-16">
        <div className="absolute inset-0 rounded-full border-t-2 border-primary animate-spin"></div>
        <div className="absolute inset-2 rounded-full border-r-2 border-purple-500 animate-spin flex-reverse"></div>
      </div>
    </div>
  );
  
  if (!pkg) return <div className="text-white/50 p-8 text-center text-xl">Package not found</div>;

  return (
    <div className="space-y-10 max-w-7xl mx-auto">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-white/5 pb-8"
      >
        <div>
          <h1 className="text-4xl font-extrabold tracking-tight text-white">{pkg.name}</h1>
          <p className="text-white/50 mt-2 text-lg">{pkg.description || "Manage enterprise clients assigned to this specific package."}</p>
        </div>
        <Button onClick={handleExport} className="bg-white/5 border border-white/10 hover:bg-white/10 text-white shadow-lg backdrop-blur-md">
          <Download className="w-4 h-4 mr-2" /> Export to CSV
        </Button>
      </motion.div>

      <div className="space-y-8">
        {clients.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-32 rounded-3xl bg-white/[0.02] border border-white/5 backdrop-blur-sm relative overflow-hidden"
          >
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-primary/10 blur-[80px] rounded-full" />
            <div className="relative z-10 flex flex-col items-center">
              <div className="w-20 h-20 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-6 shadow-inner">
                <FolderOpen className="w-10 h-10 text-white/30" />
              </div>
              <h3 className="text-3xl font-bold mb-3 text-white">No clients found</h3>
              <p className="text-white/50 max-w-md mx-auto text-lg">You haven't assigned any clients to this package yet. Add them from the home dashboard.</p>
            </div>
          </motion.div>
        ) : (
          <motion.div variants={container} initial="hidden" animate="show" className="space-y-8">
            {clients.map(client => {
              const totalTasks = client.tasks.length || 15;
              const completedTasks = client.tasks.filter((t: any) => t.status === "completed").length;
              const progress = (completedTasks / totalTasks) * 100;
              let progressColor = "bg-red-500";
              let shadowColor = "shadow-red-500/10";
              if (progress > 30) { progressColor = "bg-amber-500"; shadowColor = "shadow-amber-500/10"; }
              if (progress === 100) { progressColor = "bg-green-500"; shadowColor = "shadow-green-500/20"; }

              return (
                <motion.div key={client._id} variants={item} id={`client-${client._id}`} className="scroll-mt-10">
                  <Card className="bg-white/[0.02] border border-white/10 backdrop-blur-md overflow-hidden hover:border-white/20 transition-colors shadow-2xl">
                    <CardHeader 
                      className="bg-white/[0.02] border-b border-white/5 pb-6 cursor-pointer hover:bg-white/[0.04] transition-colors group/header"
                      onClick={() => setExpandedClient(expandedClient === client._id ? null : client._id)}
                    >
                      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-6">
                        <div>
                          <CardTitle className="text-3xl flex items-center gap-3 text-white">
                            <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-primary">
                              <Building2 className="w-6 h-6" />
                            </div>
                            {client.enterpriseName}
                          </CardTitle>
                          <CardDescription className="text-lg mt-3 text-white/60 flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-primary" /> {client.customerName}
                          </CardDescription>
                        </div>
                        <div className="flex items-center gap-2 md:gap-4">
                          <div className="flex items-center gap-6 bg-black/40 p-4 rounded-2xl border border-white/5">
                            <div className="text-right">
                              <div className="text-4xl font-black text-white">{completedTasks} <span className="text-xl font-medium text-white/30">/ {totalTasks}</span></div>
                              <div className="text-sm font-semibold text-white/50 tracking-wide uppercase mt-1">Steps Completed</div>
                            </div>
                            <div className="w-16 h-16 rounded-full border-4 border-white/10 flex items-center justify-center relative">
                              <svg className="absolute inset-0 w-full h-full -rotate-90">
                                <circle cx="30" cy="30" r="28" fill="none" className="stroke-white/10" strokeWidth="4" />
                                <circle cx="30" cy="30" r="28" fill="none" className={`stroke-current ${progress === 100 ? 'text-green-500' : progress > 30 ? 'text-amber-500' : 'text-red-500'}`} strokeWidth="4" strokeDasharray="175" strokeDashoffset={175 - (175 * progress) / 100} strokeLinecap="round" />
                              </svg>
                              <span className="text-sm font-bold text-white">{Math.round(progress)}%</span>
                            </div>
                          </div>
                          
                          <div onClick={(e) => e.stopPropagation()} className="flex items-center gap-1">
                            <EditClientModal client={client} packages={allPackages} onUpdated={fetchData} />
                            <Button 
                              variant="ghost" 
                              onClick={(e) => handleDeleteClient(e, client._id)}
                              className="h-10 w-10 md:h-16 md:w-12 flex items-center justify-center rounded-2xl text-red-400 hover:text-red-500 hover:bg-red-500/10 transition-colors border border-transparent hover:border-red-500/20"
                            >
                              <Trash2 className="w-5 h-5" />
                            </Button>
                          </div>

                          <div className="text-white/30 ml-2">
                            {expandedClient === client._id ? <ChevronUp className="w-6 h-6" /> : <ChevronDown className="w-6 h-6 group-hover/header:translate-y-1 transition-transform" />}
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    {expandedClient === client._id && (
                      <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}>
                        <CardContent className="pt-8 px-6 md:px-8">
                      <div className="grid md:grid-cols-3 gap-6 mb-10">
                        <div className="flex items-center gap-4 text-white/60 bg-white/5 p-4 rounded-xl border border-white/5 hover:bg-white/10 transition-colors">
                          <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center">
                            <Mail className="w-5 h-5 text-primary" />
                          </div>
                          <span className="truncate">{client.email || "No email provided"}</span>
                        </div>
                        <div className="flex items-center gap-4 text-white/60 bg-white/5 p-4 rounded-xl border border-white/5 hover:bg-white/10 transition-colors">
                          <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center">
                            <Phone className="w-5 h-5 text-primary" />
                          </div>
                          <span className="truncate">{client.phone || "No phone provided"}</span>
                        </div>
                        <div className="flex items-center gap-4 text-white/60 bg-white/5 p-4 rounded-xl border border-white/5 hover:bg-white/10 transition-colors">
                          <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center">
                            <MapPin className="w-5 h-5 text-primary" />
                          </div>
                          <span className="truncate">{client.address || "No address provided"}</span>
                        </div>
                      </div>
                      
                      <div className="mb-8">
                        <div className="flex justify-between text-sm font-medium mb-3">
                          <span className="text-white/70">Master Pipeline Progress</span>
                          <span className="text-white font-bold">{Math.round(progress)}%</span>
                        </div>
                        <Progress value={progress} className="h-2 bg-white/10" indicatorColor={progressColor} />
                      </div>

                      <div className="bg-black/20 p-6 rounded-2xl border border-white/5">
                        <h4 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                          <div className="w-2 h-6 bg-primary rounded-full" />
                          Production Pipeline Stages
                        </h4>
                        <TaskChecklist client={client} onTaskUpdate={fetchData} />
                      </div>
                    </CardContent>
                  </motion.div>
                )}
              </Card>
                </motion.div>
              )
            })}
          </motion.div>
        )}
      </div>
    </div>
  );
}
