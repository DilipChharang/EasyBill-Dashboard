import axios from 'axios';
const API = axios.create({ baseURL: 'http://localhost:5000/api' });

export const getCustomers = () => API.get('/customers');
export const addCustomer = (data) => API.post('/customers', data);
export const getItems = () => API.get('/items');
export const addItem = (data) => API.post('/items', data);
export const generateInvoice = (data) => API.post('/billing/generate', data);
export const getInvoiceById = (id) => API.get(`/billing/${id}`);
export const getAllInvoices = () => API.get('/billing/all');

export default API;