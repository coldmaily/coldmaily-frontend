'use client'; // because we are using state & event handlers

import { useState } from "react";
import { unsubscribeUser } from "@/libapi/api";
import * as React from "react";

export default function UnsubscribePage({ params: paramsPromise }) {
  // Unwrap params using React.use()
  const params = React.use(paramsPromise);
  const token = params.token;

  const [status, setStatus] = useState("pending"); // pending, success, error

  const handleUnsubscribe = async () => {
    try {
      await unsubscribeUser(token);
      setStatus("success");
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  };

  return (
    <div style={{ padding: "2rem", textAlign: "center", fontFamily: "Arial" }}>
      <h1>Unsubscribe from emails</h1>
      {status === "pending" && (
        <>
          <p>Are you sure you want to unsubscribe?</p>
          <button
            onClick={handleUnsubscribe}
            style={{
              padding: "0.5rem 1rem",
              backgroundColor: "red",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Yes, unsubscribe me
          </button>
        </>
      )}
      {status === "success" && (
        <p style={{ color: "green" }}>You have been unsubscribed successfully ✅</p>
      )}
      {status === "error" && (
        <p style={{ color: "red" }}>Something went wrong. Please try again later.</p>
      )}
    </div>
  );
}
