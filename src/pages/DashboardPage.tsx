import React from 'react';
import { Box, Container, Typography, Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { logOut, selectCurrentUser } from '../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';
// import logo from '../utils/your-logo-file.png'; // Import logo when filename is known

const DashboardPage: React.FC = () => {
    const user = useSelector(selectCurrentUser);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(logOut());
        // Optionally clear API cache if needed: 
        // dispatch(apiSlice.util.resetApiState()); 
        navigate('/login');
    };

    return (
        <Container component="main" maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    {/* Logo Placeholder - Add img tag here when logo is available */}
                    {/* <Box component="img" sx={{ height: 40, mr: 2 }} alt="VICS Logo" src={logo} /> */}
                    <Typography component="h1" variant="h4" sx={{ color: 'text.primary' }}>
                        Dashboard
                    </Typography>
                </Box>
                <Button variant="contained" color="secondary" onClick={handleLogout}>
                    Logout
                </Button>
            </Box>
            <Box sx={{ mt: 3, p: 3, backgroundColor: 'background.paper', borderRadius: 1, boxShadow: 1 }}>
                <Typography variant="h6" sx={{ color: 'text.primary' }}>
                    Welcome, {user?.username || 'User'}! 
                </Typography>
                <Typography sx={{ color: 'text.secondary' }}>
                    Your role is: {user?.role || 'Unknown'}
                </Typography>
                {/* Dashboard content goes here */} 
                <Typography sx={{mt: 2, color: 'text.primary' }}>
                    This is a placeholder for the dashboard content. 
                    Based on your role ({user?.role || 'Unknown'}), different components or data would be displayed here.
                </Typography>
            </Box>
        </Container>
    );
};

export default DashboardPage; 