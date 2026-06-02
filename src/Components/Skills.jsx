import { motion } from 'motion/react';
import {
  SiHtml5, SiCss, SiJavascript, SiReact, SiMui,
  SiBootstrap, SiGit, SiMysql, SiVscodium,
  SiPython, SiDjango, SiDocker, SiKubernetes,
  SiRedis, SiMongodb, SiNginx,
  SiPostman, SiJenkins, SiLinux, SiTypescript,
  SiNodedotjs, SiTailwindcss, SiFirebase, SiFigma,
  SiGraphql, SiPostgresql, SiGithub,
} from 'react-icons/si';
import { FaAws } from 'react-icons/fa6';
import { Code2, Atom, Cpu } from 'lucide-react';
import {
  Box,
  Container,
  Typography,
  Grid as MuiGrid,
} from '@mui/material';
import { skillGroups } from '../Services/data';

/* ── palette ── */
const C = {
  dark:     '#0b1220',
  darkCard: 'rgba(11,18,32,0.6)',
  medium:   '#1e3358',
  accent:   '#0aa9f3',
  border:   'rgba(30,51,88,0.55)',
  text:     '#cbd5e1',
  muted:    '#64748b',
};

/* ── brand-icon lookup (add/remove as needed) ── */
const brandIconMap = {
  /* Web Technologies */
  'HTML':                   { icon: SiHtml5,        color: '#E34F26' },
  'CSS':                    { icon: SiCss,          color: '#1572B6' },
  'JavaScript':             { icon: SiJavascript,   color: '#F7DF1E' },
  'TypeScript':             { icon: SiTypescript,    color: '#3178C6' },

  /* Libraries & Frameworks */
  'React JS':               { icon: SiReact,        color: '#61DAFB' },
  'Material UI (MUI)':      { icon: SiMui,          color: '#007FFF' },
  'Bootstrap':              { icon: SiBootstrap,     color: '#7952B3' },
  'Tailwind CSS':           { icon: SiTailwindcss,   color: '#06B6D4' },
  'Node.js':                { icon: SiNodedotjs,     color: '#339933' },
  'Django':                 { icon: SiDjango,        color: '#092E20' },
  'Python':                 { icon: SiPython,        color: '#3776AB' },

  /* Developer Tools & Databases */
  'Git & GitHub Workflow':  { icon: SiGit,          color: '#F05032' },
  'GitHub':                 { icon: SiGithub,       color: '#fff'    },
  'SQL Database':           { icon: SiMysql,        color: '#4479A1' },
  'MySQL':                  { icon: SiMysql,        color: '#4479A1' },
  'PostgreSQL':             { icon: SiPostgresql,   color: '#4169E1' },
  'MongoDB':                { icon: SiMongodb,      color: '#47A248' },
  'Redis':                  { icon: SiRedis,        color: '#DC382D' },
  'VS Code Editor':         { icon: SiVscodium,     color: '#007ACC' },
  'Docker':                 { icon: SiDocker,       color: '#2496ED' },
  'Kubernetes':             { icon: SiKubernetes,   color: '#326CE5' },
  'AWS':                    { icon: FaAws,          color: '#FF9900' },
  'Nginx':                  { icon: SiNginx,        color: '#009639' },
  'Jenkins':                { icon: SiJenkins,      color: '#D24939' },
  'Postman':                { icon: SiPostman,      color: '#FF6C37' },
  'Linux':                  { icon: SiLinux,        color: '#FCC624' },
  'Firebase':               { icon: SiFirebase,     color: '#FFCA28' },
  'Figma':                  { icon: SiFigma,        color: '#F24E1E' },
  'GraphQL':                { icon: SiGraphql,      color: '#E10098' },
};

const GROUP_ICONS = [Code2, Atom, Cpu];

