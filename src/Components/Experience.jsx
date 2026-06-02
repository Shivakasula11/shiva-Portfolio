import { motion } from "motion/react";
import { Box, Container, Grid, Typography } from "@mui/material";
import { experiences } from "../Services/data";

// ── Design tokens ──────────────────────────────────────────────
const C = {
  dark: "#0b1220",
  accent: "#0aa9f3",
  border: "rgba(30,51,88,0.4)",
  muted: "#64748b",
  text: "#cbd5e1",
};

// ── Reusable section heading with underline bar ────────────────
function SectionHeading({ title }) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        mb: { xs: 3, sm: 4, md: 5 },
        '@media (max-width: 240px)': { mb: 2 },
        '@media (min-width: 241px) and (max-width: 359px)': { mb: 2.5 },
      }}
    >
      <Typography
        variant="h3"
        sx={{
          fontWeight: 800,
          color: "#fff",
          fontSize: { xs: "1.4rem", sm: "1.75rem", md: "2rem", lg: "2.25rem" },
          letterSpacing: "-0.02em",
          textAlign: "center",
          userSelect: "none",
          '@media (max-width: 240px)': { fontSize: '0.9rem' },
          '@media (min-width: 241px) and (max-width: 359px)': { fontSize: '1.1rem' },
        }}
      >
        {title}
      </Typography>
      <Box
        sx={{
          width: { xs: 60, sm: 76, md: 96 },
          height: { xs: 3, md: 4 },
          bgcolor: "rgba(10,169,243,0.9)",
          borderRadius: 2,
          mt: { xs: 1.25, md: 1.75 },
          boxShadow: "0 2px 8px rgba(10,169,243,0.3)",
          '@media (max-width: 240px)': { width: 36, height: 2, mt: 0.75 },
          '@media (min-width: 241px) and (max-width: 359px)': { width: 48 },
        }}
      />
    </Box>
  );
}

