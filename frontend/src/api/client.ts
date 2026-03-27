import axios from "axios";
import type {
  NationalSummary,
  PWSummary,
  PWSDetail,
  NearestPWSResult,
  StateSummary,
} from "../types";

const api = axios.create({
  baseURL: "http://127.0.0.1:8000",
  timeout: 10000,
});

export const getNationalSummary = async (): Promise<NationalSummary> => {
  const { data } = await api.get("/summary/national");
  return data;
};

export const getStateSummaries = async (): Promise<StateSummary[]> => {
  const { data } = await api.get("/summary/states");
  return data;
};

export const getMapSystems = async (filters?: {
  include_all?: boolean;
  state?: string;
  risk_tier?: string;
  tribal_only?: boolean;
}): Promise<PWSummary[]> => {
  const { data } = await api.get("/systems/map", { params: filters });
  return data;
};

export const getSystemDetail = async (pwsid: string): Promise<PWSDetail> => {
  const { data } = await api.get(`/systems/${pwsid}`);
  return data;
};

export const getNearestSystems = async (
  zipcode: string,
  n: number = 5
): Promise<NearestPWSResult[]> => {
  const { data } = await api.get(`/systems/nearest/${zipcode}`, {
    params: { n },
  });
  return data;
};

export const getZipCoords = async (zip: string): Promise<{lat: number, lng: number} | null> => {
  try {
    const { data } = await api.get(`/zip/${zip}`);
    return data;
  } catch {
    return null;
  }
};