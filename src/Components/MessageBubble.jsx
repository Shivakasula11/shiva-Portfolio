import { useState, useRef, useEffect } from 'react';
import { Box, Typography, Chip, IconButton, InputBase, Tooltip } from '@mui/material';
import { Bot, User, Pencil, Check, X } from 'lucide-react';
import { C } from '../hooks/Constants';

// ── auto-link URLs and emails inside a plain-text segment ─────
function autoLinkText(text, keyPrefix) {
  // URL first (greedier) then email
  const re = /(https?:\/\/[^\s)]+)|([a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/g;
  const out = [];
  let last = 0;
  let m;
  let i = 0;
  while ((m = re.exec(text)) !== null) {
    if (m.index > last) out.push(text.slice(last, m.index));
    const isEmail = !m[1];
    const display = isEmail ? m[2] : m[1];
    const href = isEmail ? `mailto:${m[2]}` : m[1];
    out.push(
      <Box
        component="a"
        key={`${keyPrefix}-link-${i++}`}
        href={href}
        target={isEmail ? undefined : '_blank'}
        rel={isEmail ? undefined : 'noopener noreferrer'}
        sx={{
          color: C.accent,
          textDecoration: 'underline',
          textDecorationColor: 'rgba(10,169,243,0.5)',
          textUnderlineOffset: '2px',
          wordBreak: 'break-all',
          transition: 'color 0.15s ease',
          '&:hover': { color: '#7dd3fc', textDecorationColor: '#7dd3fc' },
        }}
      >
        {display}
      </Box>
    );
    last = re.lastIndex;
  }
  if (last < text.length) out.push(text.slice(last));
  return out.length > 0 ? out : [text];
}

// ── tiny markdown-lite renderer (bold + bullets + auto-links) ─
function parseMessageText(text) {
  if (!text) return null;
  const lines = text.split('\n');
  return lines.map((line, i) => {
    let trimmed = line.trim();
    const isBullet = trimmed.startsWith('- ') || trimmed.startsWith('* ');
    if (isBullet) trimmed = trimmed.substring(2);
    const boldRegex = /\*\*(.*?)\*\*/g;
    const parts = []; let lastIndex = 0; let match;
    while ((match = boldRegex.exec(trimmed)) !== null) {
      if (match.index > lastIndex) {
        parts.push(...autoLinkText(trimmed.substring(lastIndex, match.index), `${i}-pre${match.index}`));
      }
      parts.push(
        <Box component="strong" key={`${i}-b-${match.index}`}
             sx={{ fontWeight: 700, color: 'rgba(255,255,255,0.95)' }}>
          {autoLinkText(match[1], `${i}-bin${match.index}`)}
        </Box>
      );
      lastIndex = boldRegex.lastIndex;
    }
    if (lastIndex < trimmed.length) {
      parts.push(...autoLinkText(trimmed.substring(lastIndex), `${i}-post`));
    }
    const content = parts.length > 0 ? parts : autoLinkText(trimmed, `${i}-only`);
    const sharedSx = {
      fontSize: { xs: '0.7rem', sm: '0.78rem', md: '0.8rem', lg: '0.825rem', xl: '0.85rem' },
      lineHeight: { xs: 1.55, sm: 1.65, md: 1.7 },
      color: 'rgba(203,213,225,0.9)',
      wordBreak: 'break-word',
      '@media (max-width: 360px)': {
        fontSize: '0.62rem',
        lineHeight: 1.45,
      },
    };
    return isBullet
      ? <Box component="li" key={i} sx={{
          ...sharedSx,
          mb: 0.5,
          ml: { xs: 1.5, sm: 2 },
          listStyleType: 'disc',
          '@media (max-width: 360px)': { ml: 1, mb: 0.25 },
        }}>{content}</Box>
      : <Typography key={i} component="p" sx={{
          ...sharedSx,
          mb: i < lines.length - 1 ? { xs: 0.5, sm: 1 } : 0,
        }}>{content}</Typography>;
  });
}

// ── inline editor for user messages ───────────────────────────
function MessageEditor({ initialText, onSave, onCancel, isLoading }) {
  const [draft, setDraft] = useState(initialText);
  const inputRef = useRef(null);
  useEffect(() => { setTimeout(() => inputRef.current?.focus(), 0); }, []);

  const trySave = () => {
    const t = draft.trim();
    if (!t || isLoading) return;
    if (t === initialText.trim()) { onCancel(); return; }
    onSave(t);
  };
  const onKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); trySave(); }
    else if (e.key === 'Escape')          { e.preventDefault(); onCancel(); }
  };

  return (
    <Box sx={{
      display: 'flex', flexDirection: 'column',
      gap: { xs: 0.5, sm: 0.75 },
      px: { xs: 1.25, sm: 1.5 },
      py: { xs: 1, sm: 1.25 },
      minWidth: { xs: 160, sm: 200, md: 220 },
      borderRadius: '16px 4px 16px 16px',
      bgcolor: 'rgba(10,169,243,0.18)',
      border: `1px solid ${C.accent}`,
      '@media (max-width: 360px)': {
        px: 1,
        py: 0.75,
        minWidth: 130,
        borderRadius: '12px 4px 12px 12px',
      },
    }}>
      <InputBase
        inputRef={inputRef}
        value={draft}
        multiline
        maxRows={6}
        onChange={(e) => setDraft(e.target.value)}
        onKeyDown={onKeyDown}
        sx={{
          fontSize: { xs: '0.7rem', sm: '0.78rem', md: '0.8rem', lg: '0.825rem' },
          color: '#fff',
          lineHeight: { xs: 1.4, sm: 1.5 },
          '& textarea': { padding: 0 },
          '@media (max-width: 360px)': {
            fontSize: '0.62rem',
            lineHeight: 1.35,
          },
        }}
      />
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 0.5 }}>
        <Tooltip title="Cancel (Esc)" arrow>
          <IconButton size="small" onClick={onCancel} aria-label="Cancel edit"
                      sx={{
                        color: '#fff',
                        p: { xs: 0.375, sm: 0.5 },
                        '&:hover': { bgcolor: 'rgba(255,255,255,0.15)' },
                      }}>
            <X size={14} />
          </IconButton>
        </Tooltip>
        <Tooltip title="Save (Enter)" arrow>
          <IconButton size="small" onClick={trySave} disabled={!draft.trim() || isLoading}
                      aria-label="Save edit"
                      sx={{
                        color: '#fff',
                        p: { xs: 0.375, sm: 0.5 },
                        '&:hover':    { bgcolor: 'rgba(255,255,255,0.15)' },
                        '&:disabled': { opacity: 0.4 },
                      }}>
            <Check size={14} />
          </IconButton>
        </Tooltip>
      </Box>
    </Box>
  );
}

