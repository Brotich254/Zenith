import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

const api = axios.create({
  baseURL: API_URL,
  headers: { 'Content-Type': 'application/json' },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 403 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = localStorage.getItem('refreshToken');

      try {
        const response = await axios.post(`${API_URL}/auth/refresh`, {
          refreshToken,
        });

        localStorage.setItem('accessToken', response.data.accessToken);
        api.defaults.headers.common.Authorization = `Bearer ${response.data.accessToken}`;
        return api(originalRequest);
      } catch (err) {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        window.location.href = '/login';
      }
    }

    return Promise.reject(error);
  }
);

export const authAPI = {
  register: (data) => api.post('/auth/register', data),
  login: (data) => api.post('/auth/login', data),
};

export const dashboardsAPI = {
  getByOrg: (orgId) => api.get(`/dashboards/org/${orgId}`),
  getById: (id) => api.get(`/dashboards/${id}`),
  create: (orgId, data) => api.post(`/dashboards/org/${orgId}`, data),
  update: (id, data) => api.put(`/dashboards/${id}`, data),
  delete: (id) => api.delete(`/dashboards/${id}`),
};

export const widgetsAPI = {
  getByDashboard: (dashboardId) => api.get(`/widgets/dashboard/${dashboardId}`),
  create: (data) => api.post('/widgets', data),
  update: (id, data) => api.put(`/widgets/${id}`, data),
  delete: (id) => api.delete(`/widgets/${id}`),
};

export default api;
