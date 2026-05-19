import API from './axios';
export const getContacts   = ()   => API.get('/contact');
export const markRead      = (id) => API.put(`/contact/${id}/read`);
export const deleteContact = (id) => API.delete(`/contact/${id}`);
