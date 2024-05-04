import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import ProfilePicture from './header/ProfilePicture';

const LoginButton = () => {
  const { loginWithRedirect, isAuthenticated } = useAuth0();

  return (
    <Box sx={{ textAlign: 'center', p: 4 }}>
      <ProfilePicture />
      <Button
        disabled={isAuthenticated}
        variant="contained"
        onClick={async () => loginWithRedirect()}
      >
        Log In
      </Button>
    </Box>
  );
};

export default LoginButton;
