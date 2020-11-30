import { msToTime, validLog } from "../services/utils";

test("msToTime", () => {
  expect(msToTime(82136000)).toBe("22:48:56");
});

test("Valid Log 2 days", () => {
  expect(validLog(172800000)).toBe(true);
});

test("Valid Log 7 days", () => {
  expect(validLog(604800000)).toBe(true);
});

test("Valid Log 14 days", () => {
  expect(validLog(1209600000)).toBe(true);
});

test("Valid Log 12 days", () => {
  expect(validLog(1036800000)).toBe(false);
});
