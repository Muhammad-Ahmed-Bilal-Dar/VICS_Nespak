import { Link as RouterLink } from 'react-router-dom';
import { Box, Button, Container, Typography, useTheme } from '@mui/material';

/**
 * 404 Not Found Page
 */
const NotFoundPage = () => {
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
        <Typography variant="h1" sx={{ fontSize: { xs: '6rem', md: '10rem' }, fontWeight: 'bold' }}>
          404
        </Typography>
        
        <Typography variant="h4" fontWeight="medium">
          Page Not Found
        </Typography>
        
        <Typography
          variant="body1"
          color="text.secondary"
          sx={{ maxWidth: '450px', mb: 4 }}
        >
          The page you are looking for might have been removed, had its name changed, 
          or is temporarily unavailable.
        </Typography>
        
        <Button
          component={RouterLink}
          to="/"
          variant="contained"
          color="primary"
          size="large"
          sx={{
            px: 5,
            py: 1.2,
            fontSize: '1rem',
            fontWeight: 'medium',
            borderRadius: theme.shape.borderRadius,
          }}
        >
          Go to Home
        </Button>
      </Box>
    </Container>
  );
};

export default NotFoundPage; 