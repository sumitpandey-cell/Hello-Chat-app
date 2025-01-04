import React from 'react';
import { CircularProgress, Typography, Box } from '@mui/material';

const Loader = () => {
  return (
    <Box 
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
      }}
    >
      <Typography variant="h5" component="h1" sx={{ color: 'black', marginBottom: 2 }}>
        Loading page...
      </Typography>
      <CircularProgress color="inherit" />
    </Box>
  );
};

export default Loader;
