import { Box, Button, Container, Grid, Paper, Typography } from '@mui/material';
import { useAuth } from '../../context/AuthContext';
import { useLogout } from '../../hooks/auth/useAuth';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import InventoryIcon from '@mui/icons-material/Inventory';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';

/**
 * Admin Dashboard Page
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
          Admin Dashboard
        </Typography>
        
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Typography variant="body2">
            Welcome, {user?.name || 'Admin'}
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
        <Grid item xs={12} md={6} lg={3}>
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
              Total Stations
            </Typography>
            <Typography variant="h4" component="div" sx={{ flexGrow: 1 }}>
              12
            </Typography>
            <DashboardIcon color="primary" />
          </Paper>
        </Grid>

        <Grid item xs={12} md={6} lg={3}>
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
              Total Users
            </Typography>
            <Typography variant="h4" component="div" sx={{ flexGrow: 1 }}>
              24
            </Typography>
            <PeopleIcon color="secondary" />
          </Paper>
        </Grid>

        <Grid item xs={12} md={6} lg={3}>
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
              Total Vehicles
            </Typography>
            <Typography variant="h4" component="div" sx={{ flexGrow: 1 }}>
              345
            </Typography>
            <InventoryIcon color="success" />
          </Paper>
        </Grid>

        <Grid item xs={12} md={6} lg={3}>
          <Paper
            elevation={2}
            sx={{
              p: 3,
              display: 'flex',
              flexDirection: 'column',
              height: 140,
              borderLeft: '4px solid',
              borderColor: 'info.main',
            }}
          >
            <Typography variant="subtitle2" color="text.secondary" gutterBottom>
              System Settings
            </Typography>
            <Typography variant="h4" component="div" sx={{ flexGrow: 1 }}>
              4
            </Typography>
            <SettingsIcon color="info" />
          </Paper>
        </Grid>

        {/* Admin Content Section */}
        <Grid item xs={12}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h5" gutterBottom>
              Admin Controls
            </Typography>
            <Typography paragraph>
              Welcome to the VICS Administrator Dashboard. From here, you can manage stations, 
              users, vehicles, and system settings. Use the navigation to access different parts 
              of the administration panel.
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Last login: {new Date().toLocaleString()}
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard; 