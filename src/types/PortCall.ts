import { LogEntry } from "./LogEntry";
import { Port } from "./Port";

export interface PortCall {
  arrival: Date;
  departure: Date;
  createdDate: Date;
  isOmitted: boolean;
  service: string;
  port: Port;
  logEntries: LogEntry[];
}
