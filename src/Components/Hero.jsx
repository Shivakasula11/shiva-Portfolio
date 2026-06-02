import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { MessageSquare, Eye } from "lucide-react";
import { Box, Typography, Button } from "@mui/material";
import { developerProfile } from "../Services/data";

import Passport from "../assets/Passportpic.jpg";
const C = {
  dark: "#0b1220",
  medium: "#1e3358",
  accent: "#0aa9f3",
  border: "rgba(30,51,88,0.5)",
  muted: "#64748b",
  text: "#94a3b8",
};

export default function Hero() {
  const [taglineIndex, setTaglineIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [speed, setSpeed] = useState(100);

  const loopList = developerProfile.taglines;

  useEffect(() => {
    let timer;
    const fullText = loopList[taglineIndex];
    const tick = () => {
      if (!isDeleting) {
        setCurrentText(fullText.substring(0, currentText.length + 1));
        if (currentText === fullText) {
          setSpeed(2000);
          setIsDeleting(true);
        } else setSpeed(60 + Math.random() * 40);
      } else {
        setCurrentText(fullText.substring(0, currentText.length - 1));
        if (currentText === "") {
          setIsDeleting(false);
          setTaglineIndex((p) => (p + 1) % loopList.length);
          setSpeed(500);
        } else setSpeed(30);
      }
    };
    timer = setTimeout(tick, speed);
    return () => clearTimeout(timer);
  }, [currentText, isDeleting, taglineIndex, speed, loopList]);

  const scrollTo = (e, id) => {
    e.preventDefault();
    document
      .querySelector(id)
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <Box
      component="section"
      id="home"
      sx={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        pt: { xs: 10, sm: 14, md: 16 },
        pb: { xs: 6, sm: 8, md: 10 },
        overflow: "hidden",
        bgcolor: C.dark,
        '@media (max-width: 240px)': { pt: 7, pb: 4 },
        '@media (min-width: 241px) and (max-width: 359px)': { pt: 8, pb: 5 },
      }}
    >
      {/* Background blobs */}
      {[
        {
          top: "25%",
          left: "25%",
          w: 400,
          h: 400,
          color: "rgba(10,169,243,0.08)",
          dur: "8s",
        },
        {
          bottom: "25%",
          right: "25%",
          w: 350,
          h: 350,
          color: "rgba(30,51,88,0.12)",
          dur: "11s",
        },
      ].map((b, i) => (
        <Box
          key={i}
          sx={{
            position: "absolute",
            top: b.top ?? "auto",
            bottom: b.bottom ?? "auto",
            left: b.left ?? "auto",
            right: b.right ?? "auto",
            width: { xs: b.w * 0.5, sm: b.w * 0.7, md: b.w },
            height: { xs: b.h * 0.5, sm: b.h * 0.7, md: b.h },
            bgcolor: b.color,
            borderRadius: "50%",
            filter: "blur(80px)",
            pointerEvents: "none",
            animation: `bgP ${b.dur} ease-in-out infinite`,
            "@keyframes bgP": {
              "0%,100%": { opacity: 0.6 },
              "50%": { opacity: 1 },
            },
          }}
        />
      ))}

      {/* Floating code symbols */}
      {[
        { text: "</>", top: 128, right: 48, rotate: "-10deg", dur: "6s" },
        { text: "{}", bottom: 128, left: 48, rotate: "15deg", dur: "8s" },
      ].map((s, i) => (
        <Typography
          key={i}
          sx={{
            display: { xs: "none", xl: "block" },
            position: "absolute",
            top: s.top ?? "auto",
            bottom: s.bottom ?? "auto",
            right: s.right ?? "auto",
            left: s.left ?? "auto",
            fontFamily: "monospace",
            fontSize: "7rem",
            fontWeight: 700,
            color: "rgba(30,51,88,0.18)",
            userSelect: "none",
            pointerEvents: "none",
            animation: `fB ${s.dur} ease-in-out infinite`,
            "@keyframes fB": {
              "0%,100%": { transform: `rotate(${s.rotate}) translateY(0)` },
              "50%": { transform: `rotate(${s.rotate}) translateY(-14px)` },
            },
          }}
        >
          {s.text}
        </Typography>
      ))}

      {/* ── Two-column layout ── */}
      <Box
        sx={{
          position: "relative",
          zIndex: 1,
          width: "100%",
          display: "flex",
          flexDirection: { xs: "column", lg: "row" },
          alignItems: "center",
          gap: { xs: 4, sm: 5, lg: 0 },
          '@media (max-width: 240px)': { gap: 2 },
          '@media (min-width: 241px) and (max-width: 359px)': { gap: 3 },
        }}
      >
        {/* ── LEFT: Text ── */}
        <Box
          sx={{
            flex: { lg: "0 0 58%" },
            width: { xs: "100%", lg: "58%" },
            pl: { xs: 2, sm: 4, md: 6, lg: 12 },
            pr: { xs: 2, sm: 4, md: 6, lg: 8 },
            display: "flex",
            flexDirection: "column",
            gap: { xs: 2, sm: 2.5, md: 3 },
            textAlign: { xs: "center", lg: "left" },
            alignItems: { xs: "center", lg: "flex-start" },
            '@media (max-width: 240px)': { pl: 1, pr: 1, gap: 1 },
            '@media (min-width: 241px) and (max-width: 359px)': { pl: 1.5, pr: 1.5, gap: 1.5 },
          }}
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
          
          </motion.div>

          {/* Headline */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            style={{ width: "100%" }}
          >
            <Typography
              variant="h1"
              sx={{
                fontWeight: 800,
                color: "#fff",
                fontSize: { xs: "2rem", sm: "3rem", md: "4rem", lg: "5rem" },
                letterSpacing: "-0.03em",
                lineHeight: 1.1,
                '@media (max-width: 240px)': { fontSize: '1.1rem' },
                '@media (min-width: 241px) and (max-width: 359px)': { fontSize: '1.5rem' },
              }}
            >
              I am{" "}
              <Box
                component="span"
                sx={{
                  background: `linear-gradient(135deg, ${C.accent} 0%, #38bdf8 50%, ${C.accent} 100%)`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                {developerProfile.name}
              </Box>
            </Typography>
          </motion.div>

          {/* Typewriter */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            style={{ width: "100%" }}
          >
            <Box
              sx={{
                minHeight: { xs: 36, sm: 52, md: 64 },
                display: "flex",
                alignItems: "center",
                justifyContent: { xs: "center", lg: "flex-start" },
                '@media (max-width: 240px)': { minHeight: 22 },
                '@media (min-width: 241px) and (max-width: 359px)': { minHeight: 28 },
              }}
            >
              <Typography
                sx={{
                  fontWeight: 600,
                  color: C.text,
                  fontSize: { xs: "1rem", sm: "1.5rem", md: "1.875rem", lg: "2.25rem" },
                  letterSpacing: "-0.01em",
                  lineHeight: 1.3,
                  '@media (max-width: 240px)': { fontSize: '0.6rem' },
                  '@media (min-width: 241px) and (max-width: 359px)': { fontSize: '0.8rem' },
                }}
              >
                {currentText}
                <Box
                  component="span"
                  sx={{
                    display: "inline-block",
                    width: { xs: '2px', sm: '3px' },
                    height: { xs: "18px", sm: "28px", md: "36px" },
                    bgcolor: C.accent,
                    ml: "5px",
                    verticalAlign: "middle",
                    animation: "blink 1s step-end infinite",
                    "@keyframes blink": {
                      "0%,100%": { opacity: 1 },
                      "50%": { opacity: 0 },
                    },
                    '@media (max-width: 240px)': { height: '12px', width: '1.5px' },
                    '@media (min-width: 241px) and (max-width: 359px)': { height: '14px', width: '2px' },
                  }}
                />
              </Typography>
            </Box>
          </motion.div>

          {/* Bio */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45 }}
          >
            <Typography
              sx={{
                color: C.text,
                fontSize: { xs: "0.8rem", sm: "0.9rem", md: "1.05rem" },
                lineHeight: { xs: 1.65, md: 1.8 },
                maxWidth: 520,
                mx: { xs: "auto", lg: 0 },
                '@media (max-width: 240px)': { fontSize: '0.48rem', lineHeight: 1.5 },
                '@media (min-width: 241px) and (max-width: 359px)': { fontSize: '0.62rem', lineHeight: 1.55 },
              }}
            >
              {developerProfile.bioShort}
            </Typography>
          </motion.div>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                gap: { xs: 1.5, sm: 2 },
                justifyContent: { xs: "center", lg: "flex-start" },
                pt: 0.5,
                '@media (max-width: 240px)': { gap: 0.75 },
                '@media (min-width: 241px) and (max-width: 359px)': { gap: 1 },
              }}
            >
              <Button
                onClick={(e) => scrollTo(e, "#projects")}
                endIcon={<Eye size={17} />}
                sx={{
                  px: { xs: 2.5, sm: 3, md: 3.5 },
                  py: { xs: 1.25, sm: 1.5, md: 1.625 },
                  fontSize: { xs: '0.78rem', sm: '0.85rem', md: '0.9rem' },
                  fontWeight: 700,
                  textTransform: "none",
                  borderRadius: { xs: 2, md: 2.5 },
                  bgcolor: C.accent,
                  color: "#fff",
                  boxShadow: "0 4px 20px rgba(10,169,243,0.35)",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    bgcolor: "#0893d4",
                    boxShadow: "0 6px 28px rgba(10,169,243,0.5)",
                    transform: "translateY(-2px)",
                  },
                  '@media (max-width: 240px)': {
                    px: 1.25, py: 0.6, fontSize: '0.48rem', borderRadius: 1,
                    '& .MuiButton-endIcon svg': { width: 10, height: 10 },
                  },
                  '@media (min-width: 241px) and (max-width: 359px)': {
                    px: 1.75, py: 0.85, fontSize: '0.6rem',
                    '& .MuiButton-endIcon svg': { width: 13, height: 13 },
                  },
                }}
              >
                View Projects
              </Button>
              <Button
                onClick={(e) => scrollTo(e, "#contact")}
                endIcon={<MessageSquare size={17} />}
                sx={{
                  px: { xs: 2.5, sm: 3, md: 3.5 },
                  py: { xs: 1.25, sm: 1.5, md: 1.625 },
                  fontSize: { xs: '0.78rem', sm: '0.85rem', md: '0.9rem' },
                  fontWeight: 700,
                  textTransform: "none",
                  borderRadius: { xs: 2, md: 2.5 },
                  color: "#e2e8f0",
                  border: "1px solid rgba(30,51,88,0.55)",
                  bgcolor: "rgba(30,51,88,0.35)",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    color: "#fff",
                    bgcolor: "rgba(30,51,88,0.6)",
                    borderColor: "rgba(30,51,88,0.9)",
                  },
                  '@media (max-width: 240px)': {
                    px: 1.25, py: 0.6, fontSize: '0.48rem', borderRadius: 1,
                    '& .MuiButton-endIcon svg': { width: 10, height: 10 },
                  },
                  '@media (min-width: 241px) and (max-width: 359px)': {
                    px: 1.75, py: 0.85, fontSize: '0.6rem',
                    '& .MuiButton-endIcon svg': { width: 13, height: 13 },
                  },
                }}
              >
                Contact Me
              </Button>
            </Box>
          </motion.div>
        </Box>

        {/* ── RIGHT: Photo card ── */}
        <Box
          sx={{
            flex: { lg: "0 0 42%" },
            width: { xs: "100%", lg: "42%" },
            px: { xs: 3, sm: 5, md: 6, lg: 10 },
            display: "flex",
            justifyContent: { xs: "center", lg: "flex-end" },
            '@media (max-width: 240px)': { px: 2 },
            '@media (min-width: 241px) and (max-width: 359px)': { px: 2.5 },
          }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.25 }}
            style={{
              position: "relative",
              width: "100%",
              maxWidth: 380,
              height: "auto",
              aspectRatio: "380 / 420",
            }}
          >
            {/* Glow halo */}
            <Box
              sx={{
                position: "absolute",
                inset: { xs: -4, sm: -6, md: -8 },
                background: `linear-gradient(135deg, ${C.accent}, ${C.medium}, ${C.accent})`,
                borderRadius: { xs: 3, sm: 4, md: 5 },
                filter: "blur(12px)",
                opacity: 0.22,
                transition: "opacity 0.5s ease",
                "&:hover": { opacity: 0.4 },
              }}
            />

            {/* Card frame */}
            <Box
              sx={{
                position: "relative",
                width: "100%",
                height: "100%",
                borderRadius: { xs: '12px', md: '16px' },
                overflow: "hidden",
                border: `1px solid ${C.border}`,
                boxShadow: "0 25px 60px rgba(0,0,0,0.5)",
                transition: "all 0.4s ease",
                "&:hover": {
                  border: "1px solid rgba(10,169,243,0.6)",
                  boxShadow:
                    "0 30px 70px rgba(0,0,0,0.6), 0 0 40px rgba(10,169,243,0.15)",
                  transform: "translateY(-6px) scale(1.02)",
                },
                "&:hover img": {
                  transform: "scale(1.05)",
                },
              }}
            >
              {/* Photo */}
              <Box
                component="img"
                src={Passport}
                alt="Kasula Shiva - Frontend Developer"
                sx={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  display: "block",
                }}
              />

              {/* Scan line animation */}
              <motion.div
                animate={{ y: ["0%", "100%", "0%"] }}
                transition={{ repeat: Infinity, duration: 4.5, ease: "linear" }}
                style={{
                  position: "absolute",
                  left: 0,
                  right: 0,
                  height: 2,
                  background: `linear-gradient(to right, transparent, rgba(10,169,243,0.7), transparent)`,
                  pointerEvents: "none",
                }}
              />

              {/* HUD border */}
              <Box
                sx={{
                  position: "absolute",
                  inset: { xs: 6, sm: 8, md: 10 },
                  border: "1px solid rgba(10,169,243,0.15)",
                  borderRadius: { xs: 1, md: 2 },
                  pointerEvents: "none",
                }}
              />
            </Box>
          </motion.div>
        </Box>
      </Box>

      {/* Scroll down guide */}
      <Box
        sx={{
          position: "absolute",
          bottom: { xs: 16, sm: 22, md: 28 },
          left: "50%",
          transform: "translateX(-50%)",
          display: { xs: 'none', sm: 'flex' },
          flexDirection: "column",
          alignItems: "center",
          gap: 1,
          userSelect: "none",
          zIndex: 1,
          '@media (max-width: 480px)': { display: 'none' },
        }}
      >
        <Typography
          sx={{
            fontFamily: "monospace",
            fontSize: { xs: '0.5rem', md: '0.6rem' },
            color: C.muted,
            letterSpacing: "0.25em",
            textTransform: "uppercase",
          }}
        >
          Scroll Down
        </Typography>
        <Box
          sx={{
            width: { xs: 16, md: 20 },
            height: { xs: 26, md: 32 },
            borderRadius: "999px",
            border: `1px solid ${C.border}`,
            display: "flex",
            justifyContent: "center",
            alignItems: "flex-start",
            pt: 0.75,
          }}
        >
          <motion.div
            animate={{ y: [0, 9, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
            style={{
              width: 6,
              height: 6,
              borderRadius: "50%",
              backgroundColor: C.accent,
            }}
          />
        </Box>
      </Box>
    </Box>
  );
}