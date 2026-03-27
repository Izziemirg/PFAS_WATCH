import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks = [
    { path: "/", label: "Home" },
    { path: "/explore", label: "Explore Data" },
    { path: "/about", label: "About" },
  ];

  return (
    <nav style={{
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      zIndex: 100,
      padding: "0 2rem",
      height: "60px",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      background: scrolled ? "rgba(2, 8, 16, 0.92)" : "transparent",
      backdropFilter: scrolled ? "blur(16px)" : "none",
      borderBottom: scrolled
        ? "1px solid rgba(0, 200, 220, 0.1)"
        : "1px solid transparent",
      transition: "all 0.3s ease",
    }}>
      {/* Logo */}
      <Link to="/" style={{
        display: "flex",
        alignItems: "center",
        gap: "10px",
        textDecoration: "none",
      }}>

        <div style={{
          width: "28px",
          height: "28px",
          borderRadius: "6px",
          background: "rgba(0, 200, 220, 0.08)",
          border: "1px solid rgba(0, 200, 220, 0.25)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 0 12px rgba(0,200,220,0.3)",
        }}>
          <svg width="18" height="18" viewBox="0 0 28 28" fill="none">
            <circle cx="14" cy="14" r="3" fill="var(--accent)" opacity="0.9"/>
            <circle cx="6" cy="8" r="2" fill="var(--accent)" opacity="0.6"/>
            <circle cx="22" cy="8" r="2" fill="var(--accent)" opacity="0.6"/>
            <circle cx="6" cy="20" r="2" fill="var(--accent)" opacity="0.6"/>
            <circle cx="22" cy="20" r="2" fill="var(--accent)" opacity="0.6"/>
            <line x1="14" y1="14" x2="6" y2="8" stroke="var(--accent)" strokeWidth="0.8" opacity="0.4"/>
            <line x1="14" y1="14" x2="22" y2="8" stroke="var(--accent)" strokeWidth="0.8" opacity="0.4"/>
            <line x1="14" y1="14" x2="6" y2="20" stroke="var(--accent)" strokeWidth="0.8" opacity="0.4"/>
            <line x1="14" y1="14" x2="22" y2="20" stroke="var(--accent)" strokeWidth="0.8" opacity="0.4"/>
          </svg>
        </div>
        
        <span style={{
          fontFamily: "var(--font-display)",
          fontSize: "16px",
          color: "var(--text-primary)",
        }}>
          PFAS Watch
        </span>
        <span style={{
          fontSize: "10px",
          color: "var(--accent)",
          background: "var(--accent-glow)",
          border: "1px solid rgba(0, 200, 220, 0.2)",
          padding: "2px 6px",
          borderRadius: "4px",
          letterSpacing: "0.08em",
          textTransform: "uppercase",
        }}>
          UCMR 5
        </span>
      </Link>

      {/* Nav links */}
      <div style={{ display: "flex", gap: "2rem", alignItems: "center" }}>
        {navLinks.map(({ path, label }) => {
          const active = location.pathname === path;
          return (
            <Link
              key={path}
              to={path}
              style={{
                color: active ? "var(--accent)" : "var(--text-secondary)",
                fontSize: "13px",
                fontWeight: active ? "600" : "400",
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                transition: "color 0.2s",
                textDecoration: "none",
                paddingBottom: "2px",
                borderBottom: active
                  ? "1px solid var(--accent)"
                  : "1px solid transparent",
              }}
            >
              {label}
            </Link>
          );
        })}

        {/* CTA button */}
        <Link
          to="/explore"
          style={{
            padding: "8px 18px",
            background: "var(--accent)",
            color: "#020810",
            borderRadius: "5px",
            fontSize: "12px",
            fontWeight: "700",
            letterSpacing: "0.06em",
            textTransform: "uppercase",
            textDecoration: "none",
            boxShadow: "0 0 14px rgba(0,200,220,0.3)",
            transition: "all 0.2s",
          }}
          onMouseEnter={e => {
            (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 0 22px rgba(0,200,220,0.5)";
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 0 14px rgba(0,200,220,0.3)";
          }}
        >
          Explore →
        </Link>
      </div>
    </nav>
  );
}