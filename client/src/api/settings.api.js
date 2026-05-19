import API from './axios';

export const fetchHero        = ()  => API.get('/hero');
export const fetchSettings    = ()  => API.get('/settings');
export const fetchTestimonials= ()  => API.get('/testimonials');
export const fetchFAQs        = ()  => API.get('/faqs');
export const fetchTeam        = ()  => API.get('/team');
