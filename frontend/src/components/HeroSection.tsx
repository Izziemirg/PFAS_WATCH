import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function HeroSection() {
  const navigate = useNavigate();

  return (
    <section style={{
      position: "relative",
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      overflow: "hidden",
      background: "transparent",
    }}>

      {/* Radial glow behind content */}
      <div style={{
        position: "absolute",
        top: "50%",
        left: "25%",
        transform: "translate(-50%, -50%)",
        width: "600px",
        height: "600px",
        background: "radial-gradient(circle, rgba(0,200,220,0.04) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />

      {/* Content */}
      <div style={{
        position: "relative",
        zIndex: 2,
        maxWidth: "1200px",
        margin: "0 auto",
        padding: "0 2rem",
        width: "100%",
      }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* Badge */}
          <div style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            fontSize: "11px",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "var(--accent)",
            background: "var(--accent-glow)",
            border: "1px solid rgba(0, 200, 220, 0.2)",
            padding: "5px 14px",
            borderRadius: "4px",
            marginBottom: "1.5rem",
            fontWeight: "600",
          }}>
            <span style={{
              width: "6px",
              height: "6px",
              borderRadius: "50%",
              background: "var(--accent)",
              boxShadow: "0 0 8px var(--accent)",
              animation: "pulse-dot 2s ease-in-out infinite",
            }} />
            Live · EPA UCMR 5
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(2.5rem, 6vw, 5rem)",
            lineHeight: 1.05,
            color: "var(--text-primary)",
            marginBottom: "1.5rem",
            maxWidth: "800px",
          }}
        >
          PFAS Contamination<br />
          in{" "}
          <span style={{
            color: "var(--accent)",
            textShadow: "0 0 40px rgba(0,200,220,0.3)",
          }}>
            America's
          </span>
          <br />
           <span style={{
            color: "var(--accent)",
            textShadow: "0 0 40px rgba(0,200,220,0.3)",
          }}>
            Drinking Water
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          style={{
            color: "var(--text-secondary)",
            fontSize: "18px",
            maxWidth: "540px",
            lineHeight: 1.8,
            marginBottom: "3rem",
          }}
        >
          Tracking compliance with EPA's first federal limits for PFAS —
          the "forever chemicals" found in{" "}
          <span style={{ color: "var(--text-primary)" }}>
            water systems serving millions of Americans.
          </span>
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}
        >
          <button
            onClick={() => navigate("/explore")}
            style={{
              padding: "14px 28px",
              background: "var(--accent)",
              color: "#020810",
              border: "none",
              borderRadius: "6px",
              fontSize: "14px",
              fontWeight: "600",
              letterSpacing: "0.04em",
              cursor: "pointer",
              transition: "all 0.2s",
              boxShadow: "0 0 20px rgba(0,200,220,0.3)",
            }}
            onMouseEnter={e => {
              (e.target as HTMLButtonElement).style.boxShadow = "0 0 30px rgba(0,200,220,0.5)";
              (e.target as HTMLButtonElement).style.transform = "translateY(-1px)";
            }}
            onMouseLeave={e => {
              (e.target as HTMLButtonElement).style.boxShadow = "0 0 20px rgba(0,200,220,0.3)";
              (e.target as HTMLButtonElement).style.transform = "translateY(0)";
            }}
          >
            Explore the Data →
          </button>

          <button
            onClick={() => document.getElementById("what-is-pfas")?.scrollIntoView({ behavior: "smooth" })}
            style={{
              padding: "14px 28px",
              background: "transparent",
              color: "var(--text-secondary)",
              border: "1px solid var(--border-light)",
              borderRadius: "6px",
              fontSize: "14px",
              fontWeight: "500",
              cursor: "pointer",
              transition: "all 0.2s",
            }}
            onMouseEnter={e => {
              (e.target as HTMLButtonElement).style.borderColor = "var(--accent)";
              (e.target as HTMLButtonElement).style.color = "var(--accent)";
            }}
            onMouseLeave={e => {
              (e.target as HTMLButtonElement).style.borderColor = "var(--border-light)";
              (e.target as HTMLButtonElement).style.color = "var(--text-secondary)";
            }}
          >
            What is <span style={{ color: "var(--accent)", textShadow: "0 0 12px rgba(0,200,220,0.6)" }}>PFAS</span>?
          </button>

        </motion.div>
        

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          style={{
            position: "absolute",
            bottom: "2rem",
            right: "3rem",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "8px",
            color: "var(--text-muted)",
            fontSize: "11px",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
          }}
        >
          <span>Scroll to explore</span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            style={{
              width: "1px",
              height: "30px",
              background: "linear-gradient(to bottom, var(--accent), transparent)",
            }}
          />
        </motion.div>
      </div>
    </section>
  );
}