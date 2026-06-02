import { motion, AnimatePresence } from 'motion/react';
import { Box } from '@mui/material';

import { C } from '../hooks/Constants';

import useUserName     from '../hooks/useUserName';
import useChatUI       from '../hooks/useChatUI';
import useChatMessages from '../hooks/useChatMessages';

import ChatHeader       from './ChatHeader';
import MessageList      from './MessageList';
import SuggestionChips  from './SuggestionChips';
import ChatInput        from './ChatInput';
import FloatingButton   from './FloatingButton';
import NotificationCard from './NotificationCard';

export default function AIChatBot() {
  // Name state (persisted in localStorage)
  const { userName, setUserName, clearUserName } = useUserName();

  // UI state — open/close, notification, ESC handler, input focus
  const {
    isOpen,
    showNotification,
    inputRef,
    togglePanel,
    closePanel,
    dismissNotification,
  } = useChatUI();

  // Conversation state — messages, send, edit, reset
  const {
    messages,
    isLoading,
    editingMessageId,
    sendMessage,
    editMessage,
    startEdit,
    cancelEdit,
    resetChat,
  } = useChatMessages({ userName, setUserName, clearUserName });

  return (
    <Box sx={{
      position: 'fixed',
      bottom: { xs: 14, sm: 20, md: 24, lg: 28 },
      right:  { xs: 14, sm: 20, md: 24, lg: 28 },
      zIndex: 1400,
      display: 'flex', flexDirection: 'column', alignItems: 'flex-end',
      fontFamily: 'sans-serif',
      '@media (max-width: 360px)': { bottom: 8, right: 8 },
    }}>
      {/* "Have questions?" notification card */}
      <AnimatePresence>
        {showNotification && !isOpen && (
          <NotificationCard
            onOpen={togglePanel}
            onDismiss={dismissNotification}
          />
        )}
      </AnimatePresence>

      {/* Main chat panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.94 }}
            animate={{ opacity: 1, y: 0,  scale: 1 }}
            exit=   {{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            style={{ marginBottom: 16 }}
          >
            <Box sx={{
              width: {
                xs: 'calc(100vw - 1.75rem)',
                sm: 360,
                md: 390,
                lg: 410,
                xl: 440,
              },
              height: {
                xs: 'min(560px, 82vh)',
                sm: 580,
                md: 600,
                lg: 620,
              },
              maxHeight: { xs: '82vh', sm: '80vh', md: '78vh' },
              bgcolor: C.darkAlpha,
              backdropFilter: 'blur(16px)',
              border: `1px solid ${C.border}`,
              borderRadius: { xs: 2.5, sm: 3, md: 4 },
              boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
              overflow: 'hidden',
              display: 'flex', flexDirection: 'column',
              '@media (max-width: 360px)': {
                width: 'calc(100vw - 1rem)',
                height: 'min(500px, 88vh)',
                maxHeight: '88vh',
                borderRadius: 2,
              },
            }}>
              <ChatHeader onReset={resetChat} onClose={closePanel} />

              <MessageList
                messages={messages}
                isLoading={isLoading}
                editingMessageId={editingMessageId}
                onStartEdit={startEdit}
                onSaveEdit={editMessage}
                onCancelEdit={cancelEdit}
                onSuggestionClick={sendMessage}
              />

              <SuggestionChips
                isLoading={isLoading}
                onChipClick={sendMessage}
              />

              <ChatInput
                inputRef={inputRef}
                isLoading={isLoading}
                onSubmit={sendMessage}
              />
            </Box>
          </motion.div>
        )}
      </AnimatePresence>

      <FloatingButton
        isOpen={isOpen}
        showNotification={showNotification}
        onClick={togglePanel}
      />
    </Box>
  );
}