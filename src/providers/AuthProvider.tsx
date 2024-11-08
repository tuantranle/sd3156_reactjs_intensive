// AuthProvider.tsx
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User } from '../models/user';

interface AuthContextType {
  user: User | null;
  isVerificationStep: boolean;
  login: (userData: User) => void;
  proceedToVerification: () => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isVerificationStep, setVerificationStep] = useState(false);

  // Load user data from localStorage when the app initializes
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = (userData: User) => {
    setUser(userData);
    setVerificationStep(false);
    localStorage.setItem('user', JSON.stringify(userData)); // Save user data to localStorage
  };

  const proceedToVerification = () => {
    setVerificationStep(true);
  };

  const logout = () => {
    setUser(null);
    setVerificationStep(false);
    localStorage.removeItem('user'); // Remove user data from localStorage
  };

  return (
    <AuthContext.Provider value={{ user, isVerificationStep, login, proceedToVerification, logout }}>
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
