import { motion } from 'motion/react';
import { Download } from 'lucide-react';
import { Box, Typography, Button, Container } from '@mui/material';
import { developerProfile } from '../Services/data';
import Passport from '../assets/Passportpic.jpg';

const C = {
  dark:   '#0b1220',
  accent: '#0aa9f3',
  border: 'rgba(99,140,190,0.4)',
  text:   '#94a3b8',
  subtle: '#64748b',
};

export default function About({ onShowToast }) {
  const handleDownloadCV = () => {
    onShowToast('📄 Opening resume...');
    window.open(developerProfile.cvUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <Box component="section" id="about"
      sx={{
        py: { xs: 6, sm: 10, md: 12, lg: 14 },
        bgcolor: C.dark,
        position: 'relative',
        overflow: 'hidden',
        /* ⌚ Smartwatch */
        '@media (max-width: 240px)': { py: 3 },
        /* 📱 Mobile S */
        '@media (min-width: 241px) and (max-width: 359px)': { py: 4 },
      }}
    >
      {/* Top accent line */}
      <Box sx={{ position: 'absolute', top: 0, left: 0, right: 0, height: '1px', background: 'linear-gradient(to right, transparent, rgba(99,140,190,0.4), transparent)' }} />

      {/* Background glow */}
      <Box sx={{
        position: 'absolute',
        top: '50%',
        left: 0,
        transform: 'translate(-50%,-50%)',
        width: { xs: 200, sm: 300, md: 380 },
        height: { xs: 200, sm: 300, md: 380 },
        bgcolor: 'rgba(10,169,243,0.06)',
        borderRadius: '50%',
        filter: 'blur(80px)',
        pointerEvents: 'none',
      }} />

      <Container
        maxWidth="lg"
        sx={{
          position: 'relative',
          zIndex: 1,
          px: { xs: 2, sm: 3, md: 4, lg: 3 },
          /* ⌚ Smartwatch */
          '@media (max-width: 240px)': { px: 1 },
          /* 📱 Mobile S */
          '@media (min-width: 241px) and (max-width: 359px)': { px: 1.5 },
        }}
      >

        {/* ── Section header ── */}
        <Box sx={{
          textAlign: { xs: 'center', md: 'left' },
          mb: { xs: 4, sm: 5, md: 7, lg: 9 },
          '@media (max-width: 240px)': { mb: 2.5 },
        }}>
          <Typography sx={{
            fontFamily: 'monospace',
            fontSize: {
              xs: '0.6rem',
              sm: '0.65rem',
              md: '0.7rem',
            },
            fontWeight: 700,
            color: C.accent,
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            display: 'block',
            mb: 1.5,
            '@media (max-width: 240px)': { fontSize: '0.45rem', letterSpacing: '0.1em', mb: 0.75 },
            '@media (min-width: 241px) and (max-width: 359px)': { fontSize: '0.5rem', mb: 1 },
          }}>
            01 • Personal Profile
          </Typography>
          <Typography variant="h2" sx={{
            fontWeight: 800,
            color: '#fff',
            fontSize: { xs: '1.5rem', sm: '2rem', md: '2.5rem', lg: '3rem' },
            letterSpacing: '-0.02em',
            '@media (max-width: 240px)': { fontSize: '1rem' },
            '@media (min-width: 241px) and (max-width: 359px)': { fontSize: '1.25rem' },
          }}>
            About Me
          </Typography>
          <Box sx={{
            width: { xs: 36, sm: 44, md: 52 },
            height: { xs: 3, md: 4 },
            bgcolor: C.accent,
            borderRadius: 2,
            mt: { xs: 1.5, md: 2 },
            mx: { xs: 'auto', md: 0 },
            '@media (max-width: 240px)': { width: 28, height: 2, mt: 1 },
          }} />
        </Box>

        {/* ── Side-by-side layout using flexbox ── */}
        <Box sx={{
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          alignItems: { xs: 'center', sm: 'flex-start' },
          gap: { xs: 4, sm: 5, md: 8, lg: 10 },
          '@media (max-width: 240px)': { gap: 2.5 },
          '@media (min-width: 241px) and (max-width: 359px)': { gap: 3 },
        }}>

          {/* ── LEFT: Avatar ── */}
          <Box sx={{ flexShrink: 0, display: 'flex', justifyContent: 'center' }}>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6 }}
              style={{ position: 'relative', cursor: 'default' }}
            >
              {/* Outer glow */}
              <Box sx={{
                position: 'absolute',
                inset: { xs: -10, sm: -15, md: -20 },
                background: 'radial-gradient(circle, rgba(10,169,243,0.18) 0%, transparent 70%)',
                borderRadius: '50%',
                filter: 'blur(24px)',
                opacity: 0.8,
                animation: 'glow 3s ease-in-out infinite',
                '@keyframes glow': { '0%,100%': { opacity: 0.6 }, '50%': { opacity: 1 } },
                '@media (max-width: 240px)': { inset: -6 },
              }} />

              {/* Gradient ring */}
              <Box sx={{
                position: 'absolute',
                inset: { xs: -3, md: -4 },
                background: 'linear-gradient(135deg, #0aa9f3, #1e3358, #0aa9f3)',
                borderRadius: '50%',
                opacity: 0.5,
                filter: 'blur(3px)',
                '@media (max-width: 240px)': { inset: -2 },
              }} />

              {/* Avatar image */}
              <Box sx={{
                position: 'relative',
                width: { xs: 180, sm: 220, md: 260, lg: 310 },
                height: { xs: 180, sm: 220, md: 260, lg: 310 },
                borderRadius: '50%',
                overflow: 'hidden',
                border: { xs: '3px solid rgba(99,140,190,0.45)', md: '4px solid rgba(99,140,190,0.45)' },
                boxShadow: '0 30px 70px rgba(0,0,0,0.55)',
                bgcolor: C.dark,
                transition: 'transform 0.3s ease',
                '&:hover': { transform: 'scale(1.025)' },
                '@media (max-width: 240px)': {
                  width: 100,
                  height: 100,
                  border: '2px solid rgba(99,140,190,0.45)',
                },
                '@media (min-width: 241px) and (max-width: 359px)': {
                  width: 140,
                  height: 140,
                },
              }}>
                <Box component="img"
                  src={Passport}
                  alt="Kasula Shiva"
                  sx={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                />
                {/* Gradient overlay */}
                <Box sx={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(11,18,32,0.45) 0%, transparent 55%)' }} />
              </Box>
            </motion.div>
          </Box>

          {/* ── RIGHT: Bio + Stats + Button ── */}
          <Box sx={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            gap: { xs: 2.5, sm: 3, md: 4 },
            textAlign: { xs: 'center', sm: 'left' },
            alignItems: { xs: 'center', sm: 'flex-start' },
            minWidth: 0,
            '@media (max-width: 240px)': { gap: 1.5 },
          }}>

            {/* Bio */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              style={{ width: '100%' }}
            >
              <Typography variant="h5" sx={{
                fontWeight: 700,
                color: '#cbd5e1',
                lineHeight: { xs: 1.4, md: 1.5 },
                mb: { xs: 1.5, sm: 2, md: 2.5 },
                fontSize: { xs: '0.95rem', sm: '1.1rem', md: '1.2rem', lg: '1.3rem' },
                '@media (max-width: 240px)': { fontSize: '0.65rem', mb: 0.75, lineHeight: 1.3 },
                '@media (min-width: 241px) and (max-width: 359px)': { fontSize: '0.8rem', mb: 1 },
              }}>
                Accelerating Web Experiences from Blueprint Ideas To Cloud Deployment.
              </Typography>
              <Typography variant="body1" sx={{
                color: C.text,
                lineHeight: { xs: 1.7, md: 1.85 },
                fontSize: { xs: '0.8rem', sm: '0.875rem', md: '1rem' },
                '@media (max-width: 240px)': { fontSize: '0.5rem', lineHeight: 1.5 },
                '@media (min-width: 241px) and (max-width: 359px)': { fontSize: '0.65rem', lineHeight: 1.6 },
              }}>
                {developerProfile.bioFull}
              </Typography>
            </motion.div>

            {/* Stats grid */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
              style={{ width: '100%' }}
            >
              <Box sx={{
                display: 'grid',
                gridTemplateColumns: { xs: '1fr 1fr', sm: '1fr 1fr' },
                gap: { xs: 1.5, sm: 2, md: 2 },
                '@media (max-width: 240px)': { gridTemplateColumns: '1fr', gap: 1 },
                '@media (min-width: 241px) and (max-width: 359px)': { gap: 1 },
              }}>
                {developerProfile.stats.map((stat, idx) => (
                  <Box key={idx} sx={{
                    p: { xs: 2, sm: 2.5, md: 3 },
                    borderRadius: { xs: 2, md: 3 },
                    bgcolor: 'rgba(30,51,88,0.15)',
                    border: '1px solid rgba(99,140,190,0.4)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: { xs: 'center', sm: 'flex-start' },
                    cursor: 'default',
                    transition: 'all 0.2s ease',
                    '&:hover': {
                      bgcolor: 'rgba(30,51,88,0.3)',
                      borderColor: 'rgba(10,169,243,0.5)',
                      '& .sv': { color: C.accent },
                    },
                    '@media (max-width: 240px)': { p: 1.25, borderRadius: 1.5 },
                    '@media (min-width: 241px) and (max-width: 359px)': { p: 1.5 },
                  }}>
                    <Typography className="sv" sx={{
                      fontWeight: 800,
                      color: '#fff',
                      fontSize: { xs: '1.35rem', sm: '1.5rem', md: '1.75rem', lg: '2rem' },
                      lineHeight: 1,
                      mb: { xs: 0.5, md: 0.75 },
                      transition: 'color 0.2s ease',
                      '@media (max-width: 240px)': { fontSize: '0.95rem', mb: 0.25 },
                      '@media (min-width: 241px) and (max-width: 359px)': { fontSize: '1.1rem' },
                    }}>
                      {stat.value}
                    </Typography>
                    <Typography sx={{
                      fontFamily: 'monospace',
                      fontSize: { xs: '0.52rem', sm: '0.58rem', md: '0.62rem' },
                      letterSpacing: '0.12em',
                      color: C.subtle,
                      textTransform: 'uppercase',
                      '@media (max-width: 240px)': { fontSize: '0.4rem', letterSpacing: '0.08em' },
                      '@media (min-width: 241px) and (max-width: 359px)': { fontSize: '0.45rem' },
                    }}>
                      {stat.label}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </motion.div>

            {/* Download CV */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Button
                onClick={handleDownloadCV}
                startIcon={<Download size={18} />}
                sx={{
                  px: { xs: 2.5, sm: 3, md: 3.5 },
                  py: { xs: 1.25, sm: 1.5, md: 1.75 },
                  borderRadius: { xs: 2, md: 3 },
                  fontSize: { xs: '0.75rem', sm: '0.8rem', md: '0.875rem' },
                  fontWeight: 600,
                  color: '#fff',
                  bgcolor: 'rgba(30,51,88,0.2)',
                  border: '1px solid rgba(99,140,190,0.55)',
                  textTransform: 'none',
                  transition: 'all 0.3s ease',
                  whiteSpace: 'nowrap',
                  minHeight: { xs: 40, md: 48 },
                  '&:hover': {
                    bgcolor: C.accent,
                    color: C.dark,
                    borderColor: C.accent,
                    boxShadow: '0 4px 20px rgba(10,169,243,0.3)',
                  },
                  '@media (max-width: 240px)': {
                    px: 1.5,
                    py: 0.75,
                    fontSize: '0.55rem',
                    minHeight: 28,
                    borderRadius: 1.5,
                    '& .MuiButton-startIcon svg': { width: 12, height: 12 },
                  },
                  '@media (min-width: 241px) and (max-width: 359px)': {
                    px: 2,
                    py: 1,
                    fontSize: '0.65rem',
                    minHeight: 34,
                  },
                }}
              >
                Download  Resume
              </Button>
            </motion.div>

          </Box>
        </Box>
      </Container>
    </Box>
  );
}