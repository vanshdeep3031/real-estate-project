import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../utils/api";

const StatCard = ({ icon, label, value, color }) => (
  <div style={{ background: "#fff", borderRadius: "4px", padding: "1.5rem 2rem", boxShadow: "0 2px 12px rgba(0,0,0,0.06)", borderLeft: `4px solid ${color}`, display: "flex", alignItems: "center", gap: "1.2rem" }}>
    <span style={{ fontSize: "2rem" }}>{icon}</span>
    <div>
      <p style={{ fontSize: "0.78rem", color: "#7a7568", textTransform: "uppercase", letterSpacing: "0.08em" }}>{label}</p>
      <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "2.2rem", fontWeight: 700, color: "#2c2a24", lineHeight: 1.1 }}>{value}</p>
    </div>
  </div>
);

export default function AdminDashboard() {
  const [stats, setStats] = useState({ total: 0, available: 0, sold: 0, reserved: 0 });
  const [recentPlots, setRecentPlots] = useState([]);
  const [customerCount, setCustomerCount] = useState(0);

  useEffect(() => {
    api.get("/plots/stats/summary").then(r => setStats(r.data)).catch(() => {});
    api.get("/plots?limit=5").then(r => setRecentPlots(r.data.slice(0, 5))).catch(() => {});
    api.get("/customers").then(r => setCustomerCount(r.data.length)).catch(() => {});
  }, []);

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem" }}>
        <div>
          <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "2.2rem" }}>Dashboard</h1>
          <p style={{ color: "#7a7568", fontSize: "0.9rem" }}>{new Date().toLocaleDateString("en-IN", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}</p>
        </div>
        <Link to="/admin/plots/new">
          <button style={{ background: "#c9a84c", border: "none", color: "#0f0e0c", padding: "12px 24px", fontWeight: 600, borderRadius: "2px", cursor: "pointer", fontSize: "0.9rem" }}>
            + Add New Plot
          </button>
        </Link>
      </div>

      {/* Stats Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: "1.2rem", marginBottom: "2.5rem" }}>
        <StatCard icon="🏞️" label="Total Plots" value={stats.total} color="#c9a84c" />
        <StatCard icon="✅" label="Available" value={stats.available} color="#3d8c5a" />
        <StatCard icon="🔴" label="Sold" value={stats.sold} color="#c0392b" />
        <StatCard icon="🟡" label="Reserved" value={stats.reserved} color="#d4a017" />
        <StatCard icon="👥" label="Customers" value={customerCount} color="#2980b9" />
      </div>

      {/* Quick Actions */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem", marginBottom: "2.5rem" }}>
        <Link to="/admin/plots" style={{ textDecoration: "none" }}>
          <div style={{ background: "#0f0e0c", borderRadius: "4px", padding: "1.5rem", color: "#f5f0e8", cursor: "pointer" }}>
            <p style={{ fontSize: "1.8rem", marginBottom: "0.8rem" }}>🏞️</p>
            <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.3rem", color: "#c9a84c" }}>Manage Plots</h3>
            <p style={{ opacity: 0.6, fontSize: "0.85rem" }}>Add, edit, or delete property listings</p>
          </div>
        </Link>
        <Link to="/admin/customers" style={{ textDecoration: "none" }}>
          <div style={{ background: "#0f0e0c", borderRadius: "4px", padding: "1.5rem", color: "#f5f0e8", cursor: "pointer" }}>
            <p style={{ fontSize: "1.8rem", marginBottom: "0.8rem" }}>👥</p>
            <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.3rem", color: "#c9a84c" }}>Manage Customers</h3>
            <p style={{ opacity: 0.6, fontSize: "0.85rem" }}>Track leads and interested buyers</p>
          </div>
        </Link>
      </div>

      {/* Recent Plots */}
      <div style={{ background: "#fff", borderRadius: "4px", boxShadow: "0 2px 12px rgba(0,0,0,0.06)", overflow: "hidden" }}>
        <div style={{ padding: "1.2rem 1.5rem", borderBottom: "1px solid #f0ece4", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.3rem" }}>Recent Plots</h2>
          <Link to="/admin/plots" style={{ color: "#c9a84c", fontSize: "0.85rem" }}>View all →</Link>
        </div>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: "#f5f0e8" }}>
              {["Title", "Location", "Price", "Size", "Status"].map(h => (
                <th key={h} style={{ padding: "0.8rem 1.5rem", textAlign: "left", fontSize: "0.78rem", color: "#7a7568", textTransform: "uppercase", letterSpacing: "0.06em" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {recentPlots.map((p, i) => (
              <tr key={p._id} style={{ borderBottom: "1px solid #f5f0e8", background: i % 2 === 0 ? "#fff" : "#fdfcfa" }}>
                <td style={{ padding: "0.9rem 1.5rem", fontWeight: 500 }}>{p.title}</td>
                <td style={{ padding: "0.9rem 1.5rem", color: "#7a7568" }}>{p.location}</td>
                <td style={{ padding: "0.9rem 1.5rem", color: "#c9a84c", fontWeight: 600 }}>₹{Number(p.price).toLocaleString("en-IN")}</td>
                <td style={{ padding: "0.9rem 1.5rem", color: "#7a7568" }}>{p.size}</td>
                <td style={{ padding: "0.9rem 1.5rem" }}>
                  <span style={{
                    padding: "3px 10px", borderRadius: "20px", fontSize: "0.75rem", fontWeight: 600,
                    background: p.status === "Available" ? "#e8f5ee" : p.status === "Sold" ? "#fdecea" : "#fef9e7",
                    color: p.status === "Available" ? "#3d8c5a" : p.status === "Sold" ? "#c0392b" : "#d4a017",
                  }}>{p.status}</span>
                </td>
              </tr>
            ))}
            {recentPlots.length === 0 && (
              <tr><td colSpan={5} style={{ padding: "2rem", textAlign: "center", color: "#7a7568" }}>No plots added yet. <Link to="/admin/plots/new" style={{ color: "#c9a84c" }}>Add your first plot →</Link></td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
