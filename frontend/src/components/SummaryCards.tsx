import { useEffect, useState } from "react";
import { getNationalSummary } from "../api/client";
import type { NationalSummary } from "../types";
import { motion } from "framer-motion";

interface StatCard {
  label: string;
  value: number;
  sublabel: string;
  color: string;
  bgColor: string;
  delay: string;
}

function AnimatedNumber({ value }: { value: number }) {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 1200;
    const step = (timestamp: number) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.floor(eased * value));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [value]);

  return <>{display.toLocaleString()}</>;
}

export default function SummaryCards() {
  const [summary, setSummary] = useState<NationalSummary | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    getNationalSummary()
      .then(setSummary)
      .catch(() => setError(true));
  }, []);

  if (error) return (
    <div style={{ color: "var(--text-muted)", padding: "2rem", textAlign: "center" }}>
      Could not load summary data.
    </div>
  );

  if (!summary) return (
    <div style={{ display: "flex", gap: "1rem" }}>
      {[...Array(4)].map((_, i) => (
        <div key={i} style={{
          flex: 1,
          height: "140px",
          background: "var(--bg-card)",
          borderRadius: "var(--radius-lg)",
          border: "1px solid var(--border)",
          animation: "pulse 1.5s ease-in-out infinite",
        }} />
      ))}
    </div>
  );

  const cards: StatCard[] = [
    {
      label: "Critical Systems",
      value: summary.critical_systems,
      sublabel: "Exceeding PFOA/PFOS MCL",
      color: "var(--risk-critical)",
      bgColor: "var(--risk-critical-bg)",
      delay: "0ms",
    },
    {
      label: "Elevated Systems",
      value: summary.elevated_systems,
      sublabel: "Exceeding emerging compound MCL",
      color: "var(--risk-elevated)",
      bgColor: "var(--risk-elevated-bg)",
      delay: "100ms",
    },
    {
      label: "Detected Below MCL",
      value: summary.detected_systems,
      sublabel: "PFAS present, within limits",
      color: "var(--risk-detected)",
      bgColor: "var(--risk-detected-bg)",
      delay: "200ms",
    },
    {
      label: "No Detection",
      value: summary.no_detection_systems,
      sublabel: "No PFAS detected",
      color: "var(--risk-none)",
      bgColor: "var(--risk-none-bg)",
      delay: "300ms",
    },
  ];

return (
  <div>
    {/* Headline stat container */}
    <div style={{
      marginBottom: "2rem",
      padding: "1.5rem 2rem",
      background: "var(--risk-critical-bg)",
      border: "1px solid rgba(239, 68, 68, 0.2)",
      borderRadius: "var(--radius-lg)",
      display: "flex",
      alignItems: "center",
      gap: "1.5rem",
    }}>
      
      {/* 1. The Icon Circle */}
      <div style={{
        width: "48px",
        height: "48px",
        borderRadius: "50%",
        background: "var(--risk-critical-bg)",
        border: "2px solid var(--risk-critical)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
      }}>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          style={{ display: "flex", alignItems: "center", justifyContent: "center" }}
        >
          <svg 
            width="24" 
            height="24" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="var(--risk-critical)" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <motion.path 
              d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"
              animate={{ strokeOpacity: [1, 0.5, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
            <line x1="12" y1="9" x2="12" y2="13" />
            <line x1="12" y1="17" x2="12.01" y2="17" />
          </svg>
        </motion.div>
      </div>

      {/* 2. The Text Content (Now properly outside the circle) */}
      <div style={{ flex: 1 }}>
        <div style={{
          fontFamily: "var(--font-display)",
          fontSize: "28px",
          color: "var(--risk-critical)",
          lineHeight: 1.2,
          marginBottom: "4px",
          fontWeight: "600"
        }}>
          <AnimatedNumber value={summary.critical_systems + summary.elevated_systems} /> Public Works Water Systems
        </div>
        <div style={{ 
          color: "var(--text-secondary)", 
          fontSize: "14px", 
          maxWidth: "600px",
          lineHeight: 1.5 
        }}>
          are currently out of compliance with EPA's 2024 PFAS Maximum Contaminant Level rule,
          serving communities across {" "}
          <span style={{ color: "var(--text-primary)", fontWeight: "500" }}>all 50 states</span>.
        </div>
      </div>
    </div>

      {/* Stat cards */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        gap: "1rem",
      }}>
        {cards.map((card) => (
          <div
            key={card.label}
            style={{
              background: "var(--bg-card)",
              border: `1px solid var(--border)`,
              borderTop: `3px solid ${card.color}`,
              borderRadius: "var(--radius-lg)",
              padding: "1.5rem",
              position: "relative",
              overflow: "hidden",
              animationDelay: card.delay,
              transition: "transform 0.2s, border-color 0.2s",
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLDivElement).style.transform = "translateY(-2px)";
              (e.currentTarget as HTMLDivElement).style.borderColor = card.color;
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)";
              (e.currentTarget as HTMLDivElement).style.borderColor = "var(--border)";
            }}
          >
            {/* Background glow */}
            <div style={{
              position: "absolute",
              top: 0,
              right: 0,
              width: "80px",
              height: "80px",
              background: card.bgColor,
              borderRadius: "50%",
              filter: "blur(20px)",
              transform: "translate(20px, -20px)",
            }} />

            <div style={{
              fontSize: "11px",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "var(--text-muted)",
              marginBottom: "0.75rem",
              fontWeight: "600",
            }}>
              {card.label}
            </div>

            <div style={{
              fontFamily: "var(--font-display)",
              fontSize: "36px",
              color: card.color,
              lineHeight: 1,
              marginBottom: "0.5rem",
            }}>
              <AnimatedNumber value={card.value} />
            </div>

            <div style={{
              fontSize: "12px",
              color: "var(--text-secondary)",
              lineHeight: 1.4,
            }}>
              {card.sublabel}
            </div>

            {/* Percentage bar */}
            <div style={{
              marginTop: "1rem",
              height: "3px",
              background: "var(--border)",
              borderRadius: "2px",
              overflow: "hidden",
            }}>
              <div style={{
                height: "100%",
                width: `${(card.value / summary.total_systems) * 100}%`,
                background: card.color,
                borderRadius: "2px",
                transition: "width 1.2s cubic-bezier(0.4, 0, 0.2, 1)",
              }} />
            </div>
            <div style={{
              marginTop: "4px",
              fontSize: "11px",
              color: "var(--text-muted)",
              textAlign: "right",
            }}>
              {((card.value / summary.total_systems) * 100).toFixed(1)}% of systems
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}