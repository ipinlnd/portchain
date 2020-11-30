import {
  getBottom5MostArrivals,
  getPortDurationPercentiles,
  getTop5MostArrivals,
  getVesselDelayPercentiles,
} from "./services/calculations";
import { getPortCalls, getVessels } from "./services/fetchData";
import { Schedules } from "./types/Schedules";

process.stdout.write("Loading Data...");
getVessels().then(async (vessels) => {
  const allSchedules: Schedules[] = [];
  for (let vessel of vessels) {
    const schedules = await getPortCalls(vessel.imo);
    process.stdout.write(".");
    if (schedules) {
      allSchedules.push(schedules);
    }
  }
  process.stdout.write("Done\n");

  for (let arg of process.argv) {
    if (arg === "top5arrival") {
      console.log("Top 5 Ports with Most Arrivals:");
      console.table(getTop5MostArrivals(allSchedules));
      console.log();
    } else if (arg === "bottom5arrival") {
      console.log("Top 5 Ports with Least Arrivals:");
      console.table(getBottom5MostArrivals(allSchedules));
      console.log();
    } else if (arg === "durations") {
      console.log("Duration Percentiles by Port");
      console.table(getPortDurationPercentiles(allSchedules));
      console.log();
    } else if (arg === "delays") {
      console.log("Delay Percentiles by Vessel");
      console.table(getVesselDelayPercentiles(allSchedules));
      console.log();
    }
  }
});
