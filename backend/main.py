from mangum import Mangum
from fastapi import FastAPI, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from typing import List
from schemas import (
    PWSummary, PWSDetail, NearestPWSResult,
    NationalSummary, StateSummary
)
from data import (
    get_all_systems, get_system_detail,
    get_nearest_systems, get_national_summary,
    get_state_summary, build_system_index
)

from data import (
    get_all_systems, get_system_detail,
    get_nearest_systems, get_national_summary,
    get_state_summary, build_system_index,
    load_zip_centroids
)

app = FastAPI(
    title="PFAS Compliance Dashboard API",
    description="UCMR5 PFAS monitoring data against EPA 2024 MCL standards",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    # Change this to allow your future production URL
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
def startup():
    """Pre-load and cache data at startup so first request isn't slow."""
    build_system_index()
    print("Data loaded and cached.")

@app.get("/health")
def health():
    return {"status": "ok"}

@app.get("/summary/national", response_model=NationalSummary)
def national_summary():
    return get_national_summary()

@app.get("/summary/states", response_model=List[StateSummary])
def state_summaries():
    return get_state_summary()

@app.get("/systems/map", response_model=List[PWSummary])
def map_systems(
    include_all: bool = Query(False, description="Include no-detection systems"),
    state: str = Query(None),
    risk_tier: str = Query(None),
    tribal_only: bool = Query(False)
):
    systems = get_all_systems()
    
    if not include_all:
        systems = [s for s in systems if s["risk_tier"] != "No Detection"]
    if state:
        systems = [s for s in systems if s["state"] == state.upper()]
    if risk_tier:
        systems = [s for s in systems if s["risk_tier"] == risk_tier]
    if tribal_only:
        systems = [s for s in systems if s["is_tribal"]]
    
    return systems

@app.get("/systems/nearest/{zipcode}", response_model=List[NearestPWSResult])
def nearest_systems(
    zipcode: str,
    n: int = Query(5, ge=1, le=20, description="Number of nearest systems to return")
):
    result = get_nearest_systems(zipcode, n)
    if isinstance(result, dict) and "error" in result:
        raise HTTPException(status_code=404, detail=result["error"])
    return result

@app.get("/systems/{pwsid}", response_model=PWSDetail)
def system_detail(pwsid: str):
    result = get_system_detail(pwsid)
    if result is None:
        raise HTTPException(status_code=404, detail=f"PWS ID {pwsid} not found")
    return result

@app.get("/zip/{zipcode}")
def get_zip_coords(zipcode: str):
    zip_df = load_zip_centroids()
    match = zip_df[zip_df["zip"] == zipcode.zfill(5)]
    if match.empty:
        raise HTTPException(status_code=404, detail="ZIP not found")
    row = match.iloc[0]
    return {"lat": float(row["lat"]), "lng": float(row["lng"])}

handler = Mangum(app)
