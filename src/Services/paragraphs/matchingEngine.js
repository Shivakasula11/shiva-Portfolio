import { INTENTS } from './intents';
import {
  SCORE_STRONG_THRESHOLD,
  MAX_SUGGESTIONS,
  SUGGESTION_EXCLUDE_IDS,
} from '../../hooks/Constants';

function levenshtein(a, b) {
  const m = a.length, n = b.length;
  const dp = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));
  for (let i = 0; i <= m; i++) dp[i][0] = i;
  for (let j = 0; j <= n; j++) dp[0][j] = j;
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      dp[i][j] = a[i - 1] === b[j - 1]
        ? dp[i - 1][j - 1]
        : 1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]);
    }
  }
  return dp[m][n];
}

function isFuzzyMatch(word, keyword) {
  if (!word || !keyword) return false;
  if (word === keyword) return true;
  if (word.length >= 3 && keyword.length >= 3) {
    if (keyword.includes(word) || word.includes(keyword)) return true;
  }
  if (word.length < 3 || keyword.length < 3) return false;
  const maxDist = word.length <= 4 ? 1 : 2;
  return levenshtein(word, keyword) <= maxDist;
}

function escapeRegex(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function normalize(text) {
  return text.toLowerCase().replace(/[?!.,;:'"]/g, '').replace(/\s+/g, ' ').trim();
}

export function getOfflineResponse(userMessage) {
  const input = normalize(userMessage);
  const words = input.split(' ');

  const matches = [];

  for (const intent of INTENTS) {
    let score = 0;
    for (const keyword of intent.keywords) {
      // (1) 🔧 Word-boundary substring on full input
      const boundaryRe = new RegExp(`\\b${escapeRegex(keyword)}\\b`);
      if (boundaryRe.test(input)) {
        score += keyword.length * 2;
        continue;
      }
      const kwWords = keyword.split(' ');
      // (2) 🔧 Multi-word keyword: every sub-word must appear EXACTLY
      if (kwWords.length > 1) {
        const allPresent = kwWords.every((kw) => words.includes(kw));
        if (allPresent) {
          score += keyword.length * 1.5;
          continue;
        }
      }
      // (3) Single-word keyword: fuzzy match preserved (handles typos)
      if (kwWords.length === 1) {
        for (const word of words) {
          if (isFuzzyMatch(word, keyword)) {
            score += keyword.length;
            break;
          }
        }
      }
    }
    if (score > 0) matches.push({ intent, score });
  }

  matches.sort((a, b) => b.score - a.score);
  const best = matches[0];

  if (best && best.score >= SCORE_STRONG_THRESHOLD) {
    return {
      text: best.intent.response(),
      strong: true,
      intentId: best.intent.id,
      suggestions: null,
    };
  }

  if (best && best.score > 0) {
    const candidates = matches
      .filter((m) => !SUGGESTION_EXCLUDE_IDS.has(m.intent.id))
      .slice(0, MAX_SUGGESTIONS);
    if (candidates.length > 0) {
      return {
        text: "I'm not quite sure what you meant — did you mean one of these?",
        suggestions: candidates.map((m) => ({
          label: m.intent.label,
          query: m.intent.exampleQuery,
        })),
        strong: false,
        intentId: null,
      };
    }
  }

  return {
    text: "Hmm, I'm not sure I caught that. Could you share a bit more about what you'd like to know? I can chat about my **projects**, **skills**, **experience**, or **how to get in touch**.",
    strong: false,
    intentId: null,
    suggestions: null,
  };
}