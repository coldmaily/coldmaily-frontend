// lib/mails.js
import { fetcher } from "./api";

// 🔄 Fetch all inbox-related data at once
export async function getAllMails() {
  const [mails, upcoming, recent] = await Promise.all([
    fetcher("/mails"),
    fetcher("/mails/scheduled-followups"),
    fetcher("/mails/sent-followups"),
  ]);

  return {
    mails,
    upcoming,
    recent,
  };
}

export async function getMailDetail(mail_id){
  return fetcher(`/mails/${mail_id}`)
}
