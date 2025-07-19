"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { sendMailFormData } from "@/libapi/api";

const categoryMap = {
  job_followup: "Job Application",
  freelancer_outreach: "Freelancer Outreach",
  referral_request: "Referral Request",
  sales_outreach: "Sales Outreach",
  b2b_partnership: "B2B Partnership Inquiry",
  service_offering: "Service Offering",
  portfolio_sharing: "Portfolio Sharing",
  cold_investor_email: "Email to Investor",
  funding_followup: "Startup Funding",
  angel_outreach: "Angel Investor Outreach",
  mentorship_request: "Mentorship Request",
  general_networking: "General Networking",
  podcast_invite: "Podcast Guest Invite",
  influencer_collab: "Influencer Collaboration",
  event_invite: "Event Invitation",
  feedback_request: "Feedback Request",
};

export function useSendMail(onSuccessClose = null) {
  const [form, setForm] = useState({
    to_email: "",
    subject: "",
    body: "",
    no_of_follow_up: null,
    follow_up_strategy: "",
    mail_category: "",
    custom_mail_category: "",
    is_attachment: false,
  });

  const [attachments, setAttachments] = useState([]);
  const [uploadingFiles, setUploadingFiles] = useState([]); // ✅ Add this
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "no_of_follow_up" ? parseInt(value || "0", 10) : value,
    }));
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    setAttachments((prev) => [...prev, ...files]);
    setForm((prev) => ({
      ...prev,
      is_attachment: true,
    }));
  };

  const handleRemoveFile = (indexToRemove) => {
    setAttachments((prev) => {
      const updated = prev.filter((_, i) => i !== indexToRemove);
      return updated;
    });

    setForm((prev) => ({
      ...prev,
      is_attachment: attachments.length > 1, // ✅ set to false if no attachments left
    }));
  };

  const formatFileSize = (bytes) => {
    if (bytes < 1024) return `${bytes} B`;
    else if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    else return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  const handleSend = async () => {
    setLoading(true);

    try {
      const count = parseInt(form.no_of_follow_up || "0", 10);
      let delays = [];

      if (form.follow_up_strategy === "standard") {
        delays = Array.from({ length: count }, (_, i) =>
          [2, 5, 8, 12, 16, 20][i] || (i === 0 ? 2 : delays[i - 1] + 4)
        );
      } else if (form.follow_up_strategy.startsWith("every_")) {
        const interval = parseInt(form.follow_up_strategy.split("_")[1], 10);
        delays = Array.from({ length: count }, (_, i) => interval * (i + 1));
      }

      const category =
        form.mail_category === "custom"
          ? form.custom_mail_category
          : categoryMap[form.mail_category] || "General";

      const formData = new FormData();
      formData.append("to_email", form.to_email);
      formData.append("subject", form.subject);
      formData.append("body", form.body);
      formData.append("no_of_follow_up", String(count));
      formData.append("follow_up_strategy", form.follow_up_strategy);
      formData.append("follow_up_delays", JSON.stringify(delays));
      formData.append("category", category);
      formData.append("is_attachment", form.is_attachment ? "true" : "false");

      attachments.forEach((file) => {
        formData.append("attachments", file);
      });

      // ✅ USE API HELPER HERE
      await sendMailFormData(formData);

      alert("✅ Email sent!");
      router.refresh();
      if (onSuccessClose) onSuccessClose();
    } catch (error) {
      console.error("POST error:", error);
      alert("❌ " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return {
    form,
    attachments,
    loading,
    uploadingFiles,
    handleChange,
    handleSend,
    handleFileChange,
    handleRemoveFile,
    formatFileSize,
    setForm,
  };
}
