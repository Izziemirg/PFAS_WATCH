import pandas as pd
import numpy as np
from math import radians, cos, sin, asin, sqrt
from functools import lru_cache
import os

DATA_DIR = os.path.join(os.path.dirname(__file__), "data")

def haversine(lat1, lon1, lat2, lon2):
    R = 3956
    lat1, lon1, lat2, lon2 = map(radians, [lat1, lon1, lat2, lon2])
    dlat = lat2 - lat1
    dlon = lon2 - lon1
    a = sin(dlat / 2) ** 2 + cos(lat1) * cos(lat2) * sin(dlon / 2) ** 2
    return 2 * R * asin(sqrt(a))

def assign_risk_tier(row):
    if row["Location Has a Full Set of Results"] == "N":
        return "Monitoring Incomplete"
    elif row["Average > MCL"] == "Y" and row["Contaminant"] in ["PFOA", "PFOS"]:
        return "Critical"
    elif row["Average > MCL"] == "Y":
        return "Elevated"
    elif row["Average Result"] > 0 and row["Average > MCL"] == "N":
        return "Detected"
    else:
        return "No Detection"

def system_level_risk(tiers: pd.Series) -> str:
    """Roll up record-level risk tiers to a single system-level tier."""
    priority = ["Critical", "Elevated", "Detected", "Monitoring Incomplete", "No Detection"]
    for tier in priority:
        if tier in tiers.values:
            return tier
    return "No Detection"

@lru_cache(maxsize=1)
def load_data():
    """Load and process UCMR5 data. Cached so it only runs once at startup."""
    df = pd.read_parquet(os.path.join(DATA_DIR, "ucmr5_clean.parquet"))

    # Assign record-level risk tiers
    df["risk_tier"] = df.apply(assign_risk_tier, axis=1)

    # Tribal flag
    tribal_codes = ["01","02","03","04","05","06","07","08","09","10","NN"]
    df["is_tribal"] = df["State"].isin(tribal_codes)

    return df

@lru_cache(maxsize=1)
def load_zip_centroids():
    zip_df = pd.read_csv(os.path.join(DATA_DIR, "uszips.csv"), dtype={"zip": str})
    zip_df = zip_df[zip_df["zcta"] == True][["zip", "lat", "lng", "city", "state_id"]]
    zip_df["zip"] = zip_df["zip"].str.zfill(5)
    return zip_df

@lru_cache(maxsize=1)
def build_system_index():
    """
    Collapse record-level df to one row per PWS with system-level risk tier.
    This is what the map and /systems endpoint serve.
    """
    df = load_data()

    # System-level risk tier — worst contaminant wins
    system_tiers = (df.groupby("PWS ID")["risk_tier"]
                      .apply(system_level_risk)
                      .reset_index()
                      .rename(columns={"risk_tier": "system_risk_tier"}))

    # One row per system with stable fields
    systems = (df.drop_duplicates(subset="PWS ID")[[
        "PWS ID", "PWS Name", "State", "PWS Size",
        "EPA Region", "is_tribal",
        "Location Has a Full Set of Results",
        "Latitude", "Longitude"          # will be NaN until ECHO join
    ]].copy())

    systems = systems.merge(system_tiers, on="PWS ID", how="left")
    systems["monitoring_complete"] = systems["Location Has a Full Set of Results"] == "Y"

    return systems

def get_national_summary() -> dict:
    systems = build_system_index()
    tiers = systems["system_risk_tier"].value_counts().to_dict()
    return {
        "critical_systems":      tiers.get("Critical", 0),
        "elevated_systems":      tiers.get("Elevated", 0),
        "detected_systems":      tiers.get("Detected", 0),
        "no_detection_systems":  tiers.get("No Detection", 0),
        "incomplete_systems":    tiers.get("Monitoring Incomplete", 0),
        "total_systems":         len(systems)
    }

