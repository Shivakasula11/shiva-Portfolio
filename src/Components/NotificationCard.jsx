// ══════════════════════════════════════════════════════════════
//  NotificationCard — "Have questions? Ask Shiva's Bot" popup
// ══════════════════════════════════════════════════════════════

import { motion } from 'motion/react';
import { Box, Typography, IconButton } from '@mui/material';
import { Sparkles, X } from 'lucide-react';
import { C } from '../hooks/Constants';

export default function NotificationCard({ onOpen, onDismiss }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: 15 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.8 }}
      onClick={onOpen}
      style={{ marginBottom: 12, cursor: 'pointer' }}
    >
      <Box sx={{
        display: 'flex', alignItems: 'center',
        gap: { xs: 0.875, sm: 1, md: 1.25 },
        px: { xs: 1.25, sm: 1.5, md: 2 },
        py: { xs: 0.875, sm: 1, md: 1.25 },
        bgcolor: C.mediumAlpha,
        border: '1px solid rgba(10,169,243,0.25)',
        borderRadius: { xs: 2, sm: 2.5, md: 3 },
        boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
        backdropFilter: 'blur(12px)',
        userSelect: 'none',
        transition: 'border-color 0.2s',
        maxWidth: { xs: 'calc(100vw - 2rem)', sm: 'none' },
        '&:hover': { borderColor: 'rgba(10,169,243,0.5)' },
        '@media (max-width: 360px)': {
          px: 1, py: 0.625, gap: 0.625,
          borderRadius: 1.5,
          maxWidth: 'calc(100vw - 1.5rem)',
        },
        '& > svg': {
          width: { xs: 14, sm: 15, md: 16 },
          height: { xs: 14, sm: 15, md: 16 },
          flexShrink: 0,
          '@media (max-width: 360px)': { width: 12, height: 12 },
        },
      }}>
        <Sparkles size={16} color={C.accent} style={{ flexShrink: 0 }} />
        <Typography sx={{
          color: '#e2e8f0',
          fontSize: { xs: '0.68rem', sm: '0.72rem', md: '0.75rem', lg: '0.78rem' },
          fontWeight: 500,
          pr: 0.5,
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          '@media (max-width: 360px)': { fontSize: '0.6rem', pr: 0.25 },
        }}>
          Have questions? Ask Shiva's Bot
        </Typography>
        <IconButton
          size="small"
          onClick={(e) => { e.stopPropagation(); onDismiss(); }}
          aria-label="Close notification"
          sx={{
            p: { xs: 0.2, sm: 0.25 },
            color: C.muted,
            borderRadius: 1,
            flexShrink: 0,
            '&:hover': { color: '#fff', bgcolor: 'rgba(11,18,32,0.4)' },
            '@media (max-width: 360px)': { p: 0.125 },
            '& svg': {
              width: { xs: 12, sm: 13, md: 14 },
              height: { xs: 12, sm: 13, md: 14 },
              '@media (max-width: 360px)': { width: 10, height: 10 },
            },
          }}
        >
          <X size={14} />
        </IconButton>
      </Box>
    </motion.div>
  );
}