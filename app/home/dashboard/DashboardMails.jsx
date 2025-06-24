'use client';
import { useEffect, useState } from 'react';
import { getRecentMails, getUpcomingMails } from '@/libapi/dashboard.js';
import MailTableCard from './MailTableCard';

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

  return (
    <div className="flex flex-col gap-6 w-full">
      <MailTableCard title="Upcoming Scheduled Mails" data={loading ? [] : upcomingMails} />
      <MailTableCard title="Recent Mails" data={loading ? [] : recentMails} />
    </div>
  );
}
