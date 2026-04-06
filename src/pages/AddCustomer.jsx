import React, { useState } from 'react';
import { Box, Typography, TextField, Button, MenuItem, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { addCustomer } from '../services/api';

const AddCustomer = () => {
  const [form, setForm] = useState({ name: '', address: '', pan: '', gst: '', status: 'Active' });
  const navigate = useNavigate();

  const handleSave = async () => {
    if(!form.name) return alert("Customer Name is required!");
    try {
      const payload = {
        cust_id: "C" + Math.floor(100000 + Math.random() * 900000), 
        name: form.name,
        address: form.address,
        pan: form.pan,
        gst: form.gst,
        is_active: form.status === 'In-Active' ? 'N' : 'Y'
      };
      await addCustomer(payload);
      navigate('/master/customers');
    } catch (err) {
      alert("Error 500: Database check karo (ID duplicate ya lambi ho sakti hai)");
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" fontWeight="bold" mb={4}>Add New Customer</Typography>
      <Paper sx={{ p: 4, borderRadius: '12px' }}>
        <Box className="form-grid-2">
          <TextField fullWidth label="Customer Name" onChange={(e)=>setForm({...form, name:e.target.value})} />
          <TextField fullWidth label="Customer Address" onChange={(e)=>setForm({...form, address:e.target.value})} />
        </Box>
        <Box className="form-grid-2" sx={{ mt: 2 }}>
          <TextField fullWidth label="PAN" onChange={(e)=>setForm({...form, pan:e.target.value})} />
          <TextField fullWidth label="GST" onChange={(e)=>setForm({...form, gst:e.target.value})} />
        </Box>
        <Box sx={{ mt: 2, maxWidth: '49%' }}>
          <TextField select fullWidth label="Status" value={form.status} onChange={(e)=>setForm({...form, status:e.target.value})}>
            <MenuItem value="Active">Active</MenuItem>
            <MenuItem value="In-Active">In-Active</MenuItem>
          </TextField>
        </Box>
        <Box sx={{ mt: 4, display: 'flex', gap: 2 }}>
          <Button variant="outlined" color="error" onClick={() => navigate('/master/customers')}>CANCEL</Button>
          <Button variant="contained" sx={{ bgcolor: '#1a237e' }} onClick={handleSave}>CREATE</Button>
        </Box>
      </Paper>
    </Box>
  );
};
export default AddCustomer;