// ── Single experience / education card ────────────────────────
function ExpCard({ exp, isEducation }) {
  return (
    <Box
      sx={{
        position: "relative",
        overflow: "hidden",
        borderRadius: { xs: 2.5, sm: 3, md: 4 },
        border: `1px solid ${C.border}`,
        bgcolor: "rgba(30,51,88,0.1)",
        pl: { xs: 3, sm: 4, md: 4.5 },
        pr: { xs: 2, sm: 3, md: 4 },
        py: { xs: 2.5, sm: 3, md: 4 },
        display: "flex",
        flexDirection: "column",
        transition: "all 0.3s ease",
        "&:hover": {
          borderColor: "rgba(10,169,243,0.4)",
          boxShadow: "0 25px 50px rgba(0,0,0,0.3)",
          "& .accent-bar": { opacity: 1 },
          "& .card-title": { color: C.accent },
        },
        '@media (max-width: 240px)': {
          pl: 2,
          pr: 1.25,
          py: 1.5,
          borderRadius: 1.5,
        },
        '@media (min-width: 241px) and (max-width: 359px)': {
          pl: 2.5,
          pr: 1.5,
          py: 2,
          borderRadius: 2,
        },
      }}
    >
      {/* Left accent bar */}
      <Box
        className="accent-bar"
        sx={{
          position: "absolute",
          left: 0,
          top: 0,
          bottom: 0,
          width: { xs: 4, sm: 5, md: 6 },
          bgcolor: C.accent,
          borderRadius: "16px 0 0 16px",
          opacity: 0.9,
          transition: "opacity 0.3s ease",
          '@media (max-width: 240px)': { width: 3 },
        }}
      />

      {/* Role / Degree title */}
      <Typography
        className="card-title"
        sx={{
          fontWeight: 800,
          color: "#fff",
          fontSize: { xs: "0.92rem", sm: "1.05rem", md: "1.15rem", lg: "1.2rem" },
          lineHeight: 1.35,
          transition: "color 0.3s ease",
          '@media (max-width: 240px)': { fontSize: '0.6rem', lineHeight: 1.3 },
          '@media (min-width: 241px) and (max-width: 359px)': { fontSize: '0.75rem' },
        }}
      >
        {exp.role}
      </Typography>

      {/* Company / Institution */}
      <Typography
        sx={{
          fontFamily: isEducation ? "sans-serif" : "monospace",
          fontSize: { xs: '0.68rem', sm: '0.75rem', md: '0.8rem' },
          fontWeight: isEducation ? 600 : 700,
          color: C.accent,
          letterSpacing: isEducation ? "0.01em" : "0.08em",
          textTransform: isEducation ? "none" : "uppercase",
          mt: 0.5,
          '@media (max-width: 240px)': { fontSize: '0.42rem', mt: 0.25, letterSpacing: '0.03em' },
          '@media (min-width: 241px) and (max-width: 359px)': { fontSize: '0.55rem' },
        }}
      >
        {exp.company}
      </Typography>

      {/* Date range */}
      <Typography
        sx={{
          fontFamily: "monospace",
          fontSize: { xs: "0.62rem", sm: "0.68rem", md: "0.75rem" },
          fontWeight: 500,
          color: C.muted,
          mt: { xs: 0.5, md: 0.75 },
          '@media (max-width: 240px)': { fontSize: '0.4rem', mt: 0.25 },
          '@media (min-width: 241px) and (max-width: 359px)': { fontSize: '0.5rem' },
        }}
      >
        {exp.dateRange}
      </Typography>

      {/* Bullet achievements (work cards) */}
      {exp.achievements && exp.achievements.length > 0 && (
        <Box
          component="ul"
          sx={{
            mt: { xs: 2, sm: 2.5, md: 3 },
            display: "flex",
            flexDirection: "column",
            gap: { xs: 1, sm: 1.25, md: 1.75 },
            pl: 0,
            listStyle: "none",
            '@media (max-width: 240px)': { mt: 1, gap: 0.75 },
            '@media (min-width: 241px) and (max-width: 359px)': { mt: 1.5, gap: 0.75 },
          }}
        >
          {exp.achievements.map((bullet, idx) => (
            <Box
              component="li"
              key={idx}
              sx={{
                display: "flex",
                alignItems: "flex-start",
                gap: { xs: 1, md: 1.5 },
                '@media (max-width: 240px)': { gap: 0.5 },
              }}
            >
              {/* Bullet dot */}
              <Box
                sx={{
                  width: { xs: 4, sm: 5, md: 6 },
                  height: { xs: 4, sm: 5, md: 6 },
                  borderRadius: "50%",
                  bgcolor: "#94a3b8",
                  flexShrink: 0,
                  mt: { xs: '5px', md: '6px' },
                  '@media (max-width: 240px)': { width: 3, height: 3, mt: '4px' },
                }}
              />
              <Typography
                sx={{
                  color: C.text,
                  fontSize: { xs: "0.7rem", sm: "0.75rem", md: "0.82rem" },
                  lineHeight: { xs: 1.6, md: 1.7 },
                  fontWeight: 400,
                  '@media (max-width: 240px)': { fontSize: '0.42rem', lineHeight: 1.45 },
                  '@media (min-width: 241px) and (max-width: 359px)': { fontSize: '0.55rem', lineHeight: 1.5 },
                }}
              >
                {bullet}
              </Typography>
            </Box>
          ))}
        </Box>
      )}

      {/* Grade badge (education cards) */}
      {exp.grade && (
        <Box sx={{
          mt: { xs: 1.5, sm: 2, md: 2.5 },
          display: "inline-flex",
          '@media (max-width: 240px)': { mt: 1 },
        }}>
          <Box
            sx={{
              display: "inline-flex",
              alignItems: "center",
              px: { xs: 1.25, sm: 1.5, md: 2 },
              py: { xs: 0.5, md: 0.75 },
              borderRadius: 1.5,
              bgcolor: "rgba(16,185,129,0.1)",
              border: "1px solid rgba(52,211,153,0.2)",
              '@media (max-width: 240px)': { px: 0.75, py: 0.25, borderRadius: 1 },
            }}
          >
            <Typography
              sx={{
                color: "#34d399",
                fontSize: { xs: '0.55rem', sm: '0.6rem', md: '0.65rem' },
                fontWeight: 800,
                letterSpacing: { xs: '0.06em', md: '0.1em' },
                textTransform: "uppercase",
                '@media (max-width: 240px)': { fontSize: '0.38rem', letterSpacing: '0.04em' },
                '@media (min-width: 241px) and (max-width: 359px)': { fontSize: '0.48rem' },
              }}
            >
              {exp.grade}
            </Typography>
          </Box>
        </Box>
      )}
    </Box>
  );
}

