import { ReactNode, useEffect, useState } from 'react';
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
  Menu,
  X,
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
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

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
      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-card border-b">
        <div className="flex items-center justify-between p-4">
          <div>
            <h1 className="text-lg font-bold text-primary">Royal Alimentos</h1>
            <p className="text-xs text-muted-foreground">Painel Admin</p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex w-64 border-r bg-card flex-col">
        <div className="p-6">
          <h1 className="text-2xl font-bold text-primary">Royal Alimentos</h1>
          <p className="text-sm text-accent font-semibold mt-1">Painel Admin</p>
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
            <p className="text-sm font-medium">{adminUser?.name}</p>
            <p className="text-xs text-muted-foreground">{adminUser?.email}</p>
            <p className="text-xs text-muted-foreground capitalize mt-1">
              Nível: {adminUser?.role}
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

      {/* Mobile Sidebar Overlay */}
      {isMobileMenuOpen && (
        <>
          <div 
            className="lg:hidden fixed inset-0 bg-black/50 z-40"
            onClick={() => setMobileMenuOpen(false)}
          />
          <aside className="lg:hidden fixed top-0 left-0 bottom-0 w-80 bg-card border-r z-50 overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h1 className="text-xl font-bold text-primary">Royal Alimentos</h1>
                  <p className="text-sm text-muted-foreground">Painel Admin</p>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>
              
              <Separator className="mb-6" />
              
              <nav className="space-y-2 mb-6">
                {menuItems.map((item) => (
                  <Link key={item.path} to={item.path} onClick={() => setMobileMenuOpen(false)}>
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

              <Separator className="mb-6" />
              
              <div className="space-y-4">
                <div className="px-3 py-2 bg-muted rounded-md">
                  <p className="text-sm font-medium">{adminUser?.name}</p>
                  <p className="text-xs text-muted-foreground">{adminUser?.email}</p>
                  <p className="text-xs text-muted-foreground capitalize mt-1">
                    Nível: {adminUser?.role}
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
            </div>
          </aside>
        </>
      )}

      {/* Main Content */}
      <main className="flex-1 overflow-auto lg:ml-0">
        <div className="container py-8 px-4 lg:px-8 pt-20 lg:pt-8">
          {children}
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
