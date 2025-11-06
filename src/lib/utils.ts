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

export function getSimilarityScore(str1: string, str2: string): number {
  const len1 = str1.length;
  const len2 = str2.length;
  const dp: number[][] = [];

  // Initialize DP table
  for (let i = 0; i <= len1; i++) {
    dp[i] = [];
    dp[i][0] = i;
  }
  for (let j = 0; j <= len2; j++) {
    dp[0][j] = j;
  }

  // Fill DP table
  for (let i = 1; i <= len1; i++) {
    for (let j = 1; j <= len2; j++) {
      if (str1[i - 1] === str2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1];
      } else {
        dp[i][j] = Math.min(
          dp[i - 1][j] + 1, // deletion
          dp[i][j - 1] + 1, // insertion
          dp[i - 1][j - 1] + 1 // substitution
        );
      }
    }
  }

  // Levenshtein distance
  const distance = dp[len1][len2];

  // Normalize the similarity score between 0 and 0.6
  const maxLen = Math.max(len1, len2);
  const score = 1 - distance / maxLen;

  return Math.max(0, Math.min(0.6, score));
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

export function range(n: number) {
  return [...Array(n).keys()];
}

export function smartSearch(value: string, search: string): number {
  const normalizedItem = latinize(value).toLowerCase();
  const normalizedSearch = latinize(search).toLowerCase();

  if (normalizedSearch.length === 0) {
    return 1;
  }

  if (normalizedItem === normalizedSearch) {
    return 1;
  }

  if (normalizedItem.startsWith(normalizedSearch)) {
    return 0.9;
  }

  if (normalizedItem.includes(normalizedSearch)) {
    return 0.7;
  }

  // Handle partial match by calculating similarity score
  const similarityScore = getSimilarityScore(normalizedItem, normalizedSearch);

  return similarityScore;
}
