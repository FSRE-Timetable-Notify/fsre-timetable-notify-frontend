import type { DateRange } from "react-day-picker";

import { type ClassValue, clsx } from "clsx";
import { addDays, format, parseISO, startOfWeek } from "date-fns";
import { twMerge } from "tailwind-merge";

import type { Timetable } from "@/api/api";

import { characterMap } from "./const";

export function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function dateToIsoWeek(date: Date): `${number}-W${number}` {
  return format(date, "yyyy-'W'II") as `${number}-W${number}`;
}

export function formatDate(date: Date) {
  return format(date, "PPP");
}

export function formatDayMonth(date: Date) {
  return format(date, "dd/MM");
}

export function formatShortWeekDay(date: Date) {
  return capitalize(format(date, "EEE"));
}

export function formatTime(options: { date: Date } | { h: number; m: number }) {
  return format(
    "date" in options
      ? options.date
      : new Date().setHours(options.h, options.m, 0, 0),
    "p"
  );
}

/**
 * Get the number of non-empty days in a timetable. The minimum (standard) amount is 5 workdays per week (Mon - Fri), but sometimes classes are also held on Saturdays or Sundays.
 *
 * @param timetable The timetable to count the days from
 * @returns The number of days in the timetable (5-7)
 */
export function getDaysInTimetable(timetable: Timetable) {
  const days = (
    Object.entries(timetable) as [
      keyof Timetable,
      Timetable[keyof Timetable][],
    ][]
  ).filter(
    ([weekDay, classes]) =>
      (weekDay !== "saturday" && weekDay !== "sunday") || classes.length > 0
  ).length;

  return Math.max(5, Math.min(7, days));
}

export function isoWeekToDateRange(isoWeek: `${number}-W${number}`): DateRange {
  const monday = new Date(isoWeekToWeekStartDate(isoWeek));
  const sunday = addDays(monday, 6);

  return { from: monday, to: sunday };
}

export function isoWeekToWeekStartDate(isoWeek: `${number}-W${number}`) {
  if (!isValidISOWeek(isoWeek)) {
    throw new Error("Invalid ISO 8601 week");
  }

  const [year, week] = isoWeek.split("-W");
  const isoDate = `${year}-W${week}-1`;

  return new Date(startOfWeek(parseISO(isoDate), { weekStartsOn: 1 }));
}

export function isValidISOWeek(isoWeek: `${number}-W${number}`) {
  return /^(\d{4})-W(\d{2})$/.test(isoWeek);
}

export function latinize(str: string) {
  return str.replace(/[^A-Za-z0-9]/g, function (x) {
    return characterMap[x] ?? x;
  });
}

export function normalize(str: string): string {
  return str
    .toLowerCase()
    .normalize("NFD") // remove accents (e.g. "rač" → "rac")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, " ") // keep only alphanumeric
    .trim();
}

export function range(n: number) {
  return [...Array(n).keys()];
}
