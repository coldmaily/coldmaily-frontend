"use client";

import { getCurrentUser } from "@/libapi/api";
import { Bell } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import { Toaster } from "react-hot-toast";
import Link from "next/link";
import NotificationsDropdown from "@/components/helper/NoticationDropdown";
import ProfileDropdown from "@/components/helper/ProfileDropdown"; // ✅ Import here
import { getNotifications } from "@/libapi/dashboard";

const navItems = [
  { name: "Dashboard", path: "/home" },
  { name: "Mails", path: "/mails" },
  { name: "Campaigns", path: "/campaigns" },
  { name: "Templates", path: "/templates" },
  { name: "Scheduler", path: "/scheduler" },
];

export default function HomeLayout({ children }) {
  const [user, setUser] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const bellRef = useRef(null);

  useEffect(() => {
    getCurrentUser().then(setUser).catch(() => setUser(null));
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    const data = await getNotifications();
    setNotifications(data);
    const unread = data.filter((n) => !n.is_read).length;
    setUnreadCount(unread);
  };

  const handleDropdownClose = () => {
    setDropdownOpen(false);
    fetchNotifications();
  };

  const handleLogout = () => {
    localStorage.clear();
    sessionStorage.clear();
    window.location.href = "/"; // Adjust to your login route
  };

  return (
    <>
      <div className="flex h-screen w-full">
        {/* Sidebar */}
        <aside className="w-58 bg-[#0F172A] text-white fixed h-full px-4 py-4">
          <div className="flex items-center mb-8 ml-8 text-2xl font-bold">
            <img
              src="/coldmaily_logo.jpeg"
              className="w-9 h-6 mr-5 ml-2"
            />
            <span
              style={{
                background: "linear-gradient(90deg, #f4f5f7, #458cca)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                textFillColor: "transparent",
              }}
            >
              ColdMaily
            </span>
          </div>

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

              {/* ✅ Profile Dropdown */}
              <div className="flex items-center">
                {user && <ProfileDropdown user={user} onLogout={handleLogout} />}
              </div>
            </div>
          </header>

          <main className="flex-1 bg-gray-100 p-6 overflow-y-auto">
            {children}
          </main>
        </div>
      </div>

      {/* Toast */}
      <Toaster
        position="top-center"
        containerStyle={{
          top: "80%",
          transform: "translateY(-50%)",
        }}
      />
    </>
  );
}