/* ─────────────────── Skill Row ─────────────────── */
function SkillRow({ skill, groupIdx, skillIdx }) {
  const brand = brandIconMap[skill.name];
  const BrandIcon = brand?.icon;
  const brandColor = brand?.color ?? C.accent;

  return (
    <Box
      id={`skill-item-${groupIdx}-${skillIdx}`}
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        px: { xs: 1.25, sm: 1.5, md: 2 },
        py: { xs: 1, sm: 1.25, md: 1.5 },
        borderRadius: { xs: 1.5, md: 2.5 },
        bgcolor: 'rgba(30,51,88,0.08)',
        border: '1px solid rgba(30,51,88,0.35)',
        cursor: 'default',
        transition: 'all 0.25s ease',
        '&:hover': {
          bgcolor: 'rgba(30,51,88,0.25)',
          borderColor: `${brandColor}55`,
          transform: 'translateX(4px)',
          '& .skill-name':   { color: '#fff' },
          '& .skill-icon':   { color: brandColor, borderColor: `${brandColor}44` },
          '& .active-badge': { opacity: 1 },
        },
        '@media (max-width: 240px)': { px: 0.75, py: 0.5, borderRadius: 1 },
        '@media (min-width: 241px) and (max-width: 359px)': { px: 1, py: 0.75 },
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 1, sm: 1.25, md: 1.75 }, minWidth: 0 }}>
        {BrandIcon ? (
          <Box
            className="skill-icon"
            sx={{
              width: { xs: 28, sm: 32, md: 36 },
              height: { xs: 28, sm: 32, md: 36 },
              bgcolor: 'rgba(11,18,32,0.8)',
              border: '1px solid rgba(51,65,85,0.5)',
              borderRadius: { xs: 1, md: 1.5 },
              color: brandColor,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.25s ease',
              flexShrink: 0,
              '& svg': { width: { xs: 13, sm: 15, md: 17 }, height: { xs: 13, sm: 15, md: 17 } },
              '@media (max-width: 240px)': { width: 20, height: 20, '& svg': { width: 10, height: 10 } },
            }}
          >
            <BrandIcon size={17} />
          </Box>
        ) : (
          <Box sx={{
            width: { xs: 28, sm: 32, md: 36 },
            height: { xs: 28, sm: 32, md: 36 },
            bgcolor: 'rgba(11,18,32,0.8)',
            border: '1px solid rgba(51,65,85,0.5)',
            borderRadius: { xs: 1, md: 1.5 },
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            flexShrink: 0,
            '@media (max-width: 240px)': { width: 20, height: 20 },
          }}>
            <Box sx={{
              width: { xs: 5, md: 8 },
              height: { xs: 5, md: 8 },
              borderRadius: '50%',
              bgcolor: C.accent,
            }} />
          </Box>
        )}

        <Typography
          className="skill-name"
          sx={{
            fontSize: { xs: '0.72rem', sm: '0.8rem', md: '0.875rem' },
            fontWeight: 600,
            color: C.text,
            transition: 'color 0.2s ease',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            '@media (max-width: 240px)': { fontSize: '0.42rem' },
            '@media (min-width: 241px) and (max-width: 359px)': { fontSize: '0.55rem' },
          }}
        >
          {skill.name}
        </Typography>
      </Box>

      <Box
        className="active-badge"
        sx={{
          display: { xs: 'none', sm: 'flex' },
          alignItems: 'center',
          gap: 0.75,
          opacity: 0.5,
          transition: 'opacity 0.25s ease',
          flexShrink: 0,
        }}
      >
        <Typography sx={{
          fontFamily: 'monospace',
          fontSize: { xs: '0.45rem', md: '0.55rem' },
          fontWeight: 700,
          color: C.muted,
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
        }}>
          Active
        </Typography>
        <Box sx={{
          width: { xs: 4, md: 6 },
          height: { xs: 4, md: 6 },
          borderRadius: '50%',
          bgcolor: C.accent,
          animation: 'pulse 1.5s ease-in-out infinite',
          '@keyframes pulse': { '0%,100%': { opacity: 1 }, '50%': { opacity: 0.4 } },
        }} />
      </Box>
    </Box>
  );
}

