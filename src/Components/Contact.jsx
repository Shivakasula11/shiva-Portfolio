import { useState } from "react";
import { motion } from "motion/react";
import {
  Mail,
  Phone,
  Send,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Divider,
  CircularProgress,
} from "@mui/material";
import { developerProfile } from "../Services/data";

const C = {
  dark: "#0b1220",
  darkCard: "rgba(15,23,42,0.3)",
  medium: "#1e3358",
  mediumAlpha: "rgba(30,51,88,0.55)",
  accent: "#0aa9f3",
  borderSlate: "rgba(51,65,85,0.5)",
  muted: "#64748b",
};

/* ── Brand SVG icons ──────────────────────────────────────────── */
function LinkedInIcon({ size = 19 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>
  );
}

function GitHubIcon({ size = 19 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
    </svg>
  );
}

function ContactRow({ icon: Icon, label, value, href, external, iconColor }) {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: { xs: 1.5, sm: 2, md: 2.5 },
        "&:hover .ci": {
          bgcolor: "rgba(30,51,88,0.4)",
          borderColor: "rgba(10,169,243,0.4)",
        },
        "&:hover .cl": { color: C.accent },
        '@media (max-width: 240px)': { gap: 1 },
      }}
    >
      <Box
        className="ci"
        sx={{
          width: { xs: 40, sm: 44, md: 48 },
          height: { xs: 40, sm: 44, md: 48 },
          borderRadius: { xs: 1.5, md: 2 },
          bgcolor: "rgba(15,23,42,0.8)",
          border: "1px solid rgba(51,65,85,0.7)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: iconColor || "#94a3b8",
          flexShrink: 0,
          transition: "all 0.3s ease",
          boxShadow: "0 2px 8px rgba(0,0,0,0.3)",
          '& svg': {
            width: { xs: 15, sm: 17, md: 19 },
            height: { xs: 15, sm: 17, md: 19 },
          },
          '@media (max-width: 240px)': {
            width: 30, height: 30, borderRadius: 1,
            '& svg': { width: 12, height: 12 },
          },
          '@media (min-width: 241px) and (max-width: 359px)': {
            width: 34, height: 34,
            '& svg': { width: 14, height: 14 },
          },
        }}
      >
        <Icon size={19} />
      </Box>

      <Box sx={{ minWidth: 0 }}>
        <Typography
          sx={{
            color: C.muted,
            fontSize: { xs: '0.6rem', sm: '0.65rem', md: '0.68rem' },
            fontWeight: 600, mb: 0.2,
            textTransform: "uppercase", letterSpacing: "0.06em",
            '@media (max-width: 240px)': { fontSize: '0.42rem', letterSpacing: '0.03em', mb: 0 },
            '@media (min-width: 241px) and (max-width: 359px)': { fontSize: '0.5rem' },
          }}
        >
          {label}
        </Typography>
        <Box
          component="a"
          href={href}
          className="cl"
          {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
          sx={{
            color: "#fff",
            fontSize: { xs: "0.78rem", sm: "0.875rem", md: "0.9375rem" },
            fontWeight: 700, textDecoration: "none",
            transition: "color 0.2s ease",
            display: 'block', overflow: 'hidden',
            textOverflow: 'ellipsis', whiteSpace: 'nowrap',
            '@media (max-width: 240px)': { fontSize: '0.52rem' },
            '@media (min-width: 241px) and (max-width: 359px)': { fontSize: '0.62rem' },
          }}
        >
          {value}
        </Box>
      </Box>
    </Box>
  );
}

