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
    <div style={{ background: "#0f0e0c", overflowX: "hidden" }}>
      {/* Premium Hero Section */}
      <section style={{
        minHeight: "100vh",
        background: "radial-gradient(circle at 50% 50%, #1a1814 0%, #0f0e0c 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: "8rem 5% 6rem",
        position: "relative",
        overflow: "hidden",
      }}>
        {/* Animated Background Luxury Ambient Glows */}
        <div className="animate-glow-1" style={{
          position: "absolute",
          top: "10%",
          left: "20%",
          width: "400px",
          height: "400px",
          background: "radial-gradient(circle, rgba(201,168,76,0.08) 0%, transparent 70%)",
          borderRadius: "50%",
          filter: "blur(60px)",
          pointerEvents: "none",
        }} />
        <div className="animate-glow-2" style={{
          position: "absolute",
          bottom: "15%",
          right: "25%",
          width: "450px",
          height: "450px",
          background: "radial-gradient(circle, rgba(201,168,76,0.06) 0%, transparent 70%)",
          borderRadius: "50%",
          filter: "blur(80px)",
          pointerEvents: "none",
        }} />

        {/* Decorative Grid Lines to give a premium architectural feel */}
        <div style={{
          position: "absolute",
          inset: 0,
          backgroundImage: "linear-gradient(rgba(201,168,76,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(201,168,76,0.02) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
          backgroundPosition: "center center",
          pointerEvents: "none",
        }} />

        {/* Hero Content Container */}
        <div style={{ position: "relative", maxWidth: "900px", zIndex: 10 }}>
          {/* Subheading / Tagline */}
          <div className="reveal-1" style={{ marginBottom: "1.5rem" }}>
            <span style={{
              color: "#c9a84c",
              letterSpacing: "0.4em",
              fontSize: "0.85rem",
              fontWeight: 600,
              textTransform: "uppercase",
              background: "rgba(201,168,76,0.08)",
              padding: "8px 20px",
              borderRadius: "40px",
              border: "1px solid rgba(201,168,76,0.15)",
              display: "inline-block",
            }}>
              ESTABLISHED TRUST · KASHIPUR, UTTARAKHAND
            </span>
          </div>

          {/* Big Bold Signature Title Highlight */}
          <h1 className="reveal-2" style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(3.2rem, 8vw, 6.2rem)",
            color: "#f5f0e8",
            fontWeight: 700,
            lineHeight: 1.05,
            marginBottom: "2rem",
            letterSpacing: "-0.01em",
          }}>
            <span className="text-gold-gradient text-gold-highlight" style={{
              fontSize: "clamp(4.2rem, 11vw, 8.5rem)",
              fontFamily: "'Cormorant Garamond', serif",
              letterSpacing: "0.02em",
            }}>
              DHILLON
            </span>
            <br />
            <span style={{
              letterSpacing: "0.18em",
              fontSize: "clamp(1.8rem, 5vw, 3.5rem)",
              fontWeight: 300,
              color: "#ede7d9",
              opacity: 0.95,
              textTransform: "uppercase",
              display: "block",
              marginTop: "0.5rem"
            }}>
              Properties
            </span>
          </h1>

          {/* Luxury Description */}
          <p className="reveal-3" style={{
            color: "rgba(245,240,232,0.7)",
            fontSize: "clamp(1rem, 2vw, 1.25rem)",
            maxWidth: "600px",
            margin: "0 auto 3.5rem",
            lineHeight: 1.8,
            fontWeight: 300,
          }}>
            Where visionary land investments meet legal transparency. Explore premium residential, commercial, and agricultural properties tailored for legacy creation.
          </p>

          {/* Premium Call to Action Buttons */}
          <div className="reveal-3" style={{
            display: "flex",
            gap: "1.25rem",
            justifyContent: "center",
            flexWrap: "wrap",
            alignItems: "center"
          }}>
            <Link to="/plots">
              <button className="btn-premium-shine" style={{
                background: "linear-gradient(135deg, #e5c060 0%, #c9a84c 100%)",
                border: "none",
                color: "#0f0e0c",
                padding: "16px 40px",
                fontSize: "0.9rem",
                fontWeight: 700,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                borderRadius: "3px",
                cursor: "pointer",
                boxShadow: "0 4px 20px rgba(201, 168, 76, 0.3)",
                transition: "all 0.3s ease",
              }}
                onMouseEnter={e => e.currentTarget.style.transform = "scale(1.03)"}
                onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
              >
                Discover Plots
              </button>
            </Link>
            <Link to="/contact">
              <button style={{
                background: "rgba(245,240,232,0.03)",
                border: "1px solid rgba(245,240,232,0.2)",
                backdropFilter: "blur(5px)",
                color: "#f5f0e8",
                padding: "16px 40px",
                fontSize: "0.9rem",
                fontWeight: 600,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                borderRadius: "3px",
                cursor: "pointer",
                transition: "all 0.3s ease",
              }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = "rgba(245,240,232,0.07)";
                  e.currentTarget.style.borderColor = "#c9a84c";
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = "rgba(245,240,232,0.03)";
                  e.currentTarget.style.borderColor = "rgba(245,240,232,0.2)";
                }}
              >
                Private Consultation
              </button>
            </Link>
          </div>
        </div>

        {/* Decorative Floating Luxury Element */}
        <div className="animate-float" style={{
          position: "absolute",
          bottom: "10%",
          left: "5%",
          display: "flex",
          alignItems: "center",
          gap: "10px",
          color: "rgba(201,168,76,0.3)",
          fontSize: "0.8rem",
          letterSpacing: "0.15em",
          textTransform: "uppercase",
          pointerEvents: "none",
          transform: "rotate(-90deg)",
          transformOrigin: "left center",
        }}>
          <span style={{ width: "40px", height: "1px", background: "rgba(201,168,76,0.3)" }}></span>
          LEGACY PROPERTY GROUP
        </div>
      </section>

      {/* Floating Glassmorphic Stats Section */}
      <section style={{
        position: "relative",
        marginTop: "-4rem",
        zIndex: 20,
        padding: "0 5%",
        maxWidth: "1100px",
        margin: "-4rem auto 0",
      }}>
        <div style={{
          background: "rgba(26,24,20,0.75)",
          backdropFilter: "blur(20px)",
          border: "1px solid rgba(201,168,76,0.15)",
          boxShadow: "0 20px 50px rgba(0,0,0,0.5)",
          borderRadius: "8px",
          padding: "3rem 2rem",
        }}>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "2.5rem",
            justifyContent: "center",
          }}>
            {[
              ["10+", "Years of Excellence", "🏆"],
              ["200+", "Premium Plots Sold", "🏞️"],
              ["500+", "Happy Families", "🤝"],
              ["100%", "Dispute-Free Titles", "🔒"],
            ].map(([n, l, emoji]) => (
              <div key={l} style={{
                textAlign: "center",
                transition: "all 0.3s ease",
                padding: "1rem",
                borderRadius: "6px",
              }}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = "translateY(-5px)";
                  e.currentTarget.style.background = "rgba(201,168,76,0.04)";
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.background = "transparent";
                }}
              >
                <div style={{ fontSize: "1.8rem", marginBottom: "0.6rem" }}>{emoji}</div>
                <p style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "2.8rem",
                  fontWeight: 700,
                  color: "#c9a84c",
                  margin: 0,
                  lineHeight: 1,
                  textShadow: "0 0 10px rgba(201, 168, 76, 0.2)",
                }}>{n}</p>
                <p style={{
                  fontSize: "0.85rem",
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  color: "rgba(245,240,232,0.7)",
                  marginTop: "0.5rem",
                  marginBottom: 0,
                }}>{l}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Properties */}
      {featured.length > 0 && (
        <section style={{ padding: "8rem 5% 6rem", background: "#f5f0e8" }}>
          <div style={{ textAlign: "center", marginBottom: "4rem" }}>
            <p style={{
              color: "#c9a84c",
              letterSpacing: "0.25em",
              fontSize: "0.8rem",
              textTransform: "uppercase",
              fontWeight: 600,
              marginBottom: "0.8rem"
            }}>
              EXCLUSIVE OFFERINGS
            </p>
            <h2 style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(2.2rem, 5vw, 3.2rem)",
              color: "#0f0e0c",
              fontWeight: 600,
            }}>
              Featured Properties
            </h2>
            <div style={{
              width: "60px",
              height: "2px",
              background: "#c9a84c",
              margin: "1.5rem auto 0",
            }} />
          </div>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
            gap: "2rem",
            maxWidth: "1200px",
            margin: "0 auto",
          }}>
            {featured.map(p => <PlotCard key={p._id} plot={p} />)}
          </div>
          <div style={{ textAlign: "center", marginTop: "4rem" }}>
            <Link to="/plots">
              <button style={{
                background: "transparent",
                border: "2px solid #c9a84c",
                color: "#c9a84c",
                padding: "14px 36px",
                fontSize: "0.85rem",
                fontWeight: 700,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                borderRadius: "2px",
                cursor: "pointer",
                transition: "all 0.3s ease",
              }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = "#c9a84c";
                  e.currentTarget.style.color = "#0f0e0c";
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = "transparent";
                  e.currentTarget.style.color = "#c9a84c";
                }}
              >
                See All Properties →
              </button>
            </Link>
          </div>
        </section>
      )}

      {/* Why Choose Us */}
      <section style={{ background: "#0f0e0c", padding: "7rem 5%", color: "#f5f0e8" }}>
        <div style={{ textAlign: "center", marginBottom: "4.5rem" }}>
          <p style={{
            color: "#c9a84c",
            letterSpacing: "0.25em",
            fontSize: "0.8rem",
            textTransform: "uppercase",
            fontWeight: 600,
            marginBottom: "0.8rem"
          }}>
            STANDARDS OF TRUST
          </p>
          <h2 style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(2.2rem, 5vw, 3.2rem)",
            color: "#f5f0e8",
          }}>
            The Dhillon Difference
          </h2>
          <div style={{
            width: "60px",
            height: "2px",
            background: "#c9a84c",
            margin: "1.5rem auto 0",
          }} />
        </div>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
          gap: "2.5rem",
          maxWidth: "1200px",
          margin: "0 auto",
        }}>
          {[
            ["🔒", "Clear Legal Titles", "Every plot undergoes exhaustive due diligence, ensuring 100% dispute-free and fully registered legal documentation."],
            ["📍", "Strategic Locations", "Carefully handpicked real estate parcels in Kashipur with exceptional accessibility, growth potential, and modern amenities."],
            ["💰", "Transparent Value", "Honest deals, direct-to-owner transparency, and zero surprise costs. We prioritize your financial confidence."],
            ["🤝", "Decades of Legacy", "Over 10 years of market presence and hundreds of verified success transactions built entirely on customer referrals."],
          ].map(([icon, title, desc]) => (
            <div key={title} style={{
              padding: "2.5rem 2rem",
              background: "rgba(26,24,20,0.4)",
              border: "1px solid rgba(201,168,76,0.1)",
              borderRadius: "6px",
              transition: "all 0.3s ease",
            }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = "rgba(201,168,76,0.4)";
                e.currentTarget.style.transform = "translateY(-5px)";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = "rgba(201,168,76,0.1)";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              <div style={{ fontSize: "2.2rem", marginBottom: "1.2rem" }}>{icon}</div>
              <h3 style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "1.40rem",
                marginBottom: "0.8rem",
                color: "#c9a84c",
                fontWeight: 600,
              }}>{title}</h3>
              <p style={{
                color: "rgba(245,240,232,0.6)",
                fontSize: "0.92rem",
                lineHeight: 1.7,
                fontWeight: 300,
              }}>{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section style={{
        padding: "8rem 5%",
        textAlign: "center",
        background: "linear-gradient(135deg, #ede7d9 0%, #f5f0e8 100%)",
        position: "relative",
      }}>
        <div style={{ maxWidth: "600px", margin: "0 auto", position: "relative", zIndex: 5 }}>
          <h2 style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(2.2rem, 5vw, 3rem)",
            marginBottom: "1rem",
            color: "#0f0e0c"
          }}>
            Invest in Uttarakhand's Future
          </h2>
          <p style={{
            color: "#7a7568",
            fontSize: "1.1rem",
            marginBottom: "2.5rem",
            fontWeight: 300
          }}>
            Ready to secure a premium plot or need guidance? Get in touch with our team for professional assistance.
          </p>
          <a href="https://wa.me/919012788331?text=Hi, I'm interested in a plot with Dhillon Properties" target="_blank" rel="noreferrer">
            <button className="btn-premium-shine" style={{
              background: "#25D366",
              border: "none",
              color: "#fff",
              padding: "16px 44px",
              fontSize: "0.95rem",
              fontWeight: 700,
              borderRadius: "3px",
              cursor: "pointer",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              boxShadow: "0 6px 20px rgba(37, 211, 102, 0.25)",
              transition: "all 0.3s ease",
            }}
              onMouseEnter={e => e.currentTarget.style.transform = "scale(1.03)"}
              onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
            >
              💬 WhatsApp Consultation
            </button>
          </a>
        </div>
      </section>
    </div>
  );
}