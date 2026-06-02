import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowUp } from 'lucide-react';
import { Box, Tooltip } from '@mui/material';

// ── Design tokens ──────────────────────────────────────────────
const C = {
  medium: '#1e3358',
  accent: '#0aa9f3',
  dark:   '#0b1220',
};

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsVisible(window.scrollY > 400);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          whileHover={{ scale: 1.1, y: -2 }}
          whileTap={{ scale: 0.9 }}
          style={{
            position: 'fixed',
            bottom: 96,
            right: 24,
            zIndex: 1300,
          }}
        >
          <Tooltip title="Back to top" placement="left" arrow>
            <Box
              id="scroll-to-top-btn"
              component="button"
              aria-label="Scroll to top"
              onClick={scrollToTop}
              sx={{
                width: { xs: 38, sm: 42, md: 46 },
                height: { xs: 38, sm: 42, md: 46 },
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                bgcolor: C.medium,
                border: `1px solid rgba(10,169,243,0.3)`,
                color: C.accent,
                cursor: 'pointer',
                boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
                outline: 'none',
                transition: 'all 0.3s ease',
                '&:hover': {
                  bgcolor: C.accent,
                  color: C.dark,
                  borderColor: C.accent,
                  boxShadow: '0 8px 24px rgba(10,169,243,0.4)',
                },
                '&:focus-visible': {
                  outline: `2px solid ${C.accent}`,
                  outlineOffset: 2,
                },
                '& svg': {
                  width: { xs: 16, sm: 18, md: 20 },
                  height: { xs: 16, sm: 18, md: 20 },
                },
                '@media (max-width: 240px)': {
                  width: 26,
                  height: 26,
                  '& svg': { width: 12, height: 12 },
                },
                '@media (min-width: 241px) and (max-width: 359px)': {
                  width: 32,
                  height: 32,
                  '& svg': { width: 14, height: 14 },
                },
              }}
            >
              <ArrowUp size={20} strokeWidth={2.5} />
            </Box>
          </Tooltip>
        </motion.div>
      )}
    </AnimatePresence>
  );
}