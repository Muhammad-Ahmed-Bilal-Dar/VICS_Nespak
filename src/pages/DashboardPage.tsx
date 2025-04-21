import React from 'react';
import { Box, Container, Typography, Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { logOut, selectCurrentUser } from '../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';

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
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography component="h1" variant="h4">
                    Dashboard
                </Typography>
                <Button variant="contained" color="secondary" onClick={handleLogout}>
                    Logout
                </Button>
            </Box>
            <Box sx={{ mt: 3 }}>
                <Typography variant="h6">
                    Welcome, {user?.username || 'User'}! 
                </Typography>
                <Typography>
                    Your role is: {user?.role || 'Unknown'}
                </Typography>
                {/* Dashboard content goes here */} 
                <Typography sx={{mt: 2}}>
                    This is a placeholder for the dashboard content. 
                    Based on your role ({user?.role || 'Unknown'}), different components or data would be displayed here.
                </Typography>
            </Box>
        </Container>
    );
};

export default DashboardPage; 