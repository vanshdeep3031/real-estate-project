import React, { useState } from "react";
import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";

const navItems = [
  { label: "Dashboard", path: "/admin", icon: "📊" },
  { label: "Plots", path: "/admin/plots", icon: "🏞️" },
  { label: "Customers", path: "/admin/customers", icon: "👥" },
];

export default function AdminLayout() {
  const { admin, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);

  const handleLogout = () => {
    logout();
    toast.success("Logged out");
    navigate("/admin/login");
  };

  const sidebarW = collapsed ? "60px" : "220px";

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#f5f0e8" }}>
      {/* Sidebar */}
      <aside style={{
        width: sidebarW, minHeight: "100vh", background: "#0f0e0c",
        display: "flex", flexDirection: "column", transition: "width 0.3s", overflow: "hidden", flexShrink: 0,
      }}>
        <div style={{ padding: collapsed ? "1.5rem 0.8rem" : "1.5rem", borderBottom: "1px solid rgba(201,168,76,0.2)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          {!collapsed && <span style={{ fontFamily: "'Cormorant Garamond', serif", color: "#c9a84c", fontSize: "1.3rem", fontWeight: 700, whiteSpace: "nowrap" }}>LandMark</span>}
          <button onClick={() => setCollapsed(!collapsed)} style={{ background: "none", border: "none", color: "#c9a84c", fontSize: "1.2rem", cursor: "pointer", marginLeft: collapsed ? "auto" : 0 }}>
            {collapsed ? "→" : "←"}
          </button>
        </div>
        <nav style={{ flex: 1, padding: "1rem 0" }}>
          {navItems.map(({ label, path, icon }) => {
            const active = location.pathname === path || (path !== "/admin" && location.pathname.startsWith(path));
            return (
              <Link key={path} to={path} style={{
                display: "flex", alignItems: "center", gap: "0.8rem",
                padding: collapsed ? "0.85rem" : "0.85rem 1.5rem",
                color: active ? "#c9a84c" : "rgba(245,240,232,0.6)",
                background: active ? "rgba(201,168,76,0.1)" : "transparent",
                borderLeft: active ? "2px solid #c9a84c" : "2px solid transparent",
                fontSize: "0.9rem", transition: "all 0.2s", whiteSpace: "nowrap",
              }}>
                <span style={{ fontSize: "1.1rem", flexShrink: 0 }}>{icon}</span>
                {!collapsed && label}
              </Link>
            );
          })}
        </nav>
        <div style={{ padding: collapsed ? "1rem 0.5rem" : "1rem 1.5rem", borderTop: "1px solid rgba(255,255,255,0.08)" }}>
          {!collapsed && <p style={{ color: "rgba(245,240,232,0.5)", fontSize: "0.78rem", marginBottom: "0.5rem" }}>{admin?.name}</p>}
          <button onClick={handleLogout} style={{
            background: "none", border: "1px solid rgba(192,57,43,0.4)", color: "#e74c3c",
            padding: collapsed ? "8px" : "8px 16px", borderRadius: "2px", fontSize: "0.8rem",
            cursor: "pointer", width: "100%", whiteSpace: "nowrap",
          }}>
            {collapsed ? "↩" : "Logout"}
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main style={{ flex: 1, padding: "2rem", overflowX: "auto" }}>
        <Outlet />
      </main>
    </div>
  );
}
