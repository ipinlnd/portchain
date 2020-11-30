import { PortCall } from "../types/PortCall";

export const groupByPortName = (array: PortCall[]) =>
  array.reduce((acc: any, curr) => {
    (acc[curr.port.name] = acc[curr.port.name] || []).push(curr.departure.getTime() - curr.arrival.getTime());
    return acc;
  }, {});

export const msToTime = (s: number) => {
  var ms = s % 1000;
  s = (s - ms) / 1000;
  var secs = s % 60;
  s = (s - secs) / 60;
  var mins = s % 60;
  var hrs = (s - mins) / 60;

  return hrs + ":" + mins + ":" + secs;
};

export const validLog = (s: number) => {
  const days = Math.floor(s / (1000 * 60 * 60 * 24));

  return days === 2 || days === 7 || days === 14;
};
