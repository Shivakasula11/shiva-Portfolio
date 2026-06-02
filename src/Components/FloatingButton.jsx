// ══════════════════════════════════════════════════════════════
//  FloatingButton — 56px FAB to toggle the chat panel
// ══════════════════════════════════════════════════════════════

import { motion } from 'motion/react';
import { Box } from '@mui/material';
import { MessageSquare, X } from 'lucide-react';
import { C } from '../hooks/constants';

export default function FloatingButton({ isOpen, showNotification, onClick }) {
  return (
    <motion.button
      aria-label={isOpen ? 'Close chatbot panel' : 'Open chatbot panel'}
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      style={{
        width: 56, height: 56, borderRadius: '50%',
        border: 'none', cursor: 'pointer',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        position: 'relative',
        transition: 'all 0.3s ease',
        backgroundColor: isOpen ? C.medium : C.accent,
        color: '#fff',
        boxShadow: isOpen
          ? '0 8px 25px rgba(0,0,0,0.3)'
          : '0 8px 30px rgba(10,169,243,0.4)',
      }}
    >
      {isOpen ? (
        <X size={22} strokeWidth={2.5} />
      ) : (
        <>
          <MessageSquare size={22} strokeWidth={2.5} />
          {showNotification && (
            <>
              <Box sx={{
                position: 'absolute', top: 2, right: 2,
                width: 12, height: 12, borderRadius: '50%',
                bgcolor: '#4ade80', opacity: 0.75,
                animation: 'ping 1.2s cubic-bezier(0,0,0.2,1) infinite',
                '@keyframes ping': {
                  '0%':   { transform: 'scale(1)', opacity: 0.75 },
                  '100%': { transform: 'scale(2)', opacity: 0 },
                },
              }} />
              <Box sx={{
                position: 'absolute', top: 2, right: 2,
                width: 12, height: 12, borderRadius: '50%',
                bgcolor: '#22c55e',
              }} />
            </>
          )}
        </>
      )}
    </motion.button>
  );
}