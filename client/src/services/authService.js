import API from '../api';

const authService = {
  register: payload => API.post('/auth/register', payload),
  login:    creds   => API.post('/auth/login', creds),
};

export default authService;
cu