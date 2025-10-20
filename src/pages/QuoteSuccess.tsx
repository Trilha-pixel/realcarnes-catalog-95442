import { useLocation, Link } from 'react-router-dom';
import { CheckCircle, Home, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

const QuoteSuccess = () => {
  const location = useLocation();
  const quoteId = location.state?.quoteId || 'N/A';

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 flex items-center justify-center bg-muted/30 py-12">
        <div className="container px-4">
          <Card className="max-w-2xl mx-auto">
            <CardContent className="p-12 text-center">
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-primary/10 flex items-center justify-center">
                <CheckCircle className="h-12 w-12 text-primary" />
              </div>
              
              <h1 className="text-3xl md:text-4xl font-bold mb-4">
                Orçamento Solicitado com Sucesso!
              </h1>
              
              <p className="text-xl text-muted-foreground mb-6">
                Número do Pedido: <span className="font-semibold text-foreground">{quoteId}</span>
              </p>
              
              <div className="bg-muted/50 p-6 rounded-lg mb-8 text-left">
                <h2 className="font-semibold mb-3">Próximos Passos:</h2>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-start">
                    <span className="inline-block w-6 h-6 rounded-full bg-primary text-primary-foreground text-sm flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                      1
                    </span>
                    <span>Você receberá um e-mail de confirmação com os detalhes do seu pedido</span>
                  </li>
                  <li className="flex items-start">
                    <span className="inline-block w-6 h-6 rounded-full bg-primary text-primary-foreground text-sm flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                      2
                    </span>
                    <span>Nossa equipe comercial analisará sua solicitação</span>
                  </li>
                  <li className="flex items-start">
                    <span className="inline-block w-6 h-6 rounded-full bg-primary text-primary-foreground text-sm flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                      3
                    </span>
                    <span>Você será contatado em até 24 horas com preços e condições comerciais</span>
                  </li>
                </ul>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg">
                  <Link to="/">
                    <Home className="h-5 w-5 mr-2" />
                    Voltar ao Início
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link to="/produtos">
                    <ShoppingBag className="h-5 w-5 mr-2" />
                    Ver Mais Produtos
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default QuoteSuccess;
