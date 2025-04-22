import { Link as RouterLink } from 'react-router-dom';
import { Box, Button, Container, Typography, useTheme } from '@mui/material';
import SecurityIcon from '@mui/icons-material/Security';

/**
 * Unauthorized Access Page
 */
const UnauthorizedPage = () => {
  const theme = useTheme();

  return (
    <Container sx={{ textAlign: 'center', py: 15 }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 4,
        }}
      >
        <SecurityIcon 
          sx={{ 
            fontSize: 100, 
            color: theme.palette.error.main
          }} 
        />
        
        <Typography variant="h3" fontWeight="medium">
          Access Denied
        </Typography>
        
        <Typography
          variant="body1"
          color="text.secondary"
          sx={{ maxWidth: '500px', mb: 4 }}
        >
          You do not have permission to access this page. Please contact your 
          administrator if you believe this is an error.
        </Typography>
        
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button
            component={RouterLink}
            to="/login"
            variant="contained"
            color="primary"
            size="large"
          >
            Back to Login
          </Button>
          
          <Button
            component={RouterLink}
            to="/"
            variant="outlined"
            size="large"
          >
            Go to Home
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default UnauthorizedPage; 