import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { AuthUser, UserRoleType } from '../types/index.js';
import { apiClient } from '../services/apiClient.js';
import { ApiResponseEnvelope } from '../types/index.js';

interface AuthContextType {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  hasRole: (...roles: UserRoleType[]) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(() => {
    try {
      const stored = localStorage.getItem('kd_auth_user');
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Initialize and verify session
  useEffect(() => {
    const initAuth = async () => {
      const token = localStorage.getItem('kd_auth_token');
      if (!token) {
        setIsLoading(false);
        return;
      }

      try {
        const response = await apiClient.get<ApiResponseEnvelope<{ user: AuthUser }>>('/auth/session');
        if (response.data?.data?.user) {
          setUser(response.data.data.user);
          localStorage.setItem('kd_auth_user', JSON.stringify(response.data.data.user));
        }
      } catch {
        // Clear expired or invalid session
        localStorage.removeItem('kd_auth_token');
        localStorage.removeItem('kd_auth_user');
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    initAuth();
  }, []);

  const login = async (email: string, password: string): Promise<void> => {
    const response = await apiClient.post<
      ApiResponseEnvelope<{ user: AuthUser; token: string; refreshToken: string }>
    >('/auth/login', { email, password });

    if (response.data?.data) {
      const { user: authUser, token } = response.data.data;
      localStorage.setItem('kd_auth_token', token);
      localStorage.setItem('kd_auth_user', JSON.stringify(authUser));
      setUser(authUser);
    }
  };

  const logout = useCallback(async () => {
    try {
      await apiClient.post('/auth/logout');
    } catch {
      // Proceed with local logout regardless of server state
    } finally {
      localStorage.removeItem('kd_auth_token');
      localStorage.removeItem('kd_auth_user');
      setUser(null);
      window.location.href = '/login';
    }
  }, []);

  const hasRole = useCallback(
    (...roles: UserRoleType[]): boolean => {
      if (!user) return false;
      return roles.includes(user.role);
    },
    [user]
  );

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        logout,
        hasRole,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