// ── Main component ─────────────────────────────────────────────
export default function Experience() {
  const workExperiences = experiences.filter((e) => e.type === "work");
  const educationExperiences = experiences.filter(
    (e) => e.type === "education",
  );

  return (
    <Box
      component="section"
      id="experience"
      sx={{
        py: { xs: 6, sm: 8, md: 10, lg: 14 },
        bgcolor: C.dark,
        position: "relative",
        overflow: "hidden",
        '@media (max-width: 240px)': { py: 3 },
        '@media (min-width: 241px) and (max-width: 359px)': { py: 4 },
      }}
    >
      {/* Top accent border */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 1,
          background:
            "linear-gradient(to right, transparent, rgba(30,51,88,0.4), transparent)",
        }}
      />

      {/* Glow blobs */}
      <Box
        sx={{
          position: "absolute",
          top: "25%",
          right: "75%",
          width: { xs: 200, sm: 280, md: 384 },
          height: { xs: 200, sm: 280, md: 384 },
          bgcolor: "rgba(30,51,88,0.12)",
          borderRadius: "50%",
          filter: "blur(80px)",
          pointerEvents: "none",
        }}
      />
      <Box
        sx={{
          position: "absolute",
          bottom: { xs: 20, md: 40 },
          right: { xs: 20, md: 48 },
          width: { xs: 180, sm: 250, md: 320 },
          height: { xs: 180, sm: 250, md: 320 },
          bgcolor: "rgba(10,169,243,0.08)",
          borderRadius: "50%",
          filter: "blur(80px)",
          pointerEvents: "none",
        }}
      />

      <Container
        maxWidth="xl"
        sx={{
          position: "relative",
          zIndex: 1,
          px: { xs: 2, sm: 3, md: 4, lg: 3 },
          '@media (max-width: 240px)': { px: 1 },
          '@media (min-width: 241px) and (max-width: 359px)': { px: 1.5 },
        }}
      >
        <Grid
          container
          spacing={{ xs: 4, sm: 5, md: 6, lg: 8 }}
          alignItems="flex-start"
          justifyContent="center"
          sx={{
            '@media (max-width: 240px)': { spacing: 2.5 },
          }}
        >
          {/* ── LEFT: Work Experience ── */}
          <Grid item xs={12} sm={5.5} id="experience-column-work">
            <SectionHeading title="Experience" />

            <Box sx={{
              display: "flex",
              flexDirection: "column",
              gap: { xs: 2, sm: 2.5, md: 3 },
              '@media (max-width: 240px)': { gap: 1.5 },
              '@media (min-width: 241px) and (max-width: 359px)': { gap: 1.5 },
            }}>
              {workExperiences.map((exp, idx) => (
                <motion.div
                  key={exp.id}
                  id={`experience-card-${exp.id}`}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                >
                  <ExpCard exp={exp} isEducation={false} />
                </motion.div>
              ))}
            </Box>
          </Grid>

          {/* ── RIGHT: Education ── */}
          <Grid
            item
            xs={12}
            sm={5.5}
            id="experience-column-education "
            sx={{ ml: { xs: 0, sm: 4, md: 8, lg: 22 } }}
          >
            <SectionHeading title="Education" />

            <Box sx={{
              display: "flex",
              flexDirection: "column",
              gap: { xs: 2, sm: 2.5, md: 3 },
              maxWidth: { xs: '100%', sm: 400, md: 440, lg: 480 },
              mx: { xs: 'auto', sm: 0 },
              '@media (max-width: 240px)': { gap: 1.5 },
              '@media (min-width: 241px) and (max-width: 359px)': { gap: 1.5 },
            }}>
              {educationExperiences.map((exp, idx) => (
                <motion.div
                  key={exp.id}
                  id={`experience-card-${exp.id}`}
                  style={{ maxWidth: 480, width: "100%", marginInline: "auto" }}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                >
                  <ExpCard exp={exp} isEducation />
                </motion.div>
              ))}
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}