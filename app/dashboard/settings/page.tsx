"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { Upload, Camera, Plus, Settings2, Trash2, Package as PackageIcon } from "lucide-react";
import { motion } from "framer-motion";

export default function SettingsPage() {
  const [packageName, setPackageName] = useState("");
  const [packageDesc, setPackageDesc] = useState("");
  const [packages, setPackages] = useState<any[]>([]);
  const { toast } = useToast();

  const fetchPackages = async () => {
    const res = await fetch("/api/packages");
    const data = await res.json();
    setPackages(data.packages || []);
  };

  useEffect(() => {
    fetchPackages();
  }, []);

  const handleCreatePackage = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/packages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: packageName, description: packageDesc, isCustom: true }),
    });

    if (res.ok) {
      toast({ title: "Success", description: "Custom package created successfully!" });
      setPackageName("");
      setPackageDesc("");
      fetchPackages();
      window.dispatchEvent(new Event("packagesUpdated"));
    } else {
      toast({ title: "Error", description: "Failed to create package", variant: "destructive" });
    }
  };

  const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    toast({ title: "Uploading...", description: "Uploading logo to cloud storage..." });

    const res = await fetch("/api/upload/logo", {
      method: "POST",
      body: formData,
    });

    if (res.ok) {
      toast({ title: "Success", description: "Logo uploaded successfully" });
    } else {
      toast({ title: "Error", description: "Logo upload failed", variant: "destructive" });
    }
  };

  const handleDeletePackage = async (id: string) => {
    if (!confirm("Are you sure you want to delete this package? Note: You cannot delete a package if it has active clients.")) return;
    const res = await fetch(`/api/packages/${id}`, { method: "DELETE" });
    if (res.ok) {
      toast({ title: "Success", description: "Package deleted successfully." });
      fetchPackages();
      window.dispatchEvent(new Event("packagesUpdated"));
    } else {
      const data = await res.json();
      toast({ title: "Error", description: data.error || "Failed to delete package", variant: "destructive" });
    }
  };

  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <div className="space-y-10 max-w-4xl mx-auto">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="border-b border-white/5 pb-8"
      >
        <div className="flex items-center gap-4 mb-2">
          <div className="p-3 rounded-xl bg-primary/10 border border-primary/20 text-primary">
            <Settings2 className="w-8 h-8" />
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight text-white">Platform Settings</h1>
        </div>
        <p className="text-white/50 text-lg mt-2">Manage your platform configurations, branding, and service packages.</p>
      </motion.div>

      <motion.div variants={container} initial="hidden" animate="show" className="space-y-8">
        <motion.div variants={item}>
          <Card className="bg-white/[0.02] border border-white/10 backdrop-blur-md shadow-2xl overflow-hidden">
            <CardHeader className="bg-white/[0.02] border-b border-white/5 pb-6">
              <CardTitle className="text-2xl text-white">Your Profile</CardTitle>
              <CardDescription className="text-base text-white/50">Manage your personal account details and credentials.</CardDescription>
            </CardHeader>
            <CardContent className="pt-8">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <Label htmlFor="userName" className="text-white/70">Full Name</Label>
                  <Input 
                    id="userName" 
                    defaultValue="Jeeva"
                    className="bg-white/5 border-white/10 h-12 text-white placeholder:text-white/20 focus-visible:ring-primary"
                  />
                </div>
                <div className="space-y-3">
                  <Label htmlFor="userEmail" className="text-white/70">Email Address</Label>
                  <Input 
                    id="userEmail" 
                    defaultValue="hello@jengfilm.com"
                    className="bg-white/5 border-white/10 h-12 text-white placeholder:text-white/20 focus-visible:ring-primary"
                  />
                </div>
                <div className="space-y-3 md:col-span-2">
                  <Label className="text-white/70">Change Password</Label>
                  <div className="flex gap-4">
                    <Input 
                      type="password"
                      placeholder="New Password"
                      className="bg-white/5 border-white/10 h-12 text-white placeholder:text-white/20 focus-visible:ring-primary"
                    />
                    <Input 
                      type="password"
                      placeholder="Confirm Password"
                      className="bg-white/5 border-white/10 h-12 text-white placeholder:text-white/20 focus-visible:ring-primary"
                    />
                  </div>
                </div>
              </div>
              <div className="pt-6">
                <Button className="bg-primary hover:bg-primary/90 text-white font-bold h-11 px-8">Save Changes</Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={item}>
          <Card className="bg-white/[0.02] border border-white/10 backdrop-blur-md shadow-2xl overflow-hidden relative group">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
            <CardHeader className="bg-white/[0.02] border-b border-white/5 pb-6 relative z-10">
              <CardTitle className="text-2xl text-white">Create Service Package</CardTitle>
              <CardDescription className="text-base text-white/50">Define a new service offering. This automatically generates a dedicated pipeline page.</CardDescription>
            </CardHeader>
            <CardContent className="pt-8 relative z-10">
              <form onSubmit={handleCreatePackage} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <Label htmlFor="packageName" className="text-white/70">Package Name</Label>
                    <Input 
                      id="packageName" 
                      required 
                      value={packageName}
                      onChange={(e) => setPackageName(e.target.value)}
                      placeholder="e.g. Social Media Shorts"
                      className="bg-white/5 border-white/10 h-12 text-white placeholder:text-white/20 focus-visible:ring-primary"
                    />
                  </div>
                  <div className="space-y-3">
                    <Label htmlFor="packageDesc" className="text-white/70">Short Description</Label>
                    <Input 
                      id="packageDesc" 
                      value={packageDesc}
                      onChange={(e) => setPackageDesc(e.target.value)}
                      placeholder="Brief summary of the deliverables"
                      className="bg-white/5 border-white/10 h-12 text-white placeholder:text-white/20 focus-visible:ring-primary"
                    />
                  </div>
                </div>
                <div className="pt-2">
                  <Button type="submit" className="h-12 px-6 bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/20 font-bold">
                    <Plus className="w-5 h-5 mr-2" /> Publish Custom Package
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={item}>
          <Card className="bg-white/[0.02] border border-white/10 backdrop-blur-md shadow-2xl overflow-hidden">
            <CardHeader className="bg-white/[0.02] border-b border-white/5 pb-6">
              <CardTitle className="text-2xl text-white">Manage Packages</CardTitle>
              <CardDescription className="text-base text-white/50">View and delete existing service packages.</CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-4">
                {packages.length === 0 ? (
                  <div className="text-white/40 text-center py-4">No packages found.</div>
                ) : (
                  packages.map(pkg => (
                    <div key={pkg._id} className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center text-primary">
                          <PackageIcon className="w-5 h-5" />
                        </div>
                        <div>
                          <h4 className="text-white font-medium">{pkg.name}</h4>
                          <p className="text-sm text-white/40">{pkg.description || "No description"}</p>
                        </div>
                      </div>
                      <Button 
                        variant="ghost" 
                        onClick={() => handleDeletePackage(pkg._id)}
                        className="text-red-400 hover:text-red-500 hover:bg-red-500/10 transition-colors"
                      >
                        <Trash2 className="w-5 h-5" />
                      </Button>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </div>
  );
}
