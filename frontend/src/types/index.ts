export interface NationalSummary {
  critical_systems: number;
  elevated_systems: number;
  detected_systems: number;
  no_detection_systems: number;
  incomplete_systems: number;
  total_systems: number;
}

export interface PWSummary {
  pws_id: string;
  pws_name: string;
  state: string;
  pws_size: string;
  is_tribal: boolean;
  risk_tier: RiskTier;
  latitude: number | null;
  longitude: number | null;
  monitoring_complete: boolean;
}

export interface ContaminantResult {
  contaminant: string;
  average_result: number;
  mcl: number | null;
  exceeds_mcl: boolean;
  risk_tier: RiskTier;
}

export interface PWSDetail {
  pws_id: string;
  pws_name: string;
  state: string;
  pws_size: string;
  is_tribal: boolean;
  monitoring_complete: boolean;
  epa_region: string | null;
  contaminant_results: ContaminantResult[];
}

export interface NearestPWSResult {
  pws_id: string;
  pws_name: string;
  state: string;
  distance_mi: number;
  risk_tier: RiskTier;
  is_tribal: boolean;
  latitude: number | null;
  longitude: number | null;
}

export interface StateSummary {
  state: string;
  total_systems: number;
  critical_systems: number;
  elevated_systems: number;
  exceedance_rate: number;
}

export type RiskTier =
  | "Critical"
  | "Elevated"
  | "Detected"
  | "No Detection"
  | "Monitoring Incomplete";

export const RISK_TIER_COLORS: Record<RiskTier, string> = {
  Critical: "#DC2626",
  Elevated: "#EA580C",
  Detected: "#CA8A04",
  "No Detection": "#16A34A",
  "Monitoring Incomplete": "#6B7280",
};

export const RISK_TIER_ORDER: RiskTier[] = [
  "Critical",
  "Elevated", 
  "Detected",
  "No Detection",
  "Monitoring Incomplete",
];