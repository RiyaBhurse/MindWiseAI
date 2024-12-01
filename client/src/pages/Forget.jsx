import React, { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ForgetPassword } from '../calls/userCalls'; // API call to handle forget password
import Cookies from 'js-cookie';
import { Box, Button, TextField, Typography, Paper } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import '../styles/Auth.css';

const theme = createTheme({
    palette: {
        primary: {
            main: '#64b5f6',
        },
        background: {
            default: '#f5f5f5',
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
    },
});

function Forget() {
    const navigate = useNavigate();

    useEffect(() => {
        if (Cookies.get('token')) {
            navigate('/');
        }
    }, [navigate]);

    const onSubmit = async (event) => {
        event.preventDefault();
        const email = event.target.email.value;

        try {
            const response = await ForgetPassword({ email });
            if (response.status === 'success') {
                alert('OTP sent to your email');
                navigate('/reset-password');
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
                        Forget Password
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                        Enter your email to receive an OTP
                    </Typography>

                    <form onSubmit={onSubmit}>
                        <Box sx={{ marginBottom: 2 }}>
                            <TextField
                                fullWidth
                                label="Email"
                                id="email"
                                name="email"
                                variant="outlined"
                                placeholder="Enter your email"
                                required
                            />
                        </Box>
                        <Button type="submit" fullWidth variant="contained" color="primary">
                            SEND OTP
                        </Button>
                    </form>

                    <Typography variant="body1" sx={{ marginTop: 2 }}>
                        Existing User?{' '}
                        <Link to="/login" style={{ color: theme.palette.primary.main }}>
                            Login Here
                        </Link>
                    </Typography>
                </Paper>
            </Box>
        </ThemeProvider>
    );
}

export default Forget;