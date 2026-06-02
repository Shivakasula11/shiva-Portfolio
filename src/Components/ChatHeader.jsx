import { Box, Typography, IconButton, Tooltip } from '@mui/material';
import { Bot, RefreshCw, X } from 'lucide-react';
import { C } from '../hooks/constants';

export default function ChatHeader({ onReset, onClose }) {
  return (
    <Box sx={{
      px: { xs: 1.25, sm: 1.75, md: 2 },
      py: { xs: 1, sm: 1.25, md: 1.5 },
      bgcolor: C.mediumAlpha,
      borderBottom: `1px solid ${C.border}`,
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      flexShrink: 0, userSelect: 'none',
      gap: 1,
      '@media (max-width: 360px)': { px: 1, py: 0.75 },
    }}>
      <Box sx={{
        display: 'flex', alignItems: 'center',
        gap: { xs: 1, sm: 1.25, md: 1.5 },
        minWidth: 0,
        flex: 1,
      }}>
        <Box sx={{ position: 'relative', flexShrink: 0 }}>
          <Box sx={{
            width: { xs: 32, sm: 36, md: 40 },
            height: { xs: 32, sm: 36, md: 40 },
            borderRadius: { xs: 1.25, sm: 1.5, md: 2 },
            background: `linear-gradient(135deg, ${C.accentAlpha}, rgba(10,169,243,0.2))`,
            border: '1px solid rgba(10,169,243,0.35)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: C.accent,
            '@media (max-width: 360px)': { width: 28, height: 28, borderRadius: 1 },
            '& svg': {
              width: { xs: 16, sm: 18, md: 20 },
              height: { xs: 16, sm: 18, md: 20 },
              '@media (max-width: 360px)': { width: 14, height: 14 },
            },
          }}>
            <Bot size={20} />
          </Box>
          <Box sx={{
            position: 'absolute', bottom: -1, right: -1,
            width: { xs: 9, sm: 10, md: 12 },
            height: { xs: 9, sm: 10, md: 12 },
            bgcolor: '#22c55e',
            borderRadius: '50%',
            border: `2px solid ${C.dark}`,
            '@media (max-width: 360px)': { width: 8, height: 8, borderWidth: '1.5px' },
          }} />
        </Box>
        <Box sx={{ minWidth: 0, flex: 1 }}>
          <Typography sx={{
            fontSize: { xs: '0.78rem', sm: '0.82rem', md: '0.875rem', lg: '0.9rem' },
            fontWeight: 600, color: '#fff', letterSpacing: '0.01em',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            '@media (max-width: 360px)': { fontSize: '0.7rem' },
          }}>
            Portfolio Assistant
          </Typography>
          <Box sx={{
            mt: 0.25, display: 'inline-flex', alignItems: 'center',
            px: { xs: 0.5, sm: 0.75 },
            py: 0.25,
            borderRadius: 1,
            bgcolor: C.accentAlpha,
            border: '1px solid rgba(10,169,243,0.2)',
            maxWidth: '100%',
            '@media (max-width: 360px)': { px: 0.4 },
          }}>
            <Typography sx={{
              fontFamily: 'monospace',
              fontSize: { xs: '0.5rem', sm: '0.55rem', md: '0.6rem' },
              fontWeight: 700,
              color: C.accent,
              letterSpacing: { xs: '0.04em', sm: '0.06em', md: '0.08em' },
              textTransform: 'uppercase',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              '@media (max-width: 360px)': { fontSize: '0.45rem', letterSpacing: '0.03em' },
            }}>
              Offline • Instant
            </Typography>
          </Box>
        </Box>
      </Box>

      <Box sx={{
        display: 'flex',
        gap: { xs: 0.25, sm: 0.5 },
        flexShrink: 0,
      }}>
        <Tooltip title="Reset conversation" arrow>
          <IconButton
            size="small"
            onClick={onReset}
            aria-label="Reset chat"
            sx={{
              color: C.muted,
              borderRadius: 1.5,
              p: { xs: 0.5, sm: 0.75 },
              '&:hover': { color: '#fff', bgcolor: 'rgba(11,18,32,0.6)' },
              '@media (max-width: 360px)': { p: 0.375 },
              '& svg': {
                width: { xs: 12, sm: 13, md: 14 },
                height: { xs: 12, sm: 13, md: 14 },
              },
            }}
          >
            <RefreshCw size={14} />
          </IconButton>
        </Tooltip>
        <IconButton
          size="small"
          onClick={onClose}
          aria-label="Close"
          sx={{
            color: C.muted,
            borderRadius: 1.5,
            p: { xs: 0.5, sm: 0.75 },
            '&:hover': { color: '#fff', bgcolor: 'rgba(11,18,32,0.6)' },
            '@media (max-width: 360px)': { p: 0.375 },
            '& svg': {
              width: { xs: 14, sm: 15, md: 16 },
              height: { xs: 14, sm: 15, md: 16 },
            },
          }}
        >
          <X size={16} />
        </IconButton>
      </Box>
    </Box>
  );
}