/* ─────────────────── Skill Card ─────────────────── */
function SkillCard({ group, groupIdx }) {
  const HeaderIcon = GROUP_ICONS[groupIdx] ?? Code2;

  return (
    <motion.div
      id={`skill-group-card-${groupIdx}`}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: groupIdx * 0.15 }}
      style={{ height: '100%', width: '100%' }}
    >
      <Box sx={{
        height: '100%',
        bgcolor: C.darkCard,
        p: { xs: 2, sm: 2.5, md: 3.5 },
        borderRadius: { xs: 2.5, sm: 3, md: 4 },
        border: `1px solid ${C.border}`,
        boxShadow: '0 20px 50px rgba(0,0,0,0.35)',
        display: 'flex',
        flexDirection: 'column',
        transition: 'all 0.3s ease',
        '&:hover': {
          borderColor: 'rgba(10,169,243,0.35)',
          boxShadow: '0 24px 56px rgba(0,0,0,0.4)',
        },
        '@media (max-width: 240px)': { p: 1.25, borderRadius: 1.5 },
        '@media (min-width: 241px) and (max-width: 359px)': { p: 1.5, borderRadius: 2 },
      }}>
        {/* Card header */}
        <Box sx={{
          display: 'flex',
          alignItems: 'center',
          gap: { xs: 1, md: 1.5 },
          mb: { xs: 2, sm: 2.5, md: 3 },
          pb: { xs: 1.5, sm: 2, md: 2.5 },
          borderBottom: '1px solid rgba(30,51,88,0.4)',
          '@media (max-width: 240px)': { mb: 1.25, pb: 1, gap: 0.75 },
        }}>
          <Box sx={{
            p: { xs: 0.6, md: 1 },
            bgcolor: 'rgba(30,51,88,0.4)',
            color: C.accent,
            borderRadius: { xs: 1, md: 1.5 },
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            '& svg': { width: { xs: 14, sm: 17, md: 20 }, height: { xs: 14, sm: 17, md: 20 } },
            '@media (max-width: 240px)': { p: 0.4, '& svg': { width: 10, height: 10 } },
          }}>
            <HeaderIcon size={20} />
          </Box>
          <Typography variant="h6" sx={{
            fontWeight: 700,
            color: '#e2e8f0',
            fontSize: { xs: '0.85rem', sm: '0.95rem', md: '1.05rem' },
            '@media (max-width: 240px)': { fontSize: '0.55rem' },
            '@media (min-width: 241px) and (max-width: 359px)': { fontSize: '0.68rem' },
          }}>
            {group.category}
          </Typography>
        </Box>

        {/* Skills list */}
        <Box sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: { xs: 0.75, sm: 1, md: 1.25 },
          flex: 1,
          '@media (max-width: 240px)': { gap: 0.5 },
        }}>
          {group.skills.map((skill, skillIdx) => (
            <SkillRow
              key={skill.name}
              skill={skill}
              groupIdx={groupIdx}
              skillIdx={skillIdx}
            />
          ))}
        </Box>
      </Box>
    </motion.div>
  );
}

