import API from './axios';
export const login  = (data) => API.post('/auth/login', data);
export const verify = ()     => API.get('/auth/verify');
