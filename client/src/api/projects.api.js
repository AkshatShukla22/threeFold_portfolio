import API from './axios';

export const fetchProjects = (params) => API.get('/projects', { params });
export const fetchProject  = (id)     => API.get(`/projects/${id}`);
