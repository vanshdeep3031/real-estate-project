import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

const styles = {
  nav: {
    position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
    display: "flex", alignItems: "center", justifyContent: "space-between",
    padding: "0 5%", height: "70px",
    transition: "all 0.3s ease",
  },
  navScrolled: {
    background: "rgba(15,14,12,0.97)", backdropFilter: "blur(10px)",
    boxShadow: "0 2px 20px rgba(0,0,0,0.3)",
  },
  navTop: { background: "transparent" },
  logo: {
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: "1.6rem", fontWeight: 700,
    color: "#c9a84c", letterSpacing: "0.02em",
  },
  links: { display: "flex", gap: "2rem", alignItems: "center", listStyle: "none" },
  link: { color: "#f5f0e8", fontSize: "0.9rem", letterSpacing: "0.08em", textTransform: "uppercase", opacity: 0.85, transition: "opacity 0.2s" },
  adminBtn: {
    background: "transparent", border: "1px solid #c9a84c",
    color: "#c9a84c", padding: "8px 20px", fontSize: "0.78rem",
    letterSpacing: "0.1em", textTransform: "uppercase", borderRadius: "2px",
    transition: "all 0.2s",
  },
  hamburger: { display: "none", flexDirection: "column", gap: "5px", background: "none", border: "none", cursor: "pointer" },
  bar: { width: "24px", height: "2px", background: "#f5f0e8", display: "block" },
};

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [location]);

  return (
    <nav style={{ ...styles.nav, ...(scrolled ? styles.navScrolled : styles.navTop) }}>
      <Link to="/" style={styles.logo}>LandMark</Link>
      <ul style={styles.links}>
        {[["Home", "/"], ["Properties", "/plots"], ["Contact", "/contact"]].map(([label, path]) => (
          <li key={path}><Link to={path} style={styles.link}>{label}</Link></li>
        ))}
        <li>
          <Link to="/admin">
            <button style={styles.adminBtn}>Admin</button>
          </Link>
        </li>
      </ul>
    </nav>
  );
}
