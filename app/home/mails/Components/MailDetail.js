"use client";

import { formatDateTime } from "@/utils/formatDateTime";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { useRouter } from "next/navigation";

export default function MailDetail({ mail }) {
  const router = useRouter();

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'sent':
        return 'bg-green-50 text-green-700 border border-green-200';
      case 'pending':
        return 'bg-yellow-50 text-yellow-700 border border-yellow-200';
      case 'scheduled':
        return 'bg-blue-50 text-blue-700 border border-blue-200';
      case 'failed':
        return 'bg-red-50 text-red-700 border border-red-200';
      default:
        return 'bg-gray-50 text-gray-700 border border-gray-200';
    }
  };

  return (
    <div className="w-full px-4 py-1">
      {/* Back Button */}
      <button
        onClick={() => router.back()}
        className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-all duration-200 mb-4 cursor-pointer"
      >
        <ArrowLeft size={16} />
        Back
      </button>

      {/* Subject and Status */}
      <div className="flex justify-between items-center mb-5">
        <h1 className="text-xl font-semibold text-gray-900">{mail.subject}</h1>
        <span className={`text-sm px-3 py-1.5 rounded-full font-medium ${getStatusColor(mail.status)}`}>
          {mail.status}
        </span>
      </div>

      {/* To Email and Placeholder Gmail Link */}
      <div className="flex justify-between items-center text-sm text-gray-600 mb-5 p-3 bg-gray-50 rounded-lg border">
        <div>
          <span className="font-semibold text-gray-800">To:</span> 
          <span className="ml-2 text-gray-700">{mail.to_email}</span>
        </div>
        {/* Placeholder Gmail Link */}
        <div
            onClick={() => {
              if (mail?.message_id) {
                const gmailLink = `https://mail.google.com/mail/u/0/#all/${mail.message_id}`;
                window.open(gmailLink, "_blank");
              }
            }}
            className={`flex items-center gap-1 italic transition-colors cursor-pointer ${
              mail?.message_id
                ? "text-blue-600 hover:text-blue-800"
                : "text-gray-400 cursor-not-allowed"
            }`}
          >
            View in Gmail <ExternalLink size={14} />
        </div>

      </div>

      {/* Meta Info: All in one line */}
      <div className="flex flex-wrap items-center text-sm text-gray-600 mb-6 p-4 bg-white rounded-lg border shadow-sm">
        <div className="mr-20">
          <span className="font-semibold text-gray-800">Mail Category:</span>{" "}
          <span className="text-blue-600 font-medium">{mail.mail_category || "N/A"}</span>
        </div>
        <div className="mr-20">
          <span className="font-semibold text-gray-800">Follow-up Strategy:</span>{" "}
          <span className="text-purple-600 font-medium">{mail.follow_up_strategy || "N/A"}</span>
        </div>
        <div className="mr-10">
          <span className="font-semibold text-gray-800">Follow-ups:</span>{" "}
          <span className="text-green-600 font-semibold">{mail.cur_follow_up} / {mail.no_of_follow_up}</span>
        </div>
        <div className="ml-auto">
          <span className="font-semibold text-gray-800">Sent:</span>{" "}
          <span className="text-orange-600 font-medium">{formatDateTime(mail.sent_at)}</span>
        </div>
      </div>

      {/* Body */}
      <div className="bg-white rounded-xl shadow-sm border p-5 mb-6 hover:shadow-md transition-shadow duration-200">
        <div className="text-md font-semibold mb-3 text-gray-800 border-b border-gray-100 pb-2">Message</div>
        <div
          className="text-sm text-gray-800 whitespace-pre-line leading-relaxed"
          dangerouslySetInnerHTML={{ __html: mail.body }}
        />
      </div>

      {/* Follow-ups */}
      <div>
        <div className="text-md font-semibold mb-3 text-gray-800">Follow-Ups 
          {mail.followups?.length > 0 && (
            <span className="ml-2 text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full font-medium">
              {mail.followups.length}
            </span>
          )}
        </div>
        {mail.followups?.length === 0 ? (
          <div className="text-sm text-gray-500 bg-gray-50 p-4 rounded-lg border border-dashed border-gray-300 text-center">
            No follow-ups scheduled
          </div>
        ) : (
          <ul className="space-y-3">
            {mail.followups.map((fu, idx) => (
              <li
                key={fu.followup_id}
                className="border border-gray-200 bg-white rounded-lg shadow-sm p-4 hover:shadow-md hover:border-gray-300 transition-all duration-200"
              >
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-semibold text-gray-800 flex items-center gap-2">
                    <span className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-bold">
                      {idx + 1}
                    </span>
                    Follow-up
                  </span>
                  <div className="flex items-center gap-10">
                    <span className="text-xs text-gray-500 font-medium">
                      {fu.sent_at && fu.sent_at !== "None"
                        ? `${formatDateTime(fu.sent_at)}`
                        : fu.scheduled_for
                        ? `${formatDateTime(fu.scheduled_for)}`
                        : "Not scheduled"}
                    </span>
                    <span className={`text-xs px-2 py-1 rounded-full font-medium ${getStatusColor(fu.status)}`}>
                      {fu.status}
                    </span>
                    <button className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 px-3 py-1.5 rounded-lg transition-all duration-200 text-xs font-medium">
                      Edit
                    </button>
                  </div>
                </div>
                <div className="text-sm text-gray-700 whitespace-pre-line mb-3 bg-gray-50 p-3 rounded-lg border">
                  {fu.follow_up_message}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}