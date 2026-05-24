import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import toast from "react-hot-toast";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(email, password);
      toast.success("Welcome back!");
      navigate("/admin");
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center",
      background: "linear-gradient(135deg, #0f0e0c 0%, #1a1814 100%)",
    }}>
      <div style={{ width: "100%", maxWidth: "400px", padding: "0 1.5rem" }}>
        <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
          <h1 style={{ fontFamily: "'Cormorant Garamond', serif", color: "#c9a84c", fontSize: "2.5rem", marginBottom: "0.5rem" }}>LandMark</h1>
          <p style={{ color: "rgba(245,240,232,0.5)", fontSize: "0.9rem" }}>Admin Dashboard</p>
        </div>
        <form onSubmit={handleSubmit} style={{ background: "#1a1814", borderRadius: "4px", padding: "2.5rem", border: "1px solid rgba(201,168,76,0.15)" }}>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", color: "#f5f0e8", fontSize: "1.8rem", marginBottom: "1.5rem" }}>Sign In</h2>
          <div style={{ marginBottom: "1.2rem" }}>
            <label style={{ display: "block", color: "rgba(245,240,232,0.6)", fontSize: "0.8rem", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "0.5rem" }}>Email</label>
            <input
              type="email" value={email} onChange={e => setEmail(e.target.value)} required
              style={{ width: "100%", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "2px", padding: "12px 14px", color: "#f5f0e8", fontSize: "0.95rem", outline: "none", boxSizing: "border-box" }}
              placeholder="admin@example.com"
            />
          </div>
          <div style={{ marginBottom: "2rem" }}>
            <label style={{ display: "block", color: "rgba(245,240,232,0.6)", fontSize: "0.8rem", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "0.5rem" }}>Password</label>
            <input
              type="password" value={password} onChange={e => setPassword(e.target.value)} required
              style={{ width: "100%", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "2px", padding: "12px 14px", color: "#f5f0e8", fontSize: "0.95rem", outline: "none", boxSizing: "border-box" }}
              placeholder="••••••••"
            />
          </div>
          <button type="submit" disabled={loading} style={{
            width: "100%", background: "#c9a84c", border: "none", color: "#0f0e0c",
            padding: "14px", fontWeight: 700, fontSize: "0.9rem", borderRadius: "2px",
            cursor: loading ? "not-allowed" : "pointer", opacity: loading ? 0.7 : 1,
            letterSpacing: "0.08em", textTransform: "uppercase",
          }}>
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}
