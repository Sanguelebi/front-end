import apiClient from '@/services/app.client';
import type { LoginRequest, LoginResponse, LoginUser } from '@/models/api';

export async function login(payload: LoginRequest): Promise<LoginUser> {
    const response = await apiClient.post<LoginResponse>('/login', payload);
    return response.data.user;
}

export async function logout(): Promise<void> {
    await apiClient.post('/logout');
}

