import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useMockData, AdminUser } from './MockDataContext';

interface AdminAuthContextType {
  adminUser: AdminUser | null;
  isAdminAuthenticated: boolean;
  adminLogin: (email: string, password: string) => boolean;
  adminLogout: () => void;
}

const AdminAuthContext = createContext<AdminAuthContextType | undefined>(undefined);

export const AdminAuthProvider = ({ children }: { children: ReactNode }) => {
  const [adminUser, setAdminUser] = useState<AdminUser | null>(null);
  const { authenticateAdmin } = useMockData();

  useEffect(() => {
    const storedAdmin = localStorage.getItem('admin_user');
    if (storedAdmin) {
      setAdminUser(JSON.parse(storedAdmin));
    }
  }, []);

  const adminLogin = (email: string, password: string): boolean => {
    const user = authenticateAdmin(email, password);
    
    if (user) {
      const { senha_mock, ...userWithoutPassword } = user;
      setAdminUser(userWithoutPassword as AdminUser);
      localStorage.setItem('admin_user', JSON.stringify(userWithoutPassword));
      return true;
    }
    return false;
  };

  const adminLogout = () => {
    setAdminUser(null);
    localStorage.removeItem('admin_user');
  };

  return (
    <AdminAuthContext.Provider
      value={{
        adminUser,
        isAdminAuthenticated: !!adminUser,
        adminLogin,
        adminLogout,
      }}
    >
      {children}
    </AdminAuthContext.Provider>
  );
};

export const useAdminAuth = () => {
  const context = useContext(AdminAuthContext);
  if (!context) {
    throw new Error('useAdminAuth must be used within AdminAuthProvider');
  }
  return context;
};
