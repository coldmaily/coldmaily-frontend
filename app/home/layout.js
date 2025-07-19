"use client";

import { getCurrentUser } from "@/libapi/api";
import { Bell, UserCircle } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import NotificationsDropdown from "@/components/NoticationDropdown";
import { getNotifications } from "@/libapi/dashboard";

// Sidebar navigation items
const navItems = [
  { name: "Dashboard", path: "/home" },
  { name: "Inbox", path: "/home/inbox" },
  { name: "Campaigns", path: "/home/campaigns" },
  { name: "Templates", path: "/home/templates" },
  { name: "Scheduler", path: "/home/scheduler" },
];

export default function HomeLayout({ children }) {
  const [user, setUser] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const bellRef = useRef(null);

  useEffect(() => {
    getCurrentUser().then(setUser).catch(() => setUser(null));
    fetchNotifications(); // Initial fetch
  }, []);

  const fetchNotifications = async () => {
    const data = await getNotifications();
    setNotifications(data);
    const unread = data.filter((n) => !n.is_read).length;
    setUnreadCount(unread);
  };

  const handleDropdownClose = () => {
    setDropdownOpen(false);
    fetchNotifications(); // ✅ Re-fetch after closing
  };

  return (
    <div className="flex h-screen w-full">
      {/* Sidebar */}
      <aside className="w-58 bg-[#0F172A] text-white fixed h-full px-4 py-4">
        <div className="text-2xl font-bold mb-8 ml-8">ColdMaily</div>
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

      {/* Main content area */}
      <div className="flex flex-col flex-1 ml-58">
        <header className="h-16 bg-[#0F172A] text-white flex items-center justify-end px-6 shadow-sm">
          <div className="flex items-center gap-6">
            {/* Notification Icon */}
            <div className="relative" ref={bellRef}>
              <Bell
                className="w-5 h-5 cursor-pointer"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-600 text-white text-[10px] px-1.5 py-[1px] rounded-full">
                  {unreadCount}
                </span>
              )}
              {dropdownOpen && (
                <NotificationsDropdown
                  notifications={notifications}
                  onClose={handleDropdownClose}
                />
              )}
            </div>

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

        <main className="flex-1 bg-gray-100 p-6 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
