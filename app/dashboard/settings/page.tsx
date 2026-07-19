"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { Plus, Settings2, Trash2, Package as PackageIcon, User as UserIcon, Moon, Sun, Bell } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useSession } from "next-auth/react";
import EditPackageModal from "@/components/EditPackageModal";

export default function SettingsPage() {
  const { data: session, update } = useSession();
  
  const [packageName, setPackageName] = useState("");
  const [packageDesc, setPackageDesc] = useState("");
  const [packages, setPackages] = useState<any[]>([]);
  const { toast } = useToast();

  // Profile State
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [profileName, setProfileName] = useState("");
  const [profileEmail, setProfileEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isUpdatingProfile, setIsUpdatingProfile] = useState(false);

  // Theme State
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    if (session?.user) {
      setProfileName(session.user.name || "Jeeva");
      setProfileEmail(session.user.email || "hello@jengfilm.com");
    }
  }, [session]);

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    toast({ title: "Theme Updated", description: `Switched to ${newTheme} mode.` });
    // In a full implementation, this would trigger next-themes or a global context
    if (newTheme === "light") {
      document.documentElement.classList.add("light-theme-simulation");
    } else {
      document.documentElement.classList.remove("light-theme-simulation");
    }
  };

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword && newPassword !== confirmPassword) {
      toast({ title: "Error", description: "Passwords do not match.", variant: "destructive" });
      return;
    }
    if (newPassword && newPassword.length < 6) {
      toast({ title: "Error", description: "Password must be at least 6 characters.", variant: "destructive" });
      return;
    }

    setIsUpdatingProfile(true);
    const res = await fetch("/api/user/profile", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: profileName,
        email: profileEmail,
        newPassword: newPassword || undefined
      }),
    });

    if (res.ok) {
      toast({ title: "Success", description: "Profile updated successfully." });
      setNewPassword("");
      setConfirmPassword("");
      await update({ name: profileName, email: profileEmail });
      setIsEditingProfile(false);
    } else {
      const data = await res.json();
      toast({ title: "Error", description: data.error || "Failed to update profile", variant: "destructive" });
    }
    setIsUpdatingProfile(false);
  };

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
    <div className="space-y-10 max-w-4xl mx-auto pb-20">
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
        
        {/* Profile Settings */}
        <motion.div variants={item}>
          <Card className="bg-white/[0.02] border border-white/10 backdrop-blur-md shadow-2xl overflow-hidden">
            <CardHeader className="bg-white/[0.02] border-b border-white/5 pb-6 flex flex-row justify-between items-center">
              <div>
                <CardTitle className="text-2xl text-white">Your Profile</CardTitle>
                <CardDescription className="text-base text-white/50 mt-1">Manage your personal account details and credentials.</CardDescription>
              </div>
              {!isEditingProfile && (
                <Button onClick={() => setIsEditingProfile(true)} variant="outline" className="border-white/10 text-white hover:bg-white/10">
                  Edit Profile
                </Button>
              )}
            </CardHeader>
            <CardContent className="pt-8">
              {!isEditingProfile ? (
                <div className="flex items-center gap-6">
                  <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center shadow-lg shadow-primary/20">
                    <UserIcon className="w-10 h-10 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white">{profileName}</h3>
                    <p className="text-white/50 text-lg">{profileEmail}</p>
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 mt-3 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-wide">
                      Administrator
                    </div>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleUpdateProfile}>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <Label htmlFor="userName" className="text-white/70">Full Name</Label>
                      <Input 
                        id="userName" 
                        value={profileName}
                        onChange={(e) => setProfileName(e.target.value)}
                        className="bg-white/5 border-white/10 h-12 text-white placeholder:text-white/20 focus-visible:ring-primary"
                      />
                    </div>
                    <div className="space-y-3">
                      <Label htmlFor="userEmail" className="text-white/70">Email Address</Label>
                      <Input 
                        id="userEmail" 
                        value={profileEmail}
                        onChange={(e) => setProfileEmail(e.target.value)}
                        className="bg-white/5 border-white/10 h-12 text-white placeholder:text-white/20 focus-visible:ring-primary"
                      />
                    </div>
                    <div className="space-y-3 md:col-span-2">
                      <Label className="text-white/70">Change Password (Optional)</Label>
                      <div className="flex gap-4">
                        <Input 
                          type="password"
                          placeholder="New Password"
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                          className="bg-white/5 border-white/10 h-12 text-white placeholder:text-white/20 focus-visible:ring-primary"
                        />
                        <Input 
                          type="password"
                          placeholder="Confirm Password"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          className="bg-white/5 border-white/10 h-12 text-white placeholder:text-white/20 focus-visible:ring-primary"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="pt-8 flex gap-4">
                    <Button type="submit" disabled={isUpdatingProfile} className="bg-primary hover:bg-primary/90 text-white font-bold h-11 px-8">
                      {isUpdatingProfile ? "Saving..." : "Save Changes"}
                    </Button>
                    <Button type="button" variant="ghost" onClick={() => setIsEditingProfile(false)} className="text-white/70 hover:text-white h-11">
                      Cancel
                    </Button>
                  </div>
                </form>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* System Preferences */}
        <motion.div variants={item}>
          <Card className="bg-white/[0.02] border border-white/10 backdrop-blur-md shadow-2xl overflow-hidden">
            <CardHeader className="bg-white/[0.02] border-b border-white/5 pb-6">
              <CardTitle className="text-2xl text-white">System Preferences</CardTitle>
              <CardDescription className="text-base text-white/50 mt-1">Customize your workspace and notification settings.</CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center text-blue-400">
                      {theme === 'dark' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
                    </div>
                    <div>
                      <h4 className="text-white font-medium">Appearance Theme</h4>
                      <p className="text-sm text-white/40">Switch between dark and light modes</p>
                    </div>
                  </div>
                  <Button onClick={toggleTheme} variant="outline" className="border-white/10 text-white hover:bg-white/10">
                    Switch to {theme === 'dark' ? 'Light' : 'Dark'}
                  </Button>
                </div>

                <div className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10 opacity-70">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg bg-amber-500/20 flex items-center justify-center text-amber-400">
                      <Bell className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-white font-medium">Email Notifications</h4>
                      <p className="text-sm text-white/40">Receive daily pipeline summaries</p>
                    </div>
                  </div>
                  <Button disabled variant="outline" className="border-white/10 text-white/50 cursor-not-allowed">
                    Coming Soon
                  </Button>
                </div>
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
              <CardDescription className="text-base text-white/50">View, edit, and delete existing service packages.</CardDescription>
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
                      <div className="flex items-center gap-2">
                        <EditPackageModal 
                          pkg={pkg} 
                          onUpdated={() => {
                            fetchPackages();
                            window.dispatchEvent(new Event("packagesUpdated"));
                          }} 
                        />
                        <Button 
                          variant="ghost" 
                          onClick={() => handleDeletePackage(pkg._id)}
                          className="text-red-400 hover:text-red-500 hover:bg-red-500/10 transition-colors"
                        >
                          <Trash2 className="w-5 h-5" />
                        </Button>
                      </div>
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
