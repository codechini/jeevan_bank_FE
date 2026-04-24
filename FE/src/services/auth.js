import axios from 'axios';

const API_URL = 'http://localhost:8080/api/auth';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const register = async (userData) => {
  const { username, password, email, firstName, lastName } = userData;
  const response = await api.post('/register', {
    username,
    password,
    email,
    firstName,
    lastName,
  });
  return response.data;
};

// export const login = async (credentials) => {
//   const response = await api.post('/login', credentials);
//   if (response.data.token) {
//     localStorage.setItem('authToken', response.data.token);
//     localStorage.setItem('user', JSON.stringify(response.data.user));
//   }
//   return response.data;
// };

export const login = async (credentials) => {
  const response = await api.post('/login', credentials);
  if (response.data.success && response.data.data?.token) {
    const { token, username, role } = response.data.data;
    localStorage.setItem('authToken', token);
    localStorage.setItem('user', JSON.stringify({ username, role }));
  }
  return response.data;
};

export const logout = () => {
  localStorage.removeItem('authToken');
  localStorage.removeItem('user');
};

export const getToken = () => {
  return localStorage.getItem('authToken');
};

export const setToken = (token) => {
  localStorage.setItem('authToken', token);
};

export const getUser = () => {
  const userStr = localStorage.getItem('user');
  return userStr ? JSON.parse(userStr) : null;
};

export const setUser = (user) => {
  localStorage.setItem('user', JSON.stringify(user));
};

export default api;