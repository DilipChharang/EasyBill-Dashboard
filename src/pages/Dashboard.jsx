import React, { useState, useEffect } from 'react';
import { Box, Typography, TextField, Button, Table, TableBody, TableCell, TableHead, TableRow, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { getAllInvoices } from '../services/api';

const Dashboard = () => {
  const [invoices, setInvoices] = useState([]);
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  useEffect(() => { loadInvoices(); }, []);
  const loadInvoices = () => getAllInvoices().then(res => setInvoices(res.data));

  // Filter based on Invoice ID or Customer Name
  const filtered = invoices.filter(inv => 
    inv.invoice_id.toLowerCase().includes(search.toLowerCase()) || 
    inv.customer_name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Box sx={{ width: '100%' }}>
      <Typography variant="h5" mb={3} fontWeight="bold">Invoice Dashboard</Typography>
      
      {/* Full Width Search Bar */}
      <Paper sx={{ p: 2, mb: 3 }}>
        <TextField 
          fullWidth 
          label="Search by Invoice ID or Customer Name..." 
          variant="outlined" 
          value={search} 
          onChange={(e) => setSearch(e.target.value)} 
        />
      </Paper>

      {/* Full Width Table */}
      <Table component={Paper} elevation={3}>
        <TableHead sx={{ bgcolor: '#1a237e' }}>
          <TableRow>
            <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Invoice ID</TableCell>
            <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Customer</TableCell>
            <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Item Name(s)</TableCell>
            <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Grand Total</TableCell>
            <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Date</TableCell>
            <TableCell sx={{ color: 'white', fontWeight: 'bold' }} align="center">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filtered.map((inv) => (
            <TableRow key={inv.id} hover>
              <TableCell>{inv.invoice_id}</TableCell>
              <TableCell>{inv.customer_name}</TableCell>
              <TableCell sx={{ maxWidth: '300px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {inv.item_names || 'N/A'}
              </TableCell>
              <TableCell>₹{inv.grand_total}</TableCell>
              <TableCell>{new Date(inv.created_at).toLocaleDateString()}</TableCell>
              <TableCell align="center">
                <Button 
                  variant="contained" 
                  color="primary" 
                  size="small" 
                  onClick={() => navigate(`/invoice/${inv.invoice_id}`)}
                >
                  View Details
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
};

export default Dashboard;