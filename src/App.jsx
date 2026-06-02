import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { CheckCircle } from 'lucide-react';
import { Box, Typography } from '@mui/material';

import Navbar      from './Components/Navbar.jsx';
import Hero        from './Components/Hero.jsx';
import About       from './Components/About.jsx';
import Skills      from './Components/Skills.jsx';
import Projects    from './Components/Projects.jsx';
import Experience  from './Components/Experience.jsx';
import Contact     from './Components/Contact.jsx';
import ScrollToTop from './Components/ScrollToTop.jsx';
import AIChatBot   from './Components/AIChatBot.jsx';

export default function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [toastMessage,  setToastMessage]  = useState(null);

  useEffect(() => {
    const SECTION_IDS = ['home', 'about', 'skills', 'projects', 'experience', 'contact'];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { root: null, rootMargin: '-30% 0px -50% 0px', threshold: 0.1 }
    );

    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      SECTION_IDS.forEach((id) => {
        const el = document.getElementById(id);
        if (el) observer.unobserve(el);
      });
    };
  }, []);

  const handleShowToast = (message) => {
    setToastMessage(message);
    setTimeout(() => setToastMessage(null), 4500);
  };

  return (
    <Box sx={{ position: 'relative', minHeight: '100vh' }}>

      <Navbar activeSection={activeSection} />

      <Box component="main" sx={{ width: '100%' }}>
        <Hero />
        <About      onShowToast={handleShowToast} />
        <Skills />
        <Projects   onShowToast={handleShowToast} />
        <Experience />
        <Contact    onShowToast={handleShowToast} />
      </Box>

      <ScrollToTop />
      <AIChatBot />

      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9, x: '-50%' }}
            animate={{ opacity: 1, y: 0,  scale: 1,   x: '-50%' }}
            exit={{   opacity: 0, y: 30,  scale: 0.9, x: '-50%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 350 }}
            style={{ position: 'fixed', bottom: 24, left: '50%', zIndex: 2000 }}
          >
            <Box sx={{
              display: 'flex', alignItems: 'center', gap: 1.5,
              px: 2.5, py: 1.75,
              bgcolor: '#0f172a',
              border: '1px solid rgba(30,41,59,0.8)',
              borderRadius: 3,
              boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
              maxWidth: 360,
            }}>
              <Box sx={{
                width: 22, height: 22, borderRadius: '50%',
                bgcolor: 'rgba(59,130,246,0.1)',
                border: '1px solid rgba(59,130,246,0.2)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0,
              }}>
                <CheckCircle size={13} color="#60a5fa" />
              </Box>
              <Typography sx={{
                color: '#f1f5f9',
                fontSize: { xs: '0.75rem', sm: '0.875rem' },
                fontWeight: 500, lineHeight: 1.5,
              }}>
                {toastMessage}
              </Typography>
            </Box>
          </motion.div>
        )}
      </AnimatePresence>

    </Box>
  );
}