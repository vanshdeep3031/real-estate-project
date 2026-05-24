import React, { useEffect, useState } from "react";
import api from "../../utils/api";
import toast from "react-hot-toast";

const inputStyle = { width: "100%", padding: "10px 12px", border: "1px solid #ddd", borderRadius: "2px", fontSize: "0.9rem", boxSizing: "border-box" };
const statusColors = {
  New: { bg: "#e8f0fe", color: "#2980b9" },
  Interested: { bg: "#e8f5ee", color: "#3d8c5a" },
  Negotiating: { bg: "#fef9e7", color: "#d4a017" },
  Closed: { bg: "#fdecea", color: "#c0392b" },
};

const emptyForm = { name: "", phone: "", email: "", interestedPlot: "", budget: "", notes: "", status: "New" };

export default function AdminCustomers() {
  const [customers, setCustomers] = useState([]);
  const [plots, setPlots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [editId, setEditId] = useState(null);
  const [saving, setSaving] = useState(false);

  const load = () => {
    setLoading(true);
    Promise.all([
      api.get("/customers"),
      api.get("/plots?status=Available"),
    ]).then(([cr, pr]) => {
      setCustomers(cr.data);
      setPlots(pr.data);
    }).catch(() => toast.error("Failed to load data"))
      .finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, []);

  const openAdd = () => { setForm(emptyForm); setEditId(null); setShowForm(true); };
  const openEdit = (c) => {
    setForm({ name: c.name, phone: c.phone, email: c.email || "", interestedPlot: c.interestedPlot?._id || "", budget: c.budget || "", notes: c.notes || "", status: c.status });
    setEditId(c._id);
    setShowForm(true);
  };

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const payload = { ...form };
      if (!payload.interestedPlot) delete payload.interestedPlot;
      if (editId) {
        await api.put(`/customers/${editId}`, payload);
        toast.success("Customer updated");
      } else {
        await api.post("/customers", payload);
        toast.success("Customer added");
      }
      setShowForm(false);
      load();
    } catch (err) {
      toast.error(err.response?.data?.message || "Save failed");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id, name) => {
    if (!window.confirm(`Remove "${name}" from customers?`)) return;
    try {
      await api.delete(`/customers/${id}`);
      toast.success("Customer removed");
      setCustomers(prev => prev.filter(c => c._id !== id));
    } catch {
      toast.error("Failed to delete");
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      await api.put(`/customers/${id}`, { status: newStatus });
      setCustomers(prev => prev.map(c => c._id === id ? { ...c, status: newStatus } : c));
    } catch {
      toast.error("Update failed");
    }
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
        <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "2.2rem" }}>Customers</h1>
        <button onClick={openAdd} style={{ background: "#c9a84c", border: "none", color: "#0f0e0c", padding: "12px 24px", fontWeight: 600, borderRadius: "2px", cursor: "pointer" }}>
          + Add Customer
        </button>
      </div>

      {/* Add/Edit Modal */}
      {showForm && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", zIndex: 200, display: "flex", alignItems: "center", justifyContent: "center", padding: "1rem" }}>
          <div style={{ background: "#fff", borderRadius: "4px", padding: "2rem", width: "100%", maxWidth: "520px", maxHeight: "90vh", overflowY: "auto" }}>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.6rem", marginBottom: "1.5rem" }}>{editId ? "Edit Customer" : "Add Customer"}</h2>
            <form onSubmit={handleSave}>
              <div style={{ display: "grid", gap: "1rem" }}>
                <div>
                  <label style={{ fontSize: "0.75rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em", color: "#7a7568", display: "block", marginBottom: "0.3rem" }}>Name *</label>
                  <input name="name" value={form.name} onChange={handleChange} required style={inputStyle} placeholder="Customer name" />
                </div>
                <div>
                  <label style={{ fontSize: "0.75rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em", color: "#7a7568", display: "block", marginBottom: "0.3rem" }}>Phone *</label>
                  <input name="phone" value={form.phone} onChange={handleChange} required style={inputStyle} placeholder="+91 98765 43210" />
                </div>
                <div>
                  <label style={{ fontSize: "0.75rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em", color: "#7a7568", display: "block", marginBottom: "0.3rem" }}>Email</label>
                  <input name="email" type="email" value={form.email} onChange={handleChange} style={inputStyle} placeholder="optional" />
                </div>
                <div>
                  <label style={{ fontSize: "0.75rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em", color: "#7a7568", display: "block", marginBottom: "0.3rem" }}>Interested Plot</label>
                  <select name="interestedPlot" value={form.interestedPlot} onChange={handleChange} style={inputStyle}>
                    <option value="">— Not specified —</option>
                    {plots.map(p => <option key={p._id} value={p._id}>{p.title} — {p.location}</option>)}
                  </select>
                </div>
                <div>
                  <label style={{ fontSize: "0.75rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em", color: "#7a7568", display: "block", marginBottom: "0.3rem" }}>Budget</label>
                  <input name="budget" value={form.budget} onChange={handleChange} style={inputStyle} placeholder="e.g. ₹20–30 Lakh" />
                </div>
                <div>
                  <label style={{ fontSize: "0.75rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em", color: "#7a7568", display: "block", marginBottom: "0.3rem" }}>Status</label>
                  <select name="status" value={form.status} onChange={handleChange} style={inputStyle}>
                    {["New", "Interested", "Negotiating", "Closed"].map(s => <option key={s}>{s}</option>)}
                  </select>
                </div>
                <div>
                  <label style={{ fontSize: "0.75rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em", color: "#7a7568", display: "block", marginBottom: "0.3rem" }}>Notes</label>
                  <textarea name="notes" value={form.notes} onChange={handleChange} rows={3} style={{ ...inputStyle, resize: "vertical" }} placeholder="Any notes about this customer..." />
                </div>
              </div>
              <div style={{ display: "flex", gap: "0.8rem", marginTop: "1.5rem" }}>
                <button type="submit" disabled={saving} style={{ background: "#c9a84c", border: "none", color: "#0f0e0c", padding: "12px 28px", fontWeight: 700, borderRadius: "2px", cursor: "pointer", flex: 1 }}>
                  {saving ? "Saving..." : editId ? "Update" : "Add Customer"}
                </button>
                <button type="button" onClick={() => setShowForm(false)} style={{ background: "#f5f0e8", border: "none", padding: "12px 24px", borderRadius: "2px", cursor: "pointer", color: "#7a7568" }}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Table */}
      <div style={{ background: "#fff", borderRadius: "4px", boxShadow: "0 2px 12px rgba(0,0,0,0.06)", overflow: "auto" }}>
        {loading ? (
          <div style={{ padding: "3rem", textAlign: "center", color: "#7a7568" }}>Loading...</div>
        ) : (
          <table style={{ width: "100%", borderCollapse: "collapse", minWidth: "700px" }}>
            <thead>
              <tr style={{ background: "#f5f0e8" }}>
                {["Name", "Phone", "Interested Plot", "Budget", "Status", "Actions"].map(h => (
                  <th key={h} style={{ padding: "0.9rem 1.2rem", textAlign: "left", fontSize: "0.75rem", color: "#7a7568", textTransform: "uppercase", letterSpacing: "0.06em" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {customers.map((c, i) => {
                const sc = statusColors[c.status] || statusColors.New;
                return (
                  <tr key={c._id} style={{ borderBottom: "1px solid #f5f0e8", background: i % 2 === 0 ? "#fff" : "#fdfcfa" }}>
                    <td style={{ padding: "0.9rem 1.2rem", fontWeight: 500 }}>
                      <div>{c.name}</div>
                      {c.email && <div style={{ fontSize: "0.78rem", color: "#7a7568" }}>{c.email}</div>}
                    </td>
                    <td style={{ padding: "0.9rem 1.2rem" }}>
                      <a href={`tel:${c.phone}`} style={{ color: "#2c2a24", textDecoration: "none" }}>{c.phone}</a>
                      <br />
                      <a href={`https://wa.me/${c.phone.replace(/\D/g, "")}`} target="_blank" rel="noreferrer" style={{ color: "#25D366", fontSize: "0.78rem" }}>WhatsApp</a>
                    </td>
                    <td style={{ padding: "0.9rem 1.2rem", color: "#7a7568", fontSize: "0.85rem" }}>
                      {c.interestedPlot ? `${c.interestedPlot.title}` : "—"}
                    </td>
                    <td style={{ padding: "0.9rem 1.2rem", color: "#7a7568" }}>{c.budget || "—"}</td>
                    <td style={{ padding: "0.9rem 1.2rem" }}>
                      <select value={c.status} onChange={e => handleStatusChange(c._id, e.target.value)}
                        style={{ background: sc.bg, color: sc.color, border: "none", borderRadius: "20px", padding: "4px 10px", fontSize: "0.78rem", fontWeight: 600, cursor: "pointer" }}>
                        {["New", "Interested", "Negotiating", "Closed"].map(s => <option key={s}>{s}</option>)}
                      </select>
                    </td>
                    <td style={{ padding: "0.9rem 1.2rem" }}>
                      <div style={{ display: "flex", gap: "0.5rem" }}>
                        <button onClick={() => openEdit(c)} style={{ background: "#e8f0fe", color: "#2980b9", border: "none", padding: "6px 12px", borderRadius: "2px", cursor: "pointer", fontSize: "0.8rem", fontWeight: 600 }}>Edit</button>
                        <button onClick={() => handleDelete(c._id, c.name)} style={{ background: "#fdecea", color: "#c0392b", border: "none", padding: "6px 12px", borderRadius: "2px", cursor: "pointer", fontSize: "0.8rem", fontWeight: 600 }}>Delete</button>
                      </div>
                    </td>
                  </tr>
                );
              })}
              {customers.length === 0 && (
                <tr><td colSpan={6} style={{ padding: "3rem", textAlign: "center", color: "#7a7568" }}>
                  No customers yet. Click "Add Customer" to add your first one.
                </td></tr>
              )}
            </tbody>
          </table>
        )}
      </div>
      <p style={{ color: "#7a7568", fontSize: "0.82rem", marginTop: "0.8rem" }}>{customers.length} customer{customers.length !== 1 ? "s" : ""} total</p>
    </div>
  );
}
