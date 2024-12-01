import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { RegisterUser } from '../calls/userCalls';
import Cookies from 'js-cookie';
import { Box, Button, TextField, Typography, Paper } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import '../styles/Auth.css';

const theme = createTheme({
    palette: {
        primary: {
            main: '#64b5f6', // Soft blue for buttons and links
        },
        secondary: {
            main: '#81c784', // Soft green for hover effects
        },
        background: {
            default: '#f5f5f5', // Light gray background for a calming effect
        },
    },
    typography: {
        fontFamily: 'Roboto, sans-serif',
        h1: {
            fontSize: '2rem',
            fontWeight: '600',
            color: '#4e4e4e',
        },
        body1: {
            color: '#4e4e4e',
        },
        button: {
            textTransform: 'none',
        },
    },
});

function Register() {
    const navigate = useNavigate();

    useEffect(() => {
        if (Cookies.get('token')) {
            navigate('/'); // Redirect if user is logged in
        }
    }, [navigate]);

    const onSubmit = async (event) => {
        event.preventDefault(); // Prevent default form submission

        const name = event.target.name.value;
        const email = event.target.email.value;
        const password = event.target.password.value;

        try {
            const response = await RegisterUser({ name, email, password });
            if (response.success) {
                alert(response.message); // Display success message
                navigate('/login'); // Redirect to login page
            } else {
                alert(response.message); // Display error message
            }
        } catch (error) {
            alert(error.message); // Handle errors
        }
    };

    return (
        <ThemeProvider theme={theme}>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    minHeight: '100vh',
                    backgroundColor: theme.palette.background.default,
                    padding: 2,
                }}
            >
                <Paper
                    elevation={3}
                    sx={{
                        padding: 4,
                        borderRadius: 3,
                        width: '100%',
                        maxWidth: '400px',
                        textAlign: 'center',
                        backgroundColor: 'white',
                    }}
                >
                    <Typography variant="h1" gutterBottom>
                        Welcome to MindWiseAI
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                        Create a new account to get started
                    </Typography>

                    <form onSubmit={onSubmit}>
                        <Box sx={{ marginBottom: 2 }}>
                            <TextField
                                fullWidth
                                label="Name"
                                id="name"
                                name="name"
                                variant="outlined"
                                placeholder="Enter your Name"
                                required
                            />
                        </Box>
                        <Box sx={{ marginBottom: 2 }}>
                            <TextField
                                fullWidth
                                type="email"
                                label="Email"
                                id="email"
                                name="email"
                                variant="outlined"
                                placeholder="Enter your Email"
                                required
                            />
                        </Box>
                        <Box sx={{ marginBottom: 2 }}>
                            <TextField
                                fullWidth
                                type="password"
                                label="Password"
                                id="password"
                                name="password"
                                variant="outlined"
                                placeholder="Enter your Password"
                                required
                            />
                        </Box>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            sx={{ padding: 1 }}
                        >
                            Register
                        </Button>
                    </form>

                    <Typography variant="body1" sx={{ marginTop: 2 }}>
                        Already have an account?{' '}
                        <Link to="/login" style={{ color: theme.palette.primary.main }}>
                            Login Here
                        </Link>
                    </Typography>
                </Paper>
            </Box>
        </ThemeProvider>
    );
}

export default Register;