import { fetcher } from "@/libapi/api";

export async function getMailCount() {
  return fetcher("/dashboard/mail-count");
}

export async function getRecentMails() {
    return fetcher("/dashboard/recent-mails");
}

export async function getUpcomingMails() {
    return fetcher("/dashboard/upcoming-mails");
}