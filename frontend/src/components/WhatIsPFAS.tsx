import { motion } from "framer-motion";

const facts = [
  {
    icon: (
      <svg width="36" height="36" viewBox="0 0 28 28" fill="none">
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
    ),
    title: "Per- and Polyfluoroalkyl Substances",
    body: "PFAS are a group of over 12,000 man-made chemicals that have been manufactured and used in industry and consumer products since the 1940s.",
  },
  {
    icon: (
      <svg width="36" height="36" viewBox="0 0 28 28" fill="none">
        <path d="M14 4 C14 4 22 10 22 17 C22 21.4 18.4 25 14 25 C9.6 25 6 21.4 6 17 C6 10 14 4 14 4Z" stroke="var(--accent)" strokeWidth="1.2" fill="none" opacity="0.8"/>
        <path d="M14 9 C14 9 19 13 19 17 C19 19.8 16.8 22 14 22 C11.2 22 9 19.8 9 17 C9 13 14 9 14 9Z" fill="var(--accent)" opacity="0.15"/>
        <line x1="14" y1="17" x2="14" y2="22" stroke="var(--accent)" strokeWidth="1" opacity="0.5"/>
        <line x1="11" y1="19" x2="17" y2="19" stroke="var(--accent)" strokeWidth="1" opacity="0.5"/>
      </svg>
    ),
    title: "\"Forever Chemicals\"",
    body: "PFAS does not naturally break down in the environment or the human body. They accumulate over time in soil, water, wildlife, and in us.",
  },
  {
    icon: (
      <svg width="36" height="36" viewBox="0 0 28 28" fill="none">
        <rect x="4" y="14" width="20" height="10" rx="1" stroke="var(--accent)" strokeWidth="1.2" fill="none" opacity="0.8"/>
        <rect x="8" y="10" width="5" height="4" rx="1" stroke="var(--accent)" strokeWidth="1" fill="none" opacity="0.6"/>
        <rect x="15" y="8" width="5" height="6" rx="1" stroke="var(--accent)" strokeWidth="1" fill="none" opacity="0.6"/>
        <line x1="4" y1="14" x2="24" y2="14" stroke="var(--accent)" strokeWidth="0.8" opacity="0.3"/>
        <circle cx="10" cy="22" r="1.5" fill="var(--accent)" opacity="0.5"/>
        <circle cx="18" cy="22" r="1.5" fill="var(--accent)" opacity="0.5"/>
      </svg>
    ),
    title: "Where They Come From",
    body: "Industrial discharge, military bases using firefighting foam (AFFF), non-stick cookware, food packaging, stain-resistant fabrics, etc.",
  },
  {
    icon: (
      <svg width="36" height="36" viewBox="0 0 28 28" fill="none">
        <path d="M14 4 L14 16" stroke="var(--accent)" strokeWidth="1.5" strokeLinecap="round" opacity="0.9"/>
        <circle cx="14" cy="20" r="2" fill="var(--accent)" opacity="0.9"/>
        <circle cx="14" cy="14" r="10" stroke="var(--accent)" strokeWidth="1" fill="none" opacity="0.2"/>
        <circle cx="14" cy="14" r="7" stroke="var(--accent)" strokeWidth="0.8" fill="none" opacity="0.15"/>
      </svg>
    ),
    title: "Health Impacts",
    body: "Linked to cancer, thyroid disruption, immune suppression, reproductive issues, and developmental problems in children at very low concentrations.",
  },
];

