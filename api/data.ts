// src/services/api.ts
import axios from 'axios';
import { ApiResponse, LoginResponse, RegisterData, User } from "@api/models";

const API_URL = 'https://project-management-system-001.azurewebsites.net/api'; // Замените на ваш URL

const api = axios.create({
  baseURL: API_URL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});


export const login = async (userName: string, password: string): Promise<LoginResponse> => {
  const response = await api.post<LoginResponse>('/Authentication/login', { userName, password });
  return response.data;
};

export const register = async (userData: RegisterData): Promise<ApiResponse<string>> => {
  const response = await api.post('/Authentication', userData);
  return response.data;
};

export const fetchUserData = async (id: string): Promise<ApiResponse<User>> => {
  const response = await api.get('/Users/GetUser/', { params: { id } });
  return response.data;
};
