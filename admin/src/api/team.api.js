import API from './axios';
export const getTeam      = ()        => API.get('/team');
export const createMember = (data)    => API.post('/team', data);
export const updateMember = (id,data) => API.put(`/team/${id}`, data);
export const deleteMember = (id)      => API.delete(`/team/${id}`);
