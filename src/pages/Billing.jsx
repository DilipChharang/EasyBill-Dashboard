import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, Paper, Grid, Divider, Dialog, DialogTitle, DialogContent, IconButton, Table, TableBody, TableCell, TableHead, TableRow, Card, CardContent, Chip } from '@mui/material';
import { Add, Close, Remove } from '@mui/icons-material';
import { getCustomers, getItems, generateInvoice } from '../services/api';
import { useNavigate } from 'react-router-dom';

const Billing = () => {
  const navigate = useNavigate();
  const [customers, setCustomers] = useState([]);
  const [allItems, setAllItems] = useState([]);
  const [selectedCust, setSelectedCust] = useState(null);
  const [cart, setCart] = useState([]);
  const [openCustModal, setOpenCustModal] = useState(false);
  const [openItemModal, setOpenItemModal] = useState(false);

  useEffect(() => {
    getCustomers().then(res => setCustomers(res.data));
    getItems().then(res => setAllItems(res.data));
  }, []);

  const updateQty = (id, delta) => {
    setCart(cart.map(c => c.id === id ? { ...c, qty: Math.max(1, c.qty + delta) } : c));
  };

  const createInvoice = async () => {
    const itemsData = cart.map(c => ({ item_id: c.id, quantity: c.qty, price: c.price }));
    await generateInvoice({ customer_id: selectedCust.id, items: itemsData });
    alert("Invoice Generated!");
    navigate('/');
  };

  const subtotal = cart.reduce((acc, curr) => acc + (curr.price * curr.qty), 0);
  const tax = selectedCust?.gst ? 0 : subtotal * 0.18;

  return (
    <Box sx={{ p: 1 }}>
      <Typography variant="h5" fontWeight="bold" mb={3}>Billing</Typography>

      {/* --- CUSTOMER SECTION --- */}
      <Paper elevation={0} sx={{ p: 3, mb: 3, border: '1px solid #ddd', borderRadius: '8px' }}>
        <Typography variant="subtitle2" fontWeight="bold" mb={2} color="textSecondary">Customer Details</Typography>
        
        {selectedCust ? (
          <Grid container spacing={2} alignItems="center">
            
            <Grid item xs={12} md={5}>
              <Typography variant="body2">Name : <b>{selectedCust.name}</b></Typography>
              <Typography variant="body2">Address : <b>{selectedCust.address}</b></Typography>
            </Grid>
            
            <Grid item xs={12} md={5}>
              <Typography variant="body2">Pan Card : <b>{selectedCust.pan || 'N/A'}</b></Typography>
              <Typography variant="body2">GST Num : <b>{selectedCust.gst || 'N/A'}</b></Typography>
            </Grid>
        
          </Grid>
        ) : (
          <Box className="empty-selection-box">
            <Button variant="outlined" startIcon={<Add />} onClick={() => setOpenCustModal(true)} sx={{ borderRadius: '20px', px: 4 }}>
              ADD
            </Button>
          </Box>
        )}
      </Paper>


      {selectedCust && (
        <Paper elevation={0} sx={{ p: 3, border: '1px solid #ddd', borderRadius: '8px' }}>
          <Typography variant="subtitle2" fontWeight="bold" mb={2} color="textSecondary">Items</Typography>
          
          {cart.length === 0 ? (
            <Box className="empty-selection-box">
              <Button variant="outlined" startIcon={<Add />} onClick={() => setOpenItemModal(true)} sx={{ borderRadius: '20px', px: 4 }}>
                ADD
              </Button>
            </Box>
          ) : (
            <>
              <Table size="small">
                <TableHead sx={{ bgcolor: '#fcfcfc' }}>
                  <TableRow>
                    <TableCell><b>Name</b></TableCell>
                    <TableCell align="center"><b>Amount</b></TableCell>
                    <TableCell align="right"><b>Amount</b></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {cart.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>{item.name}</TableCell>
                      <TableCell align="center">
                        <Box display="flex" alignItems="center" justifyContent="center" gap={1}>
                          <IconButton size="small" sx={{ border: '1px solid #ddd' }} onClick={() => updateQty(item.id, -1)}><Remove fontSize="small" /></IconButton>
                          <Typography fontWeight="bold">{item.qty}</Typography>
                          <IconButton size="small" sx={{ border: '1px solid #ddd' }} onClick={() => updateQty(item.id, 1)}><Add fontSize="small" /></IconButton>
                        </Box>
                      </TableCell>
                      <TableCell align="right"><b>₹{item.price * item.qty}</b></TableCell>
                    </TableRow>
                  ))}
                  <TableRow>
                    <TableCell colSpan={2} align="right"><b>Total</b></TableCell>
                    <TableCell align="right"><b>₹{subtotal + tax}</b></TableCell>
                  </TableRow>
                </TableBody>
              </Table>
              <Box display="flex" justifyContent="flex-end" mt={3} gap={2}>
                <Button variant="text" color="error" onClick={() => setCart([])}>Cancel</Button>
                <Button variant="contained" sx={{ bgcolor: '#1a237e' }} onClick={createInvoice}>Create</Button>
              </Box>
            </>
          )}
        </Paper>
      )}

      <Dialog open={openCustModal} onClose={() => setOpenCustModal(false)} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', pb: 1 }}>
          <Typography variant="h6" fontWeight="bold">Select Customer</Typography>
          <Button className="btn-cancel-red" variant="outlined" size="small" onClick={() => setOpenCustModal(false)}>Cancel</Button>
        </DialogTitle>
        <Divider />
        <DialogContent sx={{ p: 3 }}>
          <Grid container spacing={2}>
            {customers.map(c => (
              <Grid item xs={6} key={c.id} className="modal-grid-item">
                <Card className="modal-selection-card" onClick={() => { setSelectedCust(c); setOpenCustModal(false); }}>
                  <Typography variant="body2" fontWeight="bold">{c.name}</Typography>
                  <Box display="flex" justifyContent="flex-end" mt={1}>
                    <Chip label="Active" sx={{ height: 20, fontSize: '0.65rem', bgcolor: '#e8f5e9', color: '#2e7d32' }} />
                  </Box>
                </Card>
              </Grid>
            ))}
          </Grid>
        </DialogContent>
      </Dialog>

      {/* --- SELECT ITEMS MODAL --- */}
      <Dialog open={openItemModal} onClose={() => setOpenItemModal(false)} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', pb: 1 }}>
          <Typography variant="h6" fontWeight="bold">Select Items</Typography>
          <Button className="btn-cancel-red" variant="outlined" size="small" onClick={() => setOpenItemModal(false)}>Cancel</Button>
        </DialogTitle>
        <Divider />
        <DialogContent sx={{ p: 3 }}>
          <Grid container spacing={2}>
            {allItems.map(it => (
              <Grid item xs={6} key={it.id} className="modal-grid-item">
                <Card className="modal-selection-card" onClick={() => { setCart([...cart, { ...it, qty: 1 }]); setOpenItemModal(false); }}>
                  <Typography variant="body2" fontWeight="bold">{it.name}</Typography>
                  <Typography variant="caption" color="textSecondary">Price: ₹{it.price}</Typography>
                  <Box display="flex" justifyContent="flex-end" mt={1}>
                    <Chip label="ADD" size="small" color="primary" variant="outlined" sx={{ height: 20, fontSize: '0.65rem' }} />
                  </Box>
                </Card>
              </Grid>
            ))}
          </Grid>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default Billing;