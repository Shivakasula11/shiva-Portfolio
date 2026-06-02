
import { useState, useRef, useCallback } from 'react';
 import { getOfflineResponse } from '../Services/paragraphs/matchingEngine';
import {
  detectName,
  isForgetNameRequest,
  getStoredName,
 } from '../Services/paragraphs/nameService';

  import { personalizeResponse } from '../Services/paragraphs/personalization';

 import { getTimeGreeting } from '../Services/paragraphs/intents';

const ts = () => new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
const newId = (prefix) =>
  `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;

function buildOpeningMessage(name) {
  const base = getTimeGreeting();
  const body = `I'm Shiva's Portfolio Assistant. Ask me about:\n- **👤 About Me** — Background & profile\n- **🛠️ Skills** — Technical & soft skills\n- **🚀 Projects** — 5 real-world projects\n- **💼 Experience** — Role at Lanciere Technologies\n- **📞 Contact** — How to reach Shiva`;
  const text = name ? `Welcome back, ${name}! 👋 ${base}\n\n${body}` : `${base}\n\n${body}`;
  return { id: 'm1', role: 'assistant', text, timestamp: ts() };
}

export default function useChatMessages({ userName, setUserName, clearUserName }) {
  const [messages, setMessages] = useState(() => [buildOpeningMessage(getStoredName())]);
  const [isLoading, setIsLoading] = useState(false);
  const [editingMessageId, setEditingMessageId] = useState(null);   // 🔧 NEW
  const fallbackCountRef = useRef(0);

  // Internal: compose the bot's reply for a given user input.
  // Returns { text, suggestions, strong } and mutates userName/fallback state.
  const composeBotReply = useCallback((textToSend) => {
    let responseText = '';
    let responseSuggestions = null;
    let strong = false;

    // (1) Forget-name request takes priority
    if (isForgetNameRequest(textToSend)) {
      clearUserName();
      fallbackCountRef.current = 0;
      const result = getOfflineResponse(textToSend);
      if (result.strong) responseText = `Got it — I've cleared your name.\n\n${result.text}`;
      else responseText = "Got it — I've cleared your name. What would you like to talk about?";
      return { text: responseText, suggestions: null, strong: true };
    }

    // (2) Name introduction may co-exist with a question
    const detectedName = detectName(textToSend);
    const isNewName = detectedName && detectedName !== userName;
    if (isNewName) setUserName(detectedName);

    // (3) Intent matching
    const result = getOfflineResponse(textToSend);
    const activeName = isNewName ? detectedName : userName;

    if (isNewName) {
      if (result.strong) {
        const personalised = personalizeResponse(result.text, result.intentId, activeName);
        responseText = `Nice to meet you, ${detectedName}! 👋\n\n${personalised}`;
        strong = true;
      } else {
        responseText = `Nice to meet you, ${detectedName}! 👋 What would you like to know about Shiva's portfolio? You can ask about projects, skills, experience, or how to get in touch.`;
        strong = true;
      }
      fallbackCountRef.current = 0;
    } else {
      responseText = personalizeResponse(result.text, result.intentId, activeName);
      responseSuggestions = result.suggestions || null;
      strong = !!result.strong;

      if (result.strong) {
        fallbackCountRef.current = 0;
      } else {
        fallbackCountRef.current += 1;
        // (4) Consecutive-fallback softening — after 2+ misses, switch tone
        if (fallbackCountRef.current >= 2 && !responseSuggestions) {
          const namePart = activeName ? `, ${activeName}` : '';
          responseText = `Sorry I keep missing what you mean${namePart}! Try one of the suggestion chips below, or rephrase — I work best with clear questions like **"What's your tech stack?"** or **"Show me your projects."**`;
        }
      }
    }

    return { text: responseText, suggestions: responseSuggestions, strong };
  }, [userName, setUserName, clearUserName]);

  // Public: send a new user message (and trigger a bot reply)
  const sendMessage = useCallback((textToSend) => {
    const text = (textToSend || '').trim();
    if (!text || isLoading) return;

    setMessages((prev) => [...prev, {
      id: newId('user'),
      role: 'user',
      text,
      timestamp: ts(),
    }]);
    setIsLoading(true);

    const delay = 400 + Math.random() * 600;
    setTimeout(() => {
      const { text: botText, suggestions } = composeBotReply(text);
      setMessages((prev) => [...prev, {
        id: newId('bot'),
        role: 'assistant',
        text: botText,
        timestamp: ts(),
        suggestions,
      }]);
      setIsLoading(false);
    }, delay);
  }, [composeBotReply, isLoading]);

  // 🔧 NEW: edit a previously-sent user message
  // 1. Update the text on that message
  // 2. Drop every message AFTER it (so the stale bot reply disappears)
  // 3. Re-run the matching engine on the new text to produce a fresh reply
  const editMessage = useCallback((id, newText) => {
    const trimmed = (newText || '').trim();
    if (!trimmed || isLoading) return;

    let foundIndex = -1;
    setMessages((prev) => {
      const idx = prev.findIndex((m) => m.id === id);
      if (idx === -1) return prev;
      foundIndex = idx;
      // Keep messages up to and INCLUDING the edited one (with new text + edited marker)
      const head = prev.slice(0, idx + 1).map((m, i) =>
        i === idx ? { ...m, text: trimmed, edited: true, timestamp: ts() } : m
      );
      return head;
    });
    setEditingMessageId(null);

    if (foundIndex === -1) return;

    setIsLoading(true);
    const delay = 400 + Math.random() * 600;
    setTimeout(() => {
      const { text: botText, suggestions } = composeBotReply(trimmed);
      setMessages((prev) => [...prev, {
        id: newId('bot'),
        role: 'assistant',
        text: botText,
        timestamp: ts(),
        suggestions,
      }]);
      setIsLoading(false);
    }, delay);
  }, [composeBotReply, isLoading]);

  const startEdit = useCallback((id) => setEditingMessageId(id), []);
  const cancelEdit = useCallback(() => setEditingMessageId(null), []);

  const resetChat = useCallback(() => {
    setMessages([buildOpeningMessage(userName)]);
    fallbackCountRef.current = 0;
    setEditingMessageId(null);
  }, [userName]);

  return {
    messages,
    isLoading,
    editingMessageId,
    sendMessage,
    editMessage,
    startEdit,
    cancelEdit,
    resetChat,
  };
}