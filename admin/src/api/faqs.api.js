import API from './axios';
export const getFAQs    = ()        => API.get('/faqs');
export const createFAQ  = (data)    => API.post('/faqs', data);
export const updateFAQ  = (id,data) => API.put(`/faqs/${id}`, data);
export const deleteFAQ  = (id)      => API.delete(`/faqs/${id}`);
