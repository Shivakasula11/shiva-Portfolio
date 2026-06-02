import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  GitBranch,
  ExternalLink,
  Cpu,
  Check,
  PlayCircle,
  Globe,
  Code2,
} from 'lucide-react';
import {
  Box,
  Typography,
  IconButton,
  Chip,
  Button,
} from '@mui/material';

/* ── Design tokens ──────────────────────────────────────────── */
const C = {
  dark:       '#0a0f1a',
  card:       '#0d1321',
  accent:     '#0ea5e9',
  accentSoft: 'rgba(14,165,233,0.10)',
  border:     'rgba(30,51,88,0.5)',
  borderSoft: 'rgba(30,51,88,0.3)',
  text:       '#c8d5e3',
  muted:      '#5a6a80',
  white:      '#f0f4f8',
};

const HIGHLIGHTS = [
  'Responsive, mobile-first layout architecture',
  'Optimized asset delivery & lazy loading',
  'Clean component hierarchy & reusable modules',
  'Seamless API integration & error handling',
];

/* ── Placeholder for missing images ─────────────────────────── */
function ModalPlaceholder({ name }) {
  return (
    <Box
      sx={{
        width: '100%',
        height: '100%',
        background: 'linear-gradient(135deg, #0c1929 0%, #0f2847 50%, #0a1e38 100%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 1.5,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'radial-gradient(rgba(14,165,233,0.07) 1px, transparent 1px)',
          backgroundSize: '20px 20px',
          pointerEvents: 'none',
        }}
      />

      <Box
        sx={{
          width: { xs: 40, sm: 48, md: 56 },
          height: { xs: 40, sm: 48, md: 56 },
          borderRadius: { xs: '12px', md: '16px' },
          bgcolor: 'rgba(14,165,233,0.08)',
          border: '1px solid rgba(14,165,233,0.15)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          zIndex: 1,
        }}
      >
        <Code2 size={28} color={C.accent} strokeWidth={1.5} />
      </Box>

      <Typography
        sx={{
          fontFamily: '"JetBrains Mono", monospace',
          fontSize: { xs: '0.55rem', md: '0.7rem' },
          fontWeight: 600,
          color: 'rgba(14,165,233,0.35)',
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          textAlign: 'center',
          px: { xs: 2, md: 4 },
          position: 'relative',
          zIndex: 1,
        }}
      >
        {name}
      </Typography>
    </Box>
  );
}

/* ═══════════════════════════════════════════════════════════════
   PROJECT MODAL
   ═══════════════════════════════════════════════════════════════ */
