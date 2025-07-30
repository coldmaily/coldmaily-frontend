"use client";

import { useEffect } from "react";
import MailTab from "./Components/MailTab";
import MailList from "./Components/MailList";
import { useMailStore } from "./useMailStore";
import { useState } from "react";

export default function MyMailsPage() {
  const [tab, setTab] = useState("mails");
  const { mailData, fetchMails, loading } = useMailStore();

  useEffect(() => {
    if (!mailData) {
      fetchMails(); // only fetch once if data is not already loaded
    }
  }, [mailData, fetchMails]);

  const tabMap = {
    mails: mailData?.mails || [],
    upcoming: mailData?.upcoming || [],
    recent: mailData?.recent || [],
  };

  return (
    <div className="w-full px-4">
      <MailTab currentTab={tab} setCurrentTab={setTab} />
      <div className="mt-4">
        <MailList mails={tabMap[tab]} loading={loading} />
      </div>
    </div>
  );
}
