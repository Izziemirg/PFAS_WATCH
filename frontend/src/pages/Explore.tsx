import { useState } from "react";
import SummaryCards from "../components/SummaryCards";
import PFASMap from "../components/PFASMap";
import ZipSearch from "../components/ZipSearch";
import SystemDetailPanel from "../components/SystemDetailPanel";
import { getZipCoords } from "../api/client";

export default function Explore() {
  const [detailPwsid, setDetailPwsid] = useState<string | null>(null);
  const [zoomTarget, setZoomTarget] = useState<{ lat: number; lng: number } | null>(null);
  const handleZipSearch = async (zip: string) => {
    const coords = await getZipCoords(zip);
    if (coords) {
      setZoomTarget(coords); // This "pings" the map to zoom
    }
  };

  return (
    <main style={{
      maxWidth: "1200px",
      margin: "0 auto",
      padding: "100px 2rem 4rem",
    }}>
      <div style={{ marginBottom: "3rem" }}>
        <div style={{
          fontSize: "11px",
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          color: "var(--accent)",
          marginBottom: "0.75rem",
          fontWeight: "600",
        }}>
          Data Explorer
        </div>
        <h1 style={{
          fontFamily: "var(--font-display)",
          fontSize: "clamp(2rem, 4vw, 3rem)",
          color: "var(--text-primary)",
          marginBottom: "0.75rem",
        }}>
          <span style={{
            color: "var(--accent)",
            textShadow: "0 0 40px rgba(0,200,220,0.3)",
          }}>
            PFAS
          </span>
          {" "}Contamination Explorer
        </h1>
        <p style={{
          color: "var(--text-secondary)",
          fontSize: "16px",
          maxWidth: "600px",
          lineHeight: 1.7,
        }}>
          Explore UCMR 5 monitoring results for{" "}
          <span style={{ color: "var(--text-primary)" }}>
            10,289 public water systems
          </span>{" "}
          across the United States and territories.
        </p>
      </div>

<SummaryCards />
      
      <div style={{ marginTop: "3rem" }}>
        {/* Pass the zoomTarget and the detail handler to the Map */}
        <PFASMap 
          zoomToZip={zoomTarget} 
          onViewDetails={(pwsid) => setDetailPwsid(pwsid)} 
        />
      </div>

      <div style={{ marginTop: "3rem" }}>
        {/* Pass the search handler and the detail handler to ZipSearch */}
        <ZipSearch 
          onSearch={handleZipSearch} 
          onViewDetails={(pwsid) => setDetailPwsid(pwsid)} 
        />
      </div>

      {/* This renders the modal ONLY when a PWSID is selected */}
      {detailPwsid && (
        <SystemDetailPanel 
          pwsid={detailPwsid} 
          onClose={() => setDetailPwsid(null)} 
        />
      )}
    </main>
    );
  }