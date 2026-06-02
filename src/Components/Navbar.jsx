import { useState, useEffect } from 'react';
import { Menu, X, Terminal, ArrowUpRight } from 'lucide-react';
import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Button,
  Drawer,
  List,
  ListItem,
} from '@mui/material';


// ── Design tokens ──────────────────────────────────────────────
const C = {
  dark:        '#0b1220',
  darkAlpha:   'rgba(11,18,32,0.92)',
  medium:      '#1e3358',
  mediumAlpha: 'rgba(30,51,88,0.4)',
  accent:      '#0aa9f3',
  border:      'rgba(30,51,88,0.5)',
  text:        '#cbd5e1',
  muted:       '#94a3b8',
};

const NAV_LINKS = [
  { title: 'Home',       href: '#home'       },
  { title: 'About',      href: '#about'      },
  { title: 'Skills',     href: '#skills'     },
  { title: 'Projects',   href: '#projects'   },
  { title: 'Experience', href: '#experience' },
  { title: 'Contact',    href: '#contact'    },
];

// ── Pre-filled email for the "Hire Me" CTA ─────────────────────
const HIRE_ME_MAILTO =
  'mailto:kasulashiva21@gmail.com?subject=Job Opportunity for Kasula Shiva&body=Hi Shiva, I came across your portfolio and would like to discuss an opportunity.';

