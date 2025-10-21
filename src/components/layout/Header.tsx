import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, Menu, User, LogOut, Phone, MessageCircle, Home, Building2, Users, Package, ChefHat, Mail, Newspaper, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useMockData } from '@/contexts/MockDataContext';
import { useAuth } from '@/contexts/AuthContext';
import { useState, useEffect } from 'react';
import logoRealCarnes from '@/assets/logo-real-carnes.png';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const Header = () => {
  const { getQuoteCartCount } = useMockData();
  const { user, isAuthenticated, logout } = useAuth();
  const cartCount = getQuoteCartCount();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  const isActivePath = (path: string) => location.pathname === path;

  // Detectar scroll para adicionar shadow
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Bloquear scroll quando menu mobile está aberto
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  const navLinks = [
    { to: '/empresa', label: 'A empresa', icon: Building2 },
    { to: '/fornecedores', label: 'Fornecedores', icon: Users },
    { to: '/produtos', label: 'Produtos', icon: Package },
    { to: '/receitas', label: 'Receitas', icon: ChefHat },
    { to: '/contato', label: 'Contato', icon: Mail },
  ];

  const mobileNavLinks = [
    { to: '/', label: 'Home', icon: Home },
    ...navLinks,
    { to: '/blog', label: 'Blog', icon: Newspaper },
  ];

  return (
    <>
      {/* ============================ */}
      {/* VERSÃO DESKTOP */}
      {/* ============================ */}
      <header className={`hidden lg:block sticky top-0 z-50 w-full transition-shadow duration-300 ${scrolled ? 'shadow-lg' : ''}`}>
        {/* Barra Superior - Vermelha com Contatos */}
        <div className="bg-gradient-to-r from-destructive via-destructive to-destructive/95">
          <div className="container px-4">
            <div className="flex items-center justify-start gap-8 h-10 text-sm">
              <a 
                href="tel:+552126718074"
                className="flex items-center gap-2 text-destructive-foreground hover:text-white transition-colors font-medium"
              >
                <Phone className="h-4 w-4" />
                (21) 2671-8074
              </a>

              <a 
                href="https://wa.me/5521967188074" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-destructive-foreground hover:text-white transition-colors font-medium"
              >
                <MessageCircle className="h-4 w-4" />
                Atendimento online
              </a>
            </div>
          </div>
        </div>

        {/* Barra Principal - Branca com Logo, Navegação e Ações */}
        <div className="bg-background border-b">
          <div className="container px-4">
            <div className="flex items-center justify-between h-20">
              {/* Logo */}
              <Link to="/" className="flex items-center hover:opacity-80 transition-opacity">
                <img 
                  src={logoRealCarnes} 
                  alt="Real Carnes" 
                  className="h-16 w-auto object-contain"
                />
              </Link>

              {/* Navegação Central */}
              <nav className="flex items-center gap-2">
                {navLinks.map((link) => (
                  <Link
                    key={link.to}
                    to={link.to}
                    className={`
                      px-5 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200
                      relative group
                      ${isActivePath(link.to) 
                        ? 'text-primary bg-accent shadow-sm' 
                        : 'text-foreground hover:text-primary hover:bg-accent/60'
                      }
                    `}
                  >
                    {link.label}
                    {/* Underline animado no hover */}
                    <span className={`
                      absolute bottom-1 left-2 right-2 h-0.5 bg-primary rounded-full
                      transform origin-left transition-transform duration-300
                      ${isActivePath(link.to) ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}
                    `} />
                  </Link>
                ))}
              </nav>

              {/* Ações à Direita */}
              <div className="flex items-center gap-3">
                {/* Carrinho */}
                <Button 
                  variant="ghost" 
                  size="icon" 
                  asChild 
                  className="relative hover:bg-accent transition-colors"
                >
                  <Link to="/orcamento">
                    <ShoppingCart className="h-5 w-5" />
                    {cartCount > 0 && (
                      <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center font-medium shadow-md animate-in zoom-in-50">
                        {cartCount}
                      </span>
                    )}
                  </Link>
                </Button>

                {/* Botão Entrar / User Menu */}
                {isAuthenticated ? (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="default" className="shadow-sm hover:shadow-md transition-all">
                        <User className="mr-2 h-4 w-4" />
                        Minha Conta
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-56 shadow-lg">
                      <DropdownMenuLabel>
                        <div className="flex flex-col space-y-1">
                          <p className="text-sm font-medium">{user?.name}</p>
                          <p className="text-xs text-muted-foreground">{user?.email}</p>
                        </div>
                      </DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem 
                        onClick={logout} 
                        className="cursor-pointer hover:bg-destructive/10 focus:bg-destructive/10 text-destructive"
                      >
                        <LogOut className="mr-2 h-4 w-4" />
                        Sair
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                ) : (
                  <Button 
                    variant="default" 
                    asChild 
                    className="shadow-sm hover:shadow-md transition-all font-semibold"
                  >
                    <Link to="/login">
                      <User className="mr-2 h-4 w-4" />
                      Entrar
                    </Link>
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* ============================ */}
      {/* VERSÃO MOBILE */}
      {/* ============================ */}
      <header className={`lg:hidden sticky top-0 z-50 w-full bg-gradient-to-r from-destructive via-destructive to-destructive/95 transition-shadow duration-300 ${scrolled ? 'shadow-lg' : ''}`}>
        <div className="container px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo Mobile */}
            <Link to="/" className="flex items-center hover:opacity-80 transition-opacity">
              <img 
                src={logoRealCarnes} 
                alt="Real Carnes" 
                className="h-12 w-auto object-contain"
              />
            </Link>

            {/* Ações Mobile */}
            <div className="flex items-center gap-2">
              {/* Carrinho Mobile */}
              <Button 
                variant="ghost" 
                size="icon" 
                asChild 
                className="relative text-destructive-foreground hover:text-white hover:bg-white/10"
              >
                <Link to="/orcamento">
                  <ShoppingCart className="h-5 w-5" />
                  {cartCount > 0 && (
                    <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-white text-destructive text-xs flex items-center justify-center font-bold shadow-md animate-in zoom-in-50">
                      {cartCount}
                    </span>
                  )}
                </Link>
              </Button>

              {/* Botão Menu Hambúrguer */}
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setMobileMenuOpen(true)}
                className="text-destructive-foreground hover:text-white hover:bg-white/10"
              >
                <Menu className="h-6 w-6" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Menu Lateral Mobile */}
      {mobileMenuOpen && (
        <>
          {/* Overlay Escuro */}
          <div 
            className="fixed inset-0 bg-black/70 z-[60] animate-in fade-in-0 duration-300 lg:hidden"
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Sidebar */}
          <div 
            className={`
              fixed top-0 right-0 bottom-0 w-[300px] bg-background z-[70]
              shadow-2xl transform transition-transform duration-300 ease-out lg:hidden
              ${mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}
            `}
          >
            <div className="flex flex-col h-full">
              {/* Header do Menu com Logo e Botão Fechar */}
              <div className="flex items-center justify-between p-4 border-b bg-gradient-to-br from-accent/40 to-accent/10">
                <img 
                  src={logoRealCarnes} 
                  alt="Real Carnes" 
                  className="h-12 w-auto object-contain"
                />
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setMobileMenuOpen(false)}
                  className="hover:bg-accent"
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>

              {/* Links de Navegação */}
              <div className="flex-1 overflow-y-auto py-6 px-4">
                <nav className="space-y-2">
                  {mobileNavLinks.map((link, index) => {
                    const Icon = link.icon;
                    const isActive = isActivePath(link.to);
                    
                    return (
                      <Link
                        key={link.to}
                        to={link.to}
                        onClick={() => setMobileMenuOpen(false)}
                        className={`
                          flex items-center gap-3 px-4 py-3.5 rounded-xl text-sm font-medium 
                          transition-all duration-200 group
                          ${isActive
                            ? 'bg-primary text-primary-foreground shadow-md scale-[1.02]' 
                            : 'hover:bg-accent/70 active:scale-95'
                          }
                        `}
                        style={{ 
                          animationDelay: `${index * 40}ms`,
                          animation: 'slideInRight 0.3s ease-out forwards'
                        }}
                      >
                        <Icon className={`h-5 w-5 transition-transform group-hover:scale-110 ${
                          isActive ? 'text-primary-foreground' : 'text-primary'
                        }`} />
                        <span className="flex-1">{link.label}</span>
                        
                        {/* Indicador de página ativa */}
                        {isActive && (
                          <span className="h-2 w-2 rounded-full bg-primary-foreground animate-pulse shadow-sm" />
                        )}
                      </Link>
                    );
                  })}
                </nav>
              </div>

              {/* Footer com Ações e Contato */}
              <div className="border-t p-4 space-y-4 bg-gradient-to-br from-accent/30 to-accent/10">
                {/* Botão de Telefone */}
                <a
                  href="tel:+552126718074"
                  className="flex items-center gap-3 px-4 py-3 bg-background/80 backdrop-blur-sm rounded-lg shadow-sm border hover:shadow-md transition-all"
                >
                  <Phone className="h-5 w-5 text-primary" />
                  <div className="flex-1">
                    <p className="text-xs text-muted-foreground">Ligue para</p>
                    <p className="text-sm font-semibold">(21) 2671-8074</p>
                  </div>
                </a>

                {/* Botão Login/Logout */}
                {isAuthenticated ? (
                  <div className="space-y-2">
                    <div className="px-4 py-2.5 bg-background/80 backdrop-blur-sm rounded-lg shadow-sm border">
                      <p className="text-sm font-medium truncate">{user?.name}</p>
                      <p className="text-xs text-muted-foreground truncate">{user?.email}</p>
                    </div>
                    <Button 
                      variant="outline" 
                      onClick={() => {
                        logout();
                        setMobileMenuOpen(false);
                      }}
                      className="w-full justify-start hover:bg-destructive/10 hover:text-destructive hover:border-destructive transition-colors"
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      Sair
                    </Button>
                  </div>
                ) : (
                  <Button 
                    variant="default" 
                    asChild 
                    className="w-full shadow-sm hover:shadow-md transition-all font-semibold"
                  >
                    <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
                      <User className="mr-2 h-4 w-4" />
                      Entrar
                    </Link>
                  </Button>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};
