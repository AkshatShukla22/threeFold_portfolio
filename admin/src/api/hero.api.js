import API from './axios';
export const getHero    = ()     => API.get('/hero');
export const updateHero = (data) => API.put('/hero', data);
