// src/contexts/JWTContext.tsx
import React, { createContext, useEffect, ReactNode } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { jwtDecode } from 'jwt-decode';
import Cookies from 'universal-cookie';
import { setUser, clearUser } from '../store/authSlice';
import { RootState } from '../store';
import Loader from '@/components/ui/loader';
import axiosInstance from '@/api/axios';

// Create cookies instance
const cookies = new Cookies();

const TOKEN_COOKIE_NAME = 'session_token';

interface DecodedToken {
  exp: number;
  [key: string]: any;
}

interface JWTContextValue {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: any | null;
  register: (username: string, email: string, password: string) => Promise<void>;
  login: (email: string, password: string) => Promise<any>;
  logout: () => void;
}

interface JWTProviderProps {
  children: ReactNode;
}

// Helper Functions
const verifyToken = (serviceToken: string): boolean => {
  if (!serviceToken) {
    return false;
  }

  try {
    const decoded = jwtDecode<DecodedToken>(serviceToken);
    return decoded.exp > Date.now() / 1000;
  } catch {
    return false;
  }
};

const setSession = (serviceToken: string | null): void => {
  if (serviceToken) {
    cookies.set(TOKEN_COOKIE_NAME, serviceToken);
    axiosInstance.defaults.headers.common.Authorization = `Bearer ${serviceToken}`;
  } else {
    cookies.remove(TOKEN_COOKIE_NAME, { path: '/' });
    delete axiosInstance.defaults.headers.common.Authorization;
  }
};

// Initial context state
const initialContextValue: JWTContextValue = {
  isAuthenticated: false,
  isLoading: true,
  user: null,
  register: () => Promise.resolve(),
  login: () => Promise.resolve(),
  logout: () => {}
};

const JWTContext = createContext<JWTContextValue>(initialContextValue);

export const JWTProvider: React.FC<JWTProviderProps> = ({ children }) => {
  const dispatch = useDispatch();
  const { value: { user, isLoading, isAuthenticated } } = useSelector((state: RootState) => state.auth);

  const login = async (email: string, password: string) => {
    try {
      const response = await axiosInstance.post('/auth/login', { email, password });
      const { access_token: serviceToken, user } = response.data;
      setSession(serviceToken);
      dispatch(setUser(user));
      return response.data;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  const register = async (username: string, email: string, password: string): Promise<void> => {
    try {
      const response = await axiosInstance.post('/auth/register', {
        username,
        email,
        password
      });
      
      if (response.data.user && response.data.access_token) {
        const { access_token: serviceToken, user } = response.data;
        setSession(serviceToken);
        dispatch(setUser(user));
      }
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  };

  const logout = (): void => {
    setSession(null);
    dispatch(clearUser());
  };

  useEffect(() => {
    const initAuth = async (): Promise<void> => {
      try {
        const serviceToken = cookies.get(TOKEN_COOKIE_NAME);
        
        if (serviceToken && verifyToken(serviceToken)) {
          setSession(serviceToken);
          const response = await axiosInstance.get('/auth/me');
          const { user } = response.data;
          dispatch(setUser(user));
        } else {
          if (serviceToken) {
            setSession(null);
          }
          dispatch(clearUser());
        }
      } catch (error) {
        console.error('Auth initialization error:', error);
        setSession(null);
        dispatch(clearUser());
      }
    };

    initAuth();
  }, [dispatch]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <JWTContext.Provider value={{ 
      isAuthenticated,
      isLoading,
      user,
      login,
      register,
      logout
    }}>
      {children}
    </JWTContext.Provider>
  );
};

export default JWTContext;