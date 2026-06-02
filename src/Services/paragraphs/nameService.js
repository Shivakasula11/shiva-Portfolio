// ══════════════════════════════════════════════════════════════
//  Name service — detection, validation, persistence
// ══════════════════════════════════════════════════════════════

 import { STORAGE_KEYS } from '../../hooks/Constants';


// Words that should NEVER be treated as a person's name.
const NAME_BLACKLIST = new Set([
  // Articles / prepositions / connectors
  'a', 'an', 'the', 'from', 'to', 'in', 'on', 'at', 'by', 'for', 'with', 'of', 'and', 'or', 'but',
  // Pronouns
  'i', 'you', 'he', 'she', 'we', 'they', 'me', 'him', 'her', 'us', 'them', 'it',
  // States / feelings often used after "I'm"
  'fine', 'good', 'okay', 'ok', 'great', 'tired', 'bored', 'busy', 'free',
  'available', 'sorry', 'happy', 'sad', 'angry', 'excited', 'curious',
  'confused', 'sleepy', 'hungry', 'thirsty', 'ready', 'here', 'there', 'back',
  // Action / role words
  'just', 'not', 'really', 'also', 'still', 'always', 'never', 'maybe',
  'recruiter', 'developer', 'designer', 'engineer', 'manager', 'employer',
  'candidate', 'intern', 'fresher', 'student', 'freelancer', 'founder',
  'interested', 'impressed', 'amazed',
  // Misc fillers
  'new', 'old', 'fan', 'big', 'small', 'cool', 'nice',
]);

function capitalizeName(word) {
  return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
}

function looksLikeName(word) {
  if (!word || word.length < 2 || word.length > 15) return false;
  if (NAME_BLACKLIST.has(word)) return false;
  if (!/^[a-z]+$/.test(word)) return false;
  if (word.endsWith('ing')) return false;                       // verbs (looking, working)
  if (word.length > 4 && word.endsWith('ed')) return false;     // past tense (tired, bored)
  if (word.length > 4 && word.endsWith('ly')) return false;     // adverbs (really, totally)
  return true;
}

export function detectName(text) {
  // Split on hard punctuation so "hi, my name is akhil, tell me..." is
  // treated as ["hi", "my name is akhil", "tell me..."] — prevents a verb
  // in the next clause from being captured as a surname.
  const clauses = text.toLowerCase().split(/[,;.!?]/);

  for (const clause of clauses) {
    const cleaned = clause.replace(/["]/g, ' ').replace(/\s+/g, ' ').trim();
    if (!cleaned) continue;

    // Pattern 1 (strong): "my name is X", "name's X", "call me X"
    let m = cleaned.match(/(?:my name is|name's|call me)\s+([a-z]+)(?:\s+([a-z]+))?/);
    if (m) {
      const [, first, second] = m;
      if (looksLikeName(first)) {
        let full = capitalizeName(first);
        if (second && looksLikeName(second)) full += ' ' + capitalizeName(second);
        return full;
      }
    }

    // Pattern 2 (medium): "i'm X", "i am X", "this is X"
    m = cleaned.match(/(?:i'?m|i am|this is)\s+([a-z]+)(?:\s+([a-z]+))?/);
    if (m) {
      const [, first, second] = m;
      if (looksLikeName(first)) {
        let full = capitalizeName(first);
        if (second && looksLikeName(second)) full += ' ' + capitalizeName(second);
        return full;
      }
    }

    // Pattern 3: "X here" (e.g., "Rahul here")
    m = cleaned.match(/^([a-z]+)\s+here\s*$/);
    if (m && looksLikeName(m[1])) return capitalizeName(m[1]);
  }

  return null;
}

export function isForgetNameRequest(text) {
  const t = text
    .toLowerCase()
    .replace(/[?!.,;:"]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  const phrases = [
    'forget my name', 'reset my name', 'delete my name',
    "that's not my name", 'thats not my name', 'wrong name',
    'call me something else', 'forget me',
    "you don't know me", 'you dont know me',
  ];
  return phrases.some((p) => t.includes(p));
}

// ── localStorage helpers ──────────────────────────────────────
export function getStoredName() {
  if (typeof window === 'undefined') return null;
  try { return localStorage.getItem(STORAGE_KEYS.userName) || null; }
  catch { return null; }
}

export function saveStoredName(name) {
  if (typeof window === 'undefined') return;
  try {
    if (name) localStorage.setItem(STORAGE_KEYS.userName, name);
    else localStorage.removeItem(STORAGE_KEYS.userName);
  } catch { /* quota / disabled storage — ignore */ }
}