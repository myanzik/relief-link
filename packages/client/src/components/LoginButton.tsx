import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <Box sx={{ textAlign: 'center', p: 4 }}>
      <Button variant="contained" onClick={async () => loginWithRedirect()}>
        Log In
      </Button>
    </Box>
  );
};

export default LoginButton;
