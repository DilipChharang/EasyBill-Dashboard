import React from 'react';
import { AppBar, Toolbar, Typography, Box } from '@mui/material';

const Navbar = () => {
  return (
    <AppBar 
      position="fixed" 
      sx={{ 
        zIndex: (theme) => theme.zIndex.drawer + 1, 
        bgcolor: '#ffffff', 
        color: '#333', 
        boxShadow: '0px 2px 4px rgba(0,0,0,0.1)' 
      }}
    >
      <Toolbar>
        <Typography variant="h6" noWrap component="div" sx={{ fontWeight: 'bold' }}>
          Billing System Dashboard
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;