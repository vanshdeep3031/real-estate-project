import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../utils/api";
import toast from "react-hot-toast";

const statusColors = {
  Available: { bg: "#e8f5ee", color: "#3d8c5a" },
  Sold: { bg: "#fdecea", color: "#c0392b" },
  Reserved: { bg: "#fef9e7", color: "#d4a017" },
};

export default function AdminPlots() {
  const [plots, setPlots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [deleting, setDeleting] = useState(null);

  const fetchPlots = () => {
    setLoading(true);
    const params = new URLSearchParams();
    if (search) params.set("search", search);
    if (statusFilter) params.set("status", statusFilter);
    api.get(`/plots?${params.toString()}`)
      .then(r => setPlots(r.data))
      .catch(() => toast.error("Failed to load plots"))
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetchPlots(); }, [statusFilter]);

  const handleDelete = async (id, title) => {
    if (!window.confirm(`Delete "${title}"? This cannot be undone.`)) return;
    setDeleting(id);
    try {
      await api.delete(`/plots/${id}`);
      toast.success("Plot deleted");
      setPlots(p => p.filter(x => x._id !== id));
    } catch {
      toast.error("Failed to delete plot");
    } finally {
      setDeleting(null);
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      await api.put(`/plots/${id}`, { status: newStatus });
      setPlots(prev => prev.map(p => p._id === id ? { ...p, status: newStatus } : p));
      toast.success(`Marked as ${newStatus}`);
    } catch {
      toast.error("Failed to update status");
    }
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem", flexWrap: "wrap", gap: "1rem" }}>
        <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "2.2rem" }}>Manage Plots</h1>
        <Link to="/admin/plots/new">
          <button style={{ background: "#c9a84c", border: "none", color: "#0f0e0c", padding: "12px 24px", fontWeight: 600, borderRadius: "2px", cursor: "pointer" }}>
            + Add New Plot
          </button>
        </Link>
      </div>

      {/* Filters */}
      <div style={{ background: "#fff", padding: "1rem 1.5rem", borderRadius: "4px", marginBottom: "1.5rem", display: "flex", gap: "1rem", flexWrap: "wrap", boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}>
        <input value={search} onChange={e => setSearch(e.target.value)}
          onKeyDown={e => e.key === "Enter" && fetchPlots()}
          placeholder="Search plots..." style={{ flex: "1 1 200px", padding: "9px 14px", border: "1px solid #ddd", borderRadius: "2px", fontSize: "0.9rem" }} />
        <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} style={{ padding: "9px 14px", border: "1px solid #ddd", borderRadius: "2px", fontSize: "0.9rem" }}>
          <option value="">All Status</option>
          {["Available", "Reserved", "Sold"].map(s => <option key={s}>{s}</option>)}
        </select>
        <button onClick={fetchPlots} style={{ background: "#c9a84c", border: "none", color: "#0f0e0c", padding: "9px 20px", borderRadius: "2px", cursor: "pointer", fontWeight: 600 }}>Search</button>
      </div>

      {/* Table */}
      <div style={{ background: "#fff", borderRadius: "4px", boxShadow: "0 2px 12px rgba(0,0,0,0.06)", overflow: "auto" }}>
        {loading ? (
          <div style={{ padding: "3rem", textAlign: "center", color: "#7a7568" }}>Loading...</div>
        ) : (
          <table style={{ width: "100%", borderCollapse: "collapse", minWidth: "700px" }}>
            <thead>
              <tr style={{ background: "#f5f0e8" }}>
                {["Image", "Title", "Location", "Price", "Size", "Status", "Actions"].map(h => (
                  <th key={h} style={{ padding: "0.9rem 1.2rem", textAlign: "left", fontSize: "0.75rem", color: "#7a7568", textTransform: "uppercase", letterSpacing: "0.06em", whiteSpace: "nowrap" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {plots.map((p, i) => {
                const sc = statusColors[p.status] || statusColors.Available;
                return (
                  <tr key={p._id} style={{ borderBottom: "1px solid #f5f0e8", background: i % 2 === 0 ? "#fff" : "#fdfcfa" }}>
                    <td style={{ padding: "0.8rem 1.2rem" }}>
                      {p.images?.[0]
                        ? <img src={p.images[0]} alt="" style={{ width: "50px", height: "38px", objectFit: "cover", borderRadius: "2px" }} />
                        : <div style={{ width: "50px", height: "38px", background: "#e8e4dc", borderRadius: "2px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.2rem" }}>🏞️</div>
                      }
                    </td>
                    <td style={{ padding: "0.8rem 1.2rem", fontWeight: 500, maxWidth: "160px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{p.title}</td>
                    <td style={{ padding: "0.8rem 1.2rem", color: "#7a7568", fontSize: "0.85rem" }}>{p.location}</td>
                    <td style={{ padding: "0.8rem 1.2rem", color: "#c9a84c", fontWeight: 600, whiteSpace: "nowrap" }}>₹{Number(p.price).toLocaleString("en-IN")}</td>
                    <td style={{ padding: "0.8rem 1.2rem", color: "#7a7568", fontSize: "0.85rem" }}>{p.size}</td>
                    <td style={{ padding: "0.8rem 1.2rem" }}>
                      <select value={p.status} onChange={e => handleStatusChange(p._id, e.target.value)}
                        style={{ background: sc.bg, color: sc.color, border: "none", borderRadius: "20px", padding: "4px 10px", fontSize: "0.78rem", fontWeight: 600, cursor: "pointer" }}>
                        {["Available", "Reserved", "Sold"].map(s => <option key={s}>{s}</option>)}
                      </select>
                    </td>
                    <td style={{ padding: "0.8rem 1.2rem" }}>
                      <div style={{ display: "flex", gap: "0.5rem" }}>
                        <Link to={`/plots/${p._id}`} target="_blank">
                          <button style={{ background: "#f5f0e8", border: "none", padding: "6px 10px", borderRadius: "2px", cursor: "pointer", fontSize: "0.8rem" }}>👁️</button>
                        </Link>
                        <Link to={`/admin/plots/edit/${p._id}`}>
                          <button style={{ background: "#e8f0fe", color: "#2980b9", border: "none", padding: "6px 12px", borderRadius: "2px", cursor: "pointer", fontSize: "0.8rem", fontWeight: 600 }}>Edit</button>
                        </Link>
                        <button onClick={() => handleDelete(p._id, p.title)} disabled={deleting === p._id}
                          style={{ background: "#fdecea", color: "#c0392b", border: "none", padding: "6px 12px", borderRadius: "2px", cursor: "pointer", fontSize: "0.8rem", fontWeight: 600 }}>
                          {deleting === p._id ? "..." : "Delete"}
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
              {plots.length === 0 && (
                <tr><td colSpan={7} style={{ padding: "3rem", textAlign: "center", color: "#7a7568" }}>
                  No plots found. <Link to="/admin/plots/new" style={{ color: "#c9a84c" }}>Add your first plot →</Link>
                </td></tr>
              )}
            </tbody>
          </table>
        )}
      </div>
      <p style={{ color: "#7a7568", fontSize: "0.82rem", marginTop: "0.8rem" }}>{plots.length} plot{plots.length !== 1 ? "s" : ""} total</p>
    </div>
  );
}
