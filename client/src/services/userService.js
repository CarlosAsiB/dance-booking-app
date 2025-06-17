import API from '../api';

const userService = {
  getAll:      ()          => API.get('/users'),
  create:     userData     => API.post('/users', userData),
  update:     (id, data)   => API.put(`/users/${id}`, data),
  remove:     id           => API.delete(`/users/${id}`),
  getBookings: userId      => API.get(`/users/${userId}/bookings`),
  // etc.
};

export default userService;
