import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Card,
  Stack,
  Button,
  Divider,
  TextField,
  IconButton,
  InputLabel,
  Typography,
  InputAdornment,
  Container,
  Alert,
  FormControl,
  Select,
  MenuItem,
  FormHelperText,
  styled,
} from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

import { useLogin } from '../../hooks/auth/useAuth';
import { LoginCredentials } from '../../api/auth/authService';

// Styled components
const StyledRoot = styled('div')(({ theme }) => ({
  minHeight: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: theme.spacing(3),
  backgroundImage: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
}));

const StyledCard = styled(Card)(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  padding: theme.spacing(4),
  boxShadow: theme.shadows[5],
  borderRadius: theme.shape.borderRadius,
}));

const StyledLockIcon = styled(Box)(({ theme }) => ({
  width: 40,
  height: 40,
  display: 'flex',
  borderRadius: '50%',
  position: 'relative',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: theme.palette.primary.lighter,
  marginBottom: theme.spacing(2),
  color: theme.palette.primary.main,
}));

/**
 * Login Page Component
 */
const LoginPage = () => {
  const login = useLogin();

  // Form state
  const [formData, setFormData] = useState<LoginCredentials>({
    username: '',
    password: '',
    role: 'station',
  });
  
  // UI state
  const [showPassword, setShowPassword] = useState(false);
  const [formErrors, setFormErrors] = useState({
    username: '',
    password: '',
  });

  // Handle form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | { name?: string; value: unknown }>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name as string]: value }));
    
    // Clear errors when user types
    if (formErrors[name as keyof typeof formErrors]) {
      setFormErrors((prev) => ({ ...prev, [name as string]: '' }));
    }
  };

  // Toggle password visibility
  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  // Validate form before submission
  const validateForm = (): boolean => {
    const errors = {
      username: '',
      password: '',
    };
    
    if (!formData.username.trim()) {
      errors.username = 'Username is required';
    }
    
    if (!formData.password) {
      errors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
    }
    
    setFormErrors(errors);
    
    // Return true if no errors
    return !Object.values(errors).some((error) => error);
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Validate form
    if (!validateForm()) {
      return;
    }
    
    // Attempt login
    login.mutate(formData);
  };

  return (
    <StyledRoot>
      <Container maxWidth="sm">
        <StyledCard>
          <Stack
            direction="column"
            alignItems="center"
            justifyContent="center"
            spacing={2}
          >
            <StyledLockIcon>
              <LockOutlinedIcon />
            </StyledLockIcon>
            
            <Typography variant="h4" gutterBottom>
              Sign in to VICS
            </Typography>
            
            <Typography variant="body2" sx={{ color: 'text.secondary', mb: 5, textAlign: 'center' }}>
              Vehicle Inventory Control System
            </Typography>
          </Stack>

          {login.isError && (
            <Alert severity="error" sx={{ mb: 3 }}>
              Invalid credentials. Please try again.
            </Alert>
          )}

          <form onSubmit={handleSubmit}>
            <Stack spacing={3}>
              <TextField
                fullWidth
                name="username"
                label="Username"
                value={formData.username}
                onChange={handleChange}
                error={!!formErrors.username}
                helperText={formErrors.username}
              />

              <TextField
                fullWidth
                name="password"
                label="Password"
                type={showPassword ? 'text' : 'password'}
                value={formData.password}
                onChange={handleChange}
                error={!!formErrors.password}
                helperText={formErrors.password}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={handleTogglePassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              
              <FormControl fullWidth>
                <InputLabel id="role-label">Login as</InputLabel>
                <Select
                  labelId="role-label"
                  id="role"
                  name="role"
                  value={formData.role}
                  label="Login as"
                  onChange={handleChange}
                >
                  <MenuItem value="admin">Administrator</MenuItem>
                  <MenuItem value="station">Station User</MenuItem>
                </Select>
                <FormHelperText>
                  Select your role to access the appropriate dashboard
                </FormHelperText>
              </FormControl>
            </Stack>

            <LoadingButton
              fullWidth
              size="large"
              type="submit"
              variant="contained"
              loading={login.isPending}
              sx={{ mt: 4 }}
            >
              Sign In
            </LoadingButton>
          </form>

          <Divider sx={{ my: 3 }}>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              OR
            </Typography>
          </Divider>

          <Typography variant="body2" sx={{ mt: 2, textAlign: 'center' }}>
            Don't have an account?{' '}
            <Button
              component={RouterLink}
              to="/contact-admin"
              variant="text"
              sx={{ textDecoration: 'none' }}
            >
              Contact Administrator
            </Button>
          </Typography>
        </StyledCard>
      </Container>
    </StyledRoot>
  );
};

export default LoginPage; 