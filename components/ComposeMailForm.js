"use client";

import { useSendMail } from "@/app/home/inbox/useSendMail";
import { X, Minus, Maximize, ImageIcon, Loader2, Paperclip } from "lucide-react";
import { useState, useRef, useEffect } from "react";

export default function ComposeMailForm({ onClose, onMinimize, onMaximize }) {
  const {
    form, attachments, uploadingFiles, loading, handleChange, handleSend, handleFileChange, handleRemoveFile, formatFileSize, setForm
    } = useSendMail(onClose);
  
  const [activeField, setActiveField] = useState(null);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const textareaRef = useRef(null);


  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = textareaRef.current.scrollHeight + "px";
    }
  }, [form.body]);

  const handleMinimize = () => {
    setIsMinimized(!isMinimized);
    if (onMinimize) onMinimize();
  };

  const onSend = () => {
    handleSend();
  };

  if (isMinimized) {
    return (
      <div className="fixed bottom-4 right-4 w-64 bg-white rounded-lg shadow-lg z-50 border border-gray-300">
        <div
          className="flex items-center justify-between px-3 py-2 bg-gray-50 rounded-lg cursor-pointer"
          onClick={handleMinimize}
        >
          <span className="text-sm font-medium text-gray-700 truncate">New Message</span>
          <div className="flex items-center gap-1">
            <button onClick={(e) => { e.stopPropagation(); onMaximize?.(); }} className="text-gray-500 hover:text-gray-700 p-1">
              <Maximize className="h-3 w-3" />
            </button>
            <button onClick={(e) => { e.stopPropagation(); onClose?.(); }} className="text-gray-500 hover:text-gray-700 p-1">
              <X className="h-3 w-3" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 w-[600px] h-[650px] bg-white rounded-lg shadow-2xl z-50 border border-gray-300 overflow-hidden flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-white border-b border-gray-200">
        <span className="text-sm font-medium text-gray-900">New Message</span>
        <div className="flex items-center gap-1">
          <button onClick={handleMinimize} className="text-gray-500 hover:bg-gray-100 p-1.5 rounded-full" title="Minimize">
            <Minus className="h-4 w-4" />
          </button>
          <button onClick={onMaximize} className="text-gray-500 hover:bg-gray-100 p-1.5 rounded-full" title="Maximize">
            <Maximize className="h-4 w-4" />
          </button>
          <button onClick={onClose} className="text-gray-500 hover:bg-gray-100 hover:text-red-600 p-1.5 rounded-full" title="Discard draft">
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* To Field */}
      <div className="px-4 pt-3 pb-2 border-b border-gray-200">
        <div className="flex items-start gap-2">
          {activeField === "to" && (
            <label className="pt-1 text-sm text-gray-600 font-medium w-6">To</label>
          )}
          <input
            type="email"
            name="to_email"
            value={form.to_email}
            onChange={handleChange}
            onFocus={() => setActiveField("to")}
            onBlur={() => setActiveField(null)}
            placeholder={!form.to_email && activeField !== "to" ? "Recipients" : ""}
            className="flex-1 outline-none text-sm py-1 text-black placeholder-gray-600 border-none"
          />
        </div>
      </div>

      {/* Subject */}
      <div className="px-4 py-2 border-b border-gray-200">
        <input
          name="subject"
          value={form.subject}
          onChange={handleChange}
          onFocus={() => setActiveField("subject")}
          onBlur={() => setActiveField(null)}
          placeholder="Subject"
          className="w-full outline-none text-sm py-1 text-black placeholder-gray-600"
        />
      </div>

      {/* Mail Category and Follow-up Controls */}
      <div className="px-4 py-2 border-b border-gray-200">
        <div className="flex gap-3">
          <select
            name="mail_category"
            onChange={handleChange}
            value={form.mail_category || ""}
            className="text-sm px-3 py-1 border border-gray-300 rounded-md w-2/5 text-black"
          >
            <option value="">Select Mail Category</option>
            <option value="job_followup">Job Application</option>
            <option value="freelancer_outreach">Freelancer Outreach</option>
            <option value="referral_request">Referral Request</option>
            <option value="sales_outreach">Sales Outreach</option>
            <option value="b2b_partnership">B2B Partnership Inquiry</option>
            <option value="service_offering">Service Offering</option>
            <option value="portfolio_sharing">Portfolio Sharing</option>
            <option value="cold_investor_email">Email to Investor</option>
            <option value="funding_followup">Startup Funding</option>
            <option value="angel_outreach">Angel Investor Outreach</option>
            <option value="mentorship_request">Mentorship Request</option>
            <option value="general_networking">General Networking</option>
            <option value="podcast_invite">Podcast Guest Invite</option>
            <option value="influencer_collab">Influencer Collaboration</option>
            <option value="event_invite">Event Invitation</option>
            <option value="feedback_request">Feedback Request</option>
            <option value="custom">Custom</option>
          </select>

          {form.mail_category === "custom" && (
            <input
              type="text"
              name="custom_mail_category"
              placeholder="Enter custom category"
              value={form.custom_mail_category || ""}
              onChange={handleChange}
              className="text-sm px-3 py-1 border border-gray-300 rounded-md w-1/3 text-black"
            />
          )}

          <input
            type="number"
            name="no_of_follow_up"
            onChange={handleChange}
            value={form.no_of_follow_up || ""}
            placeholder="No of Follow Ups"
            className="text-sm px-3 py-1 border border-gray-300 rounded-md w-2/6 text-black"
            min="0"
          />

          <select
            name="follow_up_strategy"
            onFocus={() => {
              if (!form.follow_up_strategy) {
                handleChange({ target: { name: "follow_up_strategy", value: "standard" } });
              }
            }}
            onChange={handleChange}
            value={form.follow_up_strategy || ""}
            className="text-sm px-3 py-1 border border-gray-300 rounded-md w-2/5 text-black"
          >
            <option value="">Select Follow-Up Strategy</option>
            <option value="standard">Standard (Day 2, 5, 8, 12...)</option>
            <option value="every_1_day">Every 1 Day</option>
            <option value="every_2_days">Every 2 Days</option>
            <option value="custom">Custom</option>
          </select>
        </div>
      </div>

      {/* Body */}
      <div className="flex-1 px-4 py-3 overflow-y-auto min-h-[200px]">
        {/* Textarea */}
        <textarea
          ref={textareaRef}
          name="body"
          value={form.body}
          onChange={handleChange}
          onFocus={() => setActiveField("body")}
          onBlur={() => setActiveField(null)}
          className="w-full min-h-[300px] outline-none resize-none text-sm text-gray-900 placeholder-gray-400"
          placeholder="Compose email"
        />

        {/* Gmail-style File Upload Preview */}
        {attachments.length > 0 && (
          <div className="mt-4 space-y-2 mr-20">
            {attachments.map((file, idx) => (
              <div
                key={idx}
                className="p-2 border rounded bg-gray-100 flex items-center justify-between text-sm"
              >
                <div className="flex items-center gap-2 truncate max-w-[80%]">
                  {uploadingFiles.includes(file.name) ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin text-gray-500" />
                      <span className="text-gray-500 truncate">{file.name}</span>
                    </>
                  ) : (
                    <a
                      href={URL.createObjectURL(file)}
                      download={file.name}
                      className="text-blue-600 hover:underline truncate"
                      title={file.name}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {file.name} ({formatFileSize(file.size)})
                    </a>
                  )}
                </div>
                <button
                  onClick={() => handleRemoveFile(idx)}
                  className="text-gray-500 hover:text-red-600 p-1"
                  title="Remove"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between px-4 py-3 border-t border-gray-200 bg-white">
        <div className="flex items-center gap-3">
          <button
            onClick={onSend}
            disabled={loading || !form.to_email?.trim() || isUploading}
            className={`${
              loading || !form.to_email?.trim() || isUploading
                ? "bg-blue-300 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-500"
            } text-white text-sm font-medium px-6 py-2 rounded-full transition-colors`}
          >
            {loading ? "Sending..." : "Send"}
          </button>

          <label
            htmlFor="media-upload"
            className="text-gray-600 hover:bg-gray-100 p-2 rounded-full cursor-pointer transition-colors"
            title=""
          >
            <Paperclip className="h-5 w-4" />
            <input
              type="file"
              id="media-upload"
              className="hidden"
              onChange={handleFileChange}
            />
          </label>
        </div>
        <span className="text-xs text-gray-400">ColdMaily</span>
      </div>
    </div>
  );
}
