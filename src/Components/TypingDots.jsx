import { Box } from '@mui/material';
import { C } from '../hooks/constants';

export default function TypingDots() {
  return (
    <Box sx={{
      display: 'flex',
      alignItems: 'center',
      gap: { xs: '3px', sm: '4px', md: '5px' },
      py: 0.5,
      '@media (max-width: 360px)': { gap: '2.5px' },
    }}>
      {[0, 1, 2].map((i) => (
        <Box
          key={i}
          sx={{
            width:  { xs: 5, sm: 6, md: 7 },
            height: { xs: 5, sm: 6, md: 7 },
            borderRadius: '50%',
            bgcolor: C.accent,
            animation: 'dotBounce 1.2s infinite ease-in-out',
            animationDelay: `${i * 0.15}s`,
            '@keyframes dotBounce': {
              '0%, 80%, 100%': { transform: 'translateY(0)', opacity: 0.4 },
              '40%':           { transform: 'translateY(-5px)', opacity: 1 },
            },
            '@media (max-width: 360px)': { width: 4, height: 4 },
          }}
        />
      ))}
    </Box>
  );
}