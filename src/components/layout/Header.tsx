import { Link } from 'react-router-dom';
import { ShoppingCart, Menu, User, LogOut, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useMockData } from '@/contexts/MockDataContext';
import { useAuth } from '@/contexts/AuthContext';
import { useState } from 'react';
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

  return (
    <header className="sticky top-0 z-50 w-full bg-background">
      {/* Seção Superior - Barra de Utilidades */}
      <div className="bg-destructive">
        <div className="container px-4">
          <div className="flex items-center justify-between h-10">
            {/* Coluna Esquerda - Telefone */}
            <div className="flex items-center gap-2 text-destructive-foreground text-sm">
              <Phone className="h-4 w-4" />
              <span>(21) 2671-8074</span>
            </div>

            {/* Coluna Central - Área do Cliente */}
            <Link 
              to="/login" 
              className="text-destructive-foreground text-sm hover:underline"
            >
              Área do cliente
            </Link>

            {/* Coluna Direita - Atendimento Online */}
            <a 
              href="https://wa.me/5521967188074" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-destructive-foreground text-sm hover:underline"
            >
              Atendimento online
            </a>
          </div>
        </div>
      </div>

      {/* Seção Principal - Header Principal */}
      <div className="border-b bg-background">
        <div className="container px-4">
          <div className="flex items-center justify-between h-20">
            {/* Coluna Esquerda - Logo */}
            <Link to="/" className="flex items-center space-x-2">
              <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-gradient-primary">
                <span className="text-2xl font-bold text-primary-foreground">RC</span>
              </div>
              <div className="hidden sm:block">
                <span className="text-xl font-bold text-primary">Real Carnes</span>
                <p className="text-xs text-muted-foreground">Qualidade Premium</p>
              </div>
            </Link>

            {/* Coluna Direita - Menu de Navegação Desktop */}
            <div className="hidden lg:flex items-center gap-6">
              <NavigationMenu>
                <NavigationMenuList>
                  <NavigationMenuItem>
                    <Link to="/">
                      <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                        Home
                      </NavigationMenuLink>
                    </Link>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <Link to="/empresa">
                      <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                        A empresa
                      </NavigationMenuLink>
                    </Link>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <Link to="/fornecedores">
                      <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                        Fornecedores
                      </NavigationMenuLink>
                    </Link>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <Link to="/atendimento">
                      <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                        Área de Atendimento
                      </NavigationMenuLink>
                    </Link>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <Link to="/produtos">
                      <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                        Produtos
                      </NavigationMenuLink>
                    </Link>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <Link to="/receitas">
                      <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                        Receitas
                      </NavigationMenuLink>
                    </Link>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <Link to="/contato">
                      <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                        Contato
                      </NavigationMenuLink>
                    </Link>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <Link to="/blog">
                      <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                        Blog
                      </NavigationMenuLink>
                    </Link>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>

              {/* Carrinho */}
              <Button variant="ghost" size="icon" asChild className="relative">
                <Link to="/orcamento">
                  <ShoppingCart className="h-5 w-5" />
                  {cartCount > 0 && (
                    <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center font-medium">
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
                    <Button variant="ghost" size="icon">
                      <User className="h-5 w-5" />
                      <span className="sr-only">Perfil</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuLabel>
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium">{user?.name}</p>
                        <p className="text-xs text-muted-foreground">{user?.email}</p>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={logout} className="cursor-pointer">
                      <LogOut className="mr-2 h-4 w-4" />
                      Sair
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Button variant="ghost" size="sm" asChild>
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
                    <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center font-medium">
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
                    <Menu className="h-5 w-5" />
                    <span className="sr-only">Menu</span>
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                  <nav className="flex flex-col space-y-4 mt-8">
                    <Link
                      to="/"
                      onClick={() => setMobileMenuOpen(false)}
                      className="text-lg font-medium hover:text-primary transition-colors"
                    >
                      Home
                    </Link>
                    <Link
                      to="/empresa"
                      onClick={() => setMobileMenuOpen(false)}
                      className="text-lg font-medium hover:text-primary transition-colors"
                    >
                      A empresa
                    </Link>
                    <Link
                      to="/fornecedores"
                      onClick={() => setMobileMenuOpen(false)}
                      className="text-lg font-medium hover:text-primary transition-colors"
                    >
                      Fornecedores
                    </Link>
                    <Link
                      to="/atendimento"
                      onClick={() => setMobileMenuOpen(false)}
                      className="text-lg font-medium hover:text-primary transition-colors"
                    >
                      Área de Atendimento
                    </Link>
                    <Link
                      to="/produtos"
                      onClick={() => setMobileMenuOpen(false)}
                      className="text-lg font-medium hover:text-primary transition-colors"
                    >
                      Produtos
                    </Link>
                    <Link
                      to="/receitas"
                      onClick={() => setMobileMenuOpen(false)}
                      className="text-lg font-medium hover:text-primary transition-colors"
                    >
                      Receitas
                    </Link>
                    <Link
                      to="/contato"
                      onClick={() => setMobileMenuOpen(false)}
                      className="text-lg font-medium hover:text-primary transition-colors"
                    >
                      Contato
                    </Link>
                    <Link
                      to="/blog"
                      onClick={() => setMobileMenuOpen(false)}
                      className="text-lg font-medium hover:text-primary transition-colors"
                    >
                      Blog
                    </Link>
                    
                    {/* User Actions */}
                    <div className="border-t pt-4">
                      {isAuthenticated ? (
                        <div className="flex flex-col space-y-2">
                          <div className="px-2 py-1">
                            <p className="text-sm font-medium">{user?.name}</p>
                            <p className="text-xs text-muted-foreground">{user?.email}</p>
                          </div>
                          <Button 
                            variant="ghost" 
                            onClick={() => {
                              logout();
                              setMobileMenuOpen(false);
                            }}
                            className="justify-start"
                          >
                            <LogOut className="mr-2 h-4 w-4" />
                            Sair
                          </Button>
                        </div>
                      ) : (
                        <Button 
                          variant="default" 
                          asChild 
                          className="w-full"
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
