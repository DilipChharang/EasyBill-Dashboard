import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
// Saare zaroori MUI components ek hi line mein import karein
import { Box, Typography, Paper, Divider, Table, TableBody, TableCell, TableHead, TableRow, Button, Grid } from '@mui/material';
import { ArrowBack, Receipt } from '@mui/icons-material';
import { getInvoiceById } from '../services/api';

const InvoiceDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [invoice, setInvoice] = useState(null);

  useEffect(() => {
    getInvoiceById(id)
      .then(res => setInvoice(res.data))
      .catch(err => console.error("Error fetching invoice:", err));
  }, [id]);

  if (!invoice) return (
    <Box p={4} textAlign="center">
      <Typography>Loading Invoice Details...</Typography>
    </Box>
  );

  return (
    <Box sx={{ width: '100%', maxWidth: '1000px', mx: 'auto', p: 2 }}>
      <Button startIcon={<ArrowBack />} onClick={() => navigate('/')} sx={{ mb: 2 }}>
        Back to Dashboard
      </Button>

      <Paper sx={{ p: { xs: 2, md: 5 }, borderRadius: '12px', boxShadow: 3 }}>
        {/* Header Section */}
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
          <Box display="flex" alignItems="center" gap={1}>
            <Receipt color="primary" sx={{ fontSize: 40 }} />
            <Typography variant="h4" fontWeight="bold">INVOICE</Typography>
          </Box>
          <Box textAlign="right">
            <Typography variant="h6" color="primary">{invoice.invoice_id}</Typography>
            <Typography variant="body2" color="textSecondary">
              Date: {new Date(invoice.created_at).toLocaleDateString()}
            </Typography>
          </Box>
        </Box>

        <Divider sx={{ mb: 4 }} />

        {/* Customer Details */}
        <Grid container spacing={2} sx={{ mb: 4 }}>
          <Grid item xs={12}>
            <Typography variant="subtitle2" color="textSecondary">BILL TO:</Typography>
            <Typography variant="h6" fontWeight="bold">{invoice.customer_name}</Typography>
            <Typography variant="body2">{invoice.address || 'Address not available'}</Typography>
            <Typography variant="body2" sx={{ mt: 1 }}>
              <strong>GST NO:</strong> {invoice.customer_gst || 'Not Provided (Regular Tax)'}
            </Typography>
          </Grid>
        </Grid>

        {/* Items Table */}
        <Table sx={{ mb: 4 }}>
          <TableHead sx={{ bgcolor: '#f5f5f5' }}>
            <TableRow>
              <TableCell><strong>Item Description</strong></TableCell>
              <TableCell align="right"><strong>Qty</strong></TableCell>
              <TableCell align="right"><strong>Unit Price</strong></TableCell>
              <TableCell align="right"><strong>Amount</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {invoice.items && invoice.items.map((item, index) => (
              <TableRow key={index}>
                <TableCell>{item.name}</TableCell>
                <TableCell align="right">{item.quantity}</TableCell>
                <TableCell align="right">₹{item.price_at_time}</TableCell>
                <TableCell align="right">₹{(item.quantity * item.price_at_time).toFixed(2)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {/* Summary Section */}
        <Box sx={{ width: '100%', display: 'flex', justifyContent: 'flex-end' }}>
          <Box sx={{ width: '300px' }}>
            <Box display="flex" justifyContent="space-between" mb={1}>
              <Typography>Subtotal:</Typography>
              <Typography>₹{invoice.total_amount}</Typography>
            </Box>
            <Box display="flex" justifyContent="space-between" mb={1}>
              <Typography color="textSecondary">GST (18%):</Typography>
              <Typography color="textSecondary">₹{invoice.tax_amount}</Typography>
            </Box>
            <Divider sx={{ my: 2 }} />
            <Box display="flex" justifyContent="space-between">
              <Typography variant="h5" fontWeight="bold">Grand Total:</Typography>
              <Typography variant="h5" fontWeight="bold" color="primary">
                ₹{invoice.grand_total}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default InvoiceDetails;