"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ActionCard, StatCard } from "@/components/helper/DashboardCard";
import { Send, Bot, Rocket, MailPlus } from "lucide-react";
import ComposeMailForm from "@/components/helper/ComposeMailForm";

export default function DashboardCards({ totalMails, followUps }) {
  const router = useRouter();
  const [showCompose, setShowCompose] = useState(false);

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        <ActionCard
          title="Send Cold Mail"
          icon={MailPlus}
          bgColor="bg-blue-500"
          textColor="text-white"
          onClick={() => setShowCompose(true)}
        />
        <ActionCard
          title="Start Campaign"
          icon={Rocket}
          bgColor="bg-green-500"
          textColor="text-white"
          onClick={() => router.push("/home/campaigns")}
        />
        <StatCard
          icon={Send}
          value={totalMails}
          label="Total Mail Sent"
          bgColor="bg-yellow-200"
          textColor="text-yellow-900"
        />
        <StatCard
          icon={Bot}
          value={followUps}
          label="AI Follow-ups Sent"
          bgColor="bg-purple-300"
          textColor="text-purple-900"
        />
      </div>

      {/* 💌 Show Compose UI on demand */}
      {showCompose && <ComposeMailForm onClose={() => setShowCompose(false)} />}
    </>
  );
}
