import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, Menu, User, LogOut, Phone, MessageCircle, Home, Building2, Users, MapPin, Package, ChefHat, Mail, Newspaper } from 'lucide-react';
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
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

export const Header = () => {
  const { categories, getQuoteCartCount } = useMockData();
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

  const navLinks = [
    { to: '/', label: 'Home', icon: Home },
    { to: '/empresa', label: 'A empresa', icon: Building2 },
    { to: '/fornecedores', label: 'Fornecedores', icon: Users },
    { to: '/produtos', label: 'Produtos', icon: Package },
    { to: '/receitas', label: 'Receitas', icon: ChefHat },
    { to: '/contato', label: 'Contato', icon: Mail },
  ];

  return (
    <header className={`sticky top-0 z-50 w-full bg-background transition-shadow duration-300 ${scrolled ? 'shadow-lg' : ''}`}>
      {/* Seção Superior - Barra de Utilidades */}
      <div className="bg-gradient-to-r from-destructive to-destructive/90 transition-all duration-300">
        <div className="container px-4">
          <div className="flex items-center justify-between h-10 text-xs sm:text-sm">
            {/* Mobile: Apenas telefone e WhatsApp */}
            <div className="flex items-center gap-3 lg:gap-6 w-full lg:w-auto justify-between lg:justify-start">
              <a 
                href="tel:+552126718074"
                className="flex items-center gap-1.5 text-destructive-foreground hover:text-white transition-colors"
              >
                <Phone className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                <span className="hidden sm:inline">(21) 2671-8074</span>
                <span className="sm:hidden">Ligar</span>
              </a>

              {/* Desktop: Área do Cliente */}
              <Link 
                to="/login" 
                className="hidden lg:flex items-center gap-1.5 text-destructive-foreground hover:text-white transition-colors"
              >
                <User className="h-4 w-4" />
                Área do cliente
              </Link>

              {/* Atendimento Online */}
              <a 
                href="https://wa.me/5521967188074" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-destructive-foreground hover:text-white transition-colors"
              >
                <MessageCircle className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                <span className="hidden sm:inline">Atendimento online</span>
                <span className="sm:hidden">WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Seção Principal - Header Principal */}
      <div className="border-b bg-background">
        <div className="container px-4">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Coluna Esquerda - Logo */}
            <Link to="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
              <img 
                src={logoRealCarnes} 
                alt="Real Carnes - Você conhece, você confia!" 
                className="h-12 lg:h-16 w-auto object-contain"
              />
            </Link>

            {/* Navegação Desktop - Links Visíveis */}
            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`
                    px-4 py-2 rounded-md text-sm font-medium transition-all duration-200
                    relative group
                    ${isActivePath(link.to) 
                      ? 'text-primary bg-accent' 
                      : 'text-foreground hover:text-primary hover:bg-accent/50'
                    }
                  `}
                >
                  {link.label}
                  {/* Underline animado no hover */}
                  <span className={`
                    absolute bottom-0 left-0 w-full h-0.5 bg-primary 
                    transform origin-left transition-transform duration-300
                    ${isActivePath(link.to) ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}
                  `} />
                </Link>
              ))}
            </nav>

            {/* Actions Desktop */}
            <div className="hidden lg:flex items-center gap-2">

              {/* Carrinho */}
              <Button variant="ghost" size="icon" asChild className="relative hover:bg-accent transition-colors">
                <Link to="/orcamento">
                  <ShoppingCart className="h-5 w-5" />
                  {cartCount > 0 && (
                    <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center font-medium shadow-sm animate-in zoom-in-50">
                      {cartCount}
                    </span>
                  )}
                  <span className="sr-only">Lista de Orçamento</span>
                </Link>
              </Button>

              {/* User Menu */}
              {isAuthenticated ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="hover:bg-accent transition-colors">
                      <User className="h-5 w-5" />
                      <span className="sr-only">Perfil</span>
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
                    <DropdownMenuItem onClick={logout} className="cursor-pointer hover:bg-destructive/10 focus:bg-destructive/10">
                      <LogOut className="mr-2 h-4 w-4" />
                      Sair
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Button variant="default" size="sm" asChild className="shadow-sm hover:shadow-md transition-shadow">
                  <Link to="/login">
                    <User className="mr-2 h-4 w-4" />
                    Entrar
                  </Link>
                </Button>
              )}
            </div>

            {/* Actions Mobile */}
            <div className="flex lg:hidden items-center gap-2">
              <Button variant="ghost" size="icon" asChild className="relative">
                <Link to="/orcamento">
                  <ShoppingCart className="h-5 w-5" />
                  {cartCount > 0 && (
                    <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center font-medium animate-in zoom-in-50">
                      {cartCount}
                    </span>
                  )}
                  <span className="sr-only">Lista de Orçamento</span>
                </Link>
              </Button>

              {/* Mobile Menu com Overlay */}
              <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="hover:bg-accent transition-colors">
                    <Menu className="h-6 w-6" />
                    <span className="sr-only">Menu</span>
                  </Button>
                </SheetTrigger>
                
                {/* Overlay escuro */}
                {mobileMenuOpen && (
                  <div 
                    className="fixed inset-0 bg-black/60 z-40 lg:hidden animate-in fade-in-0 duration-300"
                    onClick={() => setMobileMenuOpen(false)}
                  />
                )}
                
                <SheetContent 
                  side="right" 
                  className="w-[280px] sm:w-[320px] p-0 z-50 animate-in slide-in-from-right duration-300"
                >
                  <nav className="flex flex-col h-full bg-background">
                    {/* Logo no topo do menu mobile */}
                    <div className="border-b p-4 bg-gradient-to-br from-accent/30 to-accent/10">
                      <img 
                        src={logoRealCarnes} 
                        alt="Real Carnes" 
                        className="h-12 w-auto object-contain mx-auto"
                      />
                    </div>

                    {/* Links de navegação com animação stagger */}
                    <div className="flex-1 overflow-y-auto py-6">
                      <div className="space-y-1 px-3">
                        {navLinks.map((link, index) => {
                          const Icon = link.icon;
                          return (
                            <Link
                              key={link.to}
                              to={link.to}
                              onClick={() => setMobileMenuOpen(false)}
                              className={`
                                flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium 
                                transition-all duration-200 group
                                animate-in slide-in-from-right fade-in-0
                                ${isActivePath(link.to) 
                                  ? 'bg-primary text-primary-foreground shadow-sm' 
                                  : 'hover:bg-accent/70 active:scale-95'
                                }
                              `}
                              style={{ animationDelay: `${index * 50}ms` }}
                            >
                              <Icon className={`h-5 w-5 transition-transform group-hover:scale-110 ${
                                isActivePath(link.to) ? 'text-primary-foreground' : 'text-primary'
                              }`} />
                              {link.label}
                              
                              {/* Indicador de página ativa */}
                              {isActivePath(link.to) && (
                                <span className="ml-auto h-2 w-2 rounded-full bg-primary-foreground animate-pulse" />
                              )}
                            </Link>
                          );
                        })}
                        
                        {/* Links extras */}
                        <Link
                          to="/atendimento"
                          onClick={() => setMobileMenuOpen(false)}
                          className={`
                            flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium 
                            transition-all duration-200 group
                            animate-in slide-in-from-right fade-in-0
                            ${isActivePath('/atendimento') 
                              ? 'bg-primary text-primary-foreground shadow-sm' 
                              : 'hover:bg-accent/70 active:scale-95'
                            }
                          `}
                          style={{ animationDelay: '300ms' }}
                        >
                          <MapPin className={`h-5 w-5 transition-transform group-hover:scale-110 ${
                            isActivePath('/atendimento') ? 'text-primary-foreground' : 'text-primary'
                          }`} />
                          Área de Atendimento
                          {isActivePath('/atendimento') && (
                            <span className="ml-auto h-2 w-2 rounded-full bg-primary-foreground animate-pulse" />
                          )}
                        </Link>
                        
                        <Link
                          to="/blog"
                          onClick={() => setMobileMenuOpen(false)}
                          className={`
                            flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium 
                            transition-all duration-200 group
                            animate-in slide-in-from-right fade-in-0
                            ${isActivePath('/blog') 
                              ? 'bg-primary text-primary-foreground shadow-sm' 
                              : 'hover:bg-accent/70 active:scale-95'
                            }
                          `}
                          style={{ animationDelay: '350ms' }}
                        >
                          <Newspaper className={`h-5 w-5 transition-transform group-hover:scale-110 ${
                            isActivePath('/blog') ? 'text-primary-foreground' : 'text-primary'
                          }`} />
                          Blog
                          {isActivePath('/blog') && (
                            <span className="ml-auto h-2 w-2 rounded-full bg-primary-foreground animate-pulse" />
                          )}
                        </Link>
                      </div>
                    </div>
                    
                    {/* User Actions no rodapé com animação */}
                    <div className="border-t p-4 bg-gradient-to-br from-accent/30 to-accent/10 animate-in fade-in-0 slide-in-from-bottom duration-500">
                      {isAuthenticated ? (
                        <div className="space-y-3">
                          <div className="px-3 py-2.5 bg-background/80 backdrop-blur-sm rounded-lg shadow-sm border">
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
                            size="sm"
                          >
                            <LogOut className="mr-2 h-4 w-4" />
                            Sair
                          </Button>
                        </div>
                      ) : (
                        <Button 
                          variant="default" 
                          asChild 
                          className="w-full shadow-sm hover:shadow-md transition-all active:scale-95"
                        >
                          <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
                            <User className="mr-2 h-4 w-4" />
                            Entrar
                          </Link>
                        </Button>
                      )}
                    </div>
                  </nav>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