export default function Navbar({ activeSection }) {
  const [isOpen,   setIsOpen]   = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleScrollTo = (e, href) => {
    e.preventDefault();
    setIsOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const isActive = (title) => activeSection === title.toLowerCase();

  // ── Render ─────────────────────────────────────────────────
  return (
    <>
      <AppBar
        id="main-navbar"
        component="nav"
        elevation={0}
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1300,
          transition: 'all 0.3s ease',
          bgcolor: scrolled ? C.darkAlpha : 'transparent',
          backdropFilter: scrolled ? 'blur(12px)' : 'none',
          borderBottom: scrolled ? `1px solid ${C.border}` : '1px solid transparent',
          boxShadow: scrolled ? '0 4px 24px rgba(0,0,0,0.3)' : 'none',
        }}
      >
        <Toolbar
          disableGutters
          sx={{
            maxWidth: { xs: '100%', xl: 1440 },
            width: '100%',
            mx: 'auto',
            px: { xs: 1.5, sm: 3, md: 4, lg: 6 },
            minHeight: { xs: 60, sm: 70, md: 80 },
            height: { xs: 60, sm: 70, md: 80 },
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 1,
            // ⌚ Smartwatch (≤240px)
            '@media (max-width:240px)': {
              px: 1,
              minHeight: 52,
              height: 52,
            },
          }}
        >

          {/* ── Logo ── */}
          <Box
            component="a"
            id="nav-logo"
            href="#home"
            onClick={(e) => handleScrollTo(e, '#home')}
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1.25,
              minWidth: 0,
              flexShrink: 1,
              textDecoration: 'none',
              '&:hover .logo-box': {
                borderColor: C.accent,
                bgcolor: 'rgba(30,51,88,0.6)',
              },
            }}
          >
   

            {/* Brand text */}
            <Typography
              sx={{
                fontWeight: 800,
                fontSize: { xs: '0.95rem', sm: '1rem', md: '1.05rem' },
                letterSpacing: '-0.01em',
                color: '#f1f5f9',
                lineHeight: 1,
                whiteSpace: 'nowrap',
                // ⌚ Smartwatch (≤240px)
                '@media (max-width:240px)': {
                  fontSize: '0.78rem',
                },
              }}
            >
              Kasula
              <Box component="span" > </Box>
              Shiva  
            </Typography>
          </Box>

          {/* ── Desktop nav links ── */}
          <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: { md: 0, lg: 0.25 } }}>
            {NAV_LINKS.map((link) => (
              <Box
                key={link.title}
                component="a"
                id={`desktop-link-${link.title.toLowerCase()}`}
                href={link.href}
                onClick={(e) => handleScrollTo(e, link.href)}
                sx={{
                  position: 'relative',
                  px: { md: 1.25, lg: 2 },
                  py: 1,
                  fontSize: { md: '0.8rem', lg: '0.875rem' },
                  fontWeight: isActive(link.title) ? 700 : 500,
                  color: isActive(link.title) ? C.accent : C.text,
                  borderRadius: 1.5,
                  whiteSpace: 'nowrap',
                  textDecoration: 'none',
                  transition: 'all 0.2s ease',
                  '&:hover': {
                    color: '#fff',
                    bgcolor: 'rgba(30,51,88,0.4)',
                  },
                }}
              >
                {link.title}

                {/* Active underline indicator */}
                {isActive(link.title) && (
                  <Box
                    id={`active-indicator-${link.title.toLowerCase()}`}
                    sx={{
                      position: 'absolute',
                      bottom: 4,
                      left: 8,
                      right: 8,
                      height: 2,
                      bgcolor: C.accent,
                      borderRadius: 2,
                    }}
                  />
                )}
              </Box>
            ))}

            {/* Hire Me CTA — opens pre-filled email */}
            <Box
              component="a"
              id="cta-resume-desktop"
              href={HIRE_ME_MAILTO}
              sx={{
                ml: { md: 1, lg: 1.5 },
                display: 'flex',
                alignItems: 'center',
                gap: 0.5,
                px: { md: 1.75, lg: 2.25 },
                py: 1,
                fontSize: { md: '0.68rem', lg: '0.72rem' },
                fontWeight: 700,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                whiteSpace: 'nowrap',
                color: '#fff',
                bgcolor: C.accent,
                borderRadius: 1.5,
                textDecoration: 'none',
                boxShadow: '0 2px 10px rgba(10,169,243,0.3)',
                transition: 'all 0.2s ease',
                '&:hover': { opacity: 0.9, boxShadow: '0 4px 16px rgba(10,169,243,0.4)' },
              }}
            >
              Hire Me
              <ArrowUpRight size={13} />
            </Box>
          </Box>

          {/* ── Hamburger (mobile) ── */}
          <IconButton
            id="hamburger-btn"
            onClick={() => setIsOpen((prev) => !prev)}
            aria-label="Toggle menu"
            sx={{
              display: { xs: 'flex', md: 'none' },
              flexShrink: 0,
              color: C.muted,
              p: { xs: 1, sm: 1.25 },
              borderRadius: 1.5,
              border: `1px solid ${C.border}`,
              bgcolor: isOpen ? 'rgba(30,51,88,0.4)' : 'transparent',
              transition: 'all 0.2s ease',
              '&:hover': { color: '#fff', bgcolor: 'rgba(30,51,88,0.4)' },
              // ⌚ Smartwatch (≤240px)
              '@media (max-width:240px)': {
                p: 0.5,
              },
            }}
          >
            {isOpen ? <X size={22} /> : <Menu size={22} />}
          </IconButton>

        </Toolbar>
      </AppBar>

      {/* ── Mobile Drawer ── */}
      <Drawer
        id="mobile-menu"
        anchor="top"
        open={isOpen}
        onClose={() => setIsOpen(false)}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': {
            top: { xs: 60, sm: 70 },
            bgcolor: 'rgba(11,18,32,0.97)',
            backdropFilter: 'blur(16px)',
            borderBottom: `1px solid ${C.border}`,
            boxShadow: '0 12px 32px rgba(0,0,0,0.4)',
            px: { xs: 2, sm: 3 },
            py: { xs: 2, sm: 2.5 },
            maxHeight: 'calc(100vh - 60px)',
            overflowY: 'auto',
            // ⌚ Smartwatch (≤240px)
            '@media (max-width:240px)': {
              top: 52,
              px: 1.25,
              py: 1.5,
              maxHeight: 'calc(100vh - 52px)',
            },
          },
          '& .MuiBackdrop-root': {
            top: { xs: 60, sm: 70 },
            bgcolor: 'transparent',
            // ⌚ Smartwatch (≤240px)
            '@media (max-width:240px)': {
              top: 52,
            },
          },
        }}
        SlideProps={{ direction: 'down' }}
        ModalProps={{ keepMounted: true }}
      >
        <List disablePadding sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
          {NAV_LINKS.map((link) => (
            <ListItem key={link.title} disablePadding>
              <Box
                component="a"
                id={`mobile-link-${link.title.toLowerCase()}`}
                href={link.href}
                onClick={(e) => handleScrollTo(e, link.href)}
                sx={{
                  width: '100%',
                  display: 'block',
                  px: { xs: 1.5, sm: 2 },
                  py: { xs: 1.4, sm: 1.75 },
                  fontSize: { xs: '0.95rem', sm: '1rem' },
                  fontWeight: isActive(link.title) ? 700 : 500,
                  color: isActive(link.title) ? C.accent : C.text,
                  bgcolor: isActive(link.title) ? 'rgba(30,51,88,0.5)' : 'transparent',
                  border: isActive(link.title) ? `1px solid rgba(30,51,88,0.6)` : '1px solid transparent',
                  borderRadius: 2.5,
                  textDecoration: 'none',
                  transition: 'all 0.2s ease',
                  '&:hover': {
                    color: '#fff',
                    bgcolor: 'rgba(30,51,88,0.4)',
                  },
                  // ⌚ Smartwatch (≤240px)
                  '@media (max-width:240px)': {
                    py: 1,
                    fontSize: '0.8rem',
                    borderRadius: 1.5,
                  },
                }}
              >
                {link.title}
              </Box>
            </ListItem>
          ))}

          {/* Mobile Hire Me CTA — opens pre-filled email */}
          <ListItem disablePadding sx={{ mt: 1.5 }}>
            <Box
              component="a"
              id="cta-resume-mobile"
              href={HIRE_ME_MAILTO}
              onClick={() => setIsOpen(false)}
              sx={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 0.75,
                px: 2,
                py: { xs: 1.4, sm: 1.75 },
                fontSize: { xs: '0.82rem', sm: '0.875rem' },
                fontWeight: 700,
                color: '#fff',
                bgcolor: C.accent,
                borderRadius: 2.5,
                textDecoration: 'none',
                boxShadow: '0 4px 16px rgba(10,169,243,0.3)',
                transition: 'opacity 0.2s ease',
                '&:hover': { opacity: 0.9 },
                // ⌚ Smartwatch (≤240px)
                '@media (max-width:240px)': {
                  py: 1,
                  fontSize: '0.72rem',
                  borderRadius: 1.5,
                },
              }}
            >
              Hire Me
              <ArrowUpRight size={16} />
            </Box>
          </ListItem>
        </List>
      </Drawer>
    </>
  );
}