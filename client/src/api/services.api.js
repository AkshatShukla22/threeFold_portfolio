import API from './axios';

export const fetchServices = () => API.get('/services');
export const fetchService  = (id) => API.get(`/services/${id}`);
