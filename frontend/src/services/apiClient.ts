import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';
import { ApiResponseEnvelope } from '../types/index.js';

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
  timeout: 15000,
});

// Request Interceptor: Attach stored token if present
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem('kd_auth_token');
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor: Extract error messages uniformly
apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError<ApiResponseEnvelope>) => {
    if (error.response?.status === 401) {
      // Clear token on unauthorized if not on public routes
      if (!window.location.pathname.startsWith('/login')) {
        localStorage.removeItem('kd_auth_token');
        localStorage.removeItem('kd_auth_user');
      }
    }
    return Promise.reject(error);
  }
);
