// Hermes (the JS engine in RN release builds) cannot parse ISO date strings
// that carry more than 3 fractional-second digits — e.g. Laravel/Carbon's
// "2026-05-22T10:22:08.000000Z" (6-digit microseconds). It returns an Invalid
// Date, whereas V8 (used by the Chrome JS debugger in dev) parses it fine.
// That mismatch is why date-dependent logic silently breaks ONLY in release
// builds. This helper normalizes the string before constructing the Date:
//   - converts a space-separated datetime to ISO ("T")
//   - trims fractional seconds to 3 digits (milliseconds)
// Returns a valid Date, or null if the input is missing/unparseable.
export const parseApiDate = (raw) => {
  if (!raw) return null;
  const normalized = String(raw)
    .replace(" ", "T")
    .replace(/(\.\d{3})\d+/, "$1");
  const d = new Date(normalized);
  return isNaN(d.getTime()) ? null : d;
};
