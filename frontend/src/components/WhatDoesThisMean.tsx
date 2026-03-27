import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const impacts = [
  {
    audience: "For Residents",
    color: "var(--risk-critical)",
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <path d="M14 4 L24 12 L24 24 L4 24 L4 12 Z" stroke="var(--risk-critical)" strokeWidth="1.2" fill="none" opacity="0.8"/>
        <rect x="11" y="17" width="6" height="7" rx="0.5" stroke="var(--risk-critical)" strokeWidth="1" fill="none" opacity="0.6"/>
        <path d="M14 4 L24 12" stroke="var(--risk-critical)" strokeWidth="1" opacity="0.4"/>
      </svg>
    ),
    points: [
      "Your tap water may contain PFAS above the new federal limit",
      "Water utilities have until 2029 to comply with these new standards, not today",
      "You can look up your specific water system in our explorer",
      "Filters certified for PFAS removal are available, check the EPA website for more information",
    ],
  },
  {
    audience: "For Communities",
    color: "var(--risk-elevated)",
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <circle cx="9" cy="11" r="3" stroke="var(--risk-elevated)" strokeWidth="1.2" fill="none" opacity="0.8"/>
        <circle cx="19" cy="11" r="3" stroke="var(--risk-elevated)" strokeWidth="1.2" fill="none" opacity="0.8"/>
        <circle cx="14" cy="8" r="3" stroke="var(--risk-elevated)" strokeWidth="1.2" fill="none" opacity="0.6"/>
        <path d="M3 24 C3 19 6 16 9 16 C11 16 13 17 14 18 C15 17 17 16 19 16 C22 16 25 19 25 24" stroke="var(--risk-elevated)" strokeWidth="1.2" fill="none" opacity="0.7"/>
      </svg>
    ),
    points: [
      "Systems serving larger urban populations show higher exceedance rates",
      "Rural and small systems often lack resources for expensive treatment upgrades",
      "Tribal water systems operate under direct federal jurisdiction, direct EPA oversite",
      "State water systems operate under the state government jurisdiction",
      "Environmental justice concerns are significant, PFAS exposure is not evenly distributed",
    ],
  },
  {
    audience: "For Policymakers",
    color: "var(--accent)",
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <rect x="4" y="16" width="4" height="8" rx="0.5" fill="var(--accent)" opacity="0.4"/>
        <rect x="10" y="12" width="4" height="12" rx="0.5" fill="var(--accent)" opacity="0.6"/>
        <rect x="16" y="8" width="4" height="16" rx="0.5" fill="var(--accent)" opacity="0.8"/>
        <rect x="22" y="5" width="4" height="19" rx="0.5" fill="var(--accent)" opacity="1"/>
        <line x1="3" y1="24" x2="27" y2="24" stroke="var(--accent)" strokeWidth="0.8" opacity="0.4"/>
      </svg>
    ),
    points: [
      "Over 1000+ systems are currently out of compliance with the 2024 MCL",
      "Compliance deadline is 2029, enforcement and funding timelines are essential",
      "The Bipartisan Infrastructure Law allocated $9B for water quality improvements",
      "UCMR 5 monitoring is still ongoing, the full picture is still emerging",
    ],
  },
];

export default function WhatDoesThisMean() {
  return (
    <section
      id="what-does-this-mean"
      style={{
        padding: "8rem 2rem",
        background: "transparent",
        position: "relative",
      }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          style={{ marginBottom: "4rem", maxWidth: "600px" }}
        >
          <div style={{
            fontSize: "11px",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "var(--accent)",
            marginBottom: "1rem",
            fontWeight: "600",
          }}>
            Implications
          </div>
          <h2 style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(2rem, 4vw, 3rem)",
            color: "var(--text-primary)",
            lineHeight: 1.1,
            marginBottom: "1rem",
          }}>
            What does this mean for me?
          </h2>
          <p style={{
            color: "var(--text-secondary)",
            fontSize: "16px",
            lineHeight: 1.8,
          }}>
            The 2024 MCL rule has different implications depending on who you are. But PFAS contamination effects us all.
            Here's what it means across three perspectives.
          </p>
        </motion.div>

        {/* Impact cards */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          gap: "1.5rem",
          marginBottom: "5rem",
        }}>
          {impacts.map((impact, i) => (
            <motion.div
              key={impact.audience}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              style={{
                background: "var(--bg-card)",
                border: "1px solid var(--border)",
                borderTop: `3px solid ${impact.color}`,
                borderRadius: "var(--radius-lg)",
                padding: "2rem",
              }}
            >
              <div style={{ fontSize: "28px", marginBottom: "1rem" }}>
                {impact.icon}
              </div>
              <h3 style={{
                fontFamily: "var(--font-display)",
                fontSize: "20px",
                color: impact.color,
                marginBottom: "1.5rem",
              }}>
                {impact.audience}
              </h3>
              <ul style={{
                listStyle: "none",
                display: "flex",
                flexDirection: "column",
                gap: "0.875rem",
              }}>
                {impact.points.map((point) => (
                  <li key={point} style={{
                    display: "flex",
                    gap: "0.75rem",
                    alignItems: "flex-start",
                    color: "var(--text-secondary)",
                    fontSize: "14px",
                    lineHeight: 1.6,
                  }}>
                    <span style={{
                      color: impact.color,
                      marginTop: "4px",
                      flexShrink: 0,
                      fontSize: "10px",
                    }}>
                      ◆
                    </span>
                    {point}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* CTA to explorer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          style={{
            textAlign: "center",
            padding: "4rem 2rem",
            background: "radial-gradient(ellipse at center, rgba(0,200,220,0.05) 0%, transparent 70%)",
            border: "1px solid rgba(0,200,220,0.1)",
            borderRadius: "var(--radius-lg)",
          }}
        >
          <h3 style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(1.5rem, 3vw, 2.5rem)",
            color: "var(--text-primary)",
            marginBottom: "1rem",
          }}>
            See if a water system near you is affected by {" "}
            <span style={{
              color: "var(--accent)",
              textShadow: "0 0 40px rgba(0,200,220,0.3)",
            }}>
              PFAS
            </span>
          </h3>

          <p style={{
            color: "var(--text-secondary)",
            fontSize: "16px",
            marginBottom: "2rem",
            maxWidth: "500px",
            margin: "0 auto 2rem",
            lineHeight: 1.7,
          }}>
            Search by zip code or explore the national map to find PFAS
            monitoring results for water systems near you.
          </p>
          <Link
            to="/explore"
            style={{
              display: "inline-block",
              padding: "16px 36px",
              background: "var(--accent)",
              color: "#020810",
              borderRadius: "6px",
              fontSize: "15px",
              fontWeight: "700",
              letterSpacing: "0.04em",
              textDecoration: "none",
              boxShadow: "0 0 30px rgba(0,200,220,0.3)",
              transition: "all 0.2s",
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 0 44px rgba(0,200,220,0.5)";
              (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(-2px)";
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 0 30px rgba(0,200,220,0.3)";
              (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(0)";
            }}
          >
            Explore the Data →
          </Link>
        </motion.div>
      </div>
    </section>
  );
}