import Sidebar from "@/components/Sidebar";
import UserMenu from "@/components/UserMenu";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen overflow-hidden bg-[#050505] relative selection:bg-primary/30">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden relative z-10">
        <header className="h-20 border-b border-white/5 bg-black/20 backdrop-blur-xl flex items-center justify-end px-6 md:px-10 shrink-0">
          <UserMenu />
        </header>
        <main className="flex-1 overflow-y-auto bg-transparent p-6 md:p-10 custom-scrollbar">
          {children}
        </main>
      </div>
    </div>
  );
}
