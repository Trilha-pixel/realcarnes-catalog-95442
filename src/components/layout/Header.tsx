import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, Menu, User, LogOut, Phone, MessageCircle, Home, Building2, Users, MapPin, Package, ChefHat, Mail, Newspaper } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useMockData } from '@/contexts/MockDataContext';
import { useAuth } from '@/contexts/AuthContext';
import { useState } from 'react';
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
  const location = useLocation();

  const isActivePath = (path: string) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 w-full bg-background">
      {/* Seção Superior - Barra de Utilidades */}
      <div className="bg-gradient-to-r from-destructive to-destructive/90">
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
      <div className="border-b bg-background shadow-sm">
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

            {/* Coluna Direita - Menu de Navegação Desktop */}
            <div className="hidden lg:flex items-center gap-4">
              <NavigationMenu>
                <NavigationMenuList className="gap-1">
                  <NavigationMenuItem>
                    <Link to="/">
                      <NavigationMenuLink className={`${navigationMenuTriggerStyle()} ${isActivePath('/') ? 'bg-accent text-accent-foreground font-medium' : ''} hover:bg-accent/50 transition-all duration-200`}>
                        Home
                      </NavigationMenuLink>
                    </Link>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <Link to="/empresa">
                      <NavigationMenuLink className={`${navigationMenuTriggerStyle()} ${isActivePath('/empresa') ? 'bg-accent text-accent-foreground font-medium' : ''} hover:bg-accent/50 transition-all duration-200`}>
                        A empresa
                      </NavigationMenuLink>
                    </Link>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <Link to="/fornecedores">
                      <NavigationMenuLink className={`${navigationMenuTriggerStyle()} ${isActivePath('/fornecedores') ? 'bg-accent text-accent-foreground font-medium' : ''} hover:bg-accent/50 transition-all duration-200`}>
                        Fornecedores
                      </NavigationMenuLink>
                    </Link>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <Link to="/atendimento">
                      <NavigationMenuLink className={`${navigationMenuTriggerStyle()} ${isActivePath('/atendimento') ? 'bg-accent text-accent-foreground font-medium' : ''} hover:bg-accent/50 transition-all duration-200`}>
                        Área de Atendimento
                      </NavigationMenuLink>
                    </Link>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <Link to="/produtos">
                      <NavigationMenuLink className={`${navigationMenuTriggerStyle()} ${isActivePath('/produtos') ? 'bg-accent text-accent-foreground font-medium' : ''} hover:bg-accent/50 transition-all duration-200`}>
                        Produtos
                      </NavigationMenuLink>
                    </Link>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <Link to="/receitas">
                      <NavigationMenuLink className={`${navigationMenuTriggerStyle()} ${isActivePath('/receitas') ? 'bg-accent text-accent-foreground font-medium' : ''} hover:bg-accent/50 transition-all duration-200`}>
                        Receitas
                      </NavigationMenuLink>
                    </Link>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <Link to="/contato">
                      <NavigationMenuLink className={`${navigationMenuTriggerStyle()} ${isActivePath('/contato') ? 'bg-accent text-accent-foreground font-medium' : ''} hover:bg-accent/50 transition-all duration-200`}>
                        Contato
                      </NavigationMenuLink>
                    </Link>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <Link to="/blog">
                      <NavigationMenuLink className={`${navigationMenuTriggerStyle()} ${isActivePath('/blog') ? 'bg-accent text-accent-foreground font-medium' : ''} hover:bg-accent/50 transition-all duration-200`}>
                        Blog
                      </NavigationMenuLink>
                    </Link>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>

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

              {/* Mobile Menu */}
              <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Menu className="h-6 w-6" />
                    <span className="sr-only">Menu</span>
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[280px] sm:w-[350px] p-0">
                  <nav className="flex flex-col h-full">
                    {/* Logo no topo do menu mobile */}
                    <div className="border-b p-4 bg-accent/50">
                      <img 
                        src={logoRealCarnes} 
                        alt="Real Carnes" 
                        className="h-12 w-auto object-contain mx-auto"
                      />
                    </div>

                    {/* Links de navegação */}
                    <div className="flex-1 overflow-y-auto py-4">
                      <div className="space-y-1 px-3">
                        <Link
                          to="/"
                          onClick={() => setMobileMenuOpen(false)}
                          className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                            isActivePath('/') ? 'bg-accent text-accent-foreground' : 'hover:bg-accent/50'
                          }`}
                        >
                          <Home className="h-5 w-5" />
                          Home
                        </Link>
                        <Link
                          to="/empresa"
                          onClick={() => setMobileMenuOpen(false)}
                          className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                            isActivePath('/empresa') ? 'bg-accent text-accent-foreground' : 'hover:bg-accent/50'
                          }`}
                        >
                          <Building2 className="h-5 w-5" />
                          A empresa
                        </Link>
                        <Link
                          to="/fornecedores"
                          onClick={() => setMobileMenuOpen(false)}
                          className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                            isActivePath('/fornecedores') ? 'bg-accent text-accent-foreground' : 'hover:bg-accent/50'
                          }`}
                        >
                          <Users className="h-5 w-5" />
                          Fornecedores
                        </Link>
                        <Link
                          to="/atendimento"
                          onClick={() => setMobileMenuOpen(false)}
                          className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                            isActivePath('/atendimento') ? 'bg-accent text-accent-foreground' : 'hover:bg-accent/50'
                          }`}
                        >
                          <MapPin className="h-5 w-5" />
                          Área de Atendimento
                        </Link>
                        <Link
                          to="/produtos"
                          onClick={() => setMobileMenuOpen(false)}
                          className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                            isActivePath('/produtos') ? 'bg-accent text-accent-foreground' : 'hover:bg-accent/50'
                          }`}
                        >
                          <Package className="h-5 w-5" />
                          Produtos
                        </Link>
                        <Link
                          to="/receitas"
                          onClick={() => setMobileMenuOpen(false)}
                          className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                            isActivePath('/receitas') ? 'bg-accent text-accent-foreground' : 'hover:bg-accent/50'
                          }`}
                        >
                          <ChefHat className="h-5 w-5" />
                          Receitas
                        </Link>
                        <Link
                          to="/contato"
                          onClick={() => setMobileMenuOpen(false)}
                          className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                            isActivePath('/contato') ? 'bg-accent text-accent-foreground' : 'hover:bg-accent/50'
                          }`}
                        >
                          <Mail className="h-5 w-5" />
                          Contato
                        </Link>
                        <Link
                          to="/blog"
                          onClick={() => setMobileMenuOpen(false)}
                          className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                            isActivePath('/blog') ? 'bg-accent text-accent-foreground' : 'hover:bg-accent/50'
                          }`}
                        >
                          <Newspaper className="h-5 w-5" />
                          Blog
                        </Link>
                      </div>
                    </div>
                    
                    {/* User Actions no rodapé */}
                    <div className="border-t p-4 bg-accent/30">
                      {isAuthenticated ? (
                        <div className="space-y-3">
                          <div className="px-2 py-1.5 bg-background/50 rounded-lg">
                            <p className="text-sm font-medium truncate">{user?.name}</p>
                            <p className="text-xs text-muted-foreground truncate">{user?.email}</p>
                          </div>
                          <Button 
                            variant="outline" 
                            onClick={() => {
                              logout();
                              setMobileMenuOpen(false);
                            }}
                            className="w-full justify-start"
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
                          className="w-full shadow-sm"
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
