import { useState, useRef } from 'react';
import { motion, useInView } from 'motion/react';
import {
  GitBranch,
  ExternalLink,
  ArrowUpRight,
  Layers,
  Code2,
} from 'lucide-react';
import {
  Box,
  Container,
  Typography,
  IconButton,
  Chip,
} from '@mui/material';
import { projects } from '../Services/data';
import ProjectModal from './ProjectModal';

/* ── Design tokens ──────────────────────────────────────────── */
const C = {
  dark:       '#0a0f1a',
  card:       'rgba(13,19,33,0.82)',
  accent:     '#0ea5e9',
  accentSoft: 'rgba(14,165,233,0.10)',
  border:     'rgba(30,51,88,0.40)',
  borderHi:   'rgba(14,165,233,0.45)',
  text:       '#c8d5e3',
  muted:      '#5a6a80',
  white:      '#f0f4f8',
};

/* Gradient combos for image placeholders (keyed by index) */
const PLACEHOLDER_GRADIENTS = [
  'linear-gradient(135deg, #0c1929 0%, #0f2847 50%, #0a1e38 100%)',
  'linear-gradient(135deg, #0d1a2d 0%, #122a4a 50%, #0c1e3a 100%)',
  'linear-gradient(135deg, #0b1624 0%, #14304e 50%, #0e2240 100%)',
  'linear-gradient(135deg, #091320 0%, #102640 50%, #0b1b32 100%)',
];

/* ── Scroll-triggered fade ──────────────────────────────────── */
function FadeUp({ children, delay = 0 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 36 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
      style={{ height: '100%' }}
    >
      {children}
    </motion.div>
  );
}

/* ── Image placeholder (shown when imageUrl is null or fails) ─ */
function ImagePlaceholder({ name, index }) {
  return (
    <Box
      sx={{
        width: '100%',
        height: '100%',
        background: PLACEHOLDER_GRADIENTS[index % PLACEHOLDER_GRADIENTS.length],
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 1.5,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Decorative grid dots */}
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          backgroundImage:
            'radial-gradient(rgba(14,165,233,0.08) 1px, transparent 1px)',
          backgroundSize: '24px 24px',
          pointerEvents: 'none',
        }}
      />

      <Box
        sx={{
          width: { xs: 40, md: 52 },
          height: { xs: 40, md: 52 },
          borderRadius: { xs: '10px', md: '14px' },
          bgcolor: 'rgba(14,165,233,0.08)',
          border: '1px solid rgba(14,165,233,0.15)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          zIndex: 1,
        }}
      >
        <Code2 size={24} color={C.accent} strokeWidth={1.5} />
      </Box>

      <Typography
        sx={{
          fontFamily: '"JetBrains Mono", monospace',
          fontSize: { xs: '0.55rem', md: '0.65rem' },
          fontWeight: 600,
          color: 'rgba(14,165,233,0.4)',
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          position: 'relative',
          zIndex: 1,
        }}
      >
        {name}
      </Typography>
    </Box>
  );
}

