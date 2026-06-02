// ══════════════════════════════════════════════════════════════
//  Shared constants — design tokens, storage keys, scoring
// ══════════════════════════════════════════════════════════════

// Design tokens (was inlined as `C` in the old monolith file)
export const C = {
  dark:        '#0b1220',
  darkAlpha:   'rgba(11,18,32,0.95)',
  medium:      '#1e3358',
  mediumAlpha: 'rgba(30,51,88,0.9)',
  accent:      '#0aa9f3',
  accentAlpha: 'rgba(10,169,243,0.15)',
  border:      'rgba(30,51,88,0.9)',
  borderLight: 'rgba(30,51,88,0.45)',
  text:        '#cbd5e1',
  muted:       '#64748b',
};

// localStorage keys
export const STORAGE_KEYS = {
  userName: 'chatbot_user_name',
};

// Tiered-fallback scoring
export const SCORE_STRONG_THRESHOLD = 6;  // ≥ this = confident answer
export const MAX_SUGGESTIONS = 3;

// Small-talk intents that should never appear as "Did you mean…?" chips
export const SUGGESTION_EXCLUDE_IDS = new Set([
  'greeting', 'thanks', 'bye', 'funny', 'age',
]);