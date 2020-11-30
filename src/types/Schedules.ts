import { PortCall } from "./PortCall";
import { Vessel } from "./Vessel";

export interface Schedules {
  vessel: Vessel;
  portCalls: PortCall[];
}