export default function Contact({ onShowToast }) {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [formErrors, setFormErrors] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [sentSuccess, setSentSuccess] = useState(false);

  const clearError = (f) => setFormErrors((p) => ({ ...p, [f]: "" }));

  const validateForm = () => {
    let ok = true;
    const e = { name: "", email: "", message: "" };
    if (!formData.name.trim()) { e.name = "Please provide your name."; ok = false; }
    else if (formData.name.length < 2) { e.name = "Name must be at least 2 characters."; ok = false; }
    const rx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) { e.email = "Please provide your email."; ok = false; }
    else if (!rx.test(formData.email)) { e.email = "Please enter a valid email address."; ok = false; }
    if (!formData.message.trim()) { e.message = "Please write a message."; ok = false; }
    else if (formData.message.length < 5) { e.message = "Message must be at least 5 characters."; ok = false; }
    setFormErrors(e);
    return ok;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSentSuccess(true);
      onShowToast("✉️ Message sent successfully! Thank you for reaching out.");
      setFormData({ name: "", email: "", message: "" });
      setTimeout(() => setSentSuccess(false), 5000);
    }, 1500);
  };

  const fieldSx = (field) => ({
    "& .MuiOutlinedInput-root": {
      bgcolor: "rgba(11,18,32,0.5)",
      borderRadius: { xs: 1.5, md: 2 },
      color: "#fff",
      fontSize: { xs: '0.8rem', sm: '0.85rem', md: '0.9rem' },
      fontWeight: 400,
      "& fieldset": {
        borderColor: formErrors[field] ? "#ef4444" : "rgba(51,65,85,0.7)",
        borderWidth: "1px",
      },
      "&:hover fieldset": {
        borderColor: formErrors[field] ? "#f87171" : "rgba(99,140,190,0.5)",
      },
      "&.Mui-focused fieldset": {
        borderColor: formErrors[field] ? "#ef4444" : C.accent,
        borderWidth: "1px",
        boxShadow: formErrors[field]
          ? "0 0 0 3px rgba(239,68,68,0.08)"
          : "0 0 0 3px rgba(10,169,243,0.08)",
      },
    },
    "& .MuiInputBase-input": {
      color: "#fff",
      padding: { xs: '10px 12px', sm: '12px 14px', md: '14px 16px' },
    },
    "& .MuiInputBase-input::placeholder": { color: C.muted, opacity: 1 },
    "& .MuiInputBase-inputMultiline": { resize: "none" },
    '@media (max-width: 240px)': {
      '& .MuiOutlinedInput-root': { fontSize: '0.55rem', borderRadius: 1 },
      '& .MuiInputBase-input': { padding: '6px 8px' },
    },
    '@media (min-width: 241px) and (max-width: 359px)': {
      '& .MuiOutlinedInput-root': { fontSize: '0.7rem' },
      '& .MuiInputBase-input': { padding: '8px 10px' },
    },
  });

  return (
    <Box
      component="section"
      id="contact"
      sx={{
        py: { xs: 6, sm: 8, md: 10, lg: 14 },
        bgcolor: C.dark, position: "relative", overflow: "hidden",
        '@media (max-width: 240px)': { py: 3 },
        '@media (min-width: 241px) and (max-width: 359px)': { py: 4 },
      }}
    >
      {/* Top accent line */}
      <Box sx={{
        position: "absolute", top: 0, left: 0, right: 0, height: 1,
        background: "linear-gradient(to right, transparent, rgba(30,51,88,0.4), transparent)",
      }} />

      {/* Glow blobs */}
      <Box sx={{
        position: "absolute", top: "50%", left: "25%",
        width: { xs: 200, sm: 300, md: 380 }, height: { xs: 200, sm: 300, md: 380 },
        bgcolor: "rgba(10,169,243,0.04)", borderRadius: "50%",
        filter: "blur(80px)", pointerEvents: "none",
      }} />
      <Box sx={{
        position: "absolute", bottom: 40, right: "25%",
        width: { xs: 220, sm: 320, md: 400 }, height: { xs: 220, sm: 320, md: 400 },
        bgcolor: "rgba(30,51,88,0.08)", borderRadius: "50%",
        filter: "blur(80px)", pointerEvents: "none",
      }} />

      <Container
        maxWidth="lg"
        sx={{
          position: "relative", zIndex: 1,
          px: { xs: 2, sm: 3, md: 4, lg: 3 },
          '@media (max-width: 240px)': { px: 1 },
          '@media (min-width: 241px) and (max-width: 359px)': { px: 1.5 },
        }}
      >
        {/* ── Heading ── */}
        <Box sx={{
          textAlign: "center",
          mb: { xs: 4, sm: 6, md: 8, lg: 10 },
          '@media (max-width: 240px)': { mb: 2.5 },
          '@media (min-width: 241px) and (max-width: 359px)': { mb: 3 },
        }}>
          <Box sx={{ position: "relative", display: "inline-block" }}>
            <Typography variant="h2" sx={{
              fontWeight: 800, color: "#fff",
              fontSize: { xs: "1.5rem", sm: "2rem", md: "2.5rem", lg: "2.8rem" },
              letterSpacing: "-0.02em",
              '@media (max-width: 240px)': { fontSize: '1rem' },
              '@media (min-width: 241px) and (max-width: 359px)': { fontSize: '1.25rem' },
            }}>
              Get In Touch
            </Typography>
            <Box sx={{
              position: "absolute",
              bottom: { xs: -8, sm: -10, md: -12 },
              left: "50%", transform: "translateX(-50%)",
              width: { xs: 50, sm: 65, md: 80 },
              height: { xs: 3, md: 4 },
              bgcolor: C.accent, borderRadius: 2,
              '@media (max-width: 240px)': { width: 32, height: 2, bottom: -6 },
            }} />
          </Box>
          <Typography sx={{
            color: C.muted,
            fontSize: { xs: '0.75rem', sm: '0.82rem', md: '0.9rem' },
            fontWeight: 500,
            mt: { xs: 3, sm: 3.5, md: 4.5 },
            letterSpacing: "0.03em",
            '@media (max-width: 240px)': { fontSize: '0.48rem', mt: 2 },
            '@media (min-width: 241px) and (max-width: 359px)': { fontSize: '0.6rem', mt: 2.5 },
          }}>
            Ready for the next challenge
          </Typography>
        </Box>

        {/* ── Two-column layout (flexbox — works in every MUI version) ── */}
        <Box sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          gap: { xs: 4, sm: 5, md: 6, lg: 8 },
          alignItems: 'flex-start',
          '@media (max-width: 240px)': { gap: 2.5 },
          '@media (min-width: 241px) and (max-width: 359px)': { gap: 3 },
        }}>

          {/* ── LEFT: Contact info (38% on md+) ── */}
          <Box sx={{ flex: { md: '0 0 38%' }, width: { xs: '100%', md: '38%' } }}>
            <Box sx={{
              display: "flex", flexDirection: "column",
              gap: { xs: 2.5, sm: 3, md: 4 },
              '@media (max-width: 240px)': { gap: 1.5 },
            }}>
              <Box>
                <Typography variant="h4" sx={{
                  fontWeight: 800, color: "#fff",
                  fontSize: { xs: "1.25rem", sm: "1.5rem", md: "1.75rem", lg: "2rem" },
                  mb: { xs: 1.5, md: 2 },
                  '@media (max-width: 240px)': { fontSize: '0.85rem', mb: 0.75 },
                  '@media (min-width: 241px) and (max-width: 359px)': { fontSize: '1rem', mb: 1 },
                }}>
                  Contact Info
                </Typography>
                <Typography sx={{
                  color: C.muted,
                  fontSize: { xs: "0.8rem", sm: "0.875rem", md: "0.95rem" },
                  lineHeight: { xs: 1.7, md: 1.85 },
                  maxWidth: 420,
                  '@media (max-width: 240px)': { fontSize: '0.48rem', lineHeight: 1.5 },
                  '@media (min-width: 241px) and (max-width: 359px)': { fontSize: '0.62rem', lineHeight: 1.6 },
                }}>
                  I am currently looking for new opportunities. Whether you have
                  a question or just want to say hi, my inbox is always open!
                </Typography>
              </Box>

              <Box sx={{
                display: "flex", flexDirection: "column",
                gap: { xs: 2, sm: 2.5, md: 3.5 },
                '@media (max-width: 240px)': { gap: 1.25 },
                '@media (min-width: 241px) and (max-width: 359px)': { gap: 1.5 },
              }}>
                <ContactRow icon={Mail} label="Email Me"
                  value={developerProfile.email}
                  href={`mailto:${developerProfile.email}`}
                  iconColor="#EA4335" />
                <ContactRow icon={Phone} label="Contact Me"
                  value="6301993194" href="tel:6301993194"
                  iconColor="#22c55e" />
                <ContactRow icon={LinkedInIcon} label="LinkedIn"
                  value="Visit My Profile"
                  href={developerProfile.linkedinUrl}
                  external iconColor="#0A66C2" />
                <ContactRow icon={GitHubIcon} label="GitHub"
                  value="View My Code"
                  href={developerProfile.githubUrl}
                  external iconColor="#f0f4f8" />
              </Box>
            </Box>
          </Box>

          {/* ── RIGHT: Form (fills remaining 62% on md+) ── */}
          <Box sx={{ flex: { md: 1 }, width: { xs: '100%', md: '62%' } }}>
            <Box sx={{
              position: "relative",
              bgcolor: C.darkCard,
              border: `1px solid ${C.borderSlate}`,
              width: "100%",
              borderRadius: { xs: 2, sm: 2.5, md: 3 },
              p: { xs: 2.5, sm: 3.5, md: 5, lg: 6 },
              boxShadow: "0 20px 50px rgba(0,0,0,0.35)",
              overflow: "hidden",
              '@media (max-width: 240px)': { p: 1.25, borderRadius: 1.5 },
              '@media (min-width: 241px) and (max-width: 359px)': { p: 1.75 },
            }}>

              {/* Success overlay */}
              {sentSuccess && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  style={{
                    position: "absolute", inset: 0, zIndex: 20,
                    display: "flex", flexDirection: "column",
                    alignItems: "center", justifyContent: "center",
                    padding: 24, gap: 16, textAlign: "center",
                    background: "rgba(11,18,32,0.97)", borderRadius: 12,
                  }}
                >
                  <Box sx={{
                    width: { xs: 40, sm: 46, md: 52 },
                    height: { xs: 40, sm: 46, md: 52 },
                    borderRadius: "50%", bgcolor: C.mediumAlpha,
                    display: "flex", alignItems: "center",
                    justifyContent: "center", color: C.accent,
                    '@media (max-width: 240px)': { width: 28, height: 28 },
                  }}>
                    <CheckCircle2 size={26} />
                  </Box>
                  <Typography variant="h5" sx={{
                    fontWeight: 800, color: "#fff",
                    fontSize: { xs: '1rem', sm: '1.2rem', md: '1.5rem' },
                    '@media (max-width: 240px)': { fontSize: '0.65rem' },
                    '@media (min-width: 241px) and (max-width: 359px)': { fontSize: '0.8rem' },
                  }}>
                    Thank you, message sent!
                  </Typography>
                  <Typography sx={{
                    color: "#cbd5e1",
                    fontSize: { xs: '0.75rem', md: '0.85rem' },
                    lineHeight: 1.7, maxWidth: 280,
                    '@media (max-width: 240px)': { fontSize: '0.48rem', maxWidth: 160 },
                    '@media (min-width: 241px) and (max-width: 359px)': { fontSize: '0.6rem', maxWidth: 200 },
                  }}>
                    Shiva will reply to your submission shortly.
                  </Typography>
                  <Button
                    onClick={() => setSentSuccess(false)}
                    variant="outlined" size="small"
                    sx={{
                      mt: 1, fontFamily: "monospace", fontWeight: 700,
                      fontSize: { xs: '0.6rem', md: '0.7rem' },
                      color: "#94a3b8", borderColor: "rgba(30,51,88,0.55)",
                      borderRadius: 1.5, textTransform: "none",
                      px: { xs: 1.5, md: 2.5 }, minHeight: { xs: 28, md: 34 },
                      "&:hover": { color: "#fff", borderColor: C.accent, bgcolor: "transparent" },
                      '@media (max-width: 240px)': { fontSize: '0.45rem', px: 1, minHeight: 22 },
                    }}
                  >
                    Reset Form
                  </Button>
                </motion.div>
              )}

              {/* Form fields */}
              <Box
                component="form" onSubmit={handleSubmit} noValidate
                sx={{
                  display: "flex", flexDirection: "column",
                  gap: { xs: 2, sm: 2.5 },
                  '@media (max-width: 240px)': { gap: 1 },
                  '@media (min-width: 241px) and (max-width: 359px)': { gap: 1.5 },
                }}
              >
                {/* Name */}
                <Box>
                  <TextField fullWidth type="text" placeholder="Name"
                    value={formData.name}
                    onChange={(e) => { setFormData({ ...formData, name: e.target.value }); clearError("name"); }}
                    error={!!formErrors.name} sx={fieldSx("name")} />
                  {formErrors.name && (
                    <Box sx={{ display: "flex", alignItems: "center", gap: 0.75, mt: 0.75,
                      '@media (max-width: 359px)': { mt: 0.5, gap: 0.5 },
                    }}>
                      <AlertCircle size={13} color="#f87171" />
                      <Typography sx={{ color: "#f87171",
                        fontSize: { xs: '0.65rem', md: '0.72rem' },
                        '@media (max-width: 240px)': { fontSize: '0.42rem' },
                        '@media (min-width: 241px) and (max-width: 359px)': { fontSize: '0.52rem' },
                      }}>{formErrors.name}</Typography>
                    </Box>
                  )}
                </Box>

                {/* Email */}
                <Box>
                  <TextField fullWidth type="email" placeholder="Email"
                    value={formData.email}
                    onChange={(e) => { setFormData({ ...formData, email: e.target.value }); clearError("email"); }}
                    error={!!formErrors.email} sx={fieldSx("email")} />
                  {formErrors.email && (
                    <Box sx={{ display: "flex", alignItems: "center", gap: 0.75, mt: 0.75,
                      '@media (max-width: 359px)': { mt: 0.5, gap: 0.5 },
                    }}>
                      <AlertCircle size={13} color="#f87171" />
                      <Typography sx={{ color: "#f87171",
                        fontSize: { xs: '0.65rem', md: '0.72rem' },
                        '@media (max-width: 240px)': { fontSize: '0.42rem' },
                        '@media (min-width: 241px) and (max-width: 359px)': { fontSize: '0.52rem' },
                      }}>{formErrors.email}</Typography>
                    </Box>
                  )}
                </Box>

                {/* Message */}
                <Box>
                  <TextField fullWidth multiline rows={5} placeholder="Message"
                    value={formData.message}
                    onChange={(e) => { setFormData({ ...formData, message: e.target.value }); clearError("message"); }}
                    error={!!formErrors.message}
                    sx={{
                      ...fieldSx("message"),
                      '@media (max-width: 359px)': {
                        '& .MuiOutlinedInput-root': { '& textarea': { minHeight: '60px' } },
                      },
                    }} />
                  {formErrors.message && (
                    <Box sx={{ display: "flex", alignItems: "center", gap: 0.75, mt: 0.75,
                      '@media (max-width: 359px)': { mt: 0.5, gap: 0.5 },
                    }}>
                      <AlertCircle size={13} color="#f87171" />
                      <Typography sx={{ color: "#f87171",
                        fontSize: { xs: '0.65rem', md: '0.72rem' },
                        '@media (max-width: 240px)': { fontSize: '0.42rem' },
                        '@media (min-width: 241px) and (max-width: 359px)': { fontSize: '0.52rem' },
                      }}>{formErrors.message}</Typography>
                    </Box>
                  )}
                </Box>

                {/* Send button */}
                <Button
                  type="submit" fullWidth disabled={isSubmitting}
                  startIcon={isSubmitting
                    ? <CircularProgress size={16} sx={{ color: "#94a3b8" }} />
                    : <Send size={16} />
                  }
                  sx={{
                    height: { xs: 42, sm: 46, md: 50 },
                    mt: 0.5,
                    fontSize: { xs: '0.82rem', sm: '0.88rem', md: '0.95rem' },
                    fontWeight: 700, textTransform: "none",
                    borderRadius: { xs: 1.5, md: 2 },
                    bgcolor: C.accent, color: "#fff",
                    boxShadow: "0 4px 20px rgba(10,169,243,0.3)",
                    transition: "all 0.25s ease",
                    "&:hover": {
                      bgcolor: "#0893d4",
                      boxShadow: "0 6px 24px rgba(10,169,243,0.45)",
                      transform: "translateY(-1px)",
                    },
                    "&:disabled": { bgcolor: "rgba(30,51,88,0.4)", color: C.muted, boxShadow: "none" },
                    '@media (max-width: 240px)': {
                      height: 28, fontSize: '0.52rem', mt: 0.25, borderRadius: 1,
                      '& .MuiButton-startIcon svg': { width: 10, height: 10 },
                    },
                    '@media (min-width: 241px) and (max-width: 359px)': {
                      height: 34, fontSize: '0.65rem',
                      '& .MuiButton-startIcon svg': { width: 13, height: 13 },
                    },
                  }}
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </Button>
              </Box>
            </Box>
          </Box>
        </Box>

        {/* Footer */}
        <Divider sx={{
          mt: { xs: 6, sm: 8, md: 10, lg: 12 },
          borderColor: "rgba(30,51,88,0.2)",
          '@media (max-width: 240px)': { mt: 3 },
          '@media (min-width: 241px) and (max-width: 359px)': { mt: 4 },
        }} />
        <Typography sx={{
          textAlign: "center", color: C.muted,
          fontSize: { xs: '0.62rem', md: '0.72rem' },
          fontWeight: 300, mt: { xs: 2, md: 3 },
          '@media (max-width: 240px)': { fontSize: '0.4rem', mt: 1.5 },
          '@media (min-width: 241px) and (max-width: 359px)': { fontSize: '0.5rem' },
        }}>
          &copy; {new Date().getFullYear()} Kasula Shiva. All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
}