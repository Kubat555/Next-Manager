export interface LoginResponse {
    isSuccess: boolean;
    message: string;
    statusCode: number;
    response: {
        token: string;
        userId: string;
    }
}

export interface RegisterData {
    firstName: string;
    lastName: string;
    userName: string;
    email: string;
    password: string;
}

export interface ApiResponse<T> {
    isSuccess: boolean;
    message: string;
    statusCode: number;
    response: T;
}

export interface User {
    id: string;
    firstName: string;
    lastName: string;
    role: string;
    email: string;
  }
  