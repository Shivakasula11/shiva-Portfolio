import { useRef, useEffect } from 'react';
import { Box } from '@mui/material';
import { Bot } from 'lucide-react';
import { C } from '../hooks/constants';
import MessageBubble from './MessageBubble';
import TypingDots from './TypingDots';

export default function MessageList({
  messages,
  isLoading,
  editingMessageId,
  onStartEdit,
  onSaveEdit,
  onCancelEdit,
  onSuggestionClick,
}) {
  const endRef = useRef(null);
  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  return (
    <Box sx={{
      flex: 1,
      overflowY: 'auto',
      overflowX: 'hidden',
      px: { xs: 1.25, sm: 1.75, md: 2 },
      py: { xs: 1.25, sm: 1.75, md: 2 },
      display: 'flex',
      flexDirection: 'column',
      gap: { xs: 1.25, sm: 1.75, md: 2 },
      '&::-webkit-scrollbar':       { width: { xs: 3, sm: 4 } },
      '&::-webkit-scrollbar-track': { bgcolor: 'transparent' },
      '&::-webkit-scrollbar-thumb': { bgcolor: C.medium, borderRadius: 2 },
      '@media (max-width: 360px)': { px: 1, py: 1, gap: 1 },
    }}>
      {messages.map((msg) => (
        <MessageBubble
          key={msg.id}
          msg={msg}
          isEditing={msg.id === editingMessageId}
          isLoading={isLoading}
          onStartEdit={onStartEdit}
          onSaveEdit={onSaveEdit}
          onCancelEdit={onCancelEdit}
          onSuggestionClick={onSuggestionClick}
        />
      ))}

      {isLoading && (
        <Box sx={{
          display: 'flex',
          gap: { xs: 0.75, sm: 1, md: 1.25 },
          mr: 'auto',
          maxWidth: { xs: '92%', sm: '88%', md: '85%' },
          '@media (max-width: 360px)': { gap: 0.5, maxWidth: '96%' },
        }}>
          <Box sx={{
            width:  { xs: 26, sm: 30, md: 32 },
            height: { xs: 26, sm: 30, md: 32 },
            borderRadius: { xs: 1, sm: 1.25, md: 1.5 },
            flexShrink: 0,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            bgcolor: C.medium, color: C.accent, border: `1px solid ${C.border}`,
            '@media (max-width: 360px)': { width: 22, height: 22, borderRadius: 0.75 },
            '& svg': {
              width: { xs: 13, sm: 15, md: 16 },
              height: { xs: 13, sm: 15, md: 16 },
              '@media (max-width: 360px)': { width: 11, height: 11 },
            },
          }}>
            <Bot size={16} />
          </Box>
          <Box sx={{
            px: { xs: 1.25, sm: 1.5, md: 1.75 },
            py: { xs: 0.875, sm: 1, md: 1.25 },
            borderRadius: { xs: '3px 12px 12px 12px', sm: '4px 14px 14px 14px', md: '4px 16px 16px 16px' },
            bgcolor: 'rgba(30,51,88,0.25)', border: `1px solid ${C.borderLight}`,
            '@media (max-width: 360px)': { px: 1, py: 0.75 },
          }}>
            <TypingDots />
          </Box>
        </Box>
      )}

      <div ref={endRef} />
    </Box>
  );
}