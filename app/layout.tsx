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
        {/* Clean, Professional Global Background */}
        <div className="fixed inset-0 z-[-1] bg-[#050505] pointer-events-none overflow-hidden">
          {/* Subtle moving gradient */}
          <div className="absolute top-0 inset-x-0 h-[500px] bg-gradient-to-b from-primary/10 via-transparent to-transparent opacity-50" />
          
          {/* Minimalist Grid Pattern */}
          <div 
            className="absolute inset-0 opacity-[0.03]"
            style={{ backgroundImage: 'linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)', backgroundSize: '40px 40px' }}
          />
          
          {/* Radial mask to fade out the grid at the edges */}
          <div className="absolute inset-0 bg-[#050505] [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black_80%)]" />
        </div>

        <SessionProvider>
          {children}
          <Toaster />
        </SessionProvider>
      </body>
    </html>
  );
}
