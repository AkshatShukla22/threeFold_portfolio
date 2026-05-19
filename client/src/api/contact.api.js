import API from './axios';

export const submitContactForm = (data) => API.post('/contact', data);
