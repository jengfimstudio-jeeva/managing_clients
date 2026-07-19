"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Video, Lock } from "lucide-react";

export default function InternalPortal() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 flex flex-col items-center justify-center p-6">
      
      <div className="w-full max-w-md p-8 md:p-10 rounded-2xl bg-white border border-gray-200 shadow-sm text-center">
        <div className="w-16 h-16 rounded-xl bg-blue-600 flex items-center justify-center mx-auto mb-6">
          <Video className="w-8 h-8 text-white" />
        </div>
        
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-gray-100 border border-gray-200 text-gray-600 text-xs font-semibold uppercase tracking-wide mb-6">
          <Lock className="w-3 h-3" /> Internal Portal
        </div>

        <h1 className="text-2xl font-bold text-gray-900 mb-2">jengFilm Employee Access</h1>
        <p className="text-gray-500 text-sm mb-10 leading-relaxed">
          Welcome to the jengFilm Studio management system. Please sign in with your employee credentials to access the client roster and production pipelines.
        </p>

        <div className="space-y-4">
          <Link href="/login" className="block">
            <Button className="w-full h-12 bg-blue-600 text-white hover:bg-blue-700 font-medium text-base rounded-lg">
              Proceed to Login
            </Button>
          </Link>
          <p className="text-xs text-gray-400">
            Secure connection established.
          </p>
        </div>
      </div>
      
      <p className="mt-12 text-sm text-gray-400">
        © {new Date().getFullYear()} jengFilm Studio. For internal use only.
      </p>
    </div>
  );
}
