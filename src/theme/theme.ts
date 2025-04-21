import { createTheme } from '@mui/material/styles';

// Create a theme instance.
const theme = createTheme({
  palette: {
    mode: 'dark', // Start with a dark theme, can be configured
    primary: {
      main: '#90caf9',
    },
    secondary: {
      main: '#f48fb1',
    },
    background: {
      default: '#121212',
      paper: '#1e1e1e',
    },
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
  },
  // We can add component overrides and custom styles here later,
  // including styles for glassmorphism.
});

export default theme; 