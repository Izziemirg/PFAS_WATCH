from pydantic import BaseModel
from typing import Optional, List

class ContaminantResult(BaseModel):
    contaminant: str
    average_result: float
    mcl: Optional[float] = None
    exceeds_mcl: bool
    risk_tier: str

class PWSummary(BaseModel):
    pws_id: str
    pws_name: str
    state: str
    pws_size: str
    is_tribal: bool
    risk_tier: str
    latitude: Optional[float] = None
    longitude: Optional[float] = None
    monitoring_complete: bool

class PWSDetail(BaseModel):
    pws_id: str
    pws_name: str
    state: str
    pws_size: str
    is_tribal: bool
    monitoring_complete: bool
    epa_region: Optional[str] = None
    contaminant_results: List[ContaminantResult]

class NearestPWSResult(BaseModel):
    pws_id: str
    pws_name: str
    state: str
    distance_mi: float
    risk_tier: str
    is_tribal: bool
    latitude: Optional[float] = None
    longitude: Optional[float] = None

class NationalSummary(BaseModel):
    critical_systems: int
    elevated_systems: int
    detected_systems: int
    no_detection_systems: int
    incomplete_systems: int
    total_systems: int

class StateSummary(BaseModel):
    state: str
    total_systems: int
    critical_systems: int
    elevated_systems: int
    exceedance_rate: float