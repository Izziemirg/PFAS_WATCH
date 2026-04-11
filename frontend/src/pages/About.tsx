import { motion } from "framer-motion";

export default function About() {
  return (
    <main style={{
      maxWidth: "800px",
      margin: "0 auto",
      padding: "100px 2rem 6rem",
    }}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        {/* Header Section */}
        <div style={{
          fontSize: "11px",
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          color: "var(--accent)",
          marginBottom: "1rem",
          fontWeight: "600",
        }}>
          About this project
        </div>

        <h1 style={{
          fontFamily: "var(--font-display)",
          fontSize: "clamp(2rem, 4vw, 3rem)",
          color: "var(--text-primary)",
          marginBottom: "2rem",
          lineHeight: 1.1,
        }}>
          Why I built this
        </h1>

        {/* MAIN CONTENT WRAPPER 
            Using 'gap' here controls the spacing between ALL top-level sections 
        */}
        <div style={{
          display: "flex",
          flexDirection: "column",
          gap: "3.5rem", // Increased spacing (adjust this value as needed)
          color: "var(--text-secondary)",
          fontSize: "16px",
          lineHeight: 1.8,
        }}>
          
          {/* 1. Description Section */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            <p>
              My name is Izzie Mirghani, I built{" "}
              <span style={{
                color: "var(--accent)",
                textShadow: "0 0 20px rgba(0,200,220,0.3)",
              }}>
                PFAS Watch
              </span>
              {" "}as a portfolio project at the intersection of
              federal regulatory compliance, human health, environmental contaminant data, data analysis, 
              and modern web development. In my work experience, I have worked with many federal 
              agencies including the EPA, I wanted to demonstrate what's possible when these paths
              converge into one and the analyis is made comprehensive and accessible to the general public, not just to analysts.
            </p>

            <p>
              The Fifth Unregulated Contaminant Monitoring Rule (UCMR 5) program mandates the EPA collect data on unregulated substances to 
              inform future health-based regulations. The UCMR 5 dataset represents one of the most significant environmental monitoring efforts in 
              recent history. The 2024 MCL rule is a landmark regulation. But neither of these sources are easy to interact with
              in their raw form. This project is an attempt to change that.
            </p>
          </div>

          {/* 2. Technical Stack Section */}
          <div style={{
            background: "var(--bg-card)",
            border: "1px solid var(--border)",
            borderRadius: "var(--radius-lg)",
            padding: "2rem",
          }}>
            <h2 style={{
              fontFamily: "var(--font-display)",
              fontSize: "1.4rem",
              color: "var(--text-primary)",
              marginBottom: "1.5rem",
            }}>
              Technical Stack
            </h2>
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
              gap: "1rem",
            }}>
              {[
                { layer: "Data", tech: "EPA UCMR 5, ECHO Exporter" },
                { layer: "Backend", tech: "FastAPI + Python + Pandas" },
                { layer: "Frontend", tech: "React + TypeScript + Vite" },
                { layer: "Styling", tech: "CSS Variables + Framer Motion" },
                { layer: "Infrastructure", tech: "AWS (Lambda, S3, EC2)" },
                { layer: "AI Feature", tech: "Claude API (Coming soon)" },
              ].map(({ layer, tech }) => (
                <div key={layer} style={{
                  padding: "0.875rem 1rem",
                  background: "rgba(0,0,0,0.2)",
                  borderRadius: "6px",
                  border: "1px solid var(--border)",
                }}>
                  <div style={{
                    fontSize: "11px",
                    color: "var(--text-muted)",
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                    marginBottom: "4px",
                  }}>
                    {layer}
                  </div>
                  <div style={{
                    fontSize: "13px",
                    color: "var(--text-primary)",
                    fontWeight: "500",
                  }}>
                    {tech}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 3. Disclaimers Section */}
          <div style={{
            background: "var(--bg-card)",
            border: "1px solid var(--border)",
            borderRadius: "var(--radius-lg)",
            padding: "2rem",
          }}>
            <h2 style={{
              fontFamily: "var(--font-display)",
              fontSize: "1.4rem",
              color: "var(--text-primary)",
              marginBottom: "1rem",
            }}>
              Disclaimers
            </h2>
            <ul style={{
              display: "flex",
              flexDirection: "column",
              gap: "0.75rem",
              listStyle: "none",
              padding: 0,
              margin: 0,
            }}>
              {[
                "I do not have any affiliation with the EPA. This tool is for informational purposes only and does not constitute regulatory or legal advice.",
                "Data is sourced from EPA's UCMR 5 program. Systems with incomplete monitoring records are excluded from compliance analysis.",
                "Zip code to water system matching is approximate. Please confirm your actual water system with your local utility.",
                "UCMR 5 monitoring is ongoing. Data will be updated as new results are published.",
                "This project is not affiliated with or endorsed by the U.S. EPA.",
              ].map((d) => (
                <li key={d} style={{
                  display: "flex",
                  gap: "0.75rem",
                  alignItems: "flex-start",
                  fontSize: "14px",
                  color: "var(--text-secondary)",
                  lineHeight: 1.6,
                }}>
                  <span style={{
                    color: "var(--accent)",
                    flexShrink: 0,
                    marginTop: "5px",
                    fontSize: "10px",
                  }}>◆</span>
                  {d}
                </li>
              ))}
            </ul>
          </div>

          <div style={{
            background: "var(--bg-card)",
            border: "1px solid var(--border)",
            borderRadius: "var(--radius-lg)",
            padding: "2rem",
          }}> 
          <h2 style={{
              fontFamily: "var(--font-display)",
              fontSize: "1.4rem",
              color: "var(--text-primary)",
              marginBottom: "1rem",
            }}>
              Data Sources & Credits
            </h2>
            
            <ul style={{
              display: "flex",
              flexDirection: "column",
              gap: "0.75rem",
              listStyle: "none",
              padding: 0,
              margin: 0,
            }}></ul>
            <p>
              All data is public and maintained by the U.S. EPA. I pull the PWS facility information via REST API from the Enforcement and Compliance History Online 'ECHO' Data Explorer. I also pull the PFAS contaminant levels from The Fifth Unregulated Contaminant Monitoring Rule. Additionally, I matched PWS locations to zip codes using a free dataset from simplemaps.com. Thank you to all maintainers and parties that make this data open-sourced. 
            </p>
          </div>

          {/* 4. GitHub link */}
          <div style={{ textAlign: "center", paddingBottom: "2rem" }}>
            <a
              href="https://github.com/Izziemirg/PFAS_WATCH"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "12px 24px",
                background: "var(--bg-card)",
                border: "1px solid var(--border-light)",
                borderRadius: "6px",
                color: "var(--text-secondary)",
                fontSize: "14px",
                textDecoration: "none",
                transition: "all 0.2s",
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = "var(--accent)";
                e.currentTarget.style.color = "var(--accent)";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = "var(--border-light)";
                e.currentTarget.style.color = "var(--text-secondary)";
              }}
            >
              ⌥ View source on GitHub
            </a>
          </div>
        </div>
      </motion.div>
    </main>
  );
}
