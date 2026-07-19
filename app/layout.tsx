import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import SessionProvider from "@/components/SessionProvider";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "jengFilm Studio - CRM",
  description: "Enterprise CRM & Lead Generation Platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} min-h-screen bg-black antialiased flex flex-col relative selection:bg-primary/30 selection:text-white text-white`}>
        {/* Global Cinematic Background */}
        <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none bg-black">
          {/* Deep Space Background Image Layer */}
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1534796636918-f29071d1b0d3?q=80&w=2071&auto=format&fit=crop')] bg-cover bg-center opacity-10 mix-blend-screen" />
          
          {/* Ambient Glowing Orbs */}
          <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-primary/20 blur-[150px] mix-blend-screen" />
          <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] rounded-full bg-purple-600/10 blur-[150px] mix-blend-screen" />
          <div className="absolute top-[40%] left-[60%] w-[40%] h-[40%] rounded-full bg-blue-600/10 blur-[120px] mix-blend-screen" />
          
          {/* Subtle Noise / Grain Overlay */}
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay" />
          
          {/* Vignette Shadow to focus center */}
          <div className="absolute inset-0 bg-black/60 bg-gradient-to-t from-black via-transparent to-black/80" />
        </div>

        <SessionProvider>
          {children}
          <Toaster />
        </SessionProvider>
      </body>
    </html>
  );
}
