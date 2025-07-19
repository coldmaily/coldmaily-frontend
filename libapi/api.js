// lib/api.js

// 1. Get backend base URL from environment
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

// 2. Create a generic fetch function that all API calls will use
export async function fetcher(endpoint, options = {}) {
  const res = await fetch(`${API_BASE_URL}${endpoint}`, {
    credentials: 'include',       // ✅ send cookies
    ...options,                   // ✅ apply method, headers, body, etc.
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    const error = new Error(
      errorData.detail || 'An error occurred while fetching data'
    );
    error.status = res.status;
    throw error;
  }

  return res.json();
}


// Generic post function that all API Calls will use
export async function postFetcher(endpoint, payload) {
  const res = await fetch(`${API_BASE_URL}${endpoint}`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    const error = new Error(
      errorData.detail || "An error occurred while sending data"
    );
    error.status = res.status;
    throw error;
  }

  return res.json();
}

export async function sendMailFormData(formData) {
  const res = await fetch(`${API_BASE_URL}/send-mail`, {
    method: "POST",
    body: formData,
    credentials: "include", // if your backend uses cookies/sessions
    // ❌ DO NOT SET headers — browser will do it for multipart/form-data
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    const error = new Error(
      errorData.detail || "An error occurred while sending email"
    );
    error.status = res.status;
    throw error;
  }

  return res.json();
}

// Returns the Google login URL
export function getGoogleLoginUrl() {
  return `${API_BASE_URL}/google/login`;
}

// Helper to redirect browser to Google login URL
export function redirectToGoogleLogin() {
  window.location.href = getGoogleLoginUrl();
}

// user info
export async function getCurrentUser() {
  return fetcher("/auth/me"); // Your FastAPI backend route to return user info
}

