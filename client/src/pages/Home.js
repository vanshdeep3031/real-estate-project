import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PlotCard from "../components/PlotCard";
import api from "../utils/api";

export default function Home() {
  const [featured, setFeatured] = useState([]);

  useEffect(() => {
    api.get("/plots?featured=true").then(r => setFeatured(r.data.slice(0, 3))).catch(() => {});
  }, []);

  return (
    <div>
      {/* Hero */}
      <section style={{
        minHeight: "100vh", background: "linear-gradient(135deg, #0f0e0c 0%, #1a1814 60%, #242118 100%)",
        display: "flex", alignItems: "center", justifyContent: "center", textAlign: "center",
        padding: "6rem 5% 4rem", position: "relative", overflow: "hidden",
      }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(circle at 30% 50%, rgba(201,168,76,0.06) 0%, transparent 60%)" }} />
        <div style={{ position: "relative", maxWidth: "800px" }}>
          <p style={{ color: "#c9a84c", letterSpacing: "0.3em", fontSize: "0.8rem", textTransform: "uppercase", marginBottom: "1.5rem" }}>Premium Real Estate · Kashipur, Uttarakhand</p>
          <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(3rem, 7vw, 5.5rem)", color: "#f5f0e8", fontWeight: 600, lineHeight: 1.1, marginBottom: "1.5rem" }}>
            Find Your Perfect<br /><span style={{ color: "#c9a84c" }}>Plot of Land</span>
          </h1>
          <p style={{ color: "rgba(245,240,232,0.65)", fontSize: "1.1rem", maxWidth: "520px", margin: "0 auto 2.5rem", lineHeight: 1.7 }}>
            Invest in the future. Discover premium residential, commercial, and agricultural plots with verified titles.
          </p>
          <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
            <Link to="/plots">
              <button style={{ background: "#c9a84c", border: "none", color: "#0f0e0c", padding: "14px 36px", fontSize: "0.9rem", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", borderRadius: "2px", cursor: "pointer" }}>
                View All Plots
              </button>
            </Link>
            <Link to="/contact">
              <button style={{ background: "transparent", border: "1px solid rgba(245,240,232,0.3)", color: "#f5f0e8", padding: "14px 36px", fontSize: "0.9rem", letterSpacing: "0.08em", textTransform: "uppercase", borderRadius: "2px", cursor: "pointer" }}>
                Contact Us
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section style={{ background: "#c9a84c", padding: "2.5rem 5%" }}>
        <div style={{ display: "flex", justifyContent: "center", gap: "4rem", flexWrap: "wrap" }}>
          {[["10+", "Years Experience"], ["200+", "Plots Sold"], ["500+", "Happy Clients"], ["100%", "Clear Titles"]].map(([n, l]) => (
            <div key={l} style={{ textAlign: "center" }}>
              <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "2.5rem", fontWeight: 700, color: "#0f0e0c" }}>{n}</p>
              <p style={{ fontSize: "0.8rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(15,14,12,0.7)" }}>{l}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Plots */}
      {featured.length > 0 && (
        <section style={{ padding: "5rem 5%" }}>
          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
            <p style={{ color: "#c9a84c", letterSpacing: "0.2em", fontSize: "0.8rem", textTransform: "uppercase", marginBottom: "0.8rem" }}>Handpicked for you</p>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "2.8rem" }}>Featured Properties</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "1.5rem" }}>
            {featured.map(p => <PlotCard key={p._id} plot={p} />)}
          </div>
          <div style={{ textAlign: "center", marginTop: "2.5rem" }}>
            <Link to="/plots">
              <button style={{ background: "transparent", border: "2px solid #c9a84c", color: "#c9a84c", padding: "12px 32px", fontSize: "0.85rem", letterSpacing: "0.1em", textTransform: "uppercase", borderRadius: "2px", cursor: "pointer" }}>
                See All Properties →
              </button>
            </Link>
          </div>
        </section>
      )}

      {/* Why Choose Us */}
      <section style={{ background: "#0f0e0c", padding: "5rem 5%", color: "#f5f0e8" }}>
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <p style={{ color: "#c9a84c", letterSpacing: "0.2em", fontSize: "0.8rem", textTransform: "uppercase", marginBottom: "0.8rem" }}>Why Us</p>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "2.8rem" }}>The Dhillon Difference</h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: "2rem" }}>
          {[
            ["🔒", "Clear Titles", "Every plot comes with verified, dispute-free legal documentation."],
            ["📍", "Prime Locations", "Strategically located plots in Kashipur with excellent connectivity."],
            ["💰", "Best Value", "Fair pricing with transparent dealing — no hidden charges."],
            ["🤝", "Trusted Since 2010", "Over a decade of trust and successful transactions."],
          ].map(([icon, title, desc]) => (
            <div key={title} style={{ padding: "2rem", border: "1px solid rgba(201,168,76,0.2)", borderRadius: "4px" }}>
              <div style={{ fontSize: "2rem", marginBottom: "1rem" }}>{icon}</div>
              <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.3rem", marginBottom: "0.5rem", color: "#c9a84c" }}>{title}</h3>
              <p style={{ opacity: 0.6, fontSize: "0.9rem", lineHeight: 1.6 }}>{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: "5rem 5%", textAlign: "center", background: "linear-gradient(135deg, #f5f0e8 0%, #ede7d9 100%)" }}>
        <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "2.5rem", marginBottom: "1rem" }}>Interested in a Plot?</h2>
        <p style={{ color: "#7a7568", marginBottom: "2rem" }}>Get in touch today. We respond within 24 hours.</p>
        <a href="https://wa.me/919012788331?text=Hi, I'm interested in a plot" target="_blank" rel="noreferrer">
          <button style={{ background: "#25D366", border: "none", color: "#fff", padding: "14px 36px", fontSize: "0.9rem", fontWeight: 600, borderRadius: "2px", cursor: "pointer", letterSpacing: "0.05em" }}>
            💬 Chat on WhatsApp
          </button>
        </a>
      </section>
    </div>
  );
}