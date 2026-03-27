import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getSystemDetail } from "../api/client";
import type { PWSDetail, RiskTier } from "../types";
import { RISK_TIER_COLORS } from "../types";

const MCL_VALUES: Record<string, number> = {
  "PFOA": 0.004,
  "PFOS": 0.004,
  "PFNA": 0.010,
  "PFHxS": 0.010,
  "HFPO-DA": 0.010,
  "Hazard Index (HI)": 1.0,
};

const CONTAMINANT_CONTEXT: Record<string, string> = {
  "PFOA": "Linked to kidney and testicular cancer, thyroid disease, and immune suppression. One of the most studied PFAS compounds.",
  "PFOS": "Associated with liver damage, thyroid disruption, and developmental issues in children. Formerly used in Scotchgard and firefighting foam.",
  "PFNA": "Linked to thyroid hormone disruption and immune system effects. Found in food packaging and industrial processes.",
  "PFHxS": "Associated with thyroid disruption. Persistent in the environment and has been found in human blood worldwide.",
  "HFPO-DA": "Also known as GenX, developed as a PFOA replacement but raises similar health concerns. Center of major contamination cases.",
  "Hazard Index (HI)": "A combined measure of exposure to multiple PFAS compounds. A value above 1.0 indicates potential health risk from the mixture.",
};

interface Props {
  pwsid: string;
  onClose: () => void;
}

