// lib/auth.ts
'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { type User, type AuthResult, type Session } from '@/types/auth';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<AuthResult>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoading: true,
  isAuthenticated: false,
  login: async () => ({ success: false }),
  logout: async () => {},
});

export const useAuth = () => useContext(AuthContext);

// Mock users for authentication
const mockUsers = [
  {
    id: 'user-1',
    name: 'Admin User',
    email: 'admin@example.com',
    password: 'password', // In a real app, this would be hashed
    role: 'admin' as const,
    buckets: ['bucket-1', 'bucket-2', 'bucket-3'],
  },
  {
    id: 'user-2',
    name: 'Regular User',
    email: 'user@example.com',
    password: 'password', // In a real app, this would be hashed
    role: 'user' as const,
    buckets: ['bucket-1'],
  },
];

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  // Load user from local storage on mount
  useEffect(() => {
    const loadUser = () => {
      try {
        const session = localStorage.getItem('session');
        if (session) {
          const parsedSession: Session = JSON.parse(session);
          const expiresAt = new Date(parsedSession.expires);

          if (expiresAt > new Date()) {
            setUser(parsedSession.user);
          } else {
            localStorage.removeItem('session');
          }
        }
      } catch (error) {
        console.error('Error loading user:', error);
        localStorage.removeItem('session');
      } finally {
        setIsLoading(false);
      }
    };

    loadUser();
  }, []);

  const login = async (
    email: string,
    password: string
  ): Promise<AuthResult> => {
    try {
      // In a real app, you would call your API for authentication
      const user = mockUsers.find(
        (u) => u.email === email && u.password === password
      );

      if (user) {
        const userWithoutPassword = {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
          buckets: user.buckets,
        };

        // Create session with expiration (24 hours from now)
        const expires = new Date();
        expires.setHours(expires.getHours() + 24);

        const session: Session = {
          user: userWithoutPassword,
          expires: expires.toISOString(),
        };

        // Save to local storage
        localStorage.setItem('session', JSON.stringify(session));

        setUser(userWithoutPassword);

        return {
          success: true,
          user: userWithoutPassword,
        };
      }

      return {
        success: false,
        message: 'Invalid email or password',
      };
    } catch (error) {
      console.error('Login error:', error);
      return {
        success: false,
        message: 'An error occurred during login',
      };
    }
  };

  const logout = async (): Promise<void> => {
    // In a real app, you would call your API to invalidate the session
    localStorage.removeItem('session');
    setUser(null);
    router.push('/login');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
