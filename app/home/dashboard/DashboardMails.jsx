'use client';
import { useEffect, useState } from 'react';
import { getRecentMails, getUpcomingMails } from '@/libapi/dashboard.js';
import MailTableCard from './MailTableCard';
import Skeleton from "@/components/Skeleton"; // 🧠 Create if not already done

export default function DashboardMails() {
  const [recentMails, setRecentMails] = useState([]);
  const [upcomingMails, setUpcomingMails] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [recent, upcoming] = await Promise.all([
          getRecentMails(),
          getUpcomingMails(),
        ]);
        setRecentMails(recent);
        setUpcomingMails(upcoming);
      } catch (error) {
        console.error('Failed to load mail data:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col gap-6 w-full">
        <div className="bg-white rounded-2xl shadow-md p-4 w-full">
          <Skeleton className="h-6 w-1/5 mb-6" />
          {[...Array(5)].map((_, i) => (
            <Skeleton key={i} className="h-6 w-full mb-3" />
          ))}
        </div>
        <div className="bg-white rounded-2xl shadow-md p-4 w-full">
          <Skeleton className="h-6 w-1/5 mb-4" />
          {[...Array(5)].map((_, i) => (
            <Skeleton key={i} className="h-6 w-full mb-3" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 w-full">
      <MailTableCard title="Upcoming Scheduled Mails" data={upcomingMails} />
      <MailTableCard title="Recent Mails" data={recentMails} />
    </div>
  );
}
