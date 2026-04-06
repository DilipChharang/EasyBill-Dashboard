import React from 'react';
import { Box, Typography, Grid, Paper, CardActionArea } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Master = () => {
  const navigate = useNavigate();
  return (
    <Box>
      <Typography variant="h5" fontWeight="bold" mb={4}>Master</Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={4}>
          <Paper elevation={2}>
            <CardActionArea onClick={() => navigate('/master/customers')} sx={{ p: 3 }}>
              <Typography variant="h6" fontWeight="bold">Customer</Typography>
              <Typography variant="body2" color="textSecondary">Read or Create customer data</Typography>
            </CardActionArea>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Paper elevation={2}>
            <CardActionArea onClick={() => navigate('/master/items')} sx={{ p: 3 }}>
              <Typography variant="h6" fontWeight="bold">Items</Typography>
              <Typography variant="body2" color="textSecondary">Read or Create items data</Typography>
            </CardActionArea>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};
export default Master;