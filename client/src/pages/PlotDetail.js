import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../utils/api";

const statusColors = { Available: "#3d8c5a", Sold: "#c0392b", Reserved: "#d4a017" };

export default function PlotDetail() {
  const { id } = useParams();
  const [plot, setPlot] = useState(null);
  const [activeImg, setActiveImg] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get(`/plots/${id}`).then(r => setPlot(r.data)).catch(() => {}).finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div style={{ paddingTop: "120px", textAlign: "center", color: "#7a7568" }}>Loading...</div>;
  if (!plot) return <div style={{ paddingTop: "120px", textAlign: "center" }}>Plot not found. <Link to="/plots" style={{ color: "#c9a84c" }}>Go back</Link></div>;

  const whatsappMsg = encodeURIComponent(`Hi, I'm interested in the plot: ${plot.title} in ${plot.location} (₹${Number(plot.price).toLocaleString("en-IN")}). Please share more details.`);

  return (
    <div style={{ paddingTop: "70px" }}>
      {/* Breadcrumb */}
      <div style={{ background: "#0f0e0c", padding: "1rem 5%", color: "rgba(245,240,232,0.5)", fontSize: "0.85rem" }}>
        <Link to="/" style={{ color: "rgba(245,240,232,0.5)" }}>Home</Link> &nbsp;/&nbsp;
        <Link to="/plots" style={{ color: "rgba(245,240,232,0.5)" }}>Properties</Link> &nbsp;/&nbsp;
        <span style={{ color: "#c9a84c" }}>{plot.title}</span>
      </div>

      <div style={{ padding: "3rem 5%", display: "grid", gridTemplateColumns: "1fr 380px", gap: "3rem", maxWidth: "1200px", margin: "0 auto" }}>
        {/* Left: Images + Details */}
        <div>
          {/* Main image */}
          <div style={{ height: "400px", background: "#e8e4dc", borderRadius: "4px", overflow: "hidden", marginBottom: "1rem" }}>
            {plot.images?.[activeImg] ? (
              <img src={plot.images[activeImg]} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            ) : (
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100%", fontSize: "4rem" }}>🏞️</div>
            )}
          </div>
          {/* Thumbnails */}
          {plot.images?.length > 1 && (
            <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
              {plot.images.map((img, i) => (
                <img key={i} src={img} alt="" onClick={() => setActiveImg(i)}
                  style={{ width: "80px", height: "60px", objectFit: "cover", borderRadius: "2px", cursor: "pointer", border: i === activeImg ? "2px solid #c9a84c" : "2px solid transparent" }} />
              ))}
            </div>
          )}

          {/* Description */}
          <div style={{ marginTop: "2rem" }}>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.5rem", marginBottom: "1rem" }}>About This Property</h2>
            <p style={{ color: "#7a7568", lineHeight: 1.8 }}>{plot.description || "No description available."}</p>
          </div>

          {/* Specs */}
          <div style={{ marginTop: "2rem", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
            {[["Location", plot.location], ["Size", plot.size], ["Type", plot.type], ["Status", plot.status]].map(([k, v]) => (
              <div key={k} style={{ background: "#f5f0e8", padding: "1rem", borderRadius: "4px" }}>
                <p style={{ fontSize: "0.75rem", color: "#7a7568", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "0.3rem" }}>{k}</p>
                <p style={{ fontWeight: 600, color: k === "Status" ? statusColors[v] : "#2c2a24" }}>{v}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Contact card */}
        <div>
          <div style={{ background: "#fff", padding: "2rem", borderRadius: "4px", boxShadow: "0 4px 24px rgba(0,0,0,0.08)", position: "sticky", top: "90px" }}>
            <span style={{ background: statusColors[plot.status] + "22", color: statusColors[plot.status], padding: "4px 12px", borderRadius: "20px", fontSize: "0.8rem", fontWeight: 600 }}>
              {plot.status}
            </span>
            <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.8rem", margin: "1rem 0 0.5rem" }}>{plot.title}</h1>
            <p style={{ color: "#7a7568", marginBottom: "1rem" }}>📍 {plot.location}</p>
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "2.5rem", color: "#c9a84c", fontWeight: 700, marginBottom: "0.5rem" }}>
              ₹{Number(plot.price).toLocaleString("en-IN")}
            </p>
            <p style={{ color: "#7a7568", fontSize: "0.85rem", marginBottom: "2rem" }}>Size: {plot.size}</p>

            <a href={`https://wa.me/919876543210?text=${whatsappMsg}`} target="_blank" rel="noreferrer" style={{ display: "block" }}>
              <button style={{ width: "100%", background: "#25D366", border: "none", color: "#fff", padding: "14px", fontWeight: 600, fontSize: "1rem", borderRadius: "2px", cursor: "pointer", marginBottom: "0.8rem" }}>
                💬 WhatsApp Enquiry
              </button>
            </a>
            <a href="tel:+919876543210" style={{ display: "block" }}>
              <button style={{ width: "100%", background: "transparent", border: "2px solid #c9a84c", color: "#c9a84c", padding: "12px", fontWeight: 600, fontSize: "0.9rem", borderRadius: "2px", cursor: "pointer" }}>
                📞 Call Now
              </button>
            </a>

            <div style={{ marginTop: "1.5rem", paddingTop: "1.5rem", borderTop: "1px solid #e8e4dc", fontSize: "0.82rem", color: "#7a7568" }}>
              <p>✅ Verified Title Documents</p>
              <p style={{ marginTop: "0.4rem" }}>✅ Site Visit Available</p>
              <p style={{ marginTop: "0.4rem" }}>✅ No Hidden Charges</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
