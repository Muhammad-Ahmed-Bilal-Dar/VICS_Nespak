import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Back from "../utils/back.jpg";
import { 
  Box, 
  Card, 
  Typography, 
  TextField, 
  Button, 
  CircularProgress,
  Alert 
} from '@mui/material';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../features/auth/authSlice';

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [localError, setLocalError] = useState<string | null>(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLoading = false;

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLocalError(null);

    if (username === 'admin' && password === 'admin') {
      dispatch(setCredentials({ 
        user: { username: 'admin', role: 'admin' },
        token: 'fake-admin-token' 
      }));
      navigate('/dashboard');
    } else if (username === 'station' && password === 'station') {
      dispatch(setCredentials({ 
        user: { username: 'station', role: 'Station' },
        token: 'fake-station-token' 
      }));
      navigate('/dashboard');
    } else {
      setLocalError('Invalid demo credentials. Use admin/admin or station/station.');
    }
  };

  return (
    <Box
      sx={{
        width: '100vw',
        height: '100vh',
        backgroundImage: `url(${Back})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Card
        sx={{
          padding: 4,
          width: { xs: '90%', sm: '400px' },
          backgroundColor: 'rgba(255, 255, 255, 0.0)',
          backdropFilter: 'blur(8px)',
          borderRadius: 3,
          boxShadow: 5,
          border: '1px solid rgba(255, 255, 255, 0.3)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography 
          component="h1" 
          variant="h5" 
          sx={{ 
            mb: 3, 
            fontWeight: 'bold', 
            color: 'white', 
            textAlign: 'center' 
          }}
        >
          Vehicle Inspection & Certification System
        </Typography>

        <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%' }}>
        <TextField
  margin="normal"
  required
  fullWidth
  id="username"
  label="Username"
  name="username"
  autoComplete="username"
  autoFocus
  value={username}
  onChange={(e) => setUsername(e.target.value)}
  disabled={isLoading}
  InputProps={{
    style: { color: 'white' },
    sx: {
      '& .MuiOutlinedInput-notchedOutline': {
        borderColor: 'white',
      },
      '&:hover .MuiOutlinedInput-notchedOutline': {
        borderColor: 'white',
      },
      '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
        borderColor: 'white',
      },
    }
  }}
  InputLabelProps={{
    style: { color: 'white' },
  }}
/>
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={isLoading}
            InputProps={{
              style: { color: 'white' },
            }}
            InputLabelProps={{
              style: { color: 'white' },
            }}
          />
          {localError && (
            <Alert severity="error" sx={{ width: '100%', mt: 2 }}>
              {localError}
            </Alert>
          )}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3 }}
            disabled={isLoading}
          >
            {isLoading ? <CircularProgress size={24} /> : 'Sign In'}
          </Button>
        </Box>
      </Card>
    </Box>
  );
};

export default LoginPage;
