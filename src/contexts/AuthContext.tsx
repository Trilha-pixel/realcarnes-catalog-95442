import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => boolean;
  register: (name: string, email: string, password: string, phone?: string, company?: string) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock users database
const MOCK_USERS: Array<User & { password: string }> = [
  {
    id: '1',
    name: 'João Silva',
    email: 'joao@example.com',
    password: '123456',
    phone: '(11) 98765-4321',
    company: 'Restaurante do João',
  },
  {
    id: '2',
    name: 'Maria Santos',
    email: 'maria@example.com',
    password: '123456',
    phone: '(11) 99876-5432',
    company: 'Churrascaria Maria',
  },
];

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [registeredUsers, setRegisteredUsers] = useState(MOCK_USERS);

  useEffect(() => {
    // Load user from localStorage on mount
    const storedUser = localStorage.getItem('auth_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    // Load registered users from localStorage
    const storedRegisteredUsers = localStorage.getItem('registered_users');
    if (storedRegisteredUsers) {
      setRegisteredUsers(JSON.parse(storedRegisteredUsers));
    }
  }, []);

  const login = (email: string, password: string): boolean => {
    const foundUser = registeredUsers.find(
      u => u.email.toLowerCase() === email.toLowerCase() && u.password === password
    );

    if (foundUser) {
      const { password: _, ...userWithoutPassword } = foundUser;
      setUser(userWithoutPassword);
      localStorage.setItem('auth_user', JSON.stringify(userWithoutPassword));
      return true;
    }
    return false;
  };

  const register = (name: string, email: string, password: string, phone?: string, company?: string): boolean => {
    // Check if email already exists
    if (registeredUsers.some(u => u.email.toLowerCase() === email.toLowerCase())) {
      return false;
    }

    const newUser = {
      id: `user_${Date.now()}`,
      name,
      email,
      password,
      phone,
      company,
    };

    const updatedUsers = [...registeredUsers, newUser];
    setRegisteredUsers(updatedUsers);
    localStorage.setItem('registered_users', JSON.stringify(updatedUsers));

    // Auto login after registration
    const { password: _, ...userWithoutPassword } = newUser;
    setUser(userWithoutPassword);
    localStorage.setItem('auth_user', JSON.stringify(userWithoutPassword));

    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('auth_user');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};