import { PortCall } from "../types/PortCall";
import { groupByPortName, msToTime, validLog } from "./utils";
import percentile from "percentile";
import { Schedules } from "../types/Schedules";

const countArrivals = (allSchedules: Schedules[]) => {
  const arrivals: any = {};
  const array = [];
  for (let schedules of allSchedules) {
    for (let portCall of schedules.portCalls) {
      if (arrivals[portCall.port.name]) {
        arrivals[portCall.port.name]++;
      } else {
        arrivals[portCall.port.name] = 1;
      }
    }
  }
  for (let a in arrivals) {
    array.push({ "Port Name": a, Arrivals: arrivals[a] });
  }
  return array;
};

export const getTop5MostArrivals = (allSchedules: Schedules[]) => {
  const arrivals = countArrivals(allSchedules);
  arrivals.sort((a: any, b: any) => b["Arrivals"] - a["Arrivals"]);
  return arrivals.slice(0, 5);
};

export const getBottom5MostArrivals = (allSchedules: Schedules[]) => {
  const arrivals = countArrivals(allSchedules);
  arrivals.sort((a: any, b: any) => a["Arrivals"] - b["Arrivals"]);
  return arrivals.slice(0, 5);
};

export const getPortDurationPercentiles = (allSchedules: Schedules[]) => {
  let allPortcalls: PortCall[] = [];
  for (let schedules of allSchedules) {
    allPortcalls.push(...schedules.portCalls);
  }
  const byPorts = groupByPortName(allPortcalls);

  return Object.keys(byPorts).map((port) => {
    const percentiles = percentile([5, 20, 50, 70, 90], byPorts[port]) as number[];
    return {
      portName: port,
      "5th": msToTime(percentiles[0]),
      "20th": msToTime(percentiles[1]),
      "50th": msToTime(percentiles[2]),
      "75th": msToTime(percentiles[3]),
      "90th": msToTime(percentiles[4]),
    };
  });
};

export const getVesselDelayPercentiles = (allSchedules: Schedules[]) => {
  const result: any = [];
  const schedulesCallsValidLog = allSchedules.map((x) => ({
    ...x,
    portCalls: x.portCalls.map((item) => ({
      ...item,
      logEntries: item.logEntries.filter(
        (x) => x.arrival && validLog(Math.abs(x.createdDate.getTime() - item.arrival.getTime()))
      ),
    })),
  }));

  for (let schedules of schedulesCallsValidLog) {
    const delays = [];
    for (let portCall of schedules.portCalls) {
      delays.push(...portCall.logEntries.map((x) => Math.abs(x.arrival.getTime() - portCall.arrival.getTime())));
    }
    const percentiles = percentile([5, 50, 80], delays) as number[];
    result.push({
      "Vessel Name": schedules.vessel.name,
      "5th": msToTime(percentiles[0]),
      "50th": msToTime(percentiles[1]),
      "80th": msToTime(percentiles[2]),
    });
  }
  return result;
};
