const WINDOW_MS = 60_000;
const MAX_REQUESTS_PER_WINDOW = 20;

interface Bucket {
  count: number;
  resetAt: number;
}

const buckets = new Map<string, Bucket>();

/**
 * Best-effort in-memory per-key rate limit. Resets on cold start / restarts
 * across serverless instances — acceptable for bounding abuse cost, not a
 * strict guarantee.
 */
export function checkRateLimit(key: string): boolean {
  const now = Date.now();
  const bucket = buckets.get(key);

  if (!bucket || now > bucket.resetAt) {
    buckets.set(key, { count: 1, resetAt: now + WINDOW_MS });
    return true;
  }

  if (bucket.count >= MAX_REQUESTS_PER_WINDOW) {
    return false;
  }

  bucket.count += 1;
  return true;
}
