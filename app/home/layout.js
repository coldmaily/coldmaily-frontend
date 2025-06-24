// app/home/layout.js
"use client";

import { getCurrentUser } from "@/libapi/api";
import { Bell, UserCircle } from "lucide-react";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

// Sidebar navigation items with their routes
const navItems = [
  { name: "Dashboard", path: "/home" },
  { name: "Inbox", path: "/home/inbox" },
  { name: "Campaigns", path: "/home/campaigns" },
  { name: "Templates", path: "/home/templates" },
  { name: "Scheduler", path: "/home/scheduler" },
];

export default function HomeLayout({ children }) {

  const [user, setUser] = useState(null);

  useEffect(() => { getCurrentUser().then(setUser).catch(() => setUser(null));}, []);

  return (
    <div className="flex h-screen w-full">
      
      {/* Sidebar */}
      <aside className="w-58 bg-[#0F172A] text-white fixed h-full px-4 py-4">
        {/* Brand name at the top */}
        <div className="text-2xl font-bold mb-8 ml-8">ColdMaily</div>

        {/* Navigation Links */}
        <nav className="flex flex-col gap-2 pl-4">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.path}
              className="hover:bg-white/10 px-4 py-2 rounded-md transition-colors text-base"
            >
              {item.name}
            </Link>
          ))}
        </nav>
      </aside>

      {/* Right Section: Header + Content */}
      <div className="flex flex-col flex-1 ml-58">
        
        {/* Top Header */}
        <header className="h-16 bg-[#0F172A] text-white flex items-center justify-end px-6 shadow-sm">
          {/* Notification + Profile icons */}
          <div className="flex items-center gap-6">
            <Bell className="w-5 h-5 cursor-pointer" />
            {/* Profile Picture */}
            {user?.picture ? (
              <Image
                src={user.picture}
                alt="Profile"
                width={32}
                height={32}
                className="rounded-full cursor-pointer"
              />
            ) : (
              <UserCircle className="w-8 h-8 cursor-pointer" />
            )}
          </div>
        </header>

        {/* Main content area */}
        <main className="flex-1 bg-gray-100 p-6 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