def get_all_systems() -> list:
    systems = build_system_index()
    systems = systems.where(pd.notnull(systems), None)
    return systems.rename(columns={
        "PWS ID": "pws_id",
        "PWS Name": "pws_name",
        "State": "state",
        "PWS Size": "pws_size",
        "EPA Region": "epa_region",
        "is_tribal": "is_tribal",
        "system_risk_tier": "risk_tier",
        "monitoring_complete": "monitoring_complete",
        "Latitude": "latitude",
        "Longitude": "longitude"
    }).to_dict(orient="records")

def parse_mcl(value) -> float | None:
    """Extract numeric value from MCL strings like '0.0040 µg/L' or '1 (unitless)'"""
    if value is None or (isinstance(value, float) and pd.isna(value)):
        return None
    try:
        return float(str(value).split()[0])
    except (ValueError, IndexError):
        return None

def get_system_detail(pwsid: str) -> dict | None:
    df = load_data()
    records = df[df["PWS ID"] == pwsid]

    if records.empty:
        return None

    first = records.iloc[0]
    contaminant_results = []

    for _, row in records.iterrows():
        contaminant_results.append({
            "contaminant": row["Contaminant"],
            "average_result": row["Average Result"],
            "mcl": parse_mcl(row.get("April 2024 PFAS NPDWR MCL", None)),
            "exceeds_mcl": row["Average > MCL"] == "Y",
            "risk_tier": row["risk_tier"]
        })

    return {
        "pws_id": pwsid,
        "pws_name": first["PWS Name"],
        "state": first["State"],
        "pws_size": first["PWS Size"],
        "is_tribal": bool(first["is_tribal"]),
        "monitoring_complete": first["Location Has a Full Set of Results"] == "Y",
        "epa_region": str(first.get("EPA Region", "")),
        "contaminant_results": contaminant_results
    }

def get_nearest_systems(user_zip: str, n: int = 5) -> list | dict:
    user_zip = str(user_zip).strip().zfill(5)
    zip_df = load_zip_centroids()
    systems = build_system_index()

    match = zip_df[zip_df["zip"] == user_zip]

    if match.empty:
        return {"error": f"ZIP code {user_zip} not found. Please enter a valid residential ZIP code."}

    if not match.iloc[0].get("zcta", True):
        return {"error": f"ZIP code {user_zip} is a PO Box or non-geographic code."}

    # Only systems with coordinates can be distance-ranked
    geo_systems = systems.dropna(subset=["Latitude", "Longitude"]).copy()

    if geo_systems.empty:
        return {"error": "No PWS locations with valid coordinates available."}

    centroid = match.iloc[0]
    geo_systems["distance_mi"] = geo_systems.apply(
        lambda row: haversine(
            centroid["lat"], centroid["lng"],
            row["Latitude"], row["Longitude"]
        ), axis=1
    )

    results = geo_systems.nsmallest(n, "distance_mi")[[
        "PWS ID", "PWS Name", "State",
        "distance_mi", "system_risk_tier",
        "is_tribal", "Latitude", "Longitude"
    ]].where(pd.notnull(geo_systems), None)

    return results.rename(columns={
        "PWS ID": "pws_id",
        "PWS Name": "pws_name",
        "State": "state",
        "system_risk_tier": "risk_tier",
        "is_tribal": "is_tribal",
        "Latitude": "latitude",
        "Longitude": "longitude"
    }).to_dict(orient="records")

def get_state_summary() -> list:
    systems = build_system_index()
    summary = []

    for state, group in systems.groupby("State"):
        total = len(group)
        critical = (group["system_risk_tier"] == "Critical").sum()
        elevated = (group["system_risk_tier"] == "Elevated").sum()
        summary.append({
            "state": state,
            "total_systems": total,
            "critical_systems": int(critical),
            "elevated_systems": int(elevated),
            "exceedance_rate": round((critical + elevated) / total, 4) if total > 0 else 0.0
        })

    return sorted(summary, key=lambda x: x["exceedance_rate"], reverse=True)