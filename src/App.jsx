import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Box, CssBaseline } from '@mui/material';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Master from './pages/Master';
import CustomerList from './pages/CustomerList';
import ItemList from './pages/ItemList';
import AddCustomer from './pages/AddCustomer';
import AddItem from './pages/AddItem';
import InvoiceDetails from './pages/InvoiceDetails';
import Billing from './pages/Billing';

function App() {
  return (
    <Router>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <Sidebar />
        <Box component="main" sx={{ flexGrow: 1, p: 3, bgcolor: '#f4f6f8', minHeight: '100vh' }}>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/master" element={<Master />} />
            <Route path="/master/customers" element={<CustomerList />} />
            <Route path="/master/items" element={<ItemList />} />
            <Route path="/master/customers/add" element={<AddCustomer />} />
            <Route path="/master/items/add" element={<AddItem />} />
            <Route path="/billing" element={<Billing />} />
            <Route path="/invoice/:id" element={<InvoiceDetails />} />
          </Routes>
        </Box>
      </Box>
    </Router>
  );
}
export default App;