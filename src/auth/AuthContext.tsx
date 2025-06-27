import React, { createContext, useContext, useState, useEffect } from 'react';

// ✅ Esta interface debe coincidir exactamente con lo que devuelve tu backend
interface User {
  id: string;
  name?: string;
  email: string;
  roles?: string | string[];
}

interface AuthContextType {
  token: string | null;
  user: User | null;
  login: (token: string, userData: User, remember: boolean) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Recuperar token y usuario del storage
    const storedToken = localStorage.getItem('authToken') || sessionStorage.getItem('authToken');
    const storedUser = localStorage.getItem('user') || sessionStorage.getItem('user');
    
    if (storedToken) {
      setToken(storedToken);
    }
    
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
      } catch (error) {
        console.error('Error parsing stored user:', error);
        // Limpiar datos corruptos
        localStorage.removeItem('user');
        sessionStorage.removeItem('user');
      }
    }
  }, []);

  const login = (newToken: string, userData: User, remember: boolean) => {
    const userDataString = JSON.stringify(userData);
    
    if (remember) {
      localStorage.setItem('authToken', newToken);
      localStorage.setItem('user', userDataString);
    } else {
      sessionStorage.setItem('authToken', newToken);
      sessionStorage.setItem('user', userDataString);
    }
    
    setToken(newToken);
    setUser(userData);
  };

  const logout = () => {
    // Limpiar todo el storage
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    sessionStorage.removeItem('authToken');
    sessionStorage.removeItem('user');
    
    setToken(null);
    setUser(null);
  };

  const isAuthenticated = !!token;

  return (
    <AuthContext.Provider value={{ 
      token, 
      user, 
      login, 
      logout, 
      isAuthenticated 
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth debe usarse dentro de un <AuthProvider>');
  }
  return context;
}