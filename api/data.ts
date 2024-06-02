// src/services/api.ts
import axios from 'axios';
import { ApiResponse, LoginResponse, Priority, Project, ProjectData, RegisterData, Role, Status, TaskData, Tasks, User, UserData } from "@api/models";

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
  const token = response.data.response.token;
  if (token) {
    // Устанавливаем куки вручную
    document.cookie = `token=${token}; path=/; max-age=7200; secure; samesite=strict`;
    console.log('Token saved as a cookie');
  } else {
    console.error('Token not found in response');
  }
  return response.data;
};

export const register = async (userData: RegisterData): Promise<ApiResponse<string>> => {
  const response = await api.post('/Authentication', userData);
  return response.data;
};




// ? Projects API
export const fetchProjects = async (userId: string): Promise<ApiResponse<Project[]>> => {
  const response = await api.get('/ProjectContoller/GetEmployeeProjects/', { params: { userId } });
  return response.data;
};

export const addProject = async (projectData: ProjectData): Promise<ApiResponse<null>> => {
  const response = await api.post('/ProjectContoller/CreateProject/', projectData);
  return response.data;
};

export const deleteProject = async (id: number): Promise<ApiResponse<null>> => {
  const response = await api.delete('/ProjectContoller/DeleteProject/', {params: { id }});
  return response.data;
};

export const addEmployeeToProject = async (userId: string, projectId: number): Promise<ApiResponse<null>> => {
  const response = await api.post('/ProjectContoller/AddEmployeeToProject/', {params: { userId, projectId }});
  return response.data;
};

export const deleteEmployeeFromProject = async (userId: string, projectId: number): Promise<ApiResponse<null>> => {
  const response = await api.delete('/ProjectContoller/DeleteEmployeeFromProject/', {params: { userId, projectId }});
  return response.data;
};

export const updateProject = async (id: number, projectData: ProjectData): Promise<ApiResponse<null>> => {
  const response = await api.put('/ProjectContoller/EditProject/', {params: { id }, projectData});
  return response.data;
};


// ? Tasks API
export const fetchTasks = async (projectId: number, employeeId: string): Promise<ApiResponse<Tasks>> => {
  const response = await api.get('/Tasks/GetEmployeeTasks/', { params: { projectId, employeeId } });
  return response.data;
};

export const fetchAllTasks = async (projectId: number): Promise<ApiResponse<Tasks>> => {
  const response = await api.get('/Tasks/GetAllTasks/', { params: { projectId } });
  return response.data;
};

export const addTask = async (taskData: TaskData): Promise<ApiResponse<null>> => {
  const response = await api.post('/Tasks/CreateTask/', taskData);
  return response.data;
};

export const deleteTask = async (id: number): Promise<ApiResponse<null>> => {
  const response = await api.delete('/Tasks/DeleteTask/', {params: { id }});
  return response.data;
};

export const updateTask = async (id: number, taskData: TaskData): Promise<ApiResponse<null>> => {
  const response = await api.put('/Tasks/EditTask/', {params: { id }, taskData});
  return response.data;
};

export const fetchStatuses = async (): Promise<ApiResponse<Status[]>> => {
  const response = await api.get('/Tasks/GetStatuses/');
  return response.data;
};

export const fetchPriorities = async (): Promise<ApiResponse<Priority[]>> => {
  const response = await api.get('/Tasks/GetPriorities/');
  return response.data;
};


// ? Users API
export const fetchUserData = async (id: string): Promise<ApiResponse<User>> => {
  const response = await api.get('/Users/GetUser/', { params: { id } });
  return response.data;
};

export const fetchUsers = async (): Promise<ApiResponse<User[]>> => {
  const response = await api.get('/Users/GetUsers/');
  return response.data;
};

export const deleteUser = async (id: string): Promise<ApiResponse<null>> => {
  const response = await api.delete('/Users/DeleteUser/', {params: { id }});
  return response.data;
};

export const updateUser = async (id: string, userData: UserData): Promise<ApiResponse<null>> => {
  const response = await api.put('/Users/EditUser/', {params: { id }, userData});
  return response.data;
};

export const fetchRoles = async (): Promise<ApiResponse<Role[]>> => {
  const response = await api.get('/Users/GetRoles/');
  return response.data;
};

export const ChangeRole = async (userId: string, roleName: string): Promise<ApiResponse<null>> => {
  const response = await api.post('/Users/ChangeRole/', {params: { userId, roleName }});
  return response.data;
}