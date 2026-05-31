import React from "react";

export default function Footer() {
  return (
    <footer style={{ background: "#0f0e0c", color: "#f5f0e8", padding: "3rem 5% 2rem" }}>
      <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "2rem", marginBottom: "2rem" }}>
        <div>
          <h3 style={{ fontFamily: "'Cormorant Garamond', serif", color: "#c9a84c", fontSize: "1.8rem", marginBottom: "0.5rem" }}>LandMark</h3>
          <p style={{ opacity: 0.6, fontSize: "0.9rem", maxWidth: "260px" }}>Premium plots and land investments in Ludhiana and surrounding regions.</p>
        </div>
        <div>
          <p style={{ fontWeight: 600, marginBottom: "0.8rem", letterSpacing: "0.1em", fontSize: "0.8rem", textTransform: "uppercase", color: "#c9a84c" }}>Quick Links</p>
          {[["Home", "/"], ["Properties", "/plots"], ["Contact", "/contact"]].map(([l, h]) => (
            <a key={h} href={h} style={{ display: "block", opacity: 0.6, fontSize: "0.9rem", marginBottom: "0.4rem" }}>{l}</a>
          ))}
        </div>
        <div>
          <p style={{ fontWeight: 600, marginBottom: "0.8rem", letterSpacing: "0.1em", fontSize: "0.8rem", textTransform: "uppercase", color: "#c9a84c" }}>Contact</p>
          <p style={{ opacity: 0.6, fontSize: "0.9rem" }}>📞 +91 98765 43210</p>
          <p style={{ opacity: 0.6, fontSize: "0.9rem" }}>📍 Ludhiana, Punjab</p>
          <p style={{ opacity: 0.6, fontSize: "0.9rem" }}>✉️ info@landmark.com</p>
        </div>
      </div>
      <div style={{ borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: "1.5rem", textAlign: "center", opacity: 0.4, fontSize: "0.8rem" }}>
        © {new Date().getFullYear()} LandMark Real Estate. All rights reserved.
      </div>
    </footer>
  );
}
