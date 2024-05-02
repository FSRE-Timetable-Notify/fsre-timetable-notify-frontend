import { type ClassValue, clsx } from "clsx";
import { addDays, format, parseISO, startOfWeek } from "date-fns";
import { DateRange } from "react-day-picker";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function formatTime(
  options: { h: number; m: number } | { date: Date | string }
) {
  return format(
    "date" in options
      ? new Date(options.date)
      : new Date().setHours(options.h, options.m, 0, 0),
    "p"
  );
}

export function dateToIsoWeek(date: Date | string): `${number}-W${number}` {
  return format(new Date(date), "yyyy-'W'II") as `${number}-W${number}`;
}

export function isoWeekToWeekStartDate(isoWeek: `${number}-W${number}`) {
  if (!isValidISOWeek(isoWeek)) {
    throw new Error("Invalid ISO 8601 week");
  }

  const [year, week] = isoWeek.split("-W");
  const isoDate = `${year}-W${week}-1`;

  return startOfWeek(parseISO(isoDate));
}

export function isValidISOWeek(isoWeek: `${number}-W${number}`) {
  return /^(\d{4})-W(\d{2})$/.test(isoWeek);
}

export function isoWeekToDateRange(isoWeek: `${number}-W${number}`): DateRange {
  const monday = isoWeekToWeekStartDate(isoWeek);
  const sunday = addDays(monday, 6);

  return { from: monday, to: sunday };
}

export function formatDate(date: Date | string) {
  return format(new Date(date), "PPP");
}

export function formatDayMonth(date: Date | string) {
  return format(new Date(date), "dd/MM");
}

export function formatShortWeekDay(date: Date | string) {
  return capitalize(format(new Date(date), "EEE"));
}

export function range(n: number) {
  return [...Array(n).keys()];
}
