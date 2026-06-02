// ══════════════════════════════════════════════════════════════
//  useUserName — userName state synced with localStorage
// ══════════════════════════════════════════════════════════════

import { useState, useCallback } from 'react';
import { getStoredName, saveStoredName } from '../Services/paragraphs/nameService';

export default function useUserName() {
  const [userName, setUserNameState] = useState(null);

  const setUserName = useCallback((name) => {
    setUserNameState(name);
    saveStoredName(name);
  }, []);

  const clearUserName = useCallback(() => {
    setUserNameState(null);
    saveStoredName(null);
  }, []);

  return { userName, setUserName, clearUserName };
}