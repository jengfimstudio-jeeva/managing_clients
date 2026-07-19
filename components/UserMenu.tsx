"use client";

import { useSession, signOut } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOut, Settings, User } from "lucide-react";
import Link from "next/link";

export default function UserMenu() {
  const { data: session } = useSession();

  if (!session?.user) return null;

  const initials = session.user.name
    ? session.user.name.substring(0, 2).toUpperCase()
    : "JF";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="outline-none">
        <div className="flex items-center gap-3 p-1.5 pr-4 rounded-full bg-white/[0.02] border border-white/5 hover:bg-white/5 transition-colors cursor-pointer">
          <Avatar className="w-9 h-9 border border-white/10 shadow-lg">
            <AvatarImage src={session.user.image || ""} />
            <AvatarFallback className="bg-gradient-to-br from-primary to-purple-600 text-white font-bold text-sm">
              {initials}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col items-start hidden sm:flex text-left">
            <span className="text-sm font-semibold text-white/90 leading-none mb-1">
              {session.user.name || "Administrator"}
            </span>
            <span className="text-[10px] text-white/40 uppercase tracking-wider font-bold leading-none">
              JengFilm Studio
            </span>
          </div>
        </div>
      </DropdownMenuTrigger>
      
      <DropdownMenuContent align="end" className="w-56 bg-black/90 backdrop-blur-xl border-white/10 text-white p-2">
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{session.user.name}</p>
            <p className="text-xs leading-none text-white/50">{session.user.email}</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="bg-white/10" />
        <Link href="/dashboard/settings">
          <DropdownMenuItem className="cursor-pointer hover:bg-white/10 focus:bg-white/10 text-white/80 focus:text-white rounded-md">
            <Settings className="mr-2 h-4 w-4" />
            <span>Profile Settings</span>
          </DropdownMenuItem>
        </Link>
        <DropdownMenuItem 
          onClick={() => signOut({ callbackUrl: "/" })}
          className="cursor-pointer hover:bg-red-500/20 focus:bg-red-500/20 text-red-400 focus:text-red-400 rounded-md mt-1"
        >
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
