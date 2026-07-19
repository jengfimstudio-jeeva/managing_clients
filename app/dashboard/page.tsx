"use client";

import { useState, useEffect } from "react";
import CreateClientModal from "@/components/CreateClientModal";
import ClientCard from "@/components/ClientCard";
import { useSession } from "next-auth/react";
import { motion } from "framer-motion";
import { FolderPlus } from "lucide-react";

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

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.4 } }
  };

  return (
    <div className="space-y-10 max-w-7xl mx-auto">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-white/5 pb-8"
      >
        <div>
          <h1 className="text-4xl font-extrabold tracking-tight text-white">Welcome back, {session?.user?.name || "Admin"}</h1>
          <p className="text-white/50 mt-2 text-lg">Here's an overview of your active enterprise clients across all services.</p>
        </div>
        <CreateClientModal onCreated={fetchClients} />
      </motion.div>

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
        <motion.div 
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          {clients.map(client => (
            <motion.div key={client._id} variants={item}>
              <ClientCard client={client} />
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
}
