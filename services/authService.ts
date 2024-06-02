
import { login, register } from "../api/data";
import { RegisterData } from "../api/models";
import { NextRequest } from 'next/server';

export const handleLogin = async (email: string, password: string) => {
  try {
    console.log("Start login")
    const data = await login(email, password);
    localStorage.setItem('userId', data.response.userId);
    localStorage.setItem('userName', data.response.name);
    localStorage.setItem('userRole', data.response.role);
    localStorage.setItem('token', data.response.token);
    if(!data.isSuccess){
      console.error('Login failed:', data.message);
      throw new Error('Failed to login');
    }
    window.location.href = '/dashboard';
  } catch (error) {
    console.error('Login failed:', error);
    throw new Error('Failed to login');
  }
};

export const handleRegistration = async (regData: RegisterData) => {
  try {
    const data = await register(regData);
    console.log(data.message);
    return data;
  } catch (error) {
    console.error('Registration failed:', error);
    throw new Error('Failed to register');
  }
};

export const logout = async () => {
  localStorage.clear();
  document.cookie = `token=""; path=/; max-age=0; secure; samesite=strict`;
};


export const isAuthenticated = (req: NextRequest): boolean => {
  console.log("Check token start");
  const token = req.cookies.get('token');
  if (!token) {
    console.log("Token is not found!");
    return false;
  }

  try {
    const payloadBase64 = token.value.split('.')[1];
    const decodedPayload = JSON.parse(atob(payloadBase64));

    const currentTime = Math.floor(Date.now() / 1000);

    if (decodedPayload.exp < currentTime) {
      console.log("Token time is gone, refresh Token!");
      logout();
      return false;
    }
    console.log("Token is valid!");
    return true;
  } catch (error) {
    console.error('Failed to verify token:', error);
    return false;
  }
};



