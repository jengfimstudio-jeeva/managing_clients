import Sidebar from "@/components/Sidebar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen overflow-hidden bg-[#0a0a0a] relative selection:bg-primary/30">
      {/* Subtle ambient background effect for dashboard */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-primary/10 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-purple-900/10 blur-[150px] rounded-full pointer-events-none" />
      
      <Sidebar />
      <main className="flex-1 overflow-y-auto bg-transparent relative z-10 p-6 md:p-10 custom-scrollbar">
        {children}
      </main>
    </div>
  );
}
