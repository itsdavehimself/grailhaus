export const WATCH_CONDITION_VALUES = [
  "New/Unworn",
  "Like New",
  "Excellent",
  "Very Good",
  "Good",
  "Fair",
  "Parts/Not Working",
] as const;

export type WatchCondition = (typeof WATCH_CONDITION_VALUES)[number];

export const WATCH_CONDITION_OPTIONS = WATCH_CONDITION_VALUES.map((value) => ({
  value,
  label: value,
}));