/* ── Project card ───────────────────────────────────────────── */
function ProjectCard({ project, index, onClick }) {
  const [imgError, setImgError] = useState(false);
  const showPlaceholder = !project.imageUrl || imgError;

  return (
    <FadeUp delay={index * 0.08}>
      <Box
        onClick={onClick}
        sx={{
          position: 'relative',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          bgcolor: C.card,
          borderRadius: { xs: '14px', sm: '16px', md: '20px' },
          border: `1px solid ${C.border}`,
          overflow: 'hidden',
          cursor: 'pointer',
          transition: 'all 0.4s cubic-bezier(0.22,1,0.36,1)',
          '&:hover': {
            borderColor: C.borderHi,
            transform: 'translateY(-6px)',
            boxShadow: `0 24px 64px -16px rgba(0,0,0,0.5), 0 0 0 1px ${C.borderHi}`,
            '& .card-img':     { transform: 'scale(1.06)' },
            '& .card-overlay': { opacity: 0.3 },
            '& .card-arrow':   { opacity: 1, transform: 'translate(0,0)' },
            '& .card-title':   { color: C.accent },
          },
          '@media (max-width: 240px)': { borderRadius: '8px' },
        }}
      >
        {/* ── Image area ── */}
        <Box
          sx={{
            position: 'relative',
            width: '100%',
            height: { xs: 160, sm: 190, md: 220 },
            overflow: 'hidden',
            flexShrink: 0,
            '@media (max-width: 240px)': { height: 80 },
            '@media (min-width: 241px) and (max-width: 359px)': { height: 120 },
          }}
        >
          {showPlaceholder ? (
            <ImagePlaceholder name={project.name} index={index} />
          ) : (
            <Box
              component="img"
              className="card-img"
              src={project.imageUrl}
              alt={project.name}
              loading="lazy"
              onError={() => setImgError(true)}
              sx={{
                width: '100%',
                height: '100%',
                objectFit: 'stretch',
                display: 'block',
                transition: 'transform 0.6s cubic-bezier(0.22,1,0.36,1)',
              }}
            />
          )}

          {/* Gradient scrim */}
          <Box
            className="card-overlay"
            sx={{
              position: 'absolute',
              inset: 0,
              background: `linear-gradient(to top, ${C.dark} 0%, transparent 55%)`,
              opacity: showPlaceholder ? 0.3 : 0.55,
              transition: 'opacity 0.4s ease',
              pointerEvents: 'none',
            }}
          />

          {/* Category pill */}
          <Box sx={{
            position: 'absolute',
            top: { xs: 8, md: 14 },
            left: { xs: 8, md: 14 },
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
                '@media (max-width: 240px)': { fontSize: '0.35rem', height: 16 },
              }}
            />
          </Box>

          {/* Hover arrow */}
          <Box
            className="card-arrow"
            sx={{
              position: 'absolute',
              bottom: { xs: 8, md: 14 },
              right: { xs: 8, md: 14 },
              width: { xs: 28, md: 36 },
              height: { xs: 28, md: 36 },
              borderRadius: '50%',
              bgcolor: C.accent,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              opacity: 0,
              transform: 'translate(8px, 8px)',
              transition: 'all 0.35s ease',
            }}
          >
            <ArrowUpRight size={18} color={C.dark} strokeWidth={2.5} />
          </Box>
        </Box>

        {/* ── Card body ── */}
        <Box sx={{
          p: { xs: 2, sm: 2.5, md: 3 },
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          '@media (max-width: 240px)': { p: 1 },
          '@media (min-width: 241px) and (max-width: 359px)': { p: 1.5 },
        }}>
          {/* Title + quick actions */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'flex-start',
              justifyContent: 'space-between',
              gap: 1,
              mb: { xs: 0.75, md: 1.25 },
            }}
          >
            <Typography
              className="card-title"
              sx={{
                fontWeight: 800,
                color: C.white,
                fontSize: { xs: '0.88rem', sm: '1rem', md: '1.15rem' },
                lineHeight: 1.3,
                transition: 'color 0.25s ease',
                '@media (max-width: 240px)': { fontSize: '0.58rem' },
                '@media (min-width: 241px) and (max-width: 359px)': { fontSize: '0.72rem' },
              }}
            >
              {project.name}
            </Typography>

            <Box
              sx={{ display: 'flex', gap: 0.25, flexShrink: 0, mt: '-2px' }}
              onClick={(e) => e.stopPropagation()}
            >
              <IconButton
                component="a"
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                title="Repository"
                size="small"
                sx={{
                  color: C.muted,
                  p: { xs: 0.5, md: 0.75 },
                  transition: 'color 0.2s',
                  '&:hover': { color: C.white, bgcolor: 'transparent' },
                  '& svg': { width: { xs: 13, md: 15 }, height: { xs: 13, md: 15 } },
                }}
              >
                <GitBranch size={15} />
              </IconButton>

              {project.demoUrl && project.demoUrl !== '#' && (
                <IconButton
                  component="a"
                  href={project.demoUrl}
                  target="_blank"
                  rel="noreferrer"
                  title="Live demo"
                  size="small"
                  sx={{
                    color: C.muted,
                    p: { xs: 0.5, md: 0.75 },
                    transition: 'color 0.2s',
                    '&:hover': { color: C.accent, bgcolor: 'transparent' },
                    '& svg': { width: { xs: 13, md: 15 }, height: { xs: 13, md: 15 } },
                  }}
                >
                  <ExternalLink size={15} />
                </IconButton>
              )}
            </Box>
          </Box>

          {/* Description (clamped to 3 lines) */}
          <Typography
            sx={{
              color: C.text,
              fontSize: { xs: '0.7rem', md: '0.8rem' },
              lineHeight: { xs: 1.6, md: 1.75 },
              mb: { xs: 1.5, md: 2.5 },
              flex: 1,
              display: '-webkit-box',
              WebkitLineClamp: 3,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              '@media (max-width: 240px)': { fontSize: '0.42rem', mb: 0.75, lineHeight: 1.45 },
              '@media (min-width: 241px) and (max-width: 359px)': { fontSize: '0.55rem', mb: 1 },
            }}
          >
            {project.description}
          </Typography>

          {/* Tech stack pills — pinned to bottom */}
          <Box sx={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: { xs: 0.4, md: 0.6 },
            mt: 'auto',
          }}>
            {project.techStack.map((tech) => (
              <Box
                key={tech}
                sx={{
                  px: { xs: 0.75, md: 1 },
                  py: { xs: 0.25, md: 0.35 },
                  bgcolor: C.accentSoft,
                  border: '1px solid rgba(14,165,233,0.14)',
                  borderRadius: { xs: '4px', md: '6px' },
                  fontFamily: '"JetBrains Mono", monospace',
                  fontSize: { xs: '0.5rem', md: '0.6rem' },
                  fontWeight: 600,
                  color: C.text,
                  letterSpacing: '0.02em',
                  '@media (max-width: 240px)': { fontSize: '0.35rem', px: 0.5, py: 0.15 },
                  '@media (min-width: 241px) and (max-width: 359px)': { fontSize: '0.42rem' },
                }}
              >
                {tech}
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
    </FadeUp>
  );
}

/* ═══════════════════════════════════════════════════════════════
   MAIN – Featured Projects Section
   ═══════════════════════════════════════════════════════════════ */
export default function Projects({ onShowToast }) {
  const [selectedProject, setSelectedProject] = useState(null);

  return (
    <Box
      component="section"
      id="projects"
      sx={{
        py: { xs: 6, sm: 10, md: 14, lg: 16 },
        bgcolor: C.dark,
        position: 'relative',
        overflow: 'hidden',
        '@media (max-width: 240px)': { py: 3 },
        '@media (min-width: 241px) and (max-width: 359px)': { py: 4 },
      }}
    >
      {/* ── Ambient blurs ── */}
      <Box
        sx={{
          position: 'absolute',
          top: '12%',
          left: '-8%',
          width: { xs: 250, sm: 380, md: 500 },
          height: { xs: 250, sm: 380, md: 500 },
          bgcolor: 'rgba(14,165,233,0.04)',
          borderRadius: '50%',
          filter: 'blur(120px)',
          pointerEvents: 'none',
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          bottom: '8%',
          right: '-5%',
          width: { xs: 200, sm: 320, md: 420 },
          height: { xs: 200, sm: 320, md: 420 },
          bgcolor: 'rgba(30,51,88,0.07)',
          borderRadius: '50%',
          filter: 'blur(100px)',
          pointerEvents: 'none',
        }}
      />

      {/* Subtle top hairline */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: '10%',
          right: '10%',
          height: '1px',
          background:
            'linear-gradient(to right, transparent, rgba(14,165,233,0.16), transparent)',
        }}
      />

      <Container
        maxWidth="lg"
        sx={{
          position: 'relative',
          zIndex: 1,
          px: { xs: 2, sm: 3, md: 4, lg: 3 },
          '@media (max-width: 240px)': { px: 1 },
          '@media (min-width: 241px) and (max-width: 359px)': { px: 1.5 },
        }}
      >
        {/* ── Section header ── */}
        <FadeUp>
          <Box
            sx={{
              mb: { xs: 4, sm: 6, md: 8, lg: 10 },
              textAlign: 'left',
              '@media (max-width: 240px)': { mb: 2 },
              '@media (min-width: 241px) and (max-width: 359px)': { mb: 3 },
            }}
          >
            <Typography
              variant="h2"
              sx={{
                fontWeight: 900,
                color: C.white,
                fontSize: { xs: '1.5rem', sm: '2rem', md: '2.75rem', lg: '3.25rem' },
                letterSpacing: '-0.03em',
                lineHeight: 1.15,
                mb: { xs: 1.25, md: 2 },
                '@media (max-width: 240px)': { fontSize: '0.9rem', mb: 0.75 },
                '@media (min-width: 241px) and (max-width: 359px)': { fontSize: '1.15rem', mb: 1 },
              }}
            >
              Featured Projects
            </Typography>

            <Box
              sx={{
                width: { xs: 36, sm: 44, md: 52 },
                height: { xs: 3, md: 4 },
                borderRadius: 2,
                background: `linear-gradient(90deg, ${C.accent}, rgba(14,165,233,0.25))`,
                mb: { xs: 1.25, md: 2 },
                '@media (max-width: 240px)': { width: 24, height: 2 },
              }}
            />

            <Typography
              sx={{
                color: C.muted,
                fontSize: { xs: '0.75rem', sm: '0.85rem', md: '0.95rem' },
                maxWidth: 480,
                lineHeight: { xs: 1.6, md: 1.7 },
                '@media (max-width: 240px)': { fontSize: '0.45rem', lineHeight: 1.45 },
                '@media (min-width: 241px) and (max-width: 359px)': { fontSize: '0.58rem' },
              }}
            >
              Handpicked work showcasing end-to-end engineering, clean
              architecture, and real-world impact.
            </Typography>
          </Box>
        </FadeUp>

        {/* ── Bento grid ── */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',
              sm: 'repeat(2, 1fr)',
              md: 'repeat(3, 1fr)',
            },
            justifyContent: 'center',
            gap: { xs: 2.5, sm: 3, md: 3.5 },
            '@media (max-width: 240px)': { gap: 1.5 },
            '@media (min-width: 241px) and (max-width: 359px)': { gap: 2 },
          }}
        >
          {projects.map((project, index) => (
            <Box key={project.id} sx={{ height: '100%' }}>
              <ProjectCard
                project={project}
                index={index}
                onClick={() => setSelectedProject(project)}
              />
            </Box>
          ))}
        </Box>
      </Container>

      {/* ── Modal ── */}
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
          onShowToast={onShowToast}
        />
      )}
    </Box>
  );
}