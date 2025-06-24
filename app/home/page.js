"use client";

import { useEffect, useState } from "react";
import { fetcher } from "@/libapi/api";
import DashboardCards from "./dashboard/cards";
import { getMailCount, getRecentMails, getUpcomingMails } from "@/libapi/dashboard";
import DashboardMails from "./dashboard/DashboardMails";


export default function DashboardPage() {
  const [stats, setStats] = useState({ totalMails: 0, followUps: 0 });
  useEffect(() => {
    fetcher("/api/test").then((data) => {
        console.log("JWT from /api/test:", data.jwt);
      })
      .catch((err) => {
        console.error("Error fetching /api/test:", err.message);
      });
    
      // Fetch mail stats
      getMailCount().then(data => {
        setStats({
          totalMails: data.total_mails,
          followUps: data.follow_up_mails,
        });
      })
      .catch(err => {
        console.error("Error fetching mail stats:", err.message);
      });  

      getRecentMails()
      getUpcomingMails()
      
  }, []);

  return (
    <div className="space-y-6 mt-4 flex flex-col items-center">
       <DashboardCards totalMails={stats.totalMails} followUps={stats.followUps} />
       <DashboardMails />
    </div>
  );
}
