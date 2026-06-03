import { useState } from 'react';
import { Box, Typography, InputBase } from '@mui/material';
import { Send } from 'lucide-react';
import { C } from '../hooks/Constants';

export default function ChatInput({ inputRef, isLoading, onSubmit }) {
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const text = message.trim();
    if (!text || isLoading) return;
    onSubmit(text);
    setMessage('');
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{
      px: { xs: 1.25, sm: 1.5, md: 1.75 },
      py: { xs: 1, sm: 1.25, md: 1.5 },
      bgcolor: C.mediumAlpha,
      borderTop: `1px solid ${C.border}`,
      display: 'flex', alignItems: 'center',
      gap: { xs: 0.625, sm: 0.875, md: 1 },
      flexShrink: 0,
      '@media (max-width: 360px)': { px: 1, py: 0.75, gap: 0.5 },
    }}>
      <Box sx={{
        flex: 1,
        minWidth: 0,
        display: 'flex',
        alignItems: 'center',
        bgcolor: C.darkAlpha,
        border: `1px solid ${C.border}`,
        borderRadius: { xs: 2, sm: 2.25, md: 2.5 },
        px: { xs: 1.25, sm: 1.5, md: 1.75 },
        height: { xs: 38, sm: 42, md: 44 },
        transition: 'border-color 0.2s',
        '&:focus-within': { borderColor: 'rgba(10,169,243,0.8)' },
        '&:hover':        { borderColor: C.medium },
        '@media (max-width: 360px)': {
          height: 34,
          px: 1,
          borderRadius: 1.75,
        },
      }}>
        <InputBase
          inputRef={inputRef}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Ask about skills, projects, contact..."
          disabled={isLoading}
          sx={{
            flex: 1,
            minWidth: 0,
            fontSize: { xs: '0.72rem', sm: '0.78rem', md: '0.8rem', lg: '0.825rem' },
            color: '#f1f5f9',
            '& input::placeholder': { color: C.muted, opacity: 1 },
            '& input:disabled':     { opacity: 0.5 },
            '@media (max-width: 360px)': { fontSize: '0.65rem' },
          }}
        />
        <Typography sx={{
          display: { xs: 'none', md: 'block' },
          fontFamily: 'monospace',
          fontSize: { md: '0.55rem', lg: '0.58rem' },
          color: C.muted,
          bgcolor: 'rgba(30,51,88,0.8)',
          border: `1px solid ${C.border}`,
          px: 0.75, py: 0.25,
          borderRadius: 0.75,
          userSelect: 'none',
          flexShrink: 0,
          ml: 0.5,
        }}>
          Enter
        </Typography>
      </Box>

      <Box
        component="button"
        type="submit"
        disabled={!message.trim() || isLoading}
        aria-label="Send message"
        sx={{
          width:  { xs: 38, sm: 42, md: 44 },
          height: { xs: 38, sm: 42, md: 44 },
          borderRadius: { xs: 2, sm: 2.25, md: 2.5 },
          bgcolor: C.accent,
          border: 'none',
          color: '#fff',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          cursor: 'pointer',
          flexShrink: 0,
          transition: 'all 0.2s ease',
          '&:hover:not(:disabled)':  { opacity: 0.9, transform: 'scale(1.04)', boxShadow: '0 4px 16px rgba(10,169,243,0.35)' },
          '&:active:not(:disabled)': { transform: 'scale(0.96)' },
          '&:disabled':              { opacity: 0.35, cursor: 'not-allowed' },
          '@media (max-width: 360px)': { width: 34, height: 34, borderRadius: 1.75 },
          '& svg': {
            width: { xs: 14, sm: 15, md: 16 },
            height: { xs: 14, sm: 15, md: 16 },
            '@media (max-width: 360px)': { width: 12, height: 12 },
          },
        }}
      >
        <Send size={16} />
      </Box>
    </Box>
  );
}