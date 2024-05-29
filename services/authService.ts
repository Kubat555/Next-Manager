import { login, register } from "../api/data";
import { RegisterData } from "../api/models";

export const handleLogin = async (email: string, password: string) => {
    try {
      const data = await login(email, password);
      localStorage.setItem('token', data.response.token);
      localStorage.setItem('userId', data.response.userId);
      return data;
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




// utils/auth.ts
export const isAuthenticated = (): boolean => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('token');
    if (!token) return false;

    const payloadBase64 = token.split('.')[1];
    const decodedPayload = JSON.parse(atob(payloadBase64));

    const currentTime = Math.floor(Date.now() / 1000);
    
    if(decodedPayload.exp < currentTime) {
      console.log("Token time is gone, refresh Token!");
      localStorage.removeItem('token');
      localStorage.removeItem('userId');
      return false;
    }
    return true;
  }
  return false;
};


