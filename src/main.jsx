import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ThemeProvider, createTheme } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import App from './App.jsx';

// ── MUI dark theme matching portfolio design tokens ────────────
const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#0aa9f3',
    },
    background: {
      default: '#0b1220',
      paper:   '#1e3358',
    },
    text: {
      primary:   '#f1f5f9',
      secondary: '#94a3b8',
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica Neue", sans-serif',
    h1: { fontWeight: 800 },
    h2: { fontWeight: 800 },
    h3: { fontWeight: 700 },
    h4: { fontWeight: 700 },
    h5: { fontWeight: 600 },
    h6: { fontWeight: 600 },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    // Remove default MUI button text-transform uppercase
    MuiButton: {
      styleOverrides: {
        root: { textTransform: 'none' },
      },
    },
    // Smooth outline transitions on inputs
    MuiOutlinedInput: {
      styleOverrides: {
        root: { transition: 'border-color 0.2s ease' },
      },
    },
  },
});

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      {/* CssBaseline normalises browser defaults + applies dark bg */}
      <CssBaseline />
      <App />
    </ThemeProvider>
  </StrictMode>
);