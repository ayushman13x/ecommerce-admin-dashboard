"use client";
import { useSession, signOut } from "next-auth/react";
import Link from 'next/link';
import { LayoutDashboard, Package, BarChart3, Users, LogOut, UserCircle } from 'lucide-react';

export default function Sidebar() {
  const { data: session } = useSession(); 

  return (
    <div className="w-64 bg-slate-900 text-white min-h-screen p-4 flex flex-col border-r border-slate-800">
      <div className="text-2xl font-bold mb-10 px-2 text-blue-400">
        ShopAdmin
      </div>
      
      <nav className="flex-1 space-y-2">
        <Link href="/dashboard" className="flex items-center space-x-3 p-3 rounded-lg hover:bg-slate-800 transition">
          <LayoutDashboard size={20} />
          <span>Overview</span>
        </Link>
        <Link href="/products" className="flex items-center space-x-3 p-3 rounded-lg hover:bg-slate-800 transition">
          <Package size={20} />
          <span>Products</span>
        </Link>
      </nav>

      {/* USER PROFILE SECTION */}
      <div className="mt-auto mb-4 p-3 bg-slate-800/50 rounded-lg border border-slate-700">
        <div className="flex items-center space-x-3">
          <UserCircle size={32} className="text-blue-400" />
          <div className="overflow-hidden">
            <p className="text-sm font-medium truncate">
              {session?.user?.name || "Admin User"}
            </p>
            <p className="text-xs text-slate-400 truncate">
              {session?.user?.email || "admin@test.com"}
            </p>
          </div>
        </div>
      </div>

      <button 
        onClick={() => signOut({ callbackUrl: "/login" })}
        className="flex items-center space-x-3 p-3 rounded-lg bg-red-950/20 hover:bg-red-900/40 text-red-400 transition border border-red-900/30"
      >
        <LogOut size={20} />
        <span className="font-medium">Sign Out</span>
      </button>
    </div>
  );
}