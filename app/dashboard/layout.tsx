import Sidebar from "@/components/Sidebar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen overflow-hidden bg-transparent relative selection:bg-primary/30">
      <Sidebar />
      <main className="flex-1 overflow-y-auto bg-transparent relative z-10 p-6 md:p-10 custom-scrollbar">
        {children}
      </main>
    </div>
  );
}
