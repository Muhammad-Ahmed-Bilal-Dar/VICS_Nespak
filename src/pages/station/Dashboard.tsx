import { Box, Button, Container, Grid, Paper, Typography } from '@mui/material';
import { useAuth } from '../../context/AuthContext';
import { useLogout } from '../../hooks/auth/useAuth';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import HistoryIcon from '@mui/icons-material/History';
import AssignmentIcon from '@mui/icons-material/Assignment';
import LogoutIcon from '@mui/icons-material/Logout';

/**
 * Station Dashboard Page
 */
const Dashboard = () => {
  const { user } = useAuth();
  const logout = useLogout();

  // Handle logout click
  const handleLogout = () => {
    logout.mutate();
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h4" component="h1" fontWeight="bold">
          Station Dashboard
        </Typography>
        
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Typography variant="body2">
            Welcome, {user?.name || 'Station User'}
          </Typography>
          <Button 
            variant="outlined" 
            color="inherit" 
            size="small"
            startIcon={<LogoutIcon />}
            onClick={handleLogout}
          >
            Logout
          </Button>
        </Box>
      </Box>

      <Grid container spacing={4}>
        {/* Dashboard Overview */}
        <Grid item xs={12} md={6} lg={4}>
          <Paper
            elevation={2}
            sx={{
              p: 3,
              display: 'flex',
              flexDirection: 'column',
              height: 140,
              borderLeft: '4px solid',
              borderColor: 'primary.main',
            }}
          >
            <Typography variant="subtitle2" color="text.secondary" gutterBottom>
              Available Vehicles
            </Typography>
            <Typography variant="h4" component="div" sx={{ flexGrow: 1 }}>
              24
            </Typography>
            <DirectionsCarIcon color="primary" />
          </Paper>
        </Grid>

        <Grid item xs={12} md={6} lg={4}>
          <Paper
            elevation={2}
            sx={{
              p: 3,
              display: 'flex',
              flexDirection: 'column',
              height: 140,
              borderLeft: '4px solid',
              borderColor: 'secondary.main',
            }}
          >
            <Typography variant="subtitle2" color="text.secondary" gutterBottom>
              Transaction History
            </Typography>
            <Typography variant="h4" component="div" sx={{ flexGrow: 1 }}>
              156
            </Typography>
            <HistoryIcon color="secondary" />
          </Paper>
        </Grid>

        <Grid item xs={12} md={6} lg={4}>
          <Paper
            elevation={2}
            sx={{
              p: 3,
              display: 'flex',
              flexDirection: 'column',
              height: 140,
              borderLeft: '4px solid',
              borderColor: 'success.main',
            }}
          >
            <Typography variant="subtitle2" color="text.secondary" gutterBottom>
              Pending Requests
            </Typography>
            <Typography variant="h4" component="div" sx={{ flexGrow: 1 }}>
              3
            </Typography>
            <AssignmentIcon color="success" />
          </Paper>
        </Grid>

        {/* Station Activity Section */}
        <Grid item xs={12}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h5" gutterBottom>
              Recent Activity
            </Typography>
            <Box sx={{ py: 2 }}>
              {[1, 2, 3].map((item) => (
                <Box 
                  key={item} 
                  sx={{ 
                    p: 2, 
                    borderBottom: '1px solid', 
                    borderColor: 'divider',
                    '&:last-child': { borderBottom: 'none' }
                  }}
                >
                  <Typography variant="subtitle1">
                    Vehicle Inventory Update
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {new Date(Date.now() - item * 3600000).toLocaleString()} • User: Station Manager
                  </Typography>
                </Box>
              ))}
            </Box>
          </Paper>
        </Grid>

        {/* Station Info Section */}
        <Grid item xs={12}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h5" gutterBottom>
              Station Information
            </Typography>
            <Typography paragraph>
              Welcome to your VICS Station Dashboard. From here, you can manage vehicle inventory,
              track transactions, and submit requests to the administrator. Use the navigation to 
              access different functions of the station management system.
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Station ID: ST-{Math.floor(Math.random() * 1000)} • Last Update: {new Date().toLocaleString()}
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard; 