/* ─────────────────── Skills Section ─────────────────── */
export default function Skills() {
  return (
    <Box
      component="section"
      id="skills"
      sx={{
        py: { xs: 6, sm: 8, md: 10, lg: 14 },
        bgcolor: C.dark,
        position: 'relative',
        overflow: 'hidden',
        '@media (max-width: 240px)': { py: 3 },
        '@media (min-width: 241px) and (max-width: 359px)': { py: 4 },
      }}
    >
      {/* Top accent line */}
      <Box sx={{
        position: 'absolute', top: 0, left: 0, right: 0, height: 1,
        background: 'linear-gradient(to right, transparent, rgba(30,51,88,0.4), transparent)',
      }} />

      {/* Glow blobs */}
      {[
        { top: '50%', left: '75%', w: 320, h: 320, color: 'rgba(10,169,243,0.08)' },
        { bottom: 0,  right: 40,   w: 384, h: 384, color: 'rgba(30,51,88,0.12)'   },
        { top: 0,     left: 48,    w: 256, h: 256, color: 'rgba(10,169,243,0.08)' },
      ].map((b, i) => (
        <Box key={i} sx={{
          position: 'absolute',
          top: b.top ?? 'auto', bottom: b.bottom ?? 'auto',
          left: b.left ?? 'auto', right: b.right ?? 'auto',
          width: { xs: b.w * 0.5, sm: b.w * 0.7, md: b.w },
          height: { xs: b.h * 0.5, sm: b.h * 0.7, md: b.h },
          bgcolor: b.color, borderRadius: '50%',
          filter: 'blur(80px)', pointerEvents: 'none',
        }} />
      ))}

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
        {/* Section heading */}
        <Box sx={{
          textAlign: 'center',
          mb: { xs: 4, sm: 6, md: 8, lg: 10 },
          '@media (max-width: 240px)': { mb: 2.5 },
          '@media (min-width: 241px) and (max-width: 359px)': { mb: 3 },
        }}>
          <Typography sx={{
            fontFamily: 'monospace',
            fontSize: { xs: '0.58rem', sm: '0.65rem', md: '0.7rem' },
            fontWeight: 700,
            color: C.accent,
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            display: 'block',
            mb: { xs: 1, md: 1.5 },
            '@media (max-width: 240px)': { fontSize: '0.4rem', letterSpacing: '0.1em', mb: 0.5 },
            '@media (min-width: 241px) and (max-width: 359px)': { fontSize: '0.48rem' },
          }}>
            02 • Capabilities
          </Typography>
          <Typography variant="h2" sx={{
            fontWeight: 800,
            color: '#fff',
            fontSize: { xs: '1.5rem', sm: '2rem', md: '2.5rem', lg: '3rem' },
            letterSpacing: '-0.02em',
            '@media (max-width: 240px)': { fontSize: '0.95rem' },
            '@media (min-width: 241px) and (max-width: 359px)': { fontSize: '1.2rem' },
          }}>
            Technical Skillset
          </Typography>
          <Box sx={{
            width: { xs: 32, sm: 40, md: 48 },
            height: { xs: 3, md: 4 },
            bgcolor: C.accent,
            borderRadius: 2,
            mt: { xs: 1.5, md: 2 },
            mx: 'auto',
            '@media (max-width: 240px)': { width: 22, height: 2, mt: 1 },
          }} />
          <Typography sx={{
            color: C.muted,
            fontSize: { xs: '0.75rem', sm: '0.82rem', md: '0.875rem' },
            mt: { xs: 1.5, md: 2 },
            maxWidth: 440,
            mx: 'auto',
            lineHeight: { xs: 1.6, md: 1.7 },
            '@media (max-width: 240px)': { fontSize: '0.42rem', mt: 1, lineHeight: 1.45 },
            '@media (min-width: 241px) and (max-width: 359px)': { fontSize: '0.55rem' },
          }}>
            A scannable index of programming languages, libraries, workflows,
            and infrastructure dependencies that I use regularly.
          </Typography>
        </Box>

        {/* Skill cards grid */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',
              sm: 'repeat(2, 1fr)',
              md: 'repeat(3, 1fr)',
            },
            gap: { xs: 2.5, sm: 3, md: 4 },
            alignItems: 'stretch',
            '@media (max-width: 240px)': { gap: 1.5 },
            '@media (min-width: 241px) and (max-width: 359px)': { gap: 2 },
          }}
        >
          {skillGroups.map((group, groupIdx) => (
            <SkillCard
              key={group.category}
              group={group}
              groupIdx={groupIdx}
            />
          ))}
        </Box>
      </Container>
    </Box>
  );
}