// ── main bubble ───────────────────────────────────────────────
export default function MessageBubble({
  msg,
  isEditing,
  isLoading,
  onStartEdit,
  onSaveEdit,
  onCancelEdit,
  onSuggestionClick,
}) {
  const isBot = msg.role !== 'user';
  const [hover, setHover] = useState(false);

  return (
    <Box
      sx={{
        display: 'flex',
        gap: { xs: 0.75, sm: 1, md: 1.25 },
        maxWidth: { xs: '94%', sm: '90%', md: '88%' },
        ...(isBot ? { mr: 'auto' } : { ml: 'auto', flexDirection: 'row-reverse' }),
        '@media (max-width: 360px)': {
          gap: 0.5,
          maxWidth: '96%',
        },
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <Box sx={{
        width: { xs: 26, sm: 30, md: 32 },
        height: { xs: 26, sm: 30, md: 32 },
        borderRadius: { xs: 1, sm: 1.25, md: 1.5 },
        flexShrink: 0,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        border: '1px solid',
        ...(isBot
          ? { bgcolor: C.medium, color: C.accent, borderColor: C.border }
          : { bgcolor: C.accent, color: '#fff', borderColor: 'rgba(10,169,243,0.8)' }),
        '@media (max-width: 360px)': {
          width: 22,
          height: 22,
          borderRadius: 0.75,
        },
        '& svg': {
          width: { xs: 13, sm: 15, md: 16 },
          height: { xs: 13, sm: 15, md: 16 },
          '@media (max-width: 360px)': { width: 11, height: 11 },
        },
      }}>
        {isBot ? <Bot size={16} /> : <User size={16} />}
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'column', minWidth: 0, flex: '0 1 auto' }}>
        {isEditing ? (
          <MessageEditor
            initialText={msg.text}
            onSave={(t) => onSaveEdit(msg.id, t)}
            onCancel={onCancelEdit}
            isLoading={isLoading}
          />
        ) : (
          <Box sx={{
            px: { xs: 1.25, sm: 1.5, md: 1.75 },
            py: { xs: 0.875, sm: 1, md: 1.25 },
            borderRadius: isBot
              ? { xs: '3px 12px 12px 12px', sm: '4px 14px 14px 14px', md: '4px 16px 16px 16px' }
              : { xs: '12px 3px 12px 12px', sm: '14px 4px 14px 14px', md: '16px 4px 16px 16px' },
            position: 'relative',
            ...(isBot
              ? { bgcolor: 'rgba(30,51,88,0.4)', color: C.text, border: `1px solid ${C.borderLight}` }
              : { bgcolor: C.accent, color: '#fff', boxShadow: '0 4px 12px rgba(10,169,243,0.2)' }),
            '@media (max-width: 360px)': {
              px: 1,
              py: 0.75,
            },
          }}>
            {isBot
              ? parseMessageText(msg.text)
              : <Typography sx={{
                  fontSize: { xs: '0.7rem', sm: '0.78rem', md: '0.8rem', lg: '0.825rem', xl: '0.85rem' },
                  lineHeight: { xs: 1.5, sm: 1.6, md: 1.65 },
                  whiteSpace: 'pre-wrap',
                  wordBreak: 'break-word',
                  '@media (max-width: 360px)': {
                    fontSize: '0.62rem',
                    lineHeight: 1.4,
                  },
                }}>
                  {msg.text}
                </Typography>}

            {!isBot && hover && !isLoading && (
              <Tooltip title="Edit message" arrow placement="left">
                <IconButton
                  size="small"
                  onClick={() => onStartEdit(msg.id)}
                  aria-label="Edit message"
                  sx={{
                    position: 'absolute',
                    top: { xs: -8, sm: -10 },
                    left: { xs: -10, sm: -12 },
                    width: { xs: 20, sm: 22 },
                    height: { xs: 20, sm: 22 },
                    bgcolor: C.dark, color: '#fff',
                    border: `1px solid ${C.accent}`,
                    '&:hover': { bgcolor: C.accent },
                    '@media (max-width: 360px)': { width: 18, height: 18, top: -7, left: -8 },
                  }}
                >
                  <Pencil size={11} />
                </IconButton>
              </Tooltip>
            )}

            {isBot && msg.suggestions && msg.suggestions.length > 0 && (
              <Box sx={{
                mt: { xs: 1, sm: 1.25 },
                display: 'flex',
                flexWrap: 'wrap',
                gap: { xs: 0.5, sm: 0.625, md: 0.75 },
              }}>
                {msg.suggestions.map((s, idx) => (
                  <Chip
                    key={idx}
                    label={s.label}
                    size="small"
                    disabled={isLoading}
                    onClick={() => onSuggestionClick(s.query)}
                    sx={{
                      height: { xs: 22, sm: 24, md: 26 },
                      fontSize: { xs: '0.58rem', sm: '0.62rem', md: '0.65rem', lg: '0.68rem' },
                      fontWeight: 500,
                      color: C.accent,
                      bgcolor: 'rgba(10,169,243,0.1)',
                      border: '1px solid rgba(10,169,243,0.35)',
                      borderRadius: '999px',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      '&:hover':  { bgcolor: C.accent, color: '#fff', borderColor: C.accent },
                      '&:active': { transform: 'scale(0.95)' },
                      '& .MuiChip-label': { px: { xs: 0.75, sm: 1 } },
                      '@media (max-width: 360px)': {
                        height: 20,
                        fontSize: '0.55rem',
                        '& .MuiChip-label': { px: 0.625 },
                      },
                    }}
                  />
                ))}
              </Box>
            )}
          </Box>
        )}

        {!isEditing && (
          <Typography sx={{
            fontSize: { xs: '0.5rem', sm: '0.53rem', md: '0.55rem' },
            color: C.muted,
            mt: { xs: 0.375, sm: 0.5 },
            fontFamily: 'monospace',
            ...(isBot ? { pl: 0.5 } : { textAlign: 'right', pr: 0.5 }),
            '@media (max-width: 360px)': {
              fontSize: '0.45rem',
              mt: 0.25,
            },
          }}>
            {msg.timestamp}{msg.edited ? ' • edited' : ''}
          </Typography>
        )}
      </Box>
    </Box>
  );
}