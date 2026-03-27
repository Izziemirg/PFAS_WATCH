import { useState } from "react";
import { getNearestSystems } from "../api/client";
import type { NearestPWSResult, RiskTier } from "../types";
import { RISK_TIER_COLORS } from "../types";

interface ZipSearchProps {
  onViewDetails: (pwsid: string) => void;
  onSearch: (zip: string) => void;
}

export default function ZipSearch({ onViewDetails, onSearch }: ZipSearchProps) {
  const [zip, setZip] = useState("");
  const [results, setResults] = useState<NearestPWSResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searched, setSearched] = useState(false);

  const handleSearch = async () => {
    if (!zip || zip.length !== 5) {
      setError("Please enter a valid 5-digit ZIP code.");
      return;
    }
    setLoading(true);
    setError(null);
    setSearched(true);
    try {
      const data = await getNearestSystems(zip, 8);
      setResults(data);
      onSearch(zip);
    } catch (e: any) {
      setError(e?.response?.data?.detail || "ZIP code not found.");
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  const tierBadge = (tier: RiskTier) => (
    <span style={{
      fontSize: "10px",
      fontWeight: "700",
      letterSpacing: "0.08em",
      textTransform: "uppercase",
      color: RISK_TIER_COLORS[tier],
      background: `${RISK_TIER_COLORS[tier]}18`,
      border: `1px solid ${RISK_TIER_COLORS[tier]}40`,
      padding: "2px 8px",
      borderRadius: "4px",
    }}>
      {tier}
    </span>
  );

  return (
    <div style={{ marginTop: "3rem" }}>
      {/* Header */}
      <div style={{ marginBottom: "1.5rem" }}>
        <h2 style={{
          fontFamily: "var(--font-display)",
          fontSize: "2rem",
          color: "var(--text-primary)",
          marginBottom: "4px",
        }}>
          Find Systems Near You
        </h2>
        <p style={{ color: "var(--text-muted)", fontSize: "13px" }}>
          Enter your ZIP code to find the nearest monitored public water systems.
        </p>
      </div>

      {/* Search input */}
      <div style={{
        display: "flex",
        gap: "0.75rem",
        marginBottom: "1.5rem",
        maxWidth: "480px",
      }}>
        <input
          type="text"
          value={zip}
          onChange={e => {
            setZip(e.target.value.replace(/\D/g, "").slice(0, 5));
            setError(null);
          }}
          onKeyDown={e => e.key === "Enter" && handleSearch()}
          placeholder="Enter ZIP code (e.g. 22201)"
          maxLength={5}
          style={{
            flex: 1,
            padding: "12px 16px",
            background: "var(--bg-card)",
            border: `1px solid ${error ? "var(--risk-critical)" : "var(--border-light)"}`,
            borderRadius: "6px",
            color: "var(--text-primary)",
            fontSize: "15px",
            fontFamily: "var(--font-body)",
            outline: "none",
            transition: "border-color 0.2s",
            letterSpacing: "0.08em",
          }}
          onFocus={e => {
            e.target.style.borderColor = "var(--accent)";
          }}
          onBlur={e => {
            e.target.style.borderColor = error
              ? "var(--risk-critical)"
              : "var(--border-light)";
          }}
        />
        <button
          onClick={handleSearch}
          disabled={loading}
          style={{
            padding: "12px 24px",
            background: loading ? "var(--accent-dim)" : "var(--accent)",
            color: "#020810",
            border: "none",
            borderRadius: "6px",
            fontSize: "14px",
            fontWeight: "700",
            cursor: loading ? "not-allowed" : "pointer",
            letterSpacing: "0.04em",
            boxShadow: loading ? "none" : "0 0 16px rgba(0,200,220,0.3)",
            transition: "all 0.2s",
            whiteSpace: "nowrap",
          }}
        >
          {loading ? "Searching..." : "Search →"}
        </button>
      </div>

      {/* Error */}
      {error && (
        <p style={{
          color: "var(--risk-critical)",
          fontSize: "13px",
          marginBottom: "1rem",
        }}>
          {error}
        </p>
      )}

      {/* Results */}
      {searched && !loading && results.length === 0 && !error && (
        <p style={{ color: "var(--text-muted)", fontSize: "13px" }}>
          No systems found for this ZIP code.
        </p>
      )}

      {results.length > 0 && (
        <div style={{
          background: "var(--bg-card)",
          border: "1px solid var(--border)",
          borderRadius: "var(--radius-lg)",
          overflow: "hidden",
        }}>
          {/* Results header */}
          <div style={{
            padding: "1rem 1.5rem",
            borderBottom: "1px solid var(--border)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}>
            <span style={{
              fontSize: "12px",
              color: "var(--text-muted)",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
            }}>
              {results.length} nearest systems to ZIP {zip}
            </span>
            <button
              onClick={() => { setResults([]); setZip(""); setSearched(false); }}
              style={{
                background: "transparent",
                border: "none",
                color: "var(--text-muted)",
                fontSize: "12px",
                cursor: "pointer",
              }}
            >
              Clear ✕
            </button>
          </div>

          {/* Result rows */}
          {results.map((system, i) => (
            <div
              key={system.pws_id}
              style={{
                padding: "1rem 1.5rem",
                borderBottom: i < results.length - 1
                  ? "1px solid var(--border)"
                  : "none",
                display: "grid",
                gridTemplateColumns: "2rem 1fr auto",
                gap: "1rem",
                alignItems: "center",
                transition: "background 0.15s",
                cursor: "pointer",
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLDivElement).style.background = "var(--bg-card-hover)";
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLDivElement).style.background = "transparent";
              }}
            >
              {/* Rank */}
              <div style={{
                fontSize: "13px",
                color: "var(--text-muted)",
                fontWeight: "600",
                textAlign: "center",
              }}>
                {i + 1}
              </div>

              {/* System info */}
              <div>
                <div style={{
                  fontSize: "14px",
                  color: "var(--text-primary)",
                  fontWeight: "500",
                  marginBottom: "3px",
                }}>
                  {system.pws_name}
                  {system.is_tribal && (
                    <span style={{
                      marginLeft: "8px",
                      fontSize: "10px",
                      color: "var(--text-muted)",
                      background: "var(--bg-card-hover)",
                      border: "1px solid var(--border)",
                      padding: "1px 6px",
                      borderRadius: "3px",
                    }}>
                      TRIBAL
                    </span>
                  )}
                </div>
                <div style={{
                  fontSize: "12px",
                  color: "var(--text-muted)",
                }}>
                  {system.state} · {system.distance_mi.toFixed(1)} mi away
                </div>
              </div>

            {/* Actions & Badge */}
            <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                {tierBadge(system.risk_tier as RiskTier)}
  
                <button
                    onClick={(e) => {
                        e.stopPropagation(); // Prevents triggering any row click events
                        onViewDetails(system.pws_id);
                }}
                style={{
                    padding: "6px 12px",
                    background: "transparent",
                    border: "1px solid var(--accent)",
                    borderRadius: "4px",
                    color: "var(--accent)",
                    fontSize: "11px",
                    fontWeight: "600",
                    cursor: "pointer",
                    whiteSpace: "nowrap",
                    transition: "all 0.2s",
                }}
                onMouseEnter={e => {
                    e.currentTarget.style.background = "var(--accent-glow)";
                }}
                onMouseLeave={e => {
                    e.currentTarget.style.background = "transparent";
                }}
            >
            Details →
        </button>
    </div>
            </div>
          ))}

          {/* Disclaimer */}
          <div style={{
            padding: "0.75rem 1.5rem",
            background: "rgba(0,0,0,0.2)",
            borderTop: "1px solid var(--border)",
            fontSize: "11px",
            color: "var(--text-muted)",
            lineHeight: 1.5,
          }}>
            ◆ Distance based on ZIP code centroid. Your actual water system may differ —
            confirm with your local utility.
          </div>
        </div>
      )}
    </div>
  );
}