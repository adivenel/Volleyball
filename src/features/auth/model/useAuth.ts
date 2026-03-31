import { useState, useEffect, useCallback } from 'react';
import { apiClient } from '@/shared/api/client';
import { AuthResponse } from '@/shared/api/types';

export const useAuth = () => {
  const [user, setUser] = useState<{ id: number; email: string; role: string } | null>(null);
  const [loading, setLoading] = useState(true);

  const checkAuth = useCallback(async () => {
    const token = localStorage.getItem('auth_token');
    const userStr = localStorage.getItem('auth_user');
    
    if (token && userStr) {
      try {
        setUser(JSON.parse(userStr));
      } catch {
        localStorage.removeItem('auth_token');
        localStorage.removeItem('auth_user');
      }
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  const login = async (email: string, password: string) => {
    const response = await apiClient.post<AuthResponse>('/auth/login', { email, password });
    
    localStorage.setItem('auth_token', response.token);
    localStorage.setItem('auth_user', JSON.stringify(response.user));
    setUser(response.user);
    
    return response;
  };

  const register = async (email: string, password: string) => {
    const response = await apiClient.post<{ id: number; email: string }>('/auth/register', { email, password });
    // После регистрации автоматически логиним пользователя
    await login(email, password);
    return response;
  };

  const logout = () => {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('auth_user');
    setUser(null);
  };

  return { user, loading, login, register, logout, isAuthenticated: !!user };
};