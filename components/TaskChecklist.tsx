"use client";

import { useState } from "react";
import { Check, X } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

export default function TaskChecklist({ client, onTaskUpdate }: { client: any, onTaskUpdate: () => void }) {
  const handleUpdate = async (taskId: string, title: string, status: string) => {
    await fetch(`/api/clients/${client._id}/tasks/${taskId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, status })
    });
    onTaskUpdate();
  };

  return (
    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-8 xl:grid-cols-10 gap-3">
      {client.tasks.map((task: any, index: number) => (
        <TaskBox key={task._id} task={task} index={index + 1} onUpdate={handleUpdate} />
      ))}
    </div>
  );
}

function TaskBox({ task, index, onUpdate }: { task: any, index: number, onUpdate: (id: string, title: string, status: string) => void }) {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState(task.title);
  const isCompleted = task.status === "completed";

  const handleSave = (newStatus: string) => {
    onUpdate(task._id, title, newStatus);
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <motion.button
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.95 }}
          className={cn(
            "aspect-square rounded-xl flex flex-col items-center justify-center border transition-all relative overflow-hidden group cursor-pointer shadow-lg",
            isCompleted 
              ? "bg-green-500/10 border-green-500/30 text-green-500 hover:bg-green-500/20 hover:border-green-500/50 hover:shadow-green-500/20" 
              : "bg-white/5 border-white/10 text-white/40 hover:bg-white/10 hover:border-white/20 hover:text-white"
          )}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <span className={cn(
            "text-3xl font-black absolute z-0 transition-opacity",
            isCompleted ? "opacity-10" : "opacity-5 group-hover:opacity-10"
          )}>{index}</span>
          {isCompleted ? (
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring" }}>
              <Check className="w-8 h-8 z-10 drop-shadow-md" />
            </motion.div>
          ) : (
            <span className="z-10 font-bold text-lg">{index}</span>
          )}
        </motion.button>
      </PopoverTrigger>
      <PopoverContent className="w-80 bg-background/95 backdrop-blur-xl border-white/10 shadow-2xl rounded-2xl p-6">
        <div className="space-y-5">
          <div className="space-y-1.5">
            <h4 className="text-xl font-bold leading-none text-white flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-primary/20 text-primary flex items-center justify-center text-xs font-bold">{index}</div>
              Stage Details
            </h4>
            <p className="text-sm text-white/50">Update the status of this pipeline stage.</p>
          </div>
          <div className="grid gap-3">
            <div className="space-y-2">
              <label className="text-xs font-bold text-white/40 uppercase tracking-wider">Stage Name</label>
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Script Approval"
                className="bg-white/5 border-white/10 text-white h-12 focus-visible:ring-primary/50"
              />
            </div>
            <div className="flex gap-3 mt-4">
              <Button 
                variant={isCompleted ? "outline" : "default"} 
                className={cn("flex-1 h-12 font-bold transition-all", !isCompleted ? "bg-green-600 hover:bg-green-500 text-white shadow-lg shadow-green-500/20 border-0" : "bg-white/5 border-white/10 text-white/70")}
                onClick={() => handleSave("completed")}
              >
                Mark Done
              </Button>
              <Button 
                variant={!isCompleted ? "outline" : "default"} 
                className={cn("flex-1 h-12 font-bold transition-all", isCompleted ? "bg-red-600 hover:bg-red-500 text-white shadow-lg shadow-red-500/20 border-0" : "bg-white/5 border-white/10 text-white/70")}
                onClick={() => handleSave("not_completed")}
              >
                Undo
              </Button>
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
