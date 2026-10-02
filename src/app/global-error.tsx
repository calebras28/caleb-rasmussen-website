"use client";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "grid",
          placeItems: "center",
          fontFamily: "system-ui, sans-serif",
          background: "#faf6ec",
          color: "#101010",
          padding: "24px",
        }}
      >
        <div style={{ textAlign: "center", maxWidth: 480 }}>
          <h1 style={{ fontSize: 40, fontWeight: 800, margin: 0 }}>
            Something went wrong
          </h1>
          <p style={{ color: "#5b5647", marginTop: 12 }}>
            An unexpected error occurred. Please try again.
          </p>
          <button
            onClick={reset}
            style={{
              marginTop: 24,
              padding: "12px 24px",
              fontWeight: 700,
              background: "#2b50ff",
              color: "#fff",
              border: "3px solid #101010",
              boxShadow: "4px 4px 0 0 #101010",
              cursor: "pointer",
            }}
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}
