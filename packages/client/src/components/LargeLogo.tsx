import Box from '@mui/material/Box';
import React from 'react';
import { Link } from 'react-router-dom';

const LargeLogo: React.FC = () => {
  return (
    <div>
      <Link to="/">
        <Box sx={{ textAlign: 'center' }}>
          <img
            src="/logo.png"
            alt="Logo image of hands holding the blockchain"
            style={{ width: '300px', height: 'auto' }}
          />
        </Box>
      </Link>
    </div>
  );
};

export default LargeLogo;
