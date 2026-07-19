"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { LayoutDashboard, Settings, LogOut, Package as PackageIcon, Video } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

export default function Sidebar() {
  const pathname = usePathname();
  const [packages, setPackages] = useState<any[]>([]);

  const fetchPackages = () => {
    fetch("/api/packages")
      .then(res => res.json())
      .then(data => setPackages(data.packages || []));
  };

  useEffect(() => {
    fetchPackages();
    window.addEventListener("packagesUpdated", fetchPackages);
    return () => window.removeEventListener("packagesUpdated", fetchPackages);
  }, []);

  return (
    <div className="w-64 border-r border-white/5 bg-background/50 backdrop-blur-xl flex flex-col hidden md:flex relative z-20">
      <div className="h-24 flex items-center px-6 border-b border-white/5">
        <Link href="/dashboard" className="flex items-center gap-3 group">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center shadow-lg shadow-primary/20 group-hover:shadow-primary/40 transition-all">
            <Video className="w-4 h-4 text-white" />
          </div>
          <span className="font-bold text-xl tracking-tight text-white/90 group-hover:text-white transition-colors">jengFilm</span>
        </Link>
      </div>
      
      <nav className="flex-1 overflow-y-auto py-8 px-4 space-y-1 custom-scrollbar">
        <Link 
          href="/dashboard"
          className={cn(
            "flex items-center gap-3 px-4 py-3 rounded-xl transition-all relative overflow-hidden group",
            pathname === "/dashboard" 
              ? "bg-primary/10 text-primary font-medium" 
              : "text-white/50 hover:text-white hover:bg-white/5"
          )}
        >
          {pathname === "/dashboard" && (
            <motion.div layoutId="sidebar-active" className="absolute left-0 top-0 bottom-0 w-1 bg-primary" />
          )}
          <LayoutDashboard className="w-5 h-5" />
          Home Dashboard
        </Link>
        
        <div className="pt-8 pb-3">
          <p className="px-4 text-xs font-bold text-white/30 uppercase tracking-widest">Service Packages</p>
        </div>
        
        {packages.map(pkg => {
          const isActive = pathname === `/dashboard/packages/${pkg.slug}`;
          return (
            <Link 
              key={pkg._id}
              href={`/dashboard/packages/${pkg.slug}`}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-xl transition-all relative overflow-hidden group",
                isActive 
                  ? "bg-primary/10 text-primary font-medium" 
                  : "text-white/50 hover:text-white hover:bg-white/5"
              )}
            >
              {isActive && (
                <motion.div layoutId="sidebar-active" className="absolute left-0 top-0 bottom-0 w-1 bg-primary" />
              )}
              <PackageIcon className="w-5 h-5" />
              <span className="truncate">{pkg.name}</span>
            </Link>
          )
        })}
      </nav>
      
      <div className="p-4 border-t border-white/5 space-y-1 bg-background/50">
        <Link 
          href="/dashboard/settings"
          className={cn(
            "flex items-center gap-3 px-4 py-3 rounded-xl transition-all relative overflow-hidden group",
            pathname === "/dashboard/settings" 
              ? "bg-primary/10 text-primary font-medium" 
              : "text-white/50 hover:text-white hover:bg-white/5"
          )}
        >
          {pathname === "/dashboard/settings" && (
            <motion.div layoutId="sidebar-active" className="absolute left-0 top-0 bottom-0 w-1 bg-primary" />
          )}
          <Settings className="w-5 h-5" />
          Settings
        </Link>
        <button 
          onClick={() => signOut({ callbackUrl: "/" })}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-white/50 hover:text-red-400 hover:bg-red-400/10 transition-all group"
        >
          <LogOut className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          Log Out
        </button>
      </div>
    </div>
  );
}
