## PFAS Watch — National Drinking Water Compliance Dashboard

An interactive full-stack dashboard tracking PFAS contamination in U.S. public water systems against EPA's 2024 Maximum Contaminant Level rule.

Live Demo
[Coming soon — AWS deployment]

## Stack
- **Data**: EPA UCMR 5, ECHO Exporter
- **Backend**: FastAPI + Python + Pandas
- **Frontend**: React + TypeScript + Vite + Framer Motion
- **Visualization**: Plotly.js
- **Infrastructure**: AWS (EC2, S3, Lambda)

## Key Features
- National map of 10,289 public water systems color-coded by PFAS risk tier
- ZIP code search to find nearest monitored systems
- System detail modal with contaminant breakdown and health context
- Tribal system identification and regulatory context
- Based on EPA UCMR 5 data with 2024 MCL compliance analysis

## Data Sources
- [EPA UCMR 5](https://www.epa.gov/dwucmr/fifth-unregulated-contaminant-monitoring-rule)
- [EPA ECHO](https://echo.epa.gov/)

## Disclaimer
For informational purposes only. Not affiliated with or endorsed by the U.S. EPA.
