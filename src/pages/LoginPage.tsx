import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Container, 
  Box, 
  Card, 
  Typography, 
  TextField, 
  Button, 
  CircularProgress,
  Alert 
} from '@mui/material';
// import { useLoginMutation } from '../features/auth/authApiSlice'; // Temporarily unused
import { useDispatch } from 'react-redux';
import { setCredentials } from '../features/auth/authSlice'; // Import the action

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [localError, setLocalError] = useState<string | null>(null); // Added for demo error
  const navigate = useNavigate(); // Now used
  const dispatch = useDispatch();
  
  // Temporarily disable RTK Query hook for demo login
  // const [login, { isLoading, error }] = useLoginMutation(); 
  const isLoading = false; // Simulate no loading for demo
  // const error = null; // Use localError instead

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLocalError(null); // Clear previous demo errors

    // --- Demo Login Logic --- 
    if (username === 'admin' && password === 'admin') {
      console.log('Demo admin login successful');
      const mockUserData = { 
        user: { username: 'admin', role: 'admin' as ('admin' | 'Station') }, // Mock admin user
        token: 'fake-admin-token' // Mock token
      };
      dispatch(setCredentials(mockUserData)); 
      setUsername('');
      setPassword('');
      navigate('/dashboard'); 
    } else if (username === 'station' && password === 'station') { // Added a demo station user
        console.log('Demo station login successful');
        const mockUserData = { 
          user: { username: 'station', role: 'Station' as ('admin' | 'Station') }, // Mock station user
          token: 'fake-station-token' // Mock token
        };
        dispatch(setCredentials(mockUserData)); 
        setUsername('');
        setPassword('');
        navigate('/dashboard'); 
    } else {
      console.error('Demo login failed: Invalid credentials');
      setLocalError('Invalid demo credentials. Use admin/admin or station/station.'); // Set demo error
    }
    // --- End Demo Login Logic ---

    /* --- Original API Call Logic (Commented Out) ---
    try {
      const userData = await login({ username, password }).unwrap(); 
      dispatch(setCredentials(userData)); 
      setUsername('');
      setPassword('');
      navigate('/dashboard'); 
    } catch (err) {
      console.error('Failed to login: ', err);
      // Error determination logic below would use the 'error' from useLoginMutation
    }
    */
  };

  // Determine the error message (prioritize localError for demo)
  const errorMessage: string | null = localError;
  /* // Original error logic using RTK Query's error object (Commented Out)
  if (!errorMessage && error) { // Only check RTK error if no localError
    if ('status' in error) {
      const errMsg = 'error' in error ? error.error : JSON.stringify(error.data);
      errorMessage = `Login Failed: ${errMsg}`;
    } else if ('message' in error) {
      errorMessage = `Login Failed: ${error.message}`;
    } else {
        errorMessage = 'Login Failed: An unknown error occurred';
    }
  }
  */

  return (
    <Container 
      component="main" 
      maxWidth="xs" 
      sx={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
        minHeight: '100vh' 
      }}
    >
      <Card
        sx={{
          padding: 4,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          // Glassmorphism styles
          backgroundColor: 'rgba(255, 255, 255, 0.1)', // Semi-transparent background
          backdropFilter: 'blur(10px)', // Blur effect
          border: '1px solid rgba(255, 255, 255, 0.2)', // Subtle border
          borderRadius: 2, // Slightly rounded corners
          boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)', // Soft shadow
        }}
      >
        <Typography component="h1" variant="h5" sx={{ mb: 2 }}>
          Sign In (Demo Mode)
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username (admin or station)"
            name="username"
            autoComplete="username"
            autoFocus
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            disabled={isLoading}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password (admin or station)"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={isLoading}
          />
          {errorMessage && (
              <Alert severity="error" sx={{ width: '100%', mt: 2 }}>
                  {errorMessage}
              </Alert>
          )}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={isLoading}
          >
            {isLoading ? <CircularProgress size={24} /> : 'Sign In'}
          </Button>
        </Box>
      </Card>
    </Container>
  );
};

export default LoginPage; 