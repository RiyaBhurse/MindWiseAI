import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ResetPassword } from '../calls/userCalls'; // API call to reset the password
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

function Reset() {
    const navigate = useNavigate();

    useEffect(() => {
        if (Cookies.get('token')) {
            navigate('/');
        }
    }, [navigate]);

    const onSubmit = async (event) => {
        event.preventDefault();
        const otp = event.target.otp.value;
        const password = event.target.password.value;

        try {
            const response = await ResetPassword({ otp, password });
            if (response.status === 'success') {
                alert(response.message);
                navigate('/login');
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
                        Reset Password
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                        Enter the OTP and your new password
                    </Typography>

                    <form onSubmit={onSubmit}>
                        <Box sx={{ marginBottom: 2 }}>
                            <TextField
                                fullWidth
                                label="OTP"
                                id="otp"
                                name="otp"
                                type="number"
                                variant="outlined"
                                placeholder="Enter your OTP"
                                required
                            />
                        </Box>
                        <Box sx={{ marginBottom: 2 }}>
                            <TextField
                                fullWidth
                                label="New Password"
                                id="password"
                                name="password"
                                type="password"
                                variant="outlined"
                                placeholder="Enter your new password"
                                required
                            />
                        </Box>
                        <Button type="submit" fullWidth variant="contained" color="primary">
                            RESET PASSWORD
                        </Button>
                    </form>
                </Paper>
            </Box>
        </ThemeProvider>
    );
}

export default Reset;