import { useEffect, useState, useRef } from "react";
// @ts-ignore
import Plotly from 'plotly.js-dist-min';
import createPlotlyComponent from 'react-plotly.js/factory';
import { getMapSystems } from "../api/client";
import type { PWSummary, RiskTier } from "../types";
import { RISK_TIER_COLORS } from "../types";

const Plot = createPlotlyComponent(Plotly);

const RISK_TIER_LABELS: Record<RiskTier, string> = {
  "Critical": "Critical — Exceeds PFOA/PFOS MCL",
  "Elevated": "Elevated — Exceeds Emerging Compound MCL",
  "Detected": "Detected — Below MCL",
  "Monitoring Incomplete": "Monitoring Incomplete",
  "No Detection": "No Detection",
};

interface PFASMapProps {
  zoomToZip?: { lat: number; lng: number } | null;
  onViewDetails: (pwsid: string) => void;
}

export default function PFASMap({ zoomToZip, onViewDetails }: PFASMapProps) {
  const [systems, setSystems] = useState<PWSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [includeAll, setIncludeAll] = useState(false);
  const [selected, setSelected] = useState<PWSummary | null>(null);
  const geoLayoutRef = useRef<any>({});
  const [revision, setRevision] = useState(0);

  useEffect(() => {
    if (!zoomToZip) return;
    geoLayoutRef.current = {
      ...geoLayoutRef.current,
      center: { lat: zoomToZip.lat, lon: zoomToZip.lng },
      projection: { type: "albers usa", scale: 6 },
    };
    setRevision(r => r + 1);
  }, [zoomToZip]);

  useEffect(() => {
    setLoading(true);
    getMapSystems({ include_all: includeAll })
      .then((data: any) => { // Added :any to satisfy compiler
        setSystems(data);
        setRevision(prev => prev + 1); 
      })
      .finally(() => setLoading(false));
  }, [includeAll]);

  const tiers: RiskTier[] = ["Critical", "Elevated", "Detected", "Monitoring Incomplete"];
  if (includeAll) tiers.push("No Detection");

  const traces = tiers.map((tier) => {
    const group = systems.filter((s) => s.risk_tier === tier && s.latitude && s.longitude);
    return {
      type: "scattergeo" as const,
      name: RISK_TIER_LABELS[tier],
      lat: group.map((s) => s.latitude as number),
      lon: group.map((s) => s.longitude as number),
      text: group.map((s) => 
        `<b>${s.pws_name}</b><br>` +
        `${s.state} · ${s.pws_size === "L" ? "Large" : "Small"} System<br>` +
        `Risk: ${s.risk_tier}<br>` +
        `${s.is_tribal ? "⬡ Tribal System" : ""}` +
        `<br><i>Click for details</i>`
      ),
      hovertemplate: "%{text}<extra></extra>",
      marker: {
        color: RISK_TIER_COLORS[tier],
        size: tier === "Critical" ? 10 : tier === "Elevated" ? 7 : 5,
        opacity: tier === "Critical" ? 0.95 : 0.75,
        line: {
          color: tier === "Critical" ? "rgba(255,45,85,0.5)" : "rgba(0,0,0,0.3)",
          width: tier === "Critical" ? 1.5 : 0.5,
        },
      },
      customdata: group.map((s) => s.pws_id),
    };
  });

  const layout = {
    geo: {
      scope: "usa",
      projection: { type: "albers usa" as const },
      showland: true,
      landcolor: "#0A1628",
      showocean: true,
      oceancolor: "#060F1E",
      showlakes: true,
      lakecolor: "#081420",
      showrivers: true,
      rivercolor: "#0D1E30",
      showcountries: false,
      showsubunits: true,
      subunitcolor: "#1A2E4A",
      bgcolor: "transparent",
      fitbounds: false,
      ...geoLayoutRef.current,
    },
    paper_bgcolor: "transparent",
    plot_bgcolor: "transparent",
    margin: { t: 0, b: 0, l: 0, r: 0 },
    revision: revision,
    legend: {
      bgcolor: "rgba(10, 22, 40, 0.9)",
      bordercolor: "#1A2E4A",
      borderwidth: 1,
      font: { color: "#8899b4", size: 11, family: "IBM Plex Sans" },
      x: 0.01,
      y: 0.99,
    },
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
        <div>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "2.3rem", color: "var(--text-primary)", marginBottom: "4px" }}>
            National <span style={{ color: "var(--accent)", textShadow: "0 0 20px rgba(0,200,220,0.3)" }}>PFAS</span> Monitoring Map
          </h2>
          <p style={{ color: "var(--text-muted)", fontSize: "13px" }}>
            {loading ? "Loading systems..." : `${systems.filter(s => s.latitude && s.longitude).length.toLocaleString()} systems displayed`}
          </p>
        </div>
        <button
          onClick={() => setIncludeAll(!includeAll)}
          style={{ padding: "8px 16px", background: includeAll ? "var(--accent-glow)" : "transparent", border: `1px solid ${includeAll ? "var(--accent)" : "var(--border-light)"}`, borderRadius: "6px", color: includeAll ? "var(--accent)" : "var(--text-secondary)", fontSize: "12px", fontWeight: "500", cursor: "pointer", transition: "all 0.2s" }}
        >
          {includeAll ? "Showing All Systems" : "Show All Systems"}
        </button>
      </div>

      <div style={{ background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: "var(--radius-lg)", overflow: "hidden", position: "relative" }}>
        {loading && (
          <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(10, 22, 40, 0.8)", zIndex: 10, fontSize: "13px", color: "var(--text-muted)" }}>
            LOADING MONITORING DATA...
          </div>
        )}
        {/* @ts-ignore */}
        <Plot
          data={traces}
          layout={layout}
          config={{ displayModeBar: true, scrollZoom: true, displaylogo: false }}
          style={{ width: "100%", height: "520px" }}
          onClick={(e: any) => { // Added :any to satisfy compiler
            if (e.points && e.points[0]) {
              const pwsid = e.points[0].customdata as string;
              const system = systems.find((s) => s.pws_id === pwsid);
              if (system) setSelected(system);
            }
          }}
        />
      </div>
      {selected && (
         <div style={{ marginTop: "1rem", padding: "1.5rem", background: "var(--bg-card)", borderLeft: `3px solid ${RISK_TIER_COLORS[selected.risk_tier as RiskTier]}`, borderRadius: "var(--radius-lg)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
           <div>
             <div style={{ fontSize: "11px", color: RISK_TIER_COLORS[selected.risk_tier as RiskTier], fontWeight: "600" }}>{selected.risk_tier}</div>
             <div style={{ fontFamily: "var(--font-display)", fontSize: "1.2rem", color: "var(--text-primary)" }}>{selected.pws_name}</div>
           </div>
           <button onClick={() => onViewDetails(selected.pws_id)} style={{ padding: "8px 16px", background: "var(--accent-glow)", border: "1px solid var(--accent)", borderRadius: "6px", color: "var(--accent)", fontWeight: "600" }}>
             View Full Details →
           </button>
         </div>
      )}
    </div>
  );
}
