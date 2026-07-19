"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { Edit2 } from "lucide-react";

export default function EditPackageModal({ pkg, onUpdated }: { pkg: any; onUpdated: () => void }) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState(pkg.name);
  const [description, setDescription] = useState(pkg.description || "");
  const [isUpdating, setIsUpdating] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUpdating(true);
    const res = await fetch(`/api/packages/${pkg._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, description }),
    });

    if (res.ok) {
      toast({ title: "Success", description: "Package updated successfully." });
      setOpen(false);
      onUpdated();
    } else {
      toast({ title: "Error", description: "Failed to update package", variant: "destructive" });
    }
    setIsUpdating(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" className="text-blue-400 hover:text-blue-500 hover:bg-blue-500/10 transition-colors">
          <Edit2 className="w-5 h-5" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-[#0a0a0a] border-white/10 text-white">
        <DialogHeader>
          <DialogTitle>Edit Package</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 pt-4">
          <div className="space-y-2">
            <Label htmlFor="name">Package Name</Label>
            <Input 
              id="name" 
              required 
              value={name} 
              onChange={e => setName(e.target.value)} 
              className="bg-white/5 border-white/10 text-white"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Short Description</Label>
            <Input 
              id="description" 
              value={description} 
              onChange={e => setDescription(e.target.value)} 
              className="bg-white/5 border-white/10 text-white"
            />
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
