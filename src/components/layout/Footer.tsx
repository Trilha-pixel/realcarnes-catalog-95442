import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="border-t bg-muted/30">
      <div className="container px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-primary">
                <span className="text-2xl font-bold text-primary-foreground">RC</span>
              </div>
              <div>
                <span className="text-lg font-bold text-primary">Real Carnes</span>
                <p className="text-xs text-muted-foreground">Qualidade Premium</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              Fornecedor especializado em carnes premium para o mercado B2B.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">Links Rápidos</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="text-muted-foreground hover:text-primary transition-colors">
                  Início
                </Link>
              </li>
              <li>
                <Link to="/produtos" className="text-muted-foreground hover:text-primary transition-colors">
                  Produtos
                </Link>
              </li>
              <li>
                <Link to="/orcamento" className="text-muted-foreground hover:text-primary transition-colors">
                  Lista de Orçamento
                </Link>
              </li>
              <li>
                <Link to="/admin" className="text-muted-foreground hover:text-primary transition-colors">
                  Área Administrativa
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="font-semibold mb-4">Categorias</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/produtos?categoria=bovinos" className="text-muted-foreground hover:text-primary transition-colors">
                  Bovinos
                </Link>
              </li>
              <li>
                <Link to="/produtos?categoria=suinos" className="text-muted-foreground hover:text-primary transition-colors">
                  Suínos
                </Link>
              </li>
              <li>
                <Link to="/produtos?categoria=aves" className="text-muted-foreground hover:text-primary transition-colors">
                  Aves
                </Link>
              </li>
              <li>
                <Link to="/produtos?categoria=especiais" className="text-muted-foreground hover:text-primary transition-colors">
                  Especiais
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold mb-4">Contato</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start space-x-2">
                <MapPin className="h-4 w-4 text-primary mt-0.5" />
                <span className="text-muted-foreground">
                  São Paulo - SP<br />Brasil
                </span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-primary" />
                <span className="text-muted-foreground">(11) 99999-9999</span>
              </li>
              <li className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-primary" />
                <span className="text-muted-foreground">contato@realcarnes.com.br</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Real Carnes. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
};