export default function WhatIsPFAS() {
  return (
    <section
      id="what-is-pfas"
      style={{
        padding: "8rem 2rem",
        background: "transparent",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Subtle background glow */}
      <div style={{
        position: "absolute",
        top: "50%",
        right: "-10%",
        transform: "translateY(-50%)",
        width: "500px",
        height: "500px",
        background: "transparent",
        pointerEvents: "none",
      }} />

      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        {/* Section header */}
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
            Background
          </div>
          <h2 style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(2rem, 4vw, 3rem)",
            color: "var(--text-primary)",
            lineHeight: 1.1,
            marginBottom: "1rem",
          }}>
            What is <span style={{ color: "var(--accent)", textShadow: "0 0 40px rgba(0,200,220,0.3)" }}>PFAS</span>?
          </h2>

          <p style={{
            color: "var(--text-secondary)",
            fontSize: "16px",
            lineHeight: 1.8,
          }}>
            Understanding the chemicals at the center of one of the most significant
            environmental health crises in American history.
          </p>
          <p style={{ marginTop: "0.75rem", fontSize: "14px" }}>
           <a
             href="https://www.epa.gov/pfas"
             target="_blank"
             rel="noopener noreferrer"
             style={{
             color: "var(--accent)",
             textDecoration: "none",
             borderBottom: "1px solid rgba(0, 200, 220, 0.3)",
             paddingBottom: "1px",
             transition: "border-color 0.2s",
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = "var(--accent)";
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = "rgba(0, 200, 220, 0.3)";
            }}
          >
            Read more about PFAS on the EPA's website
         </a>
       </p>
        </motion.div>

        {/* Fact cards */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
          gap: "1.5rem",
          marginBottom: "4rem",
        }}>
          {facts.map((fact, i) => (
            <motion.div
              key={fact.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              style={{
                background: "transparent",
                border: "1px solid var(--border)",
                borderRadius: "var(--radius-lg)",
                padding: "2rem",
                transition: "border-color 0.3s, transform 0.3s",
                cursor: "default",
              }}
              whileHover={{
                borderColor: "rgba(0,200,220,0.3)",
                y: -4,
              }}
            >
              <div style={{
                width: "56px",
                height: "56px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "rgba(0, 200, 220, 0.06)",
                border: "1px solid rgba(0, 200, 220, 0.15)",
                borderRadius: "12px",
                margin: "0 auto 1.5rem",
              }}>
                {fact.icon}
              </div>
              <h3 style={{
                fontFamily: "var(--font-display)",
                fontSize: "18px",
                color: "var(--text-primary)",
                marginBottom: "0.75rem",
                lineHeight: 1.3,
              }}>
                {fact.title}
              </h3>
              <p style={{
                color: "var(--text-secondary)",
                fontSize: "14px",
                lineHeight: 1.7,
              }}>
                {fact.body}
              </p>
            </motion.div>
          ))}
        </div>

        {/* 2024 Rule callout */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          style={{
            background: "linear-gradient(135deg, rgba(0,200,220,0.05), rgba(0,200,220,0.02))",
            border: "1px solid rgba(0,200,220,0.15)",
            borderRadius: "var(--radius-lg)",
            padding: "2.5rem 3rem",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "3rem",
            alignItems: "center",
          }}
        >
          <div>
            <div style={{
              fontSize: "11px",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "var(--accent)",
              marginBottom: "0.75rem",
              fontWeight: "600",
            }}>
              The 2024 EPA Rule
            </div>
            <h3 style={{
              fontFamily: "var(--font-display)",
              fontSize: "1.6rem",
              color: "var(--text-primary)",
              marginBottom: "1rem",
              lineHeight: 1.2,
            }}>
              America's First Federal Limits on PFAS in Drinking Water
            </h3>
            <p style={{
              color: "var(--text-secondary)",
              fontSize: "14px",
              lineHeight: 1.8,
            }}>
              In April 2024, the EPA finalized the first-ever National Primary
              Drinking Water Regulations for PFAS. Water systems have until
              2029 to comply, meaning millions of Americans are currently
              drinking water that will soon be illegal to serve.
            </p>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {[
              { compound: "PFOA", limit: "4 ppt", note: "Individual MCL" },
              { compound: "PFOS", limit: "4 ppt", note: "Individual MCL" },
              { compound: "PFNA / PFHxS / HFPO-DA", limit: "10 ppt", note: "Individual MCL" },
              { compound: "Hazard Index", limit: "1.0", note: "Mixture rule" },
            ].map((row) => (
              <div key={row.compound} style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "0.75rem 1rem",
                background: "transparent",
                borderRadius: "6px",
                border: "1px solid var(--border)",
              }}>
                <div>
                  <div style={{
                    fontSize: "13px",
                    color: "var(--text-primary)",
                    fontWeight: "500",
                  }}>
                    {row.compound}
                  </div>
                  <div style={{
                    fontSize: "11px",
                    color: "var(--text-muted)",
                    letterSpacing: "0.05em",
                  }}>
                    {row.note}
                  </div>
                </div>
                <div style={{
                  fontSize: "16px",
                  color: "var(--accent)",
                  fontFamily: "monospace",
                  fontWeight: "600",
                }}>
                  {row.limit}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}