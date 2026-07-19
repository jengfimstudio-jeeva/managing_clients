"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { Edit2 } from "lucide-react";

export default function EditClientModal({ client, packages, onUpdated }: { client: any, packages: any[], onUpdated: () => void }) {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    enterpriseName: client.enterpriseName,
    customerName: client.customerName,
    address: client.address || "",
    phone: client.phone || "",
    email: client.email || "",
    packageId: client.packageId?._id || client.packageId || ""
  });
  const [isUpdating, setIsUpdating] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUpdating(true);
    const res = await fetch(`/api/clients/${client._id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (res.ok) {
      toast({ title: "Success", description: "Client updated successfully." });
      setOpen(false);
      onUpdated();
    } else {
      toast({ title: "Error", description: "Failed to update client", variant: "destructive" });
    }
    setIsUpdating(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" className="h-8 w-8 text-blue-400 hover:text-blue-500 hover:bg-blue-500/10">
          <Edit2 className="w-4 h-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-[#0a0a0a] border-white/10 text-white">
        <DialogHeader>
          <DialogTitle>Edit Client</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 pt-4">
          <div className="space-y-2">
            <Label htmlFor="enterpriseName">Enterprise Name</Label>
            <Input 
              id="enterpriseName" 
              required 
              value={formData.enterpriseName} 
              onChange={e => setFormData({...formData, enterpriseName: e.target.value})} 
              className="bg-white/5 border-white/10 text-white"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="customerName">Customer Name</Label>
            <Input 
              id="customerName" 
              required 
              value={formData.customerName} 
              onChange={e => setFormData({...formData, customerName: e.target.value})} 
              className="bg-white/5 border-white/10 text-white"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input 
                id="email" 
                type="email" 
                value={formData.email} 
                onChange={e => setFormData({...formData, email: e.target.value})} 
                className="bg-white/5 border-white/10 text-white"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input 
                id="phone" 
                value={formData.phone} 
                onChange={e => setFormData({...formData, phone: e.target.value})} 
                className="bg-white/5 border-white/10 text-white"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="address">Address</Label>
            <Input 
              id="address" 
              value={formData.address} 
              onChange={e => setFormData({...formData, address: e.target.value})} 
              className="bg-white/5 border-white/10 text-white"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="packageId">Package</Label>
            <select 
              id="packageId"
              required
              className="flex h-10 w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              value={formData.packageId}
              onChange={e => setFormData({...formData, packageId: e.target.value})}
            >
              {packages.map(pkg => (
                <option key={pkg._id} value={pkg._id} className="bg-[#0a0a0a] text-white">
                  {pkg.name}
                </option>
              ))}
            </select>
          </div>
          <div className="pt-4 flex justify-end">
            <Button type="submit" disabled={isUpdating} className="bg-primary hover:bg-primary/90 text-white font-bold">
              {isUpdating ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
