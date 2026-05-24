import React from "react";
import { Link } from "react-router-dom";

const statusColors = {
  Available: { bg: "#e8f5ee", color: "#3d8c5a" },
  Sold: { bg: "#fdecea", color: "#c0392b" },
  Reserved: { bg: "#fef9e7", color: "#d4a017" },
};

export default function PlotCard({ plot }) {
  const status = statusColors[plot.status] || statusColors.Available;
  return (
    <Link to={`/plots/${plot._id}`} style={{ textDecoration: "none" }}>
      <div style={{
        background: "#fff", borderRadius: "4px", overflow: "hidden",
        boxShadow: "0 2px 12px rgba(0,0,0,0.06)", transition: "transform 0.25s, box-shadow 0.25s",
        cursor: "pointer",
      }}
        onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 8px 28px rgba(0,0,0,0.12)"; }}
        onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 2px 12px rgba(0,0,0,0.06)"; }}
      >
        {/* Image */}
        <div style={{ height: "200px", background: "#e8e4dc", overflow: "hidden", position: "relative" }}>
          {plot.images?.[0] ? (
            <img src={plot.images[0]} alt={plot.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          ) : (
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100%", color: "#7a7568", fontSize: "2.5rem" }}>🏞️</div>
          )}
          <span style={{
            position: "absolute", top: "12px", right: "12px",
            background: status.bg, color: status.color,
            padding: "4px 10px", borderRadius: "20px", fontSize: "0.75rem", fontWeight: 600,
          }}>{plot.status}</span>
        </div>

        {/* Content */}
        <div style={{ padding: "1.2rem" }}>
          <p style={{ fontSize: "0.75rem", color: "#7a7568", letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: "0.3rem" }}>{plot.location}</p>
          <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.25rem", marginBottom: "0.8rem", color: "#2c2a24" }}>{plot.title}</h3>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.4rem", color: "#c9a84c", fontWeight: 700 }}>
              ₹{Number(plot.price).toLocaleString("en-IN")}
            </span>
            <span style={{ background: "#f5f0e8", padding: "4px 10px", borderRadius: "20px", fontSize: "0.8rem", color: "#7a7568" }}>{plot.size}</span>
          </div>
          <p style={{ fontSize: "0.78rem", color: "#7a7568", marginTop: "0.5rem" }}>{plot.type}</p>
        </div>
      </div>
    </Link>
  );
}
