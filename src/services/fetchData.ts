import fetch from "node-fetch";
import { PortCall } from "../types/PortCall";
import { Schedules } from "../types/Schedules";
import { Vessel } from "../types/Vessel";

const VESSEL_API = "https://import-coding-challenge-api.portchain.com/api/v2/vessels";

const PORTCALL_API = "https://import-coding-challenge-api.portchain.com/api/v2/schedule/";

export const getVessels = async (): Promise<Vessel[]> => {
  const result = await fetch(VESSEL_API);
  if (result.status === 200) {
    const json = await result.json();
    return json;
  }
  return [];
};

export const getPortCalls = async (vesselId: string): Promise<Schedules | null> => {
  const result = await fetch(PORTCALL_API + vesselId);
  if (result.status === 200) {
    const json = await result.json();
    return {
      vessel: json.vessel,
      portCalls: json.portCalls.map((item: any) => ({
        ...item,
        arrival: new Date(item.arrival),
        departure: new Date(item.departure),
        createdDate: new Date(item.createdDate),
        logEntries: item.logEntries.map((entry: any) => ({
          ...entry,
          arrival: entry.arrival && new Date(entry.arrival),
          departure: entry.departure && new Date(entry.departure),
          createdDate: entry.createdDate && new Date(entry.createdDate),
        })),
      })),
    };
  }

  return null;
};
