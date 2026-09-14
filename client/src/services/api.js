// Axios API service for Angel PET backend
import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE,
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
});

// Response interceptor for error handling
api.interceptors.response.use(
  response => response.data,
  error => {
    const message = error.response?.data?.error || error.message || 'Something went wrong';
    return Promise.reject(new Error(message));
  }
);

// Products
export const getProducts = (category) =>
  api.get('/products', { params: category ? { category } : {} });

export const getProductById = (id) => api.get(`/products/${id}`);

// Industries
export const getIndustries = () => api.get('/industries');

// Quotes
export const submitQuote = (data) => api.post('/quotes', data);

// Subscribers
export const subscribe = (email) => api.post('/subscribers', { email });

export default api;
