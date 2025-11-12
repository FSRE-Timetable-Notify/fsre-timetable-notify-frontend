import { normalize } from "@/lib/utils";

/**
 * Returns a similarity score between 0 and 1 indicating how similar the input is to the target.
 * A higher score means a better match.
 *
 * @param input The input string to search for
 * @param target The target string to compare against
 * @returns A similarity score between 0 and 1
 */
export function smartSearch(input: string, target: string): number {
  const a = normalize(input);
  const b = normalize(target);

  if (!a || !b) return 0;

  const lev = 1 - levenshtein(a, b) / Math.max(a.length, b.length);
  const jac = jaccard(a, b);
  const ngram = ngramSimilarity(a, b);

  // Weighted average
  return 0.5 * lev + 0.3 * jac + 0.2 * ngram;
}

function jaccard(a: string, b: string): number {
  const aTokens = new Set(a.split(" "));
  const bTokens = new Set(b.split(" "));
  const intersection = [...aTokens].filter(x => bTokens.has(x)).length;
  const union = new Set([...aTokens, ...bTokens]).size;
  return intersection / union;
}

function levenshtein(a: string, b: string): number {
  const m = a.length,
    n = b.length;
  const dp = Array.from({ length: m + 1 }, () =>
    new Array<number>(n + 1).fill(0)
  );
  for (let i = 0; i <= m; i++) dp[i][0] = i;
  for (let j = 0; j <= n; j++) dp[0][j] = j;
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      dp[i][j] = Math.min(
        dp[i - 1][j] + 1, // deletion
        dp[i][j - 1] + 1, // insertion
        dp[i - 1][j - 1] + cost // substitution
      );
    }
  }
  return dp[m][n];
}

function ngramSimilarity(a: string, b: string, n = 2): number {
  const ngrams = (s: string) => {
    const arr = [];
    for (let i = 0; i < s.length - n + 1; i++) arr.push(s.slice(i, i + n));
    return arr;
  };
  const aN = ngrams(a),
    bN = ngrams(b);
  const intersection = aN.filter(x => bN.includes(x)).length;
  const union = new Set([...aN, ...bN]).size;
  return intersection / union;
}