export default function ProjectModal({ project, onClose, onShowToast }) {
  const [imgError, setImgError] = useState(false);

  if (!project) return null;

  const showPlaceholder = !project.imageUrl || imgError;

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  return (
    <AnimatePresence>
      <Box
        sx={{
          position: 'fixed',
          inset: 0,
          zIndex: 1500,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          p: { xs: 0.5, sm: 1.5, md: 2 },
          '@media (max-width: 240px)': { p: 0.25 },
        }}
      >
        {/* ── Backdrop ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={onClose}
          style={{
            position: 'absolute',
            inset: 0,
            background: 'rgba(5,8,18,0.88)',
            backdropFilter: 'blur(8px)',
          }}
        />

        {/* ── Panel ── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 24 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 24 }}
          transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
          style={{
            position: 'relative',
            width: '100%',
            maxWidth: 720,
            zIndex: 10,
          }}
        >
          <Box
            sx={{
              bgcolor: C.card,
              borderRadius: { xs: '14px', sm: '18px', md: '24px' },
              border: `1px solid ${C.border}`,
              boxShadow: '0 40px 100px -20px rgba(0,0,0,0.7)',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              maxHeight: { xs: '95vh', sm: '90vh' },
              '@media (max-width: 240px)': { borderRadius: '8px' },
            }}
          >
            {/* ── Hero image ── */}
            <Box sx={{ position: 'relative', flexShrink: 0 }}>
              <Box
                sx={{
                  width: '100%',
                  /* 🔧 CHANGE 1/2: hero height — kept generous for taller screenshots */
                  height: { xs: 170, sm: 240, md: 320 },
                  overflow: 'hidden',
                  position: 'relative',
                  bgcolor: '#000',
                  '@media (max-width: 240px)': { height: 90 },
                  '@media (min-width: 241px) and (max-width: 359px)': { height: 130 },
                }}
              >
               {showPlaceholder ? (
  <ModalPlaceholder name={project.name} />
) : (() => {
  // 🔧 Per-project fit & position with safe defaults
  const fit      = project.imageFit      || 'cover';        // 'cover' | 'contain'
  const position = project.imagePosition || 'top center';
  const useBackdrop = fit === 'contain';                    // backdrop only helps in contain mode

  return (
    <>
      {/* Blurred backdrop — only when contain, fills the gutters with a
          color-matched glow so the image never looks "floating in a void". */}
      {useBackdrop && (
        <Box
          component="img"
          src={project.imageUrl}
          alt=""
          aria-hidden="true"
          sx={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            filter: 'blur(28px) brightness(0.55) saturate(1.1)',
            transform: 'scale(1.15)',
            pointerEvents: 'none',
            userSelect: 'none',
          }}
        />
      )}

      {/* Foreground image */}
      <Box
        component="img"
        src={project.imageUrl}
        alt={project.name}
        onError={() => setImgError(true)}
        sx={{
          position: 'relative',
          zIndex: 1,
          width: '100%',
          height: '100%',
          objectFit: fit,
          objectPosition: position,
          display: 'block',
        }}
      />
    </>
  );
})()}

                {/* Gradient fade into card */}
                <Box
                  sx={{
                    position: 'absolute',
                    inset: 0,
                    zIndex: 2,
                    background: `linear-gradient(to top, ${C.card} 0%, rgba(13,19,33,0.25) 40%, transparent 100%)`,
                    pointerEvents: 'none',
                  }}
                />
              </Box>

              {/* Category pill */}
              <Box sx={{
                position: 'absolute',
                top: { xs: 10, md: 16 },
                left: { xs: 12, md: 20 },
                zIndex: 3,
              }}>
                <Chip
                  label={project.category}
                  size="small"
                  sx={{
                    fontFamily: '"JetBrains Mono", monospace',
                    fontSize: { xs: '0.48rem', sm: '0.52rem', md: '0.58rem' },
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                    color: C.white,
                    bgcolor: 'rgba(0,0,0,0.45)',
                    backdropFilter: 'blur(12px)',
                    border: '1px solid rgba(255,255,255,0.10)',
                    borderRadius: '999px',
                    height: { xs: 20, sm: 23, md: 26 },
                    '& .MuiChip-label': { px: { xs: 1, md: 1.5 } },
                    '@media (max-width: 240px)': { fontSize: '0.38rem', height: 16 },
                  }}
                />
              </Box>

              {/* Close button */}
              <IconButton
                onClick={onClose}
                aria-label="Close"
                size="small"
                sx={{
                  position: 'absolute',
                  top: { xs: 8, md: 14 },
                  right: { xs: 8, md: 14 },
                  zIndex: 3,
                  width: { xs: 28, sm: 32, md: 36 },
                  height: { xs: 28, sm: 32, md: 36 },
                  bgcolor: 'rgba(0,0,0,0.4)',
                  backdropFilter: 'blur(8px)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  color: 'rgba(255,255,255,0.7)',
                  transition: 'all 0.2s ease',
                  '&:hover': { bgcolor: 'rgba(0,0,0,0.65)', color: '#fff' },
                  '@media (max-width: 240px)': { width: 22, height: 22, top: 4, right: 4 },
                }}
              >
                <X size={16} />
              </IconButton>
            </Box>

            {/* ── Scrollable body ── */}
            <Box
              sx={{
                px: { xs: 2, sm: 3, md: 4 },
                pb: { xs: 2, sm: 3, md: 4 },
                pt: 1,
                display: 'flex',
                flexDirection: 'column',
                gap: { xs: 2, sm: 2.5, md: 3.5 },
                overflowY: 'auto',
                flex: 1,
                '&::-webkit-scrollbar': { width: 4 },
                '&::-webkit-scrollbar-track': { bgcolor: 'transparent' },
                '&::-webkit-scrollbar-thumb': {
                  bgcolor: 'rgba(30,51,88,0.5)',
                  borderRadius: 2,
                },
                '@media (max-width: 240px)': { px: 1, pb: 1, gap: 1.25 },
                '@media (min-width: 241px) and (max-width: 359px)': { px: 1.5, pb: 1.5, gap: 1.5 },
              }}
            >
              {/* ── Title ── */}
              <Box>
                <Typography
                  variant="h4"
                  sx={{
                    fontWeight: 900,
                    color: C.white,
                    fontSize: { xs: '1.15rem', sm: '1.5rem', md: '2rem' },
                    lineHeight: 1.2,
                    letterSpacing: '-0.025em',
                    mb: { xs: 0.75, md: 1.5 },
                    '@media (max-width: 240px)': { fontSize: '0.75rem', mb: 0.5 },
                    '@media (min-width: 241px) and (max-width: 359px)': { fontSize: '0.9rem' },
                  }}
                >
                  {project.name}
                </Typography>

                <Typography
                  sx={{
                    color: C.text,
                    fontSize: { xs: '0.75rem', sm: '0.85rem', md: '0.95rem' },
                    lineHeight: { xs: 1.65, md: 1.85 },
                    '@media (max-width: 240px)': { fontSize: '0.45rem', lineHeight: 1.5 },
                    '@media (min-width: 241px) and (max-width: 359px)': { fontSize: '0.58rem' },
                  }}
                >
                  {project.description}
                </Typography>
              </Box>

              {/* ── Highlights ── */}
              <Box>
                <Box sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 0.75,
                  mb: { xs: 1.25, md: 2 },
                }}>
                  <Cpu size={14} color={C.accent} />
                  <Typography
                    sx={{
                      fontFamily: '"JetBrains Mono", monospace',
                      fontSize: { xs: '0.55rem', md: '0.65rem' },
                      fontWeight: 700,
                      textTransform: 'uppercase',
                      letterSpacing: '0.12em',
                      color: C.muted,
                      '@media (max-width: 240px)': { fontSize: '0.4rem' },
                    }}
                  >
                    Key Highlights
                  </Typography>
                </Box>

                <Box
                  sx={{
                    display: 'grid',
                    gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
                    gap: { xs: 1, md: 1.25 },
                    '@media (max-width: 240px)': { gap: 0.5 },
                  }}
                >
                  {HIGHLIGHTS.map((h, i) => (
                    <Box
                      key={i}
                      sx={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: { xs: 0.75, md: 1 },
                        p: { xs: 1, sm: 1.25, md: 1.5 },
                        borderRadius: { xs: '8px', md: '12px' },
                        bgcolor: C.accentSoft,
                        border: `1px solid ${C.borderSoft}`,
                        '@media (max-width: 240px)': { p: 0.5, gap: 0.5, borderRadius: '4px' },
                      }}
                    >
                      <Box
                        sx={{
                          mt: '2px',
                          width: { xs: 14, md: 18 },
                          height: { xs: 14, md: 18 },
                          borderRadius: '50%',
                          bgcolor: 'rgba(14,165,233,0.15)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0,
                          '@media (max-width: 240px)': { width: 10, height: 10 },
                        }}
                      >
                        <Check size={11} color={C.accent} strokeWidth={3} />
                      </Box>
                      <Typography sx={{
                        color: C.text,
                        fontSize: { xs: '0.68rem', sm: '0.72rem', md: '0.78rem' },
                        lineHeight: { xs: 1.45, md: 1.55 },
                        '@media (max-width: 240px)': { fontSize: '0.4rem', lineHeight: 1.35 },
                        '@media (min-width: 241px) and (max-width: 359px)': { fontSize: '0.52rem' },
                      }}>
                        {h}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              </Box>

              {/* ── Tech stack ── */}
              <Box>
                <Typography
                  sx={{
                    fontFamily: '"JetBrains Mono", monospace',
                    fontSize: { xs: '0.55rem', md: '0.65rem' },
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.12em',
                    color: C.muted,
                    mb: { xs: 1, md: 1.5 },
                    '@media (max-width: 240px)': { fontSize: '0.4rem', mb: 0.5 },
                  }}
                >
                  Tech Stack
                </Typography>

                <Box sx={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: { xs: 0.5, md: 0.75 },
                }}>
                  {project.techStack.map((tech) => (
                    <Chip
                      key={tech}
                      label={tech}
                      size="small"
                      sx={{
                        fontFamily: '"JetBrains Mono", monospace',
                        fontSize: { xs: '0.58rem', md: '0.68rem' },
                        fontWeight: 600,
                        color: C.text,
                        bgcolor: 'rgba(14,165,233,0.08)',
                        border: '1px solid rgba(14,165,233,0.15)',
                        borderRadius: '8px',
                        height: { xs: 24, sm: 27, md: 30 },
                        '& .MuiChip-label': { px: { xs: 1, md: 1.5 } },
                        '@media (max-width: 240px)': { fontSize: '0.38rem', height: 18, borderRadius: '4px' },
                        '@media (min-width: 241px) and (max-width: 359px)': { fontSize: '0.48rem', height: 20 },
                      }}
                    />
                  ))}
                </Box>
              </Box>

              {/* ── CTA row ── */}
              <Box
                sx={{
                  pt: { xs: 1.5, md: 2 },
                  borderTop: `1px solid ${C.borderSoft}`,
                  display: 'flex',
                  flexDirection: { xs: 'column', sm: 'row' },
                  gap: { xs: 1, md: 1.5 },
                }}
              >
                <Box sx={{ display: 'flex', gap: 1, flexShrink: 0 }}>
                  <Button
                    component="a"
                    href={project.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    startIcon={<GitBranch size={15} />}
                    sx={{
                      flex: 1,
                      py: { xs: 1, sm: 1.25, md: 1.5 },
                      px: { xs: 1.5, sm: 2, md: 2.5 },
                      fontSize: { xs: '0.7rem', md: '0.8rem' },
                      fontWeight: 600,
                      textTransform: 'none',
                      borderRadius: { xs: '10px', md: '14px' },
                      bgcolor: 'rgba(30,51,88,0.12)',
                      border: `1px solid ${C.borderSoft}`,
                      color: C.text,
                      textDecoration: 'none',
                      transition: 'all 0.2s ease',
                      '&:hover': { color: C.white, borderColor: C.accent },
                      '@media (max-width: 240px)': {
                        py: 0.5, px: 1, fontSize: '0.42rem', borderRadius: '6px',
                        '& .MuiButton-startIcon svg': { width: 10, height: 10 },
                      },
                      '@media (min-width: 241px) and (max-width: 359px)': {
                        py: 0.75, px: 1.25, fontSize: '0.55rem',
                      },
                    }}
                  >
                    View Code
                  </Button>
                </Box>
              </Box>
            </Box>
          </Box>
        </motion.div>
      </Box>
    </AnimatePresence>
  );
}