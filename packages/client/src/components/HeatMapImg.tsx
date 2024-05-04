import Box from '@mui/material/Box';
import React from 'react';

const HeatMap: React.FC = () => {
  return (
    <div>
      <Box sx={{ textAlign: 'center', p: 1 }}>
        <img
          src="/heatmap.png"
          alt="heatmap image of the world"
          style={{ width: '25rem', height: 'auto' }}
        />
      </Box>
    </div>
  );
};

export default HeatMap;
