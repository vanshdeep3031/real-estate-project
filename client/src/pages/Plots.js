import React, { useEffect, useState } from "react";
import api from "../utils/api";
import PlotCard from "../components/PlotCard";

export default function Plots() {
  const [plots, setPlots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [type, setType] = useState("");

  const fetchPlots = () => {
    setLoading(true);
    const params = new URLSearchParams();
    if (search) params.set("search", search);
    if (status) params.set("status", status);
    if (type) params.set("type", type);
    api.get(`/plots?${params.toString()}`)
      .then(r => setPlots(r.data))
      .catch(() => {})
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetchPlots(); }, [status, type]);

  const handleSearch = (e) => { e.preventDefault(); fetchPlots(); };

  return (
    <div style={{ paddingTop: "70px", minHeight: "100vh" }}>
      {/* Page Header */}
      <div style={{ background: "#0f0e0c", padding: "4rem 5% 3rem", color: "#f5f0e8", textAlign: "center" }}>
        <p style={{ color: "#c9a84c", letterSpacing: "0.2em", fontSize: "0.8rem", textTransform: "uppercase", marginBottom: "0.8rem" }}>Browse All</p>
        <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "3rem" }}>Available Properties</h1>
      </div>

      {/* Filters */}
      <div style={{ background: "#fff", padding: "1.5rem 5%", boxShadow: "0 2px 12px rgba(0,0,0,0.06)", position: "sticky", top: "70px", zIndex: 50 }}>
        <form onSubmit={handleSearch} style={{ display: "flex", gap: "1rem", flexWrap: "wrap", alignItems: "center" }}>
          <input
            value={search} onChange={e => setSearch(e.target.value)}
            placeholder="Search by title or location..."
            style={{ flex: "1 1 220px", padding: "10px 14px", border: "1px solid #ddd", borderRadius: "2px", fontSize: "0.9rem" }}
          />
          <select value={status} onChange={e => setStatus(e.target.value)} style={{ padding: "10px 14px", border: "1px solid #ddd", borderRadius: "2px", fontSize: "0.9rem" }}>
            <option value="">All Status</option>
            {["Available", "Reserved", "Sold"].map(s => <option key={s}>{s}</option>)}
          </select>
          <select value={type} onChange={e => setType(e.target.value)} style={{ padding: "10px 14px", border: "1px solid #ddd", borderRadius: "2px", fontSize: "0.9rem" }}>
            <option value="">All Types</option>
            {["Residential", "Commercial", "Agricultural", "Industrial"].map(t => <option key={t}>{t}</option>)}
          </select>
          <button type="submit" style={{ background: "#c9a84c", border: "none", color: "#0f0e0c", padding: "10px 24px", fontWeight: 600, borderRadius: "2px", cursor: "pointer", fontSize: "0.9rem" }}>
            Search
          </button>
        </form>
      </div>

      {/* Grid */}
      <div style={{ padding: "3rem 5%" }}>
        {loading ? (
          <div style={{ textAlign: "center", padding: "4rem", color: "#7a7568" }}>Loading properties...</div>
        ) : plots.length === 0 ? (
          <div style={{ textAlign: "center", padding: "4rem", color: "#7a7568" }}>
            <p style={{ fontSize: "3rem", marginBottom: "1rem" }}>🔍</p>
            <p>No plots found. Try adjusting your filters.</p>
          </div>
        ) : (
          <>
            <p style={{ color: "#7a7568", marginBottom: "1.5rem", fontSize: "0.9rem" }}>{plots.length} properties found</p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "1.5rem" }}>
              {plots.map(p => <PlotCard key={p._id} plot={p} />)}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
