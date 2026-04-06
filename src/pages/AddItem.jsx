import React, { useState } from 'react';
import { Box, Typography, TextField, Button, MenuItem, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { addItem } from '../services/api';

const AddItem = () => {
  const [form, setForm] = useState({ name: '', price: '', status: 'Active' });
  const navigate = useNavigate();

  const handleSave = async () => {
    if(!form.name || !form.price) return alert("Fill Name and Price!");
    try {
      const payload = {
        // Choti ID (6 digits)
        item_code: "IT" + Math.floor(100000 + Math.random() * 900000),
        name: form.name,
        price: form.price,
        is_active: form.status === 'In-Active' ? 'N' : 'Y' 
      };
      await addItem(payload);
      navigate('/master/items');
    } catch (err) {
      alert("Error 500: Database failed.");
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" fontWeight="bold" mb={4}>Add New Item</Typography>
      <Paper sx={{ p: 4, borderRadius: '12px' }}>
        <Box className="form-grid-2">
          <TextField fullWidth label="Item Name" onChange={(e)=>setForm({...form, name:e.target.value})} />
          <TextField fullWidth label="Price" type="number" onChange={(e)=>setForm({...form, price:e.target.value})} />
        </Box>
        <Box sx={{ mt: 2, maxWidth: '49%' }}>
          <TextField select fullWidth label="Status" value={form.status} onChange={(e)=>setForm({...form, status:e.target.value})}>
            <MenuItem value="Active">Active</MenuItem>
            <MenuItem value="In-Active">In-Active</MenuItem>
          </TextField>
        </Box>
        <Box sx={{ mt: 4, display: 'flex', gap: 2 }}>
          <Button variant="outlined" color="error" onClick={() => navigate('/master/items')}>CANCEL</Button>
          <Button variant="contained" sx={{ bgcolor: '#1a237e' }} onClick={handleSave}>CREATE</Button>
        </Box>
      </Paper>
    </Box>
  );
};
export default AddItem;