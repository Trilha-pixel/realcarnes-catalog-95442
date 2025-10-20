import { ReactNode, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAdminAuth } from '@/contexts/AdminAuthContext';
import {
  LayoutDashboard,
  Package,
  FolderTree,
  Image,
  Users,
  FileText,
  LogOut,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

interface AdminLayoutProps {
  children: ReactNode;
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAdminAuthenticated, adminUser, adminLogout } = useAdminAuth();

  useEffect(() => {
    if (!isAdminAuthenticated) {
      navigate('/admin/login');
    }
  }, [isAdminAuthenticated, navigate]);

  const handleLogout = () => {
    adminLogout();
    navigate('/admin/login');
  };

  const menuItems = [
    { path: '/admin/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { path: '/admin/solicitacoes', icon: FileText, label: 'Solicitações' },
    { path: '/admin/produtos', icon: Package, label: 'Produtos' },
    { path: '/admin/categorias', icon: FolderTree, label: 'Categorias' },
    { path: '/admin/banners', icon: Image, label: 'Banners' },
    { path: '/admin/usuarios', icon: Users, label: 'Usuários' },
  ];

  const isActive = (path: string) => location.pathname === path;

  if (!isAdminAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen flex w-full bg-background">
      {/* Sidebar */}
      <aside className="w-64 border-r bg-card flex flex-col">
        <div className="p-6">
          <h1 className="text-2xl font-bold text-primary">Real Carnes</h1>
          <p className="text-sm text-muted-foreground mt-1">Painel Admin</p>
        </div>
        
        <Separator />
        
        <nav className="flex-1 p-4 space-y-1">
          {menuItems.map((item) => (
            <Link key={item.path} to={item.path}>
              <Button
                variant={isActive(item.path) ? 'secondary' : 'ghost'}
                className="w-full justify-start"
              >
                <item.icon className="mr-2 h-4 w-4" />
                {item.label}
              </Button>
            </Link>
          ))}
        </nav>

        <Separator />
        
        <div className="p-4">
          <div className="mb-3 px-3 py-2 bg-muted rounded-md">
            <p className="text-sm font-medium">{adminUser?.nome}</p>
            <p className="text-xs text-muted-foreground">{adminUser?.email}</p>
            <p className="text-xs text-muted-foreground capitalize mt-1">
              Nível: {adminUser?.nivel}
            </p>
          </div>
          <Button
            variant="outline"
            className="w-full justify-start"
            onClick={handleLogout}
          >
            <LogOut className="mr-2 h-4 w-4" />
            Sair
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <div className="container py-8 px-8">
          {children}
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