export default function SystemDetailPanel({ pwsid, onClose }: Props) {
  const [detail, setDetail] = useState<PWSDetail | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    setDetail(null);
    getSystemDetail(pwsid)
      .then(setDetail)
      .catch(() => setDetail(null))
      .finally(() => setLoading(false));
  }, [pwsid]);

  // Lock body scroll when modal is open
 useEffect(() => { 
    const originalStyle = window.getComputedStyle(document.body).overflow; 
    document.body.style.overflow = "hidden"; 
    
    return () => { 
      document.body.style.overflow = originalStyle; 
    }; 
  }, []);

  const systemRisk = (): RiskTier => {
    if (!detail) return "No Detection";
    if (detail.contaminant_results.some(r => r.exceeds_mcl && ["PFOA", "PFOS"].includes(r.contaminant)))
      return "Critical";
    if (detail.contaminant_results.some(r => r.exceeds_mcl))
      return "Elevated";
    if (detail.contaminant_results.some(r => r.average_result > 0))
      return "Detected";
    return "No Detection";
  };

  const risk = systemRisk();
  const riskColor = RISK_TIER_COLORS[risk];

  return (
    <AnimatePresence>
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        style={{
          position: "fixed",
          inset: 0,
          background: "rgba(2, 8, 16, 0.85)",
          backdropFilter: "blur(4px)",
          zIndex: 300,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "2rem",
        }}
      >
        {/* Modal — stop click propagation so clicking inside doesn't close */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          onClick={(e: React.MouseEvent) => e.stopPropagation()}
          style={{
            width: "100%",
            maxWidth: "560px",
            maxHeight: "85vh",
            overflowY: "auto",
            background: "var(--bg-card)",
            border: `1px solid ${riskColor}40`,
            borderTop: `3px solid ${riskColor}`,
            borderRadius: "var(--radius-lg)",
            boxShadow: `0 24px 80px rgba(0,0,0,0.7), 0 0 40px ${riskColor}12`,
            position: "relative",
          }}
        >
          {/* Header */}
          <div style={{
            padding: "1.5rem",
            borderBottom: "1px solid var(--border)",
            position: "sticky",
            top: 0,
            background: "var(--bg-card)",
            zIndex: 1,
          }}>
            <div style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
            }}>
              <div>
                <div style={{
                  fontSize: "10px",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: riskColor,
                  fontWeight: "700",
                  marginBottom: "6px",
                }}>
                  {loading ? "Loading..." : risk}
                  {detail?.is_tribal && " · Tribal System"}
                </div>
                <h3 style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "1.3rem",
                  color: "var(--text-primary)",
                  lineHeight: 1.2,
                  marginBottom: "4px",
                }}>
                  {loading ? "Loading..." : detail?.pws_name ?? "System Not Found"}
                </h3>
                {detail && (
                  <div style={{ fontSize: "12px", color: "var(--text-muted)" }}>
                    {detail.state} ·{" "}
                    {detail.pws_size === "L" ? "Large System" : "Small System"} ·{" "}
                    ID: {detail.pws_id}
                  </div>
                )}
              </div>
              <button
                onClick={onClose}
                style={{
                  background: "transparent",
                  border: "1px solid var(--border)",
                  borderRadius: "4px",
                  color: "var(--text-muted)",
                  padding: "6px 12px",
                  fontSize: "12px",
                  cursor: "pointer",
                  flexShrink: 0,
                  transition: "all 0.2s",
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = "var(--accent)";
                  e.currentTarget.style.color = "var(--accent)";
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = "var(--border)";
                  e.currentTarget.style.color = "var(--text-muted)";
                }}
              >
                ✕ Close
              </button>
            </div>
          </div>

          {/* Body */}
          {loading ? (
            <div style={{
              padding: "4rem",
              textAlign: "center",
              color: "var(--text-muted)",
              fontSize: "12px",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
            }}>
              Loading contaminant data...
            </div>
          ) : !detail ? (
            <div style={{
              padding: "4rem",
              textAlign: "center",
              color: "var(--text-muted)",
              fontSize: "13px",
            }}>
              <div style={{ fontSize: "24px", marginBottom: "1rem" }}>⚠</div>
              Could not load details for this system.
              <br />
              <span style={{ fontSize: "11px", marginTop: "8px", display: "block" }}>
                PWS ID: {pwsid}
              </span>
            </div>
          ) : (
            <div style={{ padding: "1.5rem" }}>

              {/* Monitoring status */}
              <div style={{
                padding: "0.75rem 1rem",
                background: detail.monitoring_complete
                  ? "rgba(0,214,143,0.06)"
                  : "rgba(107,114,128,0.06)",
                border: `1px solid ${detail.monitoring_complete
                  ? "rgba(0,214,143,0.2)"
                  : "rgba(107,114,128,0.2)"}`,
                borderRadius: "6px",
                marginBottom: "1.5rem",
                fontSize: "12px",
                color: detail.monitoring_complete
                  ? "var(--risk-none)"
                  : "var(--risk-incomplete)",
              }}>
                {detail.monitoring_complete
                  ? "✓ Full monitoring record: all required samples collected"
                  : "⚠ Incomplete monitoring record: not all samples collected"}
              </div>

              {/* Contaminant results */}
              <h4 style={{
                fontSize: "11px",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "var(--text-muted)",
                marginBottom: "1rem",
                fontWeight: "600",
              }}>
                Contaminant Results
              </h4>

              <div style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.875rem",
                marginBottom: "1.5rem",
              }}>
                {detail.contaminant_results.map((result) => {
                  const mcl = MCL_VALUES[result.contaminant];
                  const isHI = result.contaminant === "Hazard Index (HI)";
                  const displayResult = isHI ? result.average_result : result.average_result * 1000;
                  const displayMcl = mcl ? (isHI ? mcl : mcl * 1000) : null;
                  const pct = displayMcl
                    ? Math.min((displayResult / displayMcl) * 100, 100) 
                    : 0;
                  const overLimit = result.exceeds_mcl;
                  const barColor = overLimit
                    ? "var(--risk-critical)"
                    : result.average_result > 0
                    ? "var(--risk-detected)"
                    : "var(--risk-none)";

                  return (
                    <div
                      key={result.contaminant}
                      style={{
                        background: "rgba(0,0,0,0.2)",
                        border: `1px solid ${overLimit
                          ? "rgba(255,45,85,0.2)"
                          : "var(--border)"}`,
                        borderRadius: "8px",
                        padding: "1rem",
                      }}
                    >
                      <div style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "flex-start",
                        marginBottom: "8px",
                      }}>
                        <div>
                          <span style={{
                            fontSize: "13px",
                            fontWeight: "600",
                            color: "var(--text-primary)",
                          }}>
                            {result.contaminant}
                          </span>
                          {overLimit && (
                            <span style={{
                              marginLeft: "8px",
                              fontSize: "10px",
                              color: "var(--risk-critical)",
                              background: "rgba(255,45,85,0.1)",
                              border: "1px solid rgba(255,45,85,0.3)",
                              padding: "1px 6px",
                              borderRadius: "3px",
                              fontWeight: "700",
                              letterSpacing: "0.06em",
                            }}>
                              EXCEEDS MCL
                            </span>
                          )}
                        </div>
                        <div style={{ textAlign: "right" }}>
                          <span style={{
                            fontFamily: "monospace",
                            fontSize: "14px",
                            fontWeight: "700",
                            color: barColor,
                          }}>
                            {result.average_result === 0
                              ? "ND"
                              : `${(result.average_result * 1000).toFixed(3)} ppt`}
                          </span>
                          {mcl && (
                            <div style={{
                              fontSize: "10px",
                              color: "var(--text-muted)",
                            }}>
                              MCL:{" "}
                              {result.contaminant === "Hazard Index (HI)"
                                ? "1.0"
                                : `${displayMcl} ppt`}
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Bar */}
                      {mcl && result.average_result > 0 && (
                        <div style={{
                          height: "4px",
                          background: "var(--border)",
                          borderRadius: "2px",
                          overflow: "hidden",
                          marginBottom: "8px",
                        }}>
                          <div style={{
                            height: "100%",
                            width: `${pct}%`,
                            background: barColor,
                            borderRadius: "2px",
                          }} />
                        </div>
                      )}

                      {CONTAMINANT_CONTEXT[result.contaminant] && (
                        <p style={{
                          fontSize: "11px",
                          color: "var(--text-muted)",
                          lineHeight: 1.6,
                          margin: 0,
                        }}>
                          {CONTAMINANT_CONTEXT[result.contaminant]}
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Footer note */}
              <div style={{
                padding: "0.875rem 1rem",
                background: "rgba(0,200,220,0.04)",
                border: "1px solid rgba(0,200,220,0.1)",
                borderRadius: "6px",
                fontSize: "11px",
                color: "var(--text-muted)",
                lineHeight: 1.6,
              }}>
                ◆ Water systems have until{" "}
                <strong style={{ color: "var(--text-secondary)" }}>2029</strong>{" "}
                to comply with EPA's 2024 PFAS Maximum Contaminant Levels.
                Contact your water utility for more information.
              </div>
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}