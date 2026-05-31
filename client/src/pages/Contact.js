import React from "react";

export default function Contact() {
  return (
    <div style={{ paddingTop: "70px", minHeight: "100vh" }}>
      <div style={{ background: "#0f0e0c", padding: "4rem 5% 3rem", color: "#f5f0e8", textAlign: "center" }}>
        <p style={{ color: "#c9a84c", letterSpacing: "0.2em", fontSize: "0.8rem", textTransform: "uppercase", marginBottom: "0.8rem" }}>We're Here</p>
        <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "3rem" }}>Get In Touch</h1>
      </div>
      <div style={{ padding: "4rem 5%", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem", maxWidth: "1000px", margin: "0 auto" }}>
        <div>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "2rem", marginBottom: "1.5rem" }}>Contact Information</h2>
          {[
            ["📞", "Phone", "+91 90127 88331"],
            ["💬", "WhatsApp", "+91 90127 88331"],
            ["✉️", "Email", "rishpalsingh88331@gmail.com"],
            ["📍", "Office", "Kashipur, Uttarakhand, India"],
            ["🕐", "Hours", "Mon–Sat: 9am – 7pm"],
          ].map(([icon, label, val]) => (
            <div key={label} style={{ display: "flex", gap: "1rem", marginBottom: "1.2rem", alignItems: "flex-start" }}>
              <span style={{ fontSize: "1.3rem" }}>{icon}</span>
              <div>
                <p style={{ fontWeight: 600, fontSize: "0.85rem", letterSpacing: "0.06em", textTransform: "uppercase", color: "#7a7568" }}>{label}</p>
                <p style={{ color: "#2c2a24" }}>{val}</p>
              </div>
            </div>
          ))}
          <a href="https://wa.me/919012788331?text=Hi, I'm interested in a plot" target="_blank" rel="noreferrer">
            <button style={{ background: "#25D366", border: "none", color: "#fff", padding: "14px 28px", fontWeight: 600, borderRadius: "2px", cursor: "pointer", marginTop: "1rem", fontSize: "0.95rem" }}>
              💬 Start WhatsApp Chat
            </button>
          </a>
        </div>
        <div style={{ background: "#f5f0e8", padding: "2rem", borderRadius: "4px" }}>
          <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.6rem", marginBottom: "1.5rem" }}>Quick Enquiry</h3>
          <p style={{ color: "#7a7568", lineHeight: 1.7, marginBottom: "1.5rem" }}>
            Interested in a plot? Reach out to us directly and we will get back to you within a few hours.
          </p>
          <p style={{ color: "#7a7568", fontSize: "0.9rem" }}>
            For fastest response, reach us directly via WhatsApp or phone call.
          </p>
          <div style={{ marginTop: "2rem", padding: "1.5rem", background: "#fff", borderRadius: "4px", border: "1px solid #e8e4dc" }}>
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.3rem", marginBottom: "0.5rem" }}>Visit Our Office</p>
            <p style={{ color: "#7a7568", fontSize: "0.9rem" }}>We welcome walk-in visitors Monday through Saturday between 9am and 7pm. Our team will be happy to show you available plots in Kashipur, Uttarakhand.</p>
          </div>
        </div>
      </div>
    </div>
  );
}