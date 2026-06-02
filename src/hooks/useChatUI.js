// ══════════════════════════════════════════════════════════════
//  useChatUI — open/close state, notification badge, ESC handler
// ══════════════════════════════════════════════════════════════

import { useState, useEffect, useCallback, useRef } from 'react';

export default function useChatUI() {
  const [isOpen, setIsOpen] = useState(false);
  const [showNotification, setShowNotification] = useState(true);
  const inputRef = useRef(null);

  // ESC closes the panel
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') setIsOpen(false); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const togglePanel = useCallback(() => {
    setIsOpen((prev) => {
      const next = !prev;
      if (next) {
        setShowNotification(false);
        setTimeout(() => inputRef.current?.focus(), 150);
      }
      return next;
    });
  }, []);

  const closePanel = useCallback(() => setIsOpen(false), []);
  const dismissNotification = useCallback(() => setShowNotification(false), []);

  return {
    isOpen,
    showNotification,
    inputRef,
    togglePanel,
    closePanel,
    dismissNotification,
  };
}