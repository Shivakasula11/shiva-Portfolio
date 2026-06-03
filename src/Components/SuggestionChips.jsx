// ══════════════════════════════════════════════════════════════
//  SuggestionChips — bottom quick-action chip row
// ══════════════════════════════════════════════════════════════

import { Box, Chip } from '@mui/material';
import { C } from '../hooks/Constants';

const DEFAULT_SUGGESTIONS = [
  { label: '👤 About Me',   text: 'Tell me about yourself.' },
  { label: '🚀 Projects',   text: 'What projects have you built?' },
  { label: '💼 Experience', text: 'Tell me about your experience.' },
  { label: '📞 Contact',    text: 'How can I contact you?' },
];

export default function SuggestionChips({
  suggestions = DEFAULT_SUGGESTIONS,
  isLoading,
  onChipClick,
}) {
  return (
    <Box sx={{
      px: { xs: 1.25, sm: 1.75, md: 2 },
      py: { xs: 1, sm: 1.125, md: 1.25 },
      bgcolor: 'rgba(30,51,88,0.2)',
      borderTop: `1px solid ${C.borderLight}`,
      display: 'flex',
      gap: { xs: 0.5, sm: 0.625, md: 0.75 },
      overflowX: 'auto',
      flexShrink: 0,
      userSelect: 'none',
      '&::-webkit-scrollbar': { display: 'none' },
      msOverflowStyle: 'none',
      scrollbarWidth: 'none',
      '@media (max-width: 360px)': { px: 1, py: 0.75, gap: 0.4 },
    }}>
      {suggestions.map((s, idx) => (
        <Chip
          key={idx}
          label={s.label}
          size="small"
          disabled={isLoading}
          onClick={() => onChipClick(s.text)}
          sx={{
            height: { xs: 24, sm: 26, md: 28 },
            fontSize: { xs: '0.6rem', sm: '0.65rem', md: '0.68rem', lg: '0.7rem' },
            fontWeight: 500,
            color: '#94a3b8',
            bgcolor: C.medium,
            border: `1px solid ${C.border}`,
            borderRadius: '999px',
            whiteSpace: 'nowrap',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            flexShrink: 0,
            '&:hover':  { bgcolor: C.accent, color: '#fff', borderColor: C.accent },
            '&:active': { transform: 'scale(0.95)' },
            '& .MuiChip-label': { px: { xs: 0.875, sm: 1.125, md: 1.25 } },
            '@media (max-width: 360px)': {
              height: 22,
              fontSize: '0.55rem',
              '& .MuiChip-label': { px: 0.75 },
            },
          }}
        />
      ))}
    </Box>
  );
}