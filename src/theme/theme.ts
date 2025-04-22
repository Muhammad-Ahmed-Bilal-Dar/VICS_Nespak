import { createTheme } from '@mui/material/styles';

// Create a theme instance.
const theme = createTheme({
  palette: {
    mode: 'light', // Switch to light mode
    primary: {
      main: '#00a76f', // Set primary color to green shade
    },
    secondary: {
      main: '#dc004e', // Kept secondary as red for contrast
    },
    background: {
      default: '#fafafa', // Off-white background
      paper: '#ffffff', // White for paper elements like Card
    },
    text: {
        primary: '#212121', // Dark grey/black for primary text
        secondary: '#757575', // Lighter grey for secondary text
    }
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
  },
  // We can add component overrides and custom styles here later,
  // including styles for glassmorphism.
});

export default theme; 