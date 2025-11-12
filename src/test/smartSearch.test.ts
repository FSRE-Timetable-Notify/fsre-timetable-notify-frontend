import { describe, expect, it } from "bun:test";

import { smartSearch } from "../lib/smartSearch";

describe("smartSearch", () => {
  it("returns 0 when either input or target is empty", () => {
    expect(smartSearch("", "abc")).toBe(0);
    expect(smartSearch("abc", "")).toBe(0);
    expect(smartSearch("", "")).toBe(0);
  });

  it("returns ~1 for exact matches", () => {
    const score = smartSearch("Hello World", "Hello World");
    expect(score).toBeGreaterThanOrEqual(0.999);
  });

  it("gives higher score for similar strings than for unrelated strings", () => {
    const target = "signal processing";
    const exact = smartSearch(target, target);
    const typo = smartSearch("signal proccessing", target);
    const reordered = smartSearch("processing signal", target);
    const unrelated = smartSearch("banana tree", target);

    expect(exact).toBeGreaterThan(typo);
    expect(typo).toBeGreaterThan(unrelated);
    expect(reordered).toBeGreaterThan(unrelated);
  });

  it("is symmetric-ish for token overlap (jaccard) — order shouldn't matter much", () => {
    const a = smartSearch("computer science", "science computer");
    const b = smartSearch("science computer", "computer science");
    // Scores should be very close
    expect(Math.abs(a - b)).toBeLessThan(1e-6);
  });

  it("ngram similarity helps with short common substrings", () => {
    const s1 = smartSearch("abcd", "abce");
    const s2 = smartSearch("abcd", "wxyz");
    expect(s1).toBeGreaterThan(s2);
  });
});
