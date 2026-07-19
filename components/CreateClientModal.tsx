"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { Plus } from "lucide-react";

export default function CreateClientModal({ onCreated }: { onCreated: () => void }) {
  const [open, setOpen] = useState(false);
  const [packages, setPackages] = useState<any[]>([]);
  const [formData, setFormData] = useState({
    enterpriseName: "",
    customerName: "",
    address: "",
    phone: "",
    email: "",
    packageId: ""
  });
  const { toast } = useToast();

  useEffect(() => {
    if (open) {
      fetch("/api/packages").then(res => res.json()).then(data => {
        setPackages(data.packages || []);
        if (data.packages?.length > 0 && !formData.packageId) {
          setFormData(prev => ({ ...prev, packageId: data.packages[0]._id }));
        }
      });
    }
  }, [open]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/clients", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (res.ok) {
      toast({ title: "Success", description: "Client created successfully." });
      setOpen(false);
      setFormData({
        enterpriseName: "",
        customerName: "",
        address: "",
        phone: "",
        email: "",
        packageId: packages[0]?._id || ""
      });
      onCreated();
    } else {
      toast({ title: "Error", description: "Failed to create client", variant: "destructive" });
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button><Plus className="w-4 h-4 mr-2" /> Create New Client</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create New Client</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="enterpriseName">Enterprise Name</Label>
            <Input id="enterpriseName" required value={formData.enterpriseName} onChange={e => setFormData({...formData, enterpriseName: e.target.value})} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="customerName">Customer Name</Label>
            <Input id="customerName" required value={formData.customerName} onChange={e => setFormData({...formData, customerName: e.target.value})} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input id="phone" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="address">Address</Label>
            <Input id="address" value={formData.address} onChange={e => setFormData({...formData, address: e.target.value})} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="packageId">Package</Label>
            <select 
              id="packageId"
              required
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              value={formData.packageId}
              onChange={e => setFormData({...formData, packageId: e.target.value})}
            >
              {packages.map(pkg => (
                <option key={pkg._id} value={pkg._id}>{pkg.name}</option>
              ))}
            </select>
          </div>
          <div className="pt-4 flex justify-end">
            <Button type="submit">Save Client</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
