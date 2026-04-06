import React, { useEffect, useState } from 'react';
import { Box, Typography, Button, Grid, Card, CardContent, Chip } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { getCustomers } from '../services/api';
import '../styles/main.css';

const CustomerList = () => {
  const [customers, setCustomers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => { 
    getCustomers().then(res => setCustomers(res.data)).catch(err => console.error(err)); 
  }, []);

  return (
    <Box sx={{ p: 2 }}>
      <Box display="flex" justifyContent="space-between" mb={4}>
        <Typography variant="h5" fontWeight="bold" color="#1a237e">CUSTOMERS</Typography>
        <Button variant="contained" sx={{ bgcolor: '#1a237e' }} onClick={() => navigate('/master/customers/add')}>+ ADD</Button>
      </Box>
      <Grid container spacing={3}>
        {customers.map((c) => (
          <Grid item xs={12} sm={6} md={4} key={c.id} className="master-grid-item">
            <Card className="master-card">
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h6" fontWeight="bold" color="#1a237e">{c.name}</Typography>
                <Typography variant="body2" color="textSecondary">{c.address}</Typography>
              </CardContent>
              <Box p={2} pt={0} display="flex" justifyContent="flex-end">
                <Chip 
                  label={c.is_active === 'N' ? "In-Active" : "Active"} 
                  className={c.is_active === 'N' ? "status-inactive" : "status-active"} 
                />
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};
export default CustomerList;