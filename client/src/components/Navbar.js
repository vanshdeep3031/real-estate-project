import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Auto-close mobile drawer when location/url path changes
  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      display: "flex", alignItems: "center", justifyContent: "space-between",
      padding: "0 5%", height: "70px", transition: "all 0.3s ease",
      background: scrolled || mobileOpen ? "rgba(15,14,12,0.97)" : "transparent",
      backdropFilter: scrolled || mobileOpen ? "blur(10px)" : "none",
      boxShadow: scrolled || mobileOpen ? "0 2px 20px rgba(0,0,0,0.3)" : "none",
    }}>
      <Link to="/" style={{
        fontFamily: "'Cormorant Garamond', serif",
        fontSize: "1.6rem", fontWeight: 700, color: "#c9a84c", letterSpacing: "0.02em",
      }}>
        Dhillon Properties
      </Link>

      {/* Desktop navigation menu */}
      <ul className="nav-menu-desktop" style={{
        display: "flex", gap: "2rem", alignItems: "center", listStyle: "none", margin: 0, padding: 0
      }}>
        {[["Home", "/"], ["Properties", "/plots"], ["Contact", "/contact"]].map(([label, path]) => (
          <li key={path}>
            <Link to={path} style={{
              color: "#f5f0e8", fontSize: "0.9rem", letterSpacing: "0.08em",
              textTransform: "uppercase", opacity: 0.85, transition: "color 0.25s"
            }}
              onMouseEnter={e => e.target.style.color = "#c9a84c"}
              onMouseLeave={e => e.target.style.color = "#f5f0e8"}
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>

      {/* Hamburger icon button (Mobile only) */}
      <button onClick={() => setMobileOpen(!mobileOpen)} className="nav-toggle-mobile" style={{
        background: "none", border: "none", color: "#f5f0e8", fontSize: "1.8rem", cursor: "pointer", padding: "8px"
      }}>
        {mobileOpen ? "✕" : "☰"}
      </button>

      {/* Mobile Drawer Menu Overlay */}
      {mobileOpen && (
        <div style={{
          position: "fixed", top: "70px", left: 0, right: 0,
          background: "#0f0e0c", display: "flex", flexDirection: "column",
          padding: "2rem 8%", gap: "1.5rem", borderTop: "1px solid rgba(255,255,255,0.06)",
          boxShadow: "0 10px 25px rgba(0,0,0,0.5)", zIndex: 99,
          animation: "fadeIn 0.2s ease-out"
        }}>
          {[["Home", "/"], ["Properties", "/plots"], ["Contact", "/contact"]].map(([label, path]) => (
            <Link key={path} to={path} style={{
              color: "#f5f0e8", fontSize: "1.1rem", letterSpacing: "0.08em",
              textTransform: "uppercase", padding: "0.5rem 0", borderBottom: "1px solid rgba(255,255,255,0.03)"
            }}>
              {label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}