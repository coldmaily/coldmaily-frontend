// lib/api.js

// 1. Get backend base URL from environment
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

// 2. Create a generic fetch function that all API calls will use
export async function fetcher(endpoint) {
  // Call fetch with full URL and send credentials (cookies) if any
  const res = await fetch(`${API_BASE_URL}${endpoint}`, {
    credentials: 'include', // send cookies (important for auth)
  });

  // Check if response is not OK (like 404 or 500)
  if (!res.ok) {
    // Try to get error message from response JSON
    const errorData = await res.json().catch(() => ({}));

    // Create a new error with message or fallback message
    const error = new Error(
      errorData.detail || 'An error occurred while fetching data'
    );
    error.status = res.status;  // store HTTP status code
    throw error;  // throw error to be caught by caller
  }

  // If all is good, parse and return JSON data
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

