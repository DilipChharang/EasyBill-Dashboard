import React, { useEffect, useState } from 'react';
import { Box, Typography, Button, Grid, Card, CardContent, Chip } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { getItems } from '../services/api';
import '../styles/main.css';

const ItemList = () => {
  const [items, setItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => { 
    getItems().then(res => setItems(res.data)).catch(err => console.error(err)); 
  }, []);

  return (
    <Box sx={{ p: 2 }}>
      <Box display="flex" justifyContent="space-between" mb={4}>
        <Typography variant="h5" fontWeight="bold" color="#1a237e">ITEMS</Typography>
        <Button variant="contained" sx={{ bgcolor: '#1a237e' }} onClick={() => navigate('/master/items/add')}>+ ADD</Button>
      </Box>
      <Grid container spacing={3}>
        {items.map((it) => (
          <Grid item xs={12} sm={6} md={4} key={it.id} className="master-grid-item">
            <Card className="master-card">
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h6" fontWeight="bold" color="#1a237e">{it.name}</Typography>
                <Typography variant="h5" color="primary" sx={{ mt: 1 }}>₹{it.price}</Typography>
              </CardContent>
              <Box p={2} pt={0} display="flex" justifyContent="flex-end">
                <Chip 
                  label={it.is_active === 'N' ? "In-Active" : "Active"} 
                  className={it.is_active === 'N' ? "status-inactive" : "status-active"} 
                />
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};
export default ItemList;