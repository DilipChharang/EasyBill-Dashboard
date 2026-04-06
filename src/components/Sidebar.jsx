import React, { useState } from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Box, Typography, IconButton, useMediaQuery, useTheme } from '@mui/material';
import { Dashboard, ManageAccounts, ReceiptLong, Menu as MenuIcon } from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';

const Sidebar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const menu = [
    { text: 'Dashboard', icon: <Dashboard />, path: '/' },
    { text: 'Master', icon: <ManageAccounts />, path: '/master' },
    { text: 'Billing', icon: <ReceiptLong />, path: '/billing' },
  ];

  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);

  const drawerContent = (
    <Box sx={{ height: '100%', bgcolor: '#0f172a', color: 'white' }}>
      <Box p={3} borderBottom="1px solid #1e293b">
        <Typography variant="h6" fontWeight="bold" color="#38bdf8">BILLING DASHBOARD</Typography>
      </Box>
      <List>
        {menu.map((item) => (
          <ListItem 
            button 
            key={item.text} 
            onClick={() => { navigate(item.path); if(isMobile) handleDrawerToggle(); }}
            sx={{ 
              bgcolor: location.pathname === item.path ? '#1e293b' : 'transparent',
              borderLeft: location.pathname === item.path ? '4px solid #38bdf8' : '4px solid transparent',
              m: 1, 
              borderRadius: '4px' 
            }}
          >
            <ListItemIcon sx={{ color: 'white' }}>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <>
      {isMobile && (
        <IconButton 
          onClick={handleDrawerToggle} 
          sx={{ position: 'fixed', top: 10, left: 10, zIndex: 1300, bgcolor: '#0f172a', color: 'white', '&:hover': {bgcolor: '#1e293b'} }}
        >
          <MenuIcon />
        </IconButton>
      )}
      
      <Drawer
        variant={isMobile ? "temporary" : "permanent"}
        open={isMobile ? mobileOpen : true}
        onClose={handleDrawerToggle}
        sx={{ 
          width: 240, 
          '& .MuiDrawer-paper': { width: 240, boxSizing: 'border-box', border: 'none' } 
        }}
      >
        {drawerContent}
      </Drawer>
    </>
  );
};

export default Sidebar;