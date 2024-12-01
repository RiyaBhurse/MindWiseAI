import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LoginUser } from '../calls/userCalls';
import Cookies from 'js-cookie';
import '../styles/Auth.css';
import { Box, Button, TextField, Typography, Paper } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

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
        h2: {
            fontSize: '1.5rem',
            fontWeight: '500',
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

function Login() {
    const navigate = useNavigate();

    useEffect(() => {
        if (Cookies.get('token')) {
            navigate('/');
        }
    }, [navigate]);

    const onSubmit = async (event) => {
        event.preventDefault();

        const email = event.target.email.value;
        const password = event.target.password.value;

        try {
            const response = await LoginUser({ email, password });
            if (response.success) {
                alert(response.message);
                Cookies.set('token', response.data.token, {
                    path: '/',
                    expires: 7,
                    sameSite: 'lax',
                });
                navigate('/');
            } else {
                alert(response.message);
            }
        } catch (error) {
            alert(error.message);
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
                        Sign in to your account to continue
                    </Typography>

                    <form onSubmit={onSubmit}>
                        <Box sx={{ marginBottom: 2 }}>
                            <TextField
                                fullWidth
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
                            Login
                        </Button>
                    </form>

                    <Typography variant="body1" sx={{ marginTop: 2 }}>
                        New User?{' '}
                        <Link to="/register" style={{ color: theme.palette.primary.main }}>
                            Register Here
                        </Link>
                    </Typography>
                    <Typography variant="body1">
                        Forgot Password?{' '}
                        <Link to="/forget-password" style={{ color: theme.palette.primary.main }}>
                            Click Here
                        </Link>
                    </Typography>
                </Paper>
            </Box>
        </ThemeProvider>
    );
}

export default Login;
