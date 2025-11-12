import { describe, expect, it } from "bun:test";

import {
  isoWeekToDateRange,
  isoWeekToWeekStartDate,
  isValidISOWeek,
} from "../lib/utils";

describe("isValidISOWeek", () => {
  it("should return true for valid ISO week strings", () => {
    expect(isValidISOWeek("2023-W15")).toBe(true);
    expect(isValidISOWeek("1999-W01")).toBe(true);
  });

  it("should return false for invalid ISO week strings", () => {
    expect(isValidISOWeek("2023-W1")).toBe(false);
    expect(isValidISOWeek("2023-W100")).toBe(false);
  });
});

describe("isoWeekToWeekStartDate", () => {
  it("should return the correct start date for a valid ISO week", () => {
    const startDate = isoWeekToWeekStartDate("2023-W15");
    expect(startDate.toISOString().slice(0, 10)).toBe("2023-04-10"); // Monday of week 15 in 2023
  });

  it("should throw an error for an invalid ISO week", () => {
    expect(() => isoWeekToWeekStartDate("2023-W100")).toThrow(
      "Invalid ISO 8601 week"
    );
  });
});

describe("isoWeekToDateRange", () => {
  it("should return the correct date range for a valid ISO week", () => {
    const dateRange = isoWeekToDateRange("2023-W15");
    expect(dateRange.from?.toISOString().slice(0, 10)).toBe("2023-04-10"); // Monday
    expect(dateRange.to?.toISOString().slice(0, 10)).toBe("2023-04-16"); // Sunday
  });

  it("should throw an error for an invalid ISO week", () => {
    expect(() => isoWeekToDateRange("2023-W100")).toThrow(
      "Invalid ISO 8601 week"
    );
  